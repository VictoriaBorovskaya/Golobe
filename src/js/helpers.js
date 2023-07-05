// сохранение в LocalStorage
export function saveToLocalStorage(arr) {
  let tourJson = JSON.stringify(arr);
  localStorage.setItem('favoritesArr', tourJson);
}

// функция для LocalStorage
export function getFavoriteTours() {
  let favoritesArr = localStorage.getItem('favoritesArr') ? JSON.parse(localStorage.getItem('favoritesArr')) : [];
  saveToLocalStorage(favoritesArr);
  return favoritesArr;
}

// для удаления из израбнного
export function deleteTourItem(arr, id) {
  const tour = arr.find((tourId) => {
    return tourId.id === id;
  });
  const tourIndex = arr.indexOf(tour);
  arr.splice(tourIndex, 1);
  saveToLocalStorage(arr);
}
