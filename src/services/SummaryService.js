class SummaryService {
	static calculaTotalDividendosMes (simulationResults) {
		return simulationResults.reduce((total, item) => {
			return (total + (item.yeldValue * item.amount))
		}, 0)
	}

	static calculaSimulacaoDividendosAoMes (simulationResults) {
		return simulationResults.reduce((total, item) => {
			return (total + (item.sumary.median * item.amount * item.period))
		}, 0)
	}

	static calculaPorcentagemPeriodoSimulacaoDividendos (simulationResults) {
		const percentage = (this.calculaTotalNoPeriodoInformado(simulationResults) / this.getTotalInvestimento(simulationResults)) * 100
		return percentage.toFixed(2)
	}

	static calculaTotalNoPeriodoInformado (simulationResults) {
		return simulationResults.reduce((total, item) => {
			return total + ((item.sumary.median * item.amount) * 12)
		}, 0)
	}
	static calculaPorcentagemPeriodo (simulationResults) {
		const percentage = (this.calculaTotalNoPeriodoInformado(simulationResults) / this.getTotalInvestimento(simulationResults)) * 100
		return percentage.toFixed(2)
	}
	static getTotalInvestimento (simulationResults) {
		return simulationResults.reduce((total, item) => {
			return (total + (item.price * item.amount)) + this.calculaTotalDividendosMes(simulationResults)
		}, 0)
	}
	static calculaPorcentagemDividendosMes (simulationResults) {
		const percentage = (this.calculaTotalDividendosMes(simulationResults) / this.getTotalInvestimento(simulationResults)) * 100
		return percentage.toFixed(2)
	}
}

export default SummaryService
