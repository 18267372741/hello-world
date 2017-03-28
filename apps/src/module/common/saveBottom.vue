<template lang="html">
    <div class="save-bottom">
        <button type="button" class="btn btn-info margin-right-10" @click="saveFn">保存</button>
        <a v-link="{path: options&&options.returnURL}" class="btn btn-warning">返回</a>
    </div>
</template>
<script>
    import Lib from '../../assets/lib'
    import '../../assets/jquery-validation/jquery.validate.min'

    export default{
        props: {
            options: Object
        },
        methods: {
            saveFn (){
                this.$dispatch('child-save-bottom-data', {type: 'save'});
            }
        }
    }
</script>
<style lang="less">
    .save-bottom {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.37);
        padding: 20px 0;
        left: 0;
        z-index: 9;
        text-align: center;
    }
</style>