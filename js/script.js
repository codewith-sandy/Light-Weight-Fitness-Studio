/* ========================================
   FITNESS GYM PREMIUM - JAVASCRIPT
   ======================================== */

// WhatsApp Configuration
const WHATSAPP_NUMBER = '918668163718'; // Light Weight Fitness Gym

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initPreloader();
    initNavigation();
    initDynamicHeaderHeight(); // Dynamic header height for hero spacing
    initScrollAnimations();
    initBackToTop();
    initSmoothScroll();
    initFormHandler();
    initCounterAnimation();
    initGalleryFilter();
    initFAQ();
    initHeroVideo();
    initPremiumAddons();
});

/* ========================================
   DYNAMIC HEADER HEIGHT (Prevents navbar overlap)
   ======================================== */

function initDynamicHeaderHeight() {
    const announcementBar = document.getElementById('announcement-bar');
    const navbar = document.getElementById('navbar');
    const hero = document.querySelector('.hero');
    const sections = document.querySelectorAll('section[id]');
    
    function calculateAndApplyHeaderHeight() {
        let totalHeaderHeight = 0;
        
        // Calculate announcement bar height if present
        if (announcementBar) {
            totalHeaderHeight += announcementBar.offsetHeight;
        }
        
        // Calculate navbar height
        if (navbar) {
            totalHeaderHeight += navbar.offsetHeight;
        }
        
        // Add buffer for breathing room
        const buffer = 20;
        const finalHeight = totalHeaderHeight + buffer;
        
        // Apply to CSS custom property for global use
        document.documentElement.style.setProperty('--header-height', `${finalHeight}px`);
        
        // Apply padding to hero section
        if (hero) {
            hero.style.paddingTop = `${finalHeight}px`;
        }
        
        // Apply scroll-margin-top to all sections for anchor links
        sections.forEach(section => {
            section.style.scrollMarginTop = `${finalHeight}px`;
        });
    }
    
    // Run on initial load
    calculateAndApplyHeaderHeight();
    
    // Run on window resize (debounced for performance)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(calculateAndApplyHeaderHeight, 100);
    });
    
    // Run on orientation change (mobile)
    window.addEventListener('orientationchange', () => {
        setTimeout(calculateAndApplyHeaderHeight, 200);
    });
    
    // Expose function globally for menu toggle updates
    window.updateHeaderHeight = calculateAndApplyHeaderHeight;
}

/* ========================================
   PRELOADER
   ======================================== */

function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1000);
    });
    
    // Fallback - hide preloader after 3 seconds regardless
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 3000);
}

/* ========================================
   NAVIGATION
   ======================================== */

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        
        // Update header height calculation when menu toggles
        if (typeof window.updateHeaderHeight === 'function') {
            setTimeout(window.updateHeaderHeight, 50);
        }
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .plan-card, .review-card, .why-item, ' +
        '.about-content, .about-image, .gallery-item, .join-wrapper, ' +
        '.contact-item, .section-header, .premium-addon-card'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

/* ========================================
   BACK TO TOP BUTTON
   ======================================== */

function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   HERO VIDEO INITIALIZATION
   ======================================== */

function initHeroVideo() {
    const video = document.getElementById('hero-video');
    
    if (video) {
        // Add loaded class when video can play
        video.addEventListener('canplay', () => {
            video.classList.add('loaded');
        });
        
        // Fallback if video is already loaded
        if (video.readyState >= 3) {
            video.classList.add('loaded');
        }
        
        // Handle video loading errors gracefully
        video.addEventListener('error', () => {
            console.log('Video loading failed, showing fallback image');
            video.style.display = 'none';
        });
        
        // Pause video when not visible for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(video);
    }
}

/* ========================================
   CONTACT FORM HANDLER (Email + WhatsApp)
   ======================================== */

// Owner contact details
const OWNER_EMAIL = 'lightweightfitnessgym@gmail.com';

