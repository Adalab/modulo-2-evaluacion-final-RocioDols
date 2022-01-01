'use strict';

//Recojo las constantes

const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.js_btnSearch');
const btnReset = document.querySelector('.js_btnReset');
const resultSearchSeries = document.querySelector('.js_resultSearchSeries');
const resultSeriesFav = document.querySelector('.js_resultSeriesFav');
const trashFav = document.querySelector('.js_trash');

let data = [];

let dataFav = [];
//Recojo la info del Local
getFavorite();


function handleButtonSearch() {

    const inputSearchValue = inputSearch.value;
    fetch(`https://api.jikan.moe/v3/search/anime?q=${inputSearchValue}&limit=3`)
        .then(response => response.json())
        .then(dataSearch => {
            data = dataSearch.results;
            renderSerie();
        })
}

function renderSerie() {
    resultSearchSeries.innerHTML = "";
    for (const serie of data) {
        //Saco el serie.image_url a una variable externa
        // let image_url
        let imgUrl = serie.image_url;
        if (imgUrl === null) {
            imgUrl = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        }

        resultSearchSeries.innerHTML += `<li><img class="js_imgResult" data-id=${serie.mal_id} src=${imgUrl} alt=${serie.title}/>`;
        resultSearchSeries.innerHTML += `<h2/>${serie.title}</h2></li>`;
    }

    const imgResults = document.querySelectorAll('.js_imgResult');

    for (const img of imgResults) {
        img.addEventListener('click', handleSerieFav);
    }
}

function handleSerieFav(ev) {

    const clickSerieId = parseInt(ev.currentTarget.dataset.id);
    const foundSerieinFav = dataFav.findIndex(serie => serie.mal_id === clickSerieId);

    if (foundSerieinFav === -1) {
        addSerieFav(clickSerieId);
    } else {
        dataFav.splice(foundSerieinFav, 1);
        setFavorite();
    }
    renderFav();
}

function addSerieFav(clickSerieId) {
    const selectedSerie = data.find(serie => serie.mal_id === clickSerieId);
    dataFav.push(selectedSerie);
    setFavorite();
    console.log(dataFav);
    renderFav();
}

function handleRemoveSerie(ev) {
    const removeXId = parseInt(ev.currentTarget.dataset.id);
    console.log(removeXId);
    const foundRemoveX = dataFav.findIndex(serie => serie.mal_id === removeXId);
    dataFav.splice(foundRemoveX, 1);
    setFavorite();
    renderFav();
}
function renderFav() {
    resultSeriesFav.innerHTML = '';

    for (const serie of dataFav) {
        resultSeriesFav.innerHTML += `<i class="far fa-times-circle js_iconX" data-id=${serie.mal_id}></i>`;
        let imgUrl = serie.image_url;
        if (imgUrl === null) {
            imgUrl = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        }

        resultSeriesFav.innerHTML += `<li><img class="js_imgResult" data-id=${serie.mal_id} src=${serie.image_url} alt=${serie.title}/>`;
        resultSeriesFav.innerHTML += `<h2/>${serie.title}</h2></li>`;
    }

    const iconsX = document.querySelectorAll('.js_iconX');

    for (const icon of iconsX) {
        icon.addEventListener('click', handleRemoveSerie);
    }

}



btnSearch.addEventListener('click', handleButtonSearch);

function setFavorite() {
    localStorage.setItem("dataFav", JSON.stringify(dataFav));
}

function getFavorite() {
    dataFav = JSON.parse(localStorage.getItem("dataFav"));
    renderFav();
}

function handleResetFav() {
    dataFav = [];
    renderFav();
    setFavorite();
}
trashFav.addEventListener('click', handleResetFav);