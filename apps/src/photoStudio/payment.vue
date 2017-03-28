
<template lang="html">
	<div class="title">
    	<h3>充值</h3>
	</div>
	<!-- <div class="QRfied">
		<div style="text-align: center;" class="QR">  </div>
		<p style="text-align: center;padding-top: 10px;margin-bottom: 20px;">打开微信扫一扫，绑定您的提现账户</p>
	</div> -->

	<div class="modal fade pass" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog kuan" style="width:390px">
			<div class="modal-content">
				<div class="modal-body" style="text-align: center;">
					<div class="chongzhishow">
						<div style="text-align: center;" class="CZ">  </div>
						<p class="chongzhi sao" style="text-align: center;"></p>
					</div>
				</div>
			</div>
		</div> 
	</div>

	<!-- <div class="chongzhishow">
		<div style="text-align: center;" class="CZ">  </div>
		<p class="chongzhi sao" style="text-align: center;"></p>
	</div> -->
	<div class="bianju">
		<form class="form-horizontal">
			<div style="overflow: hidden;width:600px;display: inline-block;">
				<div class="form-group col-sm-12">
					<div class="col-sm-6 paymentInput">
						<input placeholder="充值金额，只能充值整数" v-if="!addr.type" v-model="money.tic" type="text" class="form-control">
						<input placeholder="提现金额，只能体现整数" v-if="addr.type" v-model="money.tic" type="text" class="form-control">
					</div>
					<div class="col-sm-6 paymentInput">
						<input v-if="!addr.type" @click="natives" type="button" class="form-control btn-primary" value="确定充值">
						<input v-if="addr.type" @click="withdraw" type="button" class="form-control btn-primary" value="确定提现">
					</div>
				</div>
			</div>
		</form>
		<div class="paymentsText">
			<p> <template v-if="addr.type">提&nbsp;现</template> <template v-if="!addr.type">充&nbsp;值 </template>记&nbsp;录</p>
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
		    	<td>{{tixiandata.money}}元</td>
		    	<td><template v-if="addr.type"> 提现 </template><template  v-if="!addr.type">充值</template></td>
		    </tr>
		</table>	
		
		
		
		<template v-if="addr.type">
			<p class="showorheid" :class="{'heid':show}">暂无提现记录</p>
		</template>
		<template v-if="!addr.type">
			<p class="showorheid" :class="{'heid':show}">暂无充值记录</p>
		</template>

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
		addr:Lib.M.getUrlParams(),
		qrCode:{},
		money:{},
		show:false,
		tixiandata:{},
		pageOrder:{},
		pageNo:1,
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
				"photoInfoId":this.id
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
		natives (){
			$(".CZ").html("");	
			$(".chongzhi").html("");	
			if(this.money.tic*1 < 1){
				Lib.M.topRightInfoTips({title:"请正确的充值金额！"});
				return false;
			}
			var url = this.host+'v1/wx/native',
				postParam = {},
				self = this;
			postParam = {
				"money": parseInt(this.money.tic),
				"photoInfoId": parseInt(this.id)
			};
			Lib.M.load(url, JSON.stringify(postParam) ,function(data){
				if(data.code==-1){
					$('.pass').modal('show')
					var QC;
					QC = qrCode.qrcode(5, 'L');
		            QC.addData(data.code_url);
		            QC.make();
		            const imgTag = QC.createImgTag(5);
		            $(".CZ").html(imgTag);	
		            $(".chongzhi").html("请扫二维码充值");	  
				}
			});
		},
		withdraw (){
			$(".CZ").html("");
			$(".chongzhi").html("");
			if(this.money.tic*1 < 1){
				Lib.M.topRightInfoTips({title:"请输入正确的提现金额！"});
				return false;
			}
			var url = this.host+'v1/wx/withdraw',
				postParam = {},
				self = this;
			postParam = {
				"money": parseInt(this.money.tic),
				"photoInfoId": parseInt(this.id)
			};
			Lib.M.load(url, JSON.stringify(postParam) ,function(data){
				Lib.M.topRightInfoTips({title:data.message});
				if(data.code==-1){
					setTimeout(function(){
						Lib.M.topRightInfoTips({title:"如果您账户余额不足，将提现失败"});
					},2000)
				}
			});
		},
		findtixian:function(){
			var url = this.host+'v1/finance',
				postParam = {},
				self = this;
			postParam = {
				financeType: this.addr.type?'TX':'CZ',
				pageNo:this.pageNo,
				pageSize:10,
				photoInfoId: parseInt(this.id)
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
		margin-left:0; margin-right: 0; padding-left: 0; padding-right: 0;
	}
	.btn{
		width: 160px; border-radius: 0; background: #ed9a0f; color: #fff; font-size: 15px;
	}
	.paymentsText{
		text-align: center;
	}
	.QRfied{
	    position: fixed; top: 230px; right: 50px; z-index: 1;
	}
	.QR{
	    box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.4); border-radius: 3px;
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
	table{
		text-align: center;  width: 100%;
	}
	.bianju{
		margin: 50px 50px 0 50px;height: 612px;
	}
	table tr td{
		width: 33.33%;
	}
	.showorheid{
		text-align: center; font-size: 16px; display: none;
	}
	.heid{
		display: block;
	}
	/*.chongzhishow{
		position: fixed; top: 530px; right: 50px; z-index: 1;
	}
	.CZ{
		box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.4); border-radius: 3px;
	}*/
	.chongzhi{
		padding-top:10px ;
	}
</style>