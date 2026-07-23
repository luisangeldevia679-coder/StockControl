const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { JWT_SECRET } = require('../config/enviroment');

const detectUserSchema = async () => {
  try {
    await db.query('SELECT user_id AS id, full_name AS name, email, password AS password_hash, role_id FROM users LIMIT 0');
    return 'supabase';
  } catch (error) {
    return 'legacy';
  }
};

const getUserSelectQuery = async () => {
  const schema = await detectUserSchema();
  if (schema === 'legacy') {
    return 'SELECT id, name, email, password_hash, role FROM users';
  }
  return "SELECT user_id AS id, full_name AS name, email, password AS password_hash, CASE WHEN role_id = 1 THEN 'admin' ELSE 'staff' END AS role FROM users";
};

const getUserIdColumn = async () => {
  const schema = await detectUserSchema();
  return schema === 'supabase' ? 'user_id' : 'id';
};

const registerUser = async ({ name, email, password, role = 'staff' }) => {
  if (!name || !email || !password) {
    const error = new Error('Nombre, correo y contraseña son obligatorios');
    error.statusCode = 400;
    throw error;
  }

  const existing = await db.query('SELECT user_id AS id FROM users WHERE email = $1', [email]);
  if (existing.rows.length) {
    const error = new Error('El usuario ya existe');
    error.statusCode = 409;
    throw error;
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    const insert = await db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hash, role]
    );
    const user = insert.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
    return { user, token };
  } catch (error) {
    const roleId = role === 'admin' ? 1 : 2;
    const insert = await db.query(
      "INSERT INTO users (full_name, email, password, status, role_id) VALUES ($1, $2, $3, 'active', $4) RETURNING user_id AS id, full_name AS name, email, CASE WHEN role_id = 1 THEN 'admin' ELSE 'staff' END AS role",
      [name, email, hash, roleId]
    );
    const user = insert.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
    return { user, token };
  }
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error('Correo y contraseña son obligatorios');
    error.statusCode = 400;
    throw error;
  }

  const selectQuery = await getUserSelectQuery();
  const result = await db.query(`${selectQuery} WHERE email = $1`, [email]);
  const user = result.rows[0];

  if (!user) {
    const error = new Error('Credenciales inválidas');
    error.statusCode = 401;
    throw error;
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) {
    const error = new Error('Credenciales inválidas');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
};

const getUserProfile = async (userId) => {
  const userIdColumn = await getUserIdColumn();
  const selectQuery = await getUserSelectQuery();
  const result = await db.query(`${selectQuery} WHERE ${userIdColumn} = $1`, [userId]);
  return result.rows[0] || null;
};

const getAllUsers = async () => {
  const userIdColumn = await getUserIdColumn();
  const selectQuery = await getUserSelectQuery();
  const result = await db.query(`${selectQuery} ORDER BY ${userIdColumn} ASC`);
  return result.rows;
};

module.exports = { registerUser, loginUser, getUserProfile, getAllUsers };
