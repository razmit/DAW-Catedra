function showService(serviceId) {
    // Esconde todos los formularios de servicios
    document.querySelectorAll('.service-form').forEach(form => form.style.display = 'none');
    // Muestra el formulario del servicio seleccionado
    document.getElementById(serviceId).style.display = 'block';
}

// Function to handle service payments
function submitPayment(service) {
    
    // Prevent the default form submission
    const form = document.getElementById(service + 'Form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
    });
    
    const amountInput = document.getElementById(service + 'Amount').value;
    let serviceName;
    
    switch (service) { 
        case 'electricity':
            serviceName = 'electricidad';
            break;
        case 'water':
            serviceName = 'agua';
            break;
        case 'internet':
            serviceName = 'internet';
            break;
        case 'cellplan':
            serviceName = 'telefonía';
            break;
    }

    if (amountInput > 0) {
        Swal.fire({
            title: 'Pago exitoso',
            text: `Ha pagado $${amountInput} por ${serviceName}.`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            document.getElementById(form).reset();
        });;
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Por favor ingrese una cantidad correcta.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}