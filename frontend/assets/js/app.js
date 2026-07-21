// 1. Inicializar la SPA al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
    
    // Escuchar el envío del formulario para interceptarlo
    const formulario = document.getElementById("formulario-producto");
    if (formulario) {
        formulario.addEventListener("submit", registrarNuevoProducto);
    }
});

// 2. Capturar los datos del formulario y guardarlos localmente
function registrarNuevoProducto(evento) {
    evento.preventDefault(); // Evita que la página web se recargue por completo

    // Capturar los valores de los inputs del HTML
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const categoria = document.getElementById("categoria").value;
    const imagen = document.getElementById("imagen").value;
    const descripcion = document.getElementById("descripcion").value;

    // Traer la base de datos simulada del navegador o crear una vacía
    let inventario = JSON.parse(localStorage.getItem("db_productos")) || [];

    // Estructurar el nuevo objeto producto (Generamos un ID único usando la fecha actual)
    const nuevoProducto = {
        id: Date.now(),
        title: nombre,
        price: precio,
        category: categoria,
        image: imagen,
        description: descripcion
    };

    // Guardar el objeto en el arreglo y actualizar el LocalStorage
    inventario.push(nuevoProducto);
    localStorage.setItem("db_productos", JSON.stringify(inventario));

    // Limpiar los campos del formulario para un nuevo registro
    document.getElementById("formulario-producto").reset();

    // Actualizar visualmente el catálogo de inmediato sin parpadeos de recarga
    renderizarProductos();
}

// 3. Leer los productos guardados y construir las tarjetas dinámicamente en el DOM
function renderizarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return; // Validación de seguridad

    const inventario = JSON.parse(localStorage.getItem("db_productos")) || [];

    // Si la base de datos local está vacía, inyectar un aviso amigable
    if (inventario.length === 0) {
        contenedor.innerHTML = `
            <div class="col-span-full bg-gray-100 text-center p-8 rounded-2xl border border-dashed border-gray-300 text-gray-500 text-sm">
                No hay productos registrados todavía. Usa el formulario para agregar el primero.
            </div>
        `;
        return;
    }

    // Limpiar el contenedor antes de renderizar para evitar duplicación de tarjetas
    contenedor.innerHTML = "";

    // Recorrer los objetos e inyectar el código estructurado con clases utilitarias de Tailwind
    inventario.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between";
        
        tarjeta.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}" class="h-40 w-full object-cover rounded-lg mb-3" onerror="this.src='https://placehold.co'">
            <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded self-start mb-1">${producto.category}</span>
            <h3 class="font-bold text-gray-800 text-sm mb-1">${producto.title}</h3>
            <p class="text-xs text-gray-400 line-clamp-2 mb-3">${producto.description}</p>
            <div class="flex items-center justify-between mt-auto">
                <span class="text-base font-extrabold text-gray-900">$${producto.price.toLocaleString('es-CO')}</span>
                <button onclick="eliminarProducto(${producto.id})" class="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 rounded transition-colors">
                    Eliminar
                </button>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// 4. Eliminar productos del inventario local
function eliminarProducto(id) {
    let inventario = JSON.parse(localStorage.getItem("db_productos")) || [];
    
    // Filtrar el arreglo para conservar todos los productos excepto el del ID seleccionado
    inventario = inventario.filter(producto => producto.id !== id);
    localStorage.setItem("db_productos", JSON.stringify(inventario));
    
    // Refrescar el catálogo en la interfaz de usuario
    renderizarProductos();
}


// ==========================================
//          LÓGICA DEL CARRITO
// ==========================================

// 1. FUNCIÓN: Añadir un producto al carrito
function agregarAlCarrito(idProducto) {
    // Traer el carrito actual del casillero del navegador, o empezar uno vacío []
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Traer todo nuestro inventario de productos registrados para buscar el que clickeamos
    const inventario = JSON.parse(localStorage.getItem("db_productos")) || [];
    const productoEncontrado = inventario.find(p => p.id === idProducto);

    if (!productoEncontrado) return; // Seguridad: si el producto no existe, frena la función

    // Verificar si el producto YA estaba metido en el carrito anteriormente
    const existeEnCarrito = carrito.find(item => item.id === idProducto);

    if (existeEnCarrito) {
        // Si ya existía, simplemente le sumamos 1 a su cantidad
        existeEnCarrito.cantidad += 1;
    } else {
        // Si es la primera vez que lo añade, creamos un objeto nuevo con cantidad 1
        carrito.push({
            id: productoEncontrado.id,
            title: productoEncontrado.title,
            price: productoEncontrado.price,
            image: productoEncontrado.image,
            cantidad: 1
        });
    }

    // Guardar la lista actualizada del carrito en el casillero del navegador
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Actualizar visualmente la lista del carrito en la pantalla
    renderizarCarrito();
}

