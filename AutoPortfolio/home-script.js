document.addEventListener('DOMContentLoaded', async () => {
    const PROJECT_ID = 'cr4s4h2h';
    const DATASET = 'production';

    const QUERY = encodeURIComponent(`*[_type == "homePage"][0]{
        postTitle,
        postDescription,
        mainHeadline, 
        mainBody, 
        "hero1": heroImage1.asset->url, 
        "hero2": heroImage2.asset->url, 
        "hero3": heroImage3.asset->url, 
        "featureImg": featureImage.asset->url, 
        "gallery": bottomGallery[].asset->url
    }`);

    async function loadHomePage() {
        const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            const content = data.result;

            if (!content) return;

            if (content.postTitle) document.getElementById('site-title').innerText = content.postTitle;
            if (content.postDescription) document.getElementById('site-subtitle').innerText = content.postDescription;

            // Fill text
            if (content.mainHeadline) document.getElementById('main-headline').innerText = content.mainHeadline;
            if (content.mainBody) document.getElementById('main-description').innerText = content.mainBody;
            
            // Fill images
            if (content.hero1) document.getElementById('hero-1').src = content.hero1;
            if (content.hero2) document.getElementById('hero-2').src = content.hero2;
            if (content.hero3) document.getElementById('hero-3').src = content.hero3;
            if (content.featureImg) document.getElementById('feature-image').src = content.featureImg;

            // Build gallery
            const galleryContainer = document.getElementById('bottom-gallery-container');
            if (galleryContainer && content.gallery) {
                galleryContainer.innerHTML = '';
                content.gallery.forEach(imgUrl => {
                    const gridItem = document.createElement('div');
                    gridItem.className = 'grid-item';
                    
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.className = 'gallery-img';
                    
                    
                    img.addEventListener('click', (e) => {
                        const lightbox = document.getElementById('lightbox');
                        const lightboxImg = document.getElementById('lightbox-img');
                        lightbox.classList.add('active');
                        lightboxImg.src = e.target.src;
                    });

                    gridItem.appendChild(img);
                    galleryContainer.appendChild(gridItem);
                });
            }
        } catch (err) {
            console.error("Could not fetch homepage data:", err);
        }
    }

    loadHomePage();
});