document.addEventListener('DOMContentLoaded', function() {
    initializeWorkflowPage();
});

function initializeWorkflowPage() {
    initializeScrollTriggeredAnimations();
    initializeNodeInteractions();
}

function initializeScrollTriggeredAnimations() {
    const verticalFlow = document.querySelector('.vertical-flow');
    if (!verticalFlow) return;

    const wrappers = verticalFlow.querySelectorAll('.workflow-step-wrapper');
    const nodes = verticalFlow.querySelectorAll('.workflow-node');
    const arrows = verticalFlow.querySelectorAll('.workflow-arrow-vertical');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
            }
        });
    }, observerOptions);

    wrappers.forEach(wrapper => {
        observer.observe(wrapper);
    });

    nodes.forEach(node => {
        observer.observe(node);
    });

    arrows.forEach(arrow => {
        observer.observe(arrow);
    });

    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        observer.observe(card);
    });
}

function initializeNodeInteractions() {
    const nodes = document.querySelectorAll('.workflow-node');

    nodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            nodes.forEach(n => {
                if (n !== node) {
                    n.style.opacity = '0.5';
                }
            });
        });

        node.addEventListener('mouseleave', function() {
            nodes.forEach(n => {
                n.style.opacity = '1';
            });
        });
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
