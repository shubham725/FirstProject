// ===== CLEAN REAL ESTATE WEBSITE JAVASCRIPT =====

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 600,
    easing: 'ease-in-out',
    once: true,
    offset: 50,
    disable: 'mobile'
});

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initHeroSlider();
    initPropertyCards();
    initFormHandlers();
});

// ===== HEADER FUNCTIONALITY =====
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    // Header scroll effect
    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        header.classList.toggle('scrolled', scrollTop > 100);
        updateActiveNavigation();
    }, 16));
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// ===== HERO SLIDER FUNCTIONALITY =====
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;
    
    // Function to show next slide
    function showNextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % totalSlides;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    }
    
    // Function to show specific slide
    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
    }
    
    // Start auto-advance slides every 4 seconds
    function startSlider() {
        slideInterval = setInterval(showNextSlide, 4000);
    }
    
    // Stop slider
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // Initialize slider
    startSlider();
    
    // Pause slider on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopSlider);
        heroSection.addEventListener('mouseleave', startSlider);
    }
    
    // Optional: Add touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    heroSection.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    heroSection.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50; // Minimum swipe distance
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next slide
                showNextSlide();
            } else {
                // Swipe right - previous slide
                slides[currentSlide].classList.remove('active');
                currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
                slides[currentSlide].classList.add('active');
            }
        }
    }
}

// ===== UPDATE ACTIVE NAVIGATION =====
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const scrollPosition = window.pageYOffset + 150;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}


// ===== PROPERTY CARDS FUNCTIONALITY =====
function initPropertyCards() {
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event
            const propertyCard = this.closest('.property-card');
            const propertyId = propertyCard.getAttribute('data-property');
            const propertyName = propertyCard.querySelector('h5').textContent;
            showPropertyModal(propertyId, propertyName);
        });
    });
}



// ===== FORM HANDLERS =====
function initFormHandlers() {
    // Enquire button
    const enquireBtn = document.querySelector('.btn-outline-primary');
    if (enquireBtn) {
        enquireBtn.addEventListener('click', showEnquiryModal);
    }
    
    // Call button
    const callBtn = document.querySelector('.btn-primary');
    if (callBtn && callBtn.textContent.includes('Call')) {
        callBtn.addEventListener('click', function() {
            window.location.href = 'tel:+912267161111';
        });
    }
    
    // Chat button
    const chatBtn = document.querySelector('.btn-outline-secondary');
    if (chatBtn) {
        chatBtn.addEventListener('click', showChatWidget);
    }
}


