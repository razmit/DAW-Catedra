class Transaction {
    constructor(idTrans, originAccount, destinationAccount, amount, typeTrans, description) {
        this.idTrans = idTrans;
        this.originAccount = originAccount;
        this.destinationAccount = destinationAccount;
        this.amount = amount;
        this.timestampTrans = new Date().toLocaleString();
        this.description = description;

        // Validate transaction type
        const validTypes = ["deposit", "withdraw", "transfer", "service-payment"];
        if (validTypes.includes(typeTrans)) {
            this.typeTrans = typeTrans;
        } else {
            throw new Error("Invalid transaction type");
        }
    }
}
