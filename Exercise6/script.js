document.addEventListener("DOMContentLoaded", function () {
    const postContainer = document.getElementById('post-container');
    
    function createPostCard(post) {
        const cardTemplate = document.createElement("div");
        cardTemplate.classList.add("col-md-4", "mb-4");

        cardTemplate.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                </div>
            </div>
        `;

        return cardTemplate;
    }

    function fetchPosts(limit = 10) {
        fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
            .then(response => response.json())
            .then(posts => {
                postContainer.innerHTML = '';
                posts.forEach(post => {
                    const postCard = createPostCard(post);
                    postContainer.appendChild(postCard);
                });
            })
            .catch(error => console.error(error));
    }

    fetchPosts(); // Fetch and display posts with default limit of 10
});
