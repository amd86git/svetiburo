// Projects Gallery with Lightbox - Support for multiple images per project
class ProjectsGallery {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightboxImg');
        this.projectItems = document.querySelectorAll('.project-item');
        this.currentIndex = 0;
        this.currentImages = []; // Images for current project
        this.init();
    }

    init() {
        // Add click event to each project item
        this.projectItems.forEach((item) => {
            item.addEventListener('click', () => {
                const galleryData = item.querySelector('.project-gallery-data');
                if (galleryData) {
                    const images = galleryData.querySelectorAll('img');
                    this.currentImages = Array.from(images).map(img => img.src);
                    this.openLightbox(0); // Start from first image
                }
            });
        });

        // Lightbox controls
        if (this.lightbox) {
            const closeBtn = document.querySelector('.lightbox-close');
            const prevBtn = document.querySelector('.lightbox-prev');
            const nextBtn = document.querySelector('.lightbox-next');

            if (closeBtn) closeBtn.addEventListener('click', () => this.closeLightbox());
            if (prevBtn) prevBtn.addEventListener('click', () => this.navigate(-1));
            if (nextBtn) nextBtn.addEventListener('click', () => this.navigate(1));

            // Close on background click
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) this.closeLightbox();
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!this.lightbox.classList.contains('active')) return;

                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.navigate(-1);
                if (e.key === 'ArrowRight') this.navigate(1);
            });
        }
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.updateImage();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    navigate(direction) {
        if (this.currentImages.length === 0) return;

        this.currentIndex += direction;

        // Circular navigation
        if (this.currentIndex < 0) {
            this.currentIndex = this.currentImages.length - 1;
        } else if (this.currentIndex >= this.currentImages.length) {
            this.currentIndex = 0;
        }

        this.updateImage();
    }

    updateImage() {
        if (this.currentImages[this.currentIndex]) {
            this.lightboxImg.src = this.currentImages[this.currentIndex];
        }
    }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.gallery-container')) {
        new ProjectsGallery();
    }
});