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

import SummaryService from '../services/SummaryService'

export default {
  name: 'Summary',
  props: ['simulationResults'],
  data () {
    return this.simulationResults
  },
  methods: {
    calculaTotalDividendosMes () {
      return SummaryService.calculaTotalDividendosMes(this.simulationResults)
    },
    calculaTotalNoPeriodoInformado () {
      return SummaryService.calculaTotalNoPeriodoInformado(this.simulationResults)
    },
    calculaPorcentagemPeriodo () {
      return SummaryService.calculaPorcentagemPeriodo(this.simulationResults)
    },
    getTotalInvestimento () {
     return SummaryService.getTotalInvestimento(this.simulationResults)
    },
    calculaPorcentagemDividendosMes () {
      return SummaryService.calculaPorcentagemDividendosMes(this.simulationResults)
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
