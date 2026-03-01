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
console.log(cartItems)
};

function loadCartProducts() {
  return JSON.parse(localStorage.getItem("CART-PRODUCTS") || "[]");
}

function saveCartProduct(product) {
  localStorage.setItem("CART-PRODUCTS", JSON.stringify(product));
}
