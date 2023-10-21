document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector("#searchInput");
  const productContainer = document.querySelector("#productContainer");
  const dropdownMenu = document.createElement("div");
  dropdownMenu.classList.add("dropdown-menu");
  document.querySelector("#selectCategory").appendChild(dropdownMenu);

  let isDropdownOpen = false;
  let productsData = [];

  document.querySelector("#selectCategory").addEventListener("click", () => {
    if (isDropdownOpen) {
      dropdownMenu.style.display = "none";
    } else {
      dropdownMenu.style.display = "block";
    }
    isDropdownOpen = !isDropdownOpen;
  });

  document.addEventListener("click", (event) => {
    if (
      !document.querySelector("#selectCategory").contains(event.target) &&
      !searchInput.contains(event.target)
    ) {
      dropdownMenu.style.display = "none";
      isDropdownOpen = false;
    }
  });

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      productsData = data;
      const categories = [...new Set(data.map((product) => product.category))];

      categories.forEach((category) => {
        const option = document.createElement("a");
        option.classList.add("dropdown-item");
        option.href = "#";
        option.innerText = category;
        option.addEventListener("click", () => filterByCategory(category));
        dropdownMenu.appendChild(option);
      });

      filterByCategory(categories[0]);
    })
    .catch((error) => console.error("Error:", error));

  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    const matchingProducts = productsData.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    );

    if (searchValue) {
      if (matchingProducts.length === 0) {
        productContainer.innerHTML = `<div class="col-12 no-matches">No product matches</div>`;
      } else {
        displayProducts(matchingProducts);
      }
    } else {
      const selectedCategory = dropdownMenu.querySelector(".active");
      if (selectedCategory) {
        filterByCategory(selectedCategory.textContent);
      }
    }
  });

  document.querySelector(".nav-link.home").addEventListener("click", () => {
    displayProducts(productsData);
  });

  function displayProducts(products) {
    productContainer.innerHTML = "";
    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("col-lg-4", "col-md-6", "mb-4");
      card.innerHTML = `
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">$${product.price}</p>
          </div>
        </div>
      `;
      productContainer.appendChild(card);
    });
  }

  function filterByCategory(category) {
    dropdownMenu.querySelectorAll(".dropdown-item").forEach((item) => {
      item.classList.remove("active");
    });

    const filteredProducts = productsData.filter(
      (product) => product.category === category
    );
    displayProducts(filteredProducts);
  }
});
