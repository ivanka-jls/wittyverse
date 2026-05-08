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
