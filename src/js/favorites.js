import renderTour from './tourCards.js';
import { getFavoriteTours, deleteTourItem } from './helpers.js';
import { closeModal, renderModal } from './booking.js';

let favoritesArr = getFavoriteTours();

// для кнопки "Удалить"
function forEachDeleteButton(arr) {
  arr.forEach((tour) => {
    document.getElementById(`remove-to-favorite-${tour.id}`).addEventListener('click', () => {
      deleteTour(tour.id);
    });

    document.getElementById(`book-tour-${tour.id}`).addEventListener('click', () => {
      renderModal(tour.id, arr);
    });
  });
}

// функция удаления
function deleteTour(id) {
  let favoritesArr = getFavoriteTours();
  deleteTourItem(favoritesArr, id);
  showTour(favoritesArr);
}

// для отрисовки и добавления обработчиков
function showTour(arr) {
  renderTour(arr);
  forEachDeleteButton(arr);
}

function initApp() {
  showTour(favoritesArr);
  document.getElementById('modal').addEventListener('click', closeModal);
  document.getElementById('button-close-modal').addEventListener('click', closeModal);
}

initApp();
