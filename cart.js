const shoppingCartContainer = document.querySelector(
  ".shopping-cart-container",
);
const submitOrderBtn = document.querySelector(".submit-order");
const totalMoneyTag = document.querySelector("#total-money");

window.onload = () => {
  const cartItems = loadCartProducts();
  cartItems.forEach((item) => {
    shoppingCartContainer.innerHTML += `
        <div class="cart-product">
          <img src="${item.productImageUrl}" alt="." />
          <div class="order-info">
            <p class="cart-product-name">${item.productName}</p>
            <p>1 X ksh ${item.productPrice} = ksh ${item.productPrice} </p>
            <button class="remove-product-btn" data-id="${item.productID}">Remove</button>
          </div>
        </div>
`;
  });
  calculateTotalMoney();
  //Adding Event listener to remove buttons
  document.querySelectorAll(".remove-product-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      let cartItems = loadCartProducts();
      cartItems = cartItems.filter((item) => item.productID !== id);
      saveCartProduct(cartItems);
      calculateTotalMoney()
      e.target.parentElement.parentElement.remove()
      alert(`${id} Removed succesifully!`);
    });
  });
};

function loadCartProducts() {
  return JSON.parse(localStorage.getItem("CART-PRODUCTS") || "[]");
}

function saveCartProduct(product) {
  localStorage.setItem("CART-PRODUCTS", JSON.stringify(product));
}

function calculateTotalMoney() {
  const cartItems = loadCartProducts();
  const total = cartItems.reduce((sum, product) => {
    return sum + Number(product.productPrice);
  }, 0);
  totalMoneyTag.textContent = `Total:  Ksh ${total.toLocaleString() + ".00"}`;
}
