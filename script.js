document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeScrollAnimations();
});

function initializeEventListeners() {
    const uploadBtn = document.getElementById('uploadBtn');
    const workflowBtn = document.getElementById('workflowBtn');
    const navLinks = document.querySelectorAll('.nav-link');

    if (uploadBtn) {
        uploadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.pdf';
            fileInput.multiple = true;
            
            fileInput.onchange = (e) => {
                const files = Array.from(e.target.files);
                if (files.length > 0) {
                    window.location.href = 'upload.html';
                }
            };
            
            fileInput.click();
        });
    }

    if (workflowBtn) {
        workflowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'workflow.html';
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
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.webkitdirectory = true;
    fileInput.directory = true;
    fileInput.multiple = true;
    fileInput.accept = '.pdf,.doc,.docx,.xls,.xlsx,.zip';
    
    fileInput.onchange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            window.location.href = 'upload.html';
        }
    };
    
    fileInput.click();
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
        '.workflow-step, .team-chip, .stat, .feature, .testimonial, .pricing-card, .timeline-item'
    );

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}