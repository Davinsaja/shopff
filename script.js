// Loading Screen — animasi halus (easing)
const loadingScreen = document.getElementById('loadingScreen');
const loadingProgress = document.getElementById('loadingProgress');

function finishLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 280);
    }
    document.body.classList.add('page-loaded');
}

const IS_COARSE_POINTER = window.matchMedia('(pointer: coarse)').matches;
const IS_NARROW_VIEW = window.matchMedia('(max-width: 768px)').matches;

function runLoadingAnimation() {
    try {
        if (sessionStorage.getItem('vinsz-visited') === '1') {
            if (loadingProgress) loadingProgress.style.width = '100%';
            finishLoadingScreen();
            return;
        }
        sessionStorage.setItem('vinsz-visited', '1');
    } catch (e) { /* ignore */ }

    const duration = IS_NARROW_VIEW ? 500 : 700;
    const start = performance.now();

    function frame(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const pct = Math.round(eased * 100);
        if (loadingProgress) {
            loadingProgress.style.width = pct + '%';
        }
        if (t < 1) {
            requestAnimationFrame(frame);
        } else {
            finishLoadingScreen();
        }
    }

    requestAnimationFrame(frame);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runLoadingAnimation);
} else {
    runLoadingAnimation();
}

// WhatsApp dari products.js
function getWhatsAppNumber() {
    return (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsapp)
        ? SITE_CONFIG.whatsapp
        : '6281944090188';
}

function openWhatsApp(productName, price) {
    const message = `Halo, saya tertarik membeli akun game:\n\nNama: ${productName}\nHarga: Rp ${price}\n\nApakah masih tersedia?`;
    const whatsappURL = `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
}

function getInstagramUrl() {
    return (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.instagram)
        ? SITE_CONFIG.instagram
        : 'https://www.instagram.com/dapin.saja?igsh=NWxjaWt3bTc3cGlk';
}

function setupContactLinks() {
    const wa = getWhatsAppNumber();
    const display = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsappDisplay)
        ? SITE_CONFIG.whatsappDisplay
        : '0819 4409 0188';
    const waUrl = `https://wa.me/${wa}`;
    const igUrl = getInstagramUrl();

    const phoneEl = document.getElementById('contactPhone');
    if (phoneEl) phoneEl.textContent = display;

    ['contactWhatsAppBtn', 'navWhatsAppBtn', 'navWhatsAppBtnDrawer', 'fabWhatsApp'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.href = id === 'fabWhatsApp'
                ? `${waUrl}?text=${encodeURIComponent('Halo VinszShop, saya ingin tanya produk akun game.')}`
                : waUrl;
        }
    });

    ['contactInstagram', 'footerInstagram'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.href = igUrl;
    });

    const footerWa = document.getElementById('footerWhatsApp');
    if (footerWa) footerWa.href = waUrl;

    if (typeof SITE_CONFIG !== 'undefined') {
        const taglineEl = document.getElementById('footerTagline');
        if (taglineEl && SITE_CONFIG.tagline) taglineEl.textContent = SITE_CONFIG.tagline;
    }

    document.querySelectorAll('#navWhatsAppBtn, #navWhatsAppBtnDrawer').forEach(el => {
        el.addEventListener('click', () => closeNavMenu());
    });
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.pageYOffset > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initScrollSpy() {
    const sectionIds = ['home', 'products', 'testimonials', 'faq', 'contact'];
    const links = document.querySelectorAll('.nav-link[data-section]');
    const visibility = new Map();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            visibility.set(
                entry.target.id,
                entry.isIntersecting ? entry.intersectionRatio : 0
            );
        });

        let activeId = sectionIds[0];
        let bestRatio = 0;
        sectionIds.forEach(id => {
            const ratio = visibility.get(id) || 0;
            if (ratio > bestRatio) {
                bestRatio = ratio;
                activeId = id;
            }
        });

        links.forEach(link => {
            link.classList.toggle('active', link.dataset.section === activeId);
        });
    }, {
        rootMargin: '-22% 0px -58% 0px',
        threshold: [0, 0.15, 0.3, 0.5, 0.75]
    });

    sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
}

// Navbar
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.pageYOffset > 50);
}, { passive: true });

function setBodyScrollLock(locked) {
    document.body.classList.toggle('no-scroll', locked);
}

