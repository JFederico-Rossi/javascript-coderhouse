//CARRITO de COMPRAS

//FUNCIONES
function eleccionDeProducto(){
    let codigoProducto = prompt("AGREGAR PRODUCTOS AL CARRITO\nIngresá el producto que quieras agregar al carrito:\n 1 - Yoga mats - $15\n 2 - Tibetan bowl - $75\n 3 - Yoga blocks - $20\n 4 - Buddha - $ 100\n 5 - Meditation bench - $45\n 6 - Gong - $ 60\n 0 - SALIR");

    while (codigoProducto !== "0") {
        switch(codigoProducto){
            case "1": 
                monto += 15;
                break;

            case "2": 
                monto += 75;
                break;

            case "3": 
                monto += 20;
                break;

            case "4": 
                monto += 100;
                break;

            case "5": 
                monto += 45;
                break;

            case "6": 
                monto += 60;
                break;

            default: 
                alert("Ingresaste un producto incorrecto.");
                break;
        }

        codigoProducto= prompt("¿Querés seguir comprando? Ingresá el producto que quieras agregar al carrito:\n 1 - Yoga mats - $15\n 2 - Tibetan bowl - $75\n 3 - Yoga blocks - $20\n 4 - Buddha - $ 100\n 5 - Meditation bench - $45\n 6 - Gong - $ 60\n 0 - SALIR");

}
}

//INICIO DEL CÓDIGO

let monto = 0;

let operacion = prompt("Bienvenido\n¿Qué tipo de operación querés realizar?\n 1 - Agregar productos al carrito\n 2 - Ver el monto de tu carrito de compras \n 0 - SALIR"); 


while (operacion !== "0"){
    switch(operacion) {
        case "1":
            eleccionDeProducto();
        break;

        case "2":
            alert("El monto total de tu carrito de compras es: $ "+ monto);
            if (monto > 100){
                alert("Como tu compra supera los $100, ¡el envío es gratis!");
            }
        break;

        default: 
        alert("Ingresaste una opción inválida");
        break;
    }

    operacion = prompt("¿Querés seguir chusmeando nuestro sitio?\n 1 - Agregar productos a tu carrito\n 2 -  Ver el monto de tu carrito de compras\n 0 -  SALIR");
}

alert("Gracias por elegirnos. Esperamos verte de nuevo pronto por aquí")





