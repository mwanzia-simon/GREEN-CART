const PRODUCTS_FILE = "products.json";
const productsContainer = document.querySelector(".products-container-02");
const categoryButtons = document.querySelector(".category-buttons");
const categoryBtn = categoryButtons.querySelectorAll(".category");

window.onload = () => {
  loadCategories("all");
};

//Local storage helper functions
//Function to load cart products
function loadCartProducts() {
  return JSON.parse(localStorage.getItem("CART-PRODUCTS") || "[]");
}

//Function to save cart products
function saveCartProduct(product) {
  localStorage.setItem("CART-PRODUCTS", JSON.stringify(product));
}

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
  const filteredData =
    target === "all"
      ? data
      : data.filter((product) => product.category === target);

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
          <button class="add-to-cart" data-id="${product.productID}">Add to cart</button>
        </div>
    `;
  });
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const selectedProduct = data.find((product) => product.productID == id);
      addProductToCart(selectedProduct);
    });
  });
}

//Function to add product to cart
function addProductToCart(product) {
  const cart = loadCartProducts();
  const exists = cart.find((item) => item.productID === product.productID);
  if (exists) {
    alert("Item already in cart!");
    return;
  }
  cart.push(product);
  saveCartProduct(cart);
  alert("Alert item added to cart!");
}
