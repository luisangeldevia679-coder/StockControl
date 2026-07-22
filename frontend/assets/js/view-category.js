// ==========================
// DATOS DE EJEMPLO
// ==========================

const category = {

    id: "CAT001",

    name: "Periféricos",

    description:
        "Categoría que agrupa mouse, teclados, webcams y demás accesorios para computador.",

    status: "Activa",

    icon: "fa-computer-mouse",

    color: "#0d6efd",

    products: 35,

    createdAt: "20/07/2026",

    items: [

        "Mouse Logitech G203",

        "Teclado Redragon K552",

        "Webcam Logitech C920",

        "Mouse Razer DeathAdder",

        "Teclado Logitech MX Keys"

    ]

};

// ==========================
// CARGAR INFORMACIÓN
// ==========================

window.addEventListener("DOMContentLoaded", () => {

    loadCategory();

});

// ==========================
// CARGAR CATEGORÍA
// ==========================

function loadCategory() {

    document.querySelectorAll("input")[0].value =
        category.id;

    document.querySelectorAll("input")[1].value =
        category.status;

    document.querySelectorAll("input")[2].value =
        category.name;

    document.querySelector("textarea").value =
        category.description;

    document.querySelectorAll("input")[3].value =
        category.products;

    document.querySelectorAll("input")[4].value =
        category.createdAt;

    const icon =
        document.querySelector(".rounded-circle i");

    icon.className =
        `fa-solid ${category.icon} text-white`;

    document.querySelector(".rounded-circle")
        .style.background =
        category.color;

    document.querySelector(
        "table tbody tr:nth-child(1) td"
    ).textContent =
        category.name;

    document.querySelector(
        "table tbody tr:nth-child(2) td"
    ).textContent =
        category.id;

    document.querySelector(
        "table tbody tr:nth-child(4) td"
    ).textContent =
        category.products;

    document.querySelector(
        "table tbody tr:nth-child(6) td"
    ).textContent =
        category.createdAt;

    document.querySelector(
        "table tbody tr:nth-child(5) div"
    ).style.background =
        category.color;

    const list =
        document.querySelector(".list-group");

    list.innerHTML = "";

    category.items.forEach(product => {

        const li =
            document.createElement("li");

        li.className =
            "list-group-item";

        li.textContent =
            product;

        list.appendChild(li);

    });

}

// ==========================
// BOTÓN EDITAR
// ==========================

const editButton =
    document.querySelector(
        'a[href="edit_category.html"]'
    );

if (editButton) {

    editButton.addEventListener("click", () => {

        localStorage.setItem(

            "selectedCategory",

            JSON.stringify(category)

        );

    });

}

// ==========================
// BOTÓN VOLVER
// ==========================

const backButton =
    document.querySelector(
        'a[href="categories.html"]'
    );

if (backButton) {

    backButton.addEventListener("click", () => {

        console.log(

            "Regresando al listado..."

        );

    });

}