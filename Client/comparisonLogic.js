let listOfItems = [];
let id = [];
let listOfItemKeys = [];
function allStorage() {
  (keys = Object.keys(localStorage)), (i = keys.length);
  while (i--) {
    listOfItemKeys.push(localStorage.key(i));
  }
  listOfItemKeys.forEach((key) => {
    if (localStorage.getItem(key).substr(0, 9) != 'valgtVare') {
      id.push(localStorage.getItem(key));
    }
  });
}
allStorage();

async function getItems(id) {
  let response = '';
  response = await fetch(`http://localhost:3000/version1/item/${id}`);
  let Json = await response.json();
  return Json;
}

async function loop() {
  for (let index = 0; index < id.length; index++) {
    let item = await getItems(id[index]);
    listOfItems.push(item.item);
  }
  pictureGenerator(listOfItems);
  tableGenerator(listOfItems);
}
loop();

const div = document.getElementById('centerContainer');

let pictureGenerator = (listOfItems) => {
  for (let index = 0; index < listOfItems.length; index++) {
    let picBox = document.createElement('img');
    picBox.style.backgroundColor = '#212529';
    picBox.style.width =
      (100 - listOfItems.length * 4) / listOfItems.length + '%';
    picBox.src = listOfItems[index].image;
    picBox.addEventListener('click', function () {
      goToProductPage(listOfItems[index]._id);
    });

    div.appendChild(picBox);
  }
};

let tableGenerator = (listOfItems) => {
  let table = document.createElement('table');

  for (let outIndex = 0; outIndex < listOfItems.length; outIndex++) {
    let newRow = table.insertRow(-1);
    let firstCell = document.createElement('th');
    firstCell.appendChild(document.createTextNode(listOfItems[outIndex].name));
    newRow.style.width = 100 / listOfItems.length + '%';
    newRow.appendChild(firstCell);

    let priceCell = document.createElement('td');
    priceCell.appendChild(
      document.createTextNode('Pris: \n' + listOfItems[outIndex].price + ' kr.')
    );

    newRow.appendChild(priceCell);

    for (
      let index = 0;
      index < Object.keys(listOfItems[outIndex].specifications).length;
      index++
    ) {
      let newCell = newRow.insertCell(-1);
      let newText = document.createTextNode(
        Object.keys(listOfItems[outIndex].specifications[index]) +
          ':\n ' +
          Object.values(listOfItems[outIndex].specifications[index])
      );

      newCell.appendChild(newText);
    }
  }
  div.appendChild(table);
};

function clearLocalStorage() {
  listOfItemKeys.forEach((key) => {
    if (localStorage.getItem(key) != 'valgtVare') {
      localStorage.removeItem(key);
    }
  });
  let url = new URL('http://localhost:5500/Client/comparison.html');
  document.location = url;
}

let goToProductPage = (itemID) => {
  let url = new URL('http://localhost:5500/Client/productPage.html');
  url.searchParams.append('itemID', itemID);
  document.location = url;
};
