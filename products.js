import { products } from "./data.js";

window.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".toggle-nav");
  const navLinks = document.querySelector(".nav-links");
  const productsPageSection = document.querySelector("#products-page");
  const featuredSection = document.querySelector("#featured");
  const searchInput = document.querySelector(".input");
  const brandFilter = document.querySelector("#brand-filter");
  const categoryFilter = document.querySelector("#category-filter");
  const ratingFilter = document.querySelector("#rating-filter");
  const clearButton = this.document.querySelector(".filters-bar-clear-button");

  brandFilter.addEventListener("change", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);
  ratingFilter.addEventListener("change", filterProducts);
  clearButton.addEventListener("click", () => {
    brandFilter.value = "";
    categoryFilter.value = "";
    ratingFilter.value = "";

    displayProducts(products, productsPageSection);
  });

  function filterProducts() {
    const selectedBrand = brandFilter.value;
    const selectedCategory = categoryFilter.value;
    const selectedRating = parseFloat(ratingFilter.value);

    let filtered = [...products];

    if (selectedBrand) {
      filtered = filtered.filter((p) => p.brand === selectedBrand);
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedRating) {
      filtered = filtered.filter((p) => p.rating >= selectedRating);
    }

    if (productsPageSection) {
      if (filtered.length > 0) {
        displayProducts(filtered, productsPageSection);
      } else {
        productsPageSection.innerHTML = `<p class="no-results">No products found!</p>`;
      }
    }
  }

  toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
  });

  if (featuredSection) {
    displayProducts(products.slice(0, 4), featuredSection);
  }

  if (productsPageSection && products.length > 0) {
    displayProducts(products, productsPageSection);
  }

  searchInput.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase().trim();

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(value) ||
        product.brand.toLowerCase().includes(value)
    );

    if (productsPageSection) {
      if (filtered.length > 0) {
        displayProducts(filtered, productsPageSection);
      } else {
        productsPageSection.innerHTML = `<p class="no-results">No products found!</p>`;
      }
    }
  });
});

const displayProducts = (products, container) => {
  const displayProduct = products
    .map((item) => {
      return `
       <div class="card">
 <div class="tilt">
  <div class="img"><img src="${item.image}" alt="${item.image}" ></div>
 </div>
 <div class="info">
  <div class="cat">${item.brand}</div>
  <h2 class="title">${item.name}</h2>
  <p class="desc">${item.description}</p>
  
  <div class="bottom">
   <div class="price">
    <span class="old">$${item.oldPrice}</span>
    <span class="new">$${item.price}</span>
   </div>
   <button 
  class="btn"
  data-id="${item.id}" 
  data-name="${item.name}" 
  data-price="${item.price}" 
  data-image="${item.image}"
>
  <span>Add to Cart</span>
  <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
</button>

  </div>
  <div class="meta">
   <div class="rating">
      <p> Rating ${item.rating}</p>
   </div>
   <div class="stock">In Stock</div>
  </div>
 </div>
</div>
`;
    })
    .join("");

  container.innerHTML = `<div class="product-list">${displayProduct}</div>`;
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        image: btn.dataset.image,
        quantity: 1,
      };
      addToCart(product);
    });
  });
};

const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  Toastify({
    text: `${product.name} added to cart!`,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background:
        "linear-gradient(to right,rgb(155, 116, 79),rgb(103, 53, 20))",
    },
    onClick: function () {},
  }).showToast();
};
