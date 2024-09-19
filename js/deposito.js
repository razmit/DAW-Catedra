// Poner el monto predeterminado en el campo de monto
function setDepositAmount(amount) {
    document.getElementById('depositAmount').value = amount;
}

// Botones de formulario de depósito
document.getElementById('depositForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('depositAmount').value;
    const source = document.getElementById('depositSource').value;
    
    if (amount && source) {
        // Éxito de SweetAlert
        Swal.fire({
            title: 'Depósito exitoso',
            text: `Se ha depositado $${amount} proveniente de ${source}.`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            document.getElementById('depositForm').reset();
        });
    } else {
        // Error de SweetAlert
        Swal.fire({
            title: 'Error',
            text: 'Popr favor, complete todos los campos.', 
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});