// ===== MODAL FUNCTIONS =====
function showEnquiryModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'enquiryModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-4 border-0 shadow-lg">
                <div class="modal-header border-0 pb-0">
                    <h4 class="modal-title fw-bold text-primary" id="enquiryModalLabel">Request a Call Back</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body pt-0">
                    <form class="enquiry-form">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label fw-medium">Name *</label>
                                <input type="text" class="form-control rounded-3" placeholder="Your Name" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-medium">Email *</label>
                                <input type="email" class="form-control rounded-3" placeholder="your@email.com" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-medium">Mobile Number *</label>
                                <input type="tel" class="form-control rounded-3" placeholder="+91 98765 43210" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-medium">City</label>
                                <select class="form-select rounded-3">
                                    <option value="">Select City</option>
                                    <option value="mumbai">Mumbai</option>
                                    <option value="pune">Pune</option>
                                    <option value="bangalore">Bangalore</option>
                                    <option value="thane">Thane</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-medium">Message</label>
                                <textarea class="form-control rounded-3" rows="4" placeholder="Tell us about your requirements..."></textarea>
                            </div>
                        </div>
                        <div class="d-flex gap-2 mt-4">
                            <button type="button" class="btn btn-outline-secondary btn-lg rounded-pill flex-fill" data-bs-dismiss="modal">
                                <i class="bi bi-x-circle me-2"></i>Cancel
                            </button>
                            <button type="submit" class="btn btn-primary btn-lg rounded-pill flex-fill">
                                <i class="bi bi-telephone me-2"></i>Submit Enquiry
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Form submission
    const form = modal.querySelector('.enquiry-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success alert-dismissible fade show';
        successAlert.innerHTML = `
            <i class="bi bi-check-circle me-2"></i>
            Thank you for your enquiry! We will contact you soon.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        form.parentNode.insertBefore(successAlert, form);
        form.reset();
        
        setTimeout(() => {
            bsModal.hide();
            modal.remove();
        }, 3000);
    });
    
    // Remove modal when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

function showPropertyModal(propertyId, propertyName) {
    // Property data configuration
    const propertyData = {
        'naikwadi-mall': {
            image: 'img/Naikwadi Mall.jpg',
            title: 'Naikwadi Mall',
            location: 'Premium Location',
            type: 'City Mall',
            price: '₹2.5 Cr',
            details: [
                'Modern Shopping Complex',
                'Prime Commercial Location',
                'Multiple Retail Spaces',
                'Parking Facilities Available'
            ],
            features: [
                'Premium Location',
                'Modern Architecture',
                'Commercial Spaces',
                'High Footfall Area'
            ]
        },
        'patil-hospital': {
            image: 'img/PATIL HOSPITAL.jpg',
            title: 'Patil Hospital',
            location: 'Business District',
            type: 'Commercial',
            price: '₹5 Cr',
            details: [
                'State-of-the-art Medical Facility',
                'Strategic Business Location',
                'Modern Healthcare Infrastructure',
                'Easy Accessibility'
            ],
            features: [
                'Medical Infrastructure',
                'Business District Location',
                'Modern Facilities',
                'Healthcare Services'
            ]
        },
        'swapnapurti-house': {
            image: 'img/Swapnapurti House luxary .jpg',
            title: 'Swapnapurti House Luxury',
            location: 'Luxury District',
            type: 'Premium',
            price: '₹10 Cr',
            details: [
                'Ultra-luxury Residential Complex',
                'Premium Location',
                'High-end Amenities',
                'Exclusive Living Experience'
            ],
            features: [
                'Luxury Living',
                'Premium Amenities',
                'Exclusive Location',
                'High-end Finishes'
            ]
        },
        'luxury-bellagio': {
            image: 'img/1000963910.jpg',
            title: 'Luxury Bellagio',
            location: 'Lake View',
            type: 'Luxury',
            price: '₹3.5 Cr',
            details: [
                'Luxury Residential Complex',
                'Scenic Lake View',
                'Premium Amenities',
                'Modern Architecture'
            ],
            features: [
                'Lake View Property',
                'Luxury Amenities',
                'Modern Design',
                'Premium Location'
            ]
        }
    };

    const property = propertyData[propertyId] || propertyData['naikwadi-mall'];
    
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'propertyModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content rounded-4 border-0 shadow-lg">
                <div class="modal-header border-0 pb-0">
                    <h4 class="modal-title fw-bold text-primary" id="propertyModalLabel">${property.title}</h4>
                    <button type="button" class="btn-close property-modal-header-close" aria-label="Close"></button>
                </div>
                <div class="modal-body pt-0">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <img src="${property.image}" 
                                 class="img-fluid rounded-3" alt="${property.title}" style="max-height: 400px; object-fit: cover;">
                        </div>
                        <div class="col-md-6">
                            <h5 class="fw-bold mb-3">Property Details</h5>
                            <ul class="list-unstyled">
                                ${property.details.map(detail => 
                                    `<li class="mb-2"><i class="bi bi-check-circle text-primary me-2"></i>${detail}</li>`
                                ).join('')}
                            </ul>
                            <div class="mt-4">
                                <h6 class="fw-bold text-primary mb-2">Key Features</h6>
                                <div class="d-flex flex-wrap gap-2 mb-3">
                                    ${property.features.map(feature => 
                                        `<span class="badge bg-primary bg-opacity-10 text-primary">${feature}</span>`
                                    ).join('')}
                                </div>
                                <h6 class="fw-bold text-primary">Starting from ${property.price}</h6>
                                <div class="d-flex gap-2 mt-3">
                                    <button type="button" class="btn btn-outline-secondary rounded-pill property-modal-close">
                                        <i class="bi bi-x-circle me-2"></i>Close
                                    </button>
                                    <button class="btn btn-primary rounded-pill">
                                        <i class="bi bi-telephone me-2"></i>Schedule Visit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Add event listener for the close button
    const closeBtn = modal.querySelector('.property-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            bsModal.hide();
        });
    }
    
    // Add event listener for the header close button (X)
    const headerCloseBtn = modal.querySelector('.property-modal-header-close');
    if (headerCloseBtn) {
        headerCloseBtn.addEventListener('click', function() {
            bsModal.hide();
        });
    }
    
    // Add support for Escape key to close modal
    const handleEscapeKey = function(e) {
        if (e.key === 'Escape') {
            bsModal.hide();
            document.removeEventListener('keydown', handleEscapeKey);
        }
    };
    document.addEventListener('keydown', handleEscapeKey);
    
    // Remove modal when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        document.removeEventListener('keydown', handleEscapeKey);
        modal.remove();
    });
}

function showChatWidget() {
    // Simulate chat widget
    const chatWidget = document.createElement('div');
    chatWidget.className = 'position-fixed bottom-0 end-0 m-4';
    chatWidget.innerHTML = `
        <div class="card shadow-lg rounded-4" style="width: 300px;">
            <div class="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
                <h6 class="mb-0"><i class="bi bi-chat-dots me-2"></i>Live Chat</h6>
                <button type="button" class="btn-close btn-close-white" aria-label="Close" onclick="this.closest('.position-fixed').remove()"></button>
            </div>
            <div class="card-body">
                <p class="mb-3">Hi! How can we help you today?</p>
                <div class="input-group">
                    <input type="text" class="form-control rounded-pill" placeholder="Type your message...">
                    <button class="btn btn-primary rounded-pill">
                        <i class="bi bi-send"></i>
                    </button>
                </div>
                <div class="d-flex justify-content-end mt-2">
                    <button type="button" class="btn btn-outline-secondary btn-sm" onclick="this.closest('.position-fixed').remove()">
                        <i class="bi bi-x-circle me-1"></i>Close Chat
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatWidget);
    
    // Auto-remove after 30 seconds (increased from 10 seconds)
    setTimeout(() => {
        if (chatWidget.parentNode) {
            chatWidget.remove();
        }
    }, 30000);
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
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

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        });
        
        // Also close chat widget with Escape key
        const chatWidget = document.querySelector('.position-fixed.bottom-0.end-0');
        if (chatWidget) {
            chatWidget.remove();
        }
    }
});

// ===== MODAL BACKDROP CLICK HANDLER =====
document.addEventListener('click', function(e) {
    // Close modals when clicking outside
    if (e.target.classList.contains('modal')) {
        const bsModal = bootstrap.Modal.getInstance(e.target);
        if (bsModal) {
            bsModal.hide();
        }
    }
});
