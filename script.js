// Image Gallery Data
const images = [
    // Nature Images
    {
        id: 1,
        src: "https://picsum.photos/id/104/500/400",
        title: "Mountain Lake",
        category: "nature",
        description: "Beautiful mountain landscape with crystal clear lake"
    },
    {
        id: 2,
        src: "https://picsum.photos/id/15/500/400",
        title: "Forest Path",
        category: "nature",
        description: "Serene forest trail surrounded by greenery"
    },
    {
        id: 3,
        src: "https://picsum.photos/id/29/500/400",
        title: "Waterfall",
        category: "nature",
        description: "Majestic waterfall in tropical forest"
    },
    // City Images
    {
        id: 4,
        src: "https://picsum.photos/id/20/500/400",
        title: "City Skyline",
        category: "city",
        description: "Modern city architecture at dusk"
    },
    {
        id: 5,
        src: "https://picsum.photos/id/96/500/400",
        title: "Urban Night",
        category: "city",
        description: "Vibrant city lights at night"
    },
    {
        id: 6,
        src: "https://picsum.photos/id/1/500/400",
        title: "Downtown Street",
        category: "city",
        description: "Busy downtown street in daylight"
    },
    // People Images
    {
        id: 7,
        src: "https://picsum.photos/id/26/500/400",
        title: "Nature Explorer",
        category: "people",
        description: "Person enjoying nature walk"
    },
    {
        id: 8,
        src: "https://picsum.photos/id/64/500/400",
        title: "Street Photographer",
        category: "people",
        description: "Photographer capturing moments"
    },
    {
        id: 9,
        src: "https://picsum.photos/id/91/500/400",
        title: "Yoga Practice",
        category: "people",
        description: "Peaceful yoga in nature"
    },
    // Animals Images
    {
        id: 10,
        src: "https://picsum.photos/id/107/500/400",
        title: "Wild Elephant",
        category: "animals",
        description: "Majestic elephant in savanna"
    },
    {
        id: 11,
        src: "https://picsum.photos/id/0/500/400",
        title: "Cute Puppy",
        category: "animals",
        description: "Adorable puppy playing"
    },
    {
        id: 12,
        src: "https://picsum.photos/id/100/500/400",
        title: "Mountain Deer",
        category: "animals",
        description: "Deer in mountain forest"
    }
];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const imageTitle = document.getElementById('imageTitle');
const imageCounter = document.getElementById('imageCounter');
const categoryBtns = document.querySelectorAll('.category-btn');

// State Variables
let currentImageIndex = 0;
let currentCategory = 'all';
let filteredImages = [...images];

// Render Gallery
function renderGallery() {
    galleryGrid.innerHTML = '';
    
    if (filteredImages.length === 0) {
        galleryGrid.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i> No images found...</div>';
        return;
    }
    
    filteredImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-id', image.id);
        galleryItem.setAttribute('data-category', image.category);
        
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <div class="image-overlay">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
            </div>
            <div class="image-category">${getCategoryIcon(image.category)} ${image.category}</div>
        `;
        
        galleryItem.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(galleryItem);
    });
}

// Get Category Icon
function getCategoryIcon(category) {
    switch(category) {
        case 'nature': return '🌄';
        case 'city': return '🌆';
        case 'people': return '👥';
        case 'animals': return '🐾';
        default: return '📷';
    }
}

// Filter by Category
function filterByCategory(category) {
    currentCategory = category;
    
    if (category === 'all') {
        filteredImages = [...images];
    } else {
        filteredImages = images.filter(img => img.category === category);
    }
    
    renderGallery();
    
    // Update active button
    categoryBtns.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Open Lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Update Lightbox Image
function updateLightboxImage() {
    const image = filteredImages[currentImageIndex];
    if (image) {
        lightboxImg.src = image.src;
        lightboxImg.alt = image.title;
        imageTitle.textContent = `${getCategoryIcon(image.category)} ${image.title}`;
        imageCounter.textContent = `${currentImageIndex + 1} / ${filteredImages.length}`;
    }
}

// Close Lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Next Image
function nextImage() {
    if (currentImageIndex < filteredImages.length - 1) {
        currentImageIndex++;
        updateLightboxImage();
        addSwipeAnimation();
    } else {
        // Loop to first image
        currentImageIndex = 0;
        updateLightboxImage();
        addSwipeAnimation();
    }
}

// Previous Image
function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateLightboxImage();
        addSwipeAnimation();
    } else {
        // Loop to last image
        currentImageIndex = filteredImages.length - 1;
        updateLightboxImage();
        addSwipeAnimation();
    }
}

// Add animation when changing images
function addSwipeAnimation() {
    lightboxImg.style.animation = 'none';
    setTimeout(() => {
        lightboxImg.style.animation = 'zoomIn 0.3s ease';
    }, 10);
}

// Keyboard Navigation
function handleKeyboard(e) {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
        case 'Escape':
            closeLightbox();
            break;
    }
}

// Category Button Event Listeners
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        filterByCategory(category);
    });
});

// Lightbox Event Listeners
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard Events
document.addEventListener('keydown', handleKeyboard);

// Touch Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            prevImage(); // Swipe right -> previous
        } else {
            nextImage(); // Swipe left -> next
        }
    }
}

// Lazy Loading Images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
});

// Initialize Gallery
function init() {
    renderGallery();
    
    // Add loading animation to images
    const allImages = document.querySelectorAll('.gallery-item img');
    allImages.forEach(img => {
        img.style.opacity = '0';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
}

// Start the app
init();

// Console log
console.log('🎨 Image Gallery Loaded! Features: Categories, Lightbox, Keyboard support, Swipe gestures');
