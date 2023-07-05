import { format, differenceInDays } from 'date-fns';

export function renderModal(id, arr) {
  const tour = arr.find((tourId) => {
    return tourId.id === id;
  });
  const index = arr.indexOf(tour);

  const start = new Date(tour.startTime);
  const startFormat = format(start, 'dd.MM.yyyy');
  const end = new Date(tour.endTime);
  const endFormat = format(end, 'dd.MM.yyyy');
  const amountDays = differenceInDays(end, start);

  document.getElementById('modal-image').innerHTML = `
    <img class="h-full w-full object-cover" src="${arr[index].image}" />
    <p class=" flex justify-center items-center border border-cyan-500 bg-white/50 h-10 w-10 rounded-xl font-medium text-base absolute top-2 right-2">${arr[index].rating}</p>
  `;

  document.getElementById('modal-image-mobile').innerHTML = `
  <img class="h-full w-full object-cover" src="${arr[index].image}" />
  <p class=" flex justify-center items-center border border-cyan-500 bg-white/50 h-10 w-10 rounded-xl font-medium text-base absolute top-2 right-2">${arr[index].rating}</p>
`;

  document.getElementById('modal-content').innerHTML = `
        <div class="flex flex-col py-5">
          <p class="md:text-xl font-semibold text-neutral-700">${arr[index].hotelName}</p>
          <div class="flex items-center font-medium text-sm md:text-base py-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 md:w-6 md:h-6 pr-1">
                <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
              </svg>
              <span>${arr[index].country}</span>
              <span class="px-1" aria-hidden="true">&middot;</span>
              <span>${arr[index].city ?? ''}</span>
          </div>
          <p class="py-0.5 text-sm md:text-base">Продолжительность тура <span class="font-semibold">${startFormat} - ${endFormat} (${amountDays} ночей)</span></p>
          <p class="py-0.5 text-sm md:text-base">Стоимость тура <span class="font-semibold">${
            arr[index].price
          } рублей</span></p>
        </div>
    `;

  document.getElementById('buttons').innerHTML = `
        <button class="button" id="button-booking-${arr[index].id}" type="submit">Забронировать</button>
    `;

  addModal();

  document.getElementById(`button-booking-${arr[index].id}`).addEventListener('click', () => {
    bookingTour(arr[index].id);
  });
}

//для очистки формы
function clearform() {
  document.getElementById('customerName').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('email').value = '';
  document.getElementById('description').value = '';
}

// функции для открытия и закрытия модального окна
let Modal = document.getElementById('modal');
let okModal = document.getElementById('modal-ok');
let ButtonClodeModal = document.getElementById('button-close-modal');

const addModal = () => {
  clearform();
  document.getElementById('error-text').style.display = 'none';
  document.getElementById('modal').style.display = 'flex';
};

export const closeModal = (event) => {
  if (event.target === Modal || event.target === ButtonClodeModal) {
    return (Modal.style.display = 'none');
  } else if (event.target === document.getElementById('button-modal-ok')) {
    return (okModal.style.display = 'none');
  }
};

//функция для направления запроса на сервер
async function bookingTour(id) {
  let customerName = document.getElementById('customerName').value;
  let phone = document.getElementById('phone').value;
  let email = document.getElementById('email').value;
  let description = document.getElementById('description').value;

  if (customerName && phone && email) {
    const params = {
      customerName: customerName,
      phone: phone,
      email: email,
      description: description,
    };
    let url = `https://www.bit-by-bit.ru/api/student-projects/tours/${id}`;
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
    });
    let data = await response.json();
    console.log(data);
    drawModalOk();
    document.getElementById('button-modal-ok').addEventListener('click', closeModal);
  } else {
    document.getElementById('error-text').style.display = 'block';
  }
}

// для замены на окно с успешной отправкой заявки
function drawModalOk() {
  Modal.style.display = 'none';
  okModal.style.display = 'flex';
}
