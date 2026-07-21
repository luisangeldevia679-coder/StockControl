class Supplier {
    constructor({ id, name, email, phone, companyName }) {
        this.id = id;                    // Identificador único del proveedor
        this.name = name;                // Nombre de la persona de contacto
        this.companyName = companyName;  // Nombre de la empresa o fábrica
        this.email = email;              // Correo electrónico de compras
        this.phone = phone;              // Teléfono de contacto
        this.isActive = true;            // Estado del proveedor en el sistema
        this.createdAt = new Date();
    }
}

module.exports = Supplier;
