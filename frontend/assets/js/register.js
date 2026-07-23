const API_URL = 'http://localhost:3000/api/auth';

function showMessage(message, type = 'error') {
  const oldAlert = document.querySelector('.custom-alert');
  if (oldAlert) oldAlert.remove();

  const alert = document.createElement('div');
  alert.className = 'custom-alert';
  alert.innerHTML = `<div class="alert-content ${type}">${message}</div>`;
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 3000);
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!name || !email || !password || !confirmPassword) {
      showMessage('Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      showMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json().catch(() => ({ message: 'Respuesta inválida del servidor.' }));
      if (!response.ok) throw new Error(data.message || 'Error al registrar usuario');

      showMessage('Usuario registrado correctamente', 'success');
      setTimeout(() => {
        window.location.href = '../auth/login.html';
      }, 1000);
    } catch (error) {
      showMessage(error.message || 'No fue posible conectar con el servidor.');
      console.error(error);
    }
  });
}
