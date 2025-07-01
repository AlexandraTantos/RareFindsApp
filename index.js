import { products } from "./data.js";

window.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".toggle-nav");
  const navLinks = document.querySelector(".nav-links");
  const productsPageSection = document.querySelector("#products-page");
  const featuredSection = document.querySelector("#featured");
  const searchInput = document.querySelector(".input");

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
   <button class="btn">
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
};
