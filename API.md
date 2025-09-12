# Paddock Point API Documentation

## Overview

The Paddock Point application now uses a centralized backend API to store and manage service provider data, replacing the previous localStorage-based approach. This enables data to be shared among all users and provides persistent storage.

## Backend Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

The server will start on port 3000 by default and serve both the API endpoints and the static frontend files.

### Server Configuration

- **Port**: 3000 (configurable via PORT environment variable)
- **Data Storage**: JSON file (`services-data.json`) - created automatically with sample data
- **CORS**: Enabled for cross-origin requests
- **Static Files**: Served from the root directory

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### 1. Get All Services

**Endpoint:** `GET /api/services`

**Description:** Retrieves all service providers with their reviews.

**Response:**
```json
[
  {
    "id": "service-1234567890",
    "name": "Cool Comfort HVAC",
    "category": "hvac",
    "phone": "(555) 123-4567",
    "website": "https://coolcomforthvac.com",
    "description": "Professional HVAC services...",
    "reviews": [
      {
        "id": "review-1234567890",
        "reviewer": "John Doe",
        "rating": 5,
        "text": "Excellent service!",
        "date": "2024-09-12"
      }
    ]
  }
]
```

### 2. Get Specific Service

**Endpoint:** `GET /api/services/:id`

**Parameters:**
- `id` (string): Service provider ID

**Response:** Single service object (same structure as above)

**Error Response:**
```json
{
  "error": "Service not found"
}
```

### 3. Add New Service

**Endpoint:** `POST /api/services`

**Request Body:**
```json
{
  "name": "Business Name",
  "category": "hvac",
  "phone": "(555) 123-4567",
  "website": "https://example.com",
  "description": "Business description",
  "initialReview": {
    "reviewer": "Your Name",
    "rating": 5,
    "text": "Initial review text"
  }
}
```

**Required Fields:**
- `name`: Business name
- `category`: Service category
- `initialReview`: Initial review with reviewer, rating, and text

**Response:** Created service object with generated ID and formatted initial review

### 4. Add Review to Service

**Endpoint:** `POST /api/services/:id/reviews`

**Parameters:**
- `id` (string): Service provider ID

**Request Body:**
```json
{
  "reviewer": "Customer Name",
  "rating": 4,
  "text": "Review text here"
}
```

**Required Fields:**
- `reviewer`: Reviewer's name
- `rating`: Rating (1-5)
- `text`: Review text

**Response:** Created review object with generated ID and date

## Service Categories

The following service categories are supported:
- `hvac`: HVAC
- `electrical`: Electrical
- `plumbing`: Plumbing
- `landscaping`: Landscaping
- `cleaning`: Cleaning
- `pest`: Pest Control
- `roofing`: Roofing
- `general`: General Contractors

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200`: Success
- `201`: Created (for POST requests)
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Internal Server Error

Error responses include a JSON object with an `error` field describing the issue.

## Data Persistence

- Data is stored in `services-data.json` in the server root directory
- File is created automatically with sample data if it doesn't exist
- All changes are immediately written to the file
- No database required for this simple implementation

## Frontend Integration

The frontend uses an `ApiService` class that abstracts the API calls:

```javascript
const apiService = new ApiService();

// Get all services
const services = await apiService.getServices();

// Add new service
const newService = await apiService.addService(serviceData);

// Add review
const newReview = await apiService.addReview(serviceId, reviewData);
```

## Development Notes

### Extending the API

To add new features:

1. **New Endpoints**: Add routes in `server.js`
2. **Data Validation**: Add validation in request handlers
3. **Frontend Integration**: Update `ApiService` class and UI components

### Production Considerations

For production deployment, consider:

1. **Database**: Replace JSON file storage with a proper database (MongoDB, PostgreSQL, etc.)
2. **Authentication**: Add user authentication and authorization
3. **Rate Limiting**: Implement rate limiting for API endpoints
4. **Input Validation**: Add comprehensive input validation and sanitization
5. **Logging**: Add proper logging and monitoring
6. **Environment Variables**: Use environment variables for configuration
7. **Error Handling**: Implement comprehensive error handling and logging

### File Structure

```
paddockpoint/
├── server.js              # Express server and API routes
├── api-service.js          # Frontend API service layer
├── script.js              # Updated frontend with API integration
├── index.html             # Frontend HTML
├── styles.css             # Frontend CSS
├── package.json           # Node.js dependencies and scripts
├── services-data.json     # Data storage (auto-generated)
└── .gitignore            # Git ignore file
```

## Migration from localStorage

The application has been successfully migrated from localStorage to the backend API:

1. **Removed**: All `localStorage.getItem()` and `localStorage.setItem()` calls
2. **Added**: API service layer for data operations
3. **Updated**: Frontend to use async/await for API calls
4. **Retained**: All existing UI functionality and user experience

Users can now add services and reviews that are immediately visible to all other users, making the application truly collaborative.