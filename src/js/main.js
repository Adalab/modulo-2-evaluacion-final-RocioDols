'use strict';


//Recojo las constantes

const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.js_btnSearch');
const btnReset = document.querySelector('.js_btnReset');
const resultSearchSeries = document.querySelector('.js_resultSearchSeries');
const resultSeriesFav = document.querySelector('.js_resultSeriesFav');
const trashFav = document.querySelector('.js_trash');
const form = document.querySelector('.js_form');


let data = [];

let dataFav = [];
//Recojo la info del Local
getFavorite();


function handleButtonSearch() {

    const inputSearchValue = inputSearch.value;
    fetch(`https://api.jikan.moe/v3/search/anime?q=${inputSearchValue}&limit=6`)
        .then(response => response.json())
        .then(dataSearch => {
            console.log(dataSearch);
            data = dataSearch.results;
            renderSerie();
        })
}

function renderSerie() {
    resultSearchSeries.innerHTML = "";
    let html = '';
    for (const serie of data) {
        //Saco el serie.image_url a una variable externa
        // let image_url
        let imgUrl = serie.image_url;
        console.log(serie.image_url);
        //Aqui no es null porque el api no tiene ninguna vacía, habria que encontrat en el valor de console.log(serie.image_url) un valor que no lleve imagen.
        if (imgUrl === null) {
            imgUrl = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        }
        //Me creo una variable  para añadir la clase de searchResultSelected 

        let searchResultSelected = '';
        let imgFlame = '';

        const serieFoundFav = dataFav.findIndex(serieFav => serieFav.mal_id === serie.mal_id);
        //Queremos aplicar la lógica de favorita para el icono de la llama
        //Si la encuentra te devuelve la posicion que ocupa en el array con lo cual es disto a -1 entraria en el bucle.
        // Cuando quieres que salga la llama? cuando encuentre la posicionId dentro de Fav
        if (serieFoundFav !== -1) {
            searchResultSelected = 'searchResultSelected';
            imgFlame = ` <img class="flameIcon" src="./assets/images/flame.png" />`;
        }


        html += `<div class="cardResult js_cardResult ${searchResultSelected}" data-id="${serie.mal_id}">${imgFlame}<img class="cardResult__img " src="${imgUrl}" alt="${serie.title}"/>`;
        html += `<h3 class="cardResult__title">${serie.title}</h3></div>`;
    }
    resultSearchSeries.innerHTML += html;

    const imgResults = document.querySelectorAll('.js_cardResult');

    for (const img of imgResults) {
        img.addEventListener('click', handleSerieFav);
    }
}

function handleSerieFav(ev) {
    //Aqui recojo el data que le puse a la img
    const clickSerieId = parseInt(ev.currentTarget.dataset.id);
    //Buscas en el arary de favoritos una serie cuyo id sea el mismo que el de la img seleccionada
    const foundSerieinFav = dataFav.findIndex(serie => serie.mal_id === clickSerieId);

    //Si no encuentra nada al cambiarlo a findIndex te devuelve -1
    if (foundSerieinFav === -1) {
        //si la serie no esta en favoritos, la añade.
        //LLamo al metodo y le paso el id de donde he clicado, le paso como paremetro xq
        addSerieFav(clickSerieId);
    } else {
        // aqui es para cuando le pincho a la misma img se eliminde de favoritos
        //La
        dataFav.splice(foundSerieinFav, 1);
        setFavorite();
    }
    //Tengo que pintarla si me la elimina lo hago aqui:
    renderFav();
}

function addSerieFav(clickSerieId) {
    //Esto proviene del if
    //Busco en el array de data la info de la serie clicada
    const selectedSerie = data.find(serie => serie.mal_id === clickSerieId);
    //Agrega el objeto que ha enontrado en data a dataFav
    dataFav.push(selectedSerie);
    //LLamamos al metodo set para que cuando agreguemos un elemto al array dataFav y se guarde tb en el local
    setFavorite();
    console.log(dataFav);
    renderFav();
}
//Eliminar con la x
//La manera de relacionar la X con la serie es poniendole a la x un data-id= mal_id que es el mismo id que puse a la img del render
function handleRemoveSerie(ev) {
    //Buscamos el id de donde se ha clicado, xq solo las x tienen este metodo
    const removeXId = parseInt(ev.currentTarget.dataset.id);
    console.log(removeXId);
    //Buscamos dentro del array fav la posicion 
    const foundRemoveX = dataFav.findIndex(serie => serie.mal_id === removeXId);
    //Eliminamos del array el elem
    dataFav.splice(foundRemoveX, 1);
    setFavorite();
    renderFav();
}

function renderFav() {

    let html = '';
    console.log(dataFav);
    for (const serie of dataFav) {
        html += `<div class="cardFav">`;
        let imgUrl = serie.image_url;
        if (imgUrl === null) {
            imgUrl = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        }

        html += `<img class="cardFav__img  js_imgResult" data-id="${serie.mal_id}" src="${serie.image_url}" alt="${serie.title}"/>`;
        html += `<h3 class="cardFav__titleFav">${serie.title}</h3><i class="far fa-times-circle js_iconX cardFav__iconX" data-id=${serie.mal_id}></i></div>`;
    }
    resultSeriesFav.innerHTML = html;
    //1 Necesito recoger todas las x le pongo una clase
    //La creo aqui porque solo se crea cuando se recarga la pg, si fuera un elemento fijo lo haría de manera global.
    const iconsX = document.querySelectorAll('.js_iconX');

    for (const icon of iconsX) {
        icon.addEventListener('click', handleRemoveSerie);
    }
    renderSerie();
}





//LocalStorage

//Método para guardar favorito, cuando modifique el array
function setFavorite() {
    localStorage.setItem("dataFav", JSON.stringify(dataFav));
}

//Metodo para recoger favoritob cuando recargueb la pg
//Se dibuja cuando cuarga la pg lo llmamos
function getFavorite() {
    //Esto te va a devolver un json y tenemos que convertir a un obj js
    //Hemos modificado el array dataFav
    //buscamos lo que hay en LocalStorage sobre dataFav 
    const localFav = localStorage.getItem("dataFav");

    console.log(localFav);

    if (localFav !== null) {
        dataFav = JSON.parse(localStorage.getItem("dataFav"));
        //Redibujando el array, asivisualizamosel array de fav
        renderFav();
    }
}

// Eliminar todo fav con papelera
function handleResetFav() {
    //valor de dataFav = vacio
    dataFav = [];
    renderFav();
    setFavorite();
}


btnSearch.addEventListener('click', handleButtonSearch);
trashFav.addEventListener('click', handleResetFav);
form.addEventListener('submit', (ev) => ev.preventDefault());

//Para no escribir resul para css
inputSearch.value = 'sailor';
btnSearch.click();

document.querySelector