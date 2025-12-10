// Configurações e inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Site Odontológico carregado!');
    
    // Inicializar componentes
    initNavbar();
    initSmoothScroll();
    initContactForms();
    initDateValidation();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Smooth scroll para links internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile após clique
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// Formulários de contato
function initContactForms() {
    // Formulário de contato geral
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Formulário de agendamento
    const agendamentoForm = document.getElementById('agendamento-form');
    if (agendamentoForm) {
        agendamentoForm.addEventListener('submit', handleAgendamentoSubmit);
    }
}

// Validação de data
function initDateValidation() {
    const dataInput = document.getElementById('agendamento-data');
    if (dataInput) {
        const hoje = new Date().toISOString().split('T')[0];
        dataInput.min = hoje;
    }
}

// Manipular envio do formulário de contato
function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    
    // Validar formulário
    if (!validateForm(form)) {
        return;
    }
    
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('phone').value;
    const servico = document.getElementById('service').value;
    const mensagem = document.getElementById('message').value;
    
    // Formatar a mensagem para o WhatsApp
    const texto = `Olá! Gostaria de entrar em contato. Seguem meus dados:\n\n*Nome:* ${nome}\n*Email:* ${email}\n*Telefone:* ${telefone}\n*Serviço de Interesse:* ${servico}\n*Mensagem:* ${mensagem}`;
    
    // Codificar a mensagem para URL
    const textoCodificado = encodeURIComponent(texto);
    
    // Número do WhatsApp (substitua pelo número do consultório)
    const numeroWhatsApp = '5581987023658';
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`, '_blank');
    
    // Mostrar alerta de sucesso
    showAlert('Mensagem preparada para envio pelo WhatsApp!', 'success');
    
    // Limpar formulário
    form.reset();
}

// Manipular envio do formulário de agendamento
function handleAgendamentoSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    
    // Validar formulário
    if (!validateForm(form)) {
        return;
    }
    
    const nome = document.getElementById('agendamento-nome').value;
    const telefone = document.getElementById('agendamento-telefone').value;
    const data = document.getElementById('agendamento-data').value;
    const horario = document.getElementById('agendamento-horario').value;
    
    // Formatar a mensagem para o WhatsApp
    const texto = `Olá! Gostaria de agendar uma consulta. Seguem meus dados:\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Data Preferencial:* ${data}\n*Horário Preferencial:* ${horario}`;
    
    // Codificar a mensagem para URL
    const textoCodificado = encodeURIComponent(texto);
    
    // Número do WhatsApp (substitua pelo número do consultório)
    const numeroWhatsApp = '5511999999999';
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`, '_blank');
    
    // Mostrar alerta de sucesso
    showAlert('Solicitação de agendamento preparada para envio pelo WhatsApp!', 'success');
    
    // Limpar formulário
    form.reset();
}

// Validar formulário
function validateForm(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            markInvalid(input, 'Este campo é obrigatório');
            isValid = false;
        } else if (input.type === 'email' && input.value) {
            if (!isValidEmail(input.value)) {
                markInvalid(input, 'Email inválido');
                isValid = false;
            } else {
                markValid(input);
            }
        } else if (input.type === 'tel' && input.value) {
            if (!isValidPhone(input.value)) {
                markInvalid(input, 'Telefone inválido');
                isValid = false;
            } else {
                markValid(input);
            }
        } else if (input.value) {
            markValid(input);
        }
    });
    
    return isValid;
}

// Marcar campo como inválido
function markInvalid(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    
    // Remover feedback anterior
    let feedback = input.parentNode.querySelector('.invalid-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        input.parentNode.appendChild(feedback);
    }
    feedback.textContent = message;
}

// Marcar campo como válido
function markValid(input) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validar telefone
function isValidPhone(phone) {
    const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
    return phoneRegex.test(phone);
}

// Mostrar alerta
function showAlert(message, type) {
    // Remover alertas anteriores
    const existingAlerts = document.querySelectorAll('.custom-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Criar alerta
    const alert = document.createElement('div');
    alert.className = `custom-alert alert alert-${type}`;
    alert.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <span>${message}</span>
            <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    // Estilizar alerta
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1060;
        min-width: 300px;
        max-width: 500px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        border-radius: 10px;
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// WhatsApp integration
function openWhatsApp(message = 'Olá! Gostaria de agendar uma consulta.') {
    const phone = '5581987023658';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
}

// Exportar funções para uso global
window.openWhatsApp = openWhatsApp;