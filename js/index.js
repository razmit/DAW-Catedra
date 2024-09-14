function addNumber(num) {
    const input = document.getElementById('pinInput');
    if (input.value.length < 4) { // Limita a 4 caracteres el input
        input.value += num;
    }
}

function clearInput() {
    document.getElementById('pinInput').value = '';
}

function submitInput() {
    const pin = document.getElementById('pinInput').value;
    if (pin.length === 4) {
        // Muestra SweetAlert de éxito y redirige a mainView.html
        Swal.fire({
            title: '¡Éxito!',
            text: 'PIN aceptado, redirigiendo a la página principal...',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'mainView.html'; // Redirecciona a mainView.html
            }
        });
    } else {
        Swal.fire({
            title: '¡Error!',
            text: 'Por favor ingrese un PIN de 4 dígitos.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}
