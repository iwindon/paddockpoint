# 🏘️ Paddock Point Neighborhood Services

A community-driven directory of trusted local service providers for the Paddock Point Neighborhood. This static website allows neighbors to discover, review, and recommend local businesses across various service categories.

![Paddock Point Website](https://github.com/user-attachments/assets/870dbffe-3116-4574-882c-05322a622cae)

## 🌟 Features

- **Service Categories**: Browse providers across multiple categories including HVAC, Electrical, Plumbing, Landscaping, Cleaning, Pest Control, Roofing, and General Contractors
- **Review System**: Read and write reviews for service providers with star ratings
- **Search Functionality**: Search for specific services or providers by name, category, or description
- **Category Filtering**: Filter providers by service category for easy browsing
- **Add New Providers**: Community members can add new service providers with initial reviews
- **Responsive Design**: Fully mobile-responsive design that works on all devices
- **Centralized Backend**: All data is stored on a backend server and shared among all users
- **Real-time Updates**: New services and reviews are immediately visible to all users

## 📱 Mobile Responsive

The website is fully responsive and optimized for mobile devices:

![Mobile View](https://github.com/user-attachments/assets/dc7c3099-b5be-423e-b828-201339e5c4bf)

## 🚀 Getting Started

### Running the Application

The application now requires a backend server to function properly. Follow these steps:

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the server:**
   ```bash
   npm start
   ```
   This will start both the API server and serve the frontend files.
4. **Open your browser** and navigate to `http://localhost:3000`

### Backend Requirements

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)

The server will:
- Serve the frontend files at `http://localhost:3000`
- Provide API endpoints at `http://localhost:3000/api`
- Store data persistently in `services-data.json`
- Initialize with sample data automatically

### For Development

If you want to make changes or run in development mode:

1. Clone this repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. The application will be available at http://localhost:3000

## 💡 How to Use

### Browsing Services

1. **View All Services**: Click "All Services" to see all available providers
2. **Filter by Category**: Click any category button (HVAC, Electrical, etc.) to filter results
3. **Search**: Use the search box to find specific services or providers
4. **Contact Providers**: Click phone numbers to call directly or visit their websites

### Adding a New Service Provider

1. Click the "Add Service Provider" button
2. Fill out the form with:
   - Business name and category
   - Contact information (phone, website)
   - Business description
   - Your name and initial review
   - Star rating (1-5 stars)
3. Submit the form to add the provider to the directory

### Adding Reviews

1. Find the service provider you want to review
2. Click the "Add Review" button on their card
3. Fill out your name, rating, and review text
4. Submit to add your review

## 🛠️ Technical Details

- **Backend**: Node.js with Express server
- **API**: RESTful API for services and reviews management
- **Frontend**: Pure HTML/CSS/JavaScript with API integration
- **Data Storage**: JSON file-based storage (easily replaceable with database)
- **Responsive Design**: CSS Grid and Flexbox for mobile-friendly layout
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Modern CSS**: Uses CSS custom properties and modern layout techniques

### Architecture

The application follows a client-server architecture:
- **Frontend**: Static HTML/CSS/JavaScript files served by the server
- **Backend**: Express.js API server handling data operations
- **Data Layer**: JSON file storage with automatic initialization

### API Endpoints

- `GET /api/services` - Get all service providers
- `POST /api/services` - Add a new service provider
- `GET /api/services/:id` - Get specific service provider
- `POST /api/services/:id/reviews` - Add review to service provider

See [API.md](./API.md) for detailed API documentation.

### File Structure

```
paddockpoint/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # Frontend JavaScript with API integration
├── api-service.js      # API service layer for backend communication
├── server.js           # Express server and API routes
├── package.json        # Node.js dependencies and scripts
├── services-data.json  # Data storage file (auto-generated)
├── API.md             # API documentation
└── README.md          # This documentation
```

## 🎨 Customization

### Adding New Service Categories

To add new service categories, update three places in the code:

1. **HTML Navigation** (`index.html`): Add new button in the `.main-nav` section
2. **Form Options** (`index.html`): Add new option in the category select dropdown
3. **JavaScript Categories** (`script.js`): Update the `formatCategory` function

### Styling

All styling is contained in `styles.css`. The design uses CSS custom properties for easy theming and is fully responsive with mobile-first design principles.

### Data Structure

Service providers are stored as JSON objects with this structure:

```javascript
{
  id: "unique-id",
  name: "Business Name",
  category: "service-category",
  phone: "(555) 123-4567",
  website: "https://example.com",
  description: "Business description",
  reviews: [
    {
      id: "review-id",
      reviewer: "Reviewer Name",
      rating: 5,
      text: "Review text",
      date: "2024-01-01"
    }
  ]
}
```

All data operations now use the backend API instead of localStorage, ensuring data is shared among all users.

## 🤝 Contributing

This is a community project! To contribute:

1. Fork the repository
2. Make your changes
3. Test thoroughly on desktop and mobile
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🏠 About Paddock Point

Paddock Point is a neighborhood community focused on supporting local businesses and helping neighbors connect with trusted service providers. This directory is maintained by and for the community.

---

**Built with ❤️ for the Paddock Point Neighborhood**