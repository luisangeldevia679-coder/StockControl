class User {
    constructor({ id, username, email, password, role = 'staff' }) {
        this.id = id;                    // Identificador único
        this.username = username;        // Nombre de usuario para el login
        this.email = email;              // Correo electrónico
        this.password = password;        // Contraseña (¡recuerda que irá encriptada!)
        this.role = role;                // Rol en el sistema: 'admin', 'staff', etc.
        this.createdAt = new Date();
    }
}

module.exports = User;
