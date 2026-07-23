(async function () {
  const form = document.getElementById('editCategoryForm');
  const id = new URLSearchParams(window.location.search).get('id');
  if (!localStorage.getItem('token')) { window.location.href = '../auth/login.html'; return; }
  if (!form || !id) return;
  try {
    const response = await window.stockControlApi.request(`/categories/${id}`);
    document.getElementById('categoryName').value = response.data.name || '';
    document.getElementById('categoryDescription').value = response.data.description || '';
  } catch (error) { window.alert(error.message); return; }
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try { await window.stockControlApi.request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify({ name: document.getElementById('categoryName').value.trim(), description: document.getElementById('categoryDescription').value.trim() }) }); window.location.href = 'categories.html'; }
    catch (error) { window.alert(error.message); }
  });
})();
