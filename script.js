const toppingNames = ['lettuce', 'bacon', 'cheese', 'meat']; 
const toppingPrices = [0.5, 1, 0.7, 1.5]; 
const basePrice = 4;

const maxToppings = 5;

let counts = [0, 0, 0, 0]; 
const priceDisplay = document.getElementById('price');

let orderNumber = 1; 

function updateIngredient(type, action) {
  const index = toppingNames.indexOf(type);
  if (action === 'more' && counts[index] < maxToppings) {
    counts[index]++;
  } else if (action === 'less' && counts[index] > 0) {
    counts[index]--;
  }
  renderBurger();
  updatePrice();
}

function renderBurger() {
  for (let i = 0; i < toppingNames.length; i++) {
    const type = toppingNames[i];
    for (let j = 1; j <= maxToppings; j++) {
      const toppingDiv = document.getElementById(`${type}-${j}`);
      toppingDiv.style.display = j <= counts[i] ? 'block' : 'none';
    }
  }
}

function updatePrice() {
  let total = basePrice;
  for (let i = 0; i < toppingNames.length; i++) {
    total += counts[i] * toppingPrices[i];
  }
  priceDisplay.innerText = "Current Price: $" + total.toFixed(2);
}

function resetBurger() {
  counts = [0, 0, 0, 0];
  renderBurger();
  updatePrice();
}

let isLoggedIn = false;
let currentUser = "";

let users = [
  { username: "admin", password: "1234" },
  { username: "mahnoor", password: "abcd" },
  { username: "guest", password: "0000" }
];

function checklogin() {
  const username = document.getElementById("userid").value;
  const password = document.getElementById("passid").value;
  let loggedIn = false;

  for (let i = 0; i < users.length; i++) {
    if (username === users[i].username && password === users[i].password) {
      alert("Login Successful: Welcome " + username);
      isLoggedIn = true;
      currentUser = username;
      loggedIn = true;
      closeLoginModal();
      break;
    }
  }

  if (!loggedIn) {
    alert("Invalid username or password");
  }
}

function placeOrder() {
  if (!isLoggedIn) openLoginModal();
  else generateReceipt();
}

function generateReceipt() {
  let total = basePrice;
  for (let i = 0; i < counts.length; i++) {
    total += counts[i] * toppingPrices[i];
  }

  document.getElementById("receiptUser").innerText = currentUser;

  const ingredientListIds = ["receipt-lettuce", "receipt-bacon", "receipt-cheese", "receipt-meat"];

  for (let i = 0; i < counts.length; i++) {
    const li = document.getElementById(ingredientListIds[i]);
    if (counts[i] > 0) {
      li.style.display = "list-item";
      li.textContent = toppingNames[i] + " x " + counts[i];
    } else {
      li.style.display = "none";
      li.textContent = "";
    }
  }

  document.getElementById("receiptTotal").innerText = total.toFixed(2);

 
  document.getElementById("receiptOrderNumber").innerText = orderNumber;
  orderNumber++; 

  document.getElementById("receipt-card").style.display = "block";
}

function openLoginModal() {
  document.getElementById("login-modal").style.display = "flex";
}

function closeLoginModal() {
  document.getElementById("login-modal").style.display = "none";
}


renderBurger();
updatePrice();

