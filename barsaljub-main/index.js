// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded'); // Para debug

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  console.log('hamburger:', hamburger); // Para debug
  console.log('navLinks:', navLinks); // Para debug

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      console.log('hamburger clicked'); // Para debug
      navLinks.classList.toggle('nav-active');
      hamburger.classList.toggle('toggle');
    });

    // Cerrar menú al hacer clic en un enlace
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        hamburger.classList.remove('toggle');
      });
    });
  }

  // Inicializar los botones de idioma de la carta
  initializeLanguageButtons();
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    window.scrollTo({
      top: targetElement.offsetTop - 70,
      behavior: "smooth",
    });
  });
});

// Slideshow functionality
document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 1;
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");
  const totalSlides = slides.length;
  let slideInterval;
  const autoplayDelay = 8000;

  function showSlide(n) {
    if (n > totalSlides) currentSlide = 1;
    else if (n < 1) currentSlide = totalSlides;
    else currentSlide = n;

    slides.forEach(slide => slide.style.display = 'none');
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[currentSlide - 1].style.display = 'block';
    indicators[currentSlide - 1].classList.add('active');
  }

  function navigateSlide(direction) {
    showSlide(currentSlide + direction);
    resetAutoplay();
  }

  function startAutoplay() {
    slideInterval = setInterval(() => {
      navigateSlide(1);
    }, autoplayDelay);
  }

  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }

  // Event Listeners
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') navigateSlide(-1);
    if (e.key === 'ArrowRight') navigateSlide(1);
  });

  indicators.forEach(indicator => {
    indicator.addEventListener("click", () => {
      showSlide(parseInt(indicator.getAttribute("data-index")));
      resetAutoplay();
    });
  });

  const slideshow = document.querySelector(".fullwidth-slideshow");
  if (slideshow) {
    slideshow.addEventListener("mouseenter", () => clearInterval(slideInterval));
    slideshow.addEventListener("mouseleave", startAutoplay);
  }

  // Initialize slideshow
  showSlide(1);
  startAutoplay();
});

// Language switcher functionality
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar todos los botones de idioma y menús
  const languageTabs = document.querySelectorAll(".language-tab");
  const menuContainers = document.querySelectorAll(".menu-container");

  // Ocultar todos los menús excepto el catalán por defecto
  menuContainers.forEach(menu => {
    if (menu.id === "menu-ca") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  });

  // Añadir event listeners a los botones de idioma
  languageTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      // Remover clase active de todos los tabs
      languageTabs.forEach(t => t.classList.remove("active"));
      
      // Añadir clase active al tab seleccionado
      this.classList.add("active");
      
      // Obtener el idioma seleccionado
      const selectedLang = this.getAttribute("data-lang");
      
      // Ocultar todos los menús
      menuContainers.forEach(menu => {
        menu.style.display = "none";
      });
      
      // Mostrar el menú del idioma seleccionado
      const selectedMenu = document.getElementById(`menu-${selectedLang}`);
      if (selectedMenu) {
        selectedMenu.style.display = "block";
      }
    });
  });
});

// Cargar el contenido de la carta
/*document.addEventListener('DOMContentLoaded', function() {
  const cartaContent = document.getElementById('carta-content');
  
  fetch('carta.html')
    .then(response => response.text())
    .then(data => {
      cartaContent.innerHTML = data;
      // Reinicializar los event listeners de los botones de idioma
      initializeLanguageButtons();
    })
    .catch(error => console.error('Error loading carta:', error));
});*/

// Función para manejar los cambios de idioma en la carta
function initializeLanguageButtons() {
  const languageTabs = document.querySelectorAll('.language-tab');
  const menuContainers = document.querySelectorAll('.menu-container');

  // Ocultar todos los menús excepto el catalán por defecto
  menuContainers.forEach(container => {
    if (container.id === 'menu-ca') {
      container.style.display = 'block';
      container.classList.add('active');
    } else {
      container.style.display = 'none';
      container.classList.remove('active');
    }
  });

  languageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      languageTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const selectedLang = tab.getAttribute('data-lang');
      
      menuContainers.forEach(container => {
        if (container.id === `menu-${selectedLang}`) {
          container.style.display = 'block';
          container.classList.add('active');
        } else {
          container.style.display = 'none';
          container.classList.remove('active');
        }
      });
    });
  });
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  initializeLanguageButtons();
});

// Asegurarse de que el CSS para la navegación móvil esté correcto
const styles = `
@keyframes navLinkFade {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.nav-active {
  transform: translateX(0%) !important;
}

.toggle .line1 {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.toggle .line2 {
  opacity: 0;
}

.toggle .line3 {
  transform: rotate(45deg) translate(-5px, -6px);
}
`;

// Añadir los estilos al documento
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
