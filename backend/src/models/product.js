class Product {
    constructor({ id, name, price, stock, supplierId, imageUrl = null }) {
        this.id = id;                    // Identificador único (Número o UUID)
        this.name = name;                // Nombre comercial del producto (String)
        this.price = Number(price);      // Precio unitario (Number)
        this.stock = Number(stock);      // Cantidad disponible en almacén (Number)
        this.supplierId = supplierId;    // ID del proveedor que lo surte (Relación)
        this.imageUrl = imageUrl;        // Ruta de la foto del producto (String)
        this.createdAt = new Date();     // Fecha de registro automática
    }
}

module.exports = Product;
