document.addEventListener('DOMContentLoaded', function() {
    // Store animation timeouts for cleanup
    let animationTimeouts = [];
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        const timeout = setTimeout(() => {
            preloader.style.opacity = '0';
            const hideTimeout = setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
            animationTimeouts.push(hideTimeout);
        }, 500);
        animationTimeouts.push(timeout);
    }

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        document.addEventListener('mousedown', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.7)';
        });

        document.addEventListener('mouseup', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // Links and buttons cursor effect
        const links = document.querySelectorAll('a, button, .btn');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.opacity = '0.5';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.opacity = '0.7';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // Mobile device detection for cursor
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if (isMobile() && cursor && cursorFollower) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }

    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Navigation handling
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    let currentSection = 'home';

    // Function to update active section
    function updateActiveSection(sectionId) {
        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        currentSection = sectionId;
    }

    // Function to scroll to section
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop;
            window.scrollTo({
                top: offsetTop - 80,
                behavior: 'smooth'
            });
            updateActiveSection(sectionId);
            history.pushState(null, null, `#${sectionId}`);
        }
    }

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
            
            // Close mobile menu if open
            if (hamburger && nav) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // Handle scroll events for section highlighting
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                updateActiveSection(sectionId);
            }
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        const hash = window.location.hash.slice(1) || 'home';
        scrollToSection(hash);
    });

    // Mobile menu handling
    if (hamburger && nav) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Typing Animation
    const typingText = document.querySelector('.typing-text .text');
    const cursorSpan = document.querySelector('.typing-text .typing-cursor');
    
    if (typingText && cursorSpan) {
        const textArray = ["Web Developer", "Frontend Developer", "Backend Developer", "Full Stack Developer"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;
        let currentTimeout;
        
        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typingText.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                currentTimeout = setTimeout(type, typingDelay);
                animationTimeouts.push(currentTimeout);
            } 
            else {
                cursorSpan.classList.remove("typing");
                currentTimeout = setTimeout(erase, newTextDelay);
                animationTimeouts.push(currentTimeout);
            }
        }
        
        function erase() {
            if (charIndex > 0) {
                if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typingText.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
                charIndex--;
                currentTimeout = setTimeout(erase, erasingDelay);
                animationTimeouts.push(currentTimeout);
            } 
            else {
                cursorSpan.classList.remove("typing");
                textArrayIndex++;
                if(textArrayIndex >= textArray.length) textArrayIndex = 0;
                currentTimeout = setTimeout(type, typingDelay + 1100);
                animationTimeouts.push(currentTimeout);
            }
        }
        
        if(textArray.length) {
            currentTimeout = setTimeout(type, newTextDelay + 250);
            animationTimeouts.push(currentTimeout);
        }
    }

    // Skill Progress Bars
    const skillSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function showProgress() {
        progressBars.forEach(progressBar => {
            const value = progressBar.dataset.width;
            progressBar.style.width = value;
        });
    }
    
    function hideProgress() {
        progressBars.forEach(p => {
            p.style.width = '0';
        });
    }
    
    // Initial load
    hideProgress();
    
    // Show progress on scroll
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    showProgress();
                } else {
                    hideProgress();
                }
            });
        }, { threshold: 0.3 });
        
        if (skillSection) {
            observer.observe(skillSection);
        }
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        window.addEventListener('scroll', function() {
            if (skillSection && window.pageYOffset + window.innerHeight > skillSection.offsetTop) {
                showProgress();
            }
        });
    }

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && projects.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                
                projects.forEach(project => {
                    if (filter === 'all' || project.dataset.category === filter) {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        project.style.opacity = '0';
                        project.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            project.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Cleanup function
    function cleanup() {
        animationTimeouts.forEach(timeout => clearTimeout(timeout));
        animationTimeouts = [];
    }

    // Cleanup on page unload
    window.addEventListener('unload', cleanup);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                
                window.scrollTo({
                    top: offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });

                // Update URL without refresh
                history.pushState(null, null, targetId);
            }
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                window.scrollTo({
                    top: offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Hamburger animation
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.children[0].style.transform = 'translateY(8px) rotate(45deg)';
                this.children[1].style.opacity = '0';
                this.children[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                this.children[0].style.transform = 'none';
                this.children[1].style.opacity = '1';
                this.children[2].style.transform = 'none';
            }
        });
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            // Send form data to backend
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Show success message
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                throw new Error(data.error || 'Failed to send message');
            }
        } catch (error) {
            // Show error message
            alert('Error sending message: ' + error.message);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}); 