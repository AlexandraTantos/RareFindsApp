import { products } from "./data.js";

window.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".toggle-nav");
  const navLinks = document.querySelector(".nav-links");
  const productsPageSection = document.querySelector("#products-page");
  const featuredSection = document.querySelector("#featured");

  toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
  });

  if (featuredSection) {
    displayProducts(products.slice(0, 4), featuredSection);
  }

  if (productsPageSection && products.length > 0) {
    displayProducts(products, productsPageSection);
  }
});

const displayProducts = (products, container) => {
  const displayProduct = products
    .map((item) => {
      return `
        <div class="product-card">
  <img src="${item.image}" alt="${item.name}" />
  <h4>${item.name}</h4>
  <p class="brand">Brand: ${item.brand}</p>
  <p class="price">Price: ${item.price}</p>
  <p class="rating">Rating: ${item.rating}</p>
</div>
`;
    })
    .join("");

  container.innerHTML = `<div class="product-list">${displayProduct}</div>`;
};
