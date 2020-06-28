<template>
    <div>
            <div class="md-primary">
             
                <md-card v-if="simulationResults.length > 0">
                  <md-card-header>
                    <div class="md-title">Resumo</div>
                  </md-card-header>
                  <md-card-content>
                    <div>Dividendos ao mês: {{getTotal().toCurrencyFormat()}}</div>
                    <div>Investimento acumulado: {{getTotalInvestimento().toCurrencyFormat()}}</div>
                  </md-card-content>
                </md-card>
             
            </div>
            <div class="md-primary">
                <md-card v-for="item in simulationResults" :key="item.fiiCodeSelected" md-theme="green-card">
                  
                  <md-card-header>
                    <div class="md-title">{{item.fiiCodeSelected.toUpperCase()}}</div>
                    <div class="md-subhead">
                        {{item.totalInvestiment.toCurrencyFormat()}}
                        <span>({{item.price.toCurrencyFormat()}} por cota)</span>
                    </div>
                  </md-card-header>
                  <md-card-expand>     
                      <md-card-content>
                       {{item.totalYeld.toCurrencyFormat()}}* em dividendos por {{item.period}} meses
                      </md-card-content>
                  </md-card-expand>
                </md-card>
              </div>
          
        <p v-if="simulationResults.length > 0">* as informações consideram apenas o último rendimento pago de cada FII</p>
    </div>
</template>

<script>

export default {
  name: 'Calculator',
  props: ['simulationResults'],
  data () { return {
    total: 0.0,
    simulationResults: this.simulationResults
    }
  },
  methods: {
    getTotal () {
      
      return this.simulationResults.reduce(((total, item) => {
        return total + (item.yeldValue * item.amount)
      }),0);
    },
    getTotalInvestimento () {
      
      return this.simulationResults.reduce(((total, item) => {
        return total + (item.price * item.amount)
      }),0);
    },
  }

}
</script>

<style lang="css" scoped>
   
    .md-card {
      width: 250px;
      margin: 4px;
      display: inline-block;
      vertical-align: top;
    }
  </style>