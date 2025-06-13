document.addEventListener("DOMContentLoaded", () => {
  fetch("data/products.json")
    .then((res) => res.json())
    .then((products) => {
      const featuredProducts = products.filter((product) => product.featured);
      const container = document.getElementById("featured-products");

      featuredProducts.forEach((product) => {
        const card = document.createElement("div");
        card.className = "bg-white shadow-md rounded-lg overflow-hidden p-4";

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4 rounded">
          <h4 class="text-xl font-semibold mb-1">${product.name}</h4>
          <p class="text-gray-600 text-lg mb-1">₹${product.price}</p>
          <div class="flex justify-center items-center gap-7 mt-2 text-lg">
            <a href="product.html?id=${product.id}" class="text-primary font-medium hover:underline">View Details</a>
            <button class="add-to-cart-btn bg-primary text-white px-3 py-1 rounded hover:bg-orange-600 transition font-medium">
              Add to Cart
            </button>
          </div>
        `;




        const addToCartBtn = card.querySelector(".add-to-cart-btn");
        addToCartBtn.addEventListener("click", () => {
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));

          // Live update cart badge
          if (typeof updateCartCount === "function") updateCartCount();
        });

        container.appendChild(card);
      });
    });
});
