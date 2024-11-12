class Transaction {
  constructor(idTrans, originAccount, destinationAccount, amount, typeTrans) {
    this.idTrans = idTrans;
    this.originAccount = originAccount;
    this.destinationAccount = destinationAccount;
    this.amount = amount;
    this.timestampTrans = new Date().toLocaleString();
    this.typeTrans = typeTrans; // Debería ser 'deposit', 'withdraw', o 'transfer'

    // Validate transaction type
    const validTypes = ["deposit", "withdraw", "transfer"];
    if (validTypes.includes(typeTrans)) {
      this.typeTrans = typeTrans;
    } else {
      throw new Error("Invalid transaction type");
    }
  }
}

function createTestTransaction() {
  const testTransaction = new Transaction(
    1, // idTrans
    "0987654321", // originAccount (Ash's account)
    "1234567890", // destinationAccount
    50.0, // amount
    "deposit" // typeTrans
  );

  // Metemos la transaction en LocalStorage
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.push(testTransaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Traemos las transacciones almacenadas en LocalStorage
const transactions = JSON.parse(localStorage.getItem("transactions")) || []; // El operador || es para evitar que retorne null

const transactionList = document.querySelector(".transaction-list");
transactions.forEach((transaction) => {
    const transactionItem = document.createElement("li");
    transactionItem.classList.add("list-group-item", "transaction-item");

    // Poner mayúscula la primera letra del tipo de transacción
    const capitalizedType = capitalizeFirstLetter(transaction.typeTrans);
    transactionItem.textContent = `${capitalizedType}: $${transaction.amount} en ${transaction.timestampTrans}`;

    // Color basado en el tipo de transacción
    if (transaction.typeTrans === "deposit") {
        transactionItem.classList.add("transaction-deposit");
    } else if (transaction.typeTrans === "withdraw") {
        transactionItem.classList.add("transaction-withdraw");
    } else if (transaction.typeTrans === "transfer") {
        transactionItem.classList.add("transaction-transfer");
    }

    transactionList.appendChild(transactionItem);
});

function logout() {
  Swal.fire({
    title: "Salir",
    text: "¿Estás seguro que deseas cerrar sesión?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Salir",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "index.html";
    }
  });
}

function loadUserData() {
  // Traemos la data del usuario almacenada en LocalStorage
  const storedUsers = JSON.parse(localStorage.getItem("users"));
  console.log("LocalStorage at loading:", storedUsers);
  if (storedUsers && storedUsers.length > 0) {
    const user = storedUsers[0];

    // Display user data in the account information section
    document.getElementById(
      "welcome-sign"
    ).textContent = `Bienvenido, ${user.username}`;
    document.querySelector(
      ".card-text:nth-child(2)"
    ).textContent = `Número de cuenta: ${user.account}`;
    document.querySelector(
      ".card-text:nth-child(3)"
    ).textContent = `Tipo de cuenta: ${user.accountType}`;
    document.querySelector(
      ".card-text:nth-child(4)"
    ).textContent = `Balance: $${user.balance.toFixed(2)}`;
    document.querySelector(
      ".card-text:nth-child(5)"
    ).textContent = `Intereses acumulados: $${user.interestRate}`;
    document.querySelector(
      ".card-text:nth-child(6)"
    ).textContent = `Último ingreso: ${user.lastAccess}`;

    document.getElementById("current-date").textContent =
      new Date().toLocaleDateString();
  } else {
    console.error("No hay un usuario registrado en LocalStorage");
  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

window.DOMContentLoaded = () => {
  createTestTransaction;
  loadUserData(); // Ejecutar cuando cargue la página
};
