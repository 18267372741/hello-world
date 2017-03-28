<template lang="html">
    <div class="sideBar">
    	<ul>
    		<li>
	    		<ul class="sideInfo">
		    		<li>
		    			<img src="../../assets/images/logo2.png"/>
		    		</li>
		    	</ul>
    		</li>
    		<li>
    			<ul class="sideNav">
	    			<li>
		    			<a :class="{active: linkType=='workList'}" v-link-active v-link="{path: '/index/workList', activeClass: 'active'}">
		    				<i class="iconfont icon-yuangongguanliiconcopy"></i>
		    				<span class="text">员工管理</span>
		    			</a>
		    		</li>
		    		<li>
		    			<a :class="{active: linkType=='recOrder'}" v-link-active v-link="{path: '/index/recOrder', activeClass: 'active'}">
		    				<i class="iconfont icon-paidan"></i>
		    				<span class="text">订单操作</span>
		    			</a>
		    		</li>
		    		<!-- <li>
		    			<a style="position: relative;" v-link-active v-link="{path: '/index/orderMan', activeClass: 'active'}">
		    				<i class="iconfont icon-dingdan"></i>
		    				<span class="text">订单详情</span>
		    				<span class="jiaobiao"></span>
		    			</a>
		    		</li> -->
		    		<li>
		    			<a :class="{active: linkType=='templateL'}" v-link-active v-link="{path: '/index/templateL', activeClass: 'active'}">
		    				<i class="iconfont icon-moban"></i>
							<span class="text">模板管理</span>
						</a>
		    		</li>
		    		<li>
		    			<a v-link-active v-link="{path: '/index/finance', activeClass: 'active'}">
		    				<i class="iconfont icon-shouzhiguanli"></i>
		    				<span class="text">收支明细</span>
		    			</a>
		    		</li>
		    		<li>
		    			<a v-link-active v-link="{path: '/index/infoSet', activeClass: 'active'}">
		    				<i class="iconfont icon-zhanghao"></i>
		    				<span class="text">账号信息</span>
		    			</a>
		    		</li>
		    		<li>
		    			<a v-link-active v-link="{path: '/index/accountManage', activeClass: 'active'}">
		    				<i class="iconfont icon-shezhi"></i>
		    				<span style="border-bottom: 0" class="text">账号管理</span>
		    			</a>
		    		</li>
		    		<li style="position: fixed; bottom: 0; left: 40px;">
		    			<a data-toggle="modal" data-target=".toushu">
		    				<i class="iconfont icon-111"></i>
		    				<span style="border-bottom: 0;color:white" class="text">投诉建议</span>
		    			</a>
		    		</li>
    			</ul>
    		</li>
    	</ul>
    </div>
    <div class="modal fade toushu" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	       			<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		        	<h4 class="modal-title">投诉</h4>
		    	</div>
		    	<div class="modal-body">
		        	<textarea spellcheck="请输入投诉内容" v-model="toushu.reason" class="form-control" rows="4" maxlength="200"></textarea>
		    	</div>
		    	<div class="modal-footer">
			        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
			        <button @click="toushus" type="button" class="btn btn-primary">确定</button>
		    	</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Lib from '../../assets/lib.js'
    export default {
        data: () => ({
        	id: sessionStorage.getItem("id"),
        	qnyUrl:Lib.C.qiniu.jsUrl,
        	host: Lib.C.hostPhotoStudio,
        	work:{},
            emp:1,
            linkType:'',
            toushu:{}
        }),
        created: function () {
        	window.addEventListener('hashchange', () => {
				var href = location.href;
				if(/index\/addWork/g.test(href)){
					this.$set('linkType', 'workList');
				}
				if(/index\/templateAdd/g.test(href)){
					this.$set('linkType', 'templateL');
				}
            });
		},
		ready: function () {
			if(/index\/downPic1/g.test(location.href)){
				this.$set('linkType', 'recOrder');
			}
		},
		methods: {
			toushus (){
				var url = this.host + "v1/comment/complain",
					self = this,
					postParam = {};
				if(!this.toushu.reason){
					return false
				}
				postParam = {
					"type":"WORK",
					"content":this.toushu.reason,//投诉原因
					"workInfoId":parseInt(this.id)//工作室id
				};
				Lib.M.load(url, JSON.stringify(postParam) ,function(data){
					Lib.M.topRightInfoTips({title:data.message});
					$('.toushu').modal('hide');
				});
			}
		}
	}
</script>
<style scoped>
	@import url("../../assets/icon.css");
	a:focus, a:hover{
		text-decoration: none !important;
	}
	.jiaobiao{
		width: 15px;height: 15px;background: red;display: inline-block;position: absolute; top: 8px; right: 37px;border-radius: 100%;
	}
	.sideBar{
		position: fixed;z-index: 999;width: 138px;left: 0;top: 0; background-color: #293541; min-height: 1500px;text-align: center;
	}
	.sideNav a{
		display: block; color: #888c90;margin-bottom: 24px
	}
	.sideNav i,.sideNav span{
		display: block;
	}
	.sideNav i{
		font-size: 40px;margin-bottom: -10px;
	}
	.sideNav span{
		border-bottom: 1px solid #83898f; display: initial; padding-bottom: 14px
	}
	.sideNav .active{
		color: white
	}
	.sideInfo img{
		margin: 15px 0 30px 0;border-bottom: 1px solid #83898f; display: initial; padding-bottom: 14px
	}
</style>