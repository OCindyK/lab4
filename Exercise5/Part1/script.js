document.addEventListener("DOMContentLoaded", function () {
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

    function addNewsItem(newsItem) {
        const newsContainer = document.getElementById('news-container');
        const newsCard = createNewsCard(newsItem);
        newsContainer.appendChild(newsCard);
    }

    function populateNews() {
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '';

        news.forEach((newsItem, index) => {
            if (index % 3 === 0) {
                const rowDiv = document.createElement("div");
                rowDiv.classList.add("row");
                newsContainer.appendChild(rowDiv);
            }

            addNewsItem(newsItem);
        });
    }

    function checkForUpdates() {
        const newArticle = { id: news.length + 1, title: 'New Article', content: 'This is a new article.' };
        news.push(newArticle);
        addNewsItem(newArticle);
    }

    let loadingInterval;

    document.getElementById('stopLoadingButton').addEventListener('click', () => {
        clearInterval(loadingInterval);
    });

    populateNews();

    loadingInterval = setInterval(() => {
        checkForUpdates();
    }, 5000);
});
