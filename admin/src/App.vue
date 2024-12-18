<template>
   
    <Index />
    
</template>
    
<script lang='ts' setup name=''>
    import Index from '@/pages/index.vue';  
    import { ref } from 'vue'
    const isLoggedIn = ref(false)
</script>
    
<style>
    *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    /* 动画定义 */
    /* 开锁 */
    @keyframes lockPop {
        100%{
            top:-65px;
            border: 12px solid #01dde8;
        }
    }
    @keyframes ringOpen {
        100%{
            top:-20px;
        }
    }
    @keyframes lockOpen {
        100%{
            background-color:  #01dde8;
        }
    }
    /* 关锁 */
    @keyframes lockDown {
        100%{
            top:-60px;
            border: 12px solid var(--lock-color);
        }
    }
    @keyframes ringClose {
        100%{
            top:0%;
        }
    }
    @keyframes lockClose {
        100%{
            background-color:  var(--lock-color);
        }
    }
</style>