document.addEventListener("DOMContentLoaded", function() {
    // Data para la gráfica de transacciones
    const labels = ["12/30/2023", "12/29/2023", "12/28/2023"]; // Fechas
    const data = {
        labels: labels,
        datasets: [{
            label: 'Transaction Amounts',
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
