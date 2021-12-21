const price = document.getElementById('price');
const nameOfProduct = document.getElementById('name');
const picture = document.getElementById('picture');
const amount = document.getElementById('amount');
const catagoriesDOM = document.getElementById('categories');
const description = document.getElementById('description');
const specKey = document.getElementById('specKey');
const specValue = document.getElementById('specValue');

document.getElementById('addCategorie').addEventListener('click', (e) => {
  e.preventDefault();
  addToCategories();
});
document.getElementById('addSpec').addEventListener('click', (e) => {
  e.preventDefault();
  specificationArray();
});
document.getElementById('addProduct').addEventListener('click', (e) => {
  e.preventDefault();
  addProduct();
});

const catagoriesList = [];
const specificationList = [];

function addToCategories() {
  catagoriesList.push(catagoriesDOM.value);
  catagoriesDOM.value = '';
}

let specificationArray = () => {
  let specKeyValue = specKey.value;
  let specValueValue = specValue.value;
  let specObject = { [specKeyValue]: specValueValue };

  specificationList.push(specObject);

  specKey.value = '';
  specValue.value = '';
};

async function addProduct() {
  console.log(specificationList);
  let data = {
    price: price.value,
    inStorage: amount.value,
    name: nameOfProduct.value,
    description: description.value,
    categories: catagoriesList,
    specifications: specificationList,
  };
  if (picture.value != '') {
    data.image = picture.value;
  }
  let response = await fetch('http://127.0.0.1:3000/version1/item', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response) {
    let responseJson = await response.json();
    console.log(responseJson);
    price.value = "";
    amount.value = "";
    nameOfProduct.value = "";
    description.value = "";
    catagoriesList = "";
    specificationList = "";
  }
}
