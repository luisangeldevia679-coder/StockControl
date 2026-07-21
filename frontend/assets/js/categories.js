// ======================================
// STOCKCONTROL ERP
// categories.js
// ======================================

// -----------------------------
// ELEMENTOS
// -----------------------------

const btnNuevaCategoria =
document.getElementById("btnNuevaCategoria");

const modalCategoria =
new bootstrap.Modal(
document.getElementById("modalCategoria")
);

const formulario =
document.getElementById("categoryForm");

const tbody =
document.querySelector("tbody");

// -----------------------------
// ABRIR MODAL
// -----------------------------

btnNuevaCategoria.addEventListener("click",()=>{

formulario.reset();

modalCategoria.show();

});

// -----------------------------
// AGREGAR CATEGORÍA
// -----------------------------

formulario.addEventListener("submit",(e)=>{

e.preventDefault();

const nombre =
formulario.querySelector("input").value;

const descripcion =
formulario.querySelector("textarea").value;

const fila =
document.createElement("tr");

fila.innerHTML=`

<td>C00${tbody.children.length+1}</td>

<td>${nombre}</td>

<td>${descripcion}</td>

<td>0</td>

<td>

<button class="btn btn-warning btn-sm edit">

<i class="fa-solid fa-pen"></i>

</button>

<button class="btn btn-danger btn-sm delete">

<i class="fa-solid fa-trash"></i>

</button>

</td>

`;

tbody.appendChild(fila);

modalCategoria.hide();

alert("Categoría agregada correctamente.");

});

// ======================================
// EDITAR
// ======================================

document.addEventListener("click",(e)=>{

const editar =
e.target.closest(".edit");

if(!editar) return;

const fila =
editar.closest("tr");

const columnas =
fila.querySelectorAll("td");

const nombreInput =
formulario.querySelector("input");

const descripcionInput =
formulario.querySelector("textarea");

nombreInput.value =
columnas[1].textContent;

descripcionInput.value =
columnas[2].textContent;

modalCategoria.show();

formulario.onsubmit=function(event){

event.preventDefault();

columnas[1].textContent=
nombreInput.value;

columnas[2].textContent=
descripcionInput.value;

modalCategoria.hide();

alert("Categoría actualizada.");

};

});
// ======================================
// ELIMINAR
// ======================================

document.addEventListener("click",(e)=>{

const eliminar =
e.target.closest(".delete");

if(!eliminar) return;

const confirmar =
confirm("¿Eliminar esta categoría?");

if(!confirmar) return;

eliminar.closest("tr").remove();

alert("Categoría eliminada.");

});

// ======================================
// BUSCADOR
// ======================================

const buscador =
document.getElementById("buscarCategoria");

buscador.addEventListener("keyup",()=>{

const valor =
buscador.value.toLowerCase();

const filas =
document.querySelectorAll("tbody tr");

filas.forEach(fila=>{

const texto =
fila.innerText.toLowerCase();

fila.style.display=
texto.includes(valor) ? "" : "none";

});

});