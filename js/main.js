document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScroll();
    initScrollSpy();
    initScrollReveal();
    initCalendlyLoader();
});

/**
 * Navigation functionality - mobile menu toggle and scroll behavior
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const header = document.querySelector('.header');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu_link');

    const updateHeaderState = () => {
        header?.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    // Mobile menu toggle
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

/**
 * Adds subtle reveal animations to common content blocks.
 */
function initScrollReveal() {
    const revealTargets = document.querySelectorAll([
        '.section .card',
        '.about-card',
        '.about-section',
        '.content-card',
        '.project-card',
        '.link-list li',
        '.calendly-inline-widget'
    ].join(','));

    if (revealTargets.length === 0) return;

    revealTargets.forEach((target, index) => {
        target.classList.add('reveal-on-scroll');
        target.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
    });

    if (!('IntersectionObserver' in window)) {
        revealTargets.forEach(target => target.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12
    });

    revealTargets.forEach(target => observer.observe(target));
}

/**
 * Show a loading spinner until the Calendly iframe finishes loading.
 */
function initCalendlyLoader() {
    const wrapper = document.getElementById('calendly-wrapper');
    if (!wrapper) return;

    // Helper to attach load listener when iframe appears
    const attach = (iframe) => {
        if (!iframe) return;
        iframe.addEventListener('load', () => {
            wrapper.classList.add('loaded');
        });
    };

    // Try to find the iframe immediately (Calendly may have already injected it)
    let iframe = wrapper.querySelector('iframe');
    if (iframe) {
        attach(iframe);
        return;
    }

    // If not present yet, poll for it (max 10 seconds)
    const pollInterval = 200;
    let elapsed = 0;
    const poll = setInterval(() => {
        iframe = wrapper.querySelector('iframe');
        if (iframe) {
            attach(iframe);
            clearInterval(poll);
        }
        elapsed += pollInterval;
        if (elapsed >= 10000) {
            // Stop polling after timeout to avoid endless loop
            clearInterval(poll);
        }
    }, pollInterval);
}
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

    // Navbar background on scroll
    if (navbar) {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.style.background = 'rgba(18, 18, 18, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(18, 18, 18, 0.95)';
                navbar.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        });
    }

// Initialize AOS (Animate On Scroll) if library is loaded
document.addEventListener('DOMContentLoaded', function () {
    if (window.AOS) {
        AOS.init({
            once: true,
            duration: 800
        });
    }
});

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll spy - updates active nav link based on scroll position
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav_link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}
