<template lang="html">
	<div class="title">
    	<h3>绑定微信</h3>
	</div>
	<div style="text-align: center;padding-top: 10%;" class="QR">  </div>
	<p style="text-align: center;padding-bottom: 174px;">打开微信扫一扫，绑定您的支付账户</p>
	<div style="text-align: center;" class="CZ">  </div>
	<p style="text-align: center;" class="chongzhi"></p>
</template>
<script>
import Lib from '../assets/lib.js'
const qrCode = require('qrcode');
export default {
	data: () => ({
		id: sessionStorage.getItem("id"),
		host: Lib.C.hostPhotoStudio,
		qrCode:{},
		money:{}
	}),
	watch: {},
	created: function () {
		this.qrCodes();
	},
	ready: function () {  },
	methods: {
		qrCodes (){
			var url = this.host+'v1/wx/qrCode',
				postParam = {},
				self = this;
			postParam = {
				"workEmpId":this.id
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
				"workEmpId": parseInt(this.id)
			};
			Lib.M.load(url, JSON.stringify(postParam) ,function(data){
				Lib.M.topRightInfoTips({title:data.message});
			});
		}
	},
	components: {
    }
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
</style>