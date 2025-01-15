const movies = [
     {
        id: 1000,
        title: 'The Godfather',
        genre: 'drama',
        date: 1972,
        score: 5,
        image: 'https://play-lh.googleusercontent.com/ZucjGxDqQ-cHIN-8YA1HgZx7dFhXkfnz73SrdRPmOOHEax08sngqZMR_jMKq0sZuv5P7-T2Z2aHJ1uGQiys'
    },
    {
        id: 1001,
        title: 'God of war',
        genre: 'drama',
        date: 1994,
        score: 2,
        image: 'https://i5.walmartimages.com/asr/5003a7b8-81c5-4803-beee-df5417f06bbe.1f75ffb05ff4e640f976691214312d6a.jpeg'
    },
    {
        id: 1002,
        title: 'The Dark Knight',
        genre: 'accion',
        date: 2008,
        score: 3,
        image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg'
    },
    {
        id: 1003,
        title: 'The Gladiator',
        genre: 'accion',
        date: 2000,
        score: 4,
        image: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png'
    },
    {
        id: 1004,
        title: 'Inception',
        genre: 'accion',
        date: 2010,
        score: 5,
        image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX190_CR0,0,190,281_.jpg'
    },
    {
        id: 1005,
        title: 'Django Unchained',
        genre: 'western',
        date: 2012,
        score: 3,
        image: 'https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_FMjpg_UX1000_.jpg'
    },
    {
        id: 1006,
        title: 'World war Z',
        genre: 'terror',
        date: 2013,
        score: 2,
        image: 'https://cafeanimelair.com/wp-content/uploads/2015/07/ww-z-1.jpg'
    },
]

let idEditando = null

const btnResetForm = document.getElementById("clear-form")

//Para que solo se puedan cargar peliculas que salen hasta el año actual.
const inputDateNumber = document.getElementById("date")


inputDateNumber.setAttribute("max", new Date().getFullYear())


// #Ordenar las peliculas según su nombre.

const ascTableNameBtn = document.querySelector(".fa-sort-up")
const descTableNameBtn = document.querySelector(".fa-sort-down")

ascTableNameBtn.addEventListener("click", function() {   //funcion de callback 
        ordenarPeliculas("asc")
})


descTableNameBtn.addEventListener("click", function() {   //funcion de callback 
        ordenarPeliculas("desc")
})

function ordenarPeliculas(ordenamiento, propiedad) {

    const sortedMovies = movies.toSorted(  (a, b)  => {  //sort modifica el array original.

        //condicion para el ordenamiento.
        // if( a.title.toLowerCase() > b.title.toLowerCase()) {
        //     return 1
        // }
        // if( a.title.toLowerCase() < b.title.toLowerCase()) {
        //     return -1
        // }
        // return 0

        // return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1

        // return a.title.localeCompare(b.title)   //metodo que funciona solo con strings.

        // if(ordenamiento === "asc") {
        //     return a.title.localeCompare(b.title)
        // }
        // if(ordenamiento === "desc") {
        //     return b.title.localeCompare(a.title)
        // }

        if(ordenamiento === "asc") {
            return a[propiedad].localeCompare(b[propiedad])
        }

        if(ordenamiento === "desc") {
            return b[propiedad].localeCompare(a[propiedad])
        }


    })

    pintarPeliculas(sortedMovies)

}


pintarPeliculas(movies)


//Obtener el formulario de carga de peliculas desde el DOM.
const moviesForm = document.getElementById("moviesForm")


