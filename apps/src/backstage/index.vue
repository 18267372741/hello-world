<template lang="html">
	<b-top></b-top>
    <div class="content">
        <router-view></router-view>
    </div>
    <b-sidebar></b-sidebar>
</template>
<script>
	import icon from '../assets/icon.css'
	import bTop from './bTop.vue'
    export default {
	components:{
		bTop
	},
    }
</script>
<style type="text/css">
.content{
	margin-left: 220px;
    padding: 50px;
}
</style>