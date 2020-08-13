<template>
    <div v-if="simulationResults && simulationResults.length > 0" class="mobile-table">
        
        <table v-for="(item, index) in simulationResults" :key="index" class="mobile-table">                  
          <tr>
            <td>
              <strong>{{item.fiiCodeSelected.toUpperCase()}}</strong> 
            </td>
            <td>
              {{item.segment}}
            </td>
          </tr>  
          <tr>
            <td>Cotação</td>
            <td>{{item.price.toCurrencyFormat()}}</td>
          </tr>

          <tr>
            <td>Cotas</td>
            <td>{{item.amount}}</td>
          </tr> 
          
          <tr>
            <td>Período</td>
            <td>{{item.period}} {{formatMonth(item)}}</td>
          </tr>

          <tr>
            <td>Último dividendo pago</td>
            <td>{{item.yeldValue.toCurrencyFormat()}}</td>
          </tr>
          <tr>
            <td>Total dividendos <br />no mês</td>
            <td>{{calculateTotalYeld(item).toCurrencyFormat()}}</td>
          </tr>
          <tr>
            <td>Dividendos <br />no mês</td>
            <td>{{calculateTotalYeldAtPeriod(item).toCurrencyFormat()}} </td>
          </tr>
          <tr>
            <td>Total Dividendos <br />no período simulado</td>
            <td>{{calculatePercentageRendiments(item)}}% </td>
          </tr>
          <tr>
            <td>Total<br /> acumulado</td>
            <td>{{calculateTotalInvestiment(item).toCurrencyFormat()}}</td>
          </tr>
    </table>
  </div>
</template>
<script>

import SummaryService from '../services/SummaryService'

export default {
  name: 'SimulationResultMobile',
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

<style scoped>

    @media only screen and (max-width: 600px) {
   
    .simulation-list .mobile-table td{
      padding: 10px 5px;
      font-size: small;
    }
    
    .simulation-list .mobile-table tr >  td:first-child{
      text-align: left;
      padding-left: 15px;
    }
    .simulation-list .mobile-table tr:first-child td{
      background-color: #e7e7e7;
    }

    .simulation-list .mobile-table{
        display: block;
        width: 100%;
        
    }
    .simulation-list .mobile-table table{
      display: table;
      width: 100%;
      padding: 0;
      margin-bottom: 20px;
      border-bottom:solid 2px e7e7e7;
      border-top: solid 1px #e7e7e7
    }
    
  }
  
</style>