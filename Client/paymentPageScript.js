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