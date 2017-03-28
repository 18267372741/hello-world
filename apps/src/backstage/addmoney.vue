<template lang="html">
	
	<div class="row" style="min-width:1200px">
    	<div class="col-md-5" style="min-width:450px">
    		<h4>给影楼充值</h4>
    		<form class="form-horizontal" role="form">
			  <div class="form-group">
			    <label class="col-sm-3 control-label">影楼名称：</label>
			    <div class="col-sm-8">
			    	<input type="text" class="form-control" placeholder="输入要充值的影楼名称！" v-model="nickName">
			    </div>
			  </div>
			  	<template v-if="!show">
			  		<table class="table table-bordered table-hover text-center">
					  <tr>
					  	<th class="text-center">名称</th>
					  	<th class="text-center">操作</th>
					  </tr>
					  <tr v-for="yinloudata in yinloudata">
					  	<td>{{yinloudata.companyName}}</td>
					  	<td><button type="button" class="btn btn-primary" @click="findyinlouone(yinloudata.id)">选择</button></td>
					  </tr>
					</table>
					<page :turn-page="page2Data"></page>
			  	</template>
			    <template v-if="show == 'show'">
			  		<p class="text-center">影楼名称：{{yinlouonedata.companyName}}，联系电话：{{yinlouonedata.account}}，余额{{yinlouonedata.money}}元</p>
				    <div class="form-group">
					    <label class="col-sm-3 control-label">充值金额：</label>
					    <div class="col-sm-8">
					    	<input type="number" class="form-control" placeholder="充值金额" v-model="money">
					    </div>
				    </div>
				    <div class="form-group">
					    <label class="col-sm-3 control-label">实际充值金额：</label>
					    <div class="col-sm-8">
					    	<input type="number" class="form-control" placeholder="实际充值金额" v-model="endMoney">
					    </div>
				    </div>
				    <div class="form-group">
					    <label class="col-sm-3 control-label">备注：</label>
					    <div class="col-sm-8">
					    	<input type="text" class="form-control" placeholder="充值原因" v-model="detail">
					    </div>
				    </div>
			    </template>
			  <div class="text-center">
			  	<template v-if="show != 'show'">
			  		<button type="button" class="btn btn-default" @click="findyinlou">查找影楼</button>
			  	</template>
			  	<template v-else>
			  		<button type="button" class="btn btn-default" @click="findyinlou">重新查找</button>
			  		<button type="button" class="btn btn-danger" @click="addprice">充值</button>
			  	</template>
			  </div>
			</form>
    	</div>
	    <div class="col-md-7">
	    	<h4 style="min-width:600px">
	    		全部充值记录
	    		<input type="text" class="form-control time" placeholder="时间"  v-model="time" style="width: 330px;display: initial;">
	    		<button type="button" class="btn btn-sm btn-link">
	    			<a href="http://www.17xiutu.com/onLinePs/financeLog/exportToExcelDetail?fileName=TX&operation=CZ&endTime={{this.time.split(' 至 ')[1]}}&beginTime={{this.time.split(' 至 ')[0]}}" target="_blank">导出</a>
	    		</button>
	    	</h4>
	    	<table class="table table-bordered table-hover text-center">
			  <tr>
			  	<th style="min-width:100px" class="text-center">名称</th>
			  	<th style="min-width:100px" class="text-center">充值金额</th>
			  	<th style="min-width:100px" class="text-center">实际充值金额</th>
			  	<th style="min-width:100px" class="text-center">充值时间</th>
			  	<th style="min-width:100px" class="text-center">余额</th>
			  	<th style="min-width:100px" class="text-center">详情</th>
			  </tr>
			  <tr v-for="moneydata in moneydata">
			  	<td>{{moneydata.photoId!=0?moneydata.photoNickName:moneydata.workNickName}}</td>
			  	<td>{{moneydata.money}}元</td>
			  	<td>{{moneydata.endMoney==0?moneydata.money:moneydata.endMoney}}元</td>
			  	<td>{{moneydata.createTime}}</td>
			  	<td>{{moneydata.curveMoney}}</td>
			  	<td>{{moneydata.detail}}</td>
			  </tr>
			</table>
			<page :turn-page="pageData"></page>
	    </div>
	</div>
	
	
	<div class="moneyDetails">
	</div>	
</template>
<script type="text/javascript">
	import Lib from '../assets/lib'
	import page from '../components/page/pagegai.vue'
	const moment = require('moment')
