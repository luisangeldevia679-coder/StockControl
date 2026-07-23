(async function () {
  const form = document.getElementById('createSupplierForm');
  if (!form || !localStorage.getItem('token')) {
    if (!localStorage.getItem('token')) window.location.href = '../auth/login.html';
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = document.getElementById('supplierMessage');
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      await window.stockControlApi.request('/suppliers', { method: 'POST', body: JSON.stringify(payload) });
      message.className = 'mt-3 alert alert-success';
      message.textContent = 'Proveedor guardado correctamente.';
      setTimeout(() => { window.location.href = 'suppliers.html'; }, 700);
    } catch (error) {
      message.className = 'mt-3 alert alert-danger';
      message.textContent = error.message;
    }
  });
})();