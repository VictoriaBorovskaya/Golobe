import renderTour from "./renderTour.js"

async function serchTour() {
    const response = await fetch(
        "https://www.bit-by-bit.ru/api/student-projects/tours"
    )
    const tours = await response.json()
    renderTour(tours)

    document
        .getElementById("tour-serch")
        .addEventListener("click", function () {
            const listCountry = document.getElementById("list-country")
            let toursFilter = tours.filter(
                (tour) => tour.country === listCountry.value,
                0
            )
            renderTour(toursFilter)
            if (
                listCountry.value === "Все страны" ||
                listCountry.value === "Выбор страны"
            ) {
                renderTour(tours)
            }
        })

    document.getElementById("tour-sort").addEventListener("click", function () {
        const listTours = document.getElementById("sort-tours")
        if (listTours.value === "Возрастание рейтинга") {
            sortToursRatingMore(tours)
        } else if (listTours.value === "Убывание рейтинга") {
            sortToursRatingLess(tours)
        } else if (listTours.value === "Возрастание цены") {
            sortToursPriceMore(tours)
        } else if (listTours.value === "Убывание цены") {
            sortToursPriceLess(tours)
        } else if (listTours.value === "Все туры") {
            renderTour(tours)
        }
    })
}

serchTour()

// функции для сортировки туров
function sortToursRatingMore(arr) {
    const copyArr = JSON.parse(JSON.stringify(arr))
    copyArr.sort((a, b) => (a.rating > b.rating ? 1 : -1))
    renderTour(copyArr)
}

function sortToursRatingLess(arr) {
    const copyArr = JSON.parse(JSON.stringify(arr))
    copyArr.sort((a, b) => (b.rating > a.rating ? 1 : -1))
    renderTour(copyArr)
}

function sortToursPriceMore(arr) {
    const copyArr = JSON.parse(JSON.stringify(arr))
    copyArr.sort((a, b) => (a.price > b.price ? 1 : -1))
    renderTour(copyArr)
}

function sortToursPriceLess(arr) {
    const copyArr = JSON.parse(JSON.stringify(arr))
    copyArr.sort((a, b) => (b.price > a.price ? 1 : -1))
    renderTour(copyArr)
}
