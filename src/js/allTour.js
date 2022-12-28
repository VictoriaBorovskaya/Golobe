import renderTour from "./tourCards.js"
// import { deleteTour } from "./favorites.js"
import { addCount } from "./service.js"
import { saveToLocalStorage } from "./service.js"
import { getFavoriteTours } from "./service.js"

let favoritesArr = getFavoriteTours()

async function serchTour() {
    const response = await fetch(
        "https://www.bit-by-bit.ru/api/student-projects/tours"
    )
    const tours = await response.json()
    showTour(tours)
    addCount(favoritesArr)
    
    document
        .getElementById("list-country")
        .addEventListener("change", () => sortCountry(tours))
    document
        .getElementById("sort-tours")
        .addEventListener("change", () => sortTour(tours))
}

serchTour()

// функция выбора страны
function sortCountry(arr) {
    const listCountry = document.getElementById("list-country")
    let toursFilter = arr.filter(
        (tour) => tour.country === listCountry.value,
        0
    )
    showTour(toursFilter)
    document
        .getElementById("sort-tours")
        .addEventListener("change", () => sortTour(toursFilter))
    if (
        listCountry.value === "Все страны" ||
        listCountry.value === "Выбор страны"
    ) {
        showTour(arr)
        document
            .getElementById("sort-tours")
            .addEventListener("change", () => sortTour(arr))
    }
}

// функции для сортировки туров
function sortTour(arr) {
    const listTours = document.getElementById("sort-tours")
    if (listTours.value === "Возрастание рейтинга") {
        sortTours(arr, 'rating', 'asc')
    } else if (listTours.value === "Убывание рейтинга") {
        sortTours(arr, 'rating', 'desc')
    } else if (listTours.value === "Возрастание цены") {
        sortTours(arr, 'price', 'asc')
    } else if (listTours.value === "Убывание цены") {
        sortTours(arr, 'price', 'desc')
    } else if (listTours.value === "Все туры") {
        showTour(arr)
    }
}

function sortTours(arr, key, order) {
    arr.sort((a, b) => (a[key] > b[key] ? 1 : -1))
    if (order === 'desc') arr.reverse()
    showTour(arr)
}

// кнопки добавить и удалить из избранного
function forEachButton(arr) {
    arr.forEach((tour) => {
        let favoritesArr = getFavoriteTours()
        const favoriteTourIds = favoritesArr.map((t) => t.id)
        const isFavorite = favoriteTourIds.includes(tour.id)

        isFavorite ?
            document
            .getElementById(`remove-to-favorite-${tour.id}`)
            .addEventListener("click", () => {
                deleteTour(arr, tour.id)
            })
         : document
            .getElementById(`add-from-favorite-${tour.id}`)
            .addEventListener("click", () => {
                addFavorites(tour.id, arr)
            })
        })
}

// для кнопки удаления из избранного
function deleteTour(arr, id) {
    let favoritesArr = getFavoriteTours()
    const tour = favoritesArr.find((tourId) => {
        return tourId.id === id
    })
    const tourIndex = favoritesArr.indexOf(tour)
    favoritesArr.splice(tourIndex, 1)
    addCount(favoritesArr)
    saveToLocalStorage(favoritesArr)
    showTour(arr)
}

// функция добавления в избранное
function addFavorites(id, arr) {
    let favoritesArr = getFavoriteTours()
    const tour = arr.find((tourId) => {
        return tourId.id === id
    })
    const index = arr.indexOf(tour)
    let newTour = arr[index]

    const existingTour = favoritesArr.find((tour) => {
        return tour.id === id
    })

    if (!existingTour) {
        favoritesArr.push(newTour)
        addCount(favoritesArr)
        saveToLocalStorage(favoritesArr)
        showTour(arr)
    }
}

// для отрисовки туров и добавления обработчиков на кнопки
function showTour(arr) {
    renderTour(arr)
    forEachButton(arr)
}