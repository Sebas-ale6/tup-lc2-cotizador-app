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
    const filteredDollars = input.value === "Todas" ? dollars : dollars.filter(dollar => dollar.nombre.toLowerCase() === input.value.toLowerCase());

    // Agrupar los datos por tipo de dólar
    const groupedDollars = filteredDollars.reduce((acc, dollar) => {
        if (!acc[dollar.nombre]) acc[dollar.nombre] = [];
        acc[dollar.nombre].push(dollar);
        return acc;
    }, {});

    // Array para almacenar las series de datos del gráfico
    const dataSeries = [];

    // Bucle para llenar el array de puntos de datos y mostrar las cotizaciones
    for (let [nombre, dolars] of Object.entries(groupedDollars)) {
        const dataPoints = [];
        let precioPrevio = 0;
        dolars.forEach((dolar) => {
            let variacion = "⏸";
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
                <span class="contenedor_data">${dolar.nombre}</span>
                <span class="contenedor_data">${dolar.compra}</span>
                <span class="contenedor_data">${dolar.venta}</span>
                <span class="contenedor_data">${variacion}</span>
            `;
            // Añade el div al contenedor principal
            container.appendChild(element);

            // Actualiza el precio previo para la siguiente iteración
            precioPrevio = dolar.venta;

            // Añade el punto de datos al array para el gráfico
            dataPoints.push({ x: new Date(dolar.fecha), y: parseFloat(dolar.venta) });
        });

        // Añade la serie de datos al array de series de datos
        dataSeries.push({
            type: "line",
            showInLegend: true,
            name: nombre,
            dataPoints: dataPoints
        });
    }

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
        data: dataSeries
    });

    // Renderiza el gráfico
    chart.render();
};

// Añade un evento al botón de búsqueda para que ejecute la función getDollar al hacer clic
document.getElementById("botonBuscar").addEventListener("click", getDollar);

// Llama a la función getDollar al cargar la página para mostrar todos los datos por defecto
window.onload = getDollar;
