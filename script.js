let currentSlideIndex = 0;

const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.dot'); 


let currentActivistSlide = 0;
let currentGallerySlide = 0;

document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeNavigation();
    

    initializeCounters();
    initializeMobileMenu();
    initializeSmoothScroll();
    initializeTouchSupport();
});

function initializeNavigation() {
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            changeSlide(-1); // -1 para ir para trás
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            changeSlide(1); // 1 para ir para frente
        });
    }

    // Navegação pelos "Dots"
    indicators.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // A função original currentSlide espera um índice baseado em 1 (1, 2, 3...)
            // O 'index' do forEach é baseado em 0 (0, 1, 2...)
            currentSlide(index + 1);
        });
    });
}

// Pega o botão pelo ID
const btnTopo = document.getElementById("btnVoltarAoTopo");

// Quando o usuário rolar a página, esta função será executada
window.onscroll = function() {
    // Se a rolagem for maior que 100 pixels, exibe o botão
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btnTopo.style.display = "block";
    } else {
        btnTopo.style.display = "none";
    }
};

// Quando o usuário clicar no botão, volta para o topo
btnTopo.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Faz a rolagem ser suave
    });
});


// Função para inicializar o carrossel
function initializeCarousel() {
    // CORREÇÃO: Garantir que o primeiro slide e dot estejam ativos ao carregar
    if (slides.length > 0) {
        slides[currentSlideIndex].classList.add('active');
    }
    if (indicators.length > 0) {
        indicators[currentSlideIndex].classList.add('active');
    }

    // Auto-play do carrossel
    setInterval(() => {
        changeSlide(1);
    }, 5000); // Muda slide a cada 5 segundos
}

// Função para mudar slide (Lógica principal)
function changeSlide(direction) {
    // Agora que o HTML está correto, 'indicators.length' será > 0
    if (slides.length === 0 || indicators.length === 0) {
        console.error("Carrossel não encontrado ou sem slides/indicadores.");
        return;
    }

    // Remove classe active do slide e indicador ATUAIS
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Calcula novo índice
    currentSlideIndex += direction;
    
    // Verifica limites (Loop)
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0; // Volta ao primeiro
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1; // Vai para o último
    }
    
    // Adiciona classe active ao NOVO slide e indicador
    // O SCRIPT NÃO VAI MAIS QUEBRAR AQUI
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

// Função para ir para slide específico (usada pelos dots)
function changeActivistSlide(n) {
    const track = document.getElementById('activistsTrack');
    if (!track) return;
    
    const cards = track.querySelectorAll('.activist-card');
    if (cards.length === 0) return;
    
    // Calcula a largura de um card + o gap (1.5rem, que é ~24px)
    const cardWidth = cards[0].offsetWidth + 24; 
    
    // ---- A MÁGICA ESTÁ AQUI ----
    // Em vez de usar 'transform', nós vamos mudar o 'scrollLeft' (a posição da "janelinha")
    // O 'n' é 1 (avançar) ou -1 (voltar)
    track.scrollLeft += cardWidth * n;
}