// 2. FUNCIÓN: Dibujar el carrito en el HTML y calcular totales
function renderizarCarrito() {
    // Buscamos un contenedor en el HTML donde se pintará el carrito
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    const contenedorTotal = document.getElementById("total-carrito");
    
    // Si no has creado estos contenedores en tu HTML todavía, la función se frena para no dar error
    if (!contenedorCarrito) return; 

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Si el carrito está vacío, mostrar un texto indicador
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p class='text-gray-400 text-xs text-center py-4'>El carrito está vacío.</p>";
        if (contenedorTotal) contenedorTotal.innerText = "$0";
        return;
    }

    // Limpiar el contenedor antes de dibujar para no duplicar filas
    contenedorCarrito.innerHTML = "";
    let sumaTotal = 0;

    // Recorrer los productos que el usuario ha seleccionado para comprar
    carrito.forEach(item => {
        // Calcular el subtotal multiplicando precio por cantidad
        const subtotal = item.price * item.cantidad;
        sumaTotal += subtotal; // Ir acumulando el total general

        const fila = document.createElement("div");
        fila.className = "flex items-center justify-between border-b border-gray-100 py-3 text-xs text-gray-700";
        
        fila.innerHTML = `
            <div class="flex items-center gap-2">
                <img src="${item.image}" class="w-8 h-8 rounded object-cover" onerror="this.src='https://placehold.co'">
                <div>
                    <p class="font-bold max-w-[120px] truncate">${item.title}</p>
                    <p class="text-gray-400">$${item.price.toLocaleString('es-CO')}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="cambiarCantidad(${item.id}, -1)" class="bg-gray-100 hover:bg-gray-200 px-1.5 py-0.5 rounded font-bold">-</button>
                <span class="font-bold">${item.cantidad}</span>
                <button onclick="cambiarCantidad(${item.id}, 1)" class="bg-gray-100 hover:bg-gray-200 px-1.5 py-0.5 rounded font-bold">+</button>
            </div>
            <p class="font-bold text-gray-900">$${subtotal.toLocaleString('es-CO')}</p>
        `;
        
        contenedorCarrito.appendChild(fila);
    });

    // Pintar el valor total de la compra formateado en pesos colombianos
    if (contenedorTotal) {
        contenedorTotal.innerText = `$${sumaTotal.toLocaleString('es-CO')}`;
    }
}