function closeNavMenu() {
    if (!navToggle || !navMenu || !mobileMenuOverlay) return;
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    mobileMenuOverlay.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Buka menu');
    navbar.classList.remove('menu-open');
    setBodyScrollLock(false);
}

function openNavMenu() {
    navToggle.classList.add('active');
    navMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    mobileMenuOverlay.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Tutup menu');
    navbar.classList.add('menu-open');
    setBodyScrollLock(true);
}

if (navToggle && navMenu && mobileMenuOverlay) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navMenu.classList.contains('active')) {
            closeNavMenu();
        } else {
            openNavMenu();
        }
    });

    mobileMenuOverlay.addEventListener('click', closeNavMenu);

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeNavMenu();
        });
    });

    document.querySelectorAll('.nav-icon-faq').forEach(link => {
        link.addEventListener('click', () => closeNavMenu());
    });
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
        closeNavMenu();
    }
});

// Render produk dari products.js
const WA_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

const ZOOM_ICON = `<svg class="zoom-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`;

let activeFilter = 'all';
let activeStockFilter = 'all';
let searchQuery = '';
let activeSort = 'newest';

function parseProductPrice(price) {
    return parseInt(String(price).replace(/\D/g, ''), 10) || 0;
}

function sortProducts(list) {
    const sorted = [...list];
    switch (activeSort) {
        case 'price-asc':
            sorted.sort((a, b) => parseProductPrice(a.price) - parseProductPrice(b.price));
            break;
        case 'price-desc':
            sorted.sort((a, b) => parseProductPrice(b.price) - parseProductPrice(a.price));
            break;
        case 'name':
            sorted.sort((a, b) => a.title.localeCompare(b.title, 'id'));
            break;
        default:
            break;
    }
    return sorted;
}

function getProductCategory(product) {
    if (product.category) return product.category;
    const game = (product.game || '').toUpperCase();
    if (game.includes('MOBILE LEGENDS') || game.includes('MLBB') || game === 'ML') return 'ml';
    if (game.includes('FREE FIRE') || game === 'FF') return 'ff';
    if (game.includes('PUBG')) return 'pubg';
    return 'lainnya';
}

function getStatusLabel(soldOut) {
    return soldOut
        ? { emoji: '❌', text: 'Sold Out', className: 'status-sold' }
        : { emoji: '✅', text: 'Tersedia', className: 'status-available' };
}

function productMatchesSearch(product, query) {
    if (!query) return true;
    const haystack = [
        product.title,
        product.game,
        product.description,
        product.descriptionFull,
        product.price,
        ...(product.features || []),
        ...(product.specs || [])
    ].join(' ').toLowerCase();
    return haystack.includes(query);
}

function getFilteredProducts() {
    const q = searchQuery.trim().toLowerCase();
    const filtered = PRODUCTS.filter(p => {
        const cat = getProductCategory(p);
        if (activeFilter !== 'all' && cat !== activeFilter) return false;
        if (activeStockFilter === 'available' && p.soldOut) return false;
        if (activeStockFilter === 'soldout' && !p.soldOut) return false;
        return productMatchesSearch(p, q);
    });
    return sortProducts(filtered);
}

function getCardThumbSrc(product) {
    return product.thumbnail || product.detailImage || '';
}

