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
