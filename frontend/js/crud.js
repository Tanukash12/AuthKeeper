const apiBase = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '/index.html';  // redirect to login if no token
}

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = '/index.html';
});

async function fetchItems() {
  const res = await fetch(apiBase + '/items', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const items = await res.json();
  const ul = document.getElementById('itemsList');
  ul.innerHTML = '';
  items.forEach(it => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${it.name}</span>
      <button data-id="${it._id}" class="edit">Edit</button>
      <button data-id="${it._id}" class="del">Delete</button>`;
    ul.appendChild(li);
  });
}

document.getElementById('createForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('itemName').value.trim();
  const res = await fetch(apiBase + '/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ name })
  });
  document.getElementById('itemName').value = '';
  await fetchItems();
});

document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('del')) {
    const id = e.target.dataset.id;
    await fetch(apiBase + '/items/' + id, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token } });
    await fetchItems();
  } else if (e.target.classList.contains('edit')) {
    const id = e.target.dataset.id;
    const newName = prompt('New name:');
    if (!newName) return;
    await fetch(apiBase + '/items/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ name: newName })
    });
    await fetchItems();
  }
});

fetchItems();
