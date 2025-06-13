document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("product-grid");

  if (!grid) return; // Exit if this page doesn't need products

  fetch("data/products.json")
    .then(res => res.json())
    .then(products => {  
      products.forEach(product => {
        const card = document.createElement("div");
        card.className = "border rounded p-4 shadow hover:shadow-lg transition";

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4 rounded">
          <h4 class="text-xl font-semibold mb-1">${product.name}</h4>
          <p class="text-gray-600 text-lg old mb-2">₹${product.price}</p>
          <div class="flex justify-center items-center gap-7 mt-2 text-lg">
            <a href="product.html?id=${product.id}" class="text-primary font-medium hover:underline">View Details</a>
            <button class="bg-primary text-white px-4 py-2 rounded hover:bg-orange-600 add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        `;

        const addToCartBtn = card.querySelector(".add-to-cart");
        addToCartBtn.addEventListener("click", () => {
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));

          // Live update cart badge
          if (typeof updateCartCount === "function") updateCartCount();
        });

        grid.appendChild(card);
      });

      updateCartCount();
    });
});

