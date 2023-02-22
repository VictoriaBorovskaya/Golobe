import renderTour from "./tourCards.js"
import { addCount, saveToLocalStorage, getFavoriteTours } from "./service.js"
import { closeModal, renderModal } from "./booking.js"

let favoritesArr = getFavoriteTours()

// для кнопки "Удалить"
function forEachDeleteButton(arr) {
    arr.forEach((tour) => {
        document
            .getElementById(`remove-to-favorite-${tour.id}`)
            .addEventListener("click", () => {
                deleteTour(tour.id)
        })

        document
            .getElementById(`book-tour-${tour.id}`)
            .addEventListener('click', () => { 
                renderModal(tour.id, arr)
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

function initApp() {
    showTour(favoritesArr)
    addCount(favoritesArr)
    document.getElementById('modal').addEventListener('click', closeModal)
    document.getElementById('button-close-modal').addEventListener('click', closeModal)
}

initApp()