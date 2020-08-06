<template>
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div class="badge-wrapper">
            <div class="md-headline"> 
              {{simulationItem.fiiCodeSelected.toUpperCase()}}  
              <span class="md-caption">{{simulationItem.segment}}</span>
            </div>
            <div class="md-caption">({{simulationItem.price.toCurrencyFormat()}}) </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Badge',
  props: [
    'simulationItem'
  ],
  data () {
    return this.simulationItem
  }
}
</script>
<style type="css" scoped>
  .md-headline{
    color:#4F86C6
  }
  
  .badge-wrapper div{
    margin: 0 0 10px 0
  }
</style>
