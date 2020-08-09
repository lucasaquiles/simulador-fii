<template>
  <div>
    <div v-if="loading">
      <md-progress-spinner class="md-accent" :md-diameter="30" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div v-if="edited">
      <p>Com {{simulation.totalInvestiment.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}} investido em <strong>{{simulation.period}}</strong> {{simulation.period > 1? 'meses': 'mês'}} renderá <strong>{{simulation.totalYeld.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}}</strong> em dividendos</p>
    </div>
    <div v-if="hasValidationErrors">
        <ul class="validation-wrapper">
          <li v-for="(error, index) in messageValidations" :key="index">{{error.content}}</li>
        </ul>
    </div>
    <div v-if="errorMessage.length > 0">
      {{errorMessage}}
    </div>
    <div class="md-layout-item md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label>Código da FII</label>
          <md-input v-model="simulation.fiiCodeSelected" v-on:blur="getFiis" ></md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        
        <md-field>
          <label>Tempo de aplicação (meses)</label>
          <md-input v-model="simulation.period" v-on:keyup="update" ></md-input>
        </md-field>

      </div>
      <div class="md-layout-item">
        <md-field>
          <label>Quantidade</label>
          <md-input v-model="simulation.amount" v-on:keyup="update"></md-input>
        </md-field>
      </div>
    </div>
    <md-button class="md-raised md-primary" v-if="!edited" disabled>Adicionar</md-button>
    <md-button class="md-raised md-primary" v-on:click="add()" v-if="edited">Adicionar</md-button>
  </div>
</template>
<script>

import crawler from '../services/Crawler'
import CalculatorAction from '../actions/CalculatorAction'
import CalculatorActionValidator from '../actions/CalculatorActionValidator'
const calculatorAction = new CalculatorAction()
const calculatorActionValidator = new CalculatorActionValidator()

export default {
  name: 'Calculator',
  props: [
    'store'
  ],
  data () {
    return {
      errorMessage: '',
      loading: false,
      edited: false,
      hasValidationErrors: false,
      messageValidations: [],
      simulation: this.store.simulationData
    }
  },
  methods: {
    validationKeyPress() {
      this.edited = false
      const validationResult = this.validate(this.simulation)
      this.hasValidationErrors = validationResult.hasErrors
      this.messageValidations = validationResult.messages
    },
    update () {
      const validationResult = this.validate(this.simulation)
      this.hasValidationErrors = validationResult.hasErrors
      this.messageValidations = validationResult.messages
      this.edited = !this.hasValidationErrors
      this.simulation.totalYeld = (this.simulation.yeldValue * this.simulation.period) * this.simulation.amount
      this.simulation.totalInvestiment = this.simulation.price * this.simulation.amount
    },
    clear () {
      this.errorMessage = ''
      this.simulation.fiiCodeSelected = ''
      this.simulation.price = 0.0
      this.simulation.yeldValue = 0.0
      this.simulation.period = 1
      this.simulation.totalYeld = 0.0
      this.simulation.totalInvestiment = 0.0
      this.simulation.amount = 1,
      this.simulation.sumary = {}
    },
    add () {
      console.log('add()', this.edited)
      if (this.edited) {

        const clone = JSON.parse(
          JSON.stringify(this.simulation)
        )
        
        const findedItem = this.store.simulationResults.filter((itemFilter) => { 
          return itemFilter.fiiCodeSelected == clone.fiiCodeSelected 
        }).map((findedItem, index) => {
          findedItem.amount = parseInt(findedItem.amount) + parseInt(clone.amount)
          findedItem.period = parseInt(findedItem.period) + parseInt(clone.period)
          return findedItem
        })
        
        if(findedItem && findedItem.length > 0) {
            const item = findedItem[0]
            this.updateIndexValue(this.store.simulationResults, item)
            this.persist(item)
        }else{
          this.store.simulationResults.push(clone)
          this.persist(clone)
        }

        this.clear()        
        this.edited = false
      }
    },
    updateIndexValue(array, item) {
      const index = array.findIndex((find) => { 
        return find.fiiCodeSelected == item.fiiCodeSelected 
      })
      array[index] = item
    },
    persist (simulation) {
      calculatorAction.save(simulation)
    },
    validate(simulation) {
        return calculatorActionValidator.validate(simulation)
    },
    async getFiis () {

      this.errorMessage = ''
      this.edited = false
      
      const validationResult = this.validate(this.simulation)
      this.hasValidationErrors = validationResult.hasErrors
      this.messageValidations = validationResult.messages
      
      if(!validationResult.hasErrors) {
        this.loading = true
        const response = await crawler.findStock(this.simulation.fiiCodeSelected.trim())
        if(response.status == 200){
          this.simulation = calculatorAction.toSimulationData(this.simulation, response.data)
          this.edited = true
        }else{
          this.errorMessage = response.status
        }
      }
      this.loading = false
    }
  }
}
</script>
<style lang="css" scoped>
  .validation-wrapper{
    display: block;
    margin-bottom: 50px;
    background-color:#ff8585;
    display: block;
    border:solid 1px #c00;
    padding:10px 5px;
  }
  .validation-wrapper li{
    list-style: none;

  }
</style>
