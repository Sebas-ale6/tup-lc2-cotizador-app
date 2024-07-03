const getDolarData = async() => {

    const url = "https://dolarapi.com/v1/dolares";
    const request = await fetch(url);
    const data = await request.json();
    return data;

};

const getOtherData = async() => {

    const url = "https://dolarapi.com/v1/cotizaciones";
    const request = await fetch(url);
    const data = await request.json();
    return data;

};

const deployDollars = async() => {

    const dollars = await getDolarData();
    const others = await getOtherData();
    const allMoneys = [...dollars, ...others];

    const containerDollars = document.getElementById("containerDollars");

    allMoneys.map((dolar)=>{

        const element = document.createElement("div");

        element.setAttribute("class", "pizarra");

        element.innerHTML = `
        <div class="item">${dolar.nombre}</div>
        <div class="item"> Compra $${Math.round(dolar.compra)}</div>
        <div class="item"> Venta $${Math.round(dolar.venta)}</div>
        <button class="boton-estrella"><b>Favorito</b></button>`
        ; 

        containerDollars.appendChild(element);

    })

};

deployDollars();

const searchDollar = async() => {

    const dollars = await getDolarData();
    const others = await getOtherData();
    const allMoneys = [...dollars, ...others]
    const containerDollars = document.getElementById("containerDollars");
    const select = document.getElementById("moneda");

    containerDollars.innerHTML = "";

    if(select.value == "Todas"){

        allMoneys.map((dolar)=>{
    
                const element = document.createElement("div");
    
                element.setAttribute("class", "containerDollars");
        
                element.innerHTML = `
                <div class="item">${dolar.nombre}</div>
                <div class="item"> Compra $${Math.round(dolar.compra)}</div>
                <div class="item"> Venta $${Math.round(dolar.venta)}</div>
                <button class="boton-estrella"><b>Favorito</b></button>`
                ; 
        
                containerDollars.appendChild(element);
        })
    }else{

        allMoneys.map((dolar)=>{

            if(dolar.nombre == select.value){
    
                const element = document.createElement("div");
    
                element.setAttribute("class", "containerDollars");
        
                element.innerHTML = `
                <div class="pizarra">
                <div class="item">${dolar.nombre}</div>
                <div class="item"> Compra $${Math.round(dolar.compra)}</div>
                <div class="item"> Venta $${Math.round(dolar.venta)}</div>
                <button class="boton-estrella"><b>Favorito</b></button>
                </div>`; 
        
                containerDollars.appendChild(element);
            }
        })
    }


}
