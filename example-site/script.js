/* =========================================================================
   script.js: how the site behaves.

   Each feature is its own small function, called once at the bottom.
   If one feature breaks, the others keep working, and you can find things fast.
   ========================================================================= */


/* ---------- DATA ----------
   LESSON: Keep data separate from the code that displays it. Today this is
   a hard-coded list. Later you could fetch() it from Supabase or a JSON
   file instead, and nothing below would need to change. */
const MENU = [
  { id: "country",   name: "Country Sourdough",   price: 9.0,  category: "bread",  desc: "Our everyday loaf. Crackly crust, open crumb.", soldOut: false },
  { id: "seeded",    name: "Seeded Rye",          price: 10.5, category: "bread",  desc: "Dark rye, sunflower, flax and sesame.", soldOut: false },
  { id: "baguette",  name: "Baguette",            price: 4.5,  category: "bread",  desc: "Baked at 7 am and again at 11.", soldOut: true },
  { id: "croissant", name: "Butter Croissant",    price: 4.25, category: "pastry", desc: "Three days from start to shelf.", soldOut: false },
  { id: "bun",       name: "Cardamom Bun",        price: 4.75, category: "pastry", desc: "Knotted, sticky, slightly too good.", soldOut: false },
  { id: "galette",   name: "Seasonal Galette",    price: 6.0,  category: "pastry", desc: "Whatever fruit is best this week.", soldOut: false },
  { id: "latte",     name: "Latte",               price: 4.5,  category: "drink",  desc: "Double shot, oat or whole milk.", soldOut: false },
  { id: "drip",      name: "Drip Coffee",         price: 3.0,  category: "drink",  desc: "Free refills while you're here.", soldOut: false },
];

// LESSON: Intl.NumberFormat formats money properly ($4.50, not 4.5).
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });


/* ---------- 1. THEME TOGGLE ----------
   Remembers the choice in localStorage so it sticks after a refresh. */
function setupTheme() {
  const root = document.documentElement; // the <html> element
  const button = document.querySelector(".theme-toggle");

  // LESSON: localStorage can throw (private browsing, blocked cookies).
  // try/catch makes sure the site still works if it does.
  try {
    const saved = localStorage.getItem("theme");
    if (saved) root.dataset.theme = saved; // sets <html data-theme="dark">
  } catch {}

  button.addEventListener("click", () => {
    // Work out what's showing right now (manual choice, or the OS default).
    const current = root.dataset.theme ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  });
}


/* ---------- 2. MOBILE MENU ---------- */
function setupMobileNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open"); // toggle returns the new state
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after a link is tapped (otherwise it covers the page).
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}


/* ---------- 3. MENU CARDS + FILTERS ---------- */
function renderMenu(filter = "all") {
  const grid = document.getElementById("menu-grid");
  const items = filter === "all" ? MENU : MENU.filter((item) => item.category === filter);

  // LESSON: Build the HTML from data with a template string, then insert it once.
  // (One write to the page is faster than many small ones.)
  // NOTE: Only do this with data YOU control. For text typed by users, set
  // .textContent instead, or someone could inject their own HTML/scripts.
  grid.innerHTML = items.map((item) => `
    <li class="card ${item.soldOut ? "sold-out" : ""}">
      <div class="card-top">
        <h3>${item.name}</h3>
        <span class="price">${money.format(item.price)}</span>
      </div>
      <p>${item.desc}</p>
      <span class="tag">${item.category}</span>
    </li>
  `).join("");
}

function setupFilters() {
  const chips = document.querySelectorAll(".chip");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      renderMenu(chip.dataset.filter); // reads data-filter="bread" etc.
    });
  });

  renderMenu(); // first paint
}


/* ---------- 4. OPEN / CLOSED BADGE ----------
   Hours as data: index 0 = Sunday … 6 = Saturday. [open, close] in 24h, or null. */
const HOURS = [[8, 14], null, [7, 15], [7, 15], [7, 15], [7, 15], [8, 14]];

function setupOpenStatus() {
  const el = document.getElementById("open-status");
  const now = new Date();
  const today = HOURS[now.getDay()];
  const hour = now.getHours() + now.getMinutes() / 60;

  const open = today && hour >= today[0] && hour < today[1];
  el.textContent = open ? `Open now · until ${today[1]}:00` : "Closed right now";
  el.classList.add(open ? "is-open" : "is-closed");
}


/* ---------- 5. ORDER FORM ---------- */
function setupOrderForm() {
  const form = document.getElementById("order-form");
  const select = document.getElementById("item");
  const qty = document.getElementById("qty");
  const totalEl = document.getElementById("order-total");
  const success = document.getElementById("form-success");

  // Fill the dropdown from the same MENU data. One source of truth.
  MENU.filter((m) => !m.soldOut).forEach((m) => {
    select.add(new Option(`${m.name} (${money.format(m.price)})`, m.id));
  });

  // Live total: recalculates whenever item or quantity changes.
  function updateTotal() {
    const item = MENU.find((m) => m.id === select.value);
    const total = item ? item.price * Number(qty.value || 0) : 0;
    totalEl.textContent = money.format(total);
  }
  select.addEventListener("change", updateTotal);
  qty.addEventListener("input", updateTotal);

  // LESSON: The browser already knows if a field is valid (from "required",
  // type="email", min/max in the HTML). We just read input.validity and
  // show our own friendlier message.
  function validateField(input) {
    const field = input.closest(".field");
    const errorEl = field.querySelector(".error");
    let message = "";

    if (input.validity.valueMissing)      message = "This one's required.";
    else if (input.validity.typeMismatch) message = "That doesn't look like an email address.";
    else if (input.validity.rangeUnderflow || input.validity.rangeOverflow)
      message = `Pick between ${input.min} and ${input.max}.`;

    errorEl.textContent = message;
    field.classList.toggle("has-error", Boolean(message));
    return !message;
  }

  // Re-check a field when the user leaves it ("blur"), not on every keystroke.
  form.querySelectorAll("input, select").forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // stop the browser from reloading the page

    const inputs = [...form.querySelectorAll("input, select")];
    const allValid = inputs.map(validateField).every(Boolean);
    if (!allValid) {
      form.querySelector(".has-error input, .has-error select").focus();
      return;
    }

    // LESSON: FormData collects every named field in one go.
    const data = Object.fromEntries(new FormData(form));

    // A real site would send it somewhere here, e.g.:
    //   await fetch("/api/orders", { method: "POST", body: JSON.stringify(data) });
    // or insert it into a Supabase table like your other pages do.
    console.log("Order to send:", data);

    // textContent (not innerHTML) because this includes text the user typed.
    success.textContent = `Thanks, ${data.name}! We'll email ${data.email} when it's ready.`;
    success.hidden = false;
    form.reset();
    updateTotal();
  });
}


/* ---------- 6. SMALL THINGS ---------- */
function setupFooterYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}


/* ---------- START ----------
   Because the <script> tag uses "defer", the HTML is fully loaded by the
   time this runs, so every getElementById above will find its element. */
setupTheme();
setupMobileNav();
setupFilters();
setupOpenStatus();
setupOrderForm();
setupFooterYear();
