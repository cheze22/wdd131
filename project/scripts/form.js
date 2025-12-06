// ========== FORM VALIDATION ==========
function validateForm(formData) {
    const errors = [];

    // Validate full name
    if (!formData.fullName || formData.fullName.trim().length < 2) {
        errors.push('Please enter a valid full name');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    // Validate destination
    if (!formData.destination) {
        errors.push('Please select a destination');
    }

    // Validate number of travelers
    if (!formData.travelers || formData.travelers < 1 || formData.travelers > 50) {
        errors.push('Please enter a valid number of travelers (1-50)');
    }

    // Validate message
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Please enter a message with at least 10 characters');
    }

    return errors;
}

// ========== HANDLE CONTACT FORM SUBMISSION ==========
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            destination: document.getElementById('destination').value,
            travelers: document.getElementById('travelers').value,
            travelDate: document.getElementById('travelDate').value,
            message: document.getElementById('message').value,
            subscribe: document.getElementById('subscribe').checked,
            timestamp: new Date().toISOString()
        };

        // Validate form
        const errors = validateForm(formData);

        if (errors.length > 0) {
            // Show errors
            showFormMessage(errors.join('<br>'), 'error');
            return;
        }

        // Save to localStorage
        const submissions = JSON.parse(localStorage.getItem('contactFormSubmissions') || '[]');
        submissions.push(formData);
        localStorage.setItem('contactFormSubmissions', JSON.stringify(submissions));

        // Show success message
        showFormMessage('Thank you! We have received your message. We will contact you within 24 hours.', 'success');

        // Reset form
        contactForm.reset();

        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth' });

        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    });

    // ========== SHOW/HIDE FORM MESSAGE ==========
    function showFormMessage(message, type) {
        formMessage.innerHTML = message;
        formMessage.className = `form-message ${type}`;
    }

    // ========== HANDLE NEWSLETTER FORM ==========
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Save to localStorage
            const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
                alert('Thank you for subscribing! Check your email for a welcome message.');
                emailInput.value = '';
            } else {
                alert('You are already subscribed!');
            }
        });
    }

    // ========== AUTO-FILL DESTINATION FROM WISHLIST ==========
    const destinationSelect = document.getElementById('destination');
    if (destinationSelect) {
        const bookings = JSON.parse(localStorage.getItem('tourBookings') || '[]');
        if (bookings.length > 0) {
            const lastBooking = bookings[bookings.length - 1];
            const destinationMap = {
                'Salar de Uyuni': 'salar-uyuni',
                'Amazon Rainforest': 'amazon',
                'Lake Titicaca': 'titicaca',
                'Potosí Mining': 'potosi'
            };

            const value = destinationMap[lastBooking.destination];
            if (value) {
                destinationSelect.value = value;
            }
        }
    }

    // ========== DISPLAY FORM SUBMISSIONS HISTORY (DEBUG) ==========
    console.log(`Contact form loaded. Total submissions: ${JSON.parse(localStorage.getItem('contactFormSubmissions') || '[]').length}`);
});

// ========== LOAD FORM DATA FROM LOCALSTORAGE (IF INTERRUPTED) ==========
window.addEventListener('beforeunload', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            destination: document.getElementById('destination').value,
            travelers: document.getElementById('travelers').value,
            message: document.getElementById('message').value
        };

        // Only save if there's actual data
        if (formData.email || formData.fullName || formData.message) {
            localStorage.setItem('formDraft', JSON.stringify(formData));
        }
    }
});

// ========== RESTORE FORM DRAFT ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const draft = localStorage.getItem('formDraft');
        if (draft) {
            const formData = JSON.parse(draft);
            document.getElementById('fullName').value = formData.fullName || '';
            document.getElementById('email').value = formData.email || '';
            document.getElementById('phone').value = formData.phone || '';
            document.getElementById('destination').value = formData.destination || '';
            document.getElementById('travelers').value = formData.travelers || '';
            document.getElementById('message').value = formData.message || '';
        }
    }
});