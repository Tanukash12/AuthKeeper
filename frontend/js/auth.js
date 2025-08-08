const apiBase = 'http://localhost:5000/api';

document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('su_username').value.trim();
  const password = document.getElementById('su_password').value.trim();
  const res = await fetch(apiBase + '/auth/signup', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  document.getElementById('msg').innerText = data.message || JSON.stringify(data);
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('li_username').value.trim();
  const password = document.getElementById('li_password').value.trim();
  const res = await fetch(apiBase + '/auth/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('msg').innerText = data.message || 'Login failed';
  }
});
