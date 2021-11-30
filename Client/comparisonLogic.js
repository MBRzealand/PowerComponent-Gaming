

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
    specifications: [{Hardware: 'hardware'},{lidtSoftware: 'lidtSoftware'}, {software: 'software'}],
    price: 600,
    inStorage:10,
    amountSold: 1000,
    categories: [],
}];

function itemSort(itemList){
    let specificationsArray = [];
  
    itemList.forEach(element => {
        
        
        element.forEach((specifications) => {
        for (key in specifications) {
            
          specificationsArray.push(key);
          specificationsArray.push(specifications[key]);
            
        }
      });
    });

      console.log(specificationsArray);
}

itemSort(listOfItems);

let displaySpecifications = (specificationsObjectArray) => {
    let specificationsArray = [];
  
    specificationsObjectArray.forEach((specifications) => {
      for (key in specifications) {
          
        specificationsArray.push(key);
        specificationsArray.push(specifications[key]);
      }
    });
  
    console.log(specificationsArray);
  
    return specificationsArray;
  };



const div = document.getElementById('centerContainer')

let generateCards = (listOfItems) => {
    const listLenght = listOfItems.length;
    console.log(listLenght);
  
    for (let i = 0; i < listLenght; i++) {
      const productName = document.createElement('h3');
      const name = document.createTextNode(listOfItems[i].name);
      productName.appendChild(name);
  
      const specificationTitle = document.createElement('h4');
      const title = document.createTextNode('Specifications:');
      specificationTitle.appendChild(title);
  
      const productSpecifications = document.createElement('p');

      
  
      for (
        let j = 0;
        j < listOfItems[i].specifications.length * 2;
        j += 2
      ) {console.log(j);
        let specificationList = displaySpecifications(
            listOfItems[i].specifications
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
        `${listOfItems[i].price} kr`
      );
      productPrice.setAttribute('class', 'price');
      productPrice.appendChild(price);
  
      let picturebox = document.createElement('img');
      picturebox.src = listOfItems[i].image;
      picturebox.setAttribute('class', 'productImage');
  
      const productCard = document.createElement('div');
      productCard.appendChild(picturebox);
      productCard.appendChild(productName);
      productCard.appendChild(specificationTitle);
      productCard.appendChild(productSpecifications);
  
      productCard.appendChild(productPrice);
      productCard.setAttribute('class', 'card');
  
      div.appendChild(productCard);
    }
}
generateCards(listOfItems);