<template>
  <div>
    <div v-if="loading">
      <md-progress-spinner class="md-accent" :md-diameter="30" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div v-if="edited">
      <p>Com {{simulation.totalInvestiment.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}} investido em <strong>{{simulation.period}}</strong> {{simulation.period > 1? 'meses': 'mês'}} renderá <strong>{{simulation.totalYeld.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}}</strong> em dividendos</p>
    </div>
    <div v-if="hasValidationErrors">
        {{messageValidations}}
    </div>
    <div v-if="errorMessage.length > 0">
      {{errorMessage}}
    </div>
    <div class="md-layout-item md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label>Código da FI</label>
          <md-input v-model="simulation.fiiCodeSelected" v-on:blur="getFiis" v-on:keyup="validationKeyPress"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-field>
          <label>Tempo de aplicação (meses)</label>
          <md-input v-model="simulation.period" v-on:keyup="update"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-field>
          <label>Quantidade</label>
          <md-input v-model="simulation.amount" v-on:keyup="update"></md-input>
        </md-field>
      </div>
    </div>
    <md-button class="md-raised md-primary" v-if="!edited" disabled>Adicionar </md-button>
    <md-button class="md-raised md-primary" v-on:click="add()" v-if="edited">Adicionar</md-button>
  </div>
</template>
<script>
import crawler from '../services/Crawler'
import CalculatorAction from '../actions/CalculatorAction'
const calculatorAction = new CalculatorAction()

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
      this.simulation.period = 0
      this.simulation.totalYeld = 0.0
      this.simulation.totalInvestiment = 0.0
      this.simulation.amount = 0,
      this.sumary = {}
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
    persist (data) {
      calculatorAction.save(data)
    },
    createDateSimulation() {
      const date = new Date()
      const dateFormat = new Intl.DateTimeFormat('pt', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit'
      })
      return dateFormat.format(date)
    },
    validate(simulation) {
        const FII_SELECTED = {
          validate(data){
            return data.fiiCodeSelected.length >= 5
          },
          message: "você precisa informar uma FII"
        }
        const AMOUNT = {
          validate(data) {
              return data.amount > 0
          },
          message: "você precisa informar a quantidade de ações"
        }

        const VALID_PERIOD = {
          validate(data) {
              return data.period > 0
          },
          message: "você precisa informar um período válido"
        }

        const validations = Object.seal({FII_SELECTED,AMOUNT,VALID_PERIOD})

        const messageValiations =  Object.values(validations).filter((validation) => !validation.validate(simulation))
        .map((validation) => validation.message)
        .flat()

        return Object.seal({
          hasErrors: (messageValiations.length > 0),
          messages: messageValiations,
        })
    },
    parseResponse(responseData) {
      this.simulation.sumary = responseData.sumary
      this.simulation.yeldValue = responseData.lastDividend
      this.simulation.price = responseData.value
      this.simulation.segment = responseData.fiiType
      this.simulation.totalYeld = 1
      this.simulation.totalYeld = this.simulation.totalYeld * this.simulation.yeldValue
      this.simulation.totalYeld = this.simulation.totalYeld * this.simulation.amount
      this.simulation.totalInvestiment = this.simulation.price * this.simulation.amount
      this.simulation.createdAt = this.createDateSimulation()
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
          
          this.parseResponse(response.data)
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
