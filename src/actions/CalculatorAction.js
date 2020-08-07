import SessionStorageManager from './SessionStorageManager'

class CalculatorAction {

    constructor() {
        this.key = document.location.href
        this.sessionStorageManager = new SessionStorageManager(this.key)
    }

    save(calculatorData) {
        this.sessionStorageManager.saveOrUpdate(calculatorData)
    }

    clear(simulation) {
      simulation.fiiCodeSelected = ''
      simulation.price = 0.0
      simulation.yeldValue = 0.0
      simulation.period = 1
      simulation.totalYeld = 0.0
      simulation.totalInvestiment = 0.0
      simulation.amount = 1,
      simulation.sumary = {}
    }

    toSimulationData(simulation, responseData) {
        
        const clone = JSON.parse(
            JSON.stringify(simulation)
        )
        
        console.log("data", clone)

        clone.sumary = responseData.sumary
        clone.yeldValue = responseData.lastDividend
        clone.price = responseData.value
        clone.segment = responseData.fiiType
        clone.totalYeld = 1
        clone.totalYeld = clone.totalYeld * clone.yeldValue
        clone.totalInvestiment = clone.price * clone.amount
        clone.totalYeld = clone.totalYeld * clone.amount
        clone.createdAt = this.createDateSimulation()
        return clone
    }

    createDateSimulation() {
        const date = new Date()
        const dateFormat = new Intl.DateTimeFormat('pt', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit'
        })
        return dateFormat.format(date)
    }
}

export default CalculatorAction