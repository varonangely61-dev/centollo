// ===== SLIDER =====
var currentSlide = 0;
var slides = [];
var dots = [];
var autoplayInterval = null;

function initSlider() {
    slides = document.querySelectorAll('.slide');
    dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;

    showSlide(0);

    // Autoplay cada 3.5 segundos
    autoplayInterval = setInterval(function () {
        showSlide(currentSlide + 1);
    }, 3500);
}

function showSlide(index) {
    slides.forEach(function (s) { s.classList.remove('active'); });
    dots.forEach(function (d) { d.classList.remove('active'); });

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    // Reiniciar autoplay al hacer clic manual
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(function () {
        showSlide(currentSlide + 1);
    }, 3500);
    showSlide(currentSlide + direction);
}

function goToSlide(index) {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(function () {
        showSlide(currentSlide + 1);
    }, 3500);
    showSlide(index);
}

// ===== CHATBOT =====
var chatbotAbierto = false;

function toggleChatbot() {
    var chatbot = document.getElementById('chatbot');
    if (!chatbot) return;
    chatbotAbierto = !chatbotAbierto;
    chatbot.classList.toggle('active', chatbotAbierto);
}

function enviarPregunta(pregunta) {
    var mensajes = document.getElementById('chatbot-mensajes');
    if (!mensajes) return;

    var msgUsuario = document.createElement('div');
    msgUsuario.className = 'mensaje usuario';
    msgUsuario.textContent = pregunta;
    mensajes.appendChild(msgUsuario);
    mensajes.scrollTop = mensajes.scrollHeight;

    setTimeout(function () {
        var msgBot = document.createElement('div');
        msgBot.className = 'mensaje bot';
        msgBot.innerHTML = '<i class="fas fa-robot"></i> ' + obtenerRespuesta(pregunta);
        mensajes.appendChild(msgBot);
        mensajes.scrollTop = mensajes.scrollHeight;
    }, 500);
}

function obtenerRespuesta(pregunta) {
    var respuestas = {
        '¿Cuáles son los horarios?': 'Lunes a viernes: 8:00 - 14:30. Sábados: 8:00 - 14:00. Domingos y festivos: cerrado.',
        '¿Dónde están ubicados?': 'Estamos en Carrera 1 #93-50 Chicó Alto, Bogotá. Visita la página de Ubicación para ver el mapa.',
        '¿Cómo puedo contactarlos?': 'Llámanos al (57) 316 690 0508 o escríbenos a servicioalcliente@tramonti.com.co',
        '¿Tienen servicio a domicilio?': 'Sí, contamos con domicilio. Consulta disponibilidad llamándonos.',
        '¿Qué métodos de pago aceptan?': 'Efectivo, tarjetas de crédito/débito, Nequi y Daviplata.',
        '¿Tienen productos frescos?': '¡Sí! Todos nuestros productos son frescos, traídos directamente del mar.',
        '¿Cómo puedo hacer una reserva?': 'Escanea el código QR en la página de Reservas o llámanos al (57) 316 690 0508.',
        '¿Tienen estacionamiento?': 'Sí, hay parqueadero disponible cerca del establecimiento.',
        '¿Atienden pedidos grandes?': 'Sí, para eventos contáctanos con mínimo 48 horas de anticipación.',
        '¿Tienen opciones para alérgicos?': 'Sí, informa a nuestro personal y te ayudamos a elegir con seguridad.'
    };
    return respuestas[pregunta] || 'No tengo esa información. Contáctanos al (57) 316 690 0508.';
}

// Cerrar chatbot al clic fuera
document.addEventListener('click', function (e) {
    var chatbot = document.getElementById('chatbot');
    var boton = document.querySelector('.chatbot-boton');
    if (!chatbot || !boton) return;
    if (chatbotAbierto && !chatbot.contains(e.target) && !boton.contains(e.target)) {
        toggleChatbot();
    }
});

// Iniciar al cargar
document.addEventListener('DOMContentLoaded', initSlider);
