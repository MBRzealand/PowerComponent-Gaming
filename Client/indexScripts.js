const searchInput = document.getElementById('searchInput');
let itemsArray = [];
let compareID = 0;

function start() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('itemsArray')) {
    itemsArray = JSON.parse(urlParams.get('itemsArray'));
    createCatalouge(itemsArray);
  } else {
    fetchCatalouge();
  }
}

async function fetchCatalouge() {
  let response = await fetch('http://127.0.0.1:3000/version1/item');

  let itemsJSON = await response.json();

  itemsArray = await itemsJSON.items;

  createCatalouge(itemsArray);
}

function createCatalouge(itemsArray) {
  // Clear HTML container
  const container = document.getElementById('centerContainer');
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }

  for (let itemIndex = 0; itemIndex < itemsArray.length; itemIndex++) {
    const item = itemsArray[itemIndex];

    document.getElementById('centerContainer').appendChild(itemCard(item));
  }
}

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

let itemCard = (item) => {
  const itemContainerDiv = document.createElement('div');
  itemContainerDiv.setAttribute('class', 'itemContainerDiv');

  itemContainerDiv.addEventListener('click', function () {
    goToProductPage(item._id);
  });

  const itemNameContainer = document.createElement('h4');
  itemNameContainer.innerHTML = item.name;

  const itemImageContainer = document.createElement('div');
  itemImageContainer.setAttribute('class', 'cardImageContainer');

  const itemImage = document.createElement('img');
  itemImage.src = item.image;
  itemImage.setAttribute('class', 'cardImage');

  const itemPriceContainer = document.createElement('h5');
  itemPriceContainer.innerHTML = item.price + ',- kr';

  const itemStorageContainerHolder = document.createElement('div');
  itemStorageContainerHolder.setAttribute(
    'class',
    'itemStorageContainerHolder'
  );
  const itemStorageContainer = document.createElement('div');
  itemStorageContainer.setAttribute('class', 'cardItemStorage');
  let itemStorageAmount = item.inStorage;
  if (itemStorageAmount < 5) {
    itemStorageContainer.style.backgroundColor = 'red';
  } else if (itemStorageAmount < 10) {
    itemStorageContainer.style.backgroundColor = 'yellow';
  } else {
    itemStorageContainer.style.backgroundColor = 'green';
  }
  const itemAmountInStorage = document.createElement('p');
  itemAmountInStorage.innerHTML = item.inStorage + ' stk. p?? lager';

  const itemAmountSoldContainer = document.createElement('p');
  itemAmountSoldContainer.innerHTML = 'Antal solgt: ' + item.amountSold;

  const itemSpecificationContainer = document.createElement('ul');

  const itemLength =
    item.specifications.length < 3 ? item.specifications.length : 3;
  for (let j = 0; j < itemLength * 2; j += 2) {
    let specificationList = displaySpecifications(item.specifications);

    let specificationNode = document.createTextNode(
      `${specificationList[j]}: ${specificationList[j + 1]}`
    );
    let node = document.createElement('li');
    node.appendChild(specificationNode);
    itemSpecificationContainer.appendChild(node);
  }

  const compareBtn = document.createElement('button');
  compareBtn.setAttribute('class', ' btn btnStyling');
  compareBtn.appendChild(document.createTextNode('Compare'));
  compareBtn.addEventListener('click', (e) => {
    if (compareID < 4) {
      localStorage.setItem(compareID, item._id);
      compareID++;
    } else {
      alert('Too many items up for comparison');
    }
    e.stopPropagation();
  });

  const productBTN = document.createElement('button');
  productBTN.setAttribute('class', 'btn btnStyling');
  productBTN.appendChild(document.createTextNode('Se vare'));

  // Card append design
  itemStorageContainerHolder.appendChild(itemStorageContainer);
  itemStorageContainerHolder.appendChild(itemAmountInStorage);
  itemImageContainer.appendChild(itemImage);
  itemContainerDiv.appendChild(itemImageContainer);
  itemContainerDiv.appendChild(itemNameContainer);
  itemContainerDiv.appendChild(itemStorageContainerHolder);
  itemContainerDiv.appendChild(itemAmountSoldContainer);
  itemContainerDiv.appendChild(itemSpecificationContainer);
  itemContainerDiv.appendChild(itemPriceContainer);
  itemContainerDiv.appendChild(compareBtn);
  itemContainerDiv.appendChild(productBTN);

  return itemContainerDiv;
};

