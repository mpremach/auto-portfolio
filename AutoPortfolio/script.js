document.addEventListener('DOMContentLoaded', () => {
    // Grab all images and lightbox elements
    const images = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');

    // 1. Open the lightbox when any image is clicked
    images.forEach(img => {
        img.addEventListener('click', (e) => {
            lightbox.classList.add('active');
            lightboxImg.src = e.target.src; // Copies the clicked image source to the lightbox
        });
    });

    // 2. Function to close the lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        // Wait for the fade out animation to finish before clearing the image
        setTimeout(() => { 
            lightboxImg.src = ''; 
        }, 300); 
    };

    // 3. Trigger close on "X" click
    closeBtn.addEventListener('click', closeLightbox);
    
    // 4. Trigger close if clicking the black background (outside the image)
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });

    // 5. Trigger close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});