document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const recipient = document.getElementById('recipientAccount').value;
    const amount = document.getElementById('transactionAmount').value;
    const description = document.getElementById('transactionDescription').value;

    if (recipient && amount > 0) {
        Swal.fire({
            title: 'Transferencia exitosa',
            text: `Transferido $${amount} a ${recipient}. Descripción: ${description || 'No descripción'}.`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            document.getElementById('transactionForm').reset();
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Por favor ingrese un recipiente y una cantidad válida.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});

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