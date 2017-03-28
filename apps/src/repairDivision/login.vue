
<template lang="html">
	<tou></tou>
	<div class="logins">
		<div class="title">
			<h3>数码师登录</h3>
			<h4>Photographer  Sign In</h4>
		</div>
		<form class="login form-horizontal" id="businessManagementLogin">
			<div class="form-group">
				<div class="col-sm-12">
					<input v-model="login.account" type="text" class="form-control yuanjia" placeholder="用户名">
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-12">
					<input @keyup.enter="loginFn" v-model="login.password" type="password" class="form-control yuanjia" placeholder="密码">
				</div>
			</div>
			<div class="form-group">
	            <div class="col-sm-12">
	                <button type="button" class="btn btn-primary btn-block sure" @click="loginFn">登录</button>
	            </div>
			</div>
			<div class="form-group">
	            <div class="col-sm-12">
	                <a style="margin-left: 5px;" href="#/forget?type=emp">找回密码</a>
	            </div>
			</div>
		</form>
	</div>
</template>
<script>
	import tou from './common/tou.vue'
    import Lib from '../assets/lib.js'
    export default {
        data: () => ({
        	addr:Lib.M.getUrlParams(),
			host: Lib.C.hostRepairDivision,
			login:{}
        }),
        created: function () {
			if(this.addr.weixing){
				this.weixingLogin();
			}
		},
        methods: {
        	weixingLogin (){
				sessionStorage.setItem("id", this.addr.id);
				sessionStorage.setItem("workInfoId", this.addr.workid);
            	sessionStorage.setItem("position", "digital");
            	this.weixingLoginDE(this.addr.id,"EMP")
			},
			weixingLoginDE (id,type){
                var url = this.host+'v1/wx/login/do',
                    postParam = {};
                postParam = {
                    "id":id,
                    "type":type
                };
                Lib.M.load(url, postParam, function(data){
                    setTimeout(function(){
	            		window.location.href='#/index/orderMan';
	            	},1500)
                });
            },
            loginFn (){
            	if(!this.login.account||!this.login.password){
            		Lib.M.topRightInfoTips({ title:"请输入账户或密码！" });
            		return false;
            	}
				var url = this.host+'v1/work/emp/Login',
					postParam = {};
                postParam = {
					"account":this.login.account,
					"password":this.login.password
				};
				Lib.M.load(url, JSON.stringify(postParam), function(data){
                	console.log(data);
                    if(data.code){
                     	Lib.M.topRightInfoTips({ content:data.message });
                    }else if(data.data){
                    	Lib.M.topRightInfoTips({ title:"登录成功！" });
                    	sessionStorage.setItem("id", data.data.id);
                    	sessionStorage.setItem("workInfoId", data.data.workInfoId);
                    	sessionStorage.setItem("position", "digital");
						setTimeout(function(){
                    		if(!data.data.logo){
                    			window.location.href='#/index/infoSet';
                    		}else{
                    			window.location.href='#/index/orderMan';
                    		}
                    	},1500);
                    }
                });
            }
        },
        components: {
			tou
		}
    }
</script>
<style scoped>
	.logins{
		background: url(../assets/images/shuma.jpg) center center;height: 895px;
	}
	.login.form-horizontal{
	    width: 400px;  display: block;  margin: 0px auto;  padding: 20px;
	}
	.form-control{
		border-radius: 0; background: rgba(0,0,0,0); color: white;height: 48px;
	}
	.form-group{
		height: 48px;
	}
	.form-group a{
		color: white; font-size: 16px;
	}
	.yuanjia{
        border-radius: 50px;padding-left: 20px
    }
    .sure{
    	border-radius: 50px;height: 48px;font-size: 20px; background: #275482
    }
	.title{
		text-align: center;padding: 12% 0 30px 0;
	}
	h3,h4{
		margin: 0;padding: 0; color: white;
	}
	h3{
		margin-bottom: 4px;
	}
</style>