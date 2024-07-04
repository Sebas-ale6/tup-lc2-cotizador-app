

const getDollars = () => {

    const savedDollars = window.localStorage.getItem("dolaresGuardados");
    const savedDollarsParse = JSON.parse(savedDollars);

    return savedDollarsParse;

};

const deployDollars = () => {

    const allDollars = getDollars();

    const container = document.getElementById("contenedor");

    allDollars.map((dolar)=>{

        const element = document.createElement("div");

        element.setAttribute("class", "contenedorDolar");

        const fecha = moment(dolar.fechaActualizacion).format('MMMM Do YYYY, h:mm:ss a')

        element.innerHTML = `
        <span class="contenedor_data">${fecha}</span>
        <span class="contenedor_data">${dolar.nombre}</span>
        <span class="contenedor_data">${dolar.compra}</span>
        <span class="contenedor_data">${dolar.venta}</span>
        <span class="contenedor_data">Borrar</span>
        `
        container.appendChild(element);

    })

};

deployDollars();
