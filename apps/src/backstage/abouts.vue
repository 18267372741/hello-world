<template lang="html">
	<div class="help">
		<h3 style="min-width:300px">
			{{helpPaged.name}}
		<a v-link="{path:'/index/aboutsExit'}"><button type="button" class="btn btn-success"  @click="findPage">修改</button></a>
		</h3>
		<div class="row">
		  <div class="col-md-12" v-html="helpPaged.detail"></div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Lib from '../assets/lib'
export default {
	props: {
        
    },
	data: () => ({
		host: Lib.C.hostBackstage,
		helpPaged:{},
	}),
	created() {
		this.findPage();
	},
	components:{
		
	},
	events: {

    },
	ready (){},
	watch: {},
	methods: {
		findPage:function(){
            let url = this.host + 'v1/system/systemPage';
            let self = this;
            let param = {};
            param.id = 20;
            Lib.M.load(url, param, function(data) {
            	self.$set('helpPaged',data.data[0])
            },'get');
		},
	}
}
</script>
<style type="text/css" scoped>

</style>