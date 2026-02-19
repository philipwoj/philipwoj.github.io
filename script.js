const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('expandedImg');
const modalCounter = document.getElementById('modalCounter');
const closeBtn = document.querySelector('.modal .close');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');

let modalImages = [];
let modalIndex = 0;
let activeSlider = null;

function syncActiveSlider() {
  if (!activeSlider || !Array.isArray(modalImages) || !modalImages.length) return;
  if (typeof activeSlider.__setIndex === 'function') {
    activeSlider.__setIndex(modalIndex);
  } else {
    activeSlider.dataset.currentIndex = String(modalIndex);
  }
}

function renderModalImage() {
  if (!modalImages.length) return;

  const current = modalImages[modalIndex];
  modalImg.src = current.src;
  modalImg.alt = current.alt || 'Expanded image';
  modalCounter.textContent = `${modalIndex + 1} / ${modalImages.length}`;

  const showNav = modalImages.length > 1;
  modalPrev.style.display = showNav ? 'block' : 'none';
  modalNext.style.display = showNav ? 'block' : 'none';
}

function openModal(images, startIndex) {
  modalImages = images;
  modalIndex = startIndex;
  renderModalImage();
  syncActiveSlider();
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  modalImages = [];
  modalIndex = 0;
  activeSlider = null;
  document.body.style.overflow = '';
}

function showPrevImage() {
  if (!modalImages.length) return;
  modalIndex = (modalIndex - 1 + modalImages.length) % modalImages.length;
  renderModalImage();
  syncActiveSlider();
}

function showNextImage() {
  if (!modalImages.length) return;
  modalIndex = (modalIndex + 1) % modalImages.length;
  renderModalImage();
  syncActiveSlider();
}

document.querySelectorAll('.gallery-slider .slider').forEach((slider) => {
  const images = Array.from(slider.querySelectorAll('img'));
  const gallerySlider = slider.closest('.gallery-slider');

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      activeSlider = gallerySlider;
      const storedIndex = Number(gallerySlider?.dataset?.currentIndex);
      const startIndex = Number.isNaN(storedIndex) ? index : storedIndex;
      openModal(images, startIndex);
    });
  });
});

closeBtn.addEventListener('click', closeModal);

modalPrev.addEventListener('click', (event) => {
  event.stopPropagation();
  showPrevImage();
});

modalNext.addEventListener('click', (event) => {
  event.stopPropagation();
  showNextImage();
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

modalImg.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  if (modal.style.display !== 'flex') return;

  if (event.key === 'Escape') closeModal();
  if (event.key === 'ArrowLeft') showPrevImage();
  if (event.key === 'ArrowRight') showNextImage();
});