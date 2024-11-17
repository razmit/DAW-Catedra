function handleTransaction(event) {
    event.preventDefault(); 

    const destinationAccount = document.getElementById("destination-account").value;
    const transactionAmount = parseFloat(document.getElementById("transaction-amount").value);

    
    if (!/^\d+$/.test(destinationAccount)) {
        Swal.fire({
            title: "Error",
            text: "El número de cuenta debe contener solo números.",
            icon: "error",
            confirmButtonText: "Cerrar",
        });
        return;
    }

    if (isNaN(transactionAmount) || transactionAmount <= 0) {
        Swal.fire({
            title: "Error",
            text: "Ingrese un monto válido (hasta 2 decimales).",
            icon: "error",
            confirmButtonText: "Cerrar",
        });
        return;
    }

    // Traer la información de la cuenta del usuario
    let storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers && storedUsers.length > 0) {
        let user = storedUsers[0]; 
        
        if (user.balance < transactionAmount) {
            Swal.fire({
                title: "Fondos insuficientes",
                text: "No tiene suficiente saldo para realizar esta transacción.",
                icon: "warning",
                confirmButtonText: "Cerrar",
            });
            return;
        }
        
        user.balance -= transactionAmount;
        
        localStorage.setItem("users", JSON.stringify(storedUsers));
        
        const newTransaction = new Transaction(
            Date.now(),          
            user.account,        
            destinationAccount,  
            transactionAmount,   
            "transfer",          
            "Transferencia de dinero" 
        );

        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions.push(newTransaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        
        Swal.fire({
            title: "Transferencia Exitosa",
            text: `Se ha transferido $${transactionAmount.toFixed(2)} a la cuenta ${destinationAccount}.`,
            icon: "success",
            confirmButtonText: "OK",
        }).then(() => {
            document.getElementById("transaction-form").reset();
        });
    } else {
        Swal.fire({
            title: "Error",
            text: "No se encontró información de la cuenta.",
            icon: "error",
            confirmButtonText: "Cerrar",
        });
    }
}

window.onload = function () {
    document.getElementById("transaction-form").addEventListener("submit", handleTransaction);
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