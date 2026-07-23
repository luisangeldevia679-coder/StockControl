const db = require('../config/database');

const getAll = async () => {
  const result = await db.query(`
    SELECT category_id AS id, category_name AS name, description, 'active' AS status
    FROM categories
    ORDER BY category_id ASC
  `);
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query(`
    SELECT category_id AS id, category_name AS name, description, 'active' AS status
    FROM categories
    WHERE category_id = $1
  `, [id]);
  return result.rows[0];
};

const createNew = async (data) => {
  const { name, description } = data;
  const result = await db.query(
    `INSERT INTO categories (category_name, description)
     VALUES ($1, $2)
     RETURNING category_id AS id, category_name AS name, description`,
    [name, description]
  );
  return result.rows[0];
};

const updateExisting = async (id, data) => {
  const { name, description } = data;
  const result = await db.query(
    `UPDATE categories
     SET category_name = COALESCE($1, category_name),
         description = COALESCE($2, description)
     WHERE category_id = $3
     RETURNING category_id AS id, category_name AS name, description`,
    [name, description, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query('DELETE FROM categories WHERE category_id = $1 RETURNING category_id AS id', [id]);
  return result.rows[0];
};

module.exports = { getAll, getById, createNew, updateExisting, remove };
