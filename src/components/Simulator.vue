<template>
  <div>
    <md-card>
        <md-card-header>
            <div class="md-title">
                    <span class="md-title">Simulador de FIIs</span>
            </div>
        </md-card-header>
        <md-card-content>
            <div class="md-layout-item ">
                <div class="md-layout-item">
                    <Calculator :store="store" />
                </div>
                <div class="md-layout-item">
                    <SimulationResults :simulationResults="store.simulationResults" />
                </div>
            </div>
        </md-card-content>
    </md-card>

    <Footer />
  </div>
</template>

<script>
import Calculator from './Calculator.vue'
import SimulationResults from './SimulationResults.vue'
import Footer from './Footer.vue'
import store from '../model/store'
import SessionStorageManager from '../actions/SessionStorageManager'

const sessionStorageManager = new SessionStorageManager(document.location.href)

export default {
  name: 'Simulator',
  components: {
    Calculator, SimulationResults, Footer
  },
  data () {
    return store
  },
  mounted () {
    this.store.simulationResults = sessionStorageManager.load()
  }
}
</script>
