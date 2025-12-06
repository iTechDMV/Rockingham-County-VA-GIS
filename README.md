# Rockingham County Property Assessment Portal

A comprehensive web application for property assessment and market analysis in Rockingham County, Virginia.

## Features

### Property Search & Discovery
- **Advanced Search**: Multi-filter property search with real-time results
- **Interactive Map**: Leaflet-based map with property markers and details
- **Property Cards**: Beautiful property listings with images and key information
- **Comparison Tools**: Side-by-side property comparison functionality

### Assessment Tools
- **Tax Calculator**: Calculate property taxes based on assessed values
- **Assessment History**: Interactive timeline showing property value changes
- **Market Trends**: Real-time market data and analytics
- **Export Tools**: Download property reports and assessment data

### Market Analytics
- **Comprehensive Dashboard**: Key market metrics and trends
- **Data Visualization**: Interactive charts using ECharts.js
- **Neighborhood Analysis**: Comparative analysis of different areas
- **Market Forecasting**: Projected market trends and values

## Technology Stack

- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript (ES6+)
- **Maps**: Leaflet.js for interactive mapping
- **Charts**: ECharts.js for data visualization
- **Animations**: Anime.js for smooth transitions
- **Styling**: Custom CSS with modern design principles

## File Structure

```
/
├── index.html              # Main property search interface
├── assessments.html        # Assessment tools and comparison
├── analytics.html          # Market analytics dashboard
├── main.js                # Core JavaScript functionality
├── resources/             # Assets and data
│   ├── hero-bg.png       # Hero background image
│   ├── property*.jpg     # Property images
│   └── properties.json   # Mock property data
├── design.md              # Design philosophy and guidelines
├── interaction.md         # Interactive components specification
├── outline.md             # Project structure outline
└── README.md              # This file
```

## Key Components

### Interactive Elements
1. **Property Search Engine**: Real-time filtering with multiple criteria
2. **Interactive Map**: Click-to-view property details with boundary overlays
3. **Assessment Timeline**: Interactive charts showing value history
4. **Property Comparison**: Drag-and-drop comparison tool

### Visual Effects
1. **Aurora Gradient Background**: Animated gradient using CSS animations
2. **Hover Effects**: 3D tilt effects on property cards
3. **Smooth Transitions**: Anime.js powered interface animations
4. **Glass Morphism**: Modern frosted glass navigation and cards

### Data Management
1. **Mock Property Database**: 100 realistic property records
2. **Search Indexing**: Fast property search and filtering
3. **Export Functionality**: JSON and report generation
4. **Real-time Updates**: Live statistics and calculations

## Usage

### Running the Application
1. Open `index.html` in a modern web browser
2. Or serve via HTTP server: `python -m http.server 8000`
3. Navigate to `http://localhost:8000`

### Navigation
- **Search**: Main property search and map interface
- **Assessments**: Property comparison and tax tools
- **Analytics**: Market trends and neighborhood analysis

### Key Features
- Search properties by address, owner, or neighborhood
- Filter by property type, value range, and location
- Compare up to 3 properties side-by-side
- Calculate property taxes with adjustable rates
- Export property reports and market data
- View interactive charts and market forecasts

## Design Philosophy

### Visual Language
- **Modern Civic Design**: Clean, professional aesthetic
- **Data-Driven Interface**: Emphasis on clarity and accessibility
- **Trustworthy Authority**: Design conveys reliability and official capacity

### Color Palette
- **Primary**: Deep forest green (#2D5016)
- **Secondary**: Warm gold (#B8860B)
- **Accent**: Soft blue (#4A90A4)
- **Neutral**: Warm grays and whites

### Typography
- **Display**: Tiempos Headline for headings
- **Body**: Inter for interface text
- **Monospace**: JetBrains Mono for technical data

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Features

- Optimized images and assets
- Efficient JavaScript with minimal dependencies
- Responsive design for all screen sizes
- Smooth animations with hardware acceleration
- Lazy loading for non-critical content

## Future Enhancements

- Integration with real GIS data APIs
- User authentication and saved searches
- Advanced mapping with parcel boundaries
- Mobile app companion
- Real-time market data feeds

## License

This project is created for demonstration purposes. All property data is fictional and for testing only.

## Contact

For questions about the application or implementation details, please refer to the project documentation or contact the development team.