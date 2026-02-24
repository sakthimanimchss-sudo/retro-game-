// ============================================
// assets/js/contact.js
// Contact Page JavaScript
// Complete with Form Validation, Submission Handling, and Interactive Features
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ========================================
    // CONTACT FORM HANDLING
    // ========================================
    
    class ContactForm {
        constructor() {
            this.form = document.getElementById('contactForm');
            this.successMessage = document.getElementById('formSuccess');
            this.submitBtn = document.getElementById('submitBtn');
            
            if (!this.form) return;
            
            this.fields = {
                name: {
                    element: document.getElementById('name'),
                    error: document.getElementById('nameError'),
                    validate: (value) => {
                        if (!value || value.trim().length < 2) {
                            return 'Name must be at least 2 characters';
                        }
                        if (value.trim().length > 50) {
                            return 'Name must be less than 50 characters';
                        }
                        return null;
                    }
                },
                email: {
                    element: document.getElementById('email'),
                    error: document.getElementById('emailError'),
                    validate: (value) => {
                        if (!value) {
                            return 'Email is required';
                        }
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            return 'Please enter a valid email address';
                        }
                        return null;
                    }
                },
                subject: {
                    element: document.getElementById('subject'),
                    error: document.getElementById('subjectError'),
                    validate: (value) => {
                        if (!value) {
                            return 'Please select a subject';
                        }
                        return null;
                    }
                },
                message: {
                    element: document.getElementById('message'),
                    error: document.getElementById('messageError'),
                    validate: (value) => {
                        if (!value || value.trim().length < 10) {
                            return 'Message must be at least 10 characters';
                        }
                        if (value.trim().length > 1000) {
                            return 'Message must be less than 1000 characters';
                        }
                        return null;
                    }
                }
            };
            
            this.init();
        }
        
        init() {
            // Real-time validation on blur
            Object.keys(this.fields).forEach(fieldName => {
                const field = this.fields[fieldName];
                if (field.element) {
                    field.element.addEventListener('blur', () => {
                        this.validateField(fieldName);
                    });
                    
                    // Clear error on input
                    field.element.addEventListener('input', () => {
                        this.clearFieldError(fieldName);
                    });
                }
            });
            
            // Form submission
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
            
            // Send another message button
            const sendAnotherBtn = document.getElementById('sendAnotherBtn');
            if (sendAnotherBtn) {
                sendAnotherBtn.addEventListener('click', () => {
                    this.resetForm();
                });
            }
        }
        
        validateField(fieldName) {
            const field = this.fields[fieldName];
            if (!field || !field.element) return true;
            
            const value = field.element.value;
            const error = field.validate(value);
            
            if (error) {
                this.showFieldError(fieldName, error);
                return false;
            } else {
                this.clearFieldError(fieldName);
                return true;
            }
        }
        
        showFieldError(fieldName, errorMessage) {
            const field = this.fields[fieldName];
            if (!field) return;
            
            field.element.classList.add('error');
            if (field.error) {
                field.error.textContent = errorMessage;
                field.error.classList.add('visible');
            }
        }
        
        clearFieldError(fieldName) {
            const field = this.fields[fieldName];
            if (!field) return;
            
            field.element.classList.remove('error');
            if (field.error) {
                field.error.textContent = '';
                field.error.classList.remove('visible');
            }
        }
        
        validateAll() {
            let isValid = true;
            Object.keys(this.fields).forEach(fieldName => {
                if (!this.validateField(fieldName)) {
                    isValid = false;
                }
            });
            return isValid;
        }
        
        async handleSubmit() {
            // Disable submit button
            if (this.submitBtn) {
                this.submitBtn.disabled = true;
                this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
            }
            
            // Validate all fields
            if (!this.validateAll()) {
                // Re-enable submit button
                if (this.submitBtn) {
                    this.submitBtn.disabled = false;
                    this.submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> SEND MESSAGE';
                }
                
                // Show error notification
                this.showNotification('Please fix the errors in the form', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual API call)
            try {
                await this.submitForm();
                
                // Show success message
                this.showSuccess();
                
                // Show success notification
                this.showNotification('Message sent successfully!', 'success');
                
            } catch (error) {
                console.error('Form submission error:', error);
                
                // Show error notification
                this.showNotification('Failed to send message. Please try again.', 'error');
                
                // Re-enable submit button
                if (this.submitBtn) {
                    this.submitBtn.disabled = false;
                    this.submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> SEND MESSAGE';
                }
            }
        }
        
        async submitForm() {
            // Simulate API call
            return new Promise((resolve) => {
                setTimeout(() => {
                    // Get form data
                    const formData = {
                        name: this.fields.name.element.value,
                        email: this.fields.email.element.value,
                        subject: this.fields.subject.element.value,
                        message: this.fields.message.element.value,
                        subscribe: document.getElementById('subscribe')?.checked || false
                    };
                    
                    console.log('Form submitted:', formData);
                    
                    // In production, send to server:
                    /*
                    fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    })
                    .then(response => response.json())
                    .then(data => resolve(data))
                    .catch(error => reject(error));
                    */
                    
                    resolve();
                }, 1500); // Simulate network delay
            });
        }
        
        showSuccess() {
            // Hide form
            if (this.form) {
                this.form.style.display = 'none';
            }
            
            // Show success message
            if (this.successMessage) {
                this.successMessage.classList.add('visible');
            }
        }
        
        resetForm() {
            // Reset form fields
            if (this.form) {
                this.form.reset();
                this.form.style.display = 'block';
            }
            
            // Hide success message
            if (this.successMessage) {
                this.successMessage.classList.remove('visible');
            }
            
            // Clear all errors
            Object.keys(this.fields).forEach(fieldName => {
                this.clearFieldError(fieldName);
            });
            
            // Re-enable submit button
            if (this.submitBtn) {
                this.submitBtn.disabled = false;
                this.submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> SEND MESSAGE';
            }
        }
        
        showNotification(message, type = 'info') {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `contact-notification ${type}`;
            
            // Get icon based on type
            const icons = {
                success: 'fa-check-circle',
                error: 'fa-exclamation-circle',
                info: 'fa-info-circle'
            };
            
            notification.innerHTML = `
                <i class="fas ${icons[type] || icons.info}"></i>
                <span>${message}</span>
            `;
            
            // Add to page
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.classList.add('visible');
            }, 10);
            
            // Remove after 5 seconds
            setTimeout(() => {
                notification.classList.remove('visible');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 5000);
        }
    }

    // ========================================
    // INTERACTIVE MAP
    // ========================================
    
    class InteractiveMap {
        constructor() {
            this.mapContainer = document.querySelector('.map-container');
            this.mapOverlay = document.querySelector('.map-overlay');
            this.mapMarker = document.querySelector('.map-marker');
            
            if (!this.mapContainer) return;
            
            this.init();
        }
        
        init() {
            // Add hover effect on map
            this.mapContainer.addEventListener('mouseenter', () => {
                this.mapContainer.style.transform = 'scale(1.02)';
                this.mapContainer.style.transition = 'transform 0.3s ease';
            });
            
            this.mapContainer.addEventListener('mouseleave', () => {
                this.mapContainer.style.transform = 'scale(1)';
            });
            
            // Add click effect on marker
            if (this.mapMarker) {
                this.mapMarker.addEventListener('click', () => {
                    this.pulseMarker();
                });
            }
        }
        
        pulseMarker() {
            if (!this.mapOverlay) return;
            
            this.mapOverlay.style.animation = 'none';
            this.mapOverlay.offsetHeight; // Trigger reflow
            this.mapOverlay.style.animation = 'markerPulse 0.5s ease';
            
            // Show tooltip
            this.showTooltip('Retro Market Headquarters');
        }
        
        showTooltip(text) {
            const tooltip = document.createElement('div');
            tooltip.className = 'map-tooltip';
            tooltip.textContent = text;
            
            this.mapContainer.appendChild(tooltip);
            
            // Position tooltip
            const rect = this.mapMarker?.getBoundingClientRect();
            if (rect) {
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.top - 40) + 'px';
            }
            
            // Remove after 2 seconds
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        }
    }

    // ========================================
    // FAQ INTERACTIONS
    // ========================================
    
    class FAQInteractions {
        constructor() {
            this.faqItems = document.querySelectorAll('.faq-item');
            
            if (!this.faqItems.length) return;
            
            this.init();
        }
        
        init() {
            this.faqItems.forEach(item => {
                // Add hover effect
                item.addEventListener('mouseenter', () => {
                    this.animateIcon(item);
                });
                
                // Add click to expand (optional)
                item.addEventListener('click', (e) => {
                    // Don't expand if clicking on link
                    if (e.target.tagName === 'A' || e.target.closest('a')) return;
                    
                    this.toggleExpand(item);
                });
            });
        }
        
        animateIcon(item) {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
                
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotate(0)';
                }, 300);
            }
        }
        
        toggleExpand(item) {
            const wasExpanded = item.classList.contains('expanded');
            
            // Close all other expanded items
            this.faqItems.forEach(i => {
                if (i !== item) {
                    i.classList.remove('expanded');
                }
            });
            
            // Toggle current item
            item.classList.toggle('expanded');
            
            // If expanding, scroll to item smoothly
            if (!wasExpanded && item.classList.contains('expanded')) {
                setTimeout(() => {
                    item.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 100);
            }
        }
    }

    // ========================================
    // SOCIAL MEDIA INTERACTIONS
    // ========================================
    
    class SocialInteractions {
        constructor() {
            this.socialLinks = document.querySelectorAll('.social-link');
            
            if (!this.socialLinks.length) return;
            
            this.init();
        }
        
        init() {
            this.socialLinks.forEach(link => {
                // Add hover sound effect (visual only)
                link.addEventListener('mouseenter', () => {
                    this.createRipple(link);
                });
                
                // Add click counter
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.trackClick(link);
                });
            });
        }
        
        createRipple(element) {
            const ripple = document.createElement('span');
            ripple.className = 'social-ripple';
            
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.transform = 'translate(-50%, -50%) scale(2)';
                ripple.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
        
        trackClick(link) {
            const platform = link.href.split('/').pop() || 'unknown';
            
            // In production, send to analytics
            console.log(`Social click: ${platform}`);
            
            // Open in new window after tracking
            setTimeout(() => {
                window.open(link.href, '_blank');
            }, 100);
        }
    }

    // ========================================
    // ANIMATED COUNTERS
    // ========================================
    
    class AnimatedCounters {
        constructor() {
            this.stats = document.querySelectorAll('.stat-number');
            
            if (!this.stats.length) return;
            
            this.animated = false;
            this.init();
        }
        
        init() {
            // Check if stats are in viewport
            window.addEventListener('scroll', () => {
                if (!this.animated && this.isInViewport()) {
                    this.animateCounters();
                    this.animated = true;
                }
            });
            
            // Check on load
            if (this.isInViewport()) {
                this.animateCounters();
                this.animated = true;
            }
        }
        
        isInViewport() {
            if (!this.stats.length) return false;
            
            const rect = this.stats[0].getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
        }
        
        animateCounters() {
            this.stats.forEach(stat => {
                const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''), 10);
                const suffix = stat.textContent.replace(/[0-9]/g, '');
                
                this.animateCounter(stat, 0, target, suffix);
            });
        }
        
        animateCounter(element, start, end, suffix) {
            const duration = 2000;
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                
                const current = Math.floor(easeOutQuart * (end - start) + start);
                element.textContent = current + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = end + suffix;
                }
            };
            
            requestAnimationFrame(updateCounter);
        }
    }

    // ========================================
    // FORM AUTO-SAVE (Local Storage)
    // ========================================
    
    class FormAutoSave {
        constructor() {
            this.form = document.getElementById('contactForm');
            if (!this.form) return;
            
            this.STORAGE_KEY = 'retroMarket_contactForm';
            this.fields = ['name', 'email', 'subject', 'message'];
            
            this.init();
        }
        
        init() {
            // Load saved data
            this.loadSavedData();
            
            // Save on input
            this.fields.forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (field) {
                    field.addEventListener('input', () => {
                        this.saveData();
                    });
                }
            });
            
            // Clear saved data on successful submission
            const successMessage = document.getElementById('formSuccess');
            if (successMessage) {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.target.classList.contains('visible')) {
                            this.clearSavedData();
                        }
                    });
                });
                
                observer.observe(successMessage, {
                    attributes: true,
                    attributeFilter: ['class']
                });
            }
        }
        
        saveData() {
            const data = {};
            this.fields.forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (field) {
                    data[fieldName] = field.value;
                }
            });
            
            // Save subscribe checkbox
            const subscribe = document.getElementById('subscribe');
            if (subscribe) {
                data.subscribe = subscribe.checked;
            }
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        }
        
        loadSavedData() {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (!saved) return;
            
            try {
                const data = JSON.parse(saved);
                
                this.fields.forEach(fieldName => {
                    const field = document.getElementById(fieldName);
                    if (field && data[fieldName]) {
                        field.value = data[fieldName];
                    }
                });
                
                const subscribe = document.getElementById('subscribe');
                if (subscribe && data.subscribe) {
                    subscribe.checked = data.subscribe;
                }
                
                // Show restore notification
                this.showRestoreNotification();
                
            } catch (e) {
                console.error('Failed to load saved form data:', e);
            }
        }
        
        clearSavedData() {
            localStorage.removeItem(this.STORAGE_KEY);
        }
        
        showRestoreNotification() {
            const notification = document.createElement('div');
            notification.className = 'contact-notification info restore';
            notification.innerHTML = `
                <i class="fas fa-history"></i>
                <span>Draft restored from previous session</span>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('visible');
            }, 10);
            
            // Close button
            const closeBtn = notification.querySelector('.notification-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    notification.classList.remove('visible');
                    setTimeout(() => notification.remove(), 300);
                });
            }
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.classList.remove('visible');
                    setTimeout(() => notification.remove(), 300);
                }
            }, 5000);
        }
    }

    // ========================================
    // ADDITIONAL STYLES FOR INTERACTIONS
    // ========================================
    
    function addInteractionStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Notification styles */
            .contact-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--accent, #ffaa33);
                color: #221100;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                border: 3px solid var(--shadow-color, #4d2f19);
                box-shadow: 5px 5px 0 var(--shadow-color, #4d2f19);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 9999;
                transform: translateX(120%);
                transition: transform 0.3s ease;
                max-width: 350px;
            }
            
            .contact-notification.visible {
                transform: translateX(0);
            }
            
            .contact-notification.success {
                background: #00aa55;
                color: white;
            }
            
            .contact-notification.error {
                background: #ff5555;
                color: white;
            }
            
            .contact-notification.info.restore {
                background: #ffaa33;
                color: #221100;
            }
            
            .contact-notification i {
                font-size: 1.2rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                font-size: 1rem;
                padding: 0.2rem;
                margin-left: auto;
                opacity: 0.7;
                transition: opacity 0.3s;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            /* Form field error state */
            .form-control.error {
                border-color: #ff5555;
                background: rgba(255, 85, 85, 0.1);
            }
            
            /* Expanded FAQ item */
            .faq-item.expanded {
                transform: scale(1.02);
                border-color: var(--accent, #ffaa33);
                box-shadow: 12px 12px 0 var(--shadow-color, #4d2f19);
                background: rgba(255, 170, 51, 0.1);
            }
            
            .faq-item.expanded p {
                max-height: 500px;
                opacity: 1;
            }
            
            .faq-item p {
                max-height: 100px;
                overflow: hidden;
                transition: max-height 0.3s ease, opacity 0.3s ease;
            }
            
            /* Map tooltip */
            .map-tooltip {
                position: fixed;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                border: 2px solid var(--accent, #ffaa33);
                font-size: 0.9rem;
                pointer-events: none;
                z-index: 10000;
                animation: tooltipFade 2s ease forwards;
            }
            
            @keyframes tooltipFade {
                0%, 20% { opacity: 1; transform: translateY(0); }
                80%, 100% { opacity: 0; transform: translateY(-10px); }
            }
            
            /* Social ripple effect */
            .social-ripple {
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                transition: transform 0.5s ease, opacity 0.5s ease;
                z-index: 0;
            }
            
            .social-link {
                position: relative;
                overflow: hidden;
            }
            
            .social-link i {
                position: relative;
                z-index: 1;
            }
            
            /* Loading spinner animation */
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .fa-spinner {
                animation: spin 1s linear infinite;
            }
            
            /* Disabled button state */
            .submit-btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
                transform: none !important;
            }
        `;
        
        document.head.appendChild(style);
    }

    // ========================================
    // INITIALIZE ALL MODULES
    // ========================================
    
    function init() {
        // Add interaction styles
        addInteractionStyles();
        
        // Initialize contact form
        new ContactForm();
        
        // Initialize interactive map
        new InteractiveMap();
        
        // Initialize FAQ interactions
        new FAQInteractions();
        
        // Initialize social media interactions
        new SocialInteractions();
        
        // Initialize animated counters
        new AnimatedCounters();
        
        // Initialize form auto-save
        new FormAutoSave();
        
        console.log('Contact page JS initialized');
    }

    // Start everything
    init();
});