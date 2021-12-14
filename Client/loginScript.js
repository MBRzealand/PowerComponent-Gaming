const emailfield = document.getElementById('email');
const password = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');

document.onload = checkUsernameCookie();

async function loginUser() {

    let data = {
        email : emailfield.value,
        password : password.value,
    }

    let response = await fetch('http://127.0.0.1:3000/version1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response) {
        let responseJson = await response.json();
        alert(responseJson.msg);
        if (responseJson.msg == 'Bruger logget ind') {
            if (rememberMeCheckbox.checked) {
                document.cookie = "username=" + emailfield.value;
            } else if (!rememberMeCheckbox.checked) {
                document.cookie = "username=";
            }
            document.cookie = "loggedIn=true";
            let url = new URL('http://localhost:5500/Client/Index.html');
            document.location = url;
        }
    }

}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function checkUsernameCookie() {
    let username = getCookie("username");
    if (username != "") {
     emailfield.value = username;
    }
  }

