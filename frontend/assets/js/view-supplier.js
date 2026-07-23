(async function () {
  const details = document.getElementById('supplierDetails');
  const id = new URLSearchParams(window.location.search).get('id');
  if (!details || !id || !localStorage.getItem('token')) {
    if (!localStorage.getItem('token')) window.location.href = '../auth/login.html';
    return;
  }
  try {
    const result = await window.stockControlApi.request(`/suppliers/${id}`);
    const supplier = result.data;
    const values = [['Empresa', supplier.company_name], ['Contacto', supplier.contact_name], ['Correo', supplier.email], ['Teléfono', supplier.phone], ['Dirección', supplier.address], ['Estado', 'Activo']];
    details.innerHTML = values.map(([label, value]) => `<dt class="col-sm-3">${label}</dt><dd class="col-sm-9">${value || 'No registrado'}</dd>`).join('');
    document.getElementById('editSupplierLink').href = `edit-supplier.html?id=${supplier.id}`;
  } catch (error) {
    details.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
  }
})();