const searchInput = document.getElementById('searchInput');
const productName = document.getElementById('productName');
const productDescription = document.getElementById('productDescription');
const productPrice = document.getElementById('price');
const productStorage = document.getElementById('productStorage');
const productStorageDiv = document.getElementById('productStorageDiv');
const productSpecificationsDIV = document.getElementById(
  'productSpecifications'
);

let searchFunction = () => {
  let search = searchInput.value;
  let url = new URL('http://localhost:5500/Client/resultsPage.html');
  url.searchParams.append('input', search);
  document.location = url;
};

function start() {
  const urlParams = new URLSearchParams(window.location.search);
  let productID = urlParams.get('itemID');
  getClickedElement(productID);
}

start();

async function getClickedElement(itemID) {
  let response = await fetch(`http://localhost:3000/version1/item/${itemID}`);

  let product = await response.json();

  generateProductPage(product);
}

let displaySpecifications = (specificationsObjectArray) => {
  let specificationsArray = [];

  specificationsObjectArray.forEach((specifications) => {
    for (key in specifications) {
      specificationsArray.push(key);
      specificationsArray.push(specifications[key]);
    }
  });

  return specificationsArray;
};

let generateProductPage = (product) => {
  // Image code
  const itemImage = document.createElement('img');
  itemImage.src = product.item.image;
  itemImage.setAttribute('class', 'cardImage');
  document.getElementById('productImage').appendChild(itemImage);
  
  // Product content code
  
  productName.innerText = product.item.name;
  if (product.item.description) {
    productDescription.innerText = product.item.description;
  }
  productPrice.innerText = product.item.price + ",-";

  let itemStorageAmount = product.item.inStorage;
  if (itemStorageAmount < 5) {
    productStorageDiv.style.backgroundColor = 'red';
  } else if (itemStorageAmount < 10) {
    productStorageDiv.style.backgroundColor = 'yellow';
  } else {
    productStorageDiv.style.backgroundColor = 'green';
  }
  productStorage.innerHTML = itemStorageAmount + " stk. på lager";


  // Specification code

  const itemSpecificationContainer = document.createElement('ul');

  for (let j = 0; j < product.item.specifications.length * 2; j += 2) {
    let specificationList = displaySpecifications(product.item.specifications);
    let pTag = document.createElement('p');
    pTag.innerHTML = `${specificationList[j]}: ${specificationList[j + 1]}`;
    
    itemSpecificationContainer.appendChild(pTag);
    let div = document.getElementById('specificationDiv');
    div.appendChild(itemSpecificationContainer);
  }
};
