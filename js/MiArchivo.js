

const getDollars = () => {

    const savedDollars = window.localStorage.getItem("dolaresGuardados");
    const savedDollarsParse = JSON.parse(savedDollars);

    return savedDollarsParse;

};
//Esta función se encarga de guardar la lista actualizada de dólares en el local storage del navegador
const saveDollars = (dollars) => {
    window.localStorage.setItem("dolaresGuardados", JSON.stringify(dollars));
};
//Esta función se encarga de eliminar un dólar específico de la lista en el local storage y actualizar la interfaz
const deleteDollar = (index) => {
    const allDollars = getDollars();
    allDollars.splice(index, 1);
    saveDollars(allDollars);
    deployDollars();
};
const deployDollars = () => {

    const allDollars = getDollars();

    const container = document.getElementById("contenedor");

    // Limpiar el contenedor antes de agregar los elementos actualizados
    container.innerHTML = "";
    // Agregar el contenido estatico de contenedorDolar
    container.innerHTML += `
    <div class="contenedorDolar">
        <span class="contenedor_data" id="blue">Fecha</span>
        <span class="contenedor_data" id="blue">Moneda</span>
        <span class="contenedor_data" id="blue">Compra</span>
        <span class="contenedor_data" id="blue">Venta</span>
        <span class="contenedor_data" id="blue">Acción</span>
    </div>
`;

    allDollars.map((dolar, index) => {

        const element = document.createElement("div");
        const currentDateTime = new Date().toLocaleString();
        dolar.fechaGuardado = currentDateTime;

        element.setAttribute("class", "contenedorDolar");

        const fecha = moment(dolar.fechaActualizacion).format('LLL')

        element.innerHTML = `
        <span class="contenedor_data" >${fecha}</span>
        <span class="contenedor_data">${dolar.nombre}</span>
        <span class="contenedor_data">${dolar.compra}</span>
        <span class="contenedor_data">${dolar.venta}</span>
        <span class="contenedor_data"><button class="borrar-boton" data-index="${index}">Borrar</button></span>
        `
        container.appendChild(element);

    })

    // Asignar evento a todos los botones de borrar
    const borrar_boton = document.querySelectorAll(".borrar-boton");
    borrar_boton.forEach(boton => {
        boton.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            deleteDollar(index);
        })
    })

    console.log()

};

const printData = () => {

    const allDollars = getDollars();

    const originalContent = document.body.innerHTML;

    const container = document.body;

    // Limpiar el contenedor antes de agregar los elementos actualizados
    container.innerHTML = "";
    // Agregar el contenido estatico de contenedorDolar
    container.innerHTML += `
    <div class="contenedorDolar">
        <span class="contenedor_data">Fecha</span>
        <span class="contenedor_data">Moneda</span>
        <span class="contenedor_data">Compra</span>
        <span class="contenedor_data">Venta</span>
    </div>
`;

    allDollars.map((dolar, index) => {

        const element = document.createElement("div");

        element.setAttribute("class", "contenedorDolar");

        const fecha = moment(dolar.fechaActualizacion).format('LLL')

        element.innerHTML = `
        <span class="contenedor_data">${fecha}</span>
        <span class="contenedor_data">${dolar.nombre}</span>
        <span class="contenedor_data">${dolar.compra}</span>
        <span class="contenedor_data">${dolar.venta}</span>
        `
        container.appendChild(element);

    })

    window.print();

    document.body.innerHTML = originalContent;

}

deployDollars();