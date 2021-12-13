const emailfield = document.getElementById('email');
const password = document.getElementById('password');
const namefield = document.getElementById('name');
const adressefield = document.getElementById('Address');
const zipcode = document.getElementById('zipCodeInput');
const cityname = document.getElementById('cityInput');
const country = document.getElementById('Countries');
const phone = document.getElementById('phoneNumber');
const cardnumber = document.getElementById('cardNumberInput');
const expiration = document.getElementById('expiryInput');

async function createUser(){

    let data = {
        email : emailfield.value,
        password : password.value,
        name : namefield.value,
        phonenumber : phone.value,

        adresse : {
            street : adressefield.value,
        zipCode : zipcode.value,
        city : cityname.value,
        country : country.value,  
        },
      
        cardInformation: {
        cardNumber : cardnumber.value,
        cardExpiryDate : expiration.value,
        }
    }

    let response = await fetch('http://127.0.0.1:3000/version1/user', {
        method: 'POST',
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