class CalculatorService {
	static calculaTotalDividendosMes (simulationResults) {
		return simulationResults.reduce((total, item) => {
					return (total + (item.yeldValue * item.amount))
		}, 0)
	}
	static calculaTotalNoPeriodoInformado (simulationResults) {
		return simulationResults.reduce((total, item) => {
			return total + ((item.yeldValue * item.amount) * 12)
		}, 0)
	}
	static calculaPorcentagemPeriodo () {
		const percentage = (this.calculaTotalNoPeriodoInformado() / this.getTotalInvestimento()) * 100
		return percentage.toFixed(2)
	}
	static getTotalInvestimento (simulationResults) {
		console.log("totalInvestimento", simulationResults);
		return simulationResults.reduce((total, item) => {
			return (total + (item.price * item.amount)) + this.calculaTotalDividendosMes(simulationResults)
		}, 0)
	}
	static calculaPorcentagemDividendosMes (simulationResults) {
		const percentage = (this.calculaTotalDividendosMes(simulationResults) / this.getTotalInvestimento(simulationResults)) * 100
		return percentage.toFixed(2)
	}
}

export default CalculatorService
