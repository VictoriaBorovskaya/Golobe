import renderTour from "./renderTour.js"

async function serchTour() {
    const response = await fetch(
        "https://www.bit-by-bit.ru/api/student-projects/tours"
    )
    const tours = await response.json()
    const filterTour = tours.filter((tour) => tour.rating > 9.0, 0)
    console.log(filterTour)

    renderPopularTour(filterTour, 0)
}

serchTour()

function renderPopularTour(filterTour, index) {
    const popularYour = document.getElementById("popular-tours")
    popularYour.innerHTML = ""

    let city = filterTour[index].city
    if (filterTour[index].city === null) city = ""

    popularYour.innerHTML += `
        <div class="flex flex-col justify-between border-4 rounded border-orange-400 overflow-hidden shadow relative">
            <img src="${filterTour[index].image}" class='h-80 object-cover' />
            <div class="flex justify-end pr-2 pt-2 absolute top-0.5 right-0.5">
                <p class="text-white font-bold text-sm w-8 bg-sky-700 rounded text-center p-1">${filterTour[index].rating}</p>
            </div>
            <div class="flex justify-between items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-orange-500" id="button-left-${filterTour[index]}">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <p class='font-bold text-center text-lg text-sky-700 py-3'>${filterTour[index].hotelName}</p>
                        <div class="px-2 py-1 flex flex-col justify-end text-sky-900">
                            <div class="flex justify-center font-semibold">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400 pr-1">
                                <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
                                </svg>
                                <span>${filterTour[index].country}</span>
                                <span class="px-1" aria-hidden="true">&middot;</span>
                                <span>${city}</span>
                            </div>
                        </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-orange-500" id="button-right-${filterTour[index]}">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <div class="p-2 my-2">
                <button class="border-2 border-orange-400 rounded text-sky-700 font-bold py-1 hover:bg-orange-400 hover:text-white transition-all duration-700 w-full">Подробнее</button>
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
