// Espera a que el DOM esté completamente cargado antes de ejecutar cualquier código
document.addEventListener('DOMContentLoaded', () => {

    // ─── ANIMACIONES DE REVELADO AL HACER SCROLL ───────────────────────────────
    // Selecciona todos los elementos con la clase "reveal" para animarlos
    const reveals = document.querySelectorAll('.reveal');

    // Función que comprueba qué elementos ".reveal" ya son visibles en pantalla
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight; // Altura visible de la ventana
        reveals.forEach(el => {
            // Distancia desde la parte superior del elemento hasta el borde superior de la ventana
            const revealTop = el.getBoundingClientRect().top;
            // Margen: el elemento se activa cuando está a 150px del borde inferior de la pantalla
            const revealPoint = 150;

            // Si el elemento ya está dentro del área visible, le añade la clase "active"
            // que activa la transición CSS (aparece deslizándose desde abajo)
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    // Escucha el evento de scroll para comprobar los elementos en cada desplazamiento
    window.addEventListener('scroll', revealOnScroll);
    // Ejecución inicial: revela los elementos que ya son visibles al cargar la página
    revealOnScroll();

    // ─── SCROLL SUAVE EN LOS ENLACES DE NAVEGACIÓN ─────────────────────────────
    // Recorre todos los enlaces del <nav> para sobreescribir el comportamiento por defecto
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el salto brusco al ancla (#seccion)
            const targetId = this.getAttribute('href');          // Obtiene el ID destino (ej: "#servicios")
            const targetElement = document.querySelector(targetId); // Busca el elemento en el DOM

            if (targetElement) {
                // Desplaza la página suavemente hasta el elemento,
                // restando 80px para que el header fijo no tape el título
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── MICRO-INTERACCIÓN EN LAS TARJETAS DE SERVICIOS ────────────────────────
    // Selecciona todas las tarjetas de la sección de servicios
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        // Registra la posición del ratón dentro de cada tarjeta
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect(); // Posición y tamaño de la tarjeta
            const x = e.clientX - rect.left; // Coordenada X del ratón relativa a la tarjeta
            const y = e.clientY - rect.top;  // Coordenada Y del ratón relativa a la tarjeta

            // Almacena las coordenadas como variables CSS personalizadas
            // para que el CSS pueda usarlas en efectos de iluminación o gradiente
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
