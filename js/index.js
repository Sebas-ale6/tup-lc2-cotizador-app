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
    dolaresGuardadosParse.push(dolar);

    //guardamos el array, ahora con el nuevo dolar agregado en el almacenamiento local
    window.localStorage.setItem("dolaresGuardados", JSON.stringify(dolaresGuardadosParse));

}

const deployDollars = async() => {

    //obtenemos las cotizaciones de dolares
    const dollars = await getDolarData();

    //obtenemos las cotizaciones de otras monedas
    const others = await getOtherData();

    //creo un array con los datos de los arrays anteriores
    const allMoneys = [...dollars, ...others];

    //selecciono el div que contendra las cotizaciones
    const containerDollars = document.getElementById("containerDollars");

    //tomamos el array de monedas y usamos el metodo .map() para ejecutar una funcion por cada moneda que haya
    allMoneys.map( (dolar)=>{

        //creamos un div
        const element = document.createElement("div");

        //creamos el elemento button
        const button = document.createElement("button");

        //al div, le asignamos la class, pizarra
        element.setAttribute("class", "pizarra");

        button.setAttribute("class", "boton-estrella"); //al button, le asignamos la class, boton-estrella
        
        button.setAttribute("onclick", `saveDollar(${JSON.stringify(dolar)})`)
        //al button, le asignamos un onclick, que va a ejecutar la funcion saveDollar, pasandole como parametro el objeto dolar
        //JSON.stringify sirve para convertir un objeto json a string

        element.innerHTML = `
        <div class="item">${dolar.nombre}</div>
        <div class="item"> Compra $${Math.round(dolar.compra)}</div>
        <div class="item"> Venta $${Math.round(dolar.venta)}</div>`
        ; 

        button.innerHTML = "Guardar";

        //metemos el button dentro del div
        element.appendChild(button);

        //metemos el div dentro del contenedor containerDollars
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
    
                element.setAttribute("class", "pizarra");
        
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
    
                element.setAttribute("id", "containerDollars");
        
                element.innerHTML = `
                <div class="pizarra">
                <div class="item">${dolar.nombre}</div>
                <div class="item"> Compra $${Math.round(dolar.compra)}</div>
                <div class="item"> Venta $${Math.round(dolar.venta)}</div>
                <button class="boton-estrella"><b>Favorito</b></button>
                </div>
                <div><p> Fecha de actualizacion: ${new Date(dolar.fechaActualizacion)}</p></div>`;
        
                containerDollars.appendChild(element);
            }
        })
    }


}