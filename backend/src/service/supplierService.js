const db = require('../config/database');

const getAll = async () => {
  const result = await db.query(`
    SELECT supplier_id AS id, company_name, contact_name, email, phone, address,
           'active' AS status
    FROM suppliers
    ORDER BY supplier_id ASC
  `);
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query(`
    SELECT supplier_id AS id, company_name, contact_name, email, phone, address,
           'active' AS status
    FROM suppliers
    WHERE supplier_id = $1
  `, [id]);
  return result.rows[0];
};

const createNew = async (data) => {
  const { company_name, contact_name, email, phone, address } = data;
  const result = await db.query(
    `INSERT INTO suppliers (company_name, contact_name, email, phone, address)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING supplier_id AS id, company_name, contact_name, email, phone, address`,
    [company_name, contact_name, email, phone, address]
  );
  return result.rows[0];
};

const updateExisting = async (id, data) => {
  const { company_name, contact_name, email, phone, address } = data;
  const result = await db.query(
    `UPDATE suppliers
     SET company_name = COALESCE($1, company_name),
         contact_name = COALESCE($2, contact_name),
         email = COALESCE($3, email),
         phone = COALESCE($4, phone),
         address = COALESCE($5, address)
     WHERE supplier_id = $6
     RETURNING supplier_id AS id, company_name, contact_name, email, phone, address`,
    [company_name, contact_name, email, phone, address, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query('DELETE FROM suppliers WHERE supplier_id = $1 RETURNING supplier_id AS id', [id]);
  return result.rows[0];
};

module.exports = { getAll, getById, createNew, updateExisting, remove };
