import { getCurrentPresetData } from './main.js';

const renderers = {
  homepage_hero(data) {
    const v = data.voice.surfaces.homepage_hero;
    return `
      <div class="surface surface-hero">
        <div class="browser-chrome">
          <span class="browser-dots"><i></i><i></i><i></i></span>
          <span class="browser-url">https://wittyverse.com</span>
        </div>
        <div class="hero-body">
          <div class="hero-eyebrow">✦ Wittyverse Storefront ✦</div>
          <h1 class="hero-headline">${escapeHTML(v.headline)}</h1>
          <p class="hero-sub">${escapeHTML(v.subline)}</p>
          <button class="hero-cta">${escapeHTML(v.cta)} →</button>
        </div>
      </div>`;
  },

  product_card(data) {
    const v = data.voice.surfaces.product_card;
    return `
      <div class="surface surface-product">
        <div class="product-corner">NEW</div>
        <div class="product-image">
          <span class="product-image-label">[product]</span>
        </div>
        <div class="product-body">
          <div class="product-name">${escapeHTML(v.name)}</div>
          <div class="product-desc">${escapeHTML(v.description)}</div>
          <div class="product-row">
            <div class="product-price">${escapeHTML(v.price)}</div>
            <button class="product-cta">${escapeHTML(v.cta)} →</button>
          </div>
        </div>
      </div>`;
  },

  footer(data) {
    const v = data.voice.surfaces.footer;
    return `
      <div class="surface surface-footer">
        <div class="footer-tagline">${escapeHTML(v.tagline)}</div>
        <div class="footer-cols">
          <div><strong>Shop</strong><span>Products</span><span>New</span><span>Sale</span></div>
          <div><strong>About</strong><span>Story</span><span>Press</span><span>Contact</span></div>
          <div><strong>Help</strong><span>FAQ</span><span>Returns</span><span>Shipping</span></div>
        </div>
        <div class="footer-small-print">${escapeHTML(v.small_print)}</div>
      </div>`;
  },

  instagram_post(data) {
    const v = data.voice.surfaces.instagram_post;
    return `
      <div class="surface surface-ig">
        <div class="ig-header">
          <div class="ig-avatar"><span>W</span></div>
          <div class="ig-handle-block">
            <div class="ig-handle">wittyverse</div>
            <div class="ig-meta">Original audio</div>
          </div>
          <div class="ig-more">⋯</div>
        </div>
        <div class="ig-image">
          <span class="ig-image-star ig-image-star--a">✦</span>
          <span class="ig-image-star ig-image-star--b">✦</span>
          <span class="ig-image-headline">WITTYVERSE</span>
        </div>
        <div class="ig-actions">
          <span class="ig-icon">♡</span>
          <span class="ig-icon">💬</span>
          <span class="ig-icon">↗</span>
          <span class="ig-bookmark">⌘</span>
        </div>
        <div class="ig-likes"><strong>1,247 likes</strong></div>
        <div class="ig-caption"><strong>wittyverse</strong> ${escapeHTML(v.caption)}</div>
      </div>`;
  },

  x_post(data) {
    const v = data.voice.surfaces.x_post;
    return `
      <div class="surface surface-x">
        <div class="x-header">
          <div class="x-avatar"><span>W</span></div>
          <div class="x-name-block">
            <div class="x-displayname">Wittyverse <span class="x-verified">✦</span></div>
            <div class="x-handle">@wittyverse · 2h</div>
          </div>
          <div class="x-more">⋯</div>
        </div>
        <div class="x-post-text">${escapeHTML(v.post_text)}</div>
        <div class="x-card">
          <div class="x-card-image">
            <span class="x-card-image-headline">WITTYVERSE</span>
          </div>
          <div class="x-card-body">
            <div class="x-card-domain">wittyverse.com</div>
            <div class="x-card-title">${escapeHTML(v.card_title)}</div>
            <div class="x-card-desc">${escapeHTML(v.card_description)}</div>
          </div>
        </div>
        <div class="x-actions">
          <span class="x-icon">💬 12</span>
          <span class="x-icon">↻ 47</span>
          <span class="x-icon">♡ 312</span>
          <span class="x-icon">↗</span>
        </div>
      </div>`;
  },

  youtube_video(data) {
    const v = data.voice.surfaces.youtube_video;
    const headline = (v.title || '').toUpperCase();
    return `
      <div class="surface surface-yt">
        <div class="yt-thumb">
          <div class="yt-thumb-overlay">${escapeHTML(headline)}</div>
          <div class="yt-thumb-duration">12:47</div>
        </div>
        <div class="yt-info">
          <div class="yt-channel-avatar"><span>W</span></div>
          <div class="yt-meta">
            <div class="yt-title">${escapeHTML(v.title)}</div>
            <div class="yt-channel">${escapeHTML(v.channel_name)}</div>
            <div class="yt-stats">12K views · 2 days ago</div>
          </div>
        </div>
      </div>`;
  }
};

