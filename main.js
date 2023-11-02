// CARRITO de COMPRAS

// FUNCIONES

/* Dejo lista la función para agregar productos en el futuro pero no la llamo:

function agregarProductoAProductos(codigo, nombre, precio){
    productos[codigo]= new Producto (nombre, precio);
} 

*/

function eleccionDeProducto() {
    let codigoProducto = prompt("AGREGAR PRODUCTOS AL CARRITO\nIngresá el código del producto que quieras agregar al carrito:\n 1 - Yoga mats - $15\n 2 - Tibetan bowl - $75\n 3 - Yoga blocks - $20\n 4 - Buddha - $100\n 5 - Meditation bench - $45\n 6 - Gong - $60\n 0 - SALIR");

    if (codigoProducto === "0") {
        return;
    }

    const producto = productos[codigoProducto];
    if (producto) {
        carrito.push(producto);
    } else {
        alert("Ingresaste un código de producto incorrecto.");
    }

    eleccionDeProducto();
}

// INICIO DEL CÓDIGO

class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// OBJETO con productos y precios
const productos = {
    "1": new Producto ("Yoga mats",15),
    "2": new Producto ("Tibetan bowl",75),
    "3": new Producto ("Yoga blocks",20),
    "4": new Producto ("Buddha",100),
    "5": new Producto ("Meditation bench",45),
    "6": new Producto ("Gong",60),
};

// ARRAY vacío para ir almacenando los productos en el carrito de compras
const carrito = [];

let monto = 0;

let operacion = prompt("Bienvenido\n¿Qué tipo de operación querés realizar?\n 1 - Agregar productos al carrito\n 2 - Ver el monto de tu carrito de compras \n 0 - SALIR");

while (operacion !== "0") {
    switch (operacion) {
        case "1":
            eleccionDeProducto();
            break;

        case "2":
            if(carrito.length === 0){
                alert ("Todavía no elegiste ningún producto para agregar al carrito");
            } else {
                monto = 0; 
                carrito.forEach((producto) => {
                    monto += producto.precio;
                    console.log(producto);
            });

            alert("El monto total de tu carrito de compras es: $ " + monto);
            if (monto > 100) {
                alert("Como tu compra supera los $100, ¡el envío es gratis!");
            }
        }
            break;

        default:
            alert("Ingresaste una opción inválida");
            break;
    }

    operacion = prompt("¿Querés seguir chusmeando nuestro sitio?\n 1 - Agregar productos a tu carrito\n 2 - Ver el monto de tu carrito de compras\n 0 - SALIR");
}

alert("Gracias por elegirnos. Esperamos verte de nuevo pronto por aquí");
