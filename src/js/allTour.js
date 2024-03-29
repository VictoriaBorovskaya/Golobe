import renderTour from './tourCards.js';
import { saveToLocalStorage, getFavoriteTours, deleteTourItem } from './helpers.js';
import { closeModal, renderModal } from './booking.js';

let favoritesArr = getFavoriteTours();

async function serchTour() {
  const listTour = document.getElementById('list-tours');
  listTour.innerHTML = `
    <div class="w-full absolute mt-8 flex items-center justify-center flex-col sm:flex-row">
        <p class="text-lg sm:text-2xl text-neutral-700 font-bold text-center pr-2">Пожалуйста, подождите, идет загрузка туров</p> 
        <div class="w-7 h-7 animate-spin rounded-full bg-gradient-to-r from-neutral-700 via-neutral-200 to-neutral-100 flex items-center justify-center">
            <div class="bg-neutral-100 w-5 h-5 rounded-full">
        </div>
    </div>
    </div>
    `;

  const response = await fetch('https://www.bit-by-bit.ru/api/student-projects/tours');
  const tours = await response.json();
  showTour(tours);

  document.getElementById('list-country').addEventListener('change', () => sortCountry(tours));
  document.getElementById('sort-tours').addEventListener('change', () => sortTour(tours));

  document.getElementById('modal').addEventListener('click', closeModal);
  document.getElementById('button-close-modal').addEventListener('click', closeModal);
}

serchTour();

// функция выбора страны
function sortCountry(arr) {
  const listCountry = document.getElementById('list-country');
  let toursFilter = arr.filter((tour) => tour.country === listCountry.value, 0);
  showTour(toursFilter);
  document.getElementById('sort-tours').addEventListener('change', () => sortTour(toursFilter));
  if (listCountry.value === 'Все страны' || listCountry.value === 'Выбор страны') {
    showTour(arr);
    document.getElementById('sort-tours').addEventListener('change', () => sortTour(arr));
  }
}

// функции для сортировки туров
function sortTour(arr) {
  const listTours = document.getElementById('sort-tours');
  if (listTours.value === 'Возрастание рейтинга') {
    sortTours(arr, 'rating', 'asc');
  } else if (listTours.value === 'Убывание рейтинга') {
    sortTours(arr, 'rating', 'desc');
  } else if (listTours.value === 'Возрастание цены') {
    sortTours(arr, 'price', 'asc');
  } else if (listTours.value === 'Убывание цены') {
    sortTours(arr, 'price', 'desc');
  } else if (listTours.value === 'Все туры') {
    showTour(arr);
  }
}

function sortTours(arr, key, order) {
  arr.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  if (order === 'desc') arr.reverse();
  showTour(arr);
}

// кнопки добавить и удалить из избранного
function forEachButton(arr) {
  arr.forEach((tour) => {
    let favoritesArr = getFavoriteTours();
    const favoriteTourIds = favoritesArr.map((t) => t.id);
    const isFavorite = favoriteTourIds.includes(tour.id);

    isFavorite
      ? document.getElementById(`remove-to-favorite-${tour.id}`).addEventListener('click', () => {
          deleteTour(arr, tour.id);
        })
      : document.getElementById(`add-from-favorite-${tour.id}`).addEventListener('click', () => {
          addFavorites(tour.id, arr);
        });

    document.getElementById(`book-tour-${tour.id}`).addEventListener('click', () => {
      renderModal(tour.id, arr);
    });
  });
}

// для кнопки удаления из избранного
function deleteTour(arr, id) {
  let favoritesArr = getFavoriteTours();
  deleteTourItem(favoritesArr, id);
  showTour(arr);
}

// функция добавления в избранное
function addFavorites(id, arr) {
  let favoritesArr = getFavoriteTours();
  const tour = arr.find((tourId) => {
    return tourId.id === id;
  });
  const index = arr.indexOf(tour);
  let newTour = arr[index];

  const existingTour = favoritesArr.find((tour) => {
    return tour.id === id;
  });

  if (!existingTour) {
    favoritesArr.push(newTour);
    saveToLocalStorage(favoritesArr);
    showTour(arr);
  }
}

// для отрисовки туров и добавления обработчиков на кнопки
function showTour(arr) {
  renderTour(arr);
  forEachButton(arr);
}
