(async function () {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '../auth/login.html';
    return;
  }

  const tableBody = document.getElementById('supplierTableBody');
  const searchInput = document.getElementById('searchSupplier');
  const statusSelect = document.querySelector('.supplier-toolbar select');
  if (!tableBody) return;

  let suppliers = [];
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]+/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[character]));

  const render = () => {
    const search = (searchInput?.value || '').toLowerCase().trim();
    const status = statusSelect?.value || 'Todos';
    const filtered = suppliers.filter((supplier) => {
      const text = [supplier.company_name, supplier.contact_name, supplier.email, supplier.phone, supplier.address].join(' ').toLowerCase();
      const matchesSearch = text.includes(search);
      const matchesStatus = status === 'Todos' || (status === 'Activos' && supplier.status === 'active') || (status === 'Inactivos' && supplier.status !== 'active');
      return matchesSearch && matchesStatus;
    });

    if (!filtered.length) {
      tableBody.innerHTML = '<tr><td colspan="8" class="text-center">No hay proveedores registrados.</td></tr>';
      return;
    }

    tableBody.innerHTML = filtered.map((supplier) => {
      const id = supplier.id;
      return `<tr>
        <td>${escapeHtml(id)}</td>
        <td>${escapeHtml(supplier.company_name)}</td>
        <td>${escapeHtml(supplier.contact_name)}</td>
        <td>${escapeHtml(supplier.phone)}</td>
        <td>${escapeHtml(supplier.email)}</td>
        <td>${escapeHtml(supplier.address)}</td>
        <td><span class="badge bg-success">Activo</span></td>
        <td>
          <a href="view-supplier.html?id=${encodeURIComponent(id)}" class="btn btn-sm btn-info" title="Ver"><i class="fa-solid fa-eye"></i></a>
          <a href="edit-supplier.html?id=${encodeURIComponent(id)}" class="btn btn-sm btn-warning" title="Editar"><i class="fa-solid fa-pen"></i></a>
          <button type="button" class="btn btn-sm btn-danger delete-supplier" data-id="${escapeHtml(id)}" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>`;
    }).join('');
  };

  const load = async () => {
    try {
      const response = await window.stockControlApi.request('/suppliers');
      suppliers = response.data || [];
      render();
    } catch (error) {
      tableBody.innerHTML = `<tr><td colspan="8" class="text-center text-danger">${escapeHtml(error.message)}</td></tr>`;
    }
  };

  searchInput?.addEventListener('input', render);
  statusSelect?.addEventListener('change', render);
  tableBody.addEventListener('click', async (event) => {
    const button = event.target.closest('.delete-supplier');
    if (!button || !window.confirm('¿Deseas eliminar este proveedor?')) return;
    try {
      await window.stockControlApi.request(`/suppliers/${button.dataset.id}`, { method: 'DELETE' });
      await load();
    } catch (error) {
      window.alert(error.message);
    }
  });

  await load();
})();
