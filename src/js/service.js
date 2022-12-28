// счетчик избранных туров
export function addCount(arr) {
    const favoritesCount = document.getElementById("favorites-count")
    favoritesCount.innerHTML = arr ? arr.length : 0
}

// сохранение в LocalStorage
export function saveToLocalStorage(arr) {
    let tourJson = JSON.stringify(arr)
    localStorage.setItem("favoritesArr", tourJson)
}

// функция для LocalStorage 
export function getFavoriteTours() {
    let favoritesArr = localStorage.getItem("favoritesArr")
        ? JSON.parse(localStorage.getItem("favoritesArr"))
        : []
    saveToLocalStorage(favoritesArr)
    return favoritesArr
}
