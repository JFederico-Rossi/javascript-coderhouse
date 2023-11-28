// CARRITO de COMPRAS
let carritoMostrado = false;
let carrito = [];
let productosCargados = {}; // Variable para almacenar los productos cargados


class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Obtengo los elementos del DOM para poder interactuar
const botonesAgregar = document.querySelectorAll(".boton-agregar");
const botonesQuitar = document.querySelectorAll(".boton-quitar");
const botonCarrito = document.getElementById("boton-carrito");
const botonComprar = document.getElementById("boton-comprar");

//Funciones
function agregarAlCarrito(event) {
    const card = event.target.closest(".card");
    const codigoProducto = card.id;
    const producto = productosCargados[codigoProducto];

    if (producto) {
        carrito.push(producto);
        console.log(`Producto agregado al carrito: ${producto.nombre}`);
        actualizarLocalStorage();
        mostrarToast("El producto fue agregado al carrito", "toastify");
    } else {
        alert("Error: producto no encontrado");
    }
}

function quitarDelCarrito(event) {
    const card = event.target.closest(".card");
    const codigoProducto = card.id;
    const producto = productosCargados[codigoProducto];
    const productoIndex = carrito.indexOf(producto);

    if (productoIndex !== -1) {
        carrito.splice(productoIndex, 1);
        console.log(`El producto ${producto.nombre} ha sido quitado del carrito`);
        mostrarToast("El producto fue eliminado del carrito", "toastify-quitar");
    } else {
        alert("Error: no puedes eliminar ese producto del carrito");
    }

    actualizarLocalStorage();
}

function actualizarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
    return new Promise((resolve, reject) => {
        const carritoGuardado = localStorage.getItem("carrito");

        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            carritoMostrado = carrito.length > 0;
            
            resolve();
        } else {
            cargarProductosDesdeJSON()
                .then(() => {
                    carritoMostrado = carrito.length > 0;
                    resolve(); 
                })
            }   
    });
}

function cargarProductosDesdeJSON() {
    return new Promise((resolve, reject) => {
        fetch('./productos.json')
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                productosCargados = responseJson.reduce((acc, item) => {
                    acc[item.id] = new Producto(item.nombre, item.precio);
                    return acc;
                }, {});
                resolve();
            })
            .catch(error => {
                console.error("No se pudo acceder a los datos", error);
                reject(error);
            });
    });
}

function mostrarToast(texto, className) {
    Toastify({
        text: texto,
        className: className,
        duration: 2000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: className === "toastify" ? "gba(27, 80, 145, 0.992)" : "rgba(125, 12, 12, 0.581)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

function mostrarCarrito() {
    let monto = 0;

    carrito.forEach((producto) => {
        monto += producto.precio;
        console.log(producto);
    });

    if (monto > 100) {
        alert("Como tu compra supera los $100, ¡el envío es gratis!");
    }

    alert("El monto total de tu carrito de compras es: $ " + monto + ". \n\nOprimí el botón de Finalizar compra para ejecutar el pago");
    
    

    carritoMostrado = false;
    actualizarLocalStorage();
}

function vaciarLocalStorage() {
    if (localStorage.length !== 0) {
        localStorage.removeItem("carrito");
        alert("¡Gracias por tu compra!")
    } else {
        alert("Todavía no seleccionaste productos");
    }
}

// Inicio del programa
document.addEventListener("DOMContentLoaded", () => {
    cargarProductosDesdeJSON().then(() => {
        cargarCarritoDesdeLocalStorage().then(() => {
       
        // Event Listeners para los botones adentro de la función que llama los productos del JSON para que se ejecuten una vez que la promesa fue resuelta
        botonesAgregar.forEach((boton) => {
            boton.addEventListener("click", agregarAlCarrito);
        });

        botonesQuitar.forEach((boton) => {
            boton.addEventListener("click", quitarDelCarrito);
        });

        botonCarrito.addEventListener("click", () => {
            if (carrito.length > 0 && !carritoMostrado) {
                mostrarCarrito();
                carritoMostrado = true;
            } else if (carrito.length === 0) {
                alert("No hay productos seleccionados en el carrito");
            }
        });

        botonComprar.addEventListener("click", () => {
            if (carrito.length !== 0) {
                
                window.open("#"); //Envía a página ficticia donde se supone que se haría la transacción y además limpia el LS
                vaciarLocalStorage();
                console.clear();
            } else {
                alert("Todavía no seleccionaste ningún producto");
            }
        });
        });
    });
});
