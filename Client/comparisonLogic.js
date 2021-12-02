let listOfItems = [];

const id = [
  '61a0f32beae39f64a39f4309',
  '61a4d8c49d3185de10ce5821',
  '61a4dd2b4ff539de44db96ad',
];

async function getItems(id) {
  let response = '';
  response = await fetch(`http://localhost:3000/version1/item/${id}`);
  let Json = await response.json()
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
console.log(listOfItems);

const div = document.getElementById('centerContainer');

let pictureGenerator = (listOfItems) => {
  for (let index = 0; index < listOfItems.length; index++) {
<<<<<<< HEAD

    let picBox = document.createElement("img");
    picBox.style.backgroundColor = '#212529';
    picBox.style.width = ((100 - listOfItems.length * 4) / listOfItems.length) + '%';
=======
    let picBox = document.createElement('img');
    picBox.style.width = 100 / listOfItems.length + '%';
>>>>>>> cdf4ce0c733b24ddfb0f9e3cd9de53418b85c65a
    picBox.src = listOfItems[index].image;

    div.appendChild(picBox);
  }
};

let tableGenerator = (listOfItems) => {
  let table = document.createElement('table');

  for (let outIndex = 0; outIndex < listOfItems.length; outIndex++) {
    let newRow = table.insertRow(-1);
<<<<<<< HEAD
    let firstCell = document.createElement("th");
=======
    let firstCell = document.createElement('td');
>>>>>>> cdf4ce0c733b24ddfb0f9e3cd9de53418b85c65a
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
