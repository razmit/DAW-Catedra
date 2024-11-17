// Cambia entre la tabla o la gráfica
function showComponent(component) {
    document.querySelectorAll('.history-component').forEach(el => el.style.display = 'none');
    document.getElementById(`${component}-container`).style.display = 'block';
}

// Llena la tabla
function loadTableData() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const tableBody = document.getElementById("transaction-table-body");

    transactions.forEach(transaction => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.idTrans}</td>
            <td>${transaction.originAccount}</td>
            <td>${transaction.destinationAccount}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
            <td>${capitalizeFirstLetter(transaction.typeTrans.replace("-", " "))}</td>
            <td>${transaction.description}</td>
            <td>${transaction.timestampTrans}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Helper function
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Genera la gráfica
function generateChart() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Separa las transacciones por tipo
    const dataByType = transactions.reduce((acc, transaction) => {
        acc[transaction.typeTrans] = (acc[transaction.typeTrans] || 0) + transaction.amount;
        return acc;
    }, {});

    const ctx = document.getElementById("transaction-chart").getContext("2d");
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(dataByType).map(type => capitalizeFirstLetter(type.replace("-", " "))),
            datasets: [{
                label: 'Transacciones por tipo ($)',
                data: Object.values(dataByType),
                backgroundColor: [
                    '#2e7d32', // Verde para deposit
                    '#c62828', // Rojo para withdraw
                    '#1565c0', // Azul para transfer
                    '#ef6c00'  // Naranja para service-payment
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Distribución de Transacciones'
                }
            }
        }
    });
}

// Initialization
window.onload = function () {
    loadTableData();  // LLena la tabla
    generateChart();  // Genera la gráfica
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