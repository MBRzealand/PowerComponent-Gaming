const searchInput = document.getElementById('searchInput');

let searchFunction = () => {
    let search = searchInput.value;
    let url = new URL('http://localhost:5500/Client/resultsPage.html');
    url.searchParams.append('input', search);
    document.location = url;
};
