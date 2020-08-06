<template>
	<div v-if="simulationResults.length > 0" class="md-layout-item md-body-2" style="padding-top: 10px; padding-bottom: 10px; text-align: right;">  
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<button v-if="storageEnabled" title="Limpar do browser" v-on:click="clearSimulation()">
			<md-icon class="fa fa-trash"></md-icon>
		</button>
	</div>
</template>

<script>

import ToolbarActions from '../actions/ToolbarActions'
const toolbarAction = new ToolbarActions()

export default {
	name: 'Toolbar',
	props: ['simulationResults'],
	data() {
		return {
			storageEnabled: false
		}
	},
	beforeMount () {
		this.storageEnabled = toolbarAction.storageWasCreated()
	},
	methods: {
		clearSimulation() {
			toolbarAction.clearSimulation()
		}
  }
}
</script>

<style type="css" scoped>
button{
background-color: #fff;
border:solid 1px #ccc;
border-radius: 5px;
cursor: pointer;}
</style>
