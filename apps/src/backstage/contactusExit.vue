<template lang="html">
	<div class="help" style="width: 920px;">
		<h3 style="min-width:300px">联系我们内容</h3>
		<div>
            <rich-text :option.sync="option"></rich-text>
        </div>
        <div style="position: fixed; text-align: center; left: 0; right: 0; bottom: 0; background: #86b975; z-index: 1000; padding: 15px;">
        	<button type="button" class="btn btn-primary" @click="exitPage">确认修改</button>
        </div>
	</div>
</template>
<script type="text/javascript">
	import Lib from '../assets/lib'
	import richText from '../components/richTextComponents.vue'
export default {
	props: {
        
    },
	data: () => ({
		host: Lib.C.hostBackstage,
		domain:Lib.C.qiniu.jsUrl,
        details:'',
	}),
	created() {
		this.findPage();
	},
	components:{
		richText,
	},
	events: {
		'child-rich-text-data': function (content) {
            this.$set("details", content)
        },
    },
	ready (){
		
	},
	watch: {},
	methods: {
		findPage:function(){
            let url = this.host + 'v1/system/systemPage';
            let self = this;
            let param = {};
            param.id = 19;
            Lib.M.load(url, param, function(data) {
            	self.$broadcast('parent-rich-text-data', data.data[0].detail);
            },'get');
		},
		exitPage:function(){
			let url = this.host + 'v1/system/systemPage';
            let self = this;
            let param = {};
            param.id = 19;
            param.detail = this.details;
            Lib.M.load(url, JSON.stringify(param), function(data) {
            	if(data.code == -1){
            		window.location.href = '#/index/contactus'
            		Lib.M.topRightInfoTips({title: data.message})
            	}else{
            		Lib.M.topRightInfoTips({title: data.message})
            	}
            },'put');
		},
	}
}
</script>
<style type="text/css" scoped>

</style>