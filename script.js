// =====================
// Navigation & Scroll Effects
// =====================

const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');

// Handle navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when scrolling down
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (currentScroll > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll to top button
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================
// Menu Filtering
// =====================

const menuTabs = document.querySelectorAll('.menu-tab');
const menuGrid = document.getElementById('menuGrid');
const menuCategories = document.getElementById('menuCategories');
const menuSection = document.getElementById('menu');

let allMenuItems = [];

// Category image mapping
const categoryImages = {
    pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop&q=80',
    kebab: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&h=600&fit=crop&q=80',
    fastfood: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop&q=80',
    salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&q=80',
    drinks: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=800&h=600&fit=crop&q=80',
    extras: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&h=600&fit=crop&q=80'
};

// Load menu data and create menu items
async function loadMenuData() {
    try {
        const response = await fetch('menu_data.json');
        const data = await response.json();
        
        // Combine all menu items into single array
        allMenuItems = [
            ...data.americanPanPizza,
            ...data.pizzaItalien,
            ...data.kebab,
            ...data.fastfood,
            ...data.salad,
            ...data.extras,
            ...data.drinks
        ];
        
        // Create HTML for all menu items
        createMenuItems(allMenuItems);
        
        // Initialize with top3 filter
        filterMenuItems('top3');
        
    } catch (error) {
        console.error('Error loading menu data:', error);
        menuGrid.innerHTML = '<p style="text-align: center; padding: 2rem;">Kunne ikke laste menyen. Vennligst prøv igjen senere.</p>';
    }
}

// Create menu item HTML
function createMenuItems(items) {
    menuGrid.innerHTML = items.map(item => `
        <div class="menu-item" data-category="${item.category}" data-id="${item.id}" ${item.top3 ? 'data-top3="true"' : ''}>
            <div class="menu-item-image">
                <img src="${categoryImages[item.category]}" alt="${item.name}" loading="lazy">
            </div>
            <div class="menu-item-content">
                <h3>${item.name}${item.recommended ? ' <span class="recommended-badge">⭐</span>' : ''}</h3>
                ${item.description ? `<p>${item.description}</p>` : ''}
                <div class="menu-item-footer">
                    <span class="price">${item.price},-</span>
                    <button class="btn-order">Bestill</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-attach order button listeners
    attachOrderButtonListeners();
}

// Function to filter menu items
function filterMenuItems(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        if (category === 'all') {
            item.classList.remove('hidden');
            item.classList.add('fade-in');
        } else if (category === 'top3') {
            if (item.dataset.top3 === 'true') {
                item.classList.remove('hidden');
                item.classList.add('fade-in');
            } else {
                item.classList.add('hidden');
            }
        } else if (item.dataset.category === category) {
            item.classList.remove('hidden');
            item.classList.add('fade-in');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Load menu on page load
loadMenuData();

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        menuTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        const category = tab.dataset.category;
        
        // Filter menu items
        filterMenuItems(category);
    });
});

// =====================
// Sticky Menu Categories
// =====================

let menuCategoriesOffset = null;
const menuCategoriesSpacer = document.getElementById('menuCategoriesSpacer');

// Calculate offsets after page load
window.addEventListener('load', () => {
    menuCategoriesOffset = menuCategories.getBoundingClientRect().top + window.scrollY;
});

window.addEventListener('scroll', () => {
    if (!menuCategoriesOffset) {
        menuCategoriesOffset = menuCategories.getBoundingClientRect().top + window.scrollY;
    }
    
    const menuRect = menuSection.getBoundingClientRect();
    const scrollY = window.scrollY;
    const navHeight = navbar.offsetHeight;
    const categoriesHeight = menuCategories.offsetHeight || 60;
    
    // Make sticky when scrolling past the categories
    if (scrollY > menuCategoriesOffset - navHeight) {
        if (!menuCategories.classList.contains('sticky')) {
            menuCategoriesSpacer.style.height = categoriesHeight + 'px';
            menuCategoriesSpacer.style.display = 'block';
            menuCategories.style.top = navHeight + 'px';
            menuCategories.classList.add('sticky');
        }
    } else {
        if (menuCategories.classList.contains('sticky')) {
            menuCategoriesSpacer.style.display = 'none';
            menuCategories.classList.remove('sticky');
        }
    }
    
    // Hide when scrolling past the menu section
    if (menuRect.bottom < navHeight + categoriesHeight + 20) {
        menuCategories.classList.add('hidden');
    } else {
        menuCategories.classList.remove('hidden');
    }
});

// =====================
// Order Button Actions
// =====================

function attachOrderButtonListeners() {
    const orderButtons = document.querySelectorAll('.btn-order');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent;
            
            // In a real application, this would open an order modal or redirect to order page
            // For now, we'll call the restaurant
            if (confirm(`Ønsker du å bestille ${itemName}?\n\nDu vil bli videreført til å ringe restauranten.`)) {
                window.location.href = 'tel:33452225';
            }
        });
    });
}

// =====================
// Load Allergen Data
// =====================

async function loadAllergenData() {
    try {
        const response = await fetch('pizzavera_data.json');
        const data = await response.json();
        
        const tableBody = document.getElementById('allergenTableBody');
        
        if (data.allergens && data.allergens.length > 0) {
            data.allergens.forEach(item => {
                const row = document.createElement('tr');
                
                // Dish name
                const dishCell = document.createElement('td');
                dishCell.textContent = item.dish;
                row.appendChild(dishCell);
                
                // Allergens
                const allergenKeys = [
                    'Gluten/hvete',
                    'Skalldyr',
                    'Egg',
                    'Fisk',
                    'Soya',
                    'Melk',
                    'Selleri',
                    'Sennep',
                    'Sesamfrø',
                    'Bløtdyr'
                ];
                
                allergenKeys.forEach(key => {
                    const cell = document.createElement('td');
                    const value = item.allergens[key] || '';
                    cell.textContent = value;
                    
                    // Highlight cells with allergens
                    if (value === 'o') {
                        cell.style.backgroundColor = '#fff3cd';
                        cell.style.fontWeight = 'bold';
                        cell.style.color = '#856404';
                    }
                    
                    row.appendChild(cell);
                });
                
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Kunne ikke laste allergen-data:', error);
        
        // Fallback: Add some example data
        const exampleData = [
            { dish: 'Hvit saus', allergens: Array(10).fill('') },
            { dish: 'Remulade', allergens: ['', '', 'o', '', '', 'o', '', 'o', '', ''] },
            { dish: 'Bernaisesaus', allergens: ['', '', 'o', '', 'o', 'o', '', 'o', '', ''] },
            { dish: 'Wienertoast', allergens: ['o', '', '', '', 'o', 'o', '', '', '', ''] }
        ];
        
        const tableBody = document.getElementById('allergenTableBody');
        exampleData.forEach(item => {
            const row = document.createElement('tr');
            const dishCell = document.createElement('td');
            dishCell.textContent = item.dish;
            row.appendChild(dishCell);
            
            item.allergens.forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                if (value === 'o') {
                    cell.style.backgroundColor = '#fff3cd';
                    cell.style.fontWeight = 'bold';
                    cell.style.color = '#856404';
                }
                row.appendChild(cell);
            });
            
            tableBody.appendChild(row);
        });
    }
}

// =====================
// Intersection Observer for Animations
// =====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Add staggered animation for grid items
            if (entry.target.classList.contains('feature-card') ||
                entry.target.classList.contains('menu-item') ||
                entry.target.classList.contains('contact-card')) {
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature-card, .menu-item, .contact-card, .section-header');
animateElements.forEach(el => observer.observe(el));

// =====================
// Smooth Scroll for Anchor Links
// =====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// =====================
// Delivery Radius Checker
// =====================

const RESTAURANT_LOCATION = {
    lat: 59.1235668,
    lng: 10.2354073,
    address: "Vesterøyveien 25, 3222 Sandefjord"
};

const DELIVERY_RADIUS_KM = 6;
const BASE_DELIVERY_COST = 85;
const EXTRA_COST_PER_KM = 20;

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

// Calculate delivery cost based on distance
function calculateDeliveryCost(distance) {
    if (distance <= DELIVERY_RADIUS_KM) {
        return BASE_DELIVERY_COST;
    } else {
        const extraKm = Math.ceil(distance - DELIVERY_RADIUS_KM);
        return BASE_DELIVERY_COST + (extraKm * EXTRA_COST_PER_KM);
    }
}

// Create Google Maps directions URL
function createDirectionsURL(userLat, userLng) {
    return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${RESTAURANT_LOCATION.lat},${RESTAURANT_LOCATION.lng}&travelmode=driving`;
}

// Check delivery availability
const checkDeliveryBtn = document.getElementById('checkDeliveryBtn');
const deliveryResult = document.getElementById('deliveryResult');
const directionsLink = document.getElementById('directionsLink');

if (checkDeliveryBtn) {
    checkDeliveryBtn.addEventListener('click', () => {
        // Check if geolocation is supported
        if (!navigator.geolocation) {
            deliveryResult.className = 'delivery-result outside-range';
            deliveryResult.innerHTML = '❌ Din nettleser støtter ikke posisjonering. Vennligst bruk en moderne nettleser.';
            deliveryResult.classList.remove('hidden');
            return;
        }

        // Show loading state
        deliveryResult.className = 'delivery-result checking';
        deliveryResult.innerHTML = '🔄 Henter din posisjon...';
        deliveryResult.classList.remove('hidden');
        directionsLink.classList.add('hidden');
        checkDeliveryBtn.disabled = true;

        // Get user's position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                // Calculate distance
                const distance = calculateDistance(
                    userLat,
                    userLng,
                    RESTAURANT_LOCATION.lat,
                    RESTAURANT_LOCATION.lng
                );
                
                const deliveryCost = calculateDeliveryCost(distance);
                const distanceText = distance.toFixed(2);
                
                // Create directions URL
                const directionsURL = createDirectionsURL(userLat, userLng);
                
                // Display result
                if (distance <= DELIVERY_RADIUS_KM) {
                    deliveryResult.className = 'delivery-result within-range';
                    deliveryResult.innerHTML = `
                        ✅ <strong>Ja! Vi leverer til deg!</strong><br>
                        <div class="distance-info">
                            Du er ${distanceText} km fra restauranten<br>
                            <span class="delivery-cost">Leveringskostnad: ${deliveryCost},-</span>
                        </div>
                    `;
                } else {
                    deliveryResult.className = 'delivery-result outside-range';
                    deliveryResult.innerHTML = `
                        ⚠️ <strong>Du er utenfor standard leveringsområde</strong><br>
                        <div class="distance-info">
                            Du er ${distanceText} km fra restauranten<br>
                            Ring oss på 33 45 22 25 for å høre om levering er mulig<br>
                            <span class="delivery-cost">Estimert leveringskostnad: ${deliveryCost},-</span>
                        </div>
                    `;
                }
                
                // Show directions link
                directionsLink.innerHTML = `
                    <a href="${directionsURL}" target="_blank" class="btn-directions">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Få veibeskrivelse i Google Maps
                    </a>
                `;
                directionsLink.classList.remove('hidden');
                
                checkDeliveryBtn.disabled = false;
            },
            (error) => {
                let errorMessage = '';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = '❌ Du må gi tillatelse til å bruke din posisjon. Klikk på låsikonet i adressefeltet og aktiver posisjon.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = '❌ Posisjonen din er ikke tilgjengelig. Sjekk at du har aktivert GPS/posisjonering.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = '❌ Timeout - kunne ikke hente din posisjon. Prøv igjen.';
                        break;
                    default:
                        errorMessage = '❌ En ukjent feil oppstod. Prøv igjen.';
                }
                
                deliveryResult.className = 'delivery-result outside-range';
                deliveryResult.innerHTML = errorMessage + '<br><br>Du kan også ringe oss direkte på <a href="tel:33452225">33 45 22 25</a> for å bestille.';
                
                // Still show directions link even if location fails
                const manualDirectionsURL = `https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT_LOCATION.lat},${RESTAURANT_LOCATION.lng}`;
                directionsLink.innerHTML = `
                    <a href="${manualDirectionsURL}" target="_blank" class="btn-directions">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Åpne veibeskrivelse i Google Maps
                    </a>
                `;
                directionsLink.classList.remove('hidden');
                
                checkDeliveryBtn.disabled = false;
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
}

// =====================
// Initialize
// =====================

document.addEventListener('DOMContentLoaded', () => {
    // Load allergen data
    loadAllergenData();
    
    // Add entrance animation to hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Log welcome message
    console.log('%c🍕 Velkommen til Pizzavera Sandefjord! 🍕', 
                'font-size: 20px; font-weight: bold; color: #ff6b35;');
    console.log('%cNettside utviklet med moderne webteknoligier', 
                'font-size: 12px; color: #6c757d;');
});

// =====================
// Easter Egg: Konami Code
// =====================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        // Activate pizza rain easter egg
        createPizzaRain();
    }
});

function createPizzaRain() {
    const pizzaEmojis = ['🍕', '🍔', '🌭', '🥙', '🥗'];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    
    for (let i = 0; i < 50; i++) {
        const pizza = document.createElement('div');
        pizza.textContent = pizzaEmojis[Math.floor(Math.random() * pizzaEmojis.length)];
        pizza.style.position = 'absolute';
        pizza.style.fontSize = '2rem';
        pizza.style.left = Math.random() * 100 + '%';
        pizza.style.top = '-50px';
        pizza.style.animation = `fall ${3 + Math.random() * 3}s linear`;
        container.appendChild(pizza);
        
        setTimeout(() => pizza.remove(), 6000);
    }
    
    setTimeout(() => container.remove(), 6000);
}

// Add fall animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(110vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);
