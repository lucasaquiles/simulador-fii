class SummaryService {
	calculaTotalDividendosMes (simulationResults) {
		return simulationResults.reduce((total, item) => {
			return (total + (item.yeldValue * item.amount))
		}, 0)
	}

	calculaSimulacaoDividendosAoMes (simulationResults) {
		return simulationResults.reduce((total, item) => {
			return (total + (item.sumary.median * item.amount * item.period))
		}, 0)
	}

	calculaPorcentagemPeriodoSimulacaoDividendos (simulationResults) {
		const percentage = (this.calculaTotalNoPeriodoInformado(simulationResults) / this.getTotalInvestimento(simulationResults)) * 100
		return percentage.toFixed(2)
	}

	calculaTotalNoPeriodoInformado (simulationResults) {
		return simulationResults.reduce((total, item) => {
			return total + ((item.sumary.median * item.amount) * 12)
		}, 0)
	}
	calculaPorcentagemPeriodo (simulationResults) {
		const percentage = (this.calculaTotalNoPeriodoInformado(simulationResults) / this.getTotalInvestimento(simulationResults)) * 100
		return percentage.toFixed(2)
	}
	getTotalInvestimento (simulationResults) {
		return simulationResults.reduce((total, item) => {
			return (total + (item.price * item.amount)) + this.calculaTotalDividendosMes(simulationResults)
		}, 0)
	}
	calculaPorcentagemDividendosMes (simulationResults) {
		const percentage = (this.calculaTotalDividendosMes(simulationResults) / this.getTotalInvestimento(simulationResults)) * 100
		return percentage.toFixed(2)
	}

	calculateTotalYeld(item) {
		return item.yeldValue * item.amount
	}
	
	calculateTotalYeldAtPeriod(item) {
		return item.sumary.median * item.period * item.amount
	}
	
	calculatePercentageRendiments(item) {
		return ( (item.yeldValue * item.amount) / (item.price * item.amount) * 100 ).toFixed(2)
	}
	
	calculateTotalInvestiment(item) {
		return (item.price * item.amount) + (item.yeldValue * item.amount)
	}
}

export default new SummaryService()
