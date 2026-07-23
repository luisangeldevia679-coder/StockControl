const API_URL = 'http://localhost:3000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...getAuthHeaders(), ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({ success: false, message: 'Respuesta inválida del servidor.' }));
  if (!response.ok) {
    throw new Error(data.message || 'Error en la solicitud');
  }
  return data;
}

window.stockControlApi = { request };
