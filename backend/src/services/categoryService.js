const categoryRepository = require('../repositories/categoryRepository.js');
const getAll = () => {
    return categoryRepository.findAll();
};

const getById = (id) => {
    return categoryRepository.findById(id);
};

const createNew = (data) => {
    return categoryRepository.create(data);
};

const updateExisting = (id, data) => {
    return categoryRepository.update(id, data);
};

const remove = (id) => {
    return categoryRepository.delete(id);
};
