// ========== TESTIMONIALS DATA ==========
const testimonialsData = [
    {
        name: "Sarah Johnson",
        role: "Travel Blogger",
        text: "Bolivia Adventure Tours exceeded all my expectations. The guides were incredibly knowledgeable and the Salar de Uyuni experience was absolutely magical. Highly recommended!",
        stars: "★★★★★"
    },
    {
        name: "Marco Rodriguez",
        role: "Adventure Photographer",
        text: "The Amazon rainforest tour was the highlight of my travel career. Seeing pink river dolphins and jaguars in their natural habitat was unforgettable. Professional and safe throughout.",
        stars: "★★★★★"
    },
    {
        name: "Emma Chen",
        role: "Cultural Enthusiast",
        text: "The Lake Titicaca cultural experience was deeply moving. Meeting the Uros people and learning about their traditions was eye-opening. The tour supports local communities beautifully.",
        stars: "★★★★★"
    },
    {
        name: "James Wilson",
        role: "Nature Lover",
        text: "From the moment we arrived to the moment we left, every detail was perfectly organized. The sustainable tourism practices showed they genuinely care about Bolivia's future.",
        stars: "★★★★★"
    }
];

// ========== TEAM MEMBERS DATA ==========
const teamData = [
    {
        name: "Carlos Mendez",
        position: "Founder & Lead Guide",
        bio: "25+ years of experience exploring Bolivia's wilderness. Born in La Paz."
    },
    {
        name: "Isabella Martinez",
        position: "Operations Manager",
        bio: "Expert in sustainable tourism. Fluent in 4 languages. Based in Sucre."
    },
    {
        name: "Diego Flores",
        position: "Senior Guide",
        bio: "Specialist in Amazon tours. Wildlife expert and certified naturalist."
    },
    {
        name: "Luisa Tupac",
        position: "Cultural Liaison",
        bio: "Aymara native speaker. Connects travelers with indigenous communities."
    }
];

// ========== FAQ DATA ==========
const faqData = [
    {
        question: "What is the best time to visit Bolivia?",
        answer: "The dry season (May to October) is ideal for most tours. For the Salar de Uyuni mirror effect, visit December to March during the rainy season."
    },
    {
        question: "Do I need vaccinations?",
        answer: "Yellow fever vaccination is recommended for the Amazon region. Consult your doctor before traveling. We provide detailed health guidelines with every booking."
    },
    {
        question: "What is the physical difficulty level?",
        answer: "Tours range from easy to moderate. The Salar de Uyuni is moderate, Amazon is moderate to challenging, Lake Titicaca is easy, and Potosí mining is moderate. We accommodate fitness levels."
    },
    {
        question: "Are tours family-friendly?",
        answer: "Yes! All our tours can be customized for families with children. We recommend a minimum age of 8 for the Amazon tour due to physical demands."
    },
    {
        question: "What is included in tour prices?",
        answer: "Prices include guide, transportation, meals, accommodation, and entrance fees. Travel insurance and international flights are not included."
    },
    {
        question: "Can I customize my itinerary?",
        answer: "Absolutely! We specialize in custom tours. Contact us with your preferences and we'll create a perfect itinerary."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept credit cards, bank transfers, and PayPal. A 30% deposit is required to secure your booking."
    },
    {
        question: "What is your cancellation policy?",
        answer: "Cancellations made 30+ days before the tour receive a full refund. 15-30 days: 50% refund. Less than 15 days: no refund unless we find a replacement."
    }
];

// ========== MOBILE MENU TOGGLE - FIXED ==========
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close menu when window is resized to desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ========== POPULATE TESTIMONIALS ==========
function populateTestimonials() {
    const container = document.getElementById('testimonialsContainer');
    
    if (!container) return;

    const testimonialsHTML = testimonialsData.map(testimonial => `
        <div class="testimonial">
            <div class="stars">${testimonial.stars}</div>
            <p>${testimonial.text}</p>
            <p class="testimonial-author">${testimonial.name}</p>
            <p class="testimonial-role">${testimonial.role}</p>
        </div>
    `).join('');

    container.innerHTML = testimonialsHTML;
    
    // Save to localStorage
    localStorage.setItem('testimonialsViewed', JSON.stringify({
        count: testimonialsData.length,
        lastViewed: new Date().toISOString()
    }));
}

