const API_URL = "/api/transactions";

// Load transactions on dashboard
async function loadTransactions() {
  const table = document.getElementById("transactionTable");

  if (!table) return;

  const response = await fetch(API_URL);
  const transactions = await response.json();

  table.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach(transaction => {

    if (transaction.type === "Income") {
      income += Number(transaction.amount);
    } else {
      expense += Number(transaction.amount);
    }

    table.innerHTML += `
      <tr>
        <td>${transaction.title}</td>
        <td>₹${transaction.amount}</td>
        <td>${transaction.type}</td>
        <td>${transaction.category}</td>
        <td>${transaction.transaction_date}</td>
      <td>
  <a
    href="edit.html?id=${transaction.id}"
    class="btn btn-outline-warning btn-sm">
    Edit
  </a>

  <button
    class="btn btn-outline-danger btn-sm"
    onclick="deleteTransaction(${transaction.id})">
    Delete
  </button>
</td>
        </td>
      </tr>
    `;
  });

  document.getElementById("income").textContent = `₹${income}`;
  document.getElementById("expense").textContent = `₹${expense}`;
  document.getElementById("balance").textContent =
    `₹${income - expense}`;
}

// Add transaction
const form = document.getElementById("transactionForm");

if (form) {

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const transaction = {
      title: document.getElementById("title").value,
      amount: document.getElementById("amount").value,
      type: document.getElementById("type").value,
      category: document.getElementById("category").value,
      transaction_date: document.getElementById("date").value
    };

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transaction)
    });
    localStorage.setItem(
  "successMessage",
  "Transaction added successfully!"
);

    window.location.href = "index.html";
  });
}

// Delete transaction
async function deleteTransaction(id) {

  const confirmDelete = confirm(
    "Are you sure you want to delete this transaction?"
  );

  if (!confirmDelete) return;

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  loadTransactions();
}

loadTransactions();
const successMessage =
  localStorage.getItem("successMessage");

if (successMessage) {

  document.getElementById("messageBox").innerHTML = `
    <div class="alert alert-success alert-dismissible fade show">
      ${successMessage}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert">
      </button>
    </div>
  `;

  localStorage.removeItem("successMessage");
}