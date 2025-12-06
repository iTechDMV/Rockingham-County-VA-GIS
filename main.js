// Rockingham County Property Assessment Application
// Main JavaScript functionality

let properties = [];
let filteredProperties = [];
let currentProperty = null;
let map = null;
let markers = [];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    loadProperties();
    initializeMap();
    setupEventListeners();
    initializeAnimations();
});

// Load property data
async function loadProperties() {
    try {
        const response = await fetch('./resources/properties.json');
        properties = await response.json();
        filteredProperties = [...properties];
        displayProperties();
        updateStats();
    } catch (error) {
        console.error('Error loading properties:', error);
    }
}

// Initialize Leaflet map
function initializeMap() {
    if (document.getElementById('map')) {
        map = L.map('map').setView([38.4495, -78.8689], 10);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        updateMapMarkers();
    }
}

// Update map markers
function updateMapMarkers() {
    if (!map) return;
    
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Add new markers
    filteredProperties.slice(0, 50).forEach(property => {
        const lat = 38.4495 + (Math.random() - 0.5) * 0.1;
        const lng = -78.8689 + (Math.random() - 0.5) * 0.1;
        
        const marker = L.marker([lat, lng])
            .bindPopup(`
                <div class="p-3">
                    <h3 class="font-bold text-lg">${property.address}</h3>
                    <p class="text-sm text-gray-600">${property.neighborhood}</p>
                    <p class="text-lg font-semibold text-green-700">$${property.assessed_value.toLocaleString()}</p>
                    <button onclick="viewProperty('${property.id}')" class="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                        View Details
                    </button>
                </div>
            `)
            .addTo(map);
        
        markers.push(marker);
    });
}

// Display properties in grid
function displayProperties() {
    const container = document.getElementById('properties-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    filteredProperties.slice(0, 20).forEach(property => {
        const card = createPropertyCard(property);
        container.appendChild(card);
    });
}

// Create property card element
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer';
    
    card.innerHTML = `
        <div class="relative">
            <img src="./resources/${property.image}" alt="${property.address}" class="w-full h-48 object-cover">
            <div class="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-semibold">
                ${property.property_type}
            </div>
        </div>
        <div class="p-4">
            <h3 class="font-bold text-lg mb-1">${property.address}</h3>
            <p class="text-gray-600 text-sm mb-2">${property.neighborhood}</p>
            <div class="flex justify-between items-center mb-2">
                <span class="text-2xl font-bold text-green-700">$${property.assessed_value.toLocaleString()}</span>
                <span class="text-sm text-gray-500">${property.square_feet} sq ft</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-3">
                <span>${property.bedrooms} bed</span>
                <span>${property.bathrooms} bath</span>
                <span>${property.lot_size} acres</span>
            </div>
            <button onclick="viewProperty('${property.id}')" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                View Details
            </button>
        </div>
    `;
    
    return card;
}

// View property details
function viewProperty(propertyId) {
    currentProperty = properties.find(p => p.id === propertyId);
    if (currentProperty) {
        showPropertyModal(currentProperty);
    }
}

