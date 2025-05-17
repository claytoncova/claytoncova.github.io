document.addEventListener('DOMContentLoaded', () => {
    // Navegação responsiva
    const setupMobileNav = () => {
        const nav = document.querySelector('.nav-links');
        const hamburger = document.createElement('button');
        hamburger.className = 'mobile-nav-toggle';
        hamburger.setAttribute('aria-label', 'Menu');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        
        document.querySelector('.main-nav').appendChild(hamburger);
        
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
            hamburger.innerHTML = isExpanded ? 
                '<i class="fas fa-bars"></i>' : 
                '<i class="fas fa-times"></i>';
        });
    };

    // Animação suave para links de âncora
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // Lazy loading para imagens
    const setupLazyLoading = () => {
        if ('loading' in HTMLImageElement.prototype) {
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback para navegadores que não suportam lazy loading
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }
    };

    // Inicialização
    if (window.innerWidth <= 768) {
        setupMobileNav();
    }
    setupSmoothScroll();
    setupLazyLoading();

    // Atualizar navegação em redimensionamento
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            setupMobileNav();
        }
    });
}); 