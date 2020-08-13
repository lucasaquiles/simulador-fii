<template>
  <div>
    <Summary :simulationResults="simulationResults" />
    <Toolbar :simulationResults="simulationResults" />
    <div class="simulation-list">
      <div>
        <md-card class="md-dark-ligth">

          <SimulationResultMobile :simulationResults="simulationResults" />
          
          <table v-if="simulationResults && simulationResults.length > 0" >
            <tr>
              <th>Ativo</th>
              <th>Segmento</th>
              <th>Cotação</th>
              <th>Cotas</th>
              <th>Período</th>
              <th>Último dividendo pago</th>
              <th>Total dividendos <br />no mês</th>
              <th>Dividendos <br /> (mediana 12 meses)</th>
              <th>Total Dividendos <br />no período simulado</th>
              <th>Rentabilidade%</th>
              <th>Total<br /> acumulado</th>
            </tr>
            <tr v-for="(item, index) in simulationResults" :key="index">
              <td>{{item.fiiCodeSelected.toUpperCase()}}</td>
              <td>{{item.segment}}</td>
              <td>{{item.price.toCurrencyFormat()}}</td>
              <td>{{item.amount}}</td>
              <td>{{item.period}} {{formatMonth(item)}}</td>
              <td>{{item.yeldValue.toCurrencyFormat()}}</td>
              <td>{{calculateTotalYeld(item).toCurrencyFormat()}}</td>
              <td>{{parseFloat(item.sumary.median).toCurrencyFormat()}}</td>
              <td>{{calculateTotalYeldAtPeriod(item).toCurrencyFormat()}} </td>
              <td>{{calculatePercentageRendiments(item)}}% </td>
              <td>{{calculateTotalInvestiment(item).toCurrencyFormat()}} </td>
            </tr>
          </table>
        </md-card> 
      </div>
    </div>
    <div v-if="simulationResults.length > 0">
      <span  class="md-caption">* a coluna <strong>Dividendos período simulado</strong> considera a mediana de dividendos pagos nos ultimos 12 meses</span> 
      <br />
      <span  class="md-caption">* as informações consideram apenas o último rendimento
      pago de cada FII</span>
    </div>
  </div>
</template>

<script>

import SimulationResultMobile from './SimulationResultMobile.vue'
import Summary from './Summary.vue'
import Badge from './Badge.vue'
import Toolbar from './Toolbar.vue'
import SummaryService from '../services/SummaryService'

export default {
  name: 'SimulationResults',
  components: {
    Summary, Badge, Toolbar,SimulationResultMobile
  },
  props: ['simulationResults'],
  methods: {
    formatMonth(item) {
      return item.period > 1 ? 'meses' : 'mês'
    },
    calculateTotalYeld(item) {
      return SummaryService.calculateTotalYeld(item)
    },
    calculateTotalYeldAtPeriod(item) {
      return SummaryService.calculateTotalYeldAtPeriod(item)
    },
    calculatePercentageRendiments(item) {
      return SummaryService.calculatePercentageRendiments(item)
    },
    calculateTotalInvestiment(item) {
      return SummaryService.calculateTotalInvestiment(item)
    },
    toggle(event) {
      if(event) { 
        console.log(event.target.classList.toggle("fa-eye-slash"))
        event.target.parentElement.parentElement.parentElement.nextElementSibling.classList.toggle("slideDown")
      }
    }
  }
}
</script>

<style lang="css" scoped>
  @media only screen and (max-width: 600px) { 
    .simulation-list table{
      display: none; 
    }
  }
  .mobile-table {
    display: none;
  }
  .slideDown{
    transition: all .5s ease-in-out;
    height: 0;

    display: none;
  }
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
    width: 100%;
    padding-top: 0;
    padding-left: 20px;
    text-align: left;
  }
 
  .simulation-list table{
    width: 100%;
    margin-top:10px;
    border-collapse: collapse;
  }
  
  .simulation-list table tr{
    border-bottom:solid 1px #e7e7e7;
    cursor: pointer;
  }
  .simulation-list table tr:hover{
    background-color: #efefef;
    color:#555
  }
  .simulation-list table tr td, .simulation-list table tr th{
    padding:5px;
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
