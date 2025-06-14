document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const summaryDiv = document.getElementById("checkout-summary");
  const totalSpan = document.getElementById("checkout-total");

  if (cartItems.length === 0) {
    summaryDiv.innerHTML = `<p>Your cart is empty.</p>`;
    totalSpan.textContent = "0";
    return;
  }

  let total = 0;
  summaryDiv.innerHTML = "";

  cartItems.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.className = "flex justify-between border-b pb-2";

    itemDiv.innerHTML = `
      <div>
        <p class="font-semibold">${item.name}</p>
        <p class="text-sm text-gray-600">₹${item.price} × ${item.quantity}</p>
      </div>
      <div class="text-right font-semibold">₹${itemTotal}</div>
    `;

    summaryDiv.appendChild(itemDiv);
  });

  totalSpan.textContent = total.toFixed(2);
});
