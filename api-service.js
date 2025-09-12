// API Service Layer for Paddock Point
class ApiService {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
        this.apiUrl = `${baseUrl}/api`;
    }

    // Helper method for making HTTP requests
    async makeRequest(url, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        const finalOptions = { ...defaultOptions, ...options };

        try {
            const response = await fetch(url, finalOptions);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API request failed for ${url}:`, error);
            throw error;
        }
    }

    // Get all services
    async getServices() {
        return await this.makeRequest(`${this.apiUrl}/services`);
    }

    // Get a specific service by ID
    async getService(id) {
        return await this.makeRequest(`${this.apiUrl}/services/${id}`);
    }

    // Add a new service
    async addService(serviceData) {
        return await this.makeRequest(`${this.apiUrl}/services`, {
            method: 'POST',
            body: JSON.stringify(serviceData)
        });
    }

    // Add a review to a service
    async addReview(serviceId, reviewData) {
        return await this.makeRequest(`${this.apiUrl}/services/${serviceId}/reviews`, {
            method: 'POST',
            body: JSON.stringify(reviewData)
        });
    }

    // Helper method to check if the API is available
    async checkApiHealth() {
        try {
            await this.getServices();
            return true;
        } catch (error) {
            console.warn('API health check failed:', error);
            return false;
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApiService;
} else {
    window.ApiService = ApiService;
}