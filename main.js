const PRODUCTS_FILE = "products.json";
const productsContainer = document.querySelector(".products-container-02");
const categoryButtons = document.querySelector(".category-buttons");
const categoryBtn = categoryButtons.querySelectorAll(".category");

window.onload = () => {
  loadCategories("all");
};

if (categoryBtn) {
  categoryBtn.forEach((category) => {
    category.addEventListener("click", (e) => {
      if (e.target.value == "all") {
        loadCategories("all");
      }
      categoryBtn.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      productsContainer.innerHTML = "";
      loadCategories(e.target.value);
    });
  });
}

async function loadCategories(target) {
  const res = await fetch(PRODUCTS_FILE);
  const data = await res.json();
  const filteredData = data.filter((product) => product.category === target);

  if (target == "all") {
    data.forEach((product) => {
      productsContainer.innerHTML += `
     <div class="product">
          <p class="lowered-price">ksh. ${product.priceDecrease}</p>
          <img src="${product.productImageUrl}" />
          <p class="product-name">${product.productName}</p>
          <div class="rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </div>
          <p class="product-price">Ksh. ${product.productPrice}</p>
          <button class="add-to-cart">Add to cart</button>
        </div>
    `;
    });
  }

  filteredData.forEach((product) => {
    productsContainer.innerHTML += `
     <div class="product">
          <p class="lowered-price">ksh. ${product.priceDecrease}</p>
          <img src="${product.productImageUrl}" />
          <p class="product-name">${product.productName}</p>
          <div class="rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </div>
          <p class="product-price">ksh. ${product.productPrice}</p>
          <button class="add-to-cart">Add to cart</button>
        </div>
    `;
  });
}