function initFormHandler() {
    const form = document.getElementById('lead-form');
    const emailBtn = document.getElementById('send-email-btn');
    const whatsappBtn = document.getElementById('send-whatsapp-btn');
    const formStatus = document.getElementById('form-status');
    
    if (!form) return;
    
    // Clear all errors
    function clearErrors() {
        const errorSpans = form.querySelectorAll('.field-error');
        errorSpans.forEach(span => {
            span.textContent = '';
            span.classList.remove('show');
        });
        
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('error');
        });
    }
    
    // Show field error
    function showFieldError(fieldId, message) {
        const errorSpan = document.getElementById(`${fieldId}-error`);
        const field = document.getElementById(fieldId);
        
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.classList.add('show');
        }
        if (field) {
            field.classList.add('error');
        }
    }
    
    // Show status message
    function showStatus(message, type = 'success') {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;
            formStatus.classList.add('show');
            
            // Auto-hide after 3 seconds
            setTimeout(() => {
                formStatus.classList.remove('show');
            }, 3000);
        }
    }
    
    // Validate form
    function validateForm() {
        clearErrors();
        let isValid = true;
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const plan = document.getElementById('plan').value;
        
        // Validate Name
        if (!name) {
            showFieldError('name', 'Please enter your full name');
            isValid = false;
        } else if (name.length < 2) {
            showFieldError('name', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showFieldError('email', 'Please enter your email address');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Phone
        const phoneRegex = /^[6-9]\d{9}$/;
        const cleanPhone = phone.replace(/\D/g, '');
        if (!phone) {
            showFieldError('phone', 'Please enter your phone number');
            isValid = false;
        } else if (!phoneRegex.test(cleanPhone)) {
            showFieldError('phone', 'Please enter a valid 10-digit phone number');
            isValid = false;
        }
        
        // Validate Plan
        if (!plan) {
            showFieldError('plan', 'Please select a plan or service');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Get form data
    function getFormData() {
        const planValue = document.getElementById('plan').value;
        const planParts = planValue.split('|');
        const planKey = planParts[0] || '';
        const planDisplay = planParts[1] || '';
        
        // Get selected add-ons
        const addonCheckboxes = form.querySelectorAll('input[name="form-addon"]:checked');
        const selectedAddons = Array.from(addonCheckboxes).map(cb => cb.value);
        
        return {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            planKey: planKey,
            planDisplay: planDisplay,
            addons: selectedAddons,
            message: document.getElementById('message').value.trim()
        };
    }
    
    // Generate formatted message
    function generateMessage(data) {
        let message = `New Gym Membership Enquiry\n\n`;
        message += `Name: ${data.name}\n`;
        message += `Email: ${data.email}\n`;
        message += `Phone: ${data.phone}\n`;
        message += `Selected Plan: ${data.planDisplay}\n`;
        if (data.addons.length > 0) {
            message += `\nSelected Add-Ons:\n`;
            data.addons.forEach(addon => {
                message += `  - ${addon}\n`;
            });
        }
        if (data.message) {
            message += `\nAdditional Message:\n${data.message}\n`;
        }
        message += `\n---\nSent from Light Weight Fitness Gym Website`;
        return message;
    }
    
    // Generate WhatsApp message
    function generateWhatsAppMessage(data) {
        let message = `🏋️ *New Gym Membership Enquiry*\n\n`;
        message += `📋 *Contact Details:*\n`;
        message += `━━━━━━━━━━━━━━━\n`;
        message += `👤 Name: ${data.name}\n`;
        message += `📧 Email: ${data.email}\n`;
        message += `📱 Phone: ${data.phone}\n`;
        message += `💳 Selected Plan: ${data.planDisplay}\n`;
        if (data.addons.length > 0) {
            message += `\n⭐ *Selected Add-Ons:*\n`;
            data.addons.forEach(addon => {
                message += `  ✅ ${addon}\n`;
            });
        }
        if (data.message) {
            message += `\n💬 *Additional Message:*\n${data.message}\n`;
        }
        message += `━━━━━━━━━━━━━━━\n\n`;
        message += `_Sent from Light Weight Fitness Gym Website_`;
        return message;
    }
    
    // Handle Email button click
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            if (!validateForm()) return;
            
            const data = getFormData();
            const message = generateMessage(data);
            const subject = 'New Gym Membership Enquiry';
            
            // Create mailto URL
            const mailtoURL = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
            
            // Show status message
            showStatus('Redirecting to Email...', 'info');
            
            // Open email client
            setTimeout(() => {
                window.location.href = mailtoURL;
            }, 500);
        });
    }
    
    // Handle WhatsApp button click
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            if (!validateForm()) return;
            
            const data = getFormData();
            const message = generateWhatsAppMessage(data);
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            
            // Show status message
            showStatus('Opening WhatsApp...', 'info');
            
            // Open WhatsApp in new tab
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
            }, 500);
        });
    }
    
    // Clear errors on input
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const errorSpan = document.getElementById(`${input.id}-error`);
            if (errorSpan) {
                errorSpan.textContent = '';
                errorSpan.classList.remove('show');
            }
            input.classList.remove('error');
        });
    });
    
    // Clear error on plan select change + auto-fill message
    const planSelect = document.getElementById('plan');
    const messageField = document.getElementById('message');
    let userHasTyped = false; // Track if user manually edited the message
    let lastAutoMessage = ''; // Track last auto-generated message
    
    // Detect manual user input in message field
    if (messageField) {
        messageField.addEventListener('input', () => {
            // If the current value differs from the last auto-message, user has edited
            if (messageField.value.trim() !== lastAutoMessage.trim()) {
                userHasTyped = true;
            }
        });
    }
    
    if (planSelect) {
        planSelect.addEventListener('change', () => {
            // Clear error
            const errorSpan = document.getElementById('plan-error');
            if (errorSpan) {
                errorSpan.textContent = '';
                errorSpan.classList.remove('show');
            }
            planSelect.classList.remove('error');
            
            // Auto-fill message based on selected plan
            const planValue = planSelect.value;
            if (planValue && messageField) {
                const planParts = planValue.split('|');
                const planKey = planParts[0];
                const planDisplay = planParts[1] || '';
                
                const autoMessages = {
                    'monthly': `I am interested in joining the Monthly Plan (₹1,000/month). Please share further details.`,
                    'quarterly': `I am interested in joining the Quarterly Plan (₹2,400/3 months). Please share further details.`,
                    'annual': `I would like to enroll in the Annual Plan (₹10,000/year). Kindly provide full membership details.`
                };
                
                const newMessage = autoMessages[planKey] || '';
                
                // Only auto-fill if user hasn't manually typed, or field is empty, or still contains a previous auto-message
                if (!userHasTyped || !messageField.value.trim() || messageField.value.trim() === lastAutoMessage.trim()) {
                    // Subtle fade transition
                    messageField.style.opacity = '0.5';
                    setTimeout(() => {
                        messageField.value = newMessage;
                        lastAutoMessage = newMessage;
                        userHasTyped = false; // Reset flag since we just auto-filled
                        messageField.style.opacity = '1';
                    }, 150);
                }
            } else if (!planValue && messageField) {
                // Clear auto-message when plan is deselected
                if (!userHasTyped || messageField.value.trim() === lastAutoMessage.trim()) {
                    messageField.value = '';
                    lastAutoMessage = '';
                    userHasTyped = false;
                }
            }
        });
    }
}

