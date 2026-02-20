// ========================================
// Document Ready
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========================================
    // Mobile Navigation
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ========================================
    // Active Nav Link on Scroll
    // ========================================
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll('.about-content, .skill-card, .project-card, .contact-content');
    
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // ========================================
    // Skill Progress Animation
    // ========================================
    const skillCards = document.querySelectorAll('.skill-card');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const animateSkills = () => {
        skillCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - 100) {
                const progressBar = card.querySelector('.progress-bar');
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
            }
        });
    };

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Initial check

    // ========================================
    // Stats Counter Animation
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateStats = () => {
        if (statsAnimated) return;
        
        const aboutSection = document.getElementById('about');
        const sectionTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
        }
    };

    window.addEventListener('scroll', animateStats);
    animateStats(); // Initial check

    // ========================================
    // Smooth Scroll for Navigation
    // ========================================
    navLinksItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Form Submission
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message (in production, you'd send to a server)
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        }
    });

    // ========================================
    // Parallax Effect for Hero Background
    // ========================================
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
        }
    });

    // ========================================
    // Cursor Trail Effect (Optional Enhancement)
    // ========================================
    const createCursorTrail = () => {
        const cursor = document.createElement('div');
        cursor.classList.add('cursor-trail');
        document.body.appendChild(cursor);
        
        let mouseX = 0;
        let mouseY = 0;
        let trailX = 0;
        let trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animate = () => {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            
            cursor.style.left = trailX + 'px';
            cursor.style.top = trailY + 'px';
            
            requestAnimationFrame(animate);
        };
        
        animate();
    };

    // Uncomment to enable cursor trail
    // createCursorTrail();

    // ========================================
    // Typing Animation for Hero Text
    // ========================================
    const titleElement = document.querySelector('.title');
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    let charIndex = 0;
    const typeSpeed = 100;

    const typeText = () => {
        if (charIndex < originalText.length) {
            titleElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typeSpeed);
        }
    };

    // Start typing after a delay
    setTimeout(typeText, 1000);

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // Project Card Hover Effect Enhancement
    // ========================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-10px) scale(1)';
        });
    });

    // ========================================
    // Loading Animation
    // ========================================
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loader">
            <div class="loader-inner"></div>
        </div>
    `;
    
    // Add loading screen styles dynamically
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loading-screen.hidden {
            opacity: 0;
            pointer-events: none;
        }
        
        .loader {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(108, 99, 255, 0.2);
            border-top-color: #6C63FF;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(loadingStyles);
    document.body.appendChild(loadingScreen);

    // Hide loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    });
});

// ========================================
// Additional Utility Functions
// ========================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get current year for footer
document.querySelector('.footer p').innerHTML = 
    `&copy; ${new Date().getFullYear()} Youssef Abdallah. All rights reserved.`;