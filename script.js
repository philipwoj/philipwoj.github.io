    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('expandedImg');
    const closeBtn = document.querySelector('.modal .close');

    document.querySelectorAll('.gallery-slider .slider img').forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = 'flex';              // use flex for centering
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalImg.style.transform = 'scale(1.5)';   // 50% larger
        modalImg.style.transformOrigin = 'center center';
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      modalImg.style.transform = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
        modalImg.style.transform = 'none';
      }
    });

    // Close modal when clicking the expanded image (zoom-out cursor)
    modalImg.addEventListener('click', () => {
    modal.style.display = 'none';
    });