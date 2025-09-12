const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'services-data.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Sample data - same as the current localStorage sample data
const SAMPLE_SERVICES = [
    {
        id: 'hvac-1',
        name: 'Cool Comfort HVAC',
        category: 'hvac',
        phone: '(555) 123-4567',
        website: 'https://coolcomforthvac.com',
        description: 'Professional HVAC installation, repair, and maintenance. Family owned business serving the community for 15 years.',
        reviews: [
            {
                id: 'review-1',
                reviewer: 'Sarah Johnson',
                rating: 5,
                text: 'Outstanding service! They fixed our AC on the hottest day of summer. Professional, quick, and reasonably priced.',
                date: '2024-08-15'
            },
            {
                id: 'review-2',
                reviewer: 'Mike Chen',
                rating: 4,
                text: 'Great work on installing our new furnace. Clean installation and good follow-up service.',
                date: '2024-07-22'
            }
        ]
    },
    {
        id: 'electrical-1',
        name: 'Bright Electric Solutions',
        category: 'electrical',
        phone: '(555) 987-6543',
        website: '',
        description: 'Licensed electricians providing residential electrical services, panel upgrades, and emergency repairs.',
        reviews: [
            {
                id: 'review-3',
                reviewer: 'Jennifer Martinez',
                rating: 5,
                text: 'Excellent electrical work! Upgraded our entire panel and added outlets throughout the house. Very professional crew.',
                date: '2024-08-30'
            }
        ]
    },
    {
        id: 'plumbing-1',
        name: 'Reliable Plumbing Co',
        category: 'plumbing',
        phone: '(555) 456-7890',
        website: 'https://reliableplumbing.com',
        description: '24/7 plumbing services including drain cleaning, pipe repair, and bathroom renovations.',
        reviews: [
            {
                id: 'review-4',
                reviewer: 'David Wilson',
                rating: 4,
                text: 'Quick response for our kitchen sink leak. Fair pricing and good workmanship.',
                date: '2024-09-05'
            },
            {
                id: 'review-5',
                reviewer: 'Lisa Thompson',
                rating: 5,
                text: 'Did a complete bathroom renovation. Beautiful work and finished on time!',
                date: '2024-08-10'
            }
        ]
    }
];

// Initialize data file if it doesn't exist
async function initializeDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch (error) {
        // File doesn't exist, create it with sample data
        await fs.writeFile(DATA_FILE, JSON.stringify(SAMPLE_SERVICES, null, 2));
        console.log('Initialized services data file with sample data');
    }
}

// Load services from file
async function loadServices() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading services:', error);
        return SAMPLE_SERVICES;
    }
}

// Save services to file
async function saveServices(services) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(services, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving services:', error);
        return false;
    }
}

// API Routes

// GET /api/services - Get all services
app.get('/api/services', async (req, res) => {
    try {
        const services = await loadServices();
        res.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// POST /api/services - Add a new service
app.post('/api/services', async (req, res) => {
    try {
        const { name, category, phone, website, description, initialReview } = req.body;
        
        // Validation
        if (!name || !category || !initialReview) {
            return res.status(400).json({ error: 'Name, category, and initial review are required' });
        }
        
        const services = await loadServices();
        
        const newService = {
            id: `service-${Date.now()}`,
            name: name.trim(),
            category,
            phone: phone?.trim() || '',
            website: website?.trim() || '',
            description: description?.trim() || '',
            reviews: [{
                id: `review-${Date.now()}`,
                reviewer: initialReview.reviewer,
                rating: parseInt(initialReview.rating),
                text: initialReview.text,
                date: new Date().toISOString().split('T')[0]
            }]
        };
        
        services.push(newService);
        
        if (await saveServices(services)) {
            res.status(201).json(newService);
        } else {
            res.status(500).json({ error: 'Failed to save service' });
        }
    } catch (error) {
        console.error('Error adding service:', error);
        res.status(500).json({ error: 'Failed to add service' });
    }
});

// GET /api/services/:id - Get a specific service
app.get('/api/services/:id', async (req, res) => {
    try {
        const services = await loadServices();
        const service = services.find(s => s.id === req.params.id);
        
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        
        res.json(service);
    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({ error: 'Failed to fetch service' });
    }
});

// POST /api/services/:id/reviews - Add a review to a service
app.post('/api/services/:id/reviews', async (req, res) => {
    try {
        const { reviewer, rating, text } = req.body;
        
        // Validation
        if (!reviewer || !rating || !text) {
            return res.status(400).json({ error: 'Reviewer, rating, and text are required' });
        }
        
        const services = await loadServices();
        const service = services.find(s => s.id === req.params.id);
        
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        
        const newReview = {
            id: `review-${Date.now()}`,
            reviewer: reviewer.trim(),
            rating: parseInt(rating),
            text: text.trim(),
            date: new Date().toISOString().split('T')[0]
        };
        
        service.reviews.push(newReview);
        
        if (await saveServices(services)) {
            res.status(201).json(newReview);
        } else {
            res.status(500).json({ error: 'Failed to save review' });
        }
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
async function startServer() {
    await initializeDataFile();
    app.listen(PORT, () => {
        console.log(`Paddock Point API Server running on http://localhost:${PORT}`);
        console.log(`Frontend available at: http://localhost:${PORT}`);
        console.log(`API endpoints:`);
        console.log(`  GET    /api/services`);
        console.log(`  POST   /api/services`);
        console.log(`  GET    /api/services/:id`);
        console.log(`  POST   /api/services/:id/reviews`);
    });
}

startServer().catch(console.error);