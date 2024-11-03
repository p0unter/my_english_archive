const cardCont = document.getElementById("card-cont");
const searchInput = document.getElementById("search-input");
const dropdownMenu = document.getElementById("dropdownMenu");
const categoryList = document.getElementById("categoryList");
let wordsData = [];
let uniqueCategories = new Set();

fetch('words.json')
    .then(response => response.json())
    .then(data => {
        wordsData = data.words;
        wordsData.forEach(item => uniqueCategories.add(item.ctg));
        populateCategories();
        displayWords(wordsData); 
    })
    .catch(error => console.error('JSON yüklenirken hata:', error));

function populateCategories() {
    uniqueCategories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.innerHTML = `<a class="dropdown-item" href="#">${category}</a>`;
        dropdownMenu.appendChild(categoryItem);
    });
}

function displayWords(words) {
    cardCont.innerHTML = ''; 
    words.forEach(item => {
        cardCont.innerHTML += `
            <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h2 class="card-title m-0"><b>${item.word}</b></h2>
                        <p class="card-text m-0">
                            <div class="card-category text-decoration-underline fs-5">
                                ${item.ctg}
                            </div>
                            <div class="card-desc">
                                ${item.desc}
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        `;
    });
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredWords = wordsData.filter(item => 
        item.word.toLowerCase().includes(query) ||
        item.ctg.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query)
    );
    displayWords(filteredWords);
});

dropdownMenu.addEventListener('click', (event) => {
    const category = event.target.textContent;
    if (category !== "All") {
        const filteredWords = wordsData.filter(item => item.ctg === category);
        displayWords(filteredWords);
    } else {
        displayWords(wordsData); 
    }
});