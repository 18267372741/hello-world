<template lang="html">
	<div class="moneyDetails">
		<h3 style="min-width:800px">财务统计详情</h3>
		<form class="form-inline" role="form" style="min-width:800px">
		  <div class="form-group">
		    <label class="sr-only"></label>
		    <input type="text" class="form-control time" placeholder="时间"  v-model="time">
		  </div>
		  <button type="button" class="btn btn-danger" @click="findMoney">搜索</button>
		  <button type="button" class="btn btn-primary" @click="daochu">导出</button>
		</form>
		<table class="table table-bordered table-hover text-center table-striped">
		  <tr>
		  	<th style="min-width:200px">编号</th>
		  	<th style="min-width:200px">消费名称</th>
		  	<th style="min-width:200px">创建时间</th>
		  	<th style="min-width:200px">操作类型</th>
		  	<th style="min-width:200px">金额</th>
		  	<!--<th style="min-width:200px">余额</th>-->
		  </tr>
		  <tr v-for="moneyData in moneyData.list">
		  	<template v-if="!show">
		  		<td>{{$index+1}}</td>
			  	<td>{{moneyData.detail}}</td>
			  	<td>{{moneyData.createTime}}</td>
			  	<td>
			  		<template v-if="moneyData.operation == 'XT'"> 修图 </template>
			  		<template v-if="moneyData.operation == 'SJ'"> 设计 </template>
			  		<template v-if="moneyData.operation == 'CZ'"> 充值 </template>
			  		<template v-if="moneyData.operation == 'TX'"> 提现 </template>
			  		<template v-if="moneyData.operation == 'CF'"> 处罚 </template>
			  		<template v-if="moneyData.operation == 'TD'"> 退单 </template>
			  		<template v-if="moneyData.operation == 'NONE'"> 提成 </template>
			  	</td>
			  	<td><template v-if="moneyData.type == 'REDUCE'">消费</template> <template v-if="moneyData.type == 'ADD'">增加</template>{{moneyData.money}}&nbsp;元</td>
			  	<!--<td>{{moneyData.currentMoney.toFixed(2)}}元</td>-->
		  	</template>

		  </tr>
		</table>
		<div v-if="show">
	  	没有数据！
	  </div>
	  <page :turn-page="pageData"></page>
	</div>
</template>
<script type="text/javascript">
	import page from '../components/page/pagegai.vue'
	import Lib from '../assets/lib'
	require('daterangepicker')
	require('daterangepicker.css')
	const moment = require('moment')
export default {
	props: {

    },
	data: () => ({
		host: Lib.C.hostBackstage,
		addrUrl:Lib.M.getUrlParams(),
		moneyData:{},
		createTime:'',
		pageNo:1,
		time: moment().subtract(1,'month').format(Lib.C.dateLocale.format)+ ' 至 ' +moment().format(Lib.C.dateLocale.format),
		show:false,
		pageData:{},
	}),
	created() {

	},
	ready (){
		this.timeWidgit()
	},
	components:{
		page
	},
	events: {
		'child-turn-page'(obj){
			this.pageNo = obj.pageNo;
			this.findMoney();
		},
    },
	watch: {

	},
	methods: {
		daochu (){
			if(this.addrUrl.photo){
				var photowork = 'photoId='+this.addrUrl.photo
			}else{
				var photowork = 'workId='+this.addrUrl.work
			}
			var a = document.createElement('a');
			var url = this.host + 'onLinePs/financeLog/exportToExcelDetail?fileName=财务详情&'+photowork+'&beginTime=' +this.time.split(' 至 ')[0]+'&endTime='+this.time.split(' 至 ')[1]
			a.href = url;
			a.target = '_blank';
			a.click();
			window.URL.revokeObjectURL(url); //释放 url 内容
		},
		findMoney: function() {
            let url = this.host + 'onLinePs/financeLog/findFinanceLog';
            let self = this;
            let params = {};
            params = {
                beginTime: this.time.split(' 至 ')[0],
                endTime: this.time.split(' 至 ')[1],
                pageNo: this.pageNo ,
                pageSize: 15,
                photoId: this.addrUrl.hasOwnProperty('photo')?this.addrUrl.photo:'',
                workId: this.addrUrl.hasOwnProperty('work')?this.addrUrl.work:''
            };
            Lib.M.load(url, params, function(data) {
                if(data.hasOwnProperty('code')) {
                    self.show = true;
                } else {
                	self.show = false;
                    self.$set( 'moneyData',data.data )
                    self.$set( 'pageData',data.data )
                }
            },'get');
        },
		// 时间插件初始化
		timeWidgit: function () {
			let locale = Lib.C.dateLocale;
			let tmp = locale.format;
			let startDate = moment().subtract(1,'month').format(tmp);
			let endDate = moment().format(tmp);
			this.$set('time', startDate + ' 至 ' + endDate);
			$('.time').daterangepicker({
				timePicker: true,
				timePicker24Hour: true,
				locale: locale
			});
			this.findMoney();
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
.form-inline .time{
    width: 320px;
}
</style>