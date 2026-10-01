/**
 * EASY. Financial Markets Education
 * Vanilla JavaScript — Zero dependencies, $0 operational cost.
 */

document.addEventListener('DOMContentLoaded', () => {
  try { initMobileNav(); } catch (e) { /* silent */ }
  try { initConceptTests(); } catch (e) { /* silent */ }
  try { initOrderbookSimulator(); } catch (e) { /* silent */ }
  try { initLanguageModal(); } catch (e) { /* silent */ }
  try { initArticleFilter(); } catch (e) { /* silent */ }
  try { initReadingProgress(); } catch (e) { /* silent */ }
  try { initVideoSlots(); } catch (e) { /* silent */ }
  try { initAds(); } catch (e) { /* silent */ }
});

/* Mobile Menu Toggle */
function initMobileNav() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-links');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !nav.contains(e.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* Interactive Concept Test Widgets */
function initConceptTests() {
  const widgets = document.querySelectorAll('.concept-test-widget');
  widgets.forEach(widget => {
    const buttons = widget.querySelectorAll('.test-option-btn');
    const feedback = widget.querySelector('.test-feedback');
    const explanationCorrect = widget.dataset.correctReason || 'Correct! This accurately matches market mechanics.';
    const explanationIncorrect = widget.dataset.incorrectReason || 'Not quite. Re-evaluate the underlying market incentive and mechanic.';

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';

        // Reset others
        buttons.forEach(b => {
          b.classList.remove('selected-correct', 'selected-incorrect');
        });

        if (isCorrect) {
          btn.classList.add('selected-correct');
          if (feedback) {
            feedback.className = 'test-feedback show correct';
            feedback.innerHTML = `<strong>LOGIC VERIFIED:</strong> ${explanationCorrect}`;
          }
        } else {
          btn.classList.add('selected-incorrect');
          if (feedback) {
            feedback.className = 'test-feedback show incorrect';
            feedback.innerHTML = `<strong>LOGIC CHECK:</strong> ${explanationIncorrect}`;
          }
        }
      });
    });
  });
}

/* Interactive Order Book Simulator */
function initOrderbookSimulator() {
  const sim = document.getElementById('orderbook-sim');
  if (!sim) return;

  let bids = [
    { price: 100.00, qty: 50 },
    { price: 99.50, qty: 120 },
    { price: 99.00, qty: 300 },
    { price: 98.50, qty: 500 }
  ];

  let asks = [
    { price: 100.50, qty: 40 },
    { price: 101.00, qty: 100 },
    { price: 101.50, qty: 250 },
    { price: 102.00, qty: 600 }
  ];

  let lastPrice = 100.25;

  function render() {
    const bidsEl = sim.querySelector('.sim-bids');
    const asksEl = sim.querySelector('.sim-asks');
    const priceEl = sim.querySelector('.sim-last-price');
    const spreadEl = sim.querySelector('.sim-spread');

    if (bidsEl && asksEl) {
      bidsEl.innerHTML = bids.map(b => `
        <div class="order-row bid">
          <span>${b.price.toFixed(2)}</span>
          <span>${b.qty} units</span>
        </div>
      `).join('');

      asksEl.innerHTML = asks.map(a => `
        <div class="order-row ask">
          <span>${a.price.toFixed(2)}</span>
          <span>${a.qty} units</span>
        </div>
      `).join('');
    }

    if (priceEl) priceEl.textContent = `$${lastPrice.toFixed(2)}`;
    if (spreadEl && bids.length && asks.length) {
      const spread = (asks[0].price - bids[0].price).toFixed(2);
      spreadEl.textContent = `Spread: $${spread}`;
    }
  }

  render();

  const buyBtn = sim.querySelector('.sim-buy-btn');
  const sellBtn = sim.querySelector('.sim-sell-btn');
  const resetBtn = sim.querySelector('.sim-reset-btn');

  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      if (asks.length === 0) return;
      // Consume top ask
      lastPrice = asks[0].price;
      asks[0].qty -= 20;
      if (asks[0].qty <= 0) {
        asks.shift();
      }
      render();
    });
  }

  if (sellBtn) {
    sellBtn.addEventListener('click', () => {
      if (bids.length === 0) return;
      // Consume top bid
      lastPrice = bids[0].price;
      bids[0].qty -= 20;
      if (bids[0].qty <= 0) {
        bids.shift();
      }
      render();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      bids = [
        { price: 100.00, qty: 50 },
        { price: 99.50, qty: 120 },
        { price: 99.00, qty: 300 },
        { price: 98.50, qty: 500 }
      ];
      asks = [
        { price: 100.50, qty: 40 },
        { price: 101.00, qty: 100 },
        { price: 101.50, qty: 250 },
        { price: 102.00, qty: 600 }
      ];
      lastPrice = 100.25;
      render();
    });
  }
}

