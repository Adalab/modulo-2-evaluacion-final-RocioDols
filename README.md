<h1> Módulo 2: Ejercicio de evaluación final de JavaScript</h1>


[![anime-finder.png](https://i.postimg.cc/zXxdfBzQ/anime-finder.png)](https://postimg.cc/vc67qG67)


<h2> 🍒 Enunciado: </h2>

  <p>El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de anime, que nos permite des/marcar las series como favoritas y guardarlas en local storage. El ejercicio también tiene una parte de maquetación con HTML y SASS.</p>

<h2>1. Estructura básica:<h2>
<p>La aplicación de búsqueda de serie consta de dos partes:</p>

  <li>Un campo de texto y un botón para buscar series por su título.</li>
  <li>Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.</li>

  <h2>2. Búsqueda </h2>

<ul>
  <li>Al hacer clic sobre el botón de Buscar, la aplicación debe conectarse al API abierto de Jikan para la búsqueda de series anime.</li>
  <li>Para construir la URL de búsqueda hay que recoger el texto que ha introducido la usuaria en el campo de búsqueda</li>
  <li>Por cada serie de contenido en el resultado de la búsqueda, hay que pintar una tarjeta donde mostramos una imagen de la serie y el título.</li>
  <li>Algunas de las series que devuelve el API no tiene imagen. En ese caso hay que mostrar una imagen de relleno.</li>
  <li>Para pintar la información en la página, se puede elegir entre hacerlo de forma básica con innerHTML o manipulando de forma avanzada el DOM.</li>
</ul>
<h2> 3. Favoritos</h2>
  
[![anime-finder-2.png](https://i.postimg.cc/MGB2RRXH/anime-finder-2.png)](https://postimg.cc/JyR2CsNC)
  
  
<p>Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son sus series favoritas. Para ello, al hacer clic sobre una serie debe pasar lo siguiente:</p>
<ul>
  <li>El color de fondo y el de fuente se intercambian, indicando que es una serie favorita.</li>
  <li>Hay que mostrar un listado en la parte izquierda de la pantalla, debajo del formulario de     búsqueda, con las series favoritas. Os recomendamos crear un variable o constante de tipo array en JS para almacenar las series favoritas.
</li>
  <li>Las series favoritas deben seguir apareciendo a la izquierda aunque la usuaria realice otra búsqueda.
</li>
</ul>

  <h2>4. Almacenamiento local </h2>

<p>Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado de favoritos debe mostrarse.</p>

  <h2>5. BONUS: Borrar favoritos </h2>

<p>Como bonus, os proponemos la opción de borrar favoritos. Al hacer clic sobre el icono de una 'x' al lado de cada favorito, hay que borrar el favorito clicado de la lista y del localStorage.</p>
<p>Para terminar de rematar nuestra app de series, nos gustaría poder añadir/quitar como favorito al hacer clic sobre una serie del lado de la derecha. Y que, si realizamos una nueva búsqueda y sale una serie que ya es favorita, aparezca ya resaltada en los resultados de búsqueda (con colores de fondo y texto intercambiados).</p>
<p>Y ya sería fantástico si al final de la lista de favoritos hay un botón para borrarlos todos los favoritos a la vez.</p>

  <h2>6. BONUS: Afinar la maquetación</h2>

<p>Una vez terminada la parte de interacción, podemos centrarnos en la parte de maquetación donde tenéis libertad para decidir los estilos. En cualquier caso os dejamos una propuesta gráfica.</p>



---

  <h2>Instalación</h2>

  <p>Instala el proyecto con npm</p>

  <p>bash</p>
  <p>npm install</p>
  <p>npm start</p>
