const password = document.getElementById('password');
const namefield = document.getElementById('name');

async function createUser() {
  let data = {
    password: password.value,
    name: namefield.value,
  };

  let response = await fetch('http://127.0.0.1:3000/version1/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response) {
    let responseJson = await response.json();
    alert(responseJson.msg);
    let url = new URL('http://127.0.0.1:5500/Admin/html/login.html');
    document.location = url;
  }
}
