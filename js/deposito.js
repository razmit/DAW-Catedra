function handleDeposit(event) {
    event.preventDefault();

    // Obtiene la cantidad de depósito del input field
    const depositInput = document.getElementById("deposit-amount");
    let depositAmount = parseFloat(depositInput.value);

    // Formatea la cantidad a 2 decimales
    if (!isNaN(depositAmount)) {
        depositAmount = parseFloat(depositAmount.toFixed(2));
        depositInput.value = depositAmount; 
    }

    // Validar que la cantidad sea un número positivo
    if (isNaN(depositAmount) || depositAmount <= 0) {
        Swal.fire({
            title: "Error",
            text: "Ingrese un monto válido (hasta 2 decimales).",
            icon: "error",
            confirmButtonText: "Cerrar"
        });
        return;
    }

    // Obtiene la información del usuario almacenada en LocalStorage
    let storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers && storedUsers.length > 0) {
        let user = storedUsers[0]; 
        user.balance += depositAmount; // Actualizar el balance del usuario

        // Lo vuelve a guardar actualizado
        localStorage.setItem("users", JSON.stringify(storedUsers));

        // Añadimos la transacción a la lista
        const newTransaction = new Transaction(
            Date.now(),        // ID de transacción única
            user.account,      
            user.account,      
            depositAmount,     
            "deposit",         
            `Depósito realizado por ${depositAmount}`
        );

        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions.push(newTransaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        
        Swal.fire({
            title: "Depósito Exitoso",
            text: `Se ha depositado $${depositAmount.toFixed(2)} a su cuenta.`,
            icon: "success",
            confirmButtonText: "Cerrar"
        });

        // Limpia el input field
        depositInput.value = "";
    } else {
        Swal.fire({
            title: "Error",
            text: "No se encontró información de la cuenta.",
            icon: "error",
            confirmButtonText: "Cerrar"
        });
    }
}

window.onload = function () {
    document.getElementById("deposit-form").addEventListener("submit", handleDeposit);
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