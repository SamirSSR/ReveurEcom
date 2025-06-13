document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = `<p class="text-gray-500">Your cart is empty.</p>`;
      totalEl.textContent = "0";
      return;
    }

    let total = 0;

    cart.forEach((product, index) => {
      total += product.price;

      const item = document.createElement("div");
      item.className = "flex items-center justify-between border p-4 rounded shadow";

      item.innerHTML = `
        <div class="flex items-center gap-4">
          <img src="${product.image}" alt="${product.name}" class="w-20 h-20 object-cover rounded">
          <div>
            <h4 class="text-lg font-semibold">${product.name}</h4>
            <p class="text-primary font-bold">₹${product.price}</p>
          </div>
        </div>
        <button class="text-red-600 font-bold hover:underline" data-index="${index}">Remove ❌</button>
      `;

      item.querySelector("button").addEventListener("click", e => {
        removeFromCart(e.target.dataset.index);
      });

      cartContainer.appendChild(item);
    });

    totalEl.textContent = total;
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    if (typeof updateCartCount === "function") updateCartCount();
  }

    document.getElementById("checkout-btn").addEventListener("click", () => {
    window.location.href = "checkout.html";
  });


  renderCart();
});


