// ==========================
// CONFIGURACIÓN API
// ==========================

const BASE_URL =
"http://localhost:3000/api";

const API_URL =
`${BASE_URL}/auth/login`;

// ==========================
// FORMULARIO
// ==========================

const loginForm = document.getElementById("loginForm");

if (!loginForm) {

    console.error(
        "No se encontró el formulario de login."
    );

}

// ==========================
// MENSAJES
// ==========================

function showMessage(message, type = "error") {

    const oldAlert = document.querySelector(".custom-alert");

    if (oldAlert) {
        oldAlert.remove();
    }

    const alert = document.createElement("div");

    alert.classList.add("custom-alert");

    alert.innerHTML = `
        <div class="alert-content ${type}">
            ${message}
        </div>
    `;

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// ==========================
// VALIDACIÓN EMAIL
// ==========================

function validateEmail(email) {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}

// ==========================
// LOGIN
// ==========================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.querySelector('input[type="email"]').value.trim();

    const password =
        document.querySelector('input[type="password"]').value.trim();

    // Validaciones

    if (!email || !password) {

        showMessage(
            "Todos los campos son obligatorios"
        );

        return;
    }

    if (!validateEmail(email)) {

        showMessage(
            "Correo electrónico inválido"
        );

        return;
    }

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        let data = {};

        try {

            data = await response.json();

        } catch {

            data = {
                message:
                "Respuesta inválida del servidor."
            };

        }

        if (!response.ok) {

            throw new Error(
                data.message || "Error al iniciar sesión"
            );

        }

        // Guardar token

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        showMessage(
            "Inicio de sesión exitoso",
            "success"
        );

        setTimeout(() => {

            window.location.href =
                "../dashboard/dashboard.html";

        }, 1500);

    } catch (error) {

        showMessage(

            error.message ||

            "No fue posible conectar con el servidor."

        );

        console.error(error);

    }

});

const role =
localStorage.getItem("role");

// ==========================
// RECORDAR USUARIO
// ==========================

const rememberCheckbox =
    document.getElementById("remember");

const emailInput =
    document.querySelector('input[type="email"]');

window.addEventListener("load", () => {

    const savedEmail =
        localStorage.getItem("rememberedEmail");

    if (savedEmail) {

        emailInput.value = savedEmail;

        rememberCheckbox.checked = true;

    }

});

rememberCheckbox.addEventListener("change", () => {

    if (rememberCheckbox.checked) {

        localStorage.setItem(
            "rememberedEmail",
            emailInput.value
        );

    } else {

        localStorage.removeItem(
            "rememberedEmail"
        );

    }

});

emailInput.addEventListener("input", () => {

    if (rememberCheckbox.checked) {

        localStorage.setItem(
            "rememberedEmail",
            emailInput.value
        );

    }

});

// ==========================
// MOSTRAR / OCULTAR PASSWORD
// ==========================

const passwordInput =
    document.querySelector(
        'input[type="password"]'
    );

const passwordContainer =
    passwordInput.parentElement;

const togglePassword =
    document.createElement("span");

togglePassword.innerHTML =
    '<i class="fa-solid fa-eye"></i>';

togglePassword.style.cursor = "pointer";
togglePassword.style.background = "#fff";
togglePassword.style.padding = "0 15px";
togglePassword.style.display = "flex";
togglePassword.style.alignItems = "center";

passwordContainer.appendChild(
    togglePassword
);

togglePassword.addEventListener(
    "click",
    () => {

        if (
            passwordInput.type ===
            "password"
        ) {

            passwordInput.type =
                "text";

            togglePassword.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            passwordInput.type =
                "password";

            togglePassword.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

        }

    }
);

// ==========================
// VERIFICAR TOKEN
// ==========================

const token =
localStorage.getItem("token");

if (

    token &&

    token !== "undefined"

) {

    window.location.href =
    "../dashboard/dashboard.html";

}