// #Submit del formulario. 
moviesForm.addEventListener("submit", function(evento) {

    evento.preventDefault() //Ponerlo en la primer línea. Para detener el comportamiento de que se recargue la pagina al poner "Guardar".

    //En base a los datos ingresados por el usuario, voy a crear un objeto "pelicula" con las propiedades que necesito.
   
    // console.dir(evento.target.elements) //para acceder a los elementos del objeto.
    
    const el = evento.target.elements //guardando lo que hay en elements en la variable "el".
    // console.dir(el.title.value) // (en el value) veo lo que completo en el titulo.

    // const titulo = el.title.value //Al ponerlo asi, me ahorro de escribir toda esta ruta: 
    // // const titulo = evento.target.elements.title.value

    const pelicula = {
        // id: idEditando ? idEditando : Date.now(),
        id: idEditando || Date.now(),
        title: el.title.value,
        image:el.image.value,
        genre:el.genre.value,
        date:el.date.value,
        score:el.score.value,
    }

    console.log(pelicula) 


    if(idEditando) {
        // Significa que estoy editando una existente.

        const index = movies.findIndex(movie => {
            if(movie.id === idEditando) {
                return true 
            }
        })

        movies[index] = pelicula

    } else {  //Significa que estoy agregando una nueva
    //Agregar el objeto "pelicula" al array de "movies".
    movies.push(pelicula)
}
    resetForm()

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
                                    <button class="btn btn-primary" onclick="editarPelicula(${peli.id})">
                                        <i class="fa-solid fa-pencil"></i>
                                    </button>

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

// #Filtro de películas por nombre

// 1- Obtener el input de búsqueda desde el DOM


// 2- Escuchar el evento de input en el input de búsqueda
searchInput.addEventListener("input", function(evt) {
    // 3- Obtener el texto ingresado por el usuario
    const texto = evt.target.value.toLowerCase(); // god
    console.log(texto)
    // 4- Filtrar las películas en base al texto ingresado por el usuario
    // 4.1 Recorrer el array de peliculas 1 por 1
    const peliculasFiltradas = movies.filter((movie) => {
        
        const movieName = movie.title.toLowerCase() // the godfather
        // 4.2 Por cada película voy a checkear lo que el usuario ingresó en el input respecto al título de la película y en base a esto voy armar un nuevo array con las peliculas cuyo nombre incluya el texto ingresado por el usuario
        return movieName.includes(texto)
    })

    pintarPeliculas(peliculasFiltradas)
});


// -Filtro de películas por género

// #Editar película
function editarPelicula(id) {

    // Buscar la película en el array de películas por su id
    const pelicula = movies.find(peli => {

        // return peli.id === id
        if(peli.id === id) {
            return true
        }

    })
    // Vamos a rellenar el formulario con los datos de la película

    idEditando = pelicula.id

    const el = moviesForm.elements

    el.title.value = pelicula.title
    el.genre.value = pelicula.genre
    el.image.value = pelicula.image
    el.date.value = pelicula.date
    el.score.value = pelicula.score
    
    // Vamos a cambiar el texto del botón de submit

    const btn = moviesForm.querySelector("button[type='submit']")

    btn.innerText = "Editar"

    //Cambiar clases con JS
    btn.classList.remove("btn-primary") //Saca la clase solo si existe. 
    btn.classList.add("btn-success")

    //Toggle activa o desactiva una clase: 
    // btn.classList.toggle("btn-warning")

    //Contains verifica si un elemento contiene una clase y devuelve un booleano.
    // btn.classList.contains("btn")

    
    // Vamos a cambiar los estilos del formulario para que se vea diferente

    // moviesForm.classList.remove("bg-primary-subtle")
    moviesForm.classList.add("bg-success-subtle")

    btnResetForm.classList.remove("d-none")
    btnResetForm.style.border = "4px solid crimson"
    
    // Vamos a cambiar el evento de submit del formulario para que actualice la película en lugar de agregarla

}

btnResetForm.addEventListener("click", resetForm) //todo evento click ejecuta una funcion, por eso no hacen falta los (). 

function resetForm() {
    
    moviesForm.reset()
    moviesForm.elements.title.focus()

    if(idEditando) {

        btnResetForm.classList.add("d-none")

        idEditando = null
        moviesForm.classList.remove("bg-success-subtle")
        const btn = moviesForm.querySelector("button[type='submit']")
        btn.innerText = "Cargar"
        btn.classList.remove("btn-success")
        btn.classList.add("btn-primary")
    }

}




 


