import renderTour from "./tourCards.js"
import { addCount } from "./service.js"
import { saveToLocalStorage } from "./service.js"
import { getFavoriteTours } from "./service.js"

let favoritesArr = getFavoriteTours()
showTour(favoritesArr)
addCount(favoritesArr)

// для кнопки "Удалить"
function forEachDeleteButton(arr) {
    arr.forEach((tour) => {
        document
            .getElementById(`remove-to-favorite-${tour.id}`)
            .addEventListener("click", () => {
                deleteTour(tour.id)
            })
    })
}

// функция удаления
function deleteTour(id) {
    let favoritesArr = getFavoriteTours()
    const tour = favoritesArr.find((tourId) => {
        return tourId.id === id
    })
    const tourIndex = favoritesArr.indexOf(tour)
    favoritesArr.splice(tourIndex, 1)
    addCount(favoritesArr)
    saveToLocalStorage(favoritesArr)
    showTour(favoritesArr)
}

// для отрисовки и добавления обработчиков
function showTour(arr) {
    renderTour(arr)
    forEachDeleteButton(arr)
}
