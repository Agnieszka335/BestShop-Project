const productsInput = document.getElementById("products");
const productsId = document.querySelector("[data-id=products]");

const ordersInput = document.getElementById("orders");
const ordersId = document.querySelector("[data-id=orders]");

const packageInput = document.querySelector(".select__input");
const packageId = document.querySelector("[data-id=package]");

const selectDropdown = document.querySelector(".select__dropdown");
const options = document.querySelectorAll(".select__dropdown li");

const accounting = document.querySelector("#accounting");
const accountingId = document.querySelector('[data-id="accounting"]');
const terminal = document.querySelector("#terminal");
const terminalId = document.querySelector('[data-id="terminal"]');

const totalPrice = document.querySelector("#total-price");
// //

productsInput.addEventListener("input", function () {
  if (productsInput.value > 0) {
    productsId.style.display = "flex";
  } else {
    productsId.style.display = "none";
  }
});

ordersInput.addEventListener("input", function () {
  if (ordersInput.value > 0) {
    ordersId.style.display = "flex";
  } else {
    ordersId.style.display = "none";
  }
});

packageInput.addEventListener("click", function () {
  selectDropdown.style.display = "block";
});

options.forEach(function (element) {
  element.addEventListener("click", function () {
    const value = element.innerText;
    packageInput.innerText = value;
    selectDropdown.style.display = "none";

    packageId.style.display = "flex";
  });
});

accounting.addEventListener("click", function () {
  if (accountingId.style.display === "block") {
    accountingId.style.display = "none";
  } else {
    accountingId.style.display = "flex";
  }
});

terminal.addEventListener("click", function () {
  if (terminalId.style.display === "block") {
    terminalId.style.display = "none";
  } else {
    terminalId.style.display = "flex";
  }
});

totalPrice.style.display = "flex";

//calculator z konstruktorem i prototypami

function Calculator() {
  this.prices = {
    product: 1,
    order: 0.5,
    package: {
      basic: 0,
      professional: 25,
      premium: 60,
    },
    accounting: 30,
    terminal: 25,
  };

  this.state = {
    products: 0,
    orders: 0,
    package: "",
    accounting: false,
    terminal: false,
  };

  this.init();
}

Calculator.prototype.init = function () {
  this.cacheElements();
  this.bindEvents();
  this.hideOptionalItems();
};

Calculator.prototype.cacheElements = function () {
  this.productsInput = document.getElementById("products");
  this.ordersInput = document.getElementById("orders");
  this.packageSelect = document.getElementById("package");
  this.accountingCheckbox = document.getElementById("accounting");
  this.terminalCheckbox = document.getElementById("terminal");

  this.selectInput = this.packageSelect.querySelector(".select__input");
  this.dropdown = this.packageSelect.querySelector(".select__dropdown");

  this.summaryItems = document.querySelectorAll(".list__item");
  this.totalPriceEl = document.querySelector(".total__price");

  this.accountingEl = document.querySelector('[data-id="accounting"]');
  this.terminalEl = document.querySelector('[data-id="terminal"]');
};

Calculator.prototype.bindEvents = function () {
  this.productsInput.addEventListener("input", (e) => {
    this.state.products = parseInt(e.target.value) || 0;
    this.updateSummary();
  });

  this.ordersInput.addEventListener("input", (e) => {
    this.state.orders = parseInt(e.target.value) || 0;
    this.updateSummary();
  });

  this.accountingCheckbox.addEventListener("change", (e) => {
    this.state.accounting = e.target.checked;
    this.updateSummary();
  });

  this.terminalCheckbox.addEventListener("change", (e) => {
    this.state.terminal = e.target.checked;
    this.updateSummary();
  });

  this.selectInput.addEventListener("click", () => {
    this.dropdown.classList.toggle("open");
  });

  this.dropdown.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      const value = li.dataset.value;
      this.state.package = value;
      this.selectInput.textContent = li.textContent;
      this.dropdown.classList.remove("open");
      this.updateSummary();
    });
  });
};

Calculator.prototype.hideOptionalItems = function () {
  this.accountingEl.style.display = "none";
  this.terminalEl.style.display = "none";
};

Calculator.prototype.updateSummary = function () {
  let total = 0;

  const prodTotal = this.state.products * this.prices.product;
  this.updateItem(
    "products",
    `${this.state.products} * $${this.prices.product}`,
    `$${prodTotal}`
  );
  total += prodTotal;

  const orderTotal = this.state.orders * this.prices.order;
  this.updateItem(
    "orders",
    `${this.state.orders} * $${this.prices.order}`,
    `$${orderTotal}`
  );
  total += orderTotal;

  const packPrice = this.prices.package[this.state.package] || 0;
  const packName =
    this.state.package.charAt(0).toUpperCase() + this.state.package.slice(1);
  this.updateItem("package", packName, `$${packPrice}`);
  total += packPrice;

  if (this.state.accounting) {
    this.accountingEl.style.display = "flex";
    this.accountingEl.querySelector(
      ".item__price"
    ).textContent = `$${this.prices.accounting}`;
    total += this.prices.accounting;
  } else {
    this.accountingEl.style.display = "none";
  }

  if (this.state.terminal) {
    this.terminalEl.style.display = "flex";
    this.terminalEl.querySelector(
      ".item__price"
    ).textContent = `$${this.prices.terminal}`;
    total += this.prices.terminal;
  } else {
    this.terminalEl.style.display = "none";
  }

  this.totalPriceEl.textContent = `$${total}`;
};

Calculator.prototype.updateItem = function (id, calcText, priceText) {
  const el = document.querySelector(`[data-id="${id}"]`);
  if (!el) return;
  const calc = el.querySelector(".item__calc");
  if (calc) calc.textContent = calcText;
  el.querySelector(".item__price").textContent = priceText;
};

// start
document.addEventListener("DOMContentLoaded", function () {
  const calc = new Calculator();
});
