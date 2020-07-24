<template>
  <div>
    <Summary :simulationResults="simulationResults" />
    <Toolbar :simulationResults="simulationResults" />
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
                <div class="md-subheading">
                  <span class="md-caption">{{item.totalInvestiment.toCurrencyFormat()}} ({{item.amount}} cota{{item.amount>1?'s':''}})</span>
                </div>
                <div>
                  <span v-if="item.sumary != null" class="md-caption">Mediana de dividendos dos últimos 12 meses: <strong>{{item.sumary.median}} </strong></span>
                  
                  <div style="float:right">
                    <a title="Limpar do browser" href="#" v-on:click.prevent="toggle($event, item)">
                      <md-icon class="fa fa-eye"></md-icon>
                    </a>
                  </div>
                </div>
                <div class="table-wrapper" id="">
                <table>
                    <tr>
                      <th>Data de referência</th>
                      <th>Data de pagamento</th>
                      <th>Cotação</th>
                      <th>Yeld</th>
                      <th>Dividendo</th>
                    </tr>
                    <tr v-for="(sumaryItem, index) in item.sumary.dividendLast12Months">
                        <td>{{sumaryItem.base}}</td>
                        <td>{{sumaryItem.paymentDate}}</td>
                        <td>{{sumaryItem.stockValue.toCurrencyFormat()}}</td>
                        <td>{{sumaryItem.yeldPercentage}}%</td>
                        <td>{{sumaryItem.rendimento.toCurrencyFormat()}}</td>
                    </tr>
                </table>
                </div>
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
import Toolbar from './Toolbar.vue'

export default {
  name: 'SimulationResults',
  components: {
    Summary, Badge, Toolbar
  },
  props: ['simulationResults'],
  data () {
    // return this.simulationResults
  },
  methods: {
    toggle(event) {
      // console.log(event);
      
      if(event) {
        console.log(event.target.classList.toggle("fa-eye-slash"))
        event.target.parentElement.parentElement.parentElement.nextElementSibling.classList.toggle("slideDown")
      }

    }
  }
}
</script>

<style lang="css" scoped>
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
  .content-list .wrap-content table{
    width:100%;
    margin-top:10px;
    border-collapse: collapse;
  }
  .content-list .wrap-content table tr{
    border-bottom:solid 1px #e7e7e7;
    cursor: pointer;
  }
  .content-list .wrap-content table tr:hover{
    background-color: #efefef;
    color:#555
  }
  .content-list .wrap-content table tr td, .content-list .wrap-content table tr th{
    padding:5px
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
