const button = document.getElementById("searchButton");
const input = document.getElementById("searchInput");
const output = document.getElementById("searchOutput");
const resultsDiv = document.getElementById("resultsBox");


let searchFunction = async () => {

    resultsDiv.innerHTML = "";

    let searchInput = input.value;
    let response = await fetch(`http://localhost:3000/version1/search/${searchInput}`);
    let searchJSON = await response.json();

    generateCards(searchJSON);

}

let displaySpecifications = (specificationsObjectArray) => {

    let specificationsArray = [];

    specificationsObjectArray.forEach((specifications)=>{
        for(key in specifications){
            specificationsArray.push(key)
            specificationsArray.push(specifications[key])
        }
    })

    console.log(specificationsArray)

    return specificationsArray;
}

let generateCards = (response) => {

    const nameArrayLength = (response.foundElements.name.length);

    for (let i = 0; i < nameArrayLength; i++) {
        const productName = document.createElement("h4")
        const name = document.createTextNode(response.foundElements.name[i].name)
        productName.appendChild(name)

        const specificationTitle = document.createElement("h4")
        const title = document.createTextNode("Specifications:")
        specificationTitle.appendChild(title)

        const productSpecifications = document.createElement("p")

        for (let j = 0; j < response.foundElements.name[i].specifications.length*2; j+=2) {

            let specificationList = displaySpecifications(response.foundElements.name[i].specifications)

            let specificationKeyValuePair = document.createElement("p")

            let keyValuePair = document.createTextNode(`${specificationList[j]}: ${specificationList[j+1]}`)

            specificationKeyValuePair.appendChild(keyValuePair)

            productSpecifications.appendChild(specificationKeyValuePair)
        }

        const categoriesTitle = document.createElement("h4")
        const title2 = document.createTextNode("Categories:")
        categoriesTitle.appendChild(title2)

        const productCategories = document.createElement("p")

        for (let j = 0; j < response.foundElements.name[i].categories.length; j++) {
            const categories = document.createTextNode(`${response.foundElements.name[i].categories[j]}`)
            const breakpoint = document.createElement("br")
            productCategories.appendChild(categories)
            productCategories.appendChild(breakpoint)
        }

        const priceTitle = document.createElement("h4")
        const title3 = document.createTextNode("Price:")
        priceTitle.appendChild(title3)

        const productPrice = document.createElement("p")
        const price = document.createTextNode(`${response.foundElements.name[i].price} kr`)
        productPrice.appendChild(price)

        const productCard = document.createElement("div")
        productCard.appendChild(productName)
        productCard.appendChild(specificationTitle)
        productCard.appendChild(productSpecifications)
        productCard.appendChild(categoriesTitle)
        productCard.appendChild(productCategories)
        productCard.appendChild(priceTitle)
        productCard.appendChild(productPrice)

        resultsDiv.appendChild(productCard)

    }

    const line = document.createElement("hr")
    resultsDiv.appendChild(line)

    const specificationsArrayLength = (response.foundElements.specifications.length);

    for (let i = 0; i < specificationsArrayLength; i++) {
        const productName = document.createElement("h4")
        const name = document.createTextNode(response.foundElements.name[i].name)
        productName.appendChild(name)

        const specificationTitle = document.createElement("h4")
        const title = document.createTextNode("Specifications:")
        specificationTitle.appendChild(title)

        const productSpecifications = document.createElement("p")

        for (let j = 0; j < response.foundElements.name[i].specifications.length*2; j+=2) {

            let specificationList = displaySpecifications(response.foundElements.name[i].specifications)

            let specificationKeyValuePair = document.createElement("p")

            let keyValuePair = document.createTextNode(`${specificationList[j]}: ${specificationList[j+1]}`)

            specificationKeyValuePair.appendChild(keyValuePair)

            productSpecifications.appendChild(specificationKeyValuePair)
        }

        const categoriesTitle = document.createElement("h4")
        const title2 = document.createTextNode("Categories:")
        categoriesTitle.appendChild(title2)

        const productCategories = document.createElement("p")

        for (let j = 0; j < response.foundElements.name[i].categories.length; j++) {
            const categories = document.createTextNode(`${response.foundElements.name[i].categories[j]}`)
            const breakpoint = document.createElement("br")
            productCategories.appendChild(categories)
            productCategories.appendChild(breakpoint)
        }

        const priceTitle = document.createElement("h4")
        const title3 = document.createTextNode("Price:")
        priceTitle.appendChild(title3)

        const productPrice = document.createElement("p")
        const price = document.createTextNode(`${response.foundElements.name[i].price} kr`)
        productPrice.appendChild(price)

        const productCard = document.createElement("div")
        productCard.appendChild(productName)
        productCard.appendChild(specificationTitle)
        productCard.appendChild(productSpecifications)
        productCard.appendChild(categoriesTitle)
        productCard.appendChild(productCategories)
        productCard.appendChild(priceTitle)
        productCard.appendChild(productPrice)

        resultsDiv.appendChild(productCard)

    }

    resultsDiv.appendChild(line)

    const categoriesArrayLength = (response.foundElements.categories.length);


    for (let i = 0; i < specificationsArrayLength; i++) {
        const productName = document.createElement("h4")
        const name = document.createTextNode(response.foundElements.name[i].name)
        productName.appendChild(name)

        const specificationTitle = document.createElement("h4")
        const title = document.createTextNode("Specifications:")
        specificationTitle.appendChild(title)

        const productSpecifications = document.createElement("p")

        for (let j = 0; j < response.foundElements.name[i].specifications.length*2; j+=2) {

            let specificationList = displaySpecifications(response.foundElements.name[i].specifications)

            let specificationKeyValuePair = document.createElement("p")

            let keyValuePair = document.createTextNode(`${specificationList[j]}: ${specificationList[j+1]}`)

            specificationKeyValuePair.appendChild(keyValuePair)

            productSpecifications.appendChild(specificationKeyValuePair)
        }

        const categoriesTitle = document.createElement("h4")
        const title2 = document.createTextNode("Categories:")
        categoriesTitle.appendChild(title2)

        const productCategories = document.createElement("p")

        for (let j = 0; j < response.foundElements.name[i].categories.length; j++) {
            const categories = document.createTextNode(`${response.foundElements.name[i].categories[j]}`)
            const breakpoint = document.createElement("br")
            productCategories.appendChild(categories)
            productCategories.appendChild(breakpoint)
        }

        const priceTitle = document.createElement("h4")
        const title3 = document.createTextNode("Price:")
        priceTitle.appendChild(title3)

        const productPrice = document.createElement("p")
        const price = document.createTextNode(`${response.foundElements.name[i].price} kr`)
        productPrice.appendChild(price)

        const productCard = document.createElement("div")
        productCard.appendChild(productName)
        productCard.appendChild(specificationTitle)
        productCard.appendChild(productSpecifications)
        productCard.appendChild(categoriesTitle)
        productCard.appendChild(productCategories)
        productCard.appendChild(priceTitle)
        productCard.appendChild(productPrice)

        resultsDiv.appendChild(productCard)

    }

}