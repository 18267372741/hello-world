
<template lang="html">
	<my-head></my-head>
	<div class="logins">
		<div class="title">
			<h3>影楼登录</h3>
			<h4>Studio Sign In</h4>	
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
	                <a style="margin-left: 5px;" href="#/registered">注册账户</a>
	            	<a class="col-sm-offset-7" href="#/forget?type=photo">找回密码</a>
	            </div>
			</div>
		</form>
		<!-- 选择数码师 -->
		<div class="modal fade workRoom" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> -->
						<h4 style="color:black" class="modal-title" id="gridSystemModalLabel">选择登陆账号</h4>
					</div>
					<div class="modal-body row">
						<div class="col-sm-12">
							<div class="center row shumashi">
								<div class="col-sm-3 weiyi" @click="selectFn($event,select.id,select.type,select.workInfoId)" v-for="select in select">
									<div class="product-block">
										<div>
											<img style="height:178px" :src="select.logo">
										</div>
										<div class="product-bottom">
											<p>
												<span v-if="select.type=='PHOTO'">影楼</span>
												<span v-if="select.type=='WORK'">工作室</span>
												<span v-if="select.type=='EMP'">数码师</span>
												{{select.nickName}}
											</p>
			                    		</div>
			                    	</div>
			                    </div>
		                    </div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script> 
	import myHead from '../module/common/head.vue'
    import Lib from '../assets/lib.js'
    export default {
        data: () => ({
        	addr:Lib.M.getUrlParams(),
            host: Lib.C.hostPhotoStudio,
            login:{},
            select:{}
        }),
        created: function () {
			if(this.addr.code){
				this.weixingLogin();
			}
		},
        methods: {
        	selectFn (e,id,type,workInfoId){
        		if(type=='PHOTO'){
	            	Lib.M.topRightInfoTips({ title:"登录成功！" });
	            	sessionStorage.setItem("id", id);
	            	sessionStorage.setItem("position", "yinglou");
	            	this.weixingLoginDE( id,type );
            	}else if(type=='WORK'){
            		window.location.href='http://www.17xiutu.com/dist/workRoom.html#/?weixing=weixing&id='+id;
            	}else if(type=='EMP'){
            		window.location.href='http://www.17xiutu.com/dist/repairDivision.html#/?weixing=weixing&id='+id+'&workId='+workInfoId;
            	}
        	},
        	weixingLogin (){
        		var url = this.host+'v1/wx/login',
        			self = this,
                    postParam = {};
                postParam = {
                	"code":this.addr.code
                };
                Lib.M.load(url, postParam, function(data){
                	if(data.code==-5){
                		alert(data.message+',请去注册');
                		window.location.href='http://www.17xiutu.com';
                		return false;
                	}
                	self.$set("select",data.data);
					$('.workRoom').modal({
						backdrop: 'static',
						keyboard: false,
						show:true
					});
                },'get');
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
                		window.location.href='http://www.17xiutu.com/dist/photoStudio.html#/index/sendOrder';
                	},1500)
                });
        	},
            loginFn (){
				if(!this.login.account||!this.login.password){
					Lib.M.topRightInfoTips({ title:"请输入账户或密码！" });
					return false;
            	}
                var url = this.host+'v1/photo/Login',
                    postParam = {};
                postParam = {
                	"account":this.login.account,
                	"password":this.login.password
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data){
                    if(data.code){
                     	Lib.M.topRightInfoTips({ title:data.message });
                    }else if(data.data){
                    	Lib.M.topRightInfoTips({ title:"登录成功！" });
                    	sessionStorage.setItem("id", data.data.id);
	                	sessionStorage.setItem("position", "yinglou");
    	            	setTimeout(function(){
        	        		if(!data.data.logo){
            	    			window.location.href='#/index/infoSet';
                			}else{
                    			window.location.href='#/index/sendOrder';
                    		}
                    	},1500);
                    }
                });
            }
        },
        components: {
			myHead
		}
    }
</script>
<style scoped>
	.center .product-block{
		margin: 0;width: 100%;
	}
	.logins{
		background: url(/img/yinglou.jpg) center center;height: 895px;
	}
	.login.form-horizontal{
	    width: 400px; display: block; margin: 0px auto; padding: 20px;
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