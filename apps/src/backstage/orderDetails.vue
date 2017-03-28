<template lang="html">
	<div class="moneyDetails">
		<h3>订单操作详情</h3>
		<table class="table table-bordered table-hover text-center">
		  <tr>
		  	<th style="min-width:200px">时间</th>
		  	<th style="min-width:200px">步骤</th>
		  	<th style="min-width:200px">操作人</th>
		  </tr>
		  <tr v-for="moneyData in moneyData">
		  	<template v-if="!show">
			  	<td>{{moneyData.createTime}}</td>
			  	<td>{{moneyData.details}} <template v-if="moneyData.workNickName"> ->{{moneyData.workNickName}} </template> </td>
			  	<td>{{moneyData.workName}} </td>
		  	</template>
		  	
		  </tr>
		</table>
		<div v-if="show">
	  	没有数据！
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
		addrUrl:Lib.M.getUrlParams(),
		moneyData:{},
		createTime:'',
		pageNo:1,
		time:'',
		show:false
	}),
	created() {
		this.findMoney()
	},
	ready (){
//		this.timeWidgit()
	},
	watch: {
		
	},
	methods: {
		findMoney: function() {
            let url = this.host + 'onLinePs/orderInfo/findRecord/'+this.addrUrl.orderid;
            let self = this;
            let params = {};
            Lib.M.load(url, params, function(data) {
                if(data.hasOwnProperty('code')) {
                    self.show = true;
                    Lib.M.topRightInfoTips({title:data.message})
                } else {
                	self.show = false;
                    self.$set('moneyData',data.data)
                }
            },'get');
        }
	}
}
	
</script>
<style type="text/css" scoped>
.form-inline{
	margin-bottom: 10px;
}
tr th{
	text-align: center;
}
.time{
    width: 320px;
}
.table{
    max-width: 900px;
    margin:75px auto;
}
</style>