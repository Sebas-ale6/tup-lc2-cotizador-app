// Funcion para obtener un precio de dolar por fecha
// Parametros
// name: es el nombre del dolar a ver
// date: es la fecha que se quiere ver

const getDolarDate = async (name, date) => {
    // Construye la URL para la solicitud a la API con el nombre del tipo de dólar y la fecha
    const url = `https://api.argentinadatos.com/v1/cotizaciones/dolares/${name}/${date}`;
    // Hacemos una peticion a la API
    const request = await fetch(url);
    // Convierte la respuesta a JSON
    const data = await request.json();
    // Devuelve los datos obtenidos de la API
    return data;
};

// Función principal para obtener y mostrar las cotizaciones del dólar
const getDollar = async () => {

    // Obtiene los elementos del DOM necesarios
    const input = document.getElementById("moneda"); // Campo de entrada para el tipo de dólar
    const container = document.getElementById("contenedor"); // Contenedor para los datos de la cotización
    const chartContainer = document.getElementById("chartContainer"); // Contenedor para el gráfico

    // Limpia el contenedor de datos
    container.innerHTML = "";

    // Array para almacenar los puntos de datos del gráfico
    const dataPoints = [];

    // Variables para gestionar la variación del precio del dólar
    let variacion = "⏸";
    let precioPrevio = 0;

    // Bucle para obtener y mostrar la cotización de los últimos 5 días
    for (let i = 1; i <= 5; i++) {

        // Calcula la fecha correspondiente restando `i` días de la fecha actual
        const date = moment().subtract(i, 'days').format('YYYY/MM/DD');
        
        // Obtiene la cotización del dólar para la fecha calculada
        const dolar = await getDolarDate(input.value.toLowerCase(), date);

        // Determina la variación del precio del dólar
        if (precioPrevio < dolar.venta) { 
            variacion = "⬆"; // El precio subió
        } else if (precioPrevio == dolar.venta) { 
            variacion = "⏸"; // El precio no cambió
        } else {
            variacion = "⬇"; // El precio bajó
        }

        // Crea un nuevo elemento div para mostrar los datos de la cotización
        const element = document.createElement("div");
        element.setAttribute("class", "contenedorDolar");

        // Rellena el div con los datos de la cotización
        element.innerHTML = `
            <span class="contenedor_data">${date}</span>
            <span class="contenedor_data">${dolar.casa}</span>
            <span class="contenedor_data">${dolar.compra}</span>
            <span class="contenedor_data">${dolar.venta}</span>
            <span class="contenedor_data">${variacion}</span>
        `;
        // Añade el div al contenedor principal
        container.appendChild(element);

        // Actualiza el precio previo si es la primera iteración
        if (precioPrevio == 0) { 
            precioPrevio = dolar.venta; 
        }

        // Añade el punto de datos al array para el gráfico
        dataPoints.push({ x: new Date(date), y: parseFloat(dolar.venta) });
    }

    // Crea un nuevo gráfico usando CanvasJS
    const chart = new CanvasJS.Chart(chartContainer, {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Cotización del Dólar"
        },
        axisX: {
            valueFormatString: "YYYY/MM/DD",
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

// Añade un evento al botón de búsqueda para que ejecute la función `getDollar` al hacer clic
document.getElementById("botonBuscar").addEventListener("click", getDollar);
