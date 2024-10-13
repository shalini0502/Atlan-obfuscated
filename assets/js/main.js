// Function to show and hide the menu
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);
    
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
        });
    }
};

// Show the menu
showMenu('nav-toggle', 'nav-menu');

// Close menu when a link is clicked
const navLink = document.querySelectorAll('.nav__link');
function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}

// Add click event to each navigation link
navLink.forEach(n => n.addEventListener('click', linkAction));

// Highlight the active link based on scroll position
const sections = document.querySelectorAll('section[id]');
function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 50,
            sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

// Add scroll event for active link highlighting
window.addEventListener('scroll', scrollActive);

// Change header style on scroll
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 80) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
}

// Add scroll event for header style
window.addEventListener('scroll', scrollHeader);

// Show scroll-up button based on scroll position
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}

// Add scroll event for scroll-up button visibility
window.addEventListener('scroll', scrollUp);

// Order functionality code
// Show the order modal
const orderNowBtn = document.querySelector('.btn.btn__header');
const orderModal = document.getElementById('order-modal');
const closeModal = document.querySelector('.close-modal');

orderNowBtn.addEventListener('click', () => {
    orderModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    orderModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === orderModal) {
        orderModal.style.display = 'none';
    }
});

// Calculate fare based on transport option
document.getElementById('order-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page refresh

    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const transport = document.getElementById('transport').value;

    // Example fare calculation logic
    let fare = 0;
    if (transport === 'car') {
        fare = 100; // Example base fare
    } else if (transport === 'bus') {
        fare = 50;
    } else if (transport === 'ship') {
        fare = 200;
    }
    
    document.getElementById('fare-result').innerText = `Total Fare: $${fare} from ${source} to ${destination}`;

    // Close the modal after calculation
    orderModal.style.display = 'none';

    // Initialize map tracking (Assuming using Google Maps API)
    initMap(source, destination);
});

// Initialize Google Map
function initMap(source, destination) {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: -34.397, lng: 150.644 }, // Default center
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const request = {
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING, // Change as needed
    };

    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        } else {
            alert('Directions request failed due to ' + status);
        }
    });
}
// Load Google Maps script
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
document.head.appendChild(script);


orderNowBtn.addEventListener('click', function() {
    alert('Order placed successfully!'); 
});
