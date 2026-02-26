// ============================================
// assets/js/main.js
// Header + Hamburger, Theme Toggle, RTL Toggle, Common Logic
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ========================================
    // HAMBURGER MENU TOGGLE
    // ========================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navMenu = document.getElementById('navMenu');
    
    // Initialize mobile menu
    function initHamburger() {
        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle mobile menu
                if (mobileMenu) {
                    mobileMenu.classList.toggle('active');
                }
                
                // Also toggle navMenu if it exists (for older structure)
                if (navMenu) {
                    navMenu.classList.toggle('open');
                }
                
                // Toggle hamburger icon
                const icon = this.querySelector('i');
                if (icon) {
                    if (icon.classList.contains('fa-bars')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                // Toggle body scroll when menu is open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    if (navMenu) navMenu.classList.remove('open');
                    document.body.style.overflow = '';
                    
                    // Reset hamburger icon
                    const icon = hamburgerBtn?.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
        
        // Close mobile menu on window resize (if desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                if (mobileMenu) mobileMenu.classList.remove('active');
                if (navMenu) navMenu.classList.remove('open');
                document.body.style.overflow = '';
                
                // Reset hamburger icon
                const icon = hamburgerBtn?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // ========================================
    // MOBILE DROPDOWNS TOGGLE
    // ========================================
    function initMobileDropdowns() {
        const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle current dropdown
                this.classList.toggle('active');
                const dropdownMenu = this.closest('.mobile-dropdown')?.querySelector('.mobile-dropdown-menu');
                
                if (dropdownMenu) {
                    dropdownMenu.classList.toggle('active');
                    
                    // Rotate icon
                    const icon = this.querySelector('i');
                    if (icon) {
                        if (dropdownMenu.classList.contains('active')) {
                            icon.style.transform = 'rotate(180deg)';
                        } else {
                            icon.style.transform = 'rotate(0deg)';
                        }
                    }
                }
                
                // Close other open dropdowns
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle && otherToggle.classList.contains('active')) {
                        otherToggle.classList.remove('active');
                        const otherMenu = otherToggle.closest('.mobile-dropdown')?.querySelector('.mobile-dropdown-menu');
                        if (otherMenu) {
                            otherMenu.classList.remove('active');
                            const otherIcon = otherToggle.querySelector('i');
                            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                });
            });
        });
        
        // Close dropdowns when clicking on a link inside
        document.querySelectorAll('.mobile-dropdown-item a').forEach(link => {
            link.addEventListener('click', function() {
                // Close mobile menu after navigation (optional)
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Reset hamburger icon
                const icon = hamburgerBtn?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // ========================================
    // THEME TOGGLE (Dark/Light Mode)
    // ========================================
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const mobileThemeToggle = document.getElementById('mobileThemeToggle');
        const body = document.body;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('retroTheme');
        if (savedTheme) {
            body.classList.remove('light-mode', 'dark-mode');
            body.classList.add(savedTheme);
        } else {
            // Default to light mode
            body.classList.add('light-mode');
        }
        
        // Update theme toggle icons based on current theme
        function updateThemeIcons(theme) {
            const isDark = theme === 'dark-mode';
            
            // Desktop theme toggle
            if (themeToggle) {
                const moonIcon = themeToggle.querySelector('.fa-moon');
                const sunIcon = themeToggle.querySelector('.fa-sun');
                
                if (moonIcon && sunIcon) {
                    if (isDark) {
                        moonIcon.style.display = 'none';
                        sunIcon.style.display = 'inline-block';
                    } else {
                        moonIcon.style.display = 'inline-block';
                        sunIcon.style.display = 'none';
                    }
                }
            }
            
            // Mobile theme toggle
            if (mobileThemeToggle) {
                const moonIcon = mobileThemeToggle.querySelector('.fa-moon');
                const sunIcon = mobileThemeToggle.querySelector('.fa-sun');
                
                if (moonIcon && sunIcon) {
                    if (isDark) {
                        moonIcon.style.display = 'none';
                        sunIcon.style.display = 'inline-block';
                    } else {
                        moonIcon.style.display = 'inline-block';
                        sunIcon.style.display = 'none';
                    }
                }
            }
        }
        
        // Set initial icons
        updateThemeIcons(savedTheme || 'light-mode');
        
        // Toggle theme function
        function toggleTheme() {
            if (body.classList.contains('light-mode')) {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('retroTheme', 'dark-mode');
                updateThemeIcons('dark-mode');
            } else {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('retroTheme', 'light-mode');
                updateThemeIcons('light-mode');
            }
            
            // Dispatch custom event for other scripts
            window.dispatchEvent(new CustomEvent('themeChanged', {
                detail: { theme: body.classList.contains('dark-mode') ? 'dark' : 'light' }
            }));
        }
        
        // Add click listeners
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', toggleTheme);
        }
    }

    // ========================================
    // RTL TOGGLE (Right to Left)
    // ========================================
    function initRTLToggle() {
        const rtlToggle = document.getElementById('rtlToggle');
        const mobileRtlToggle = document.getElementById('mobileRtlToggle');
        const body = document.body;
        
        // Check for saved RTL preference
        const savedRTL = localStorage.getItem('retroRTL');
        if (savedRTL === 'true') {
            body.classList.add('rtl');
        }
        
        // Update RTL button text/icons
        function updateRTLButtons(isRTL) {
            const text = isRTL ? 'LTR' : 'RTL';
            
            if (rtlToggle) {
                const span = rtlToggle.querySelector('span');
                if (span) span.textContent = text;
                
                // Rotate icon for RTL
                const icon = rtlToggle.querySelector('i');
                if (icon) {
                    if (isRTL) {
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            }
            
            if (mobileRtlToggle) {
                const span = mobileRtlToggle.querySelector('span');
                if (span) span.textContent = text;
                
                // Rotate icon for RTL
                const icon = mobileRtlToggle.querySelector('i');
                if (icon) {
                    if (isRTL) {
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            }
        }
        
        // Set initial button text
        updateRTLButtons(body.classList.contains('rtl'));
        
        // Toggle RTL function
        function toggleRTL() {
            body.classList.toggle('rtl');
            const isRTL = body.classList.contains('rtl');
            localStorage.setItem('retroRTL', isRTL);
            updateRTLButtons(isRTL);
            
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('rtlChanged', {
                detail: { rtl: isRTL }
            }));
        }
        
        // Add click listeners
        if (rtlToggle) {
            rtlToggle.addEventListener('click', toggleRTL);
        }
        
        if (mobileRtlToggle) {
            mobileRtlToggle.addEventListener('click', toggleRTL);
        }
    }

    // ========================================
    // DROPDOWN HOVER (Desktop)
    // ========================================
    function initDesktopDropdowns() {
        // Handle desktop dropdowns with hover
        const desktopDropdowns = document.querySelectorAll('.nav-desktop .dropdown');
        
        desktopDropdowns.forEach(dropdown => {
            let timeout;
            
            dropdown.addEventListener('mouseenter', function() {
                clearTimeout(timeout);
                const menu = this.querySelector('.dropdown-menu');
                if (menu) {
                    menu.classList.add('show');
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateY(0)';
                }
            });
            
            dropdown.addEventListener('mouseleave', function() {
                timeout = setTimeout(() => {
                    const menu = this.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.classList.remove('show');
                        menu.style.opacity = '0';
                        menu.style.visibility = 'hidden';
                        menu.style.transform = 'translateY(-10px)';
                    }
                }, 200);
            });
            
            // For touch devices
            dropdown.addEventListener('click', function(e) {
                if (e.target.closest('.nav-link')) {
                    e.preventDefault();
                    const menu = this.querySelector('.dropdown-menu');
                    if (menu) {
                        const isVisible = menu.classList.contains('show');
                        
                        // Close all dropdowns first
                        desktopDropdowns.forEach(other => {
                            const otherMenu = other.querySelector('.dropdown-menu');
                            if (otherMenu) {
                                otherMenu.classList.remove('show');
                                otherMenu.style.opacity = '0';
                                otherMenu.style.visibility = 'hidden';
                                otherMenu.style.transform = 'translateY(-10px)';
                            }
                        });
                        
                        // Toggle current dropdown
                        if (!isVisible) {
                            menu.classList.add('show');
                            menu.style.opacity = '1';
                            menu.style.visibility = 'visible';
                            menu.style.transform = 'translateY(0)';
                        }
                    }
                }
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                });
            }
        });
    }

    // ========================================
    // ACTIVE LINK HIGHLIGHTING
    // ========================================
    function initActiveLinks() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        // Remove all active classes first
        document.querySelectorAll('.nav-link.active, .dropdown-item a.active, .mobile-nav-link.active').forEach(el => {
            el.classList.remove('active');
        });
        
        // Highlight desktop nav links
        document.querySelectorAll('.nav-menu a, .mobile-nav-link, .dropdown-item a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href === currentPath || href.includes(currentPath.split('.')[0]))) {
                link.classList.add('active');
                
                // If in dropdown, highlight parent
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    const parentLink = parentDropdown.querySelector('.nav-link');
                    if (parentLink) {
                        parentLink.classList.add('active');
                    }
                }
                
                // For mobile, highlight parent
                const mobileParent = link.closest('.mobile-dropdown');
                if (mobileParent) {
                    const parentLink = mobileParent.querySelector('.mobile-nav-link');
                    if (parentLink) {
                        parentLink.classList.add('active');
                    }
                }
            }
        });
    }

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    function initBackToTop() {
        // Create back to top button if it doesn't exist
        if (!document.getElementById('backToTop')) {
            const backToTop = document.createElement('button');
            backToTop.id = 'backToTop';
            backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
            backToTop.setAttribute('aria-label', 'Back to top');
            backToTop.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: #ff9933;
                color: #221100;
                border: 3px solid #aa4400;
                cursor: pointer;
                display: none;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                z-index: 999;
                transition: all 0.3s;
                box-shadow: 4px 4px 0 #552200;
            `;
            document.body.appendChild(backToTop);
            
            // Show/hide based on scroll position
            window.addEventListener('scroll', function() {
                if (window.scrollY > 400) {
                    backToTop.style.display = 'flex';
                } else {
                    backToTop.style.display = 'none';
                }
            });
            
            // Scroll to top on click
            backToTop.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Add hover effect
            backToTop.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '6px 6px 0 #552200';
            });
            
            backToTop.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '4px 4px 0 #552200';
            });
        }
    }


    // ========================================
    // PAGE TRANSITIONS (simple fade)
    // ========================================
    function initPageTransitions() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        window.addEventListener('load', function() {
            document.body.style.opacity = '1';
        });
        
        // Fade out on link clicks (except external links and special links)
        document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="javascript"]):not([href^="mailto"]):not([href^="tel"])').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('www')) {
                    e.preventDefault();
                    document.body.style.opacity = '0';
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        });
    }

    // ========================================
    // KEYBOARD NAVIGATION
    // ========================================
    function initKeyboardNav() {
        document.addEventListener('keydown', function(e) {
            // Escape key closes mobile menu and dropdowns
            if (e.key === 'Escape') {
                if (mobileMenu?.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Reset hamburger icon
                    const icon = hamburgerBtn?.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                document.querySelectorAll('.dropdown-menu.show, .dropdown-menu[style*="visible"]').forEach(menu => {
                    menu.classList.remove('show');
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                });
            }
            
            // Alt + T toggles theme
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                document.getElementById('themeToggle')?.click();
            }
            
            // Alt + R toggles RTL
            if (e.altKey && e.key === 'r') {
                e.preventDefault();
                document.getElementById('rtlToggle')?.click();
            }
            
            // Alt + S toggles scanlines
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                document.getElementById('scanlinesToggle')?.click();
            }
            
            // Tab key handling for dropdowns (accessibility)
            if (e.key === 'Tab') {
                // Close dropdowns when tabbing out
                setTimeout(() => {
                    if (!document.activeElement.closest('.dropdown')) {
                        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                            menu.classList.remove('show');
                        });
                    }
                }, 100);
            }
        });
    }

    // ========================================
    // TOUCH DEVICE DETECTION
    // ========================================
    function initTouchDevice() {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');
            
            // Adjust dropdown behavior for touch
            document.querySelectorAll('.dropdown > .nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const dropdown = this.closest('.dropdown');
                    const menu = dropdown.querySelector('.dropdown-menu');
                    
                    if (menu) {
                        menu.classList.toggle('show');
                        if (menu.classList.contains('show')) {
                            menu.style.opacity = '1';
                            menu.style.visibility = 'visible';
                            menu.style.transform = 'translateY(0)';
                        } else {
                            menu.style.opacity = '0';
                            menu.style.visibility = 'hidden';
                            menu.style.transform = 'translateY(-10px)';
                        }
                    }
                });
            });
        }
    }

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    function initScrollAnimations() {
        const animateOnScroll = document.querySelectorAll('.feature-grid, .recent-grid, .collector-grid, .community-grid, .brand-grid');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        animateOnScroll.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
        
        // Add keyframe animation if not exists
        if (!document.querySelector('#scrollAnimations')) {
            const style = document.createElement('style');
            style.id = 'scrollAnimations';
            style.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ========================================
    // INITIALIZE ALL MODULES
    // ========================================
    function init() {
        initHamburger();
        initMobileDropdowns();
        initThemeToggle();
        initRTLToggle();
        initDesktopDropdowns();
        initActiveLinks();
        initBackToTop();
        initScanlines();
        initKeyboardNav();
        initTouchDevice();
        initScrollAnimations();
        
        // Optional: Page transitions (enable with caution)
        // initPageTransitions();
        
        console.log('Retro Game Marketplace JS initialized successfully');
        console.log('Current theme:', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        console.log('RTL enabled:', document.body.classList.contains('rtl'));
    }

    // Start everything
    init();
});

// ============================================
// UTILITY FUNCTIONS (exposed globally if needed)
// ============================================
window.RetroMarket = {
    // Get current theme
    getTheme: function() {
        return document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    },
    
    // Set theme programmatically
    setTheme: function(theme) {
        const body = document.body;
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(theme === 'dark' ? 'dark-mode' : 'light-mode');
        localStorage.setItem('retroTheme', theme === 'dark' ? 'dark-mode' : 'light-mode');
        
        // Update icons
        const themeToggle = document.getElementById('themeToggle');
        const mobileThemeToggle = document.getElementById('mobileThemeToggle');
        
        if (themeToggle) {
            const moonIcon = themeToggle.querySelector('.fa-moon');
            const sunIcon = themeToggle.querySelector('.fa-sun');
            if (moonIcon && sunIcon) {
                moonIcon.style.display = theme === 'dark' ? 'none' : 'inline-block';
                sunIcon.style.display = theme === 'dark' ? 'inline-block' : 'none';
            }
        }
        
        if (mobileThemeToggle) {
            const moonIcon = mobileThemeToggle.querySelector('.fa-moon');
            const sunIcon = mobileThemeToggle.querySelector('.fa-sun');
            if (moonIcon && sunIcon) {
                moonIcon.style.display = theme === 'dark' ? 'none' : 'inline-block';
                sunIcon.style.display = theme === 'dark' ? 'inline-block' : 'none';
            }
        }
        
        // Dispatch custom event
        const event = new CustomEvent('themeChanged', { detail: { theme: theme } });
        window.dispatchEvent(event);
        
        return theme;
    },
    
    // Toggle RTL
    toggleRTL: function() {
        document.getElementById('rtlToggle')?.click();
    },
    
    // Get RTL state
    getRTL: function() {
        return document.body.classList.contains('rtl');
    },
    
    // Close mobile menu
    closeMobileMenu: function() {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (hamburgerBtn) {
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        document.body.style.overflow = '';
    },
    
    // Toggle scanlines
    toggleScanlines: function() {
        document.getElementById('scanlinesToggle')?.click();
    },
    
    // Scroll to top
    scrollToTop: function(behavior = 'smooth') {
        window.scrollTo({
            top: 0,
            behavior: behavior
        });
    },
    
    // Get current page info
    getCurrentPage: function() {
        return {
            path: window.location.pathname,
            file: window.location.pathname.split('/').pop() || 'index.html',
            hash: window.location.hash,
            search: window.location.search
        };
    }
};

// ============================================
// EXPORT for module usage (if needed)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.RetroMarket;
}

// ============================================
// ADDITIONAL HELPER FUNCTIONS
// ============================================

// Handle page load animations
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
    
    // Add fade-in animation to elements
    document.querySelectorAll('.hero-retro, .section-header').forEach(el => {
        el.style.animation = 'fadeIn 1s ease-out';
    });
});

// Handle before unload for page transitions
window.addEventListener('beforeunload', function() {
    // Optional: Add leaving animation
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.message);
});

// Handle visibility change (pause animations when tab not active)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.body.classList.add('tab-hidden');
    } else {
        document.body.classList.remove('tab-hidden');
    }
});


let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling DOWN
        header.classList.add("hide");
    } else {
        // Scrolling UP
        header.classList.remove("hide");
    }

    lastScroll = currentScroll;
});
