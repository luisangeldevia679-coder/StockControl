// ======================================
// STOCKCONTROL ERP
// suppliers.js
// ======================================

// -----------------------------
// ELEMENTOS
// -----------------------------

const btnNuevoProveedor =
document.getElementById("btnNuevoProveedor");

const modalProveedor =
new bootstrap.Modal(
document.getElementById("modalProveedor")
);

const formulario =
document.getElementById("supplierForm");

const tbody =
document.querySelector("tbody");

const buscador =
document.getElementById("buscarProveedor");

// -----------------------------
// ABRIR MODAL
// -----------------------------

btnNuevoProveedor.addEventListener("click",()=>{

formulario.reset();

modalProveedor.show();

});

// -----------------------------
// AGREGAR PROVEEDOR
// -----------------------------

formulario.addEventListener("submit",(e)=>{

e.preventDefault();

const empresa =
document.getElementById("empresa").value.trim();

const contacto =
document.getElementById("contacto").value.trim();

const telefono =
document.getElementById("telefono").value.trim();

const correo =
document.getElementById("correo").value.trim();

const estado =
document.getElementById("estado").value;

if(
empresa==="" ||
contacto==="" ||
telefono==="" ||
correo===""){

alert("Complete todos los campos obligatorios.");

return;

}

const fila =
document.createElement("tr");

fila.innerHTML=`

<td>PR00${tbody.children.length+1}</td>

<td>${empresa}</td>

<td>${contacto}</td>

<td>${telefono}</td>

<td>${correo}</td>

<td>

<span class="badge ${
estado==="Activo"
?
"bg-success"
:
"bg-secondary"
}">

${estado}

</span>

</td>

<td>

<button
class="btn btn-warning btn-sm edit">

<i class="fa-solid fa-pen"></i>

</button>

<button
class="btn btn-danger btn-sm delete">

<i class="fa-solid fa-trash"></i>

</button>

</td>

`;

tbody.appendChild(fila);

modalProveedor.hide();

alert("Proveedor registrado correctamente.");

});
// ======================================
// EDITAR PROVEEDOR
// ======================================

document.addEventListener("click",(e)=>{

const editar =
e.target.closest(".edit");

if(!editar) return;

const fila =
editar.closest("tr");

const columnas =
fila.querySelectorAll("td");

document.getElementById("empresa").value =
columnas[1].textContent;

document.getElementById("contacto").value =
columnas[2].textContent;

document.getElementById("telefono").value =
columnas[3].textContent;

document.getElementById("correo").value =
columnas[4].textContent;

document.getElementById("estado").value =
columnas[5].textContent.trim();

modalProveedor.show();

formulario.onsubmit=function(event){

event.preventDefault();

columnas[1].textContent =
document.getElementById("empresa").value;

columnas[2].textContent =
document.getElementById("contacto").value;

columnas[3].textContent =
document.getElementById("telefono").value;

columnas[4].textContent =
document.getElementById("correo").value;

const estado =
document.getElementById("estado").value;

columnas[5].innerHTML =

`<span class="badge ${
estado==="Activo"
?
"bg-success"
:
"bg-secondary"
}">

${estado}

</span>`;

modalProveedor.hide();

alert("Proveedor actualizado correctamente.");

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
confirm("¿Desea eliminar este proveedor?");

if(!confirmar) return;

eliminar.closest("tr").remove();

alert("Proveedor eliminado correctamente.");

});

// ======================================
// BUSCADOR
// ======================================

buscador.addEventListener("keyup",()=>{

const valor =
buscador.value.toLowerCase();

const filas =
document.querySelectorAll("tbody tr");

filas.forEach(fila=>{

const texto =
fila.innerText.toLowerCase();

fila.style.display =
texto.includes(valor)
?
""
:
"none";

});

});

// ======================================
// VALIDACIÓN TELÉFONO
// ======================================

document.getElementById("telefono")
.addEventListener("input",function(){

this.value =
this.value.replace(/\D/g,"");

});

// ======================================
// VALIDACIÓN CORREO
// ======================================

document.getElementById("correo")
.addEventListener("blur",function(){

const correo =
this.value;

const regex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(
correo!=="" &&
!regex.test(correo)
){

alert("Ingrese un correo válido.");

this.focus();

}

});

// ======================================
// FUTURA CONEXIÓN API
// ======================================

async function cargarProveedores(){

try{

const respuesta =
await fetch("http://localhost:3000/api/suppliers");

if(!respuesta.ok) return;

const datos =
await respuesta.json();

console.log(datos);

}catch(error){

console.error(error);

}

}

// cargarProveedores();