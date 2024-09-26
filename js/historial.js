document.addEventListener("DOMContentLoaded", function() {
    // Data para la gráfica de transacciones
    const labels = ["30/11/2023", "5/12/2023", "3/3/2024"]; // Fechas
    const data = {
        labels: labels,
        datasets: [{
            label: 'Cantidad de transacciones',
            data: [500, -189, -67.82], // 
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)', // Verde para depósito
                'rgba(255, 99, 132, 0.2)', // Rojo para retiro
                'rgba(255, 205, 86, 0.2)', // Amarillo para pago
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)', 
                'rgba(255, 99, 132, 1)', 
                'rgba(255, 205, 86, 1)', 
            ],
            borderWidth: 1
        }]
    };

    // Configuración de la gráfica
    const config = {
        type: 'bar', 
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true 
                }
            }
        }
    };

    const transactionChart = new Chart(
        document.getElementById('transactionChart'),
        config
    );
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