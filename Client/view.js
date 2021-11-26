

let itemsArray = [];

const createCatalouge = async () => {

    let response = await fetch('http://127.0.0.1:3000/version1/item');

    let itemsJSON = await response.json();

    itemsArray = await itemsJSON.items;

    console.log(itemsArray);

    for (let itemIndex = 0; itemIndex < itemsArray.length; itemIndex++) {
        const item = itemsArray[itemIndex];

        document.getElementById('centerContainer').appendChild(itemCard(item));
    }

}
createCatalouge();

let itemCard = (item) => {

    const itemContainerDiv = document.createElement('div');
        itemContainerDiv.id = "itemContainerDiv";
        
    const itemNameContainer = document.createElement('h4');
        itemNameContainer.innerHTML = item.name;

    const itemImageContainer = document.createElement('div');
        itemImageContainer.setAttribute('class', "cardImageContainer");

    const itemImage = document.createElement('img');
        itemImage.scr = "./assets/placeholder_image.png";
        itemImage.setAttribute('class', "cardImage");
    
    const itemPriceContainer = document.createElement('h5');
        itemPriceContainer.innerHTML = item.price + ',- kr';

    const itemStorageContainer = document.createElement('div');
        itemStorageContainer.setAttribute('class', "cardItemStorage");
        let itemStorageAmount = item.inStorage;
        if (itemStorageAmount < 5) {
            itemStorageContainer.style.backgroundColor = "red";
        } else if (itemStorageAmount < 10) {
            itemStorageContainer.style.backgroundColor = "yellow";
        } else {
            itemStorageContainer.style.backgroundColor = "green";
        }
    
    const itemAmountSoldContainer = document.createElement('p');
        itemAmountSoldContainer.innerHTML = "Antal solgt: " + item.amountSold;

    const itemCategoriesContainer = document.createElement('p');
        itemCategoriesContainer.innerHTML = "Kategorier";

    const itemSpecificationContainer = document.createElement('p');
        itemSpecificationContainer.innerHTML = "Specifikationer";
        
    // Card append design
    itemContainerDiv.appendChild(itemImageContainer);
    itemImageContainer.appendChild(itemImage);
    itemContainerDiv.appendChild(itemNameContainer);
    itemContainerDiv.appendChild(itemStorageContainer);
    itemContainerDiv.appendChild(itemAmountSoldContainer);
    itemContainerDiv.appendChild(itemCategoriesContainer);
    itemContainerDiv.appendChild(itemSpecificationContainer);
    itemContainerDiv.appendChild(itemPriceContainer);


    return itemContainerDiv;
}

let sortPriceBigToSmall = false;
let sortNameAToZ = true;
let sortAmountSoldBigToSmall = true;
const dropdownSortPriceBtn = document.getElementById('priceSortBtn');
const dropdownSortNameBtn = document.getElementById('nameSortBtn');
const dropdownSortAmountSoldBtn = document.getElementById('amoundSoldSortBtn');

const sortForPrice = () => {

    // Sort Array
    if (sortPriceBigToSmall) {
        itemsArray.sort(function(a, b) {
            return a.price - b.price;
        });
        dropdownSortNameBtn.innerHTML = "Navn";
        dropdownSortAmountSoldBtn.innerHTML = "Antal solgt";
        dropdownSortPriceBtn.innerHTML = "Pris &#11014";
        sortPriceBigToSmall = false;
    } else {
        itemsArray.sort(function(a, b) {
            return b.price - a.price;
        });
        dropdownSortNameBtn.innerHTML = "Navn";
        dropdownSortAmountSoldBtn.innerHTML = "Antal solgt";
        dropdownSortPriceBtn.innerHTML = "Pris &#11015";
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

}
dropdownSortPriceBtn.addEventListener('click', sortForPrice);

const sortForName = () => {

    // Sort Array
    if (sortNameAToZ) {
        itemsArray.sort(function(a, b) {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        });
        dropdownSortNameBtn.innerHTML = "Navn &#11015";
        dropdownSortAmountSoldBtn.innerHTML = "Antal solgt";
        dropdownSortPriceBtn.innerHTML = "Pris";
        sortNameAToZ = false;
    } else {
        itemsArray.sort(function(a, b) {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        }).reverse();
        dropdownSortNameBtn.innerHTML = "Navn &#11014";
        dropdownSortAmountSoldBtn.innerHTML = "Antal solgt";
        dropdownSortPriceBtn.innerHTML = "Pris";
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

}
dropdownSortNameBtn.addEventListener('click', sortForName);

const sortForAmountSold = () => {

    // Sort Array
    if (sortAmountSoldBigToSmall) {
        itemsArray.sort(function(a, b) {
            return a.amountSold - b.amountSold;
        });
        dropdownSortNameBtn.innerHTML = "Navn";
        dropdownSortAmountSoldBtn.innerHTML = "Antal solgt &#11014";
        dropdownSortPriceBtn.innerHTML = "Pris";
        sortAmountSoldBigToSmall = false;
    } else {
        itemsArray.sort(function(a, b) {
            return b.price - a.price;
        });
        dropdownSortNameBtn.innerHTML = "Navn";
        dropdownSortAmountSoldBtn.innerHTML = "Antal solgt &#11015";
        dropdownSortPriceBtn.innerHTML = "Pris";
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

}
dropdownSortAmountSoldBtn.addEventListener('click', sortForAmountSold);
