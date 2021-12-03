const cardContainer = document.getElementById('cardContainer');
let listOfItems = [];
let id = [];
let listOfItemKeys = [];

function allStorage() {
  (keys = Object.keys(localStorage)), (i = keys.length);
  while (i--) {
    listOfItemKeys.push(localStorage.key(i));
    listOfItemKeys.forEach((key) => {
      if (localStorage.getItem(key).substr(0, 9) == 'valgtVare') {
        id.push(localStorage.getItem(key));
      }
    });
  }
}
allStorage();

async function getItems(id) {
  let response = await fetch(`http://localhost:3000/version1/item/${id}`);
  let Json = await response.json();
  return Json;
}

let generateCards = (response) => {
  const nameArrayLength = response.foundElements.name.length;

  for (let i = 0; i < nameArrayLength; i++) {
    const productName = document.createElement('h3');
    const name = document.createTextNode(response.foundElements.name[i].name);
    productName.appendChild(name);

    const specificationTitle = document.createElement('h4');
    const title = document.createTextNode('Specifications:');
    specificationTitle.appendChild(title);

    const productSpecifications = document.createElement('p');

    for (
      let j = 0;
      j < response.foundElements.name[i].specifications.length * 2;
      j += 2
    ) {
      let specificationList = displaySpecifications(
        response.foundElements.name[i].specifications
      );

      let specificationKeyValuePair = document.createElement('p');

      let keyValuePair = document.createTextNode(
        `${specificationList[j]}: ${specificationList[j + 1]}`
      );

      specificationKeyValuePair.appendChild(keyValuePair);

      productSpecifications.appendChild(specificationKeyValuePair);
    }

    const productPrice = document.createElement('button');
    const price = document.createTextNode(
      `${response.foundElements.name[i].price} kr`
    );
    productPrice.setAttribute('class', 'price');
    productPrice.appendChild(price);

    let picturebox = document.createElement('img');
    picturebox.src = response.foundElements.name[i].image;
    picturebox.setAttribute('class', 'productImage');

    const productCard = document.createElement('div');
    productCard.appendChild(picturebox);
    productCard.appendChild(productName);
    productCard.appendChild(specificationTitle);
    productCard.appendChild(productSpecifications);

    productCard.appendChild(productPrice);
    productCard.setAttribute('class', 'card');

    namesDiv.appendChild(productCard);

    productCard.addEventListener('click', function () {
      goToProductPage(response.foundElements.name[i]._id);
    });
  }
};

let goToProductPage = (itemID) => {
  let url = new URL('http://localhost:5500/Client/productPage.html');
  url.searchParams.append('itemID', itemID);
  document.location = url;
};
