<template lang="html">
	<div class="moneyDetails">
		<h3 style="min-width:450px">
			财务统计
			<span style="font-size: 14px;">(平台总充值：{{sumCzOrTx.countCz}}元</span>
			<span style="font-size: 14px;">平台总提现：{{sumCzOrTx.countTx}}元)</span>
			
		</h3>
		<form class="form-inline" role="form" style="min-width:650px">
		  <div class="form-group">
		    <label class="sr-only"></label>
		    <input type="radio" name="address" id="WORK" value="WORK" v-model="oper"><span>工作室&nbsp;&nbsp;</span>
		  </div>
		  <div class="form-group">
		    <label class="sr-only"></label>
		    <input type="radio" name="address" id="PHOTO" value="PHOTO" v-model="oper"><span>影楼&nbsp;&nbsp;</span>
		  </div>
		  <div class="form-group">
		    <label class="sr-only"></label>
		    <input type="number" class="form-control"  placeholder="年份"max="9999" min="2015" v-model="year">年
		  </div>
		  <div class="form-group">
		    <label class="sr-only"></label>
		    <input type="number" class="form-control"  placeholder="年份" max="12" min="1" v-model="month">月
		  </div>
		  <div class="form-group">
		    <label class="sr-only"></label>
		    <input type="text" class="form-control" placeholder="用户名称" v-model="photoNickName">
		  </div>
		  <button type="button" class="btn btn-danger" @click="findMoney">搜索</button>
		   <button type="button" class="btn btn-primary" @click="daochu">导出</button> 
		</form>
		<table class="table table-bordered table-hover text-center">
		  <tr>
		  	<th style="min-width:200px">名称</th>
		  	<th style="min-width:200px">本月消费</th>
		  	<th style="min-width:200px">本月充值</th>
		  	<th style="min-width:200px">当前余额</th>
		  	<th style="min-width:200px">对账明细</th>
		  </tr>
		  <tr v-for="moneyData in moneyData.list">
		  	<td>{{oper == 'WORK'?moneyData.workName:moneyData.photoCompanyName}}</td>
		  	<td>{{moneyData.reduceMoney}}元</td>
		  	<td>{{moneyData.addMoney}}元</td>
		  	<td>{{moneyData.currentMoney.toFixed(2)}}元</td>
		  	<td v-if="oper == 'WORK'"><a v-link="{path:'wpDetails?'+oper+'='+moneyData.workId}">查看明细</a></td>
		  	<td v-else><a v-link="{path:'wpDetails?'+oper+'='+moneyData.photoId}">查看明细</a></td>
		  </tr>
		</table>
		<page :turn-page="pageData"></page>
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
			createTime:'',
			pageNo:1,
			year:'',
			month:'',
			photoNickName:'',
			oper:'WORK',
			pageData:{},
			sumCzOrTx:{},
		}),
		created() {
			this.timeWidgit();
			this.findsumCzOrTx();
		},
		ready (){
			
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
			'year':function(val){
				
			},
			'month':function(val,oldval){
				if(!(val<13 && val>0)){
					 Lib.M.topRightInfoTips({
	                    title: "请输入正确的月份"
	                })
				 	this.month = moment().format("YYYY-MM").split('-')[1]
				}
			},
			'oper':function(){
				this.findMoney()
			}
		},
		methods: {
			daochu (){
				var a = document.createElement('a');
				var url = this.host + 'onLinePs/financeLog/exportDbToExcel?createTime='+this.year +'-'+this.month+'-01'+'&fileName=allMoney'
				a.href = url;
				a.target = '_blank';
				a.click();
				window.URL.revokeObjectURL(url); //释放 url 内容
			},
			findsumCzOrTx:function(){
				let url = this.host + 'onLinePs/financeLog/sumCzOrTx';
	            let self = this;
	            let params = {};
	            Lib.M.load(url, params, function(data) {
	            	self.$set('sumCzOrTx',data.data[0])
	            },'get');
			},
			findMoney: function() {
	            let url = this.host + 'onLinePs/financeLog/sumFinance';
	            let self = this;
	            let params = {};
	            params = {
	                createTime: this.year +'-'+this.month+'-01',
	                oper:this.oper,
	                pageNo:this.pageNo ,
	                pageSize: 20,
	            };
	            if(this.oper=='WORK'){
	            	params.workName = this.photoNickName;
	            } else if(this.oper=='PHOTO'){
	            	params.photoCompanyName = this.photoNickName; 
	            }
	            Lib.M.load(url, params, function(data) {
	                if(data.hasOwnProperty('code')) {
	                    
	                } else {
	                    self.$set('moneyData',data.data)
	                    self.$set('pageData',data.data)
	                }
	            },'get');
	        },
			// 时间插件初始化
			timeWidgit: function () {
				let now = moment().format("YYYY-MM");        
				this.year =now.split('-')[0];
				this.month = now.split('-')[1];
				this.findMoney();
			},
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
</style>