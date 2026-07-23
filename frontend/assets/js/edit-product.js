(async function () {
  const form = document.getElementById('editProductForm');
  const id = new URLSearchParams(window.location.search).get('id');
  if (!localStorage.getItem('token')) { window.location.href = '../auth/login.html'; return; }
  if (!form || !id) return;
  const categorySelect = document.getElementById('category_id') || document.getElementById('category');
  const supplierSelect = document.getElementById('supplier_id') || document.getElementById('supplier');
  const addOptions = (select, items, valueKey, labelKey) => { if (!select) return; select.innerHTML = '<option value="">Seleccione...</option>'; items.forEach((item) => { const option = document.createElement('option'); option.value = item[valueKey]; option.textContent = item[labelKey]; select.appendChild(option); }); };
  const setValue = (ids, value) => { for (const id of ids) { const element = document.getElementById(id); if (element) { element.value = value ?? ''; return; } } };
  try {
    const [productResponse, categories, suppliers] = await Promise.all([window.stockControlApi.request(`/products/${id}`), window.stockControlApi.request('/categories'), window.stockControlApi.request('/suppliers')]);
    const product = productResponse.data;
    addOptions(categorySelect, categories.data || [], 'id', 'name'); addOptions(supplierSelect, suppliers.data || [], 'id', 'company_name');
    setValue(['productName', 'name'], product.name); setValue(['description'], product.description); setValue(['purchasePrice'], product.purchase_price); setValue(['salePrice', 'price'], product.price); setValue(['barcode', 'productCode', 'sku'], product.barcode); setValue(['category_id', 'category'], product.category_id); setValue(['supplier_id', 'supplier'], product.supplier_id); setValue(['status'], product.status);
  } catch (error) { window.alert(error.message); return; }
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); const get = (ids) => { for (const id of ids) { const value = document.getElementById(id)?.value; if (value !== undefined) return value.trim(); } return ''; };
    const payload = { name: get(['productName', 'name']), description: get(['description']), purchase_price: get(['purchasePrice']), price: get(['salePrice', 'price']), barcode: get(['barcode', 'productCode', 'sku']), category_id: get(['category_id', 'category']), supplier_id: get(['supplier_id', 'supplier']), status: get(['status']) || 'active' };
    try { await window.stockControlApi.request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) }); window.location.href = 'products.html'; } catch (error) { window.alert(error.message); }
  });
})();
