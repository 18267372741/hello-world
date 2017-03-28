<template lang="html">
    <div class="lock-page" v-show="show">
        <h4 :style="hSty"><i class="glyphicon glyphicon-repeat"></i> {{content}}……</h4>
    </div>
</template> 
<script>
    export default{
        data: () => ({
            wH: 0,
            show: false,
            content: '正在下载压缩包，请稍等数秒'
        }),
        ready() {
            this.$set('wH', $(window).height());
            this.hSty();
        },
        events: {
            'parent-lock-page-on' (obj){
                this.$set('show', true);
                this.$set('content', obj);
            },
            'parent-lock-page-off' (obj){
                this.$set('show', false);
            }
        },
        methods: {
            hSty() {
                return {
                    marginTop: this.wH/2+8+'px'
                }
            }
        }
    }
</script>

