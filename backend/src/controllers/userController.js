const users = [];

const publicUser = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
});

const registerUser = (req, res) => {
    const { name, email, password, role = 'staff' } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Nombre, correo y contraseña son obligatorios' });
    }

    if (users.some((user) => user.email === email)) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const user = { id: users.length + 1, name, email, password, role };
    users.push(user);

    return res.status(201).json({ ...publicUser(user), token: 'token123' });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    const user = users.find((candidate) => candidate.email === email && candidate.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    return res.json({ ...publicUser(user), token: 'token123' });
};

const getUserProfile = (req, res) => {
    const userId = req.usuario && req.usuario.id;
    const user = users.find((candidate) => candidate.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.json(publicUser(user));
};

const getUsers = (req, res) => res.json(users.map(publicUser));

module.exports = { registerUser, loginUser, getUserProfile, getUsers };

