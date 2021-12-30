'use strict';

//Recojo las constantes

const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.js_btnSearch');
const btnReset = document.querySelector('.js_btnReset');
const resultSearchSeries = document.querySelector('.js_resultSearchSeries');
const resultSeriesFav = document.querySelector('.js_resultSeriesFav');

let data = [];

let dataFav = [];


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
        resultSearchSeries.innerHTML += `<img class="js_imgResult" data-id=${serie.mal_id} src=${serie.image_url} alt=${serie.title}/>`;
        resultSearchSeries.innerHTML += `<h2/>${serie.title}</h2>`;
    }

    const imgResults = document.querySelectorAll('.js_imgResult');

    for (const img of imgResults) {
        img.addEventListener('click', handleSerieFav);
    }
}

function handleSerieFav(ev) {

    const clickSerieId = parseInt(ev.currentTarget.dataset.id);

    const foundSerieinFav = dataFav.find(serie => serie.mal_id === clickSerieId);

    if (foundSerieinFav === undefined) {
        addSerieFav(clickSerieId);
    }
}

function addSerieFav(clickSerieId) {
    const serieClicada = data.find(serie => serie.mal_id === clickSerieId);
    dataFav.push(serieClicada);
    console.log(dataFav);
    renderFav();
}



function renderFav() {
    resultSeriesFav.innerHTML = '';

    for (const serie of dataFav) {
        resultSeriesFav.innerHTML += `<img class="js_imgResult" data-id=${serie.mal_id} src=${serie.image_url} alt=${serie.title}/>`;
        resultSeriesFav.innerHTML += `<h2/>${serie.title}</h2>`;
    }
}

btnSearch.addEventListener('click', handleButtonSearch);