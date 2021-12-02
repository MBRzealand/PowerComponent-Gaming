const searchInput = document.getElementById('searchInput');

const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("price");
const productSpecificationsDIV = document.getElementById("productSpecifications")


let searchFunction = () => {
    let search = searchInput.value;
    let url = new URL('http://localhost:5500/Client/resultsPage.html');
    url.searchParams.append('input', search);
    document.location = url;
};

let start = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let productID = urlParams.get('itemID');
    getClickedElement(productID)
};
document.onload = start();


let getClickedElement = async (itemID) => {

        let response = await fetch(
        `http://localhost:3000/version1/item/${itemID}`
        );

        let product = await response.json();

        generateProductPage(product)

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

let generateProductPage = (product) => {
    productName.innerText = product.name
    productDescription.innerText = product.description
    productPrice.innerText = product.price

    for (let j = 0; j < product.specifications.length * 2; j += 2) {
        let specificationList = displaySpecifications(product.specifications);

        let specificationNode = document.createTextNode(
            `${specificationList[j]}: ${specificationList[j + 1]}`
        );
        let node = document.createElement('li');
        node.appendChild(specificationNode);
        itemSpecificationContainer.appendChild(node);
    }


    for (let i = 0; i < product.specifications.length; i++) {
        let specification = document.createElement("div")
        let specificationKey = document.createElement("p")
        let specificationValue = document.createElement("p")
        specification.appendChild(specificationKey)
        specification.appendChild(specificationValue)

        specificationKey.innerText = product.specifications

        productSpecificationsDIV.appendChild(specification)
    }
}