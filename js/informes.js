const getDolarDate = async (name, date) => {
    const url = `https://api.argentinadatos.com/v1/cotizaciones/dolares/${name}/${date}`;
    const request = await fetch(url);
    const data = await request.json();
    return data;
};

const getDollar = async () => {
    const input = document.getElementById("moneda");
    const container = document.getElementById("contenedor");
    const chartContainer = document.getElementById("grafico");

    container.innerHTML = "";

    const dataPoints = [];

    let variacion = "⏸"
    let precioPrevio = 0;

    for (let i = 1; i <= 5; i++) {

        const date = moment().subtract(i, 'days').format('YYYY/MM/DD');
        const dolar = await getDolarDate(input.value.toLowerCase(), date);

        if(precioPrevio < Math.round(dolar.venta)){ 
            variacion ="⬇"
        }else if(precioPrevio == Math.round(dolar.venta)){ 
            variacion = "⏸" 
        }else{
            variacion = "⬆" 
        }

        const element = document.createElement("div");
        element.setAttribute("class", "contenedorDolar");

        element.innerHTML = `
        <span class="contenedor_data">${date}</span>
        <span class="contenedor_data">${dolar.casa}</span>
        <span class="contenedor_data">${Math.round(dolar.compra)}</span>
        <span class="contenedor_data">${Math.round(dolar.venta)}</span>
        <span class="contenedor_data">${variacion}</span>
        `;
        container.appendChild(element);

        if(precioPrevio == 0){ precioPrevio = dolar.venta }

        dataPoints.push({ x: new Date(date), y: parseFloat(dolar.venta) });

    }

    const chart = new CanvasJS.Chart(grafico, {
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

    chart.render();
};

document.getElementById("botonBuscar").addEventListener("click", getDollar);
