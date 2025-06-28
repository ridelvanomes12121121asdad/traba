// Variáveis globais
let currentSlide = 1;
const totalSlides = 7;

// Elementos DOM
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeSlides();
    setupKeyboardNavigation();
    setupTouchNavigation();
    addAnimations();
    addGlowEffects();
    setupParticleEffects();
});

// Função para inicializar os slides
function initializeSlides() {
    showSlide(1);
    updateIndicators();
}

// Função para mostrar um slide específico
function showSlide(slideNumber) {
    // Esconder todos os slides
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });

    // Mostrar o slide atual
    const currentSlideElement = document.getElementById(`slide${slideNumber}`);
    if (currentSlideElement) {
        currentSlideElement.classList.add('active');
    }

    // Adicionar classe 'prev' ao slide anterior se existir
    if (slideNumber > 1) {
        const prevSlideElement = document.getElementById(`slide${slideNumber - 1}`);
        if (prevSlideElement) {
            prevSlideElement.classList.add('prev');
        }
    }

    currentSlide = slideNumber;
    updateIndicators();
    addSlideAnimations();
    addGlowEffects();
}

// Função para ir para o próximo slide
function nextSlide() {
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    }
}

// Função para ir para o slide anterior
function prevSlide() {
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    }
}

// Função para ir para um slide específico
function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        showSlide(slideNumber);
    }
}

// Função para atualizar os indicadores
function updateIndicators() {
    indicators.forEach((indicator, index) => {
        if (index + 1 === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Configurar navegação por teclado
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowRight':
            case ' ':
                event.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                prevSlide();
                break;
            case 'Home':
                event.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                event.preventDefault();
                goToSlide(totalSlides);
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
                event.preventDefault();
                goToSlide(parseInt(event.key));
                break;
        }
    });
}

// Configurar navegação por toque (para dispositivos móveis)
function setupTouchNavigation() {
    let startX = 0;
    let endX = 0;

    document.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
    });

    document.addEventListener('touchend', function(event) {
        endX = event.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe para a esquerda - próximo slide
                nextSlide();
            } else {
                // Swipe para a direita - slide anterior
                prevSlide();
            }
        }
    }
}

// Adicionar efeitos de glow
function addGlowEffects() {
    // Adicionar glow aos títulos
    const titles = document.querySelectorAll('.title, .slide-header h2');
    titles.forEach(title => {
        title.style.animation = 'glow 2s ease-in-out infinite alternate';
    });

    // Adicionar glow aos ícones
    const icons = document.querySelectorAll('.member-avatar i, .component-icon i, .solution i');
    icons.forEach(icon => {
        icon.style.animation = 'glow 1.5s ease-in-out infinite alternate';
    });

    // Adicionar glow aos botões
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'glow 0.5s ease-in-out infinite alternate';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

// Configurar efeitos de partículas
function setupParticleEffects() {
    // Criar partículas flutuantes no fundo
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(147, 51, 234, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
        `;
        container.appendChild(particle);
    }
}

// Adicionar animações aos elementos
function addAnimations() {
    // Animar elementos quando aparecem na tela
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observar todos os cards de conteúdo
    document.querySelectorAll('.content-card').forEach(card => {
        observer.observe(card);
    });
}

// Adicionar animações específicas do slide
function addSlideAnimations() {
    const currentSlideElement = document.getElementById(`slide${currentSlide}`);
    if (!currentSlideElement) return;

    // Animar elementos do slide atual
    const animatedElements = currentSlideElement.querySelectorAll('.content-card, .member, .acid-rule, .component, .challenge, .solution, .future-item');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.style.animation = 'fadeInUp 0.8s ease-out forwards';
    });

    // Animar elementos específicos baseados no slide
    switch(currentSlide) {
        case 1:
            animateTeamMembers();
            break;
        case 2:
            animateTransactionExamples();
            break;
        case 3:
            animateAcidRules();
            break;
        case 4:
            animateComponents();
            break;
        case 5:
            animateNubankInfo();
            break;
        case 6:
            animateChallenges();
            break;
        case 7:
            animateConclusion();
            break;
    }
}

// Animações específicas para cada slide
function animateTeamMembers() {
    const members = document.querySelectorAll('.member');
    members.forEach((member, index) => {
        member.style.animationDelay = `${index * 0.2}s`;
        member.style.animation = 'fadeInUp 0.8s ease-out forwards';
        
        // Adicionar efeito de rotação nos avatares
        const avatar = member.querySelector('.member-avatar');
        if (avatar) {
            avatar.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards, rotate 10s linear infinite`;
        }
    });
}

function animateTransactionExamples() {
    const examples = document.querySelectorAll('.example-item');
    examples.forEach((example, index) => {
        example.style.animationDelay = `${index * 0.1}s`;
        example.style.animation = 'slideInRight 0.6s ease-out forwards';
        
        // Adicionar efeito de pulse nos ícones
        const icon = example.querySelector('i');
        if (icon) {
            icon.style.animation = `slideInRight 0.6s ease-out ${index * 0.1}s forwards, pulse 2s ease-in-out infinite`;
        }
    });
}

function animateAcidRules() {
    const rules = document.querySelectorAll('.acid-rule');
    rules.forEach((rule, index) => {
        rule.style.animationDelay = `${index * 0.15}s`;
        rule.style.animation = 'fadeInUp 0.8s ease-out forwards';
        
        // Adicionar efeito de glow nos ícones
        const icon = rule.querySelector('.acid-icon');
        if (icon) {
            icon.style.animation = `fadeInUp 0.8s ease-out ${index * 0.15}s forwards, glow 2s ease-in-out infinite alternate`;
        }
    });
}

