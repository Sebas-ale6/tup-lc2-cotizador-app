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

const saveDollar = async(dolar) => {

    //tomo el array de dolares
    const dolaresGuardados = window.localStorage.getItem("dolaresGuardados");

    //convierto los dolares guardados a formato array
    const dolaresGuardadosParse = JSON.parse(dolaresGuardados)||[];

    //agregamos el dolar seleccionado al array de dolares
    dolaresGuardadosParse.push({...dolar, fecha:Date.now()});

    //guardamos el array, ahora con el nuevo dolar agregado en el almacenamiento local
    window.localStorage.setItem("dolaresGuardados", JSON.stringify(dolaresGuardadosParse));

}

const deployDollars = async() => {

    const dollars = await getDolarData();
    const others = await getOtherData();
    const allMoneys = [...dollars, ...others];
    const containerDollars = document.getElementById("containerDollars");

    allMoneys.map( (dolar)=>{

        const element = document.createElement("div");
        const button = document.createElement("button");
        element.setAttribute("class", "pizarra");

        button.setAttribute("class", "boton-estrella");
        button.setAttribute("onclick", `saveDollar(${JSON.stringify(dolar)})`)

        element.innerHTML = `
        <div class="item">${dolar.nombre}</div>
        <div class="item"> Compra $${Math.round(dolar.compra)}</div>
        <div class="item"> Venta $${Math.round(dolar.venta)}</div>`
        ; 

        button.innerHTML = "Guardar";
        element.appendChild(button);
        containerDollars.appendChild(element);

    } )

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
                const button = document.createElement("button");
    
                element.setAttribute("class", "pizarra");

                
                button.setAttribute("class", "boton-estrella");
                button.setAttribute("onclick", `saveDollar(${JSON.stringify(dolar)})`)
        
                element.innerHTML = `
                <div class="item">${dolar.nombre}</div>
                <div class="item"> Compra $${Math.round(dolar.compra)}</div>
                <div class="item"> Venta $${Math.round(dolar.venta)}</div>`
                ; 

                button.innerHTML = "Guardar";
                element.appendChild(button);

                containerDollars.appendChild(element);
        })
    }else{

        allMoneys.map((dolar)=>{

            if(dolar.nombre == select.value){
    
             const element = document.createElement("div");
                const button = document.createElement("button");
    
                element.setAttribute("class", "pizarra");

                
                button.setAttribute("class", "boton-estrella");
                button.setAttribute("onclick", `saveDollar(${JSON.stringify(dolar)})`)
        
                element.innerHTML = `
                <div class="item">${dolar.nombre}</div>
                <div class="item"> Compra $${Math.round(dolar.compra)}</div>
                <div class="item"> Venta $${Math.round(dolar.venta)}</div>`
                ; 

                button.innerHTML = "Guardar";
                element.appendChild(button);
                        
                containerDollars.appendChild(element);
            }
        })
    }
}
