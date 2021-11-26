

const createCatalouge = async () => {

    

    let response = await fetch('http://127.0.0.1:3000/version1/item');

    let itemsJSON = await response.json();

    let itemsArray = await itemsJSON.items;
        
    console.log(itemsArray);

    for (let itemIndex = 0; itemIndex < itemsArray.length; itemIndex++) {
        const item = itemsArray[itemIndex];

        document.getElementById('centerContainer').appendChild(itemCard(item));
    }
}
createCatalouge();

let itemCard = (item) => {

    const itemContainerDiv = document.createElement('div');
        itemContainerDiv.style.backgroundColor = "#666666";
        itemContainerDiv.id = "itemContainerDiv";
        let x = $("#centerContainer").width();
        
        
    const itemNameContainer = document.createElement('h4');
        itemNameContainer.innerHTML = item.name;

    const itemImageContainer = document.createElement('div');
        itemImageContainer.style.width = "90%";
        itemImageContainer.style.height = "45%";
        itemImageContainer.style.backgroundColor = "white";
        itemImageContainer.style.position = "center";
        itemImageContainer.style.margin = "auto";
        itemImageContainer.style.marginBottom = "5%";

    const itemImage = document.createElement('IMG');
        itemImage.scr = "assets/placeholder_image.png";
        itemImage.style.width = "auto";
        itemImage.style.height = "auto";
    
    const itemPriceContainer = document.createElement('h5');
        itemPriceContainer.innerHTML = item.price + ',- kr';

    const itemStorageContainer = document.createElement('div');
        itemStorageContainer.style.width = "80px";
        itemStorageContainer.style.width = "20px";
        let itemStorageAmount = item.inStorage;
        if (itemStorageAmount <= 5) {
            itemStorageContainer.style.backgroundColor = "red";
        } else if (itemStorageAmount <= 10) {
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



