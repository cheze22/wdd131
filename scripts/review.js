// Product Array for reference
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

// Get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        productName: params.get('productName'),
        rating: params.get('rating'),
        installDate: params.get('installDate'),
        features: params.getAll('features'),
        writtenReview: params.get('writtenReview'),
        userName: params.get('userName')
    };
}

// Get product name by ID
function getProductName(productId) {
    const product = products.find(p => p.id === productId);
    return product ? product.name : productId;
}

// Display review summary
function displayReviewSummary() {
    const reviewData = getUrlParams();
    const summaryDiv = document.getElementById('reviewSummary');
    
    if (!summaryDiv) return;
    
    let summaryHTML = '';
    
    // Product Name
    if (reviewData.productName) {
        summaryHTML += `
            <div class="summary-item">
                <div class="summary-label">Product:</div>
                <div class="summary-value">${getProductName(reviewData.productName)}</div>
            </div>
        `;
    }
    
    // Rating
    if (reviewData.rating) {
        const stars = '★'.repeat(parseInt(reviewData.rating)) + '☆'.repeat(5 - parseInt(reviewData.rating));
        summaryHTML += `
            <div class="summary-item">
                <div class="summary-label">Rating:</div>
                <div class="summary-value">${stars} (${reviewData.rating}/5)</div>
            </div>
        `;
    }
    
    // Installation Date
    if (reviewData.installDate) {
        const date = new Date(reviewData.installDate + 'T00:00:00');
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        summaryHTML += `
            <div class="summary-item">
                <div class="summary-label">Installation Date:</div>
                <div class="summary-value">${formattedDate}</div>
            </div>
        `;
    }
    
    // Features
    if (reviewData.features && reviewData.features.length > 0) {
        const featureLabels = {
            'easyInstall': 'Easy Installation',
            'goodValue': 'Good Value',
            'quality': 'Quality Materials',
            'durable': 'Durable',
            'performance': 'High Performance'
        };
        const featureList = reviewData.features.map(f => featureLabels[f] || f).join(', ');
        summaryHTML += `
            <div class="summary-item">
                <div class="summary-label">Useful Features:</div>
                <div class="summary-value">${featureList}</div>
            </div>
        `;
    }
    
    // Written Review
    if (reviewData.writtenReview && reviewData.writtenReview.trim()) {
        summaryHTML += `
            <div class="summary-item">
                <div class="summary-label">Review:</div>
                <div class="summary-value">${reviewData.writtenReview}</div>
            </div>
        `;
    }
    
    // User Name
    if (reviewData.userName && reviewData.userName.trim()) {
        summaryHTML += `
            <div class="summary-item">
                <div class="summary-label">Submitted by:</div>
                <div class="summary-value">${reviewData.userName}</div>
            </div>
        `;
    }
    
    summaryDiv.innerHTML = summaryHTML;
}

// Update review counter using localStorage
function updateReviewCounter() {
    const counterElement = document.getElementById('reviewCounter');
    
    if (!counterElement) return;
    
    // Get current count from localStorage
    let reviewCount = localStorage.getItem('reviewCount');
    
    // If no count exists, initialize to 0
    if (reviewCount === null) {
        reviewCount = 0;
    } else {
        reviewCount = parseInt(reviewCount);
    }
    
    // Increment the count
    reviewCount++;
    
    // Save back to localStorage
    localStorage.setItem('reviewCount', reviewCount);
    
    // Display the count
    counterElement.textContent = reviewCount;
}

// Set current year in footer
function setCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    displayReviewSummary();
    updateReviewCounter();
    setCurrentYear();
});