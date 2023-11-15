// CARRITO de COMPRAS
let carritoMostrado = false;

// ARRAY vacío para ir almacenando los productos en el carrito de compras
let carrito = [];

//Ejecutar al refrescar la página
document.addEventListener("DOMContentLoaded", function () {
    
// FUNCIONES
function agregarAlCarrito(event){
    const card = event.target.closest(".card");
    const codigoProducto = card.id;

    const producto = productos[codigoProducto];

    if (producto){
        carrito.push(producto);
        console.log(`Producto agregado al carrito: ${producto.nombre}`);
        actualizarLocalStorage();

        Toastify({
            text: "El producto fue agregado al carrito",
            className: "toastify",
            duration: 2000,
            // destination: "https://github.com/apvarun/toastify-js",
            // newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "gba(27, 80, 145, 0.992)",      
            },
            onClick: function(){} // Callback after click
          }).showToast();

        } else {
        alert("Error: producto no encontrado");
        }
    }   

function quitarDelCarrito(event){
    const card = event.target.closest(".card");
    const codigoProducto = card.id;

    const producto = productos[codigoProducto];

    const productoIndex = carrito.indexOf(producto);

    if (productoIndex !== -1) { 
        carrito.splice(productoIndex, 1);
        console.log(`El producto ${producto.nombre} ha sido quitado del carrito`);

        Toastify({
            text: "El producto fue eliminado del carrito",
            className: "toastify-quitar",
            duration: 2000,
            // destination: "https://github.com/apvarun/toastify-js",
            // newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "rgba(125, 12, 12, 0.581)",      
            },
            onClick: function(){} // Callback after click
          }).showToast();


    } else {
        alert("Error: no puedes eliminar ese producto del carrito");
    }

    actualizarLocalStorage();
}

function actualizarLocalStorage(){
    localStorage.setItem("carrito",JSON.stringify(carrito));

}

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
        carrito.length = 0;
        carrito.push(...JSON.parse(carritoGuardado)); 
    }
    carritoMostrado = carrito.length > 0;

}

function mostrarCarrito() {
        let monto = 0;

        carrito.forEach((producto) => {
        monto += producto.precio;
        console.log(producto);
        });

        alert("El monto total de tu carrito de compras es: $ " + monto + ". \n\nOprimí el botón de Finalizar compra para ejecutar el pago");
        if (monto > 100) {
            alert("Como tu compra supera los $100, ¡el envío es gratis!");
        }
        carritoMostrado = false;
        actualizarLocalStorage();
    }

function vaciarLocalStorage (){
    if( localStorage.length !== 0){
        localStorage.removeItem("carrito");
        alert("¡Gracias por tu compra!")
    } else {
        alert("Todavia no seleccionaste productos");
    }
}

// INICIO DEL CÓDIGO

cargarCarritoDesdeLocalStorage();

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


//Obtengo los elementos del DOM para poder interactuar
const botonesAgregar = document.querySelectorAll(".boton-agregar");
const botonesQuitar = document.querySelectorAll(".boton-quitar");
const botonCarrito = document.getElementById("boton-carrito");
const botonComprar = document.getElementById("boton-comprar");

//Agrego eventos a los botones
botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
});

botonesQuitar.forEach((boton) =>{
    boton.addEventListener("click", quitarDelCarrito);
});

botonCarrito.addEventListener("click", () => {
    if (carrito.length > 0 && !carritoMostrado){
        mostrarCarrito();
        carritoMostrado = true; 
    } else if (carrito.length === 0){
        alert("No hay productos seleccionados en el carrito");
    }
    
});

botonComprar.addEventListener("click", ()=> {
    if (carrito.length !== 0) {
        window.open("#"); //Envía a página ficticia donde se supone que se haría la transacción y además limpia el LS
        vaciarLocalStorage();
        console.clear();
    }else {
        alert("Todavía no seleccionaste ningún producto");
    }
});
});
