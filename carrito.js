let productsPreBought = localStorage.getItem("productos-en-carrito");
productsPreBought = JSON.parse(productsPreBought);

const emptyCarContainer = document.querySelector("#carrito-vacio");
const productsCarContainer = document.querySelector("#carrito-productos");
const actionsCarBox= document.querySelector("#carrito-acciones");
const boughtCarBox = document.querySelector("#carrito-comprado");
let removeButtons = document.querySelectorAll(".carrito-producto-eliminar");
const deleteButton = document.querySelector("#carrito-acciones-vaciar");
const totalButton = document.querySelector("#total");
const purchaseButton = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productsPreBought && productsPreBought.length > 0) {

        emptyCarContainer.classList.add("disabled");
        productsCarContainer.classList.remove("disabled");
        actionsCarBox.classList.remove("disabled");
        boughtCarBox.classList.add("disabled");

        
        productsCarContainer.innerHTML = "";

        productsPreBought.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("carrito-producto");

            div.innerHTML = `
                <img class= "carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;

            productsCarContainer.append(div);
        
        })
        

    } else {
        emptyCarContainer.classList.remove("disabled");
        productsCarContainer.classList.add("disabled");
        actionsCarBox.classList.add("disabled");
        boughtCarBox.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();


function actualizarBotonesEliminar() {
    removeButtons = document.querySelectorAll(".carrito-producto-eliminar");

    removeButtons.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productsPreBought.findIndex(producto => producto.id === idBoton);

    console.log(productsPreBought);
    productsPreBought.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productsPreBought));
}


deleteButton.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
     
    productsPreBought.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productsPreBought));
    cargarProductosCarrito();
      
}


function actualizarTotal() {
    const totalAmount = productsPreBought.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalAmount}`;
}

purchaseButton.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    productsPreBought.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productsPreBought));
    
    emptyCarContainer.classList.add("disabled");
    productsCarContainer.classList.add("disabled");
    actionsCarBox.classList.add("disabled");
    boughtCarBox.classList.remove("disabled");

}
