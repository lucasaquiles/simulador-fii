<template>
    <div>
    
            <div class="md-primary">
                <md-card v-for="item in simulationResults" :key="item.fiiCodeSelected" md-theme="green-card">
                  
                  <md-card-header>
                    <div class="md-title">{{item.fiiCodeSelected}}</div>
                    <div class="md-subhead">
                        {{item.totalInvestiment.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}}
                        <span>({{item.price.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}} por cota)</span>
                    </div>
                  </md-card-header>
                  <md-card-expand>     
                      <md-card-content>
                       {{item.totalYeld.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}}* em dividendos por {{item.period}} meses
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
  data () {
    return this.simulationResults
  }
}
</script>
