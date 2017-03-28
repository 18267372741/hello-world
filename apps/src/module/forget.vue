<template lang="html">
	<my-head></my-head>
	<div class="register clearfix">
		<div class="title">
			<h3>找回密码</h3>
			<h4>Retrieve Password</h4>
		</div>
		<form style="" class="form-horizontal">
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10">
					<label class="col-sm-5 control-label text-right no-padding">账号:</label>
					<div class="col-sm-5">
						<input v-model="register.account" type="text" class="form-control" placeholder="">
					</div>
				</div>
			</div>
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10">
					<label class="col-sm-5 control-label text-right no-padding">验证码:</label>
					<div class="col-sm-3">
						<input v-model="register.code" type="text" class="form-control">
					</div>
					<div class="col-sm-2">
						<button v-if="btnCode.send" @click="getCode" type="button" class="btn btn-primary">获取验证码</button>
						<button v-if="btnCode.stop" type="button" class="btn btn-info">{{btnCode.num}}秒后可获取</button>
					</div>
				</div>
			</div>
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10">
					<label class="col-sm-5 control-label text-right no-padding">新密码:</label>
					<div class="col-sm-5">
						<input v-model="register.password" type="password" class="form-control">
					</div>
				</div>
			</div>
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10">
					<label class="col-sm-5 control-label text-right no-padding">确认密码:</label>
					<div class="col-sm-5">
						<input @keyup.enter="verificat" v-model="register.surePassword" type="password" class="form-control">
					</div>
				</div>
			</div>
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10" style="margin-bottom: 80px;">
					<label class="col-sm-5 control-label text-right no-padding"></label>
					<div class="col-sm-5">
						<input @click="verificat" type="button" class="btn btn-primary sure" value="确定">
					</div>
				</div>
			</div>
			
		</form>
	</div>
</template>
<script>
import Lib from '../assets/lib.js'
import myHead from '../module/common/head.vue'
import qiniu from '../components/qiniu.vue'
export default {
	data: () => ({
		host: Lib.C.hostPhotoStudio,
		addr:Lib.M.getUrlParams(),
		register:{},
		btnCode:{
			send:true,
			stop:false,
			num:60
		}
	}),
	watch: {},
	events: {},
	ready: function () { },
	methods: {
		getCode: function(){
			var url = this.host+'v1/sendMessage',
				self = this,
				postParam = {};
            if(!this.register.account || this.register.account.length!=11){
				Lib.M.topRightInfoTips({title:"请填写正确手机号码"});
				return false;
            }
            postParam = {
            	"phone": this.register.account,
            	"signName":"变更验证",
            	"title":"修改密码验证码"
            };
            Lib.M.load(url, postParam,function(data){
            	Lib.M.topRightInfoTips({title:data.message});
            	if(data.code&&data.code==-1){
                	self.btnCode.send = false;
                 	self.btnCode.stop = true;
                 	var n=60,timer;
                 	timer = setInterval(function(){
                 		n--;
                 		self.$set("btnCode.num",n);
                 		if(n<=0){
                 			clearInterval(timer);
                 			self.btnCode.send = true;
                 			self.btnCode.stop = false;
                 		}
                 	},1000);
                }
            },"get");
		},
		verificat (){
			if(!this.register.account||this.register.account.length!=11){
				Lib.M.topRightInfoTips({title:"请填您的账号(11位手机号码)"});
				return false;
			}else if(!this.register.code){
				Lib.M.topRightInfoTips({title:"请填写验证码"});
				return false;
			}else if(!this.register.password){
				Lib.M.topRightInfoTips({title:"请填写您的新密码"});
				return false;
			}else if(this.register.password!=this.register.surePassword){
				Lib.M.topRightInfoTips({title:"请输入两次一样的密码"});
				return false;
			}
			this.registers();
		},
		registers (){
			var url = this.host+'v1/password',
				postParam = {};
            postParam = {
            	"account": this.register.account,
            	"code":this.register.code,
            	"password":this.register.password,
            	"type":this.addr.type
            };
            Lib.M.load(url, JSON.stringify(postParam),function(data){
                Lib.M.topRightInfoTips({title:data.message});
                if(data.code&&data.code==-1){
                 	location.href="#/";
                }
            });
        }
	},
	components: {
		qiniu,
		myHead
	}
}
</script>
<style scoped>
	.register{
		width: 100%; margin: 0 auto; background: #f1f2f9;height: 1020px; 
	}
	.title{
		padding-top: 6%; margin-bottom: 20px;
	}
	.title h3,.title h4{
		text-align: center;
	}
	.register form{
		position: relative; overflow: hidden; width: 65%;margin: 0 auto;
	}
	label{
		font-weight: normal;
	}
	.form-control{
		background: rgba(0,0,0,0); border-radius: 0; height: 48px;
	}
	.btn-primary,.btn-info{
		 border-radius: 0; height:35px; width: 100%; margin-top: 6px;
	}
	.sure{
		height: 50px;
	}
</style>