function escapeHTML(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// Static surface order for cycling
const SURFACE_ORDER = ['homepage_hero', 'product_card', 'footer', 'instagram_post', 'x_post', 'youtube_video'];
const SURFACE_LABELS = {
  homepage_hero:  { label: 'Homepage Hero',  role: 'Primary anchor — purple ground' },
  product_card:   { label: 'Product Card',   role: 'Neutral surface + orange CTA' },
  footer:         { label: 'Footer',         role: 'Dark anchor — ink ground' },
  instagram_post: { label: 'Instagram Post', role: 'Brand-on-platform — white chrome' },
  x_post:         { label: 'X Post + Card',  role: 'Brand-on-platform — white chrome' },
  youtube_video:  { label: 'YouTube Video',  role: 'Branded thumbnail vs neutral chrome' }
};

function buildOverlayMarkup(key, data) {
  const meta = SURFACE_LABELS[key];
  return `
    <div class="surface-overlay-backdrop" data-overlay-close></div>
    <div class="surface-overlay-container" role="dialog" aria-modal="true" aria-labelledby="surface-overlay-title">
      <button class="surface-overlay-prev" type="button" aria-label="Previous surface" data-overlay-prev>‹</button>
      <button class="surface-overlay-next" type="button" aria-label="Next surface" data-overlay-next>›</button>
      <div class="surface-overlay-card">
        <header class="surface-overlay-head">
          <div>
            <h3 class="surface-overlay-title" id="surface-overlay-title">${meta.label}</h3>
            <div class="surface-overlay-role">${meta.role}</div>
          </div>
          <button class="surface-overlay-close" type="button" aria-label="Close" data-overlay-close>✕</button>
        </header>
        <div class="surface-overlay-body" id="surface-overlay-body">
          ${renderers[key](data)}
        </div>
        <div class="surface-overlay-toggles" id="surface-overlay-toggles"></div>
      </div>
    </div>
  `;
}

export function renderAllSurfaces() {
  const container = document.getElementById('surfaces-grid');
  if (!container) return;
  const data = getCurrentPresetData();
  const draftBadge = data.isCanon ? '' : '<div class="draft-badge">Draft preview</div>';

  const surfaces = [
    { key: 'homepage_hero',  label: 'Homepage Hero',  role: 'Primary anchor — purple ground' },
    { key: 'product_card',   label: 'Product Card',   role: 'Neutral surface + orange CTA' },
    { key: 'footer',         label: 'Footer',         role: 'Dark anchor — ink ground' },
    { key: 'instagram_post', label: 'Instagram Post', role: 'Brand-on-platform — white chrome' },
    { key: 'x_post',         label: 'X Post + Card',  role: 'Brand-on-platform — white chrome' },
    { key: 'youtube_video',  label: 'YouTube Video',  role: 'Branded thumbnail vs neutral chrome' }
  ];

  container.innerHTML = surfaces.map(s => `
    <article class="surface-cell" tabindex="0" role="button"
             aria-label="Expand ${s.label}" data-surface-key="${s.key}">
      <div class="surface-cell-head">
        <h4 class="surface-cell-label">${s.label}</h4>
        <div class="surface-cell-role">${s.role}</div>
      </div>
      <button class="surface-expand-btn" type="button"
              aria-label="Expand ${s.label}"
              data-surface-key="${s.key}">↗</button>
      ${draftBadge}
      ${renderers[s.key](data)}
    </article>
  `).join('');

  container.querySelectorAll('.surface-cell').forEach(cell => {
    const key = cell.getAttribute('data-surface-key');
    const open = (e) => {
      if (e.target.closest('button:not(.surface-expand-btn)') || e.target.closest('a')) return;
      openSurfaceOverlay(key);
    };
    cell.addEventListener('click', open);
    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSurfaceOverlay(key);
      }
    });
  });
}

