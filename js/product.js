document.addEventListener("DOMContentLoaded", () => {
  const productId = new URLSearchParams(window.location.search).get("id");
  const productDetailContainer = document.getElementById("product-detail");
  updateCartCount(); // ✅ Always call on load

  // === Fetch and display product ===
  fetch("data/products.json")
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id == productId);
      if (!product) {
        productDetailContainer.innerHTML = "<p>Product not found.</p>";
        return;
      }

      productDetailContainer.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full md:w-1/2 rounded shadow-lg object-cover max-h-[400px]">
        <div class="flex flex-col gap-4 md:w-1/2">
          <h1 class="text-2xl font-bold text-primary">${product.name}</h1>
          <p class="text-gray-600 text-lg">₹${product.price}</p>
          <p class="text-sm text-gray-700">${product.description}</p>
          <button class="add-to-cart-btn bg-primary text-white px-6 py-2 rounded hover:bg-orange-600 transition w-max">
            Add to Cart
          </button>
        </div>
      `;

      // === Attach event listener after rendering ===
      const addToCartBtn = productDetailContainer.querySelector(".add-to-cart-btn");
      addToCartBtn.addEventListener("click", () => {
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));

          // Live update cart badge
          if (typeof updateCartCount === "function") updateCartCount();
        });
    })
    .catch(error => {
      console.error("Error loading product:", error);
      productDetailContainer.innerHTML = "<p>Error loading product details.</p>";
    });
});
