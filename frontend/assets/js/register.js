// ==========================
// CONFIGURACIÓN API
// ==========================

const BASE_URL =
    "http://localhost:3000/api";

const API_URL =
    `${BASE_URL}/auth/register`;

// ==========================
// FORMULARIO
// ==========================

const registerForm =
    document.getElementById("registerForm");

if (!registerForm) {

    console.error(
        "No se encontró el formulario de registro."
    );

} else {

    registerForm.addEventListener("submit", async (e) => {

        // Todo el código del registro aquí

    });

}


// ==========================
// MENSAJES
// ==========================

function showMessage(message, type = "error") {

    const oldAlert =
        document.querySelector(".custom-alert");

    if (oldAlert) {

        oldAlert.remove();

    }

    const alert =
        document.createElement("div");

    alert.classList.add("custom-alert");

    alert.innerHTML = `

        <div class="alert-content ${type}">

            ${message}

        </div>

    `;

    document.body.appendChild(alert);

    setTimeout(() => {

        alert.remove();

    },3000);

}

// ==========================
// VALIDAR EMAIL
// ==========================

function validateEmail(email){

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

// ==========================
// REGISTRO
// ==========================

registerForm.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const nombre =
        document.querySelector(
            'input[placeholder="Nombre completo"]'
        ).value.trim();

    const correo =
        document.querySelector(
            'input[type="email"]'
        ).value.trim();

    const usuario =
        document.querySelector(
            'input[placeholder="Nombre de usuario"]'
        ).value.trim();

    const password =
        document.querySelectorAll(
            'input[type="password"]'
        )[0].value;

    const confirmar =
        document.querySelectorAll(
            'input[type="password"]'
        )[1].value;

    const rol =
        document.querySelector("select").value;

    const aceptar =
        document.getElementById("terms").checked;

        if(

        nombre==="" ||

        correo==="" ||

        usuario==="" ||

        password==="" ||

        confirmar==="" ||

        rol===""

    ){

        showMessage(
            "Complete todos los campos."
        );

        return;

    }

    if(!validateEmail(correo)){

        showMessage(
            "Correo electrónico inválido."
        );

        return;

    }

    // ==========================
    // VALIDAR NOMBRE
    // ==========================

    if (nombre.length < 3) {

        showMessage(
            "El nombre debe tener mínimo 3 caracteres."
        );

        return;

    }

    // ==========================
    // VALIDAR CORREO
    // ==========================

    if (!validateEmail(correo)) {

        showMessage(
            "Correo electrónico inválido."
        );

        return;

    }       


    if(password.length < 8){

    showMessage(
        "La contraseña debe tener mínimo 8 caracteres."
    );

    return;

    }


    if(password!==confirmar){

        showMessage(
            "Las contraseñas no coinciden."
        );

        return;

    }


    if(!aceptar){

        showMessage(
            "Debe aceptar los términos."
        );

        return;

    }

        try{

        const response =
        await fetch(API_URL,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                nombre,

                correo,

                usuario,

                password,

                rol

            })

        });

        let data = {};

        try {

            data =
            await response.json();

        } catch {

            data = {

                message:
                "Respuesta inválida del servidor."

            };

        }

        if(!response.ok){

            throw new Error(

                data.message ||

                "No fue posible registrar el usuario."

            );

        }

        showMessage(

            "Cuenta creada correctamente.",

            "success"

        );

        setTimeout(()=>{

            window.location.href="login.html";

        },1500);

    }catch(error){

        showMessage(error.message);

        console.error(error);

    }

});