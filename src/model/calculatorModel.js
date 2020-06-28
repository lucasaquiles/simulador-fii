const calculatorModel = (data, result) => {
    return {
        loading: false,
        edited: false,
        simulation: data,
        simulationResult: result
    }
}

export default (data, result) => {
    calculatorModel(data, result)
}