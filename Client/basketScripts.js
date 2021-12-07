const cardContainer = document.getElementById('cardContainer');
let listOfItems = [];
let id = [];
let listOfItemKeys = [];
let priceArray = [];

async function start() {
  listOfItems = [];
  id = [];
  listOfItemKeys = [];
  allStorage();
  for (let i = 0; i < id.length; i++) {
    await generateCards(await getItems(id[i]));
  }

  let totalPrice = priceArray.reduce((acc, val) => {
    return acc + val;
  }, 0);
  document.getElementById('totalPriceLabel').innerHTML += totalPrice + ' kr';
}

async function getItems(itemID) {
  let response = await fetch(`http://localhost:3000/version1/item/${itemID}`);
  return await response.json();
}

document.onload = start();

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

async function generateCards(response) {
  const productName = document.createElement('h3');
  const name = document.createTextNode(response.item.name);

  productName.appendChild(name);
  const specificationTitle = document.createElement('h4');
  const title = document.createTextNode('Specifications:');
  specificationTitle.appendChild(title);

  const productPrice = document.createElement('p');
  const price = document.createTextNode(`${response.item.price} kr`);
  productPrice.setAttribute('class', 'price');
  productPrice.appendChild(price);

  priceArray.push(parseFloat(response.item.price));

  const removeProduct = document.createElement('button');
  const removeIcon = document.createTextNode('\u00d7');
  removeProduct.setAttribute(
    'class',
    'btn btn-primary removeProduct btnStyling'
  );
  removeProduct.appendChild(removeIcon);
  removeProduct.addEventListener('click', () => {
    removeProductFromList(response);
  });

  let picturebox = document.createElement('img');
  picturebox.src = response.item.image;
  picturebox.setAttribute('class', 'productImage');

  const productCard = document.createElement('div');
  const innerDivLeft = document.createElement('div');
  innerDivLeft.setAttribute('class', 'flexRow');
  const innerDivRight = document.createElement('div');
  innerDivRight.setAttribute('class', 'flexEnd');
  const pictureContainer = document.createElement('div');
  pictureContainer.setAttribute('class', 'pictureContainer');
  pictureContainer.appendChild(picturebox);
  innerDivLeft.appendChild(pictureContainer);
  innerDivLeft.appendChild(productName);

  innerDivRight.appendChild(productPrice);
  innerDivRight.appendChild(removeProduct);
  productCard.setAttribute('class', 'card');
  productCard.appendChild(innerDivLeft);

  productCard.appendChild(innerDivRight);
  cardContainer.appendChild(productCard);
}

let goToProductPage = (itemID) => {
  let url = new URL('http://localhost:5500/Client/productPage.html');
  url.searchParams.append('itemID', itemID);
  document.location = url;
};

let removeProductFromList = (response) => {
  keys = Object.keys(localStorage);
  let valueArray = [];
  keys.forEach((element) => {
    valueArray.push(localStorage.getItem(element));
  });

  valueArray.forEach((element, i) => {
    if (response.item._id == element) {
      localStorage.removeItem(keys[i]);
    }
  });

  let url = new URL('http://localhost:5500/Client/basket.html');
  document.location = url;
};

let displaySpecifications = (specificationsObjectArray) => {
  let specificationsArray = [];

  specificationsObjectArray.forEach((specifications) => {
    for (key in specifications) {
      if (key != '_id') {
        specificationsArray.push(key);
        specificationsArray.push(specifications[key]);
      }
    }
  });

  return specificationsArray;
};
