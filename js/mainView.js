function createTestTransaction() {
  const testTransaction = new Transaction(
    4,                        // idTrans
    '0987654321',             // originAccount (Ash's account)
    '0987654321',             // destinationAccount
    54.10,                    // amount
    'deposit',                // typeTrans
    'Depósito'                // description
);

  // Traemos las transacciones almacenadas en LocalStorage
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  
  // Verificamos si la ID de la transacción ya existe para evitar duplicados
  const transactionExists = transactions.some(tx => tx.idTrans === testTransaction.idTrans);
  if (!transactionExists) {
      // Añade la transacción al array de transacciones
      transactions.push(testTransaction);

      // Guarda el array de transacciones en LocalStorage
      localStorage.setItem('transactions', JSON.stringify(transactions));
  }
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

    console.log("Transaction type:", transaction.typeTrans);
    // Color basado en el tipo de transacción
    if (transaction.typeTrans === "deposit") {
      transactionItem.classList.add("transaction-deposit");
  } else if (transaction.typeTrans === "withdraw") {
      transactionItem.classList.add("transaction-withdraw");
  } else if (transaction.typeTrans === "transfer") {
      transactionItem.classList.add("transaction-transfer");
  } else if (transaction.typeTrans === "service-payment") {
      transactionItem.classList.add("transaction-service-payment");
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

    // Muestra la data del usuario en la tarjeta
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

// window.DOMContentLoaded = () => {
//   createTestTransaction();
//   loadUserData(); // Ejecutar cuando cargue la página
//   console.log("PEPE LIVES");
// };

window.onload = () => {
  createTestTransaction();
  loadUserData(); // Ejecutar cuando cargue la página
  console.log("PEPE LIVES ON LOAD");
}