/* ========================================
   SUCCESS MODAL
   ======================================== */

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('success-modal');
    if (modal && e.target === modal) {
        closeSuccessModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSuccessModal();
    }
});

/* ========================================
   FORM HANDLER
   ======================================== */

/* (Removed duplicate - merged above) */

/* ========================================
   NOTIFICATION SYSTEM
   ======================================== */

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles
    const styles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 30px;
            max-width: 400px;
            padding: 20px 25px;
            background: #111;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 9999;
            animation: slideIn 0.3s ease forwards;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }
        
        .notification-success {
            border-left: 4px solid #00C853;
        }
        
        .notification-success i:first-child {
            color: #00C853;
            font-size: 1.25rem;
        }
        
        .notification-error {
            border-left: 4px solid #E10600;
        }
        
        .notification-error i:first-child {
            color: #E10600;
            font-size: 1.25rem;
        }
        
        .notification span {
            flex: 1;
            color: #E5E5E5;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #888;
            cursor: pointer;
            padding: 5px;
        }
        
        .notification-close:hover {
            color: #fff;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    
    // Add styles to head if not already present
    if (!document.querySelector('#notification-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'notification-styles';
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* ========================================
   COUNTER ANIMATION
   ======================================== */

function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/[0-9]/g, '');
                
                animateCounter(target, numericValue, suffix);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

/* ========================================
   IMAGE LAZY LOADING
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

/* ========================================
   PARALLAX EFFECT (Optional)
   ======================================== */

function initParallax() {
    const hero = document.querySelector('.hero-bg');
    
    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
}

// Initialize parallax
initParallax();

/* ========================================
   GALLERY LIGHTBOX (Optional Enhancement)
   ======================================== */

function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const src = img.src;
            
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <img src="${src}" alt="Gallery Image">
                    <button class="lightbox-close"><i class="fas fa-times"></i></button>
                </div>
            `;
            
            // Add styles
            const styles = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                
                .lightbox-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.95);
                }
                
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                
                .lightbox-content img {
                    max-width: 100%;
                    max-height: 90vh;
                    border-radius: 8px;
                }
                
                .lightbox-close {
                    position: absolute;
                    top: -50px;
                    right: 0;
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 2rem;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }
                
                .lightbox-close:hover {
                    color: #E10600;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            
            if (!document.querySelector('#lightbox-styles')) {
                const styleEl = document.createElement('style');
                styleEl.id = 'lightbox-styles';
                styleEl.textContent = styles;
                document.head.appendChild(styleEl);
            }
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Close lightbox
            const closeBtn = lightbox.querySelector('.lightbox-close');
            const overlay = lightbox.querySelector('.lightbox-overlay');
            
            const closeLightbox = () => {
                document.body.style.overflow = 'auto';
                lightbox.remove();
            };
            
            closeBtn.addEventListener('click', closeLightbox);
            overlay.addEventListener('click', closeLightbox);
            
            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeLightbox();
            });
        });
    });
}

// Initialize lightbox
document.addEventListener('DOMContentLoaded', initGalleryLightbox);

/* ========================================
   MOBILE DETECTION
   ======================================== */

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Disable certain animations on mobile for performance
if (isMobile()) {
    document.documentElement.classList.add('is-mobile');
}

/* ========================================
   FORM INPUT ANIMATIONS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.form-group input, .form-group select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
});

/* ========================================
   REVIEWS AUTO-SCROLL (Mobile)
   ======================================== */

function initReviewsAutoScroll() {
    const grids = document.querySelectorAll('.reviews-grid');
    grids.forEach(grid => {
        if (!grid) return;
        
        let isHovered = false;
        let isTouching = false;
        
        grid.addEventListener('mouseenter', () => isHovered = true);
        grid.addEventListener('mouseleave', () => isHovered = false);
        grid.addEventListener('touchstart', () => isTouching = true, { passive: true });
        grid.addEventListener('touchend', () => {
            isTouching = false;
        }, { passive: true });
        
        setInterval(() => {
            if (!isHovered && !isTouching && window.innerWidth < 768) {
                const cardWidth = grid.querySelector('.review-card')?.offsetWidth || grid.offsetWidth;
                const gap = 16;
                
                if (grid.scrollLeft >= grid.scrollWidth - grid.offsetWidth - 10) {
                    grid.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    grid.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
                }
            }
        }, 4000);
    });
}

initReviewsAutoScroll();

/* ========================================
   TYPING EFFECT FOR HERO (Optional)
   ======================================== */

// Uncomment to enable typing effect
/*
function initTypingEffect() {
    const words = ['STRONGEST', 'HEALTHIEST', 'BEST'];
    const element = document.querySelector('.hero-title .text-accent');
    
    if (!element) return;
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentWord.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500;
        }
        
        setTimeout(type, speed);
    }
    
    type();
}

initTypingEffect();
*/

/* ========================================
   GALLERY FILTER
   ======================================== */

function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Set initial transition for gallery items
    galleryItems.forEach(item => {
        item.style.transition = 'all 0.3s ease';
    });
}

/* ========================================
   FAQ ACCORDION
   ======================================== */

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Open first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
}

/* ========================================
   PREMIUM ADD-ONS (Plans Page)
   ======================================== */

function initPremiumAddons() {
    const addonCards = document.querySelectorAll('.premium-addon-card');
    
    if (!addonCards.length) return;
    
    addonCards.forEach(card => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        
        // Toggle card selection when clicking anywhere on the card
        card.addEventListener('click', (e) => {
            // Don't double-toggle if clicking the actual checkbox/label
            if (e.target.tagName === 'INPUT' || e.target.classList.contains('addon-checkbox')) {
                // Checkbox state already changed by browser; just sync the card class
                syncCardState(card, checkbox);
                return;
            }
            checkbox.checked = !checkbox.checked;
            syncCardState(card, checkbox);
        });
        
        // Also sync on direct checkbox change
        checkbox.addEventListener('change', () => {
            syncCardState(card, checkbox);
        });
    });
    
    function syncCardState(card, checkbox) {
        if (checkbox.checked) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
        // Save selections to localStorage so contact page can read them
        saveAddonSelections();
    }
    
    function saveAddonSelections() {
        const checked = document.querySelectorAll('.premium-addon-card input[type="checkbox"]:checked');
        const selectedAddons = Array.from(checked).map(cb => cb.value);
        localStorage.setItem('selectedAddons', JSON.stringify(selectedAddons));
    }
    
    // On contact page, pre-check add-ons from localStorage
    const formAddonCheckboxes = document.querySelectorAll('input[name="form-addon"]');
    if (formAddonCheckboxes.length > 0) {
        try {
            const savedAddons = JSON.parse(localStorage.getItem('selectedAddons') || '[]');
            if (savedAddons.length > 0) {
                formAddonCheckboxes.forEach(cb => {
                    if (savedAddons.includes(cb.value)) {
                        cb.checked = true;
                    }
                });
            }
        } catch (e) {
            // Silently ignore if localStorage is unavailable
        }
    }
}

console.log('💪 FITNESS GYM PREMIUM - Website Loaded Successfully!');
