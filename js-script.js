document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. TRANSICIÓN DE PORTADA ---
    const btnOpen = document.getElementById("btn-open");
    const introScreen = document.getElementById("intro-screen");
    const mainContent = document.getElementById("main-content");

    btnOpen.addEventListener("click", () => {
        // Ocultar portada con animación
        introScreen.style.opacity = "0";
        introScreen.style.transform = "translateY(-50px)";
        
        // Mostrar contenido y subir el scroll
        setTimeout(() => {
            introScreen.classList.add("hidden");
            mainContent.classList.remove("hidden");
            window.scrollTo(0, 0);
        }, 800);
    });

    // --- 2. CUENTA REGRESIVA ---
    // Configura la fecha: 14 de Noviembre de 2026 a las 18:30 hrs (GMT-6 Guatemala)
    const eventDate = new Date("Nov 14, 2026 18:30:00 GMT-0600").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "<h3 style='grid-column: span 4; color: var(--silver); font-family: var(--font-titles);'>¡El momento mágico ha llegado!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }, 1000);

    // --- 3. ANIMACIÓN LLUVIA DE SOBRE Y CLICK ---
    const interactiveEnvelope = document.getElementById("interactive-envelope");
    interactiveEnvelope.addEventListener("click", () => {
        interactiveEnvelope.classList.toggle("open");
    });

    // Generar sobres cayendo de fondo
    const rainContainer = document.getElementById("envelope-rain");
    function createFallingEnvelope() {
        const env = document.createElement("i");
        env.classList.add("fa-regular", "fa-envelope", "falling-envelope");
        
        // Posición aleatoria en el eje X
        env.style.left = Math.random() * 100 + "%";
        
        // Duración y retraso aleatorio para más naturalidad
        const duration = Math.random() * 3 + 4; // Entre 4s y 7s
        env.style.animationDuration = duration + "s";
        
        // Tamaño aleatorio sutil
        const size = Math.random() * 0.8 + 0.8;
        env.style.fontSize = size + "rem";

        rainContainer.appendChild(env);

        // Limpiar el DOM eliminando el sobre cuando termine su animación
        setTimeout(() => {
            env.remove();
        }, duration * 1000);
    }
    // Crear un sobre cada 800ms
    setInterval(createFallingEnvelope, 800);

    // --- 4. FORMULARIO RSVP (WhatsApp) ---
    const rsvpForm = document.getElementById("rsvp-form");
    const attendanceSelect = document.getElementById("attendance");
    const guestsGroup = document.getElementById("guests-group");
    const companionsGroup = document.getElementById("companions-group");

    // Ocultar campos de acompañantes si dice que NO asistirá
    attendanceSelect.addEventListener("change", (e) => {
        if(e.target.value === "Lo siento, no podré asistir") {
            guestsGroup.style.display = "none";
            companionsGroup.style.display = "none";
            document.getElementById("guest-count").removeAttribute("required");
        } else {
            guestsGroup.style.display = "block";
            companionsGroup.style.display = "block";
            document.getElementById("guest-count").setAttribute("required", "true");
        }
    });

    rsvpForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que la página recargue

        const name = document.getElementById("guest-name").value;
        const attendance = document.getElementById("attendance").value;
        const count = document.getElementById("guest-count").value;
        const companions = document.getElementById("companions-names").value;

        let message = `¡Hola! Te escribo por la invitación a los XV años de Sara Prado.\n\n`;
        message += `*Nombre / Familia:* ${name}\n`;
        message += `*Respuesta:* ${attendance}\n`;

        if (attendance !== "Lo siento, no podré asistir") {
            message += `*Número de personas:* ${count}\n`;
            if (companions.trim() !== "") {
                message += `*Nombres de acompañantes:* ${companions}\n`;
            }
        }

        // Codificar el texto para URL
        const encodedMessage = encodeURIComponent(message);
        
        // Número proporcionado: +502 4976 0600
        const whatsappNumber = "50249760600";
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Abrir WhatsApp en una nueva pestaña o la app nativa en móviles
        window.open(whatsappURL, "_blank");
    });

});