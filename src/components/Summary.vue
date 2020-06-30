<template>
  <div class="md-layout md-gutter " >
    
    <div class="md-layout-item">
      <md-card class="summary-card">
        <md-card-content>
          <div class="md-subhead">Dividendos</div>
          <div class="md-title">{{calculaTotalDividendosMes().toCurrencyFormat()}}</div>
          <span class="md-caption">({{calculaPorcentagemDividendosMes()}}% a.m)</span>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item">
      <md-card class="summary-card">
        <md-card-content>
          <div class="md-subhead">Dividendos</div>
          <div class="md-title">{{calculaTotalNoPeriodoInformado().toCurrencyFormat()}}</div>
          <span class="md-caption">({{calculaPorcentagemPeriodo()}}% a.a)</span>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item">
      <md-card class="summary-card">
        <md-card-content>
          <div class="md-subhead">Total acumulado</div>
          <div class="md-title">{{getTotalInvestimento().toCurrencyFormat()}}</div>
          <span class="md-caption"> &nbsp; </span>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'Summary',
    props: ['simulationResults'],
    data() {
      return this.simulationResults
    },
    methods: {
      calculaTotalDividendosMes() {

        return this.simulationResults.reduce(((total, item) => {
          return total + (item.yeldValue * item.amount)
        }), 0);
      },
      calculaTotalNoPeriodoInformado() {
        return this.simulationResults.reduce(((total, item) => {
          return total + ((item.yeldValue * item.amount) * 12) 
        }), 0);
      },
      calculaPorcentagemPeriodo() {
        const percentage = (this.calculaTotalNoPeriodoInformado() / this.getTotalInvestimento()) * 100;
        return percentage.toFixed(2)
      },
      getTotalInvestimento() {
        return this.simulationResults.reduce(((total, item) => {
          return (total + (item.price * item.amount)) + this.calculaTotalDividendosMes()
        }), 0);
      },
      calculaPorcentagemDividendosMes() {
        const percentage = (this.calculaTotalDividendosMes() / this.getTotalInvestimento()) * 100;
        return percentage.toFixed(2)
      }
    }
  }
</script>

<style lang="css" scoped>

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

  .summary-card {}

  /* .md-card {
    width: 250px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  } */
</style>