// ===== Overlay state + lifecycle =====

let overlayState = { open: false, currentKey: null, lastFocus: null };

function getOverlayHost() {
  let host = document.getElementById('surface-overlay-host');
  if (!host) {
    host = document.createElement('div');
    host.id = 'surface-overlay-host';
    host.className = 'surface-overlay';
    document.body.appendChild(host);
  }
  return host;
}

export function openSurfaceOverlay(key) {
  if (!SURFACE_ORDER.includes(key)) return;
  const data = getCurrentPresetData();
  const host = getOverlayHost();
  host.innerHTML = buildOverlayMarkup(key, data);
  host.classList.add('is-open');

  overlayState.open = true;
  overlayState.currentKey = key;
  overlayState.lastFocus = document.activeElement;

  document.body.style.overflow = 'hidden';
  renderOverlayToggles();

  const closeBtn = host.querySelector('.surface-overlay-close');
  if (closeBtn) closeBtn.focus();

  host.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onOverlayKey);
}

export function closeSurfaceOverlay() {
  const host = document.getElementById('surface-overlay-host');
  if (host) {
    host.classList.remove('is-open');
    host.innerHTML = '';
    host.removeEventListener('click', onOverlayClick);
  }
  document.removeEventListener('keydown', onOverlayKey);
  document.body.style.overflow = '';

  if (overlayState.lastFocus && typeof overlayState.lastFocus.focus === 'function') {
    overlayState.lastFocus.focus();
  }
  overlayState = { open: false, currentKey: null, lastFocus: null };
}

function onOverlayClick(e) {
  if (e.target.closest('[data-overlay-close]')) {
    closeSurfaceOverlay();
    return;
  }
  if (e.target.closest('[data-overlay-prev]')) {
    cycleSurface(-1);
    return;
  }
  if (e.target.closest('[data-overlay-next]')) {
    cycleSurface(1);
    return;
  }
}

function onOverlayKey(e) {
  if (e.key === 'Escape') {
    closeSurfaceOverlay();
    return;
  }
  if (e.key === 'ArrowLeft') {
    cycleSurface(-1);
    return;
  }
  if (e.key === 'ArrowRight') {
    cycleSurface(1);
    return;
  }
  if (e.key === 'Tab') {
    trapFocus(e);
  }
}

function trapFocus(e) {
  const host = document.getElementById('surface-overlay-host');
  if (!host) return;
  const focusables = host.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

export function cycleSurface(direction) {
  if (!overlayState.open) return;
  const idx = SURFACE_ORDER.indexOf(overlayState.currentKey);
  if (idx < 0) return;
  const nextIdx = (idx + direction + SURFACE_ORDER.length) % SURFACE_ORDER.length;
  const nextKey = SURFACE_ORDER[nextIdx];

  overlayState.currentKey = nextKey;
  const data = getCurrentPresetData();
  const meta = SURFACE_LABELS[nextKey];
  const titleEl = document.getElementById('surface-overlay-title');
  const roleEl = document.querySelector('.surface-overlay-role');
  const bodyEl = document.getElementById('surface-overlay-body');
  if (titleEl) titleEl.textContent = meta.label;
  if (roleEl) roleEl.textContent = meta.role;
  if (bodyEl) bodyEl.innerHTML = renderers[nextKey](data);
}

function renderOverlayToggles() {
  const container = document.getElementById('surface-overlay-toggles');
  if (!container) return;
  container.innerHTML = '';
  const topbarToggles = document.getElementById('compare-toggles');
  if (topbarToggles && topbarToggles.children.length > 0) {
    container.innerHTML = topbarToggles.innerHTML;
    const overlayBtns = container.querySelectorAll('.toggle-pill');
    const topbarBtns = topbarToggles.querySelectorAll('.toggle-pill');
    overlayBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => topbarBtns[i]?.click());
    });
  }
}

document.addEventListener('app-ready', renderAllSurfaces);
document.addEventListener('preset-change', renderAllSurfaces);
document.addEventListener('preset-change', () => {
  if (overlayState.open) {
    const data = getCurrentPresetData();
    const bodyEl = document.getElementById('surface-overlay-body');
    if (bodyEl) bodyEl.innerHTML = renderers[overlayState.currentKey](data);
    renderOverlayToggles();
  }
});
