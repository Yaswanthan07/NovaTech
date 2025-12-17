document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeScrollAnimations();
});

function initializeEventListeners() {
    const uploadBtn = document.getElementById('uploadBtn');
    const navLinks = document.querySelectorAll('.nav-link');

    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            showUploadModal();
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function showUploadModal() {
    alert('Upload RFP feature coming soon!\n\nThis will open a modal for uploading tender documents.');
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.workflow-step, .team-chip, .stat'
    );

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 52, 204, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 52, 204, 0.08)';
    }
});
