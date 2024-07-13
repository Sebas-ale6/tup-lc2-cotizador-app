// Función para obtener el array de dólares desde localStorage
const getDollars = () => {
    const savedDollars = window.localStorage.getItem("dolaresGuardados");
    const savedDollarsParse = JSON.parse(savedDollars);
    return savedDollarsParse;
};

// Función principal para obtener y mostrar las cotizaciones del dólar desde el array
const getDollar = async () => {
    // Obtiene los elementos del DOM necesarios
    const input = document.getElementById("moneda"); // Campo de entrada para el tipo de dólar
    const container = document.getElementById("contenedor"); // Contenedor para los datos de la cotización
    const chartContainer = document.getElementById("chartContainer"); // Contenedor para el gráfico

    // Limpia el contenedor de datos
    container.innerHTML = "";

    // Obtiene los datos desde localStorage
    const dollars = getDollars();
    
    // Filtra los datos según el tipo de dólar seleccionado
    const selectedDollars = dollars.filter(dollar => dollar.nombre.toLowerCase() === input.value.toLowerCase());

    // Array para almacenar los puntos de datos del gráfico
    const dataPoints = [];

    // Variables para gestionar la variación del precio del dólar
    let variacion = "⏸";
    let precioPrevio = 0;

    // Bucle para mostrar las cotizaciones y llenar el array de puntos de datos
    selectedDollars.forEach((dolar) => {
        // Determina la variación del precio del dólar
        if (precioPrevio < dolar.venta) { 
            variacion = "⬆"; // El precio subió
        } else if (precioPrevio === dolar.venta) { 
            variacion = "⏸"; // El precio no cambió
        } else {
            variacion = "⬇"; // El precio bajó
        }

        // Crea un nuevo elemento div para mostrar los datos de la cotización
        const element = document.createElement("div");
        element.setAttribute("class", "contenedorDolar");

        // Rellena el div con los datos de la cotización
        element.innerHTML = `
            <span class="contenedor_data">${new Date(dolar.fecha).toLocaleDateString()}</span>
            <span class="contenedor_data">${dolar.casa}</span>
            <span class="contenedor_data">${Math.round(dolar.compra)}</span>
            <span class="contenedor_data">${Math.round(dolar.venta)}</span>
            <span class="contenedor_data">${variacion}</span>
        `;
        // Añade el div al contenedor principal
        container.appendChild(element);

        // Actualiza el precio previo para la siguiente iteración
        precioPrevio = dolar.venta;

        // Añade el punto de datos al array para el gráfico
        dataPoints.push({ x: new Date(dolar.fecha), y: parseFloat(dolar.venta) });
    });

    // Crea un nuevo gráfico usando CanvasJS
    const chart = new CanvasJS.Chart(chartContainer, {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Cotización del Dólar"
        },
        axisX: {
            valueFormatString: "DD MMM YYYY",
            labelAngle: -50
        },
        axisY: {
            title: "Valor en ARS",
            includeZero: false
        },
        data: [{
            type: "line",
            dataPoints: dataPoints
        }]
    });

    // Renderiza el gráfico
    chart.render();
};

// Añade un evento al botón de búsqueda para que ejecute la función getDollar al hacer clic
document.getElementById("botonBuscar").addEventListener("click", getDollar);
