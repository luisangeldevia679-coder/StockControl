(async function () {
  const form = document.getElementById('editSupplierForm');
  const id = new URLSearchParams(window.location.search).get('id');
  if (!form || !id || !localStorage.getItem('token')) {
    if (!localStorage.getItem('token')) window.location.href = '../auth/login.html';
    return;
  }

  const message = document.getElementById('supplierMessage');
  try {
    const result = await window.stockControlApi.request(`/suppliers/${id}`);
    const supplier = result.data;
    for (const field of ['company_name', 'contact_name', 'email', 'phone', 'address']) {
      document.getElementById(field).value = supplier[field] || '';
    }
  } catch (error) {
    message.className = 'mt-3 alert alert-danger';
    message.textContent = error.message;
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      await window.stockControlApi.request(`/suppliers/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
      message.className = 'mt-3 alert alert-success';
      message.textContent = 'Proveedor actualizado correctamente.';
      setTimeout(() => { window.location.href = 'suppliers.html'; }, 700);
    } catch (error) {
      message.className = 'mt-3 alert alert-danger';
      message.textContent = error.message;
    }
  });
})();