<template lang="html">
    <div @click="aaa" style="color:white;position: absolute;top: 0;color: white; z-index: 1000;">asdasdas</div>
</template>
<script>
    export default {
        props: {
            tongXun: Number
        },
        data: function(){
           return {
                page: {
                    pageCount: 1,
                    pageNo: 1
                }
            }
        },
        watch: {
            'tongXun' (obj){
                // console.log(obj);
                this.aaa();
            }
        },
        ready: function(){ },
        methods: {
            aaa (){
                console.log("www");
                this.$dispatch('parent-msg',true)
            }
        }
    }
</script>