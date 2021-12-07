let searchFunction = () => {
  let search = searchInput.value;
  let url = new URL('http://localhost:5500/Client/resultsPage.html');
  url.searchParams.append('input', search);
  document.location = url;
};

async function populateCategoryDropdownMenu() {
  let response = await fetch('http://127.0.0.1:3000/version1/item');

  let itemsJSON = await response.json();

  itemsArray2 = await itemsJSON.items;

  let categoryArray = [];

  for (let i = 0; i < itemsArray2.length; i++) {
    for (let j = 0; j < itemsArray2[i].categories.length; j++) {
      if (!categoryArray.includes(itemsArray2[i].categories[j])) {
        categoryArray.push(itemsArray2[i].categories[j]);
      }
    }
  }

  let select = document.getElementById('burgerMenu');

  for (let index = 0; index < categoryArray.length; index++) {
    let optionContainer = document.createElement('li');
    let option = document.createElement('a');

    option.setAttribute('class', 'dropdown-item');
    option.addEventListener('click', function () {
      fetchCategory(categoryArray[index]);
    });
    option.innerHTML = categoryArray[index];

    optionContainer.appendChild(option);
    select.appendChild(optionContainer);
  }
}

async function fetchCategory(category) {
  let response = await fetch(
    `http://127.0.0.1:3000/version1/search/categorySearch/${category}`
  );

  let itemsJSON = await response.json();

  itemsArray = await itemsJSON.itemListFromCategories;

  let url = new URL('http://localhost:5500/Client/Index.html');
  url.searchParams.append('itemsArray', JSON.stringify(itemsArray));
  document.location = url;
}

populateCategoryDropdownMenu();
