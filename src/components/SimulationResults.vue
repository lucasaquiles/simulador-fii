<template>
  <div>
    <Summary :simulationResults="simulationResults" />
    <div class="simulation-list">
      <div  v-for="item in simulationResults" :key="item.fiiCodeSelected">
        <md-card class="md-dark-ligth">
          <md-card-content>
            <div class="content-list">
              <div class="stock-info">
                <Badge :simulationItem="item" />
              </div>
              <div class="wrap-content">
                <div class="md-title">{{item.totalYeld.toCurrencyFormat()}}* em dividendos no período de {{item.period}} {{item.period > 1? 'meses': 'mês'}} </div>
                <div class="md-subheading">{{item.totalInvestiment.toCurrencyFormat()}} ({{item.price.toCurrencyFormat()}} por cota)</div>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div v-if="simulationResults.length > 0">
     <p  class="md-caption">* as informações consideram apenas o último rendimento
      pago de cada FII</p>
    </div>
  </div>
</template>

<script>

import Summary from './Summary.vue'
import Badge from './Badge.vue'

export default {
  name: 'SimulationResults',
  components: {
    Summary, Badge
  },
  props: ['simulationResults'],
  data () {
    console.log("data, ", this.simulationResults)
    return this.simulationResults
  }
}
</script>

<style lang="css" scoped>
  .simulation-list .md-card{
    margin:10px 0
  }
  .content-list{
    display: flex;
    position:relative;
  }
  .content-list .stock-info{
    width: 100px;
    text-align: left;
  }
  .wrap-content .md-title{
    color:#333;
    font-size: 20px;
  }
  .wrap-content .md-subheading{
    color:#777
  }
  .content-list .wrap-content{
    padding-top: 0;
    padding-left: 20px;
    text-align: left;
  }
  .tool{
    position: absolute;
    top: auto;
    right: 0;
    width: 100px;
    height: 50px;
    bottom: auto;
  }
</style>
