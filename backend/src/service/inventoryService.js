const db = require('../config/database');

const getMovements = async () => {
  const result = await db.query(`
    SELECT m.id, m.product_id, m.type, m.quantity, m.reason, m.created_at, p.name AS product_name
    FROM inventory_movements m
    LEFT JOIN products p ON p.id = m.product_id
    ORDER BY m.created_at DESC
  `);
  return result.rows;
};

const createMovement = async ({ productId, type, quantity, reason }) => {
  const productResult = await db.query('SELECT id, stock FROM products WHERE id = $1', [productId]);
  const product = productResult.rows[0];
  if (!product) {
    const error = new Error('Producto no encontrado');
    error.statusCode = 404;
    throw error;
  }

  const qty = Number(quantity);
  if (type === 'OUT' && product.stock < qty) {
    const error = new Error('Stock insuficiente');
    error.statusCode = 400;
    throw error;
  }

  const newStock = type === 'IN' ? product.stock + qty : product.stock - qty;
  await db.query('UPDATE products SET stock = $1 WHERE id = $2', [newStock, productId]);

  const result = await db.query(
    'INSERT INTO inventory_movements (product_id, type, quantity, reason) VALUES ($1, $2, $3, $4) RETURNING id, product_id, type, quantity, reason, created_at',
    [productId, type, qty, reason || 'Movimiento registrado']
  );
  return result.rows[0];
};

module.exports = { getMovements, createMovement };
