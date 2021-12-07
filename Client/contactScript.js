const submitButton = document.getElementById('submitEmail');
const emailfield = document.getElementById('InputEmail');
const textfield = document.getElementById('textField');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  mail();
});

async function mail() {
  let data = await { email: emailfield.value, text: textfield.value };
  console.log(data);

  let response = await fetch('http://127.0.0.1:3000/version1/sendMail', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: {
      email: 'Anders',
      text: 'Hello chilas from postman',
    },
  });
  console.log(response);
}
