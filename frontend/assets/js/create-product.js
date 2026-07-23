(async function () {
  const form = document.getElementById('createProductForm');
  if (!localStorage.getItem('token')) { window.location.href = '../auth/login.html'; return; }
  if (!form) return;
  const categorySelect = document.getElementById('category_id');
  const supplierSelect = document.getElementById('supplier_id');
  const addOptions = (select, items, valueKey, labelKey) => { if (!select) return; items.forEach((item) => { const option = document.createElement('option'); option.value = item[valueKey]; option.textContent = item[labelKey]; select.appendChild(option); }); };
  try {
    const [categories, suppliers] = await Promise.all([window.stockControlApi.request('/categories'), window.stockControlApi.request('/suppliers')]);
    addOptions(categorySelect, categories.data || [], 'id', 'name');
    addOptions(supplierSelect, suppliers.data || [], 'id', 'company_name');
  } catch (error) { window.alert(error.message); }
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const get = (id) => document.getElementById(id)?.value.trim() || '';
    const payload = { name: get('productName'), description: get('description'), purchase_price: get('purchasePrice'), price: get('salePrice'), barcode: get('barcode') || get('productCode'), category_id: get('category_id'), supplier_id: get('supplier_id'), status: get('status') || 'active' };
    try { await window.stockControlApi.request('/products', { method: 'POST', body: JSON.stringify(payload) }); window.location.href = 'products.html'; } catch (error) { window.alert(error.message); }
  });
})();
