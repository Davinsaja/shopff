// Loading Screen
const loadingScreen = document.getElementById('loadingScreen');
const loadingProgress = document.getElementById('loadingProgress');

let progress = 0;
const loadingInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);

        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.classList.add('page-loaded');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 300);
    }
    if (loadingProgress) {
        loadingProgress.style.width = progress + '%';
    }
}, 100);

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

function setupContactLinks() {
    const wa = getWhatsAppNumber();
    const display = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsappDisplay)
        ? SITE_CONFIG.whatsappDisplay
        : '0819 4409 0188';
    const waUrl = `https://wa.me/${wa}`;

    const phoneEl = document.getElementById('contactPhone');
    if (phoneEl) phoneEl.textContent = display;

    ['contactWhatsAppBtn', 'navWhatsAppBtn', 'fabWhatsApp'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.href = id === 'fabWhatsApp'
                ? `${waUrl}?text=${encodeURIComponent('Halo GameVault, saya ingin tanya produk akun game.')}`
                : waUrl;
        }
    });

    const navWa = document.getElementById('navWhatsAppBtn');
    if (navWa) {
        navWa.addEventListener('click', () => closeNavMenu());
    }
}

function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const doc = document.documentElement;
        const scrolled = doc.scrollTop;
        const max = doc.scrollHeight - doc.clientHeight;
        bar.style.width = max > 0 ? `${(scrolled / max) * 100}%` : '0%';
    }, { passive: true });
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
    const sections = ['home', 'products', 'testimonials', 'contact'];
    const links = document.querySelectorAll('.nav-link[data-section]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            links.forEach(link => {
                link.classList.toggle('active', link.dataset.section === id);
            });
        });
    }, {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0
    });

    sections.forEach(id => {
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
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
        closeNavMenu();
    }
});

// Render produk dari products.js
const WA_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid || typeof PRODUCTS === 'undefined') return;

    grid.innerHTML = PRODUCTS.map((p, index) => {
        const featuresHtml = (p.features || []).slice(0, 3)
            .map(f => `<span class="feature">✓ ${escapeHtml(f)}</span>`)
            .join('');

        return `
        <article class="product-card fade-up" data-product-id="${escapeHtml(p.id)}" style="--stagger: ${index * 0.07}s">
            <button type="button" class="card-image-btn" data-open-detail="${escapeHtml(p.id)}" aria-label="Lihat detail ${escapeHtml(p.title)}">
                <div class="card-image">
                    <div class="game-badge">${escapeHtml(p.game)}</div>
                    <div class="card-overlay"></div>
                    <img src="${escapeHtml(p.thumbnail)}" alt="${escapeHtml(p.title)}" loading="lazy">
                    <span class="card-image-hint">Klik untuk detail</span>
                </div>
            </button>
            <div class="card-content">
                <h3 class="card-title">${escapeHtml(p.title)}</h3>
                <p class="card-description">${escapeHtml(p.description)}</p>
                <div class="card-features">${featuresHtml}</div>
                <div class="card-price">
                    <span class="price-label">Harga</span>
                    <span class="price-value">Rp ${escapeHtml(p.price)}</span>
                </div>
                <button type="button" class="btn btn-whatsapp" data-wa-id="${escapeHtml(p.id)}">
                    ${WA_ICON}
                    Beli via WhatsApp
                </button>
            </div>
        </article>`;
    }).join('');

    grid.querySelectorAll('[data-open-detail]').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = PRODUCTS.find(p => p.id === btn.dataset.openDetail);
            if (product) openProductModal(product);
        });
    });

    grid.querySelectorAll('[data-wa-id]').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = PRODUCTS.find(p => p.id === btn.dataset.waId);
            if (product) openWhatsApp(product.title, product.price);
        });
    });

    registerFadeAnimations(grid);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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

    if (!modal) return;

    const detailSrc = product.detailImage || product.thumbnail;
    const fullDesc = product.descriptionFull || product.description;

    modalImage.src = detailSrc;
    modalImage.alt = product.title;
    modalTitle.textContent = product.title;
    modalDescription.textContent = fullDesc;
    modalGameBadge.textContent = product.game;
    modalPrice.textContent = 'Rp ' + product.price;

    modalSpecs.innerHTML = '';
    (product.specs || []).forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        modalSpecs.appendChild(li);
    });

    modalWhatsAppBtn.onclick = () => openWhatsApp(product.title, product.price);

    modal.classList.add('active');
    document.body.classList.add('no-scroll');
    const fab = document.getElementById('fabWhatsApp');
    if (fab) fab.style.visibility = 'hidden';
    closeNavMenu();
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (!modal || !modal.classList.contains('active')) return;
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
    const fab = document.getElementById('fabWhatsApp');
    if (fab) fab.style.visibility = '';
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
    registerFadeAnimations();
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
    if (!testimonialTrack) return;
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
        if (isModalOpen()) closeModal();
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

document.addEventListener('DOMContentLoaded', () => {
    setupContactLinks();
    renderProducts();
    initScrollProgress();
    initBackToTop();
    initScrollSpy();
    initAnimations();

    if (loadingScreen && loadingScreen.classList.contains('hidden')) {
        document.body.classList.add('page-loaded');
    }
});

// Global untuk onclick di HTML (modal tutup)
window.closeModal = closeModal;
window.openWhatsApp = openWhatsApp;
window.openProductModal = openProductModal;
