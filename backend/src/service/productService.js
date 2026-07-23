const db = require('../config/database');

const getAll = async () => {
  const result = await db.query(`
    SELECT p.product_id AS id, p.product_name AS name, p.description, p.purchase_price, p.sale_price AS price, p.barcode, p.status, p.category_id, c.category_name AS category_name, p.supplier_id, s.company_name AS supplier_name
    FROM products p
    LEFT JOIN categories c ON c.category_id = p.category_id
    LEFT JOIN suppliers s ON s.supplier_id = p.supplier_id
    ORDER BY p.product_id ASC
  `);
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query(`
    SELECT p.product_id AS id, p.product_name AS name, p.description, p.purchase_price, p.sale_price AS price, p.barcode, p.status, p.category_id, c.category_name AS category_name, p.supplier_id, s.company_name AS supplier_name
    FROM products p
    LEFT JOIN categories c ON c.category_id = p.category_id
    LEFT JOIN suppliers s ON s.supplier_id = p.supplier_id
    WHERE p.product_id = $1
  `, [id]);
  return result.rows[0];
};

const createNew = async (data) => {
  const { name, description, purchase_price, price, barcode, category_id, supplier_id, status = 'active' } = data;
  const result = await db.query(
    `INSERT INTO products (product_name, description, purchase_price, sale_price, barcode, category_id, supplier_id, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING product_id AS id, product_name AS name, description, purchase_price, sale_price AS price, barcode, category_id, supplier_id, status`,
    [name, description, purchase_price || null, price, barcode || null, category_id || null, supplier_id || null, status]
  );
  return result.rows[0];
};

const updateExisting = async (id, data) => {
  const { name, description, purchase_price, price, barcode, category_id, supplier_id, status } = data;
  const result = await db.query(
    `UPDATE products
     SET product_name = COALESCE($1, product_name), description = COALESCE($2, description),
         purchase_price = COALESCE($3, purchase_price), sale_price = COALESCE($4, sale_price),
         barcode = COALESCE($5, barcode), category_id = COALESCE($6, category_id),
         supplier_id = COALESCE($7, supplier_id), status = COALESCE($8, status)
     WHERE product_id = $9
     RETURNING product_id AS id, product_name AS name, description, purchase_price, sale_price AS price, barcode, category_id, supplier_id, status`,
    [name, description, purchase_price, price, barcode, category_id, supplier_id, status, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query('DELETE FROM products WHERE product_id = $1 RETURNING product_id AS id', [id]);
  return result.rows[0];
};

module.exports = { getAll, getById, createNew, updateExisting, remove };
