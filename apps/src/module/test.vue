<template lang="html">
    <div class="row">
        <h1 class="text-center">插件以应用示例</h1>
        <h4>1.lockPage 的调用方法</h4>
        <div>
            <p>
                说明：lockPage 是加在全局的，可以直接调用，通过传数据给子组件
            </p>
            <lock-page></lock-page>
            <button type="button" class="btn btn-info btn-sm" @click="lockPageFn">lockPage</button>
        </div>
        <h4>2.daterangepicker 的调用方法</h4>
        <div>
            <p>
                说明：～～～～～
            </p>
        </div>
        <h4>3.moment 的调用方法</h4>
        <div>
            <p>
                说明：～～～～～
            </p>
        </div>
        <h4>4.qr-code 的调用方法</h4>
        <div>
            <p>
                说明：～～～～～
            </p>
        </div>
        <h4>5.ueditor 的调用方法</h4>
        <div>
            <p>
                说明：～～～～～
            </p>
        </div>
        <h4>6.qiniu 的调用方法</h4>
        <div>
            <p>
                说明：～～～～～
            </p>
        </div>
        <h4>7.翻页 的调用方法</h4>
        <div>
            <p>
                说明：～～～～～
            </p>
        </div>
        <h4>8.table 的调用方法【还未做】</h4>
        <div>
            <p>
                说明：～～～～～
            </p>
        </div>
        <h4>9.删除modal </h4>
        <div>
            <p>
                说明：～～～～～
            </p>
        </div>
    </div>
</template>
<script>
	import Lib from '../assets/lib'
    export default{
        methods: {
            lockPageFn (){
                Lib.M.lockPage(this, {show: true});
            }
        }
    }
</script>
<style scoped>
    .row{
        width: 90%;
        margin: auto;
    }
</style>