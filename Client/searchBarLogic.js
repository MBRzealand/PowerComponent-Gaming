const button = document.getElementById("searchButton");
const input = document.getElementById("searchInput");
const output = document.getElementById("searchOutput");
const resultsDiv = document.getElementById("resultsBox");

let namesDiv = document.createElement("div")
let specificationsDiv = document.createElement("div")
let categoriesDiv = document.createElement("div")

namesDiv.setAttribute('class',"specificationHolder")
specificationsDiv.setAttribute('class',"specificationHolder")
categoriesDiv.setAttribute('class',"specificationHolder")

let searchFunction = async () => {
    resultsDiv.innerHTML = "";
    namesDiv.innerHTML = "";
    specificationsDiv.innerHTML = "";
    categoriesDiv.innerHTML = "";

    let response = "";
    let searchInput = input.value;
     response = await fetch(`http://localhost:3000/version1/search/${searchInput}`);
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

let generateCards =  (response) => {

    const nameArrayLength = (response.foundElements.name.length);
    console.log(nameArrayLength)

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


        let picturebox = document.createElement("img")
        picturebox.src = response.foundElements.name[i].image
        picturebox.setAttribute('class','productImage')
        

 
    

        const productCard = document.createElement("div")
        productCard.appendChild(picturebox)
        productCard.appendChild(productName)
        productCard.appendChild(specificationTitle)
        productCard.appendChild(productSpecifications)
        productCard.appendChild(categoriesTitle)
        productCard.appendChild(productCategories)
        productCard.appendChild(priceTitle)
        productCard.appendChild(productPrice)
        productCard.setAttribute('class',"card")


        namesDiv.appendChild(productCard)

    }

    

     
    

    const specificationsArrayLength = (response.foundElements.specifications.length);

    for (let i = 0; i < specificationsArrayLength; i++) {
        const productName = document.createElement("h4")
        const name = document.createTextNode(response.foundElements.specifications[i].name)
        productName.appendChild(name)

        const specificationTitle = document.createElement("h4")
        const title = document.createTextNode("Specifications:")
        specificationTitle.appendChild(title)

        const productSpecifications = document.createElement("p")

        for (let j = 0; j < response.foundElements.specifications[i].specifications.length*2; j+=2) {

            let specificationList = displaySpecifications(response.foundElements.specifications[i].specifications)

            let specificationKeyValuePair = document.createElement("p")

            let keyValuePair = document.createTextNode(`${specificationList[j]}: ${specificationList[j+1]}`)

            specificationKeyValuePair.appendChild(keyValuePair)

            productSpecifications.appendChild(specificationKeyValuePair)
        }

        const categoriesTitle = document.createElement("h4")
        const title2 = document.createTextNode("Categories:")
        categoriesTitle.appendChild(title2)

        const productCategories = document.createElement("p")

        for (let j = 0; j < response.foundElements.specifications[i].categories.length; j++) {
            const categories = document.createTextNode(`${response.foundElements.specifications[i].categories[j]}`)
            const breakpoint = document.createElement("br")
            productCategories.appendChild(categories)
            productCategories.appendChild(breakpoint)
        }

        const priceTitle = document.createElement("h4")
        const title3 = document.createTextNode("Price:")
        priceTitle.appendChild(title3)

        const productPrice = document.createElement("p")
        const price = document.createTextNode(`${response.foundElements.specifications[i].price} kr`)
        productPrice.appendChild(price)


        let picturebox = document.createElement("img")
        picturebox.src = response.foundElements.specifications[i].image
        picturebox.setAttribute('class','productImage')


 
    

        


        const productCard = document.createElement("div")
        productCard.appendChild(picturebox)
        productCard.appendChild(productName)
        productCard.appendChild(specificationTitle)
        productCard.appendChild(productSpecifications)
        productCard.appendChild(categoriesTitle)
        productCard.appendChild(productCategories)
        productCard.appendChild(priceTitle)
        productCard.appendChild(productPrice)
        productCard.setAttribute('class',"card")
        specificationsDiv.appendChild(productCard)

    }

  
 

    const categoriesArrayLength = (response.foundElements.categories.length);


    for (let i = 0; i < categoriesArrayLength; i++) {
        const productName = document.createElement("h4")
        const name = document.createTextNode(response.foundElements.categories[i].name)
        productName.appendChild(name)

        const specificationTitle = document.createElement("h4")
        const title = document.createTextNode("Specifications:")
        specificationTitle.appendChild(title)

        const productSpecifications = document.createElement("p")

        for (let j = 0; j < response.foundElements.categories[i].specifications.length*2; j+=2) {

            let specificationList = displaySpecifications(response.foundElements.categories[i].specifications)

            let specificationKeyValuePair = document.createElement("p")

            let keyValuePair = document.createTextNode(`${specificationList[j]}: ${specificationList[j+1]}`)

            specificationKeyValuePair.appendChild(keyValuePair)

            productSpecifications.appendChild(specificationKeyValuePair)
        }

        const categoriesTitle = document.createElement("h4")
        const title2 = document.createTextNode("Categories:")
        categoriesTitle.appendChild(title2)

        const productCategories = document.createElement("p")

        for (let j = 0; j < response.foundElements.categories[i].categories.length; j++) {
            const categories = document.createTextNode(`${response.foundElements.categories[i].categories[j]}`)
            const breakpoint = document.createElement("br")
            productCategories.appendChild(categories)
            productCategories.appendChild(breakpoint)
        }

        const priceTitle = document.createElement("h4")
        const title3 = document.createTextNode("Price:")
        priceTitle.appendChild(title3)

        const productPrice = document.createElement("p")
        const price = document.createTextNode(`${response.foundElements.categories[i].price} kr`)
        productPrice.appendChild(price)


        
        let picturebox = document.createElement("img")
        picturebox.src = response.foundElements.categories[i].image
        picturebox.setAttribute('class','productImage')
      

 
    


        const productCard = document.createElement("div")
        productCard.appendChild(picturebox)
        productCard.appendChild(productName)
        productCard.appendChild(specificationTitle)
        productCard.appendChild(productSpecifications)
        productCard.appendChild(categoriesTitle)
        productCard.appendChild(productCategories)
        productCard.appendChild(priceTitle)
        productCard.appendChild(productPrice)
        productCard.setAttribute('class',"card")
        categoriesDiv.appendChild(productCard)

    }

    let line1 = document.createElement("div")
    line1.appendChild(document.createTextNode("Name"))
    line1.setAttribute('class',"line1")

    let line2 = document.createElement("div")
    line2.appendChild(document.createTextNode("Specification"))
    line2.setAttribute('class',"line1")

    let line3 = document.createElement("div")
    line3.appendChild(document.createTextNode("Categories"))
    line3.setAttribute('class',"line1")

    resultsDiv.appendChild(line1)
    resultsDiv.appendChild(namesDiv)
    resultsDiv.appendChild(line2)
    resultsDiv.appendChild(specificationsDiv)
    resultsDiv.appendChild(line3)
    resultsDiv.appendChild(categoriesDiv)


}