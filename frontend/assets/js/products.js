(async function () {
  if (!localStorage.getItem('token')) { window.location.href = '../auth/login.html'; return; }
  const tableBody = document.getElementById('productTableBody');
  const searchInput = document.querySelector('.product-toolbar input');
  const categorySelect = document.querySelector('.product-toolbar select');
  if (!tableBody) return;
  let products = [];
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  const render = () => {
    const search = (searchInput?.value || '').toLowerCase().trim();
    const category = categorySelect?.value || 'Todas las categorías';
    const filtered = products.filter((product) => `${product.name} ${product.barcode || ''}`.toLowerCase().includes(search) && (category === 'Todas las categorías' || product.category_name === category));
    if (!filtered.length) { tableBody.innerHTML = '<tr><td colspan="7" class="text-center">No hay productos registrados.</td></tr>'; return; }
    tableBody.innerHTML = filtered.map((product) => `<tr><td>${escapeHtml(product.id)}</td><td>${escapeHtml(product.name)}</td><td>${escapeHtml(product.category_name || 'Sin categoría')}</td><td>$${Number(product.price || 0).toLocaleString('es-CO')}</td><td>-</td><td><span class="badge bg-success">${escapeHtml(product.status || 'active')}</span></td><td><a href="product_details.html?id=${encodeURIComponent(product.id)}" class="btn btn-info btn-sm"><i class="fa-solid fa-eye"></i></a> <a href="edit_product.html?id=${encodeURIComponent(product.id)}" class="btn btn-warning btn-sm"><i class="fa-solid fa-pen"></i></a> <button type="button" class="btn btn-danger btn-sm delete-product" data-id="${escapeHtml(product.id)}"><i class="fa-solid fa-trash"></i></button></td></tr>`).join('');
  };
  const load = async () => { try { const response = await window.stockControlApi.request('/products'); products = response.data || []; render(); } catch (error) { tableBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">${escapeHtml(error.message)}</td></tr>`; } };
  searchInput?.addEventListener('input', render); categorySelect?.addEventListener('change', render);
  if (categorySelect) { try { const response = await window.stockControlApi.request('/categories'); (response.data || []).forEach((category) => { const option = document.createElement('option'); option.value = category.name; option.textContent = category.name; categorySelect.appendChild(option); }); } catch (error) { console.error(error); } }
  tableBody.addEventListener('click', async (event) => { const button = event.target.closest('.delete-product'); if (!button || !window.confirm('¿Deseas eliminar este producto?')) return; try { await window.stockControlApi.request(`/products/${button.dataset.id}`, { method: 'DELETE' }); await load(); } catch (error) { window.alert(error.message); } });
  await load();
})();
