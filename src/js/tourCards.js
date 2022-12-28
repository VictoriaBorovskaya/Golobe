import { format, differenceInDays } from "date-fns"
import { getFavoriteTours } from "./service.js"

let favoritesArr = getFavoriteTours()

// отрисовка карточек туров
function renderTour(arr) {
    const listTour = document.getElementById("list-tours")
    listTour.innerHTML = ""
    arr.forEach((tour) => {
        const start = new Date(tour.startTime)
        const startFormat = format(start, "dd.MM.yyyy")
        const end = new Date(tour.endTime)
        const endFormat = format(end, "dd.MM.yyyy")
        const amountDays = differenceInDays(end, start)

        let favoritesArr = getFavoriteTours()
        const favoriteTourIds = favoritesArr.map((t) => t.id)
        const isFavorite = favoriteTourIds.includes(tour.id)

        listTour.innerHTML += `
        <div class="flex flex-col justify-between border-4 rounded border-orange-400 overflow-hidden shadow" id="tour-container">
            <img src="${tour.image}" class='h-60 object-cover' />
            <p class='font-bold text-center text-lg text-sky-700 py-3 px-2'>${
                tour.hotelName
            }</p>
                <div class="px-2 py-1 flex flex-col justify-end text-sky-900">
                    <div class="flex items-center font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400 pr-1">
                        <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
                        </svg>
                        <span>${tour.country}</span>
                        <span class="px-1" aria-hidden="true">&middot;</span>
                        <span>${tour.city ?? ""}</span>
                    </div>
                    <p >Продолжительность тура: <span class="font-semibold">${amountDays} ночей</span></p>  
                    <p>Свободные даты: <span class="font-semibold">${startFormat} - ${endFormat}</span></p>
                    <p>Стоимость тура: <span class="font-semibold">${
                        tour.price
                    } ₽</span></p>
                </div>

            <div class="flex gap-3 p-2 my-2" id="button-container">
                ${
                    isFavorite
                        ? `<button class='btn-card w-1/2' id='remove-to-favorite-${tour.id}'>Удалить из избранного</button>`
                        : `<button class='btn-card w-1/2' id='add-from-favorite-${tour.id}'>Добавить в избранное</button>`
                }
                <button class="btn-card w-1/2">Подробнее</button>
            </div>
            
            <div class="flex justify-end pr-2 pb-2">
                <p class="text-white font-bold text-sm w-8 bg-sky-700 rounded text-center p-1">${
                    tour.rating
                }</p>
            <div>
        </div>
     `
    })
}

export default renderTour
