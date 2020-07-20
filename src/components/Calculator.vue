<template>
  <div>
    <div v-if="loading">
      <md-progress-spinner class="md-accent" :md-diameter="30" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div v-if="edited">
      <p>Com {{simulation.totalInvestiment.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}} investido em <strong>{{simulation.period}}</strong> {{simulation.period > 1? 'meses': 'mês'}} renderá <strong>{{simulation.totalYeld.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}}</strong> em dividendos</p>
    </div>

    <div class="md-layout-item md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label>Código da FI</label>
          <md-input v-model="simulation.fiiCodeSelected" v-on:blur="getFiis"></md-input>
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
export default {
  name: 'Calculator',
  props: [
    'store'
  ],
  data () {
    return {
      loading: false,
      edited: false,
      simulation: this.store.simulationData
    }
  },
  methods: {

    update () {
      this.simulation.totalYeld = (this.simulation.yeldValue * this.simulation.period) * this.simulation.amount
      this.simulation.totalInvestiment = this.simulation.price * this.simulation.amount
    },
    clear () {
      this.simulation.fiiCodeSelected = ''
      this.simulation.price = 0.0
      this.simulation.yeldValue = 0.0
      this.simulation.period = 1
      this.simulation.totalYeld = 0.0
      this.simulation.totalInvestiment = 0.0
      this.simulation.amount = 1,
      this.sumary = {}
    },
    add () {
      console.log('add()', this.edited)
      if (this.edited) {
        const clone = JSON.parse(
          JSON.stringify(this.simulation)
        )
        this.store.simulationResults.push(clone)
        this.clear()
        this.persist(clone)
        this.edited = false
      }
    },
    persist (data) {
      const key = document.location.href
      var currentDataInStore = JSON.parse(localStorage[key])
      currentDataInStore.push(data)
      localStorage[key] = JSON.stringify(currentDataInStore)
    },
    async getFiis () {
      if (this.simulation.fiiCodeSelected.length >= 5) {
        this.loading = true
        const response = await crawler.findStock(this.simulation.fiiCodeSelected.trim())
        this.simulation.sumary = response.data.sumary
        this.simulation.yeldValue = response.data.lastDividend
        this.simulation.price = response.data.value
        this.simulation.totalYeld = 1
        this.simulation.totalYeld = this.simulation.totalYeld * this.simulation.yeldValue
        this.simulation.totalYeld = this.simulation.totalYeld * this.simulation.amount
        this.simulation.totalInvestiment = this.simulation.price * this.simulation.amount
        this.edited = true
        this.loading = false
        console.log(response.data)
      }
    }
  }
}
</script>
