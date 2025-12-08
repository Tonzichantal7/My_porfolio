document.addEventListener('DOMContentLoaded', function () {
    // Support multiple navbars on a page. Each button should have
    // aria-controls="<id-of-nav>" or be adjacent to a .nav-links element.
    const toggles = Array.from(document.querySelectorAll('.menu-toggle'));

    toggles.forEach(menuToggle => {
        // try aria-controls first
        const controlsId = menuToggle.getAttribute('aria-controls');
        let navLinks = controlsId ? document.getElementById(controlsId) : null;

        // fallback: nearest .nav-links sibling inside the same nav
        if (!navLinks) {
            const nav = menuToggle.closest('nav');
            if (nav) navLinks = nav.querySelector('.nav-links');
        }

        if (!navLinks) return;
        const icon = menuToggle.querySelector('i');

        function closeMenu() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }

        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            const isActive = navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', String(isActive));
            if (icon) {
                if (isActive) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }

            // prevent body scroll on small screens when menu is open
            try {
                const isMobile = window.matchMedia('(max-width: 768px)').matches;
                if (isMobile) {
                    if (isActive) document.body.classList.add('no-scroll');
                    else document.body.classList.remove('no-scroll');
                }
            } catch (err) {
                // ignore
            }
        });

        // Close menu when clicking a nav link (useful on mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    closeMenu();
                    // remove no-scroll class too
                    document.body.classList.remove('no-scroll');
                }
            });
        });

        // Close on Escape key when this nav is open
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
                document.body.classList.remove('no-scroll');
            }
        });

        // Close when clicking outside the nav (use capture to handle early)
        document.addEventListener('click', function (ev) {
            const target = ev.target;
            const nav = menuToggle.closest('nav') || document;
            if (!navLinks.classList.contains('active')) return;
            if (menuToggle.contains(target) || navLinks.contains(target)) return;
            closeMenu();
            document.body.classList.remove('no-scroll');
        }, true);

        // Also handle touchstart for mobile
        document.addEventListener('touchstart', function (ev) {
            const target = ev.target;
            if (!navLinks.classList.contains('active')) return;
            if (menuToggle.contains(target) || navLinks.contains(target)) return;
            closeMenu();
            document.body.classList.remove('no-scroll');
        }, true);

    });
});
