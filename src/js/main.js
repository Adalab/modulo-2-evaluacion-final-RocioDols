'use strict';

//Recojo las constantes

const inputSearch = document.querySelector('.js_inputSearch');
console.log(inputSearch);
const btnSearch = document.querySelector('.js_btnSearch');
const btnReset = document.querySelector('.js_btnReset');
const resultSearchSeries = document.querySelector('.js_resultSearchSeries');

let data = [];
//Contruyo el fetch para comunicarme con el API



//Necesito que cuando haga una busqueda y le pulse al botón buscar se haga la petición, me creo una función y un lisener para el botón

function handleButtonSearch(event) {
    event.preventDefault();

    fetch(`https://api.jikan.moe/v3/search/anime?q=${inputSearch.value}`)
        .then(response => response.json())
        .then(dataSearch => {
            //guardo en data lo que me llega del fetch para poder trabajarla desde otros sitios
            data = dataSearch.results;
            renderSerie();
        });

}




btnSearch.addEventListener('click', handleButtonSearch);

//Una vez tenga los datos que me devuelve el API necesito pintarlo en el html, creo una función

function renderSerie() {

    resultSearchSeries.innerHTML = "";
    //No sabemos cuantos hay por eso vamos hacer un for 

    for (const serie of data) {

        const imageURL = serie.image_url;

        resultSearchSeries.innerHTML += `<img src="${imageURL}" alt="${serie.title}">`;
        resultSearchSeries.innerHTML += `<h3>"${serie.title}"</h3>`;
    }

}

