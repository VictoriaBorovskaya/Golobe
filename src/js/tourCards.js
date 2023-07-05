import { differenceInDays } from 'date-fns';
import { getFavoriteTours } from './helpers.js';

let favoritesArr = getFavoriteTours();

// отрисовка карточек туров
function renderTour(arr) {
  const listTour = document.getElementById('list-tours');
  listTour.innerHTML = '';
  arr.forEach((tour) => {
    const start = new Date(tour.startTime);
    const end = new Date(tour.endTime);
    const amountDays = differenceInDays(end, start);

    let favoritesArr = getFavoriteTours();
    const favoriteTourIds = favoritesArr.map((t) => t.id);
    const isFavorite = favoriteTourIds.includes(tour.id);

    listTour.innerHTML += `
        <div class="flex flex-col sm:flex-row items-center justify-between rounded-2xl overflow-hidden shadow-md sm:h-64 bg-white sm:gap-5 sm:pr-5" id="tour-container">
            <img src="${tour.image}" class='h-64 sm:h-full w-full sm:w-72 object-cover object-center' />
            <div class="flex flex-col w-full h-fit sm:h-full justify-between px-3 sm:px-0">
              <div class="flex flex-col sm:flex-row justify-between items-start py-5 h-full">
                <div>
                  <p class='font-bold text-lg md:text-xl text-neutral-800'>${tour.hotelName}</p>
                  <div class="flex items-center text-sm md:text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 pr-1">
                      <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
                    </svg>
                    <span>${tour.country}</span>
                    <span class="px-1" aria-hidden="true">&middot;</span>
                    <span>${tour.city ?? ''}</span>
                  </div>
                  <p class="pt-2 text-sm md:text-base">Продолжительность тура <span class="font-semibold">от ${amountDays} ночей</span></p> 
                </div>
                <p class="sm:text-lg md:text-xl text-end font-semibold text-rose-400 pt-3 sm:pt-0 pl-3 sm:pl-5 w-full sm:w-fit">от ${
                  tour.price
                }₽</p>
              </div>
            
              <div class="flex itemss-center justify-between py-3 md:py-5 border-t border-neutral-300">
                <div class="flex gap-3 " id="button-container">
                    ${
                      isFavorite
                        ? `<button class='flex justify-center items-center border border-cyan-500 h-10 w-10 rounded-xl' id='remove-to-favorite-${tour.id}'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                    </button>`
                        : `<button class='flex justify-center items-center border border-cyan-500 h-10 w-10 rounded-xl' id='add-from-favorite-${tour.id}'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    </button>`
                    }
                    <button class="bg-cyan-500 hover:bg-cyan-600 px-5 h-10 font-medium rounded-xl w-fit text-sm md:text-base" id="book-tour-${
                      tour.id
                    }">Забронировать</button>
                </div>
                <p class="flex justify-center items-center border border-cyan-500 h-10 w-10 rounded-xl font-semibold text-sm md:text-base">${
                  tour.rating
                }</p>
              </div>
            </div>  
        </div>
     `;
  });
}

export default renderTour;