// ========== POPULATE TEAM MEMBERS ==========
function populateTeamMembers() {
    const container = document.getElementById('teamContainer');
    
    if (!container) return;

    const teamHTML = teamData.map(member => `
        <div class="team-member">
            <h4>${member.name}</h4>
            <p class="position">${member.position}</p>
            <p>${member.bio}</p>
        </div>
    `).join('');

    container.innerHTML = teamHTML;
}

// ========== POPULATE FAQ ==========
function populateFAQ() {
    const container = document.getElementById('faqContainer');
    
    if (!container) return;

    const faqHTML = faqData.map((item, index) => `
        <div class="faq-item" data-faq-index="${index}">
            <div class="faq-question">
                <h4>${item.question}</h4>
                <span class="faq-toggle">▼</span>
            </div>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        </div>
    `).join('');

    container.innerHTML = faqHTML;

    // Add event listeners to FAQ items
    const faqItems = container.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Load last viewed FAQ from localStorage
    const lastFAQ = localStorage.getItem('lastOpenedFAQ');
    if (lastFAQ) {
        const faqIndex = parseInt(lastFAQ);
        if (faqItems[faqIndex]) {
            faqItems[faqIndex].classList.add('active');
        }
    }
}

// ========== SAVE FAQ STATE TO LOCALSTORAGE ==========
document.addEventListener('click', function(e) {
    if (e.target.closest('.faq-question')) {
        const faqItem = e.target.closest('.faq-item');
        const index = faqItem.getAttribute('data-faq-index');
        if (faqItem.classList.contains('active')) {
            localStorage.setItem('lastOpenedFAQ', index);
        }
    }
});

// ========== TOUR BOOKING FUNCTIONALITY ==========
function initializeBookingButtons() {
    const bookButtons = document.querySelectorAll('.book-btn');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const destination = this.getAttribute('data-destination');
            
            // Save to localStorage
            const bookings = JSON.parse(localStorage.getItem('tourBookings') || '[]');
            bookings.push({
                destination: destination,
                date: new Date().toISOString()
            });
            localStorage.setItem('tourBookings', JSON.stringify(bookings));

            // Show confirmation and redirect
            alert(`${destination} has been added to your wishlist! Redirecting to contact form...`);
            window.location.href = 'pages/contact.html';
        });
    });
}

// ========== FILTER TOURS BY DURATION ==========
function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinations = document.querySelectorAll('.destination-full');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Save filter preference
            localStorage.setItem('preferredFilter', filter);

            // Show/hide destinations
            destinations.forEach(destination => {
                if (filter === 'all') {
                    destination.style.display = 'grid';
                } else {
                    const duration = extractDuration(destination.querySelector('h3').textContent);
                    destination.style.display = duration === filter ? 'grid' : 'none';
                }
            });
        });
    });

    // Apply saved filter on page load
    const savedFilter = localStorage.getItem('preferredFilter');
    if (savedFilter) {
        const savedButton = document.querySelector(`[data-filter="${savedFilter}"]`);
        if (savedButton) {
            savedButton.click();
        }
    }
}

// ========== EXTRACT DURATION FROM TEXT ==========
function extractDuration(text) {
    if (text.includes('1 Day')) return '1';
    if (text.includes('2 Days')) return '2';
    if (text.includes('3 Days')) return '3';
    if (text.includes('4 Days')) return '4';
    return 'all';
}

// ========== INITIALIZE ALL ON DOM LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    populateTestimonials();
    populateTeamMembers();
    populateFAQ();
    initializeBookingButtons();
    initializeFilterButtons();
    
    // Log page view for analytics
    console.log(`Page loaded: ${document.title}`);
});

// ========== SCROLL TO TOP BUTTON ==========
window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('scrollToTop');
    if (window.pageYOffset > 300) {
        if (scrollButton) scrollButton.style.display = 'block';
    } else {
        if (scrollButton) scrollButton.style.display = 'none';
    }
});