function animateComponents() {
    const components = document.querySelectorAll('.component');
    components.forEach((component, index) => {
        component.style.animationDelay = `${index * 0.1}s`;
        component.style.animation = 'slideInRight 0.6s ease-out forwards';
        
        // Adicionar efeito de rotação nos ícones
        const icon = component.querySelector('.component-icon');
        if (icon) {
            icon.style.animation = `slideInRight 0.6s ease-out ${index * 0.1}s forwards, rotate 8s linear infinite`;
        }
    });
}

function animateNubankInfo() {
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'fadeInUp 0.8s ease-out forwards';
        
        // Adicionar efeito de pulse nos ícones
        const icon = item.querySelector('i');
        if (icon) {
            icon.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s forwards, pulse 1.5s ease-in-out infinite`;
        }
    });
}

function animateChallenges() {
    const challenges = document.querySelectorAll('.challenge');
    challenges.forEach((challenge, index) => {
        challenge.style.animationDelay = `${index * 0.1}s`;
        challenge.style.animation = 'fadeInUp 0.8s ease-out forwards';
        
        // Adicionar efeito de glow nos ícones
        const icon = challenge.querySelector('.challenge-icon');
        if (icon) {
            icon.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s forwards, glow 2s ease-in-out infinite alternate`;
        }
    });
}

function animateConclusion() {
    const conclusionCards = document.querySelectorAll('.conclusion-card');
    conclusionCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animation = 'fadeInUp 0.8s ease-out forwards';
        
        // Adicionar efeito de glow nos ícones
        const icon = card.querySelector('.conclusion-icon');
        if (icon) {
            icon.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards, glow 2s ease-in-out infinite alternate`;
        }
    });
}

// Função para adicionar efeito de hover nos botões
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.nav-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 10px 30px rgba(147, 51, 234, 0.4), 0 0 40px rgba(147, 51, 234, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.3)';
        });
    });
});

// Função para adicionar efeito de clique nos indicadores
document.addEventListener('DOMContentLoaded', function() {
    const indicators = document.querySelectorAll('.indicator');
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            goToSlide(index + 1);
        });
        
        indicator.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.5)';
        });
        
        indicator.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            }
        });
    });
});

// Função para adicionar efeitos de hover nos cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.content-card, .conclusion-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(147, 51, 234, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Função para adicionar efeitos de hover nos membros da equipe
document.addEventListener('DOMContentLoaded', function() {
    const members = document.querySelectorAll('.member');
    
    members.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.1)';
            const avatar = this.querySelector('.member-avatar');
            if (avatar) {
                avatar.style.boxShadow = '0 0 40px rgba(147, 51, 234, 0.8)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const avatar = this.querySelector('.member-avatar');
            if (avatar) {
                avatar.style.boxShadow = '0 0 30px rgba(147, 51, 234, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)';
            }
        });
    });
});

// Função para adicionar efeitos de hover nas regras ACID
document.addEventListener('DOMContentLoaded', function() {
    const acidRules = document.querySelectorAll('.acid-rule');
    
    acidRules.forEach(rule => {
        rule.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.boxShadow = '0 0 40px rgba(147, 51, 234, 0.4)';
        });
        
        rule.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 0 30px rgba(147, 51, 234, 0.3)';
        });
    });
});

// Função para adicionar efeitos de hover nos componentes
document.addEventListener('DOMContentLoaded', function() {
    const components = document.querySelectorAll('.component');
    
    components.forEach(component => {
        component.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.boxShadow = '0 0 30px rgba(147, 51, 234, 0.4)';
        });
        
        component.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.3)';
        });
    });
});

// Função para adicionar efeitos de hover nos desafios e soluções
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.challenge, .solution, .future-item');
    
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateX(5px)';
            this.style.boxShadow = '0 0 30px rgba(147, 51, 234, 0.4)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateX(0)';
            this.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.3)';
        });
    });
});

// Função para adicionar efeitos de hover nas tags de tecnologia
document.addEventListener('DOMContentLoaded', function() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(147, 51, 234, 0.4)';
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.4)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(147, 51, 234, 0.2)';
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 15px rgba(147, 51, 234, 0.3)';
        });
    });
});

// Função para adicionar efeitos de hover nas áreas de estudo
document.addEventListener('DOMContentLoaded', function() {
    const studyAreas = document.querySelectorAll('.study-area');
    
    studyAreas.forEach(area => {
        area.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(147, 51, 234, 0.4)';
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.4)';
        });
        
        area.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(147, 51, 234, 0.2)';
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 15px rgba(147, 51, 234, 0.3)';
        });
    });
});

// Função para adicionar efeito de loading inicial
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Função para adicionar efeito de transição suave entre slides
function smoothTransition() {
    const currentSlideElement = document.getElementById(`slide${currentSlide}`);
    if (currentSlideElement) {
        currentSlideElement.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

// Chamar a função de transição suave
document.addEventListener('DOMContentLoaded', smoothTransition);

// Adicionar animação de rotação
const style = document.createElement('style');
style.textContent = `
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-10px) translateX(-10px); }
        75% { transform: translateY(-30px) translateX(5px); }
    }
`;
document.head.appendChild(style); 