'use strict';


//Recojo las constantes

const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.js_btnSearch');
const btnReset = document.querySelector('.js_btnReset');
const resultSearchSeries = document.querySelector('.js_resultSearchSeries');
const resultSeriesFav = document.querySelector('.js_resultSeriesFav');
const trashFav = document.querySelector('.js_trash');

//1111Para no escribir resul para css
inputSearch.value = 'sailor';


let data = [];

let dataFav = [];
//Recojo la info del Local
getFavorite();


function handleButtonSearch() {

    const inputSearchValue = inputSearch.value;
    fetch(`https://api.jikan.moe/v3/search/anime?q=${inputSearchValue}&limit=6`)
        .then(response => response.json())
        .then(dataSearch => {
            data = dataSearch.results;
            renderSerie();
        })
}

function renderSerie() {
    resultSearchSeries.innerHTML = "";
    let html = '';
    for (const serie of data) {
        let imgUrl = serie.image_url;
        if (imgUrl === null) {
            imgUrl = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        }
        html += `<div class="cardResult"><img class="cardResult__img js_imgResult" data-id="${serie.mal_id}" src="${imgUrl}" alt="${serie.title}"/>`;
        html += `<h3>${serie.title}</h3></div>`;
    }
    resultSearchSeries.innerHTML += html;

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

    let html = '';

    for (const serie of dataFav) {
        html += `<div class="cardFav"><i class="far fa-times-circle js_iconX" data-id=${serie.mal_id}></i>`;
        let imgUrl = serie.image_url;
        if (imgUrl === null) {
            imgUrl = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        }

        html += `<img class="js_imgResult" data-id="${serie.mal_id}" src="${serie.image_url}" alt="${serie.title}"/>`;
        html += `<h3>${serie.title}</h3></div>`;
    }
    resultSeriesFav.innerHTML = html;

    const iconsX = document.querySelectorAll('.js_iconX');

    for (const icon of iconsX) {
        icon.addEventListener('click', handleRemoveSerie);
    }

}



btnSearch.addEventListener('click', handleButtonSearch);

//LocalStorage

//Método para guardar favorito, cuando modifique el array
function setFavorite() {
    localStorage.setItem("dataFav", JSON.stringify(dataFav));
}

//Metodo para recoger favoritob cuando recargueb la pg
//Se dibuja cuando cuarga la pg lo llmamos
function getFavorite() {
    dataFav = JSON.parse(localStorage.getItem("dataFav"));
    //Redibujando el array, asivisualizamosel array de fav
    renderFav();
}

// Eliminar todo fav con papelera
function handleResetFav() {
    //valor de dataFav = vacio
    dataFav = [];
    renderFav();
    setFavorite();
}
trashFav.addEventListener('click', handleResetFav);


//1111Para no escribir resul para css
btnSearch.click();