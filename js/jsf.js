// Array de imágenes con rutas relativas
const images = Array.from({ length: 21 }, (_, i) => `img/${i + 1}.png`);
let currentIndex = 0; // Índice de la imagen principal
let thumbnailIndex = 0; // Índice del primer thumbnail visible
const thumbnailsPerPage = 7; // Cantidad de miniaturas visibles

// Mostrar la imagen seleccionada con transición
function showImage(index) {
  const mainImage = document.getElementById("main-image");
  mainImage.classList.add("hidden"); // Agregar la clase 'hidden' para ocultar la imagen con transición

  // Esperar a que la imagen se oculte antes de cambiarla
  setTimeout(() => {
    currentIndex = index;
    mainImage.src = images[currentIndex]; // Cambiar la imagen principal

    // Esperar un momento para mostrar la nueva imagen con la transición
    setTimeout(() => {
      mainImage.classList.remove("hidden"); // Eliminar la clase 'hidden' para mostrar la imagen
    }, 10);
  }, 500); // Tiempo de espera para la transición
}

// Navegar entre imágenes principales
function navigate(direction) {
  currentIndex = (currentIndex + direction + images.length) % images.length;
  showImage(currentIndex);
}

// Renderizar miniaturas visibles
function renderThumbnails() {
  const thumbnailsContainer = document.querySelector(".thumbnails-container");
  thumbnailsContainer.innerHTML = ""; // Limpiar miniaturas

  for (let i = thumbnailIndex; i < thumbnailIndex + thumbnailsPerPage && i < images.length; i++) {
    const div = document.createElement("div");
    div.classList.add("thumbnail");
    div.onclick = () => showImage(i);

    const img = document.createElement("img");
    img.src = images[i];
    img.alt = `Imagen ${i + 1} - Vista previa`; // Alt más descriptivo
    img.loading = "lazy"; // Activar carga diferida para mejorar el rendimiento
    div.appendChild(img);

    const number = document.createElement("div");
    number.classList.add("thumbnail-number");
    number.textContent = i + 1; // Mostrar el número de la miniatura
    div.appendChild(number);

    thumbnailsContainer.appendChild(div);
  }
}

// Navegar entre miniaturas
function navigateThumbnails(direction) {
  thumbnailIndex = Math.max(
    0,
    Math.min(thumbnailIndex + direction * thumbnailsPerPage, images.length - thumbnailsPerPage)
  );
  renderThumbnails();
}

// Inicializar la vista
document.addEventListener("DOMContentLoaded", () => {
  renderThumbnails();
  showImage(0);
});
