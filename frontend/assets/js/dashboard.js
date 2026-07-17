// ==========================
// STOCKCONTROL ERP
// Dashboard.js
// ==========================

// --------------------------
// FECHA Y HORA
// --------------------------

function actualizarFecha() {

    const fecha = new Date();

    const opciones = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const elemento = document.getElementById("fechaActual");

    if (elemento) {

        elemento.textContent =
            fecha.toLocaleDateString("es-ES", opciones);

    }

}

actualizarFecha();

// --------------------------
// CONTADORES ANIMADOS
// --------------------------

const tarjetas = document.querySelectorAll(".card h3");

tarjetas.forEach((contador) => {

    const destino = parseInt(
        contador.innerText.replace(",", "")
    );

    let numero = 0;

    const incremento = Math.ceil(destino / 60);

    const intervalo = setInterval(() => {

        numero += incremento;

        if (numero >= destino) {

            numero = destino;

            clearInterval(intervalo);

        }

        contador.innerText =
            numero.toLocaleString();

    }, 20);

});

// --------------------------
// MENÚ ACTIVO
// --------------------------

const enlaces = document.querySelectorAll(".sidebar ul li");

enlaces.forEach((item) => {

    item.addEventListener("click", () => {

        enlaces.forEach((menu) => {

            menu.classList.remove("active");

        });

        item.classList.add("active");

    });

});

// --------------------------
// CERRAR SESIÓN
// --------------------------

const cerrarSesion =
    document.querySelector(".logout a");

if (cerrarSesion) {

    cerrarSesion.addEventListener("click", (e) => {

        e.preventDefault();

        const confirmar = confirm(
            "¿Deseas cerrar sesión?"
        );

        if (confirmar) {

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            window.location.href =
                "../../index.html";

        }

    });

}

// --------------------------
// INFORMACIÓN DEL USUARIO
// --------------------------

const usuario =
    JSON.parse(localStorage.getItem("user"));

if (usuario) {

    const nombre =
        document.querySelector(".user h6");

    const correo =
        document.querySelector(".user small");

    if (nombre) {

        nombre.textContent =
            usuario.nombre || "Administrador";

    }

    if (correo) {

        correo.textContent =
            usuario.email || "admin@stockcontrol.com";

    }