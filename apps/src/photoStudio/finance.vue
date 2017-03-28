<template lang="html">
	<div class="row worksList clearfix">
		<div class="no-padding">
			<form class="form-horizontal col-sm-12">
				<div class="caiwu col-sm-12 control-label" style="min-width:1200px">
					<div>
						<label class="control-label nicheng">工作室昵称</label>
						<div class="col-sm-2 shuruNC">
							<input v-model="finance.workNickName" type="text" class="form-control">
						</div>
					</div>
					
					<div>
						<label class="control-label shijian">时间</label>
						<div class="col-sm-3 shuruNC">
							<input v-model="finance.time" type="text" class="form-control timer" placeholder="时间">
						</div>
						<!--<span style="display: inline-block;color: green;line-height: 35px;">近一月</span>-->
					</div>
					<div>
						<label class="control-label leixing">操作类型</label>
						<div class="col-sm-2">
							<select v-model="finance.financeType" class="form-control shuruXZ">
								<option selected value="">全部</option>
								<option value="XT">修图</option>
								<option value="SJ">设计</option>
								<option value="CZ">充值</option>
								<option value="TX">提现</option>
								<option value="CF">处罚</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-12 daoshou">
					<button type="button" @click="findFinanceLogs($event,'sousuo')" class="btn btn-primary btn-sm" style="background:#275482"> 
						搜索
					</button>
					<button @click="daochu" type="button" class="btn btn-default btn-sm">
						导出
					</button>
				</div>
			</form>
		</div>
		<div class="col-sm-12" style="min-height: 592px;background:white">
			<table class="table table-condensedn table-hover table-bordered">
				<thead>
					<tr>		
						<th style="min-width:230px">工作室</th>
						<th style="min-width:150px">订单标题</th>
						<th style="min-width:150px">交易时间</th>
						<th style="min-width:150px">操作类型</th>
						<th style="min-width:150px">金额</th>
						<th style="min-width:150px">类型</th>
						<th style="min-width:190px">单号</th>
					</tr>
				</thead>
				<tbody style="background:white">
					<tr v-for="findFinanceLog in findFinanceLog">
						<td>{{findFinanceLog.nickName}}</td>
						<td>{{findFinanceLog.title}}</td>
						<td>{{findFinanceLog.createTime}}</td>
						<td v-if="findFinanceLog.operation=='XT'">修图</td>
						<td v-if="findFinanceLog.operation=='SJ'">设计</td>
						<td v-if="findFinanceLog.operation=='CZ'">充值</td>
						<td v-if="findFinanceLog.operation=='TX'">提现</td>
						<td v-if="findFinanceLog.operation=='CF'">处罚</td>
						<td v-if="findFinanceLog.operation=='TD'">退单</td>
						<td v-if="findFinanceLog.operation=='CD'">撤单</td>
						<td>{{findFinanceLog.money}}</td>
						<td>{{findFinanceLog.type=="ADD"?"收入":"支出"}}</td>
						<td>{{findFinanceLog.code}}</td>
					</tr>
				</tbody>
			</table>
			<p v-if="!findFinanceLog.length" style="font-size: 24px;margin-bottom: 211px;text-align: center;">
				暂无信息
			</p>
			
		</div>
		<page :turn-page="shouzhi"></page>
		<!-- Modal -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-body">
						确定删除吗？
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">
							取消
						</button>
						<button @click="" type="button" class="btn btn-primary" data-dismiss="modal">
							确定
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Lib from '../assets/lib.js'
	import page from '../components/page/page.vue'
	const moment =require('moment')
	require('daterangepicker.js')
	require('daterangepicker.css')
	export default {
		data: () => ({
			id: sessionStorage.getItem("id"),
			host: Lib.C.hostPhotoStudio,
			pageNo:1,
			shouzhi:{},
			postParam:{},
			finance:{
				"workNickName":""
			},
			findFinanceLog:[]
		}),
		events: {
	        'child-turn-page' (obj){
	            this.$set('pageNo', obj.pageNo);
	            this.findFinanceLogs();
	        }
	    },
		watch: {},
		created: function () {
			this.timeWidgit();
			this.findFinanceLogs();
		},
		ready: function () {
			this.timeWidgit();
		},
		methods: {
			daochu (){
				console.log(this.finance.time.split(" 至 ")[1]);
				var a = document.createElement('a');
				var url = this.host + 'v1/finance/excel?photoInfoId='+this.id+'&startTime='+(this.finance.time.split(" 至 ")[0])+'&endTime='+(this.finance.time.split(" 至 ")[1])+'&financeType='+this.finance.financeType+'&nickName='+this.finance.workNickName;
				// var url = this.host + 'v1/finance/excel?photoInfoId='+this.id;
				a.href = url;
				a.target = '_blank';
				a.click();
				window.URL.revokeObjectURL(url); //释放 url 内容
			},
			findFinanceLogs: function(e,sousuo){//财务日志
				var url = this.host+'v1/finance',
					postParam = {},
					self = this;
				if(sousuo=='sousuo'){
					this.pageNo = 1;
				}
				postParam = {
					"pageNo":this.pageNo,
					"pageSize":8,
					"photoInfoId": parseInt(this.id),
					"financeType":this.finance.financeType,
					"startTime":this.finance.time && this.finance.time.split(" 至 ")[0],
					"endTime":this.finance.time && this.finance.time.split(" 至 ")[1],
					"nickName":this.finance.workNickName
				};
				Lib.M.load(url, postParam,function(data){
					if(data.code==8){
						self.$set("shouzhi",{});
	            		self.$set("findFinanceLog",[]);
						return false;
					}
					const page = {
	                    pageSize: data.data.pageSize,
	                    totalCount: data.data.totalCount,
	                    pageNo: data.data.pageNo
	                };
	                self.$set("shouzhi", data.data);
					self.$set("findFinanceLog",data.data.list);
				},"GET");
			},
			timeWidgit: function () {// 时间插件初始化
				var locale = Lib.C.dateLocale;
				var tmp = locale.format;
				var startDate = moment().subtract(1, 'month').format(tmp);//moment().add(1, 'days').format(tmp);
				var endDate = moment().format(tmp);//moment(new Date()).subtract(1, 'month').format('YYYY-MM-DD HH:ss:00')
				this.$set('finance.time', startDate + ' 至 ' + endDate);
				$('.timer').daterangepicker({
					timePicker: true,
					timePicker24Hour: true,
					locale: locale
				});
			}
		},
		components: {
	        page
	    }
	}
