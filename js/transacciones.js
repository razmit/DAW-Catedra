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
