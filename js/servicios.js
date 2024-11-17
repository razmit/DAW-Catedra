function showService(serviceId) {
    // Esconde todos los formularios de servicios
    document.querySelectorAll('.service-form').forEach(form => form.style.display = 'none');
    // Muestra el formulario del servicio seleccionado
    document.getElementById(serviceId).style.display = 'block';
}

function submitPayment(service) {
    
    // Obtiene el formulario del servicio seleccionado
    const form = document.getElementById(service + 'Form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
    });

    // Obtiene el monto ingresado por el usuario
    const amountInput = parseFloat(document.getElementById(service + 'Amount').value);

    // Mapea los nombres de los servicios a sus IDs
    const serviceNames = {
        electricity: 'electricidad',
        water: 'agua',
        internet: 'internet',
        cellplan: 'telefonía',
    };
    
    if (isNaN(amountInput) || amountInput <= 0) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor ingrese una cantidad válida.',
            icon: 'error',
            confirmButtonText: 'OK',
        });
        return;
    }

    let storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers && storedUsers.length > 0) {
        let user = storedUsers[0]; 
        // Checkea si el usuario tiene suficiente saldo para realizar la transacción
        if (user.balance < amountInput) {
            Swal.fire({
                title: 'Fondos insuficientes',
                text: 'No tiene suficiente saldo para realizar esta transacción.',
                icon: 'warning',
                confirmButtonText: 'Cerrar',
            });
            return;
        }

        // Quitar el monto del saldo del usuario
        user.balance -= amountInput;

        // Guardar el usuario actualizado en localStorage
        localStorage.setItem('users', JSON.stringify(storedUsers));

        // Add a transaction for the service payment
        const newTransaction = new Transaction(
            Date.now(),               
            user.account,             
            serviceNames[service],    // Cuenta destino (nombre del servicio)
            amountInput,              
            "service-payment",        
            `Pago de ${serviceNames[service]}`
        );

        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(newTransaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // Éxito
        Swal.fire({
            title: 'Pago exitoso',
            text: `Ha pagado $${amountInput.toFixed(2)} por ${serviceNames[service]}.`,
            icon: 'success',
            confirmButtonText: 'OK',
        }).then(() => {
            // Resetea el formulario y lo esconde
            document.getElementById(service + 'Form').reset();
            document.getElementById(service).style.display = 'none';
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'No se encontró información de la cuenta.',
            icon: 'error',
            confirmButtonText: 'Cerrar',
        });
    }
}

window.onload = function () {
    document.querySelectorAll(".service-form form").forEach(form => {
        const service = form.id.replace("Form", ""); // Obtiene todos los formularios de servicios y les asigna un evento submit
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            submitPayment(service);
        });
    });
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