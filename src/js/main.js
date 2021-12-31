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
        //Saco el serie.image_url a una variable externa
        // let image_url
        let imgUrl = serie.image_url;
        if (imgUrl === null) {
            imgUrl = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        }

        resultSearchSeries.innerHTML += `<img class="js_imgResult" data-id=${serie.mal_id} src=${imgUrl} alt=${serie.title}/>`;
        resultSearchSeries.innerHTML += `<h2/>${serie.title}</h2>`;
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
        //Si no encuentra nada al cambiarlo a findIndex te devuelve -1
        addSerieFav(clickSerieId);
    } else {
        // aqui es para cuando le pincho a la misma img se eliminde de favoritos
        dataFav.splice(foundSerieinFav, 1);
    }
    //Tengo que pintarla si me la elimina lo hago aqui:
    renderFav();
}

function addSerieFav(clickSerieId) {
    const selectedSerie = data.find(serie => serie.mal_id === clickSerieId);
    dataFav.push(selectedSerie);
    console.log(dataFav);
    renderFav();
}
//Eliminar con la x
//La manera de relacionar la X con la serie es poniendole a la x un data-id= mal_id que es el mismo id que puse a la img del render
function handleRemoveSerie() {
    //Buscamos el id de donde se ha clicado
    const removeXId = parseInt(ev.currentTarget.dataset.id);
    //Buscamos dentro del array fav la posicion 
    const foundRemoveX = dataFav.findIndex(serie => serie.mal_id === removeXId);



}




function renderFav() {
    resultSeriesFav.innerHTML = '';

    for (const serie of dataFav) {
        resultSeriesFav.innerHTML += `<i class="far fa-times-circle js_iconX" data-id=${serie.mal_id}></i>`;
        let imgUrl = serie.image_url;
        if (imgUrl === null) {
            imgUrl = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        }

        resultSeriesFav.innerHTML += `<img class="js_imgResult" data-id=${serie.mal_id} src=${serie.image_url} alt=${serie.title}/>`;
        resultSeriesFav.innerHTML += `<h2/>${serie.title}</h2>`;
    }
    //1 Necesito recoger todas las x le pongo una clase
    const iconsX = document.querySelectorAll('.js_iconX');

    for (const icon of iconsX) {
        icon.addEventListener('click', handleRemoveSerie);
    }

}



btnSearch.addEventListener('click', handleButtonSearch);

//