function buildProductCardHtml(p, index) {
    const soldOut = Boolean(p.soldOut);
    const cat = getProductCategory(p);
    const statusTagClass = soldOut ? 'card-status-tag--sold' : 'card-status-tag--ready';
    const statusLabel = soldOut ? 'Habis' : 'Tersedia';
    const thumb = getCardThumbSrc(p);
    const imgClass = soldOut ? 'img-sold-out' : '';
    const fetchPri = index < 4 ? ' fetchpriority="high"' : '';

    return `
        <article class="product-card${soldOut ? ' is-sold-out' : ''}" data-product-id="${escapeHtml(p.id)}" data-category="${escapeHtml(cat)}" data-sold-out="${soldOut}">
            <div class="card-image-wrap">
                <button type="button" class="card-image-btn" data-open-detail="${escapeHtml(p.id)}" aria-label="Lihat detail ${escapeHtml(p.title)}">
                    <div class="card-image">
                        ${soldOut ? '<div class="sold-out-veil" aria-hidden="true"></div><span class="sold-out-stamp">HABIS</span>' : ''}
                        <img src="${escapeHtml(thumb)}" alt="" width="400" height="500" loading="lazy" decoding="async"${fetchPri}${imgClass ? ` class="${imgClass}"` : ''}>
                    </div>
                </button>
                <button type="button" class="card-zoom-btn" data-zoom-src="${escapeHtml(thumb)}" data-zoom-alt="${escapeHtml(p.title)}" aria-label="Perbesar foto ${escapeHtml(p.title)}">${ZOOM_ICON}</button>
            </div>
            <div class="card-body">
                <div class="card-meta-tags">
                    <span class="card-game-tag">${escapeHtml(p.game)}</span>
                    <span class="card-status-tag ${statusTagClass}"><span class="status-dot" aria-hidden="true"></span>${statusLabel}</span>
                </div>
                <h3 class="card-title">${escapeHtml(p.title)}</h3>
                <p class="card-description">${escapeHtml(p.description)}</p>
                <div class="card-price-block">
                    <span class="card-price-label">Harga</span>
                    <span class="card-price-value">Rp ${escapeHtml(p.price)}</span>
                </div>
                <div class="card-actions">
                    <button type="button" class="btn-card-buy btn-primary-buy${soldOut ? ' btn-disabled' : ''}" data-wa-id="${escapeHtml(p.id)}"${soldOut ? ' disabled' : ''}>${soldOut ? 'Habis' : 'Beli'}</button>
                    <button type="button" class="btn-card-detail" data-open-detail="${escapeHtml(p.id)}">Detail</button>
                </div>
            </div>
        </article>`;
}

function updateCatalogResult(count) {
    const el = document.getElementById('catalogResult');
    if (!el) return;

    if (count > 0) {
        el.hidden = true;
        el.textContent = '';
        return;
    }

    const q = searchQuery.trim();
    const filtered =
        activeFilter !== 'all' || activeStockFilter !== 'all' || q.length > 0;

    el.hidden = false;
    el.textContent = filtered
        ? 'Tidak ada akun yang cocok dengan filter ini'
        : 'Belum ada akun di katalog';
    el.classList.add('catalog-result--empty');
}

function debounce(fn, wait) {
    let timer;
    return function debounced(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), wait);
    };
}

let renderProductsRaf = 0;

function scheduleRenderProducts() {
    if (renderProductsRaf) cancelAnimationFrame(renderProductsRaf);
    renderProductsRaf = requestAnimationFrame(() => {
        renderProductsRaf = 0;
        renderProducts();
    });
}

const debouncedRenderProducts = debounce(scheduleRenderProducts, 280);

function initProductGridEvents() {
    const grid = document.getElementById('productsGrid');
    if (!grid || grid.dataset.delegateBound === '1') return;
    grid.dataset.delegateBound = '1';

    grid.addEventListener('click', (e) => {
        const zoomBtn = e.target.closest('[data-zoom-src]');
        if (zoomBtn) {
            e.stopPropagation();
            e.preventDefault();
            openImageZoom(zoomBtn.dataset.zoomSrc, zoomBtn.dataset.zoomAlt || '');
            return;
        }

        const waBtn = e.target.closest('[data-wa-id]');
        if (waBtn) {
            const product = PRODUCTS.find(p => p.id === waBtn.dataset.waId);
            if (!product || product.soldOut) return;
            openWhatsApp(product.title, product.price);
            return;
        }

        const detailBtn = e.target.closest('[data-open-detail]');
        if (detailBtn) {
            const product = PRODUCTS.find(p => p.id === detailBtn.dataset.openDetail);
            if (product) openProductModal(product);
        }
    });
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const emptyEl = document.getElementById('productsEmpty');
    if (!grid || typeof PRODUCTS === 'undefined') return;

    const filtered = getFilteredProducts();

    grid.innerHTML = filtered.map((p, index) => buildProductCardHtml(p, index)).join('');

    if (emptyEl) {
        emptyEl.hidden = filtered.length > 0;
    }

    updateCatalogResult(filtered.length);
}

function setFilterGroupActive(buttons, activeBtn) {
    buttons.forEach(b => {
        const active = b === activeBtn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
    });
}

