
// ------------------------------
// ELEMENTOS
// ------------------------------

const searchInput = document.querySelector(".search-box input");
const tableRows = document.querySelectorAll("tbody tr");

const addButton = document.getElementById("btnNuevoProducto");

const productModal = new bootstrap.Modal(
    document.getElementById("modalProducto")
);

const productForm = document.getElementById("productForm");

// ------------------------------
// BUSCADOR
// ------------------------------

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    tableRows.forEach((row) => {

        const text = row.innerText.toLowerCase();

        if (text.includes(value)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

});


// ======================================
// EDITAR PRODUCTO
// ======================================

document.addEventListener("click", (e) => {

    const editButton = e.target.closest(".edit");

    if (!editButton) return;

    const fila = editButton.closest("tr");

    const columnas = fila.querySelectorAll("td");

    const nombreInput =
        productForm.querySelectorAll("input")[0];

    const categoriaSelect =
        productForm.querySelector("select");

    const precioInput =
        productForm.querySelectorAll("input")[1];

    const stockInput =
        productForm.querySelectorAll("input")[2];

    nombreInput.value = columnas[1].textContent.trim();

    categoriaSelect.value = columnas[2].textContent.trim();

    precioInput.value =
        columnas[3].textContent
            .replace("$", "")
            .replace(/\./g, "")
            .trim();

    stockInput.value = columnas[4].textContent.trim();

    productModal.show();

    productForm.onsubmit = function (event) {

        event.preventDefault();

        columnas[1].textContent = nombreInput.value;

        columnas[2].textContent = categoriaSelect.value;

        columnas[3].textContent =
            "$" + Number(precioInput.value).toLocaleString();

        columnas[4].textContent = stockInput.value;

        if (Number(stockInput.value) <= 5) {

            columnas[5].innerHTML =

                `<span class="badge bg-danger">
                    Crítico
                </span>`;

        } else if (Number(stockInput.value) <= 10) {

            columnas[5].innerHTML =

                `<span class="badge bg-warning text-dark">
                    Stock Bajo
                </span>`;

        } else {

            columnas[5].innerHTML =

                `<span class="badge bg-success">
                    Disponible
                </span>`;

        }

        alert("Producto actualizado correctamente.");

    };

});

// ======================================
// ELIMINAR PRODUCTO
// ======================================

document.addEventListener("click", (e) => {

    const deleteButton = e.target.closest(".delete");

    if (!deleteButton) return;

    const confirmar = confirm(
        "¿Desea eliminar este producto?"
    );

    if (!confirmar) return;

    deleteButton.closest("tr").remove();

    alert("Producto eliminado correctamente.");

});
// ======================================
// FILTRAR POR CATEGORÍA
// ======================================

const categoryFilter =
document.querySelector(".form-select");

categoryFilter.addEventListener("change",()=>{

const categoria =
categoryFilter.value;

const filas =
document.querySelectorAll("tbody tr");

filas.forEach(fila=>{

const categoriaTabla =
fila.children[2].textContent;

if(

categoria==="Todas las categorías" ||

categoria===categoriaTabla

){

fila.style.display="";

}else{

fila.style.display="none";

}

});

});

// ======================================
// EFECTO HOVER BOTONES
// ======================================

const botones =
document.querySelectorAll(".btn");

botones.forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transition=".3s";

btn.style.transform="scale(1.05)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});

// ======================================
// CARGAR PRODUCTOS
// ======================================

async function cargarProductos(){

try{

const respuesta =
await fetch("http://localhost:3000/api/products");

if(!respuesta.ok){

return;

}

const productos =
await respuesta.json();

console.log(productos);

}catch(error){

console.log(error);

}

}

cargarProductos();

await fetch(

`/api/products/${id}`,

{

method:"DELETE"

}

)