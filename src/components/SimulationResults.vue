<template>
    <div>
            
        
            
            <md-card style="padding:10px; width: 508px;">
              <md-card-header>
              <span class="md-title">Resumo</span>   
            </md-card-header>
              <md-card-content>
                <div class="md-layout-item">
                  Dividendos ao mês: <strong>{{getTotal().toCurrencyFormat()}}
                    <spam class="md-caption">({{getPercentageTotal()}}% a.m)</spam></strong>
                </div>
                <div class="md-layout-item">
                  Investimento acumulado: <strong>{{getTotalInvestimento().toCurrencyFormat()}}</strong>
                </div>
              </md-card-content>
              
            </md-card>  
            
            <div>
                <md-card v-for="item in simulationResults" :key="item.fiiCodeSelected" class="md-dark-ligth">
                  
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
          
        <p v-if="simulationResults.length > 0" class="md-caption">* as informações consideram apenas o último rendimento pago de cada FII</p>
    </div>
</template>

<script>

export default {
  name: 'Calculator',
  props: ['simulationResults'],
  data () { return {
    total: 0.0
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
    getPercentageTotal() {
      //
      const percentage = (this.getTotal() / this.getTotalInvestimento()) * 100;
      return percentage.toFixed(2)
    }
  }

}
</script>

<style lang="css" scoped>
   .left{
     text-align: left;
   }
    .md-card {
      width: 250px;
      margin: 4px;
      display: inline-block;
      vertical-align: top;
    }
  </style>