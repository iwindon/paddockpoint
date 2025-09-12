# 🏘️ Paddock Point Neighborhood Services

A community-driven directory of trusted local service providers for the Paddock Point Neighborhood. This static website allows neighbors to discover, review, and recommend local businesses across various service categories.

![Paddock Point Website](https://github.com/user-attachments/assets/870dbffe-3116-4574-882c-05322a622cae)

## 🌟 Features

- **Service Categories**: Browse providers across multiple categories including HVAC, Electrical, Plumbing, Landscaping, Cleaning, Pest Control, Roofing, and General Contractors.
- **Review System**: Read reviews for service providers with star ratings.
- **Static Data**: Service provider data is stored in a JSON file (`services.json`).
- **Responsive Design**: Fully mobile-responsive design that works on all devices.

## 📱 Mobile Responsive

The website is fully responsive and optimized for mobile devices:

![Mobile View](https://github.com/user-attachments/assets/dc7c3099-b5be-423e-b828-201339e5c4bf)

## 🚀 Getting Started

### Running the Application

This is a static website that does not require a backend server. Follow these steps:

1. **Clone the repository**
2. **Open the `index.html` file** in your browser to view the application.

### For Development

If you want to make changes or run in development mode:

1. Clone this repository.
2. Open the project in your favorite code editor.
3. Edit the files as needed (e.g., `index.html`, `styles.css`, `script.js`).
4. Open `index.html` in your browser to test changes.

## 💡 How to Use

### Browsing Services

1. **View All Services**: All service providers are listed on the main page.
2. **Filter by Category**: Use the category buttons to filter results.
3. **Contact Providers**: Click phone numbers to call directly or visit their websites.

### Adding Reviews

Currently, reviews are stored in the `services.json` file. To add a review:
1. Open the `services.json` file.
2. Locate the service provider you want to review.
3. Add a new review object to the `reviews` array for that provider.

Example:
```json
"reviews": [
  {
    "id": "review-8",
    "reviewer": "John Doe",
    "rating": 4,
    "date": "2025-09-12",
    "text": "Great service and quick response!"
  }
]
```

## 🛠️ Technical Details

- **Frontend**: Pure HTML/CSS/JavaScript.
- **Data Storage**: Static JSON file (`services.json`).
- **Responsive Design**: CSS Grid and Flexbox for mobile-friendly layout.
- **Accessibility**: Semantic HTML and proper ARIA labels.
- **Modern CSS**: Uses CSS custom properties and modern layout techniques.

### File Structure

```
paddockpoint/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # Frontend JavaScript for interactivity
├── services.json       # Static data file for service providers
├── README.md           # This documentation
```

### Data Structure

Service providers are stored as JSON objects with this structure:

```json
{
  "id": "unique-id",
  "name": "Business Name",
  "category": "service-category",
  "phone": "(555) 123-4567",
  "website": "https://example.com",
  "description": "Business description",
  "reviews": [
    {
      "id": "review-id",
      "reviewer": "Reviewer Name",
      "rating": 5,
      "text": "Review text",
      "date": "2024-01-01"
    }
  ]
}
```

## 🎨 Customization

### Adding New Service Categories

To add new service categories, update the following:

1. **HTML Navigation** (`index.html`): Add a new button in the navigation section.
2. **JavaScript Categories** (`script.js`): Update any filtering logic to include the new category.

### Styling

All styling is contained in `styles.css`. The design uses CSS custom properties for easy theming and is fully responsive with mobile-first design principles.

## 🤝 Contributing

This is a community project! To contribute:

1. Fork the repository.
2. Make your changes.
3. Test thoroughly on desktop and mobile.
4. Submit a pull request.

## 📄 License

This project is open source and available under the MIT License.

## 🏠 About Paddock Point

Paddock Point is a neighborhood community focused on supporting local businesses and helping neighbors connect with trusted service providers. This directory is maintained by and for the community.

---

**Built with ❤️ for the Paddock Point Neighborhood**