// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        const isOpen = mobileMenu.classList.contains('active');
        
        // Toggle menu-open class on body to push content down
        if (isOpen) {
            body.classList.add('menu-open');
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});