let news = [
    { id: 1, title: 'Election Results', content: "Newly elected minister..." },
    { id: 2, title: 'Sporting Success', content: "World Cup winners..." },
    { id: 3, title: 'Tornado Warning', content: "Residents should prepare..." }
];

function createNewsCard(newsItem) {
    const cardTemplate = document.createElement("div");
    cardTemplate.classList.add("col-md-4", "col-sm-6", "mb-4");

    cardTemplate.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${newsItem.title}</h5>
                <p class="card-text">${newsItem.content}</p>
            </div>
        </div>
    `;

    return cardTemplate;
}

function submitNews() {
    const newsTitleInput = document.getElementById('newsTitle');
    const newsContentInput = document.getElementById('newsContent');
    const newNewsItem = {
        id: news.length + 1,
        title: newsTitleInput.value,
        content: newsContentInput.value,
    };
    
    news.push(newNewsItem);
    populateNews();
    
    newsTitleInput.value = '';
    newsContentInput.value = '';
}

function populateNews() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    
    let rowDiv;
    news.forEach((newsItem, index) => {
        if (index % 3 === 0) {
            rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            newsContainer.appendChild(rowDiv);
        }
        
        const newsCard = createNewsCard(newsItem);
        rowDiv.appendChild(newsCard);
    });
}

populateNews();

let newsLoadingInterval;
let continueLoadingNews = true;

// Function to stop automatic news loading
function stopAutoNewsLoading() {
    continueLoadingNews = false;
    clearInterval(newsLoadingInterval);
    // Disable the stop button after first click
    document.getElementById("stopLoadingButton").disabled = true;
}

document.getElementById("stopLoadingButton").addEventListener("click", stopAutoNewsLoading);

document.getElementById("submitNewsButton").addEventListener("click", submitNews);

// Automatically add news every 5 seconds if continueLoadingNews is true
newsLoadingInterval = setInterval(() => {
    if (continueLoadingNews) {
        const randomNewsItem = {
            id: news.length + 1,
            title: 'New Article',
            content: 'This is a new article added automatically.',
        };
        news.push(randomNewsItem);
        populateNews();
    }
}, 5000);
