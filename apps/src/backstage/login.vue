<style type="text/css" scoped>
		body{
			background-color:#eee ;
		}
		.login{  
			    width: 340px;
			    margin: 240px auto;
			    margin-bottom:inherit ;
			    padding: 10px 0;
			    border: 1px solid #ccc;
			    border-radius: 5px;
    	}
    	.loginTitle{
    		    text-align: center;
				font-size: 22px;
				font-weight: bold;
				margin: 20px 0;
    	}
</style>
<template lang="html">
    <div class="row login">
    	<div class="loginTitle"><strong>金尚</strong>数码管理系统</div>
    	<div class="col-md-12">
    		<form class="form-horizontal" role="form">
			  <div class="form-group">
			    <label for="inputEmail3" class="col-sm-4 control-label">账号：</label>
			    <div class="col-sm-8">
			      <input type="text" class="form-control" id="inputEmail3" placeholder="请输入账号" v-model="email">
			    </div>
			  </div>
			  <div class="form-group">
			    <label for="inputPassword3" class="col-sm-4 control-label">密码：</label>
			    <div class="col-sm-8">
			      <input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="passwords">
			    </div>
			  </div>
			  <div class="form-group">
			    <div class="col-sm-12 text-center">
			      <button type="button" class="btn btn-default" @click='login'>登录</button>
			    </div>
			  </div>
			</form>
    	</div>
    </div>
</template>
<script type="text/javascript">
	import Lib from '../assets/lib'
export default {
	props: {
        
    },
	data: () => ({
		host: Lib.C.hostBackstage,
		email:'',
		passwords:''
	}),
	created() {
		
	},
	ready (){
		
	},
	watch: {
		'email' : function(val){
			if(val == ''){
				Lib.M.topRightInfoTips({title:'请输入账号'})
			}
		},
		'passwords' : function(val){
			if(val == ''){
				Lib.M.topRightInfoTips({title:'请输入密码'})
			}
		}
	},
	methods: {
		login: function() {
                let url = this.host + 'onLinePs/systemAccount/doLogin';
                let self = this;
                let params = {};
                if(this.email == '') {
                    Lib.M.topRightInfoTips({
                        title: "请输入账号"
                    })
                    return false;
                }else if(this.passwords == ''){
                	Lib.M.topRightInfoTips({
                        title: "请输入密码"
                    })
                    return false;
                }
                params = {
                    account: this.email,
                    password: this.passwords
                };
                params = JSON.stringify(params)
                Lib.M.load(url, params, function(data) {
                    if(data.code == -1) {
                        localStorage.setItem('h_id', data.id);
                        localStorage.setItem('h_role', data.role);
                        localStorage.setItem('h_position', 'totalBackstage');
                        Lib.M.topRightInfoTips({
                            title: data.sub_msg,
                            time:2000
                        })
                        setTimeout(function(){
                        	if(data.role == 1){
                        		window.location.href = 'backstage.html#/index/workReview'
                        	}else{
                        		window.location.href = 'backstage.html#/index/handOrder'
                        	}
                        	
                        },2000)
                    } else {
                        Lib.M.topRightInfoTips({
                            title: data.message
                        })
                    }
                });
            }
	}
}
	
</script>