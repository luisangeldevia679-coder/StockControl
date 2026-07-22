// ======================================
// STOCKCONTROL ERP
// suppliers.js
// ======================================

// ==========================
// CONFIGURACIÓN API
// ==========================

const API_URL =
    "http://localhost:3000/api/suppliers";

// ==========================
// ELEMENTOS
// ==========================

const tableBody =
    document.getElementById("suppliersTable");

const searchInput =
    document.getElementById("searchSupplier");

// ==========================
// CARGAR PROVEEDORES
// ==========================

async function loadSuppliers() {

    try {

        const response =
            await fetch(API_URL);

        if (!response.ok) {

            throw new Error(
                "No fue posible obtener los proveedores."
            );

        }

        const suppliers =
            await response.json();

        tableBody.innerHTML = "";

        suppliers.forEach(supplier => {

            tableBody.innerHTML += `

                <tr>

                    <td>${supplier.id}</td>

                    <td>${supplier.company}</td>

                    <td>${supplier.contact}</td>

                    <td>${supplier.phone}</td>

                    <td>${supplier.email}</td>

                    <td>${supplier.city}</td>

                    <td>

                        <span class="badge ${

                            supplier.status === "Activo"

                            ? "bg-success"

                            : "bg-secondary"

                        }">

                            ${supplier.status}

                        </span>

                    </td>

                    <td>

                        <a
                            href="view_supplier.html?id=${supplier.id}"
                            class="btn btn-info btn-sm text-white">

                            <i class="fa-solid fa-eye"></i>

                        </a>

                        <a
                            href="edit_supplier.html?id=${supplier.id}"
                            class="btn btn-warning btn-sm">

                            <i class="fa-solid fa-pen"></i>

                        </a>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="deleteSupplier(${supplier.id})">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// ==========================
// ELIMINAR
// ==========================

async function deleteSupplier(id) {

    const confirmDelete =
        confirm("¿Desea eliminar este proveedor?");

    if (!confirmDelete) return;

    try {

        const response =
            await fetch(

                `${API_URL}/${id}`,

                {

                    method: "DELETE"

                }

            );

        if (!response.ok) {

            throw new Error(
                "No fue posible eliminar el proveedor."
            );

        }

        loadSuppliers();

    } catch (error) {

        console.error(error);

    }

}

// ==========================
// BUSCADOR
// ==========================

searchInput.addEventListener("keyup", () => {

    const value =
        searchInput.value.toLowerCase();

    const rows =
        tableBody.querySelectorAll("tr");

    rows.forEach(row => {

        row.style.display =

            row.innerText
                .toLowerCase()
                .includes(value)

            ? ""

            : "none";

    });

});

// ==========================
// INICIAR
// ==========================

window.addEventListener("DOMContentLoaded", () => {

    loadSuppliers();

});