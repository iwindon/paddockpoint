// Service data management
class ServiceManager {
    constructor() {
        this.services = [];
        this.currentCategory = 'all';
        this.currentSearchTerm = '';
        this.apiService = new ApiService(); // Use API service instead of localStorage
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadServices();
        this.renderServices();
    }

    async loadServices() {
        try {
            this.services = await this.apiService.getServices();
        } catch (error) {
            console.error('Failed to load services from API:', error);
            // Fallback to empty array if API fails
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

        // Add provider button
        document.getElementById('add-provider-btn').addEventListener('click', () => {
            document.getElementById('add-provider-modal').style.display = 'block';
        });

        // Modal close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Star rating functionality
        this.setupStarRatings();

        // Form submissions
        document.getElementById('add-provider-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddProvider();
        });

        document.getElementById('add-review-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddReview();
        });
    }

    setupStarRatings() {
        document.querySelectorAll('.star-rating').forEach(rating => {
            const stars = rating.querySelectorAll('.star');
            let selectedRating = 0;

            stars.forEach((star, index) => {
                star.addEventListener('click', () => {
                    selectedRating = index + 1;
                    rating.dataset.rating = selectedRating;
                    this.updateStarDisplay(stars, selectedRating);
                });

                star.addEventListener('mouseover', () => {
                    this.updateStarDisplay(stars, index + 1);
                });
            });

            rating.addEventListener('mouseleave', () => {
                this.updateStarDisplay(stars, selectedRating);
            });
        });
    }

    updateStarDisplay(stars, rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
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

        // Add event listeners to new elements
        this.setupServiceCardListeners();
    }

    setupServiceCardListeners() {
        document.querySelectorAll('.add-review-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const serviceId = e.target.dataset.serviceId;
                this.openReviewModal(serviceId);
            });
        });
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
                
                <div class="service-actions">
                    <button class="btn-primary btn-small add-review-btn" data-service-id="${service.id}">
                        Add Review
                    </button>
                </div>
                
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

    async handleAddProvider() {
        const form = document.getElementById('add-provider-form');
        
        const name = document.getElementById('provider-name').value.trim();
        const category = document.getElementById('provider-category').value;
        const phone = document.getElementById('provider-phone').value.trim();
        const website = document.getElementById('provider-website').value.trim();
        const description = document.getElementById('provider-description').value.trim();
        const reviewerName = document.getElementById('your-name').value.trim();
        const rating = document.getElementById('initial-rating').dataset.rating;
        const reviewText = document.getElementById('initial-review').value.trim();

        if (!name || !category || !reviewerName || !rating || !reviewText) {
            alert('Please fill in all required fields.');
            return;
        }

        const serviceData = {
            name,
            category,
            phone,
            website,
            description,
            initialReview: {
                reviewer: reviewerName,
                rating: parseInt(rating),
                text: reviewText
            }
        };

        try {
            const newService = await this.apiService.addService(serviceData);
            
            // Add to local array for immediate UI update
            this.services.push(newService);
            this.renderServices();
            
            form.reset();
            document.getElementById('initial-rating').dataset.rating = '';
            document.querySelectorAll('#initial-rating .star').forEach(star => star.classList.remove('active'));
            document.getElementById('add-provider-modal').style.display = 'none';
            
            this.showSuccessMessage('Service provider added successfully!');
        } catch (error) {
            console.error('Failed to add service provider:', error);
            this.showErrorMessage('Failed to add service provider. Please try again.');
        }
    }

    openReviewModal(serviceId) {
        this.currentServiceId = serviceId;
        document.getElementById('add-review-modal').style.display = 'block';
        
        // Reset form
        document.getElementById('add-review-form').reset();
        document.getElementById('review-rating').dataset.rating = '';
        document.querySelectorAll('#review-rating .star').forEach(star => star.classList.remove('active'));
    }

    async handleAddReview() {
        const reviewerName = document.getElementById('reviewer-name').value.trim();
        const rating = document.getElementById('review-rating').dataset.rating;
        const reviewText = document.getElementById('review-text').value.trim();

        if (!reviewerName || !rating || !reviewText) {
            alert('Please fill in all fields.');
            return;
        }

        const reviewData = {
            reviewer: reviewerName,
            rating: parseInt(rating),
            text: reviewText
        };

        try {
            const newReview = await this.apiService.addReview(this.currentServiceId, reviewData);
            
            // Update local service for immediate UI update
            const service = this.services.find(s => s.id === this.currentServiceId);
            if (service) {
                service.reviews.push(newReview);
                this.renderServices();
            }
            
            document.getElementById('add-review-form').reset();
            document.getElementById('review-rating').dataset.rating = '';
            document.querySelectorAll('#review-rating .star').forEach(star => star.classList.remove('active'));
            document.getElementById('add-review-modal').style.display = 'none';
            
            this.showSuccessMessage('Review added successfully!');
        } catch (error) {
            console.error('Failed to add review:', error);
            this.showErrorMessage('Failed to add review. Please try again.');
        }
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