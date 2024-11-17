function handleWithdrawal(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    // Get the withdrawal amount from the input field
    const withdrawInput = document.getElementById("withdraw-amount");
    let withdrawAmount = parseFloat(withdrawInput.value);

    // Automatically format whole numbers to two decimals
    if (!isNaN(withdrawAmount)) {
        withdrawAmount = parseFloat(withdrawAmount.toFixed(2));
        withdrawInput.value = withdrawAmount; // Update the input field for clarity
    }

    // Validate the input amount (must be a positive number and <= current balance)
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        Swal.fire({
            title: "Error",
            text: "Ingrese un monto válido (hasta 2 decimales).",
            icon: "error",
            confirmButtonText: "Cerrar"
        });
        return;
    }

    // Retrieve user from LocalStorage
    let storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers && storedUsers.length > 0) {
        let user = storedUsers[0]; // Assume there's only one user

        // Check if the user has enough balance
        if (user.balance < withdrawAmount) {
            Swal.fire({
                title: "Fondos insuficientes",
                text: "No tiene suficiente saldo para realizar esta transacción.",
                icon: "warning",
                confirmButtonText: "Cerrar"
            });
            return;
        }

        // Deduct the withdrawal amount from the user's balance
        user.balance -= withdrawAmount;

        // Save the updated user data back to LocalStorage
        localStorage.setItem("users", JSON.stringify(storedUsers));

        // Add a withdrawal transaction to LocalStorage
        const newTransaction = new Transaction(
            Date.now(),        // Unique ID based on timestamp
            user.account,      // Origin account
            "Cash Withdrawal", // Destination account (cash withdrawal)
            withdrawAmount,    // Amount
            "withdraw",        // Type of transaction
            "Retiro de efectivo" // Description
        );

        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions.push(newTransaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));

        // Success message
        Swal.fire({
            title: "Retiro Exitoso",
            text: `Se ha retirado $${withdrawAmount.toFixed(2)} de su cuenta.`,
            icon: "success",
            confirmButtonText: "Cerrar"
        });

        // Clear the input field
        withdrawInput.value = "";
    } else {
        Swal.fire({
            title: "Error",
            text: "No se encontró información de la cuenta.",
            icon: "error",
            confirmButtonText: "Cerrar"
        });
    }
}

// Initialization
window.onload = function () {
    document.getElementById("withdraw-form").addEventListener("submit", handleWithdrawal);
};

function logout() {
    Swal.fire({
        title: 'Salir',
        text: '¿Estás seguro que deseas cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'index.html'; 
        }
    });
}