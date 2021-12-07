const submitButton = document.getElementById('submitEmail');
const emailfield = document.getElementById('InputEmail');
const textfield = document.getElementById('textField');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  mail();
});

async function mail() {
  let data = { email: emailfield.value, text: textfield.value };

 
    
    let response = await fetch('localhost:3000/version1/sendMail', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },body : JSON.stringify(data),
    });
    console.log(response)
   

  let itemsJSON = await response.json();
};
