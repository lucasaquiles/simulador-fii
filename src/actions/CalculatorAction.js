import SessionStorageManager from './SessionStorageManager'

class CalculatorAction {

    constructor() {
        this.key = document.location.href
        this.sessionStorageManager = new SessionStorageManager(this.key)
    }

    save(calculatorData) {
        this.sessionStorageManager.saveOrUpdate(calculatorData)
    }
}

export default CalculatorAction