/* CARROSSEL DE GALERIA */
/* CARROSSEL DE ATIVISTAS */
function changeActivistSlide(n) {
    const track = document.getElementById('activistsTrack');
    if (!track) return;
    
    const cards = track.querySelectorAll('.activist-card');
    if (cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth + 24; // largura + gap
    
    // Pega o número de slides visíveis para não passar do limite
    const itemsVisible = Math.floor(track.clientWidth / cardWidth);
    const maxSlides = Math.max(0, cards.length - itemsVisible);

    // Atualiza o índice
    currentActivistSlide += n;
    
    // Lógica de limite para não sair da tela
    if (currentActivistSlide < 0) {
        currentActivistSlide = 0;
    } else if (currentActivistSlide > maxSlides) {
        currentActivistSlide = maxSlides;
    }
    
    // ---- TRANSIÇÃO NO JS ----
    // 1. Adiciona a transição ANTES de mover
    track.style.transition = 'transform 0.4s ease';
    
    // 2. Agora move (e a transição será aplicada)
    track.style.transform = `translateX(-${currentActivistSlide * cardWidth}px)`;
}

function changeActivistSlide(n) {
    const track = document.getElementById('activistsTrack');
    if (!track) return;
    
    const cards = track.querySelectorAll('.activist-card');
    if (cards.length === 0) return;
    
    // Calcula a largura de um card + o gap (1.5rem, que é ~24px)
    const cardWidth = cards[0].offsetWidth + 24; 
    
    // ---- A MÁGICA ESTÁ AQUI ----
    // Em vez de usar 'transform', nós vamos mudar o 'scrollLeft' (a posição da "janelinha")
    // O 'n' é 1 (avançar) ou -1 (voltar)
    track.scrollLeft += cardWidth * n;
}

/* CARROSSEL DE GALERIA */
function changeGallerySlide(n) {
    const track = document.getElementById('galleryTrack');
    if (!track) return;

    const items = track.querySelectorAll('.gallery-item');
    if (items.length === 0) return;
    
    // Calcula a largura de um item + o gap (1.5rem, que é ~24px)
    const itemWidth = items[0].offsetWidth + 24; 
    
    // ---- A MÁGICA ESTÁ AQUI ----
    // Exatamente a mesma lógica do carrossel de ativistas
    track.scrollLeft += itemWidth * n;
}
/* MENU MOBILE */
// Esta função agora encontrará 'menuToggle' e 'navMenu'
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('#navMenu .nav-link, #navMenu .dropdown-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                // Só fecha se o menu estiver ativo (modo mobile)
                if (window.innerWidth <= 768) {
                     // Se for um dropdown toggle, não fecha, deixa ele abrir o submenu
                    if(this.classList.contains('dropdown-toggle')) {
                        return;
                    }
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Dropdown mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    // Previne o link de navegar para '#'
                    e.preventDefault(); 
                    // Alterna o submenu
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
}

/* CONTADOR DE ESTATÍSTICAS COM SCROLL */
function initializeCounters() {
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target')) || 0;
                    animateCounter(stat, target);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Animar em 50 passos
    const duration = 2000; // 2 segundos
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, stepTime);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/* MUDANÇA DE IDIOMA */
function changeLanguage(lang) {
    console.log('Idioma alterado para: ' + lang);
    // Implementar lógica de mudança de idioma aqui
}

/* RESPONSIVIDADE DE CARROSSÉIS */
window.addEventListener('resize', function() {
    // Resetar posição dos carrosséis em caso de redimensionamento
    const activistsTrack = document.getElementById('activistsTrack');
    const galleryTrack = document.getElementById('galleryTrack');
    
    if (activistsTrack) {
        activistsTrack.style.transform = 'translateX(0)';
        currentActivistSlide = 0;
    }
    
    if (galleryTrack) {
        galleryTrack.style.transform = 'translateX(0)';
        currentGallerySlide = 0;
    }
});

/* SMOOTH SCROLL PARA LINKS INTERNOS */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Evita que links de controle (como o dropdown) causem scroll
            if (href === '#' || href === '#idioma' || href === '#recursos') {
                return;
            }
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Inicializa a funcionalidade de "Ver Mais" para as notícias.
 * Configurado para mostrar 4 em 4 notícias.
 */
function initializeLoadMore() {
    // Seleciona o botão e verifica se ele existe
    const btnVerMaisPrincipal = document.getElementById('btn-ver-mais-principal');
    if (!btnVerMaisPrincipal) return; 

    // Seleciona TODAS as notícias
    // Usamos .news-card que é a classe dos seus cartões
    const todasNoticias = document.querySelectorAll('.news-grid .news-card');

    // CONFIGURAÇÕES PARA MOSTRAR DE 4 EM 4
    const INDICE_INICIAL = 4; // Começa a ocultar a partir da 5ª notícia (índice 4)
    const QUANTIDADE_POR_CARGA = 4; // Quantas notícias mostrar a cada clique
    
    let indiceNoticiaAtual = INDICE_INICIAL; 

    /**
     * Garante que todas as notícias após as primeiras 4 estejam ocultas, 
     * no caso de você ter esquecido a classe 'hidden' no HTML.
     */
    function inicializarOculto() {
        for (let i = INDICE_INICIAL; i < todasNoticias.length; i++) {
            // Adiciona a classe 'hidden' (que é display: none)
            todasNoticias[i].classList.add('hidden'); 
        }
    }

    /**
     * Mostra o próximo grupo de notícias.
     */
    function carregarMaisNoticias() {
        const fim = indiceNoticiaAtual + QUANTIDADE_POR_CARGA;

        // Itera sobre o próximo grupo (de 4 em 4) de notícias
        for (let i = indiceNoticiaAtual; i < fim && i < todasNoticias.length; i++) {
            const noticia = todasNoticias[i];
            // Remove a classe 'hidden' para MOSTRAR o cartão
            noticia.classList.remove('hidden');
        }

        // Atualiza o índice para a próxima rodada
        indiceNoticiaAtual = fim;

        // Verifica se todas foram carregadas e desabilita o botão
        if (indiceNoticiaAtual >= todasNoticias.length) {
            btnVerMaisPrincipal.textContent = 'Todas as notícias foram carregadas';
            btnVerMaisPrincipal.disabled = true;
        }
    }

    // 1. Inicializa o estado (esconde o que deve ser escondido)
    inicializarOculto();

    // 2. Se houver poucas notícias no total, desabilita o botão na inicialização
    if (todasNoticias.length <= INDICE_INICIAL) {
        btnVerMaisPrincipal.textContent = 'Todas as notícias foram carregadas';
        btnVerMaisPrincipal.disabled = true;
    }

    // 3. Adiciona o evento de clique ao botão
    btnVerMaisPrincipal.addEventListener('click', carregarMaisNoticias);
}

document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeNavigation();
    
    initializeLoadMore(); // <-- Adicione AQUI
    
    initializeCounters();
    initializeMobileMenu();
    initializeSmoothScroll();
    initializeTouchSupport();
});

/* SUPORTE A TOQUE PARA CARROSSÉIS MOBILE */
function initializeTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;

    const activistsTrack = document.getElementById('activistsTrack');
    const galleryTrack = document.getElementById('galleryTrack');

    if (activistsTrack) {
        activistsTrack.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true }); 
        
        activistsTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe('activists', touchStartX, touchEndX);
        }, { passive: true });
    }

    if (galleryTrack) {
        galleryTrack.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        galleryTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe('gallery', touchStartX, touchEndX);
        }, { passive: true });
    }
}

function handleSwipe(type, startX, endX) {
    const swipeThreshold = 50; // Mínimo de pixels para considerar um swipe
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe para esquerda (Avançar)
            if (type === 'activists') {
                changeActivistSlide(1);
            } else if (type === 'gallery') {
                changeGallerySlide(1);
            }
        } else {
            // Swipe para direita (Voltar)
            if (type === 'activists') {
                changeActivistSlide(-1);
            } else if (type === 'gallery') {
                changeGallerySlide(-1);
            }
        }
    }
}