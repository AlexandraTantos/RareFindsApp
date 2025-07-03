const cart = JSON.parse(localStorage.getItem("cart")) || [];
const toggleButton = document.querySelector(".toggle-nav");
const navLinks = document.querySelector(".nav-links");

toggleButton.addEventListener("click", () => {
  navLinks.classList.toggle("hidden");
});

const renderCart = () => {
  const container = document.querySelector(".cart-items-container");
  container.innerHTML = "";

  cart.forEach((item, index) => {
    const itemEl = document.createElement("section");
    itemEl.classList.add("cart-item");
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="item-details">
        <h2>${item.name}</h2>
        <p>$${item.price.toFixed(2)}</p>
        <div class="quantity">
          <button class="decrease" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </div>
      </div>
      <button class="remove-btn" data-index="${index}"><i class="fas fa-times"></i></button>
    `;
    container.appendChild(itemEl);
  });

  container.querySelectorAll(".increase").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const idx = e.target.dataset.index;
      cart[idx].quantity++;
      updateCart();
    })
  );

  container.querySelectorAll(".decrease").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const idx = e.target.dataset.index;
      if (cart[idx].quantity > 1) {
        cart[idx].quantity--;
        updateCart();
      }
    })
  );

  container.querySelectorAll(".remove-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const idx = e.target.dataset.index;
      cart.splice(idx, 1);
      updateCart();
    })
  );

  updateSummary();
};

const updateCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

const updateSummary = () => {
  const subtotalEl = document.querySelector(".cart-summary p span");
  const tvaEl = document.querySelector(".cart-summary p:nth-child(2) span");
  const totalEl = document.querySelector(".cart-summary h2 span");

  let subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let tva = subtotal * 0.2;
  let total = subtotal + tva;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (tvaEl) tvaEl.textContent = `$${tva.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
};

renderCart();
