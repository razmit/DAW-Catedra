function setWithdrawAmount(amount) {
    document.getElementById('withdrawAmount').value = amount;
}

document.getElementById('withdrawForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('withdrawAmount').value;
    
    if (amount > 0) {
        Swal.fire({
            title: 'Retiro exitoso',
            text: `Ha retirado $${amount}.`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            document.getElementById('withdrawForm').reset();
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Por favor ingrese una cantidad válida.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});
