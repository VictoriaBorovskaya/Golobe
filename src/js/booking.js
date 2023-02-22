import { format, differenceInDays } from "date-fns"

export function renderModal(id, arr) {
    const tour = arr.find((tourId) => {
        return tourId.id === id 
    })
    const index = arr.indexOf(tour) 
    
    const start = new Date(tour.startTime)
    const startFormat = format(start, "dd.MM.yyyy")
    const end = new Date(tour.endTime)
    const endFormat = format(end, "dd.MM.yyyy")
    const amountDays = differenceInDays(end, start)

    document.getElementById('modal-content').innerHTML = `
        <div class="text-center flex flex-col items-center justify-center py-5 md:h-60 text-sky-900 px-2">
            <p class="text-xl md:text-2xl font-bold pb-1">${arr[index].hotelName}</p>
            <div class="flex justify-center items-center md:text-lg font-medium py-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-orange-400 pr-1">
                    <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
                </svg>
                <span>${arr[index].country}</span>
                <span class="px-1" aria-hidden="true">&middot;</span>
                <span>${arr[index].city ?? ""}</span>
            </div>
            <p class="md:text-lg py-1">Продолжительность тура: <span class="font-medium">${startFormat} - ${endFormat} (${amountDays} ночей)</span></p>
            <p class="md:text-lg py-1">Стоимость тура: <span class="font-medium">${arr[index].price} рублей</span></p>
        </div>
        <div class="relative h-60 w-full px-2 sm:px-5 md:px-0 md:pl-2 modal-image">
            <img class="rounded h-full w-full object-cover" src="${arr[index].image}" />
            <p class="bg-sky-700 rounded px-2 py-1 text-white font-bold absolute right-3 sm:right-6 top-1 md:right-1">${arr[index].rating}</p>
        </div>
    `

    document.getElementById('buttons').innerHTML = `
        <button class="btn-modal w-full" id="button-booking-${arr[index].id}" type="submit">Отправить</button>
    `

    addModal()
 
    document
        .getElementById(`button-booking-${arr[index].id}`)
        .addEventListener('click', () => { 
            bookingTour(arr[index].id)
    }) 
}

//для очистки формы
function clearform() {
    document.getElementById("customerName").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("email").value = ""
    document.getElementById("description").value = ""
}

// функции для открытия и закрытия модального окна
let Modal = document.getElementById('modal')
let okModal = document.getElementById('modal-ok')
let ButtonClodeModal = document.getElementById('button-close-modal') 

const addModal = () => {
    clearform()
    document.getElementById('modal').style.display = 'flex'
}

export const closeModal = (event) => {
    if(event.target === Modal || event.target === ButtonClodeModal) {
        return Modal.style.display = 'none'
    } else if (event.target === document.getElementById("button-modal-ok")) {
        return okModal.style.display = 'none'
    }
}

//функция для направления запроса на сервер
async function bookingTour(id) {
    let customerName = document.getElementById("customerName").value
    let phone = document.getElementById("phone").value
    let email = document.getElementById("email").value
    let description = document.getElementById("description").value

    if(customerName && phone && email) {
        document.getElementById('error-text').style.display = 'none'
        const params = {
            customerName: customerName,
            phone: phone,
            email: email,
            description: description                   
        }
        let url = `https://www.bit-by-bit.ru/api/student-projects/tours/${id}`
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(params)
        })
        let data = await response.json()
        console.log(data)
        drawModalOk()
        document.getElementById("button-modal-ok").addEventListener('click', closeModal)
    } else {
        document.getElementById('error-text').style.display = 'block'
    }
}

// для замены на окно с успешной отправкой заявки
function drawModalOk() {
    Modal.style.display = 'none'
    okModal.style.display = 'flex'
}