function initProductFilters() {
    const toolbar = document.getElementById('productsToolbar');
    if (!toolbar || toolbar.dataset.filtersBound === '1') return;
    toolbar.dataset.filtersBound = '1';

    const gameFilterBtns = toolbar.querySelectorAll('.catalog-chips-game .filter-btn[data-filter]');
    const stockFilterBtns = toolbar.querySelectorAll('.catalog-stock-chips .filter-btn[data-stock-filter]');
    const searchInput = document.getElementById('productSearch');
    const searchClear = document.getElementById('searchClear');

    gameFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.dataset.filter;
            setFilterGroupActive(gameFilterBtns, btn);
            scheduleRenderProducts();
        });
    });

    stockFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            activeStockFilter = btn.dataset.stockFilter;
            setFilterGroupActive(stockFilterBtns, btn);
            scheduleRenderProducts();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            searchQuery = searchInput.value;
            if (searchClear) searchClear.hidden = !searchQuery.length;
            debouncedRenderProducts();
        });
    }

    if (searchClear && searchInput) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            searchClear.hidden = true;
            searchInput.focus();
            scheduleRenderProducts();
        });
    }

    const sortSelect = document.getElementById('productSort');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            activeSort = sortSelect.value;
            scheduleRenderProducts();
        });
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Zoom foto (tombol +)
let currentZoomSrc = '';

function openImageZoom(src, alt) {
    const modal = document.getElementById('imageZoomModal');
    const img = document.getElementById('imageZoomImg');
    if (!modal || !img || !src) return;

    currentZoomSrc = src;
    img.alt = alt || 'Foto produk';
    img.src = src;
    img.classList.remove('is-loading');
    modal.removeAttribute('hidden');
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
    const fab = document.getElementById('fabWhatsApp');
    if (fab) fab.style.visibility = 'hidden';
}

function closeImageZoom() {
    const modal = document.getElementById('imageZoomModal');
    if (!modal || !modal.classList.contains('active')) return;
    const img = document.getElementById('imageZoomImg');
    if (img) {
        img.removeAttribute('src');
        img.classList.remove('is-loading');
    }
    modal.classList.remove('active');
    modal.setAttribute('hidden', '');
    currentZoomSrc = '';
    if (!isModalOpen()) {
        document.body.classList.remove('no-scroll');
        const fab = document.getElementById('fabWhatsApp');
        if (fab) fab.style.visibility = '';
    }
}

function isImageZoomOpen() {
    const modal = document.getElementById('imageZoomModal');
    return modal && modal.classList.contains('active');
}

function initImageZoom() {
    const overlay = document.getElementById('imageZoomOverlay');
    const closeBtn = document.getElementById('imageZoomClose');
    if (overlay) overlay.addEventListener('click', closeImageZoom);
    if (closeBtn) closeBtn.addEventListener('click', closeImageZoom);
}

function renderFaq() {
    const list = document.getElementById('faqList');
    if (!list || typeof FAQ_ITEMS === 'undefined') return;

    list.innerHTML = FAQ_ITEMS.map((item, i) => `
        <div class="faq-item" role="listitem">
            <button type="button" class="faq-question" id="faq-btn-${i}" aria-expanded="false" aria-controls="faq-answer-${i}">
                <span class="faq-question-text">${escapeHtml(item.question)}</span>
                <span class="faq-icon" aria-hidden="true">
                    <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
                </span>
            </button>
            <div class="faq-answer" id="faq-answer-${i}" role="region" aria-labelledby="faq-btn-${i}" hidden>
                <p>${escapeHtml(item.answer)}</p>
            </div>
        </div>
    `).join('');
}

function initFaqAccordion() {
    const list = document.getElementById('faqList');
    if (!list || list.dataset.faqBound === '1') return;
    list.dataset.faqBound = '1';

    list.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const answer = item.querySelector('.faq-answer');
            const isOpen = item.classList.contains('open');

            list.querySelectorAll('.faq-item.open').forEach(openItem => {
                if (openItem === item) return;
                openItem.classList.remove('open');
                const q = openItem.querySelector('.faq-question');
                const a = openItem.querySelector('.faq-answer');
                if (q) q.setAttribute('aria-expanded', 'false');
                if (a) a.setAttribute('hidden', '');
            });

            item.classList.toggle('open', !isOpen);
            btn.setAttribute('aria-expanded', String(!isOpen));
            if (isOpen) {
                answer.setAttribute('hidden', '');
            } else {
                answer.removeAttribute('hidden');
            }
        });
    });
}

