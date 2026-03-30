// ============================================================
// STICKY NAV — solid background + gold border on scroll
// ============================================================
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('hero');

function updateNav() {
    const threshold = heroSection.offsetHeight - 80;
    navbar.classList.toggle('scrolled', window.scrollY > threshold);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ============================================================
// ACTIVE NAV LINK — highlights section currently in view
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === '#' + entry.target.id
                );
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ============================================================
// SCROLL ANIMATIONS — fade up on viewport entry
// ============================================================
const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger siblings slightly
            const siblings = entry.target.parentElement.querySelectorAll('.animate-fade-up');
            siblings.forEach((el, idx) => {
                if (el === entry.target) {
                    entry.target.style.transitionDelay = (idx * 0.08) + 's';
                }
            });
            entry.target.classList.add('visible');
            animateObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.animate-fade-up').forEach(el => animateObserver.observe(el));

// ============================================================
// MOBILE MENU TOGGLE
// ============================================================
const toggle = document.querySelector('.nav-toggle');
const navLinksEl = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
});

// Close on link click
document.querySelectorAll('.nav-link, .nav-cv').forEach(link => {
    link.addEventListener('click', () => {
        navLinksEl.classList.remove('open');
        toggle.classList.remove('open');
    });
});

// Close on outside click
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinksEl.classList.contains('open')) {
        navLinksEl.classList.remove('open');
        toggle.classList.remove('open');
    }
});

// ============================================================
// ABSTRACT TOGGLE
// ============================================================
function toggleAbstract(id, btn) {
    const abstract = document.getElementById(id);
    const isOpen = abstract.classList.toggle('open');
    btn.textContent = isOpen ? 'Abstract ↑' : 'Abstract ↓';
}

// Expose globally for inline onclick handlers
window.toggleAbstract = toggleAbstract;
