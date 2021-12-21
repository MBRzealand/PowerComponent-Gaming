const namefield = document.getElementById('name');
const password = document.getElementById('password');

async function loginUser() {
  let data = {
    name: namefield.value,
    password: password.value,
  };

  let response = await fetch('http://127.0.0.1:3000/version1/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response) {
    let responseJson = await response.json();
    if (responseJson.msg == 'Bruger logget ind') {
      let url = new URL('http://127.0.0.1:5500/Admin/html/addProduct.html');
      document.location = url;
    } else {
      alert(responseJson.msg);
      let url = new URL('http://127.0.0.1:5500/Admin/html/addProduct.html');
      document.location = url;
    }
  }
}