</script>
<style scoped>
	.worksList .table tr th{
		font-weight: normal;color: #676b70; border-bottom: solid 1px #e7ebf3; background: #f7f8fc;
	}
	.worksList .table tr td{
		color: #909090;
	}
	.worksList .table tr th,.worksList .table tr td{
		text-align: center; padding: 19px 0; font-size: 16px;
	}
	.table{
		margin-bottom: 0
	}
	.worksList .table tr th:first-child,.worksList .table tr td:first-child{
		text-align: left; padding-left: 80px;
	}
	.worksList .table tr{
		border-top: solid 1px #bfbfbf;
	}
	.nicheng,.leixing,.shijian{
		font-size: 20px; margin-left: 80px
	}
	.shuruNC input,.shuruXZ{
		border-radius: 50px; background: rgba(0,0,0,0);height: 44px; font-size: 16px;padding: 0 20px 0 20px;
	}
	.caiwu{
		background: #ecedf3;padding: 23px 0; border-bottom: solid #ddd 1px;
	}
	.caiwu label{
		float: left; font-weight: normal;
	}
	.daoshou{
		background: #f7f8fc; padding: 20px 0; padding-left: 80px
	}
	.daoshou button{
		border-radius: 50px; padding: 2px 25px;font-size: 16px;margin-right: 5px
	}
</style>