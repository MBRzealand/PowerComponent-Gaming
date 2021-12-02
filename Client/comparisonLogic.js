

const listOfItems = [
    {name:"GPU",
    image:"../assets/placeholder_image.png",
    specifications: [{Hardware: 'hardware'}, {mereHardware: 'merehardware'},{software: 'software'}],
    price: 600,
    inStorage:10,
    amountSold: 1000,
    categories: [],
},
    {name:"GPU",
    image:"../assets/placeholder_image.png",
    specifications: [{Hardware: 'hardware'},{lidtSoftware: 'lidtSoftware'}, {software: 'software'},{software2: 'software2'}, {software3: 'software3'}],
    price: 600,
    inStorage:10,
    amountSold: 1000,
    categories: [],
},
{name:"GPU",
    image:"../assets/placeholder_image.png",
    specifications: [{Hardware: 'hardware'},{lidtSoftware: 'lidtToast'}, {software: 'software'}],
    price: 600,
    inStorage:10,
    amountSold: 1000,
    categories: [],
}];

const div = document.getElementById('centerContainer')


let pictureGenerator = (listOfItems) => {

  for (let index = 0; index < listOfItems.length; index++) {

    let picBox = document.createElement("img");
    picBox.style.width = 100 / listOfItems.length + '%';
    picBox.src = listOfItems[index].image;
    div.appendChild(picBox);

  }  
}

let tableGenerator = (listOfItems)  => {
  console.log(Object.keys(listOfItems[2].specifications[2]));

   let table = document.createElement("table");

  for (let outIndex = 0; outIndex < listOfItems.length; outIndex++) {
    let newRow = table.insertRow(-1);
    let firstCell = document.createElement("td");
    firstCell.appendChild(document.createTextNode(listOfItems[outIndex].name));
    newRow.style.width = 100 / listOfItems.length + '%';
    newRow.appendChild(firstCell);

    let priceCell = document.createElement("td");
    priceCell.appendChild(document.createTextNode('Pris: \n' + listOfItems[outIndex].price  + " kr."));

    newRow.appendChild(priceCell);


  for (let index = 0; index < Object.keys(listOfItems[outIndex].specifications).length; index++) {
  
    let newCell = newRow.insertCell(-1);
    let newText = document
    .createTextNode
    (Object.keys(listOfItems[outIndex].specifications[index]) 
    + ":\n " + Object.values(listOfItems[outIndex].specifications[index]))

    newCell.appendChild(newText);  
    
  }};



   

   div.appendChild(table);


   
}
pictureGenerator(listOfItems);
tableGenerator(listOfItems);