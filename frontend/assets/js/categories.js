(async function () {
  if (!localStorage.getItem('token')) { window.location.href = '../auth/login.html'; return; }
  const tableBody = document.getElementById('categoryTableBody');
  const searchInput = document.querySelector('.category-toolbar input');
  const statusSelect = document.querySelector('.category-toolbar select');
  if (!tableBody) return;
  let categories = [];
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  const render = () => {
    const search = (searchInput?.value || '').toLowerCase().trim();
    const status = statusSelect?.value || 'Todas';
    const filtered = categories.filter((category) => `${category.name} ${category.description || ''}`.toLowerCase().includes(search) && (status === 'Todas' || status === 'Activas'));
    if (!filtered.length) { tableBody.innerHTML = '<tr><td colspan="7" class="text-center">No hay categorías registradas.</td></tr>'; return; }
    tableBody.innerHTML = filtered.map((category) => `<tr><td>${escapeHtml(category.id)}</td><td><i class="fa-solid fa-layer-group fs-4 text-primary"></i></td><td>${escapeHtml(category.name)}</td><td>${escapeHtml(category.description)}</td><td>0</td><td><span class="badge bg-success">Activa</span></td><td><a href="view_category.html?id=${encodeURIComponent(category.id)}" class="btn btn-info btn-sm text-white"><i class="fa-solid fa-eye"></i></a> <a href="edit-category.html?id=${encodeURIComponent(category.id)}" class="btn btn-warning btn-sm"><i class="fa-solid fa-pen"></i></a> <button type="button" class="btn btn-danger btn-sm delete-category" data-id="${escapeHtml(category.id)}"><i class="fa-solid fa-trash"></i></button></td></tr>`).join('');
  };
  const load = async () => { try { const response = await window.stockControlApi.request('/categories'); categories = response.data || []; render(); } catch (error) { tableBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">${escapeHtml(error.message)}</td></tr>`; } };
  searchInput?.addEventListener('input', render); statusSelect?.addEventListener('change', render);
  tableBody.addEventListener('click', async (event) => { const button = event.target.closest('.delete-category'); if (!button || !window.confirm('¿Deseas eliminar esta categoría?')) return; try { await window.stockControlApi.request(`/categories/${button.dataset.id}`, { method: 'DELETE' }); await load(); } catch (error) { window.alert(error.message); } });
  await load();
})();
