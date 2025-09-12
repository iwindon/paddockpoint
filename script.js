// Service data management
class ServiceManager {
    constructor() {
        this.services = [];
        this.currentCategory = 'all';
        this.currentSearchTerm = '';
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadServices();
        this.renderServices();
    }

    async loadServices() {
        try {
            const response = await fetch('./services.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            this.services = await response.json();
        } catch (error) {
            console.error('Failed to load services from JSON file:', error);
            // Fallback to empty array if loading fails
            this.services = [];
            this.showErrorMessage('Failed to load services. Please try again later.');
        }
    }

    showErrorMessage(message) {
        // Create a simple error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            max-width: 300px;
        `;
        
        document.body.appendChild(errorDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    showSuccessMessage(message) {
        // Create a simple success notification
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            max-width: 300px;
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 3000);
    }

    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.renderServices();
            });
        });

        // Search input
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => {
            this.currentSearchTerm = e.target.value.toLowerCase();
            this.renderServices();
        });

        // Request vendor button
        document.getElementById('request-vendor-btn').addEventListener('click', () => {
            this.openVendorRequestEmail();
        });
    }

    openVendorRequestEmail() {
        const subject = encodeURIComponent('Vendor Request for Paddock Point Directory');
        const body = encodeURIComponent(`Hi Ivan,

I would like to request a new vendor be added to the Paddock Point Neighborhood Services directory.

Vendor Name: 
Service Category: (HVAC, Electrical, Plumbing, Landscaping, Cleaning, Pest Control, Roofing, General Contractors)
Phone Number: 
Website: 
Description: 

My Review:
Rating: (1-5 stars)
Review Text: 

My Name: 

Thank you!`);
        
        window.location.href = `mailto:ivan.windon@icloud.com?subject=${subject}&body=${body}`;
    }

    getFilteredServices() {
        let filtered = this.services;

        // Filter by category
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(service => service.category === this.currentCategory);
        }

        // Filter by search term
        if (this.currentSearchTerm) {
            filtered = filtered.filter(service => 
                service.name.toLowerCase().includes(this.currentSearchTerm) ||
                service.description.toLowerCase().includes(this.currentSearchTerm) ||
                service.category.toLowerCase().includes(this.currentSearchTerm)
            );
        }

        return filtered;
    }

    renderServices() {
        const grid = document.getElementById('services-grid');
        const noResults = document.getElementById('no-results');
        const filtered = this.getFilteredServices();

        if (filtered.length === 0) {
            grid.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        noResults.style.display = 'none';
        
        grid.innerHTML = filtered.map(service => this.createServiceCard(service)).join('');
    }

    createServiceCard(service) {
        const avgRating = this.calculateAverageRating(service.reviews);
        const stars = this.renderStars(avgRating);
        
        return `
            <div class="service-card" data-service-id="${service.id}">
                <div class="service-header">
                    <div class="service-info">
                        <h3>${service.name}</h3>
                        <span class="service-category">${this.formatCategory(service.category)}</span>
                    </div>
                </div>
                
                <div class="service-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-text">${avgRating.toFixed(1)} (${service.reviews.length} reviews)</span>
                </div>
                
                <div class="service-contact">
                    ${service.phone ? `
                        <div class="contact-item">
                            📞 <a href="tel:${service.phone}">${service.phone}</a>
                        </div>
                    ` : ''}
                    ${service.website ? `
                        <div class="contact-item">
                            🌐 <a href="${service.website}" target="_blank" rel="noopener">Website</a>
                        </div>
                    ` : ''}
                </div>
                
                ${service.description ? `
                    <div class="service-description">
                        ${service.description}
                    </div>
                ` : ''}
                
                <div class="reviews-section">
                    <div class="reviews-header">
                        <h4>Recent Reviews</h4>
                    </div>
                    ${service.reviews.slice(-3).map(review => this.createReviewItem(review)).join('')}
                </div>
            </div>
        `;
    }

    createReviewItem(review) {
        const stars = this.renderStars(review.rating);
        const date = new Date(review.date).toLocaleDateString();
        
        return `
            <div class="review-item">
                <div class="review-header">
                    <span class="reviewer-name">${review.reviewer}</span>
                    <span class="review-date">${date}</span>
                </div>
                <div class="review-rating">${stars}</div>
                <div class="review-text">${review.text}</div>
            </div>
        `;
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        return '★'.repeat(fullStars) + 
               (halfStar ? '☆' : '') + 
               '☆'.repeat(emptyStars);
    }

    calculateAverageRating(reviews) {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / reviews.length;
    }

    formatCategory(category) {
        const categoryMap = {
            'hvac': 'HVAC',
            'electrical': 'Electrical',
            'plumbing': 'Plumbing',
            'landscaping': 'Landscaping',
            'cleaning': 'Cleaning',
            'pest': 'Pest Control',
            'roofing': 'Roofing',
            'general': 'General Contractors'
        };
        return categoryMap[category] || category;
    }

}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const serviceManager = new ServiceManager();
        // ServiceManager initialization is now handled in its constructor
    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
});