async function searchTour() {
  const response = await fetch('https://www.bit-by-bit.ru/api/student-projects/tours');
  const tours = await response.json();
  const filterTour = tours.filter((tour) => tour.rating > 9.0, 0);
  renderPopularTour(filterTour);
}

searchTour();

function renderPopularTour(filterTour) {
  const popularYour = document.getElementById('popular-tours');
  popularYour.innerHTML = '';
  filterTour.forEach((tour) => {
    let city = tour.city;
    if (tour.city === null) city = '';

    popularYour.innerHTML += `
      <div class="bg-white rounded-3xl shadow-md flex items-center gap-5 p-5">
        <img src="${tour.image}"  class="w-28 h-28 object-cover object-center rounded-2xl"/>
          <div>
            <p class="text-neutral-700 font-semibold text-lg">${tour.hotelName}</p>
            <span class="font-medium">${tour.country}</span>
            ${
              city === ''
                ? ''
                : `<span class="px-1 font-medium" aria-hidden="true">&middot;</span>
                  <span class="font-medium">${city}</span>`
            }  
          </div>
      </div>
    `;
  });
}
