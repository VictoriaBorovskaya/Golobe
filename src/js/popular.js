import { addCount } from "./service.js"
import { getFavoriteTours } from "./service.js"

// для отрисовки и прокрутки популярных туров
async function serchTour() {
    const response = await fetch(
        "https://www.bit-by-bit.ru/api/student-projects/tours"
    )
    const tours = await response.json()
    const filterTour = tours.filter((tour) => tour.rating > 9.0, 0)
    renderPopularTour(filterTour, 0)
}

serchTour()

let favoritesArr = getFavoriteTours()
addCount(favoritesArr)

function renderPopularTour(filterTour, index) {
    const popularYour = document.getElementById("popular-tours")
    popularYour.innerHTML = ""

    let city = filterTour[index].city
    if (filterTour[index].city === null) city = ""

    popularYour.innerHTML += `
        <div class="rounded overflow-hidden shadow relative h-80 transition-all">
            <img src="${filterTour[index].image}" class='h-96 object-cover w-full' />
            <div class="flex justify-between items-end absolute top-0 bottom-0 left-0 right-0 mix-blend-multiply bg-gradient-to-t from-gray-800 via-white to-white">
            </div>
            <p class="absolute top-3 right-3 text-white font-bold w-8 bg-sky-700 rounded text-center p-1">${filterTour[index].rating}</p>
            <div class="absolute flex justify-between bottom-36 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-white cursor-pointer" id="button-left-${filterTour[index]}">
                    <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-white cursor-pointer" id="button-right-${filterTour[index]}">
                    <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
                </svg>
            </div> 
            <div class="absolute bottom-3 w-full flex flex-col items-center">
                <p class='font-bold text-base sm:text-lg md:text-xl text-white pb-2'>${filterTour[index].hotelName}</p>
                <div class="flex items-center text-white text-base sm:text-lg pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-white pr-1">
                        <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
                    </svg>
                    <span>${filterTour[index].country}</span>
                    <span class="px-1" aria-hidden="true">&middot;</span>
                    <span>${city}</span>
                </div>
                <button class="btn-header w-4/5">Подробнее</button>
            </div>
        </div>
     `
    forEachRightButton(filterTour, index)
    forEachLeftButton(filterTour, index)
}

function scrollRight(filterTour, index) {
    let tourIndex = filterTour.indexOf(filterTour[index])
    if (tourIndex === filterTour.length - 1) {
        return renderPopularTour(filterTour, 0)
    } else if (tourIndex < filterTour.length) {
        let nextIndex = tourIndex + 1
        renderPopularTour(filterTour, nextIndex)
    }
}

function forEachRightButton(filterTour, index) {
    document
        .getElementById(`button-right-${filterTour[index]}`)
        .addEventListener("click", () => {
            scrollRight(filterTour, index)
        })
}

// функция прокрутки отзывов назад (влево)
function scrollLeft(filterTour, index) {
    let tourIndex = filterTour.indexOf(filterTour[index])
    if (tourIndex === 0) {
        return renderPopularTour(filterTour, filterTour.length - 1)
    } else if (tourIndex > 0 && tourIndex <= filterTour.length) {
        let nextIndex = tourIndex - 1
        renderPopularTour(filterTour, nextIndex)
    }
}

function forEachLeftButton(filterTour, index) {
    document
        .getElementById(`button-left-${filterTour[index]}`)
        .addEventListener("click", () => {
            scrollLeft(filterTour, index)
        })
}

