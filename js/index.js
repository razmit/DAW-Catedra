class User {
    constructor(username, pin, account, balance) {
        this.username = username;
        this.pin = pin;
        this.account = account
        this.balance = balance;
        this.accountType = "Ahorro";
        this.lastAccess = new Date().toLocaleString;
        this.interestRate = 0.05;    
    }
    
    updateLastAccess() {
        this.lastAccess = new Date().toLocaleString();
    }
}

function createAshUser() {
    const defaultUser = new User('Ash Ketchum', 1234, '0987654321', 500.00);
    console.log("Local storage when it loads: "+localStorage.getItem('users'));
    // localStorage.clear();
    defaultUser.updateLastAccess();
    
    console.log("Local storage when it's been cleared: "+localStorage.getItem('users'));
    console.log("Default User:", JSON.stringify(defaultUser, null, 2));
    // Store Ash en LocalStorage
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([defaultUser]));
    }
    
    console.log("LocalStorage after saving default user:", localStorage.getItem('users'));
}

window.onload = createAshUser; // Ejecutar cuando cargue la página

// Para validate-js
const constraints = {
    pin: {
        presence: { allowEmpty: false },
        format: {
            pattern: "^[0-9]{4}$",
            message: "must be a 4-digit number"
        }
    }
};

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
    const pinInput = document.getElementById('pinInput').value;
    
    // Validate the PIN based on the constraints
    const validation = validate({ pin: pinInput }, constraints);
    
    if (validation) {
        Swal.fire({
            title: 'Error!',
            text: validation.pin[0], // Display the validation error message
            icon: 'error',
            confirmButtonText: 'Close'
        });
    } else {
        // If validation passes, proceed with the login logic
        const storedUser = JSON.parse(localStorage.getItem('users')).find(user => user.username === 'Ash Ketchum');

        if (storedUser && storedUser.pin === +pinInput) {
            Swal.fire({
                title: 'Success!',
                text: 'PIN accepted, redirecting to the main page...',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'mainView.html';
                }
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid PIN. Please try again.',
                icon: 'error',
                confirmButtonText: 'Close'
            });
            clearInput();
        }
    }
}
