const movies = [
     {
        id: 1000,
        title: 'The Godfather',
        genre: 'Drama',
        date: 1972,
        score: 5,
        image: 'https://play-lh.googleusercontent.com/ZucjGxDqQ-cHIN-8YA1HgZx7dFhXkfnz73SrdRPmOOHEax08sngqZMR_jMKq0sZuv5P7-T2Z2aHJ1uGQiys'
    },
    {
        id: 1001,
        title: 'God of war',
        genre: 'Drama',
        date: 1994,
        score: 2,
        image: 'https://i5.walmartimages.com/asr/5003a7b8-81c5-4803-beee-df5417f06bbe.1f75ffb05ff4e640f976691214312d6a.jpeg'
    },
    {
        id: 1002,
        title: 'The Dark Knight',
        genre: 'Action',
        date: 2008,
        score: 3,
        image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg'
    },
]

pintarPeliculas(movies)


//Obtener el formulario de carga de peliculas desde el DOM.
const moviesForm = document.getElementById("moviesForm")


//Necesito escuchar cuando el usuario envie el formulario. 
moviesForm.addEventListener("submit", function(evento) {

    evento.preventDefault() //Ponerlo en la primer línea. Para detener el comportamiento de que se recargue la pagina al poner "Guardar".

    //En base a los datos ingresados por el usuario, voy a crear un objeto "pelicula" con las propiedades que necesito.
   
    // console.dir(evento.target.elements) //para acceder a los elementos del objeto.
    
    const el = evento.target.elements //guardando lo que hay en elements en la variable "el".
    // console.dir(el.title.value) // (en el value) veo lo que completo en el titulo.

    // const titulo = el.title.value //Al ponerlo asi, me ahorro de escribir toda esta ruta: 
    // // const titulo = evento.target.elements.title.value

    const pelicula = {
        id: new Date().getTime(),
        title: el.title.value,
        image:el.image.value,
        genre:el.genre.value,
        date:el.date.value.slice(0, 4),
        score:el.score.value,
    }

    console.log(pelicula)

    //Agregar el objeto "pelicula" al array de "movies".

    movies.push(pelicula)

    pintarPeliculas(movies)

}) 

//Crear una funcion que reciba un array, lo recorra y pinte una <tr></tr> por cada pelicula.

function pintarPeliculas(arrayPeliculas) {
    const tbody = document.querySelector("tbody") //cuando son muchas cards. Puede ser por nombre de etiqueta o por clase (obtiene el primer elemento con esa clase o etiqueta) o por id.

    //Vaciar el body:
    tbody.innerHTML=""

    arrayPeliculas.forEach((peli) => {
        tbody.innerHTML += `<tr>
                        <td class="image-cell">
                            <img loading="lazy" src="${peli.image}" alt="${peli.title} image">
                        </td>
                        <td class="name-cell">
                            <div class="name">${peli.title}</div>
                        </td>
                        <td class="genre-cell">
                            <div class="genre">
                                ${peli.genre}
                            </div>
                        </td>
                        <td class="score-cell">
                            <div class="scrore">
                                ${peli.score}
                            </div>
                        </td>
                        <td class="date-cell">
                            <div class="date">
                                ${peli.date}
                            </div>
                        </td>
                        <td class="actions-cell">
                            <div class="actions">
                                <button class="btn btn-primary"><i class="fa-solid fa-pencil"></i></button>

                                    <button data-bs-toggle="modal" data-bs-target="#detalle-pelicula" class="btn btn-success" onclick="mostrarDetalle(${peli.id})">
                                    <i class="fa-solid fa-eye"></i>
                                    </button>

                                <button class="btn btn-danger" onclick="eliminarPelicula(${peli.id})"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>`
    })

}

// pintarPeliculas(movies)


//Filtro de peliculas por nombre

// 1- Obtener input de búsqueda desde el DOM
const searchInput = document.getElementById("search")
console.log(searchInput)

// 2- Escuchar el evento de input en el input de bísqueda.
searchInput.addEventListener("input", function(evt) {

    //3- Obtener el texto ingresado.
    const texto = evt.target.value.toLocaleLowerCase() // lo que escribe el usuario en la cajota de busqueda. 

    console.log(texto)

    //4- Filtrar las peliculas en base al texto ingresado por el usuario.
    //4.1- Recorrer el array de peliculas 1 por 1.

    const peliculasFiltradas = movies.filter((movie) => {
        // console.log(movie.title)
        const movieName = movie.title.toLocaleLowerCase()

            //4.2- Por cada pelicula voy a checkear lo que el usuario escribio respecto al titulo de la pelicula y en base a esto voy a armar un array con las peliculas cuyo nombre incluya el texto ingresado por el usuario.
           return movieName.includes(texto)
 
    })

    // - Pintar las peliculas filtradas:
    pintarPeliculas(peliculasFiltradas)

})

// #Borrar peliculas del array.
//Vamos a escuchar cuando la persona hace click en el boton eliminar.
//Cuando presione el boton, enviar el ID de la peli que queremos borrar. 
function eliminarPelicula(identificador) {
    console.log("Pelicula a elimianar", identificador)

    //Tengo que buscar en el array la peli correspondiente con findIndex.
    // const index = movies.findIndex(pelicula => identificador === pelicula.id)
    const index = movies.findIndex(pelicula => {
        //El valor que recibi de mi fn "identificador" sea igual al valor que tiene pelicula.id.

        // return identificador === pelicula.id

        if(identificador === pelicula.id) {

            return true

        } else {

            return false 

        }
    })

    const isConfirm = confirm("Realmente desde eliminar la película?")

    if(isConfirm) {

        //Teniendo la posicion (index) de la peli, tomamos el array orig y aplicamos splice.
        movies.splice(index, 1)

        pintarPeliculas(movies)
    }

}

//Mostrar detalle de la pelicula en un modal.
function mostrarDetalle(ID) {

    // const modalHTML = document.querySelector("#detalle-pelicula")
    const modalTitleHTML = document.querySelector("#detalle-title")
    const modalBodyHTML = document.querySelector("#detalle-body")

    const pelicula = movies.find(movie => {

        return movie.id === ID

    } )

    modalTitleHTML.innerText = pelicula.title

    modalBodyHTML.innerHTML = `  <div class="row">
                                <div class="col-6">
                                <img src="${pelicula.image}" class="w-100">
                                </div>
                                <div class="col-6">
                                <span class="badge text-bg-secondary">${pelicula.genre}</span>
                                </div>
                            </div>   `

}

// #Ordenar las peliculas en base a su puntuacion. 


