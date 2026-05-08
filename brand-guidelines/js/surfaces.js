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
    <article class="surface-cell">
      <div class="surface-cell-head">
        <h4 class="surface-cell-label">${s.label}</h4>
        <div class="surface-cell-role">${s.role}</div>
      </div>
      ${draftBadge}
      ${renderers[s.key](data)}
    </article>
  `).join('');
}

document.addEventListener('app-ready', renderAllSurfaces);
document.addEventListener('preset-change', renderAllSurfaces);