/* Language Selection Modal */
function initLanguageModal() {
  const langBtns = document.querySelectorAll('.btn-lang');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const existing = document.getElementById('lang-modal');
      if (existing) {
        existing.remove();
        return;
      }

      const modal = document.createElement('div');
      modal.id = 'lang-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.style.cssText = `
        position: fixed; inset: 0; background: rgba(17, 18, 21, 0.4);
        display: flex; align-items: center; justify-content: center;
        z-index: 200; padding: 1rem;
      `;

      modal.innerHTML = `
        <div style="background: #fff; max-width: 440px; width: 100%; padding: 2rem; border: 2px solid #111; box-shadow: 6px 6px 0 rgba(0,0,0,0.15);">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.25rem;">
            <h3 style="font-family: var(--font-serif); margin: 0; font-size: 1.35rem;">Language Selection</h3>
            <button id="close-lang" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #111;">&times;</button>
          </div>
          <p style="font-size: 0.9rem; color: #484b52; margin-bottom: 1.5rem;">
            EASY is a globally accessible publication. All primary logic is verified in English (International). Additional language editions follow our $0-overhead static publishing model.
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem;">
            <div style="padding: 0.75rem 1rem; background: #eaf5ee; border: 1px solid #1b5e39; display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600;">
              <span>English (International)</span>
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #1b5e39;">ACTIVE</span>
            </div>
            <div style="padding: 0.75rem 1rem; background: #f5f4ef; border: 1px solid #e2e0d8; display: flex; justify-content: space-between; font-size: 0.9rem; color: #747780;">
              <span>Español</span>
              <span style="font-family: var(--font-mono); font-size: 0.75rem;">IN TRANSLATION</span>
            </div>
            <div style="padding: 0.75rem 1rem; background: #f5f4ef; border: 1px solid #e2e0d8; display: flex; justify-content: space-between; font-size: 0.9rem; color: #747780;">
              <span>Français</span>
              <span style="font-family: var(--font-mono); font-size: 0.75rem;">IN TRANSLATION</span>
            </div>
            <div style="padding: 0.75rem 1rem; background: #f5f4ef; border: 1px solid #e2e0d8; display: flex; justify-content: space-between; font-size: 0.9rem; color: #747780;">
              <span>中文 (Simplified)</span>
              <span style="font-family: var(--font-mono); font-size: 0.75rem;">IN TRANSLATION</span>
            </div>
          </div>
          <button id="ok-lang" style="width: 100%; padding: 0.75rem; background: #111; color: #fff; border: none; font-weight: 600; cursor: pointer; font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.05em; text-transform: uppercase;">
            Continue in English
          </button>
        </div>
      `;

      document.body.appendChild(modal);

      const close = () => modal.remove();
      modal.querySelector('#close-lang')?.addEventListener('click', close);
      modal.querySelector('#ok-lang')?.addEventListener('click', close);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
      });
    });
  });
}

/* Article search/filtering on articles.html */
function initArticleFilter() {
  const searchInput = document.getElementById('article-search');
  const cards = document.querySelectorAll('.article-directory-item');
  if (!searchInput || !cards.length) return;

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const text = card.textContent.toLowerCase();
      if (!q || title.includes(q) || text.includes(q)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* Reading Progress Bar for Long Articles */
function initReadingProgress() {
  const article = document.querySelector('.article-body');
  if (!article) return;

  const bar = document.createElement('div');
  bar.id = 'reading-progress-bar';
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px; background: var(--color-ink);
    z-index: 999; width: 0%; transition: width 0.1s ease;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total <= 0) return;
    const progress = (window.scrollY / total) * 100;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });
}

/* ===== Video slots (click-to-load, nothing from third parties loads until play) ===== */
function easyVideoPageHref(key, fromRoot) {
  const roots = ['start','forex','commodities','stocks','bonds','futures','options','crypto'];
  const p = roots.indexOf(key) > -1 ? key + '.html' : 'articles/' + key + '.html';
  return (fromRoot ? '' : (location.pathname.indexOf('/articles/') > -1 ? '../' : '')) + p;
}

function easyVideoEmbedUrl(v) {
  if (!v || typeof v !== 'object') return null;
  if (v.platform === 'youtube' && /^[\w-]{11}$/.test(v.id || '')) {
    return 'https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=1&rel=0';
  }
  if (v.platform === 'rumble' && /^v[\w]+$/.test(v.id || '')) {
    return 'https://rumble.com/embed/' + v.id + '/?autoplay=2';
  }
  if (v.platform === 'facebook' && /^https:\/\/(www\.facebook\.com|fb\.watch)\//.test(v.url || '')) {
    return 'https://www.facebook.com/plugins/video.php?show_text=false&autoplay=true&href=' + encodeURIComponent(v.url);
  }
  return null;
}

function easyBuildVideo(v) {
  const src = easyVideoEmbedUrl(v);
  if (!src) return null;
  const names = { youtube: 'YouTube', rumble: 'Rumble', facebook: 'Facebook' };
  const wrap = document.createElement('figure');
  wrap.className = 'video-embed' + (v.format === 'vertical' ? ' is-vertical' : '');
  const frame = document.createElement('div');
  frame.className = 'video-frame';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'video-play';
  btn.setAttribute('aria-label', 'Play video: ' + (v.title || 'Video lesson'));
  btn.innerHTML = '<span class="video-play-icon" aria-hidden="true"></span><span class="video-play-title"></span><span class="video-play-note"></span>';
  btn.querySelector('.video-play-title').textContent = v.title || 'Video lesson';
  btn.querySelector('.video-play-note').textContent = 'Plays from ' + names[v.platform] + ' when you press play';
  btn.addEventListener('click', function () {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = v.title || 'Video lesson';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.innerHTML = '';
    frame.appendChild(iframe);
  });
  frame.appendChild(btn);
  wrap.appendChild(frame);
  if (v.note) {
    const cap = document.createElement('figcaption');
    cap.textContent = v.note;
    wrap.appendChild(cap);
  }
  return wrap;
}

function initVideoSlots() {
  const data = window.EASY_VIDEOS || {};
  document.querySelectorAll('.video-slot[data-video]').forEach(function (slot) {
    const el = easyBuildVideo(data[slot.dataset.video]);
    if (!el) { slot.remove(); return; }
    const label = document.createElement('div');
    label.className = 'video-label';
    label.textContent = 'VIDEO LESSON';
    slot.appendChild(label);
    slot.appendChild(el);
    slot.hidden = false;
  });

  const latest = document.querySelector('[data-video-latest]');
  if (latest) {
    const max = parseInt(latest.dataset.videoLatest, 10) || 3;
    const keys = Object.keys(data).filter(function (k) { return easyVideoEmbedUrl(data[k]); }).slice(0, max);
    const grid = latest.querySelector('.video-grid');
    if (!keys.length || !grid) { latest.remove(); } else {
      keys.forEach(function (k) { const el = easyBuildVideo(data[k]); if (el) grid.appendChild(el); });
      latest.hidden = false;
    }
  }

  const list = document.getElementById('video-list');
  if (list) {
    const keys = Object.keys(data).filter(function (k) { return easyVideoEmbedUrl(data[k]); });
    const empty = document.getElementById('video-empty');
    if (!keys.length) { if (empty) empty.hidden = false; }
    else {
      keys.forEach(function (k) {
        const item = document.createElement('div');
        item.className = 'video-item';
        const el = easyBuildVideo(data[k]);
        if (!el) return;
        item.appendChild(el);
        const a = document.createElement('a');
        a.href = easyVideoPageHref(k, true);
        a.textContent = 'Read the related lesson →';
        a.className = 'video-related';
        item.appendChild(a);
        list.appendChild(item);
      });
    }
  }

  const ch = window.EASY_CHANNELS || {};
  const box = document.getElementById('video-channels');
  if (box) {
    const names = { youtube: 'YouTube', facebook: 'Facebook', rumble: 'Rumble' };
    Object.keys(names).forEach(function (n) {
      if (/^https:\/\//.test(ch[n] || '')) {
        const a = document.createElement('a');
        a.href = ch[n]; a.textContent = names[n]; a.rel = 'noopener'; a.className = 'channel-link';
        box.appendChild(a);
      }
    });
    if (!box.children.length) box.hidden = true;
  }
}


/* ===== Ads: controlled from js/ads-config.js. Hidden unless enabled and filled. ===== */
function initAds() {
  const cfg = window.EASY_ADS || {};
  const slots = Array.prototype.slice.call(document.querySelectorAll('.ad-slot'));
  if (!slots.length) return;
  const file = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '') || 'index';
  const excluded = Array.isArray(cfg.excludePages) && cfg.excludePages.indexOf(file) > -1;
  const max = typeof cfg.maxPerPage === 'number' ? cfg.maxPerPage : 2;
  const code = cfg.slots || {};
  let shown = 0;
  let anyVisible = false;

  slots.forEach(function (el, i) {
    const key = i === slots.length - 1 ? 'bottom' : 'inContent';
    const html = typeof code[key] === 'string' ? code[key].trim() : '';
    if (cfg.enabled && !excluded && html && shown < max) {
      Array.prototype.slice.call(el.querySelectorAll('.ad-slot-placeholder-text, .ad-slot-disclaimer')).forEach(function (n) { n.remove(); });
      const box = document.createElement('div');
      box.className = 'ad-slot-content';
      box.appendChild(document.createRange().createContextualFragment(html));
      el.appendChild(box);
      shown++;
      anyVisible = true;
    } else if (cfg.showPlaceholders) {
      anyVisible = true;
    } else {
      el.remove();
    }
  });
  if (anyVisible) document.documentElement.classList.add('ads-on');
}
