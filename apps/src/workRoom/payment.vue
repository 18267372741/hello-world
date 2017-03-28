<template lang="html">
	<div class="title">
    	<h3>提现</h3>
	</div>
	<div class="QRfied">
		<div style="text-align: center;" class="QR">  </div>
		<p style="text-align: center;padding-top: 10px;margin-bottom: 20px;">打开微信扫一扫，绑定您的提现账户</p>
	</div>
	<div class="bianju">
		<form class="form-horizontal">
			<div style="overflow: hidden;width:600px;display: inline-block;">
				<div class="form-group col-sm-12">
					<div class="col-sm-6 paymentInput">
						<input v-model="money.tic" type="text" class="form-control" placeholder="输入提现金额">
					</div>
					<div class="col-sm-6 paymentInput">
						<input @click="withdraw" type="button" class="form-control btn-primary" value="确定提现">
					</div>
				</div>
			</div>
		</form>
		
		<div style="text-align: center;" class="CZ">  </div>
		<p style="text-align: center;" class="chongzhi"></p>
		
		<div class="paymentsText">
			<p>提现记录</p>
			<!-- <span>Payments Record</span> -->
		</div>
		<table class="table table-bordered text-center">
			<tr>
				<td> 时间 </td>
				<td> 金额 </td>
				<td> 状态 </td>
			</tr>
		    <tr v-for="tixiandata in tixiandata">
		    	<td>{{tixiandata.createTime}}</td>
		    	<td>{{tixiandata.money}}</td>
		    	<td>提现</td>
		    </tr>
		</table>
		
		<p class="showorheid" :class="{'heid':show}">暂无提现记录</p>

	</div>
	<page :turn-page="pageOrder"></page>
</template>
<script>
	import Lib from '../assets/lib.js'
	import page from '../components/page/page.vue'
	const qrCode = require('qrcode');
	export default {
		data: () => ({
			id: sessionStorage.getItem("id"),
			host: Lib.C.hostPhotoStudio,
			qrCode:{},
			money:{},
			show:false,
			tixiandata:{},
			pageOrder:{},
			pageNo:1
		}),
		watch: {},
		created: function () {
			this.qrCodes();
			this.findtixian();
		},
		ready: function () {  },
		events: {
	        'child-turn-page' (obj){
	            this.$set('pageNo', obj.pageNo);
	            this.findtixian();
	        },
	    },
		methods: {
			qrCodes (){
				var url = this.host+'v1/wx/qrCode',
					postParam = {},
					self = this;
				postParam = {
					"workInfoId":this.id
				};
				Lib.M.load(url, postParam ,function(data){
					self.$set("qrCode.qrCodes",data.code_url);
					var QC;
					QC = qrCode.qrcode(5, 'L');
		            QC.addData(self.qrCode.qrCodes);
		            QC.make();
		            const imgTag = QC.createImgTag(5);
		            $(".QR").html(imgTag);
				},"get");
			},
			withdraw (){
				$(".CZ").html("");	
				$(".chongzhi").html("");	
				if(!this.money.tic){
					Lib.M.topRightInfoTips({title:"请输入金额"});
					return false;
				}
				var url = this.host+'v1/wx/withdraw',
					postParam = {},
					self = this;
				postParam = {
					"money": parseInt(this.money.tic),
					"workInfoId": parseInt(this.id)
				};
				Lib.M.load(url, JSON.stringify(postParam) ,function(data){
					Lib.M.topRightInfoTips({title:data.message});
				});
			},
			findtixian:function(){
				var url = this.host+'v1/finance',
					postParam = {},
					self = this;
				postParam = {
					financeType: 'TX',
					pageNo:this.pageNo,
					pageSize:10,
					workInfoId: parseInt(this.id)
				};
				Lib.M.load(url,postParam,function(data){
					if(data.hasOwnProperty('code')){
						self.$set('show',true)
					}else{
						self.$set('show',false)
						self.$set('tixiandata',data.data.list)
						self.$set('pageOrder',data.data)
					}
				},'get');
			},
		},
		 components: {
	        page
	    },
	}
</script>
<style scoped>
	.title{
		text-align: center; padding: 30px 0; background: #ecedf3; margin-bottom: 30px; border-bottom: solid #ddd 1px;
	}
	h3,h4{
		margin: 0;padding: 0;
	}
	h3{
		margin-bottom: 4px;
	}
	.form-horizontal{
		text-align: center;
	}
	.form-group{
		margin-left:0;
		margin-right: 0;
		padding-left: 0;
		padding-right: 0;
	}
	.btn{
		width: 160px; border-radius: 0; color: #fff; font-size: 15px; border-radius: 4px
	}
	.paymentsText{
		text-align: center;
	}
	.QRfied{
	    position: fixed; top: 230px; right: 50px; z-index: 1;
	}
	.QR{
	    box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.4);
	    border-radius: 3px;
	}
	.paymentInput input{
		height: 45px;
	}
	.paymentsText p{
	    font-size: 17px; margin: 0; margin-bottom: 5px;
	}
	.paymentsText{
		margin-bottom: 15px;
	}
	.bianju{
		margin: 50px 346px 0 50px;height: 612px;
	}
	table{
		text-align: center;
	}
	table tr td{
		width: 33.33%;
	}
	.showorheid{
		text-align: center;
		font-size: 16px;
		display: none;
	}
	.heid{
		display: block;
	}
</style>