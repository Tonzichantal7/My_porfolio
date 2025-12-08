document.addEventListener('DOMContentLoaded', function () {
    // Find all menu toggle buttons on the page
    const toggles = document.querySelectorAll('.menu-toggle');
    
    toggles.forEach(menuToggle => {
        const controlsId = menuToggle.getAttribute('aria-controls');
        let navLinks = controlsId ? document.getElementById(controlsId) : null;
        
        // Fallback: find nearest .nav-links
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
            
            document.body.classList.remove('no-scroll');
        }
        
        function openMenu() {
            navLinks.classList.add('active');
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
            
            // Only prevent scroll on mobile
            if (window.innerWidth <= 768) {
                document.body.classList.add('no-scroll');
            }
        }
        
        // Click handler for the toggle button
        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Close menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                closeMenu();
            });
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu when clicking outside of it
        document.addEventListener('click', function (e) {
            // Only act if menu is open
            if (!navLinks.classList.contains('active')) return;
            
            // Don't close if clicking inside nav or on toggle button
            if (navLinks.contains(e.target) || menuToggle.contains(e.target)) return;
            
            closeMenu();
        });
    });
});
