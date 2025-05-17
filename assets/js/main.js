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

    //Animação do Mario
    var player = document.getElementById('mario')
    var powerup = {
    audio: new Audio('http://themushroomkingdom.net/sounds/wav/smb/smb_powerup.wav'),
    play: function() { 
        this.audio.currentTime = 0;
        this.audio.play() 
    }
    }

    // Local do Mario
    function updateElement(element, incx, incy) {
    var x = Number(element.getAttribute('data-x')) + incx
    var y = Number(element.getAttribute('data-y')) + incy
    
    // Ejemplo básico de límite de regiões
    if ((x < 50) || (x > 1900)) 
        return
    
    element.style.transform = 'translate('+ x +'px, '+ y +'px)'
    
    if (element.classList.contains('mirror'))
        element.style.transform += ' scaleX(-1)'
        
    if (element.classList.contains('big'))
        element.style.transform += ' scale(2)'
    
    // Update HTML
    element.setAttribute('data-x', x)
    element.setAttribute('data-y', y)
    }

    // Aperta a tecla
    window.addEventListener('keydown', function(e) {
    console.log(e)
    
    var speed = 10;
    //var speed = (e.ctrlKey ? 20 : 10)
    
    // Direita
    if (e.keyCode == 39) {
        player.classList.add('caminar')
        player.classList.remove('mirror')
        updateElement(player, +speed, 0)
    }
    // Esquerda
    else if (e.keyCode == 37) {
        player.classList.add('caminar')
        player.classList.add('mirror')
        updateElement(player, -speed, 0)
    }
    
    if (e.keyCode == 85) {
        player.classList.toggle('big')
        //new Audio('http://themushroomkingdom.net/sounds/wav/smb/smb_powerup.wav').play()
        powerup.play(); // fix network lag sound    
        updateElement(player, 0, 0)
    }
    
    })

    // solta tecla
    window.addEventListener('keyup', function(e) {
    // retorna ao primeira imagem
    player.classList.remove('caminar')
    })

    // Inicialização
    updateElement(player, 0, 0)
}); 