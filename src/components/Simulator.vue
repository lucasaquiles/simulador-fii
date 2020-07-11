<template>
    <md-card>
        <md-card-header>
            <div class="md-title">
                    <span class="md-title">Simulador de FIIs</span></div>
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

</template>

<script>
import Calculator from './Calculator.vue'
import SimulationResults from './SimulationResults.vue'
import store from '../model/store'

export default {
  name: 'Simulator',
  components: {
    Calculator, SimulationResults
  },
  data () {
    return store
  },
  beforeMount () {

    const href = document.location.href
    if (!localStorage[href]) {
      localStorage[href] = JSON.stringify([])
    }

    
  },
  mounted () {
    const href = document.location.href
    if (localStorage[href]) {
        console.log("store")
        this.store.simulationResults = JSON.parse(localStorage[href])
    }
  }
}
</script>
