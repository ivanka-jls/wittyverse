import { getStateFromURL, setStateInURL } from './js/main.js';

const results = [];
let passed = 0, failed = 0;

function assert(name, condition, expected, actual) {
  const ok = !!condition;
  results.push(`${ok ? '✓ PASS' : '✗ FAIL'} — ${name}` + (!ok ? `\n    expected: ${JSON.stringify(expected)}\n    actual:   ${JSON.stringify(actual)}` : ''));
  ok ? passed++ : failed++;
}

// === URL state tests ===

// Test 1: getStateFromURL returns empty obj when no params
{
  const url = new URL('https://example.com/');
  const state = getStateFromURL(url);
  assert('getStateFromURL with no params returns {}', JSON.stringify(state) === '{}', '{}', JSON.stringify(state));
}

// Test 2: getStateFromURL parses voice param
{
  const url = new URL('https://example.com/?voice=v5_1_draft');
  const state = getStateFromURL(url);
  assert('getStateFromURL parses voice param', state.voice === 'v5_1_draft', 'v5_1_draft', state.voice);
}

// Test 3: getStateFromURL parses palette param
{
  const url = new URL('https://example.com/?palette=alt_a');
  const state = getStateFromURL(url);
  assert('getStateFromURL parses palette param', state.palette === 'alt_a', 'alt_a', state.palette);
}

// Test 4: getStateFromURL parses both
{
  const url = new URL('https://example.com/?voice=v5_1_draft&palette=alt_a');
  const state = getStateFromURL(url);
  assert('getStateFromURL parses both params', state.voice === 'v5_1_draft' && state.palette === 'alt_a', '{voice,palette}', JSON.stringify(state));
}

// Test 5: setStateInURL builds query string
{
  const result = setStateInURL({ voice: 'v5_1_draft' });
  assert('setStateInURL builds ?voice=v5_1_draft', result === '?voice=v5_1_draft', '?voice=v5_1_draft', result);
}

// Test 6: setStateInURL with empty state returns ''
{
  const result = setStateInURL({});
  assert('setStateInURL with empty state returns ""', result === '', '""', `"${result}"`);
}

document.getElementById('summary').textContent = `${passed} passed, ${failed} failed`;
document.getElementById('summary').className = 'summary ' + (failed === 0 ? 'pass' : 'fail');
document.getElementById('results').textContent = results.join('\n');
