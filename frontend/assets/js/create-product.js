// ======================================
// CREATE PRODUCT
// ======================================

// Elementos del formulario

const productCode = document.getElementById("productCode");
const sku = document.getElementById("sku");

const purchasePrice = document.getElementById("purchasePrice");
const salePrice = document.getElementById("salePrice");
const stock = document.getElementById("stock");

const productImage = document.getElementById("productImage");

const summaryCode = document.getElementById("summaryCode");
const summarySku = document.getElementById("summarySku");
const summaryMargin = document.getElementById("summaryMargin");
const summaryInventory = document.getElementById("summaryInventory");

const previewImage = document.getElementById("previewImage");


// ======================================
// GENERAR CÓDIGO
// ======================================

function generateProductCode(){

    const number = Math.floor(Math.random() * 9000) + 1000;

    const code = `PRD-${number}`;

    productCode.value = code;

    summaryCode.textContent = code;

}


// ======================================
// GENERAR SKU
// ======================================

function generateSKU(){

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let generatedSKU = "";

    for(let i = 0; i < 8; i++){

        generatedSKU +=
            characters.charAt(
                Math.floor(Math.random() * characters.length)
            );

    }

    generatedSKU = "SKU-" + generatedSKU;

    sku.value = generatedSKU;

    summarySku.textContent = generatedSKU;

}


// ======================================
// INICIAR
// ======================================

window.addEventListener("load",()=>{

    generateProductCode();

    generateSKU();

});

// ======================================
// VISTA PREVIA DE LA IMAGEN
// ======================================

productImage.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) {

        previewImage.src =
            "https://placehold.co/300x300?text=Producto";

        return;

    }

    const imageURL = URL.createObjectURL(file);

    previewImage.src = imageURL;

});

// ======================================
// CALCULAR MARGEN E INVENTARIO
// ======================================

function calculateSummary() {

    const purchase = Number(purchasePrice.value) || 0;

    const sale = Number(salePrice.value) || 0;

    const quantity = Number(stock.value) || 0;

    console.log({
        compra: purchase,
        venta: sale,
        stock: quantity
    });

    const margin = sale - purchase;

    const inventoryValue = sale * quantity;

    summaryMargin.textContent =
        "$ " + margin.toLocaleString("es-CO");

    summaryInventory.textContent =
        "$ " + inventoryValue.toLocaleString("es-CO");

}



// Eventos

purchasePrice.addEventListener("input", calculateSummary);

salePrice.addEventListener("input", calculateSummary);

stock.addEventListener("input", calculateSummary);

// ======================================
// ENVIAR PRODUCTO AL BACKEND
// ======================================

const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {

        code: productCode.value,

        sku: sku.value,

        name: document.getElementById("productName").value,

        category: document.getElementById("category").value,

        purchasePrice: purchasePrice.value,

        salePrice: salePrice.value,

        stock: stock.value

    };

    console.log(data);

});