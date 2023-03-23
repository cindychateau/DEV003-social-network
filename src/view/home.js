import { authUser, logout, crearReseña, verReseñas, likeReseña, unlikeReseña, verReseñasOnSnapShot, eliminarReseña } from '../lib/firebase';
export default () => {

  const user = authUser();

  const viewLogin = `
    <div class = "container">
      <nav class="d-flex justify-content-between align-items-center">
          <h1>Bienvenid@ ${user.email}</h1>
          <a id="logout" href="#" class="btn btn-danger">Cerrar Sesión</a>
      </nav>
      <hr>
      <div class="row">
        <div class="col-md-4 col-xs-12">
          <h2>Escribe tu reseña</h2>
          <form>
            <div class="form-group mb-2">
              <input type="text" id="titulo" name="titulo" class="form-control" placeholder="Título" />
            </div>
            <div class="form-group mb-2">
              <input type="text" id="autor" name="autor" class="form-control" placeholder="Autor" />
            </div>
            <div class="form-group mb-2">
              <input type="text" id="año" name="año" class="form-control" placeholder="Año" />
            </div>
            <div class="form-group mb-2">
              <textarea id="reseña" name="reseña" class="form-control" placeholder="Reseña"></textarea>
            </div>
            <div class="form-group mb-2">
              <select id="calificacion" name="calificación" class="form-select">
                <option selected disabled>Seleccione una calificación</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <input id="btn-reseña" type="submit" value="Nueva Reseña" class="btn btn-warning" />
          </form>
        </div>
        <div id="books" class="col-md-8 col-xs-12">

        </div>
      </div>
    </div>
  `;

  const sectionElement = document.createElement('section');
  sectionElement.innerHTML = viewLogin;

  sectionElement.querySelector('#logout').addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });

  sectionElement.querySelector('#btn-reseña').addEventListener('click', (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const año = document.getElementById("año").value;
    const reseña = document.getElementById("reseña").value;
    const calificacion = document.getElementById("calificacion").value;
    const usuarioId = user.uid;

    crearReseña(titulo, autor, año, reseña, calificacion, usuarioId);

    document.getElementById("titulo").value = '';
    document.getElementById("autor").value = '';
    document.getElementById("año").value = '';
    document.getElementById("reseña").value = '';
    document.getElementById("calificacion").value = '';

  });

  verReseñasOnSnapShot((libros) => {
    const contenedorLibros = sectionElement.querySelector('#books');
    contenedorLibros.innerHTML = '';
    libros.docs.forEach((libro) => {
      // console.log(libroData);
      // const libro = libroData.data(); 
      // console.log(libro.key);
      const libroData = libro.data();
      contenedorLibros.innerHTML += `
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">${libroData.titulo} (${libroData.año})</h5>
              <h6 class="card-subtitle mb-2 text-muted">${libroData.autor}</h6>
              <p class="card-text">
                ${libroData.reseña}
              </p>

              ${libroData.usuarioId === user.uid ? `<button class="btn btn-danger btn-eliminar" data-id="${libro.id}">Eliminar</button>`:''}
            </div>
            <div class="card-footer">
              <small class="text-muted">${libroData.likes.length} likes</small>
              ${libroData.likes.includes(user.uid) ? `<button class="btn-unlike btn btn-danger" data-id="${libro.id}">Unlike</button>`:`<button class="btn-like btn btn-info" data-id="${libro.id}">Like</button>`}
            </div>
          </div>
      `;

    });

    const likeBtns = contenedorLibros.querySelectorAll('.btn-like');
    likeBtns.forEach((like) => {
      like.addEventListener('click', ({ target: { dataset } }) => {  
        likeReseña(dataset.id, user.uid);
      });
    });

    const unlikeBtns = contenedorLibros.querySelectorAll('.btn-unlike');
    unlikeBtns.forEach((unlike) => {
      unlike.addEventListener('click', ({ target: { dataset } }) => {  
        unlikeReseña(dataset.id, user.uid);
      });
    });

    const eliminarBtns = contenedorLibros.querySelectorAll('.btn-eliminar');
    eliminarBtns.forEach((reseña) => {
      reseña.addEventListener('click', ({ target: { dataset } }) => {
        
        let text = "¿Desea eliminar la reseña seleccionada?";
        if (confirm(text) == true) {
          eliminarReseña(dataset.id);
        }
      });
    });

  });


  return sectionElement;
};