// 3. FUNCIÓN: Sumar o restar unidades usando los botones + y -
function cambiarCantidad(idProducto, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = carrito.find(item => item.id === idProducto);

    if (!producto) return;

    producto.cantidad += cambio;

    // Si la cantidad llega a cero, borramos por completo el producto del carrito
    if (producto.cantidad <= 0) {
        carrito = carrito.filter(item => item.id !== idProducto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

// 4. Modificar el inicio para que el carrito también se dibuje al abrir la página
document.addEventListener("DOMContentLoaded", renderizarCarrito);

document.addEventListener("DOMContentLoaded", () => {
    inicializarInterfaz();
    renderizarProductos();
    renderizarCarrito();
});

// 1. FUNCIÓN: Construye todo el HTML del proyecto desde cero
function inicializarInterfaz() {
    const root = document.getElementById("root");
    if (!root) return;

    root.innerHTML = `
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <!-- COLUMNA IZQUIERDA: FORMULARIO Y CARRITO -->
            <div class="space-y-6">
                <!-- Formulario de Registro -->
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">Registrar Producto</h2>
                    <form id="formulario-producto" class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre</label>
                            <input type="text" id="nombre" required class="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-blue-500">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Precio ($)</label>
                            <input type="number" id="precio" required min="1" class="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-blue-500">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Categoría</label>
                            <select id="categoria" required class="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-blue-500 bg-white">
                                <option value="Ropa">Ropa</option>
                                <option value="Tecnología">Tecnología</option>
                                <option value="Hogar">Hogar</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">URL de la Imagen</label>
                            <input type="url" id="imagen" required class="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-blue-500">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Descripción</label>
                            <textarea id="descripcion" rows="3" required class="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-blue-500"></textarea>
                        </div>
                        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-xl text-sm transition-colors">
                            Guardar Producto
                        </button>
                    </form>
                </div>

                <!-- Sección del Carrito -->
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 class="text-lg font-bold text-gray-800 mb-3">Tu Carrito</h2>
                    <div id="contenedor-carrito" class="space-y-1"></div>
                    <div class="flex justify-between items-center border-t border-gray-200 mt-4 pt-3 font-bold">
                        <span class="text-gray-600 text-sm">Total a pagar:</span>
                        <span id="total-carrito" class="text-green-600 text-lg">$0</span>
                    </div>
                </div>
            </div>

            <!-- COLUMNA DERECHA: CATÁLOGO DE PRODUCTOS -->
            <div class="md:col-span-2">
                <h2 class="text-xl font-bold text-gray-800 mb-4">Catálogo de Productos Disponibles</h2>
                <div id="contenedor-productos" class="grid grid-cols-1 sm:grid-cols-2 gap-4"></div>
            </div>

        </div>
    `;

    // Enganchar el evento de enviar formulario ahora que existe en el DOM
    document.getElementById("formulario-producto").addEventListener("submit", registrarNuevoProducto);
}

// 2. FUNCIÓN: Captura los datos y guarda en LocalStorage
function registrarNuevoProducto(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const categoria = document.getElementById("categoria").value;
    const imagen = document.getElementById("imagen").value;
    const descripcion = document.getElementById("descripcion").value;

    let inventario = JSON.parse(localStorage.getItem("db_productos")) || [];

    const nuevoProducto = {
        id: Date.now(),
        title: nombre,
        price: precio,
        category: categoria,
        image: imagen,
        description: descripcion
    };

    inventario.push(nuevoProducto);
    localStorage.setItem("db_productos", JSON.stringify(inventario));
    document.getElementById("formulario-producto").reset();

    renderizarProductos();
}

// 3. FUNCIÓN: Dibuja las tarjetas de los productos en pantalla
function renderizarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    const inventario = JSON.parse(localStorage.getItem("db_productos")) || [];

    if (inventario.length === 0) {
        contenedor.innerHTML = `
            <div class="col-span-full bg-gray-100 text-center p-8 rounded-2xl border border-dashed border-gray-300 text-gray-500 text-sm">
                No hay productos registrados todavía. Usa el formulario de la izquierda.
            </div>
        `;
        return;
    }

    contenedor.innerHTML = "";

    inventario.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between";
        
        tarjeta.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}" class="h-40 w-full object-cover rounded-lg mb-3" onerror="this.src='https://placehold.co'">
            <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded self-start mb-1">${producto.category}</span>
            <h3 class="font-bold text-gray-800 text-sm mb-1">${producto.title}</h3>
            <p class="text-xs text-gray-400 line-clamp-2 mb-3">${producto.description}</p>
            <div class="flex items-center justify-between mt-auto">
                <span class="text-base font-extrabold text-gray-900">$${producto.price.toLocaleString('es-CO')}</span>
                <div class="flex gap-2">
                    <button onclick="eliminarProducto(${producto.id})" class="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1">Borrar</button>
                    <button onclick="agregarAlCarrito(${producto.id})" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors">Añadir</button>
                </div>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// 4. FUNCIÓN: Eliminar productos por completo del inventario
function eliminarProducto(id) {
    let inventario = JSON.parse(localStorage.getItem("db_productos")) || [];
    inventario = inventario.filter(p => p.id !== id);
    localStorage.setItem("db_productos", JSON.stringify(inventario));
    renderizarProductos();
}

// 5. FUNCIÓN: Manejo del carrito de compras
function agregarAlCarrito(idProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const inventario = JSON.parse(localStorage.getItem("db_productos")) || [];
    const prod = inventario.find(p => p.id === idProducto);

    if (!prod) return;

    const existe = carrito.find(item => item.id === idProducto);

    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ id: prod.id, title: prod.title, price: prod.price, image: prod.image, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

// 6. FUNCIÓN: Dibuja las filas dentro de la caja del carrito
function renderizarCarrito() {
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    const contenedorTotal = document.getElementById("total-carrito");
    if (!contenedorCarrito) return;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p class='text-gray-400 text-xs text-center py-4'>El carrito está vacío.</p>";
        if (contenedorTotal) contenedorTotal.innerText = "$0";
        return;
    }

    contenedorCarrito.innerHTML = "";
    let sumaTotal = 0;

    carrito.forEach(item => {
        const subtotal = item.price * item.cantidad;
        sumaTotal += subtotal;

        const fila = document.createElement("div");
        fila.className = "flex items-center justify-between border-b border-gray-100 py-3 text-xs text-gray-700";
        
        fila.innerHTML = `
            <div class="flex items-center gap-2">
                <img src="${item.image}" class="w-8 h-8 rounded object-cover" onerror="this.src='https://placehold.co'">
                <div>
                    <p class="font-bold max-w-[100px] truncate">${item.title}</p>
                    <p class="text-gray-400">$${item.price.toLocaleString('es-CO')}</p>
                </div>
            </div>
            <div class="flex items-center gap-1">
                <button onclick="cambiarCantidad(${item.id}, -1)" class="bg-gray-100 px-1 py-0.5 rounded font-bold">-</button>
                <span class="font-bold px-1">${item.cantidad}</span>
                <button onclick="cambiarCantidad(${item.id}, 1)" class="bg-gray-100 px-1 py-0.5 rounded font-bold">+</button>
            </div>
            `
    })}