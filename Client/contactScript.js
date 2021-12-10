const submitButton = document.getElementById('submitEmail');
const emailfield = document.getElementById('InputEmail');
const textfield = document.getElementById('textField');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(emailfield.value);
  if (ValidateEmail(emailfield.value)) {
    mail();
  }
});

async function mail() {
  let data = { email: emailfield.value, text: textfield.value };
  console.log(data);

  let response = await fetch('http://127.0.0.1:3000/version1/sendMail', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response) {
    let responseJson = await response.json();
    alert(responseJson.msg);
  }
}

function ValidateEmail(mail) {
  if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(mail)) {
    return true;
  }
  alert('You have entered an invalid email address!');
  return false;
}
