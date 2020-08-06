<template>
    <div id="footer">
        <div class="footer-wrapper">
            <span class="md-caption">
                O simulador de FII apenas extrai e agrupa informações de sites que agregam informações sobre o valor de cotação das FIIs e dos rendimentos ao longo de um determinado período; Podendo então apresentar <i>delay</i> dos valores e divergiências.
            </span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
<style scoped>
    #footer{
        padding:10px 0; 
        background-color:#fff;
        text-align: center;
    }
    #footer .footer-wrapper{
        width: 60%;
        padding:15px 0;
        margin:0 auto
    }
    #footer .footer-wrapper span{
        color:#222
    }
</style>