let sortPriceBigToSmall = false;
let sortNameAToZ = true;
let sortAmountSoldBigToSmall = true;
const dropdownSortPriceBtn = document.getElementById('priceSortBtn');
const dropdownSortNameBtn = document.getElementById('nameSortBtn');
const dropdownSortAmountSoldBtn = document.getElementById('amoundSoldSortBtn');

const sortForPrice = () => {
  // Sort Array
  if (sortPriceBigToSmall) {
    itemsArray.sort(function (a, b) {
      return a.price - b.price;
    });
    dropdownSortNameBtn.innerHTML = 'Navn';
    dropdownSortAmountSoldBtn.innerHTML = 'Antal solgt';
    dropdownSortPriceBtn.innerHTML = 'Pris &#11014';
    sortPriceBigToSmall = false;
  } else {
    itemsArray.sort(function (a, b) {
      return b.price - a.price;
    });
    dropdownSortNameBtn.innerHTML = 'Navn';
    dropdownSortAmountSoldBtn.innerHTML = 'Antal solgt';
    dropdownSortPriceBtn.innerHTML = 'Pris &#11015';
    sortPriceBigToSmall = true;
  }

  // Clear HTML container
  const container = document.getElementById('centerContainer');
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }
  // Input sorted cards in HTML
  for (let itemIndex = 0; itemIndex < itemsArray.length; itemIndex++) {
    const item = itemsArray[itemIndex];
    document.getElementById('centerContainer').appendChild(itemCard(item));
  }
};
dropdownSortPriceBtn.addEventListener('click', sortForPrice);

const sortForName = () => {
  // Sort Array
  if (sortNameAToZ) {
    itemsArray.sort(function (a, b) {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      return a < b ? -1 : a > b ? 1 : 0;
    });
    dropdownSortNameBtn.innerHTML = 'Navn &#11015';
    dropdownSortAmountSoldBtn.innerHTML = 'Antal solgt';
    dropdownSortPriceBtn.innerHTML = 'Pris';
    sortNameAToZ = false;
  } else {
    itemsArray
      .sort(function (a, b) {
        a = a.name.toLowerCase();
        b = b.name.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
      })
      .reverse();
    dropdownSortNameBtn.innerHTML = 'Navn &#11014';
    dropdownSortAmountSoldBtn.innerHTML = 'Antal solgt';
    dropdownSortPriceBtn.innerHTML = 'Pris';
    sortNameAToZ = true;
  }

  // Clear HTML container
  const container = document.getElementById('centerContainer');
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }
  // Input sorted cards in HTML
  for (let itemIndex = 0; itemIndex < itemsArray.length; itemIndex++) {
    const item = itemsArray[itemIndex];
    document.getElementById('centerContainer').appendChild(itemCard(item));
  }
};
dropdownSortNameBtn.addEventListener('click', sortForName);

const sortForAmountSold = () => {
  // Sort Array
  if (sortAmountSoldBigToSmall) {
    itemsArray.sort(function (a, b) {
      return a.amountSold - b.amountSold;
    });
    dropdownSortNameBtn.innerHTML = 'Navn';
    dropdownSortAmountSoldBtn.innerHTML = 'Antal solgt &#11014';
    dropdownSortPriceBtn.innerHTML = 'Pris';
    sortAmountSoldBigToSmall = false;
  } else {
    itemsArray.sort(function (a, b) {
      return b.price - a.price;
    });
    dropdownSortNameBtn.innerHTML = 'Navn';
    dropdownSortAmountSoldBtn.innerHTML = 'Antal solgt &#11015';
    dropdownSortPriceBtn.innerHTML = 'Pris';
    sortAmountSoldBigToSmall = true;
  }

  // Clear HTML container
  const container = document.getElementById('centerContainer');
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }
  // Input sorted cards in HTML
  for (let itemIndex = 0; itemIndex < itemsArray.length; itemIndex++) {
    const item = itemsArray[itemIndex];
    document.getElementById('centerContainer').appendChild(itemCard(item));
  }
};
dropdownSortAmountSoldBtn.addEventListener('click', sortForAmountSold);

let goToProductPage = (itemID) => {
  let url = new URL('http://localhost:5500/Client/productPage.html');
  url.searchParams.append('itemID', itemID);
  document.location = url;
};

start();
