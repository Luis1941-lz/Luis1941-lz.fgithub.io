// Array de imágenes con rutas relativas
const images = Array.from({ length: 22 }, (_, i) => `img/${i + 1}.png`);
let currentIndex = 0; // Índice de la imagen principal
let thumbnailIndex = 0; // Índice del primer thumbnail visible
const thumbnailsPerPage = 7; // Cantidad de miniaturas visibles

// Mostrar la imagen seleccionada
function showImage(index) {
  currentIndex = index;
  document.getElementById("main-image").src = images[currentIndex];
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
    img.alt = `Foto ${i + 1}`;
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
  
  // Agregar los eventos de navegación de miniaturas
  document.getElementById("prev-thumbnails").addEventListener("click", () => navigateThumbnails(-1));
  document.getElementById("next-thumbnails").addEventListener("click", () => navigateThumbnails(1));
  // Agregar los eventos de navegación de la imagen principal
  document.getElementById("prev-image").addEventListener("click", () => navigate(-1));
  document.getElementById("next-image").addEventListener("click", () => navigate(1));
});
