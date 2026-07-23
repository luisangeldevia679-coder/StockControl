(async function () {
  const form = document.getElementById('createCategoryForm');
  if (!localStorage.getItem('token')) { window.location.href = '../auth/login.html'; return; }
  if (!form) return;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await window.stockControlApi.request('/categories', { method: 'POST', body: JSON.stringify({ name: document.getElementById('categoryName').value.trim(), description: document.getElementById('categoryDescription').value.trim() }) });
      window.location.href = 'categories.html';
    } catch (error) { window.alert(error.message); }
  });
})();
