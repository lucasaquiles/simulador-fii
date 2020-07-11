<template>
  <div class="md-layout md-gutter " v-if="simulationResults.length > 0">
    <div class="md-layout-item">
      <div class="md-card summary-card">
        <div class="tool"></div>
        <div class="md-card-content">
          <div class="md-subhead">Dividendos</div>
          <div class="md-title">{{calculaTotalDividendosMes().toCurrencyFormat()}}</div>
          <span class="md-caption">({{calculaPorcentagemDividendosMes()}}% a.m)</span>
        </div>
      </div>
    </div>
    <div class="md-layout-item">
      <div class="md-card summary-card">
        <div class="md-card-content">
          <div class="md-subhead">Dividendos</div>
          <div class="md-title">{{calculaTotalNoPeriodoInformado().toCurrencyFormat()}}</div>
          <span class="md-caption">({{calculaPorcentagemPeriodo()}}% a.a)</span>
        </div>
      </div>
    </div>
    <div class="md-layout-item">
      <div class="md-card summary-card">
        <div class="tool"></div>
        <div class="md-card-content">
          <div class="md-subhead">Total acumulado</div>
          <div class="md-title">{{getTotalInvestimento().toCurrencyFormat()}}</div>
          <span class="md-caption"> &nbsp; </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import calculatorService from '../services/CalculatorService'

export default {
  name: 'Summary',
  props: ['simulationResults'],
  data () {
    return this.simulationResults
  },
  methods: {
    calculaTotalDividendosMes () {
      return calculatorService.calculaTotalDividendosMes(this.simulationResults)
    },
    calculaTotalNoPeriodoInformado () {
      return calculatorService.calculaTotalNoPeriodoInformado(this.simulationResults)
    },
    calculaPorcentagemPeriodo () {
      const percentage = (this.calculaTotalNoPeriodoInformado() / this.getTotalInvestimento()) * 100
      return percentage.toFixed(2)
    },
    getTotalInvestimento () {
     return calculatorService.getTotalInvestimento(this.simulationResults)
    },
    calculaPorcentagemDividendosMes () {
      return calculatorService.calculaPorcentagemDividendosMes(this.simulationResults)
    }
  }
}
</script>

<style>

  .summary-card {
    width: 100%;
    margin: 5px 0;
    background-color: #4F86C6;
    color: #fff
  }
 

  .summary-card .md-caption-subhead {
    opacity: 1;
    color: #fff;
  }

  .summary-card .md-caption {
    opacity: .54;
    color: #fff;
  }

</style>
