'use strict';

//Recojo las constantes

const inputSearch = document.querySelector('.js_inputSearch');
console.log(inputSearch);
const btnSearch = document.querySelector('.js_btnSearch');
const btnReset = document.querySelector('.js_btnReset');
const resultSearchSeries = document.querySelector('.js_resultSearchSeries');
const resultSeriesFav = document.querySelector('.js_resultSeriesFav');

//Necesitamos guardar la info del servidor,lo pongo let porqque le voy a asignar un vcalkor dentoro del fetch
let data = [];
//ArrayFavori
let dataFav = [];

//Necesito que cuando haga una busqueda y le pulse al botón buscar se haga la petición, me creo una función y un lisener para el botón


function handleButtonSearch() {
    let inputSearchww = inputSearch.value;
    fetch(`https://api.jikan.moe/v3/search/anime?q=${inputSearchww}&limit=3`)
        .then(response => response.json())
        .then(dataSearch => { //Todo lo que lega del servidor
            //guardo en data lo que me llega del fetch para poder trabajarla desde otros sitios
            data = dataSearch.results;//el result es el que trael el arrray de imagenes

            renderSerie();//Para pintar lod datos de la búsqueda no puedo pintarlos.Es el then quien tiene las imagenes xq es asincrono
            console.log(dataSearch);
        });
}

//Una vez tenga los datos que me devuelve el API necesito pintarlo en el html, creo una función

function renderSerie() {
    resultSearchSeries.innerHTML = "";//Como vamos a concatenar el texto queremos borrar lo quie había
    //No sabemos cuantos hay por eso vamos hacer un for 
    //Lo recorre una vez por cada serie
    for (const serie of data) {
        const imageURL = serie.image_url;//image_url es un atributo que esta dentro del data
        console.log(imageURL);
        resultSearchSeries.innerHTML += `<img class="js_image" src="${imageURL}" alt="${serie.title}" data-id="${serie.mal_id}">`;
        resultSearchSeries.innerHTML += `<h3>"${serie.title}"</h3>`;
    }
    //Esta tengo que crearlo justo despues se crea
    //Creo un array local de imagenes xq solo voy a usar ese array para ponerle los eve a las img
    const imagesArray = document.querySelectorAll('.js_image');
    for (const img of imagesArray) {
        img.addEventListener('click', handleSerieFav);
    }
}

function handleSerieFav(ev) {
    const favImgId = ev.currentTarget.dataset.id;
    // console.dir(favImgId);
    //Qioero guardar el objeto de data, la img ocard que pinche dentro de un array dataFav
    //En data vamos a buscar el id el gancho que le hemos puesto en el html data.find cada elemento del array es una serie
    //Aqui se guarda el objeto a la imagen que ha sido clicada
    const foundSerieData = data.find(serie => serie.mal_id === parseInt(favImgId));//Me llevo todo el objeto
    // console.log(foundSerieData);
    //Ahora agregamosn 

    //Hago lo mismo para favoritos, tengto que buscar el onjeto en favoritos para comprobar si ya lo tengo, me valo para imagenes fav o del listado.Al pincxhar en normal te busca en favoritos, si el find no encuentra nada te devuelve un undefined.
    const foundSerieFav = dataFav.find(serie => serie.mal_id === parseInt(favImgId));



    if (foundSerieFav === undefined) {

        dataFav.push(foundSerieData);
        //Hay que evitar que se repita el mismo
        //Hay que hacer el render tb para este array para que se pinte
        renderSeriesFav();
    }
}

function renderSeriesFav() {
    resultSeriesFav.innerHTML = '';
    for (const serie of dataFav) {
        const imageURL = serie.image_url;//image_url es un atributo que esta dentro del data
        console.log(imageURL);
        resultSeriesFav.innerHTML += `<img class="js_image" src="${imageURL}" alt="${serie.title}" data-id="${serie.mal_id}">`;
        resultSeriesFav.innerHTML += `<h3>"${serie.title}"</h3>`;
    }
    //
    //No tengo que hacer un bucle xq son las x las que se encargarán de quitar o borrar la fav
}



btnSearch.addEventListener('click', handleButtonSearch);

//Favoritas: Necesitamos un evento sobre los resultados de las imagenes y un listado donde almacenar favoritos
