function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const badge = document.getElementById("cart-count");

  if (badge) {
    badge.textContent = cart.length;
    badge.style.display = cart.length === 0 ? "none" : "inline-block";
  }
}

window.addEventListener("load", updateCartCount);
window.updateCartCount = updateCartCount;
