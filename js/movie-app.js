const movies = [
     {
        id: 1,
        title: 'The Godfather',
        genre: 'Drama',
        date: 1972,
        score: 5,
        image: 'https://play-lh.googleusercontent.com/ZucjGxDqQ-cHIN-8YA1HgZx7dFhXkfnz73SrdRPmOOHEax08sngqZMR_jMKq0sZuv5P7-T2Z2aHJ1uGQiys'
    },
    {
        id: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        date: 1994,
        score: 2,
        image: 'https://i5.walmartimages.com/asr/5003a7b8-81c5-4803-beee-df5417f06bbe.1f75ffb05ff4e640f976691214312d6a.jpeg'
    },
    {
        id: 3,
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
        id: crypto.randomUUID(),
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
                                <button class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>`
    })

}

// pintarPeliculas(movies)


