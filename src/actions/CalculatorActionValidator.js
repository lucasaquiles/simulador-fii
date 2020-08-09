const FII_SELECTED = {
    validate(data){
      return data.fiiCodeSelected.length >= 5
    },
    message: {
        content: "você precisa informar uma FII",
        field: "simulation.fiiCodeSelected"
    }
}
const AMOUNT = {
    validate(data) {
        return data.amount > 0
    },
    message: {
        content: "você precisa informar a quantidade de ações",
        field: "simulation.amount"
    }
}
const VALID_PERIOD = {
    validate(data) {
        return data.period > 0
    },
    message: { 
        content: "você precisa informar o tempo de aplicação", 
        field: "simulation.period"
    }
}
const validations = Object.seal({
    FII_SELECTED,
    AMOUNT,
    VALID_PERIOD
})

export default class CalculatorActionValidator {
    constructor() {
        this.validations = validations
    }
    validate(simulation) {

        const messageValiations =  Object.values(validations).filter((validation) => !validation.validate(simulation))
        .map((validation) => validation.message)
        .flat()

        return Object.seal({
            hasErrors: ( messageValiations.length > 0 ),
            messages: messageValiations,
        })
    }
}