// Product Modal — foto detail bisa beda (detailImage)
function openProductModal(product) {
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalGameBadge = document.getElementById('modalGameBadge');
    const modalPrice = document.getElementById('modalPrice');
    const modalSpecs = document.getElementById('modalSpecs');
    const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

    if (!modal || !modalWhatsAppBtn) return;

    const thumbSrc = getCardThumbSrc(product);
    const fullDesc = product.descriptionFull || product.description;

    modal.classList.add('active');
    document.body.classList.add('no-scroll');

    modalImage.alt = product.title;
    modalImage.src = thumbSrc;
    modalImage.classList.remove('is-loading');

    const modalZoomBtn = document.getElementById('modalZoomBtn');
    if (modalZoomBtn) {
        modalZoomBtn.onclick = (e) => {
            e.stopPropagation();
            openImageZoom(thumbSrc, product.title);
        };
    }

    const soldOut = Boolean(product.soldOut);
    const status = getStatusLabel(soldOut);

    modalTitle.textContent = product.title;
    modalDescription.textContent = fullDesc;
    modalGameBadge.textContent = product.game;
    modalPrice.textContent = 'Rp ' + product.price;

    const modalStatus = document.getElementById('modalStatus');
    if (modalStatus) {
        const ready = !soldOut;
        modalStatus.className = 'modal-status-tag ' + (ready ? 'modal-status-tag--ready' : 'modal-status-tag--sold');
        modalStatus.innerHTML = `<span class="status-dot" aria-hidden="true"></span>${status.text}`;
    }

    modalSpecs.innerHTML = '';
    (product.specs || []).forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        modalSpecs.appendChild(li);
    });

    const waMsg = `Halo, saya tertarik membeli akun game:\n\nNama: ${product.title}\nHarga: Rp ${product.price}\n\nApakah masih tersedia?`;
    const waUrl = `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(waMsg)}`;

    if (soldOut) {
        modalWhatsAppBtn.href = '#';
        modalWhatsAppBtn.setAttribute('aria-disabled', 'true');
        modalWhatsAppBtn.classList.add('btn-disabled');
        modalWhatsAppBtn.innerHTML = '❌ Sudah Terjual';
        modalWhatsAppBtn.onclick = (e) => e.preventDefault();
    } else {
        modalWhatsAppBtn.href = waUrl;
        modalWhatsAppBtn.removeAttribute('aria-disabled');
        modalWhatsAppBtn.classList.remove('btn-disabled');
        modalWhatsAppBtn.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Beli via WhatsApp`;
        modalWhatsAppBtn.onclick = null;
    }

    modal.classList.toggle('modal-sold-out', soldOut);

    const fab = document.getElementById('fabWhatsApp');
    if (fab) fab.style.visibility = 'hidden';
    closeNavMenu();
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (!modal || !modal.classList.contains('active')) return;
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.removeAttribute('src');
        modalImage.classList.remove('is-loading');
    }
    modal.classList.remove('active', 'modal-sold-out');
    if (!isImageZoomOpen()) {
        document.body.classList.remove('no-scroll');
        const fab = document.getElementById('fabWhatsApp');
        if (fab) fab.style.visibility = '';
    }
}

function isModalOpen() {
    const modal = document.getElementById('productModal');
    return modal && modal.classList.contains('active');
}

// Fade-up saat scroll (halus + stagger via --stagger)
let fadeObserver;

function registerFadeAnimations(root = document) {
    if (!fadeObserver) {
        fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    }

    const scope = root === document ? document : root;
    scope.querySelectorAll('.fade-up:not([data-fade-watched])').forEach(el => {
        el.dataset.fadeWatched = '1';
        fadeObserver.observe(el);
    });
}

function initAnimations() {
    document.querySelectorAll('.fade-up').forEach(el => {
        el.classList.add('visible');
    });
}

// Testimonial Slider
const testimonialTrack = document.getElementById('testimonialTrack');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');

function getSlideWidth() {
    if (!testimonialTrack) return 330;
    const card = testimonialTrack.querySelector('.testimonial-card');
    if (!card) return 330;
    const gap = parseFloat(getComputedStyle(testimonialTrack).gap) || 30;
    return card.offsetWidth + gap;
}

if (sliderNext && testimonialTrack) {
    sliderNext.addEventListener('click', () => {
        testimonialTrack.scrollBy({ left: getSlideWidth(), behavior: 'smooth' });
    });
}

if (sliderPrev && testimonialTrack) {
    sliderPrev.addEventListener('click', () => {
        testimonialTrack.scrollBy({ left: -getSlideWidth(), behavior: 'smooth' });
    });
}

let autoScrollInterval;

function startAutoScroll() {
    if (!testimonialTrack || IS_NARROW_VIEW) return;
    stopAutoScroll();
    autoScrollInterval = setInterval(() => {
        const slideWidth = getSlideWidth();
        const maxScroll = testimonialTrack.scrollWidth - testimonialTrack.clientWidth;
        if (testimonialTrack.scrollLeft >= maxScroll - 10) {
            testimonialTrack.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            testimonialTrack.scrollBy({ left: slideWidth, behavior: 'smooth' });
        }
    }, 5000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

if (testimonialTrack) {
    startAutoScroll();
    testimonialTrack.addEventListener('mouseenter', stopAutoScroll);
    testimonialTrack.addEventListener('mouseleave', startAutoScroll);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (isImageZoomOpen()) closeImageZoom();
        else if (isModalOpen()) closeModal();
        else if (navMenu && navMenu.classList.contains('active')) closeNavMenu();
        return;
    }
    if (isModalOpen()) return;
    if (e.key === 'ArrowLeft' && sliderPrev) sliderPrev.click();
    if (e.key === 'ArrowRight' && sliderNext) sliderNext.click();
});

// Smooth scroll (nav + footer)
function bindSmoothScroll(selector) {
    document.querySelectorAll(selector).forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#') || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
            const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top, behavior: 'smooth' });
            closeNavMenu();
        });
    });
}

bindSmoothScroll('a[href^="#"]:not(.nav-cta)');

function initModalDismiss() {
    const productModal = document.getElementById('productModal');
    if (!productModal || productModal.dataset.dismissBound === '1') return;
    productModal.dataset.dismissBound = '1';

    const overlay = productModal.querySelector('.modal-overlay');
    const closeBtn = productModal.querySelector('.modal-close');
    if (overlay) overlay.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
}

const THEME_KEY = 'vinszstore-theme';

function applyTheme(theme) {
    const root = document.documentElement;
    const isLight = theme === 'light';
    root.setAttribute('data-theme', theme);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isLight ? '#b8c5d6' : '#0b0f1a');

    document.querySelectorAll('.theme-toggle').forEach(toggle => {
        toggle.setAttribute('aria-label', isLight ? 'Mode terang (klik untuk gelap)' : 'Mode gelap (klik untuk terang)');
    });
}

function initThemeToggle() {
    const toggles = document.querySelectorAll('#themeToggle, .theme-toggle');
    if (!toggles.length) return;

    let theme = 'dark';
    try {
        theme =
            localStorage.getItem(THEME_KEY) ||
            localStorage.getItem('gamevault-theme') ||
            'dark';
        if (!localStorage.getItem(THEME_KEY)) {
            localStorage.setItem(THEME_KEY, theme);
        }
    } catch (e) {
        theme = 'dark';
    }
    applyTheme(theme);

    toggles.forEach(toggle => {
        if (toggle.dataset.themeBound === '1') return;
        toggle.dataset.themeBound = '1';
        toggle.addEventListener('click', () => {
            const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            try {
                localStorage.setItem(THEME_KEY, next);
            } catch (e) { /* ignore */ }
            applyTheme(next);
        });
    });
}

document.documentElement.classList.add('perf-lite');

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    setupContactLinks();
    initProductGridEvents();
    renderProducts();
    renderFaq();
    initFaqAccordion();
    initImageZoom();
    initModalDismiss();
    initProductFilters();
    initBackToTop();
    initScrollSpy();
    initAnimations();

    if (loadingScreen && loadingScreen.classList.contains('hidden')) {
        document.body.classList.add('page-loaded');
    }
});

// Global untuk onclick di HTML (modal tutup)
window.closeModal = closeModal;
window.closeImageZoom = closeImageZoom;
window.openWhatsApp = openWhatsApp;
window.openProductModal = openProductModal;
window.openImageZoom = openImageZoom;
