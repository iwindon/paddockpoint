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
- **Local Storage**: All data is stored locally in your browser - no backend required

## 📱 Mobile Responsive

The website is fully responsive and optimized for mobile devices:

![Mobile View](https://github.com/user-attachments/assets/dc7c3099-b5be-423e-b828-201339e5c4bf)

## 🚀 Getting Started

### View the Website

Simply open `index.html` in your web browser to start using the website immediately.

### For Development

If you want to make changes or serve the website locally:

1. Clone this repository
2. Start a local web server in the project directory:
   ```bash
   python3 -m http.server 8080
   ```
   Or use any other static file server
3. Open http://localhost:8080 in your browser

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

- **Pure HTML/CSS/JavaScript**: No frameworks or dependencies required
- **Local Storage**: Data persists in browser localStorage
- **Responsive Design**: CSS Grid and Flexbox for mobile-friendly layout
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Modern CSS**: Uses CSS custom properties and modern layout techniques

### File Structure

```
paddockpoint/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
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