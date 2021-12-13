let id = [];
let listOfItemKeys = [];

let displayCreditDetailsForm = () => {
    document.getElementById("customerDetailsSeperator").style.visibility = "visible"
}
let myWindow;
let redirectToPaypal = () => {
    if(myWindow != null) {
        myWindow.close()
    }
    myWindow = popupCenter({ url:"", title:null, w:400, h:600 })
    myWindow.document.write("<div style='height: 100%; display: flex; justify-content: center; align-items: center'><img src = '../assets/pay_pal_logo.png' style='width: 50%;' alt='PayPal'/></div>");
    document.getElementById("customerDetailsSeperator").style.visibility = "hidden"
}

let redirectToMobilepay = () => {
    if(myWindow != null) {
        myWindow.close()
    }
    myWindow = popupCenter({ url:"", title:null, w:400, h:600 })
    myWindow.document.write("<style>body{background-color: #5875fa}</style><div style='height: 100%; display: flex; justify-content: center; align-items: center'><img src = '../assets/mobile_pay_logo.png' style='width: 50%;' alt='MobilePay'/></div>");
    document.getElementById("customerDetailsSeperator").style.visibility = "hidden"
}

const popupCenter = ({url, title, w, h}) => {
    const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title,
        `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    )

    if (window.focus) newWindow.focus();

    return newWindow
}

//Email sending
function allStorage() {
    keys = Object.keys(localStorage);
  
    for (let i = 0; i < keys.length; i++) {
      listOfItemKeys.push(localStorage.key(i));
    }
    listOfItemKeys.forEach((key) => {
      if (key.substr(0, 9) == 'valgtVare') {
        id.push(localStorage.getItem(key));
      }
    });
  }

  async function mail() {
    allStorage();
    let data = { 
      customerName: document.getElementById("name").value,
      customerEmail: document.getElementById("email").value,
      customerAddress: document.getElementById("Address").value,
      customerZipCodeInput: document.getElementById("zipCodeInput").value,
      customerCityInput: document.getElementById("cityInput").value,
      customerCountry: document.getElementById("Countries").value,
      customerPhoneNmber: document.getElementById("phoneNumber").value,
      orderedItems: id }; 
       
    let response = await fetch('http://127.0.0.1:3000/version1/invoiceMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    /*if (response) {
      let responseJson = await response.json();
      alert(responseJson.msg);
    }*/
  }