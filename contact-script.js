document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

function initializeContactPage() {
    initializeFormHandling();
    initializeFAQAccordion();
    initializeScrollAnimations();
}

function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const successOverlay = document.getElementById('successOverlay');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateForm(contactForm)) {
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }

    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function() {
            hideSuccessMessage();
        });
    }

    if (successOverlay) {
        successOverlay.addEventListener('click', function() {
            hideSuccessMessage();
        });
    }
}

function validateForm(form) {
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const company = form.querySelector('#company').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name) {
        alert('Please enter your full name');
        return false;
    }

    if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    if (!company) {
        alert('Please enter your company name');
        return false;
    }

    if (!subject) {
        alert('Please select a subject');
        return false;
    }

    if (!message) {
        alert('Please enter your message');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    const successOverlay = document.getElementById('successOverlay');

    successMessage.classList.add('show');
    successOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        hideSuccessMessage();
    }, 5000);
}

function hideSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    const successOverlay = document.getElementById('successOverlay');

    successMessage.classList.remove('show');
    successOverlay.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function initializeFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
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

    const animatedElements = document.querySelectorAll('.info-card, .faq-item');

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

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const successMessage = document.getElementById('successMessage');
        if (successMessage.classList.contains('show')) {
            hideSuccessMessage();
        }
    }
});
