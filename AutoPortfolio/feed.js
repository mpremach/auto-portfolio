document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('infinite-grid');
    const trigger = document.getElementById('scroll-trigger');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');

    // Sanity Database Configuration
    const PROJECT_ID = '';
    const DATASET = 'production';
    
    // Ask sanity for all the car photos, and return the title and image URL
    const QUERY = encodeURIComponent('*[_type == "carPhoto"]{title, "imageUrl": image.asset->url}');
    const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

    let sanityImages = [];
    let currentIndex = 0;

    // Fetch the photos from Sanity
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Extract just the image URLs from the database results
        sanityImages = data.result.map(car => car.imageUrl).filter(url => url != null);
        
        if (sanityImages.length === 0) {
            console.log("No images found in Sanity yet.");
            return; // Stops the script if the database is empty
        }

        // Start the initial load now that we have the live images
        loadImages(8);
    } catch (error) {
        console.error("Error fetching from Sanity:", error);
    }

    // Grid Builder 
    function loadImages(count = 4) {
        if (sanityImages.length === 0) return;

        for (let i = 0; i < count; i++) {
            // Loops back to the start of the array to simulate an endless feed
            const src = sanityImages[currentIndex % sanityImages.length];
            
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'Automotive Photography';
            img.className = 'gallery-img';
            
            // Lightbox click event
            img.addEventListener('click', () => {
                lightbox.classList.add('active');
                lightboxImg.src = img.src;
            });

            gridItem.appendChild(img);
            grid.appendChild(gridItem);
            
            currentIndex++;
        }
    }

    // Scroll Detector
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && sanityImages.length > 0) {
            setTimeout(() => {
                loadImages(4);
            }, 400);
        }
    }, { rootMargin: '150px' });

    observer.observe(trigger);

    // Lightbox Closing Logic
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) closeLightbox();
    });
});
