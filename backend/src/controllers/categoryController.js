// Nuestra base de datos temporal (un arreglo básico)
const categoriasDB = [
    { id: 1, name: "Tecnologia", description: "Telefonos y laptops" },
    { id: 2, name: "Ropa", description: "Pantalones y camisas" }
];

// Buscar todas
const findAll = () => {
    return categoriasDB;
};

// Buscar una por ID
const findById = (id) => {
    // Convertimos el id a número con Number() para asegurar la comparación
    return categoriasDB.find(cat => cat.id === Number(id));
};

// Guardar una nueva
const create = (data) => {
    const nuevaCategoria = {
        id: categoriasDB.length + 1, // Autoincrementar el ID de forma fácil
        name: data.name,
        description: data.description
    };
    categoriasDB.push(nuevaCategoria);
    return nuevaCategoria;
};

// Modificar una existente
const update = (id, data) => {
    const categoria = findById(id);
    if (categoria) {
        categoria.name = data.name || categoria.name;
        categoria.description = data.description || categoria.description;
    }
    return categoria;
};

// Borrar una
const deleteById = (id) => {
    const indice = categoriasDB.findIndex(cat => cat.id === Number(id));
    if (indice !== -1) {
        // Borramos el elemento del arreglo
        categoriasDB.splice(indice, 1);
        return true;
    }
    return false;
};
