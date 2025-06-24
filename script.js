// Variáveis globais
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initializeNavigation();
    initializeScrollEffects();
    initializeSkillBars();
    initializeScrollReveal();
    initializeTypingEffect();
    initializeParallax();
});

// Navegação Mobile
function initializeNavigation() {
    // Toggle do menu mobile
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevenir scroll quando menu está aberto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efeitos no Scroll
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        // Header background no scroll
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        // Destacar link ativo na navegação
        highlightActiveSection();
    });
}

// Destacar seção ativa na navegação
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${id}"]`);

        if (scrollPos >= top && scrollPos <= bottom) {
            // Remover classe ativa de todos os links
            navLinks.forEach(link => link.classList.remove('active'));
            // Adicionar classe ativa ao link atual
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Animação das barras de habilidades
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.skills');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }
}

// Scroll Reveal Animation
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.timeline-item, .skill-category, .education-item, .certifications, .contact-item');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Efeito de digitação no título
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid white';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remover cursor após completar
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    };

    // Iniciar depois de um pequeno delay
    setTimeout(typeWriter, 500);
}

// Efeito Parallax suave
function initializeParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Contador animado para estatísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Observer para animar contadores quando visíveis
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterObserver.observe(aboutSection);
}

// Função para copiar email
function copyEmail() {
    const email = 'arthur.sidor@gmail.com';
    navigator.clipboard.writeText(email).then(function() {
        // Mostrar feedback visual
        showNotification('Email copiado para a área de transferência!');
    }).catch(function(err) {
        console.error('Erro ao copiar email: ', err);
    });
}

// Função para mostrar notificações
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Adicionar evento de clique no email
document.addEventListener('DOMContentLoaded', function() {
    const emailElement = document.querySelector('.contact-item p');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.addEventListener('click', copyEmail);
        emailElement.title = 'Clique para copiar o email';
    }
});

// Lazy loading para imagens (se houver)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Função para voltar ao topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Botão voltar ao topo
function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;

    backToTopBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(backToTopBtn);

    // Mostrar/esconder botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    // Hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    });
}

// Inicializar botão voltar ao topo
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Preloader
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="loader"></div>
            <p>Carregando...</p>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        color: white;
        font-family: 'Segoe UI', sans-serif;
    `;

    const style = document.createElement('style');
    style.textContent = `
        .loader {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .preloader-content {
            text-align: center;
        }
        .preloader-content p {
            font-size: 1.2rem;
            margin: 0;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(preloader);

    // Remover preloader após carregamento
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }, 1000);
    });
}

// Inicializar preloader
createPreloader();

// Adicionar classe CSS para links ativos
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: #667eea !important;
    }
    .nav-menu a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce aos eventos de scroll
const debouncedScrollHandler = debounce(function() {
    highlightActiveSection();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Função para buscar projetos do GitHub
async function fetchGitHubProjects() {
    const projectsContainer = document.getElementById('github-projects');
    
    try {
        const response = await fetch('https://api.github.com/users/Arthur-Sidor/repos?sort=updated&direction=desc');
        const repos = await response.json();
        
        // Filtra repositórios que não são forks e não estão arquivados
        const filteredRepos = repos.filter(repo => 
            !repo.fork && !repo.archived && repo.name !== 'Arthur-Sidor'
        );
        
        // Limpa o loader
        projectsContainer.innerHTML = '';
        
        // Adiciona cada repositório como um projeto
        filteredRepos.forEach(repo => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            // Determina a linguagem ou usa padrão
            const language = repo.language || 'Code';
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <i class="fas fa-code"></i>
                </div>
                <div class="project-content">
                    <h3>${repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}</h3>
                    <p>${repo.description || 'Projeto sem descrição disponível.'}</p>
                    <div class="project-techs">
                        <span>${language}</span>
                        ${repo.topics && repo.topics.length > 0 ? 
                    repo.topics.slice(0, 3).map(topic => `<span>${topic}</span>`).join('') : 
                    ''}
                    </div>
                    <div class="project-links">
                        ${repo.homepage ? 
                    `<a href="${repo.homepage}" target="_blank" class="btn btn-primary">Ver Demo</a>` : 
                    ''}
                        <a href="${repo.html_url}" target="_blank" class="btn btn-secondary">Ver Código</a>
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(projectCard);
        });
        
        // Se não houver repositórios
        if (filteredRepos.length === 0) {
            projectsContainer.innerHTML = `
                <div class="no-projects">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Nenhum projeto encontrado no GitHub.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        projectsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Erro ao carregar projetos do GitHub. Por favor, tente novamente mais tarde.</p>
                <a href="https://github.com/Arthur-Sidor" target="_blank" class="btn btn-primary">
                    Ver GitHub
                </a>
            </div>
        `;
    }
}

// Chama a função quando a página carrega
document.addEventListener('DOMContentLoaded', fetchGitHubProjects);