export default {
	props: {
        
    },
	data: () => ({
		host: Lib.C.hostBackstage,
		moneyData:{},
		pageNo:1,
		pageNo2:1,
		detail:'',
		nickName:'',
		endMoney:1,
		money:1,
		show:true,
		yinloudata:{},
		pageData:{
			type:'one'
		},
		page2Data:{
			type:'two'
		},
		moneydata:{},
		yinlouonedata:{},
		time:moment().subtract(1,'month').format(Lib.C.dateLocale.format)+ ' 至 ' +moment().format(Lib.C.dateLocale.format),
	}),
	created() {
		this.findMoney();
	},
	ready (){
		this.timeWidgit();
	},
	components:{
		page
	},
	events: {
		'child-turn-page'(obj){
			console.log(obj)
			if(obj.type == 'one'){
				this.pageNo = obj.pageNo;
				this.findMoney();
			}else if(obj.type == 'two'){
				this.pageNo2 = obj.pageNo;
				this.findyinlou();
			}
			
		},
    },
	watch: {
		'time':function(val){
			this.findMoney();
		},
		'money':function(val){
			if(val*10%10>0){
				Lib.M.topRightInfoTips({content:'请充值一个整数！'});
				this.$set('money',Math.floor(val));
			}
		},
		'endMoney':function(val){
			if(val*10%10>0){
				Lib.M.topRightInfoTips({content:'请充值一个整数！'});
				this.$set('endMoney',Math.floor(val));
			}
		},
	},
	methods: {
		//给影楼充值
		addprice:function(){
			let url = this.host + 'onLinePs/finance/addPhoto';
            let self = this;
            let params = {};
            if(this.detail == ''){
            	Lib.M.topRightInfoTips({title:"请填写充值原因！"});
            	return false;
            }
            params.detail =this.detail;
            params.endMoney = this.endMoney*1;
            params.money = this.money*1;
            params.photoId = this.yinlouonedata.id*1;
            Lib.M.load(url, JSON.stringify(params), function(data) {
            	if(data.code == -1){
            		self.$set('endMoney',1);
            		self.$set('money',1);
            		self.findyinlouone(self.yinlouonedata.id);
            		self.findMoney();
            		Lib.M.topRightInfoTips({title:"操作成功！"});
            	}else{
            		Lib.M.topRightInfoTips({content:data.message});
            	}
            },'post');
		},
		//查询选择的影楼
		findyinlouone:function(id){
			let url = this.host + 'onLinePs/photoInfo/findPhotoInfo';
            let self = this;
            let params = {};
            params.id = id;
            params.status = 'YES'
            Lib.M.load(url, params, function(data) {
            	if(data.hasOwnProperty('code')){
            		self.$set('show',true);
            		Lib.M.topRightInfoTips({title:'该影楼暂不存在或者是还未通过！'});
            	}else{
            		self.$set('show','show');
            		self.$set('yinlouonedata',data.data.list[0]);
            	}
            },'get');
		},
		//查询影楼是否存在 模糊查询
		findyinlou:function(){
			let url = this.host + 'onLinePs/photoInfo/findPhotoInfo';
            let self = this;
            let params = {};
            params.companyName = this.nickName;
            params.status = 'YES';
            params.pageNo = this.pageNo2;
            params.pageSize = 6;
            Lib.M.load(url, params, function(data) {
            	if(data.hasOwnProperty('code')){
            		self.$set('show',true);
            		Lib.M.topRightInfoTips({title:'该影楼暂不存在或者是还未通过！'});
            	}else{
            		self.$set('show',false);
            		self.$set('yinloudata',data.data.list);
            		self.page2Data = data.data
            		self.page2Data.type = 'two';
            		self.$set('page2Data',self.page2Data)
            	}
            },'get');
		},
		//查询充值记录
		findMoney: function() {
            let url = this.host + 'onLinePs/financeLog/findFinanceLog';
            let self = this;
            let params = {};
            params = {
            	beginTime:this.time.split(' 至 ')[0],
            	endTime:this.time.split(' 至 ')[1],
            	operation:'CZ',
                pageNo:this.pageNo ,
                pageSize: 13,
            };
            Lib.M.load(url, params, function(data) {
                if(data.hasOwnProperty('code')) {
                    
                } else {
                	self.$set('moneydata',data.data.list);
                	self.pageData = data.data
            		self.pageData.type = 'one';
                	self.$set('pageData',self.pageData);
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
		},
	}
}
	
</script>
<style type="text/css" scoped>

</style>