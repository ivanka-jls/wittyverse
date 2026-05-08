export function getStateFromURL(url) {
  const params = new URL(url).searchParams;
  const state = {};
  for (const [key, value] of params) {
    state[key] = value;
  }
  return state;
}

export function setStateInURL(state) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(state)) {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, value);
    }
  }
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return await res.json();
}

export function applyTokensToCSS(tokens, target = document.documentElement) {
  for (const [group, values] of Object.entries(tokens)) {
    for (const [key, val] of Object.entries(values)) {
      const cssKey = key.replace(/_/g, '-');
      target.style.setProperty(`--${group}-${cssKey}`, val);
    }
  }
}

let appState = {
  tokens: null,
  voice: null,
  changelog: null
};

function getCurrentPresets() {
  const urlState = getStateFromURL(window.location.href);
  return {
    palette: urlState.palette || appState.tokens.active_preset,
    voice:   urlState.voice   || appState.voice.active_preset
  };
}

function renderToggleUI() {
  const container = document.getElementById('compare-toggles');
  if (!container) return;
  container.innerHTML = '';
  const current = getCurrentPresets();

  const voiceKeys = Object.keys(appState.voice.presets);
  if (voiceKeys.length > 1) {
    container.appendChild(buildToggleGroup('Voice', 'voice', voiceKeys, appState.voice.presets, current.voice));
  }

  const paletteKeys = Object.keys(appState.tokens.presets);
  if (paletteKeys.length > 1) {
    container.appendChild(buildToggleGroup('Palette', 'palette', paletteKeys, appState.tokens.presets, current.palette));
  }
}

function buildToggleGroup(label, paramKey, keys, presets, currentKey) {
  const group = document.createElement('div');
  group.className = 'toggle-group';
  group.innerHTML = `<span class="toggle-label">${label}:</span>`;
  for (const key of keys) {
    const btn = document.createElement('button');
    btn.className = 'toggle-pill' + (key === currentKey ? ' active' : '');
    btn.textContent = presets[key].label || key;
    btn.addEventListener('click', () => updatePreset(paramKey, key));
    group.appendChild(btn);
  }
  return group;
}

function updatePreset(paramKey, value) {
  const urlState = getStateFromURL(window.location.href);
  urlState[paramKey] = value;
  // Don't pollute URL with default preset
  const defaults = { voice: appState.voice.active_preset, palette: appState.tokens.active_preset };
  if (urlState[paramKey] === defaults[paramKey]) delete urlState[paramKey];
  history.replaceState(null, '', setStateInURL(urlState) || window.location.pathname);
  applyCurrentPresets();
  renderToggleUI();
  document.dispatchEvent(new CustomEvent('preset-change'));
}

function applyCurrentPresets() {
  const current = getCurrentPresets();
  const palette = appState.tokens.presets[current.palette];
  if (palette) applyTokensToCSS({ color: palette.color, type: palette.type });
  // voice changes are picked up by surface re-renderers via the event
}

async function init() {
  appState.tokens = await loadJSON('data/tokens.json');
  appState.voice = await loadJSON('data/voice.json');
  appState.changelog = await loadJSON('data/changelog.json');
  applyCurrentPresets();
  renderToggleUI();
  document.dispatchEvent(new CustomEvent('app-ready'));
}

// Expose for surfaces.js
export function getAppState() { return appState; }
export function getCurrentPresetData() {
  const c = getCurrentPresets();
  return {
    palette: appState.tokens.presets[c.palette],
    voice:   appState.voice.presets[c.voice],
    voiceKey: c.voice,
    paletteKey: c.palette,
    isCanon: c.voice === appState.voice.active_preset && c.palette === appState.tokens.active_preset
  };
}

function renderQuickReference() {
  const data = getCurrentPresetData();
  const voiceEl = document.getElementById('quick-voice');
  if (voiceEl && data.voice?.rules?.personality?.[0]) {
    voiceEl.textContent = data.voice.rules.personality[0];
  }
  const rulesEl = document.getElementById('quick-rules');
  if (rulesEl) {
    const dos = (data.voice?.rules?.do || []).slice(0, 2).map(s => `<li>✓ ${s}</li>`);
    const donts = (data.voice?.rules?.dont || []).slice(0, 1).map(s => `<li>✗ ${s}</li>`);
    rulesEl.innerHTML = [...dos, ...donts].join('');
  }
}

function renderVoiceSection() {
  const v = getCurrentPresetData().voice;
  if (!v) return;
  const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text || ''; };
  const setList = (id, items) => { const el = document.getElementById(id); if (el) el.innerHTML = (items||[]).map(s => `<li>${s}</li>`).join(''); };

  setList('voice-attrs',     v.rules?.personality);
  setList('voice-do-list',   v.rules?.do);
  setList('voice-dont-list', v.rules?.dont);
  setText('voice-tagline',     v.messaging?.tagline);
  setText('voice-value-prop',  v.messaging?.value_prop);
  setText('voice-boilerplate', v.messaging?.boilerplate);
  setText('sample-hero-headline', v.surfaces?.homepage_hero?.headline);
  setText('sample-ig-caption',    v.surfaces?.instagram_post?.caption);
  setText('sample-yt-title',      v.surfaces?.youtube_video?.title);
}

document.addEventListener('app-ready', renderQuickReference);
document.addEventListener('app-ready', renderVoiceSection);
document.addEventListener('preset-change', () => document.dispatchEvent(new CustomEvent('app-ready')));

init().catch(err => {
  console.error('[brand-guidelines] init failed:', err);
});
