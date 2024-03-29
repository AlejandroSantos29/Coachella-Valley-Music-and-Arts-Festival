document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  crearGaleria();
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
          <source srcset="build/img/thumb/${i}.avif" type="image/avif" />
          <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
          <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg"/>
    `;
    imagen.onclick = function () {
      mostrarImagen(i);
    };
    galeria.appendChild(imagen);
  }
}
function mostrarImagen(id) {
  const imagen = document.createElement("picture");
  imagen.innerHTML = `
          <source srcset="build/img/grande/${id}.avif" type="image/avif" />
          <source srcset="build/img/grande/${id}.webp" type="image/webp" />
          <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg"/>
    `;

  //Creando el overlay con la img
  const overlay = document.createElement("DIV");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");

  //Boton de cierre
  const cerrar = document.createElement("P");
  cerrar.textContent = "X";
  cerrar.classList.add("boton-cerrar");
  cerrar.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };
  overlay.appendChild(cerrar);

  //Anadiendolo al HTML
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}
