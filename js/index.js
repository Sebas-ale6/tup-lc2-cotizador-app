const buttons = document.querySelectorAll(".boton-estrella");


window.addEventListener("DOMContentLoaded", () => {    //Recupera el estado de los botones desde localStorage cuando se carga la página
    buttons.forEach(button => {
        const buttonId = button.id;
        const isMarked = localStorage.getItem(buttonId)==='true';

        if (isMarked) {
            button.classList.add("marked");
            button.textContent = "Favorito";

        } else {

            button.classList.remove("marked");
            button.textContent = "Favorito";

        }
    });
});


buttons.forEach(button => {  // Itera sobre cada botón y agrega los EventListeners
    button.addEventListener("click", function(event) {
        const buttonId = event.target.id;
        const isMarked = event.target.classList.toggle("marked");

 
        localStorage.setItem(buttonId, isMarked);   // Se guarda el estado en el localStorage

        if (isMarked) {
            event.target.textContent = "Favorito";
        } else {
            event.target.textContent = "Favorito";
        }
    });

    button.addEventListener("mouseover", event => {
        if (!event.target.classList.contains("marked")) {
            event.target.style.backgroundColor = "yellow";
            event.target.textContent = "Favorito";
        }
    });

    button.addEventListener("mouseout", event => {
        if (!event.target.classList.contains("marked")) {
            event.target.style.backgroundColor = "rgb(73, 98, 210)";
            event.target.textContent = "Favorito";
        }
    });
});