// Show property modal
function showPropertyModal(property) {
    const modal = document.getElementById('property-modal');
    const content = document.getElementById('modal-content');
    
    if (!modal || !content) return;
    
    content.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold">${property.address}</h2>
            <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div class="grid md:grid-cols-2 gap-6">
            <div>
                <img src="./resources/${property.image}" alt="${property.address}" class="w-full h-64 object-cover rounded-lg mb-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="font-bold mb-2">Property Information</h3>
                    <div class="grid grid-cols-2 gap-2 text-sm">
                        <div><strong>Type:</strong> ${property.property_type}</div>
                        <div><strong>Neighborhood:</strong> ${property.neighborhood}</div>
                        <div><strong>Year Built:</strong> ${property.year_built}</div>
                        <div><strong>Owner:</strong> ${property.owner_name}</div>
                        <div><strong>Bedrooms:</strong> ${property.bedrooms}</div>
                        <div><strong>Bathrooms:</strong> ${property.bathrooms}</div>
                        <div><strong>Square Feet:</strong> ${property.square_feet.toLocaleString()}</div>
                        <div><strong>Lot Size:</strong> ${property.lot_size} acres</div>
                    </div>
                </div>
            </div>
            <div>
                <div class="bg-green-50 p-4 rounded-lg mb-4">
                    <h3 class="font-bold text-green-800 mb-2">Assessment Values</h3>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span>Assessed Value:</span>
                            <span class="font-bold">$${property.assessed_value.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Market Value:</span>
                            <span class="font-bold">$${property.market_value.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Annual Tax:</span>
                            <span class="font-bold text-red-600">$${property.tax_amount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                <div class="space-y-2">
                    <button onclick="addToComparison('${property.id}')" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Add to Comparison
                    </button>
                    <button onclick="exportProperty('${property.id}')" class="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600">
                        Export Report
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('property-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Search properties
function searchProperties() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const typeFilter = document.getElementById('type-filter').value;
    const neighborhoodFilter = document.getElementById('neighborhood-filter').value;
    const minValue = parseInt(document.getElementById('min-value').value) || 0;
    const maxValue = parseInt(document.getElementById('max-value').value) || 10000000;
    
    filteredProperties = properties.filter(property => {
        const matchesSearch = property.address.toLowerCase().includes(searchTerm) ||
                            property.neighborhood.toLowerCase().includes(searchTerm) ||
                            property.owner_name.toLowerCase().includes(searchTerm);
        const matchesType = !typeFilter || property.property_type === typeFilter;
        const matchesNeighborhood = !neighborhoodFilter || property.neighborhood === neighborhoodFilter;
        const matchesValue = property.assessed_value >= minValue && property.assessed_value <= maxValue;
        
        return matchesSearch && matchesType && matchesNeighborhood && matchesValue;
    });
    
    displayProperties();
    updateMapMarkers();
    updateStats();
}

// Update statistics
function updateStats() {
    const totalValue = filteredProperties.reduce((sum, p) => sum + p.assessed_value, 0);
    const avgValue = totalValue / filteredProperties.length;
    
    const statsContainer = document.getElementById('stats-container');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="text-3xl font-bold text-green-600">${filteredProperties.length}</div>
                <div class="text-gray-600">Properties</div>
            </div>
            <div class="stat-card">
                <div class="text-3xl font-bold text-blue-600">$${Math.round(avgValue).toLocaleString()}</div>
                <div class="text-gray-600">Average Value</div>
            </div>
            <div class="stat-card">
                <div class="text-3xl font-bold text-purple-600">$${totalValue.toLocaleString()}</div>
                <div class="text-gray-600">Total Value</div>
            </div>
        `;
    }
}

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', searchProperties);
    }
    
    const filters = ['type-filter', 'neighborhood-filter', 'min-value', 'max-value'];
    filters.forEach(filterId => {
        const element = document.getElementById(filterId);
        if (element) {
            element.addEventListener('change', searchProperties);
        }
    });
    
    // Close modal on outside click
    const modal = document.getElementById('property-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// Initialize animations
function initializeAnimations() {
    // Animate property cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply animation to property cards
    setTimeout(() => {
        const cards = document.querySelectorAll('.property-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }, 100);
}

// Comparison functionality
let comparisonList = [];

function addToComparison(propertyId) {
    if (comparisonList.length >= 3) {
        alert('You can only compare up to 3 properties at a time.');
        return;
    }
    
    if (!comparisonList.includes(propertyId)) {
        comparisonList.push(propertyId);
        updateComparisonUI();
        alert('Property added to comparison!');
    } else {
        alert('Property is already in comparison list.');
    }
}

function updateComparisonUI() {
    const container = document.getElementById('comparison-list');
    if (!container) return;
    
    container.innerHTML = '';
    comparisonList.forEach(propertyId => {
        const property = properties.find(p => p.id === propertyId);
        if (property) {
            const item = document.createElement('div');
            item.className = 'comparison-item';
            item.innerHTML = `
                <span>${property.address}</span>
                <button onclick="removeFromComparison('${propertyId}')" class="text-red-500 ml-2">×</button>
            `;
            container.appendChild(item);
        }
    });
}

function removeFromComparison(propertyId) {
    comparisonList = comparisonList.filter(id => id !== propertyId);
    updateComparisonUI();
}

function viewComparison() {
    if (comparisonList.length < 2) {
        alert('Please add at least 2 properties to compare.');
        return;
    }
    
    window.location.href = `assessments.html?compare=${comparisonList.join(',')}`;
}

// Export functionality
function exportProperty(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
        const data = JSON.stringify(property, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${property.id}_report.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Utility functions
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

function formatNumber(value) {
    return new Intl.NumberFormat('en-US').format(value);
}