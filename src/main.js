// LUXE RADIANCE Premium Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
    console.log('LUXE RADIANCE: Curated Elegance initialized.');

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal animations to sections
    const revealElements = document.querySelectorAll('section > div, .group');
    revealElements.forEach(el => {
        el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-10');
        fadeInObserver.observe(el);
    });

    // Horizontal Scroll for Carousels (Mouse Wheel Support)
    const carousels = document.querySelectorAll('.hide-scrollbar');
    carousels.forEach(carousel => {
        carousel.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                carousel.scrollLeft += e.deltaY;
            }
        });
    });

    // Simple Cart/Favorite feedback
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('.material-symbols-outlined');
            if (icon) {
                const originalText = icon.innerText;
                if (originalText === 'favorite') {
                    icon.style.fontVariationSettings = "'FILL' 1";
                }
                
                // Add a subtle click ripple or scale effect
                btn.classList.add('scale-95');
                setTimeout(() => btn.classList.remove('scale-95'), 100);
            }
        });
    });
});
