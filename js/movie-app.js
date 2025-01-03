const movies = []

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
        title: el.title.value,
        image:el.image.value,
        genre:el.genre.value,
        date:el.date.value,
        score:el.score.value,
    }

    console.log(pelicula)

    //Agregar el objeto "pelicula" al array de "peliculas".



}) 

