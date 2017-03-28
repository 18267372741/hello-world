<template lang="html">
	<div class="bsidebar">
		<div class="headImg">
			<div>
				<img src="../assets/images/logo4.png"/>
			</div>
			<div>
				<span style="color: #428BCA;font-size: 16px;">{{userinfo.account}}</span>
			</div>
		</div>
		<ul>
			<template v-if="h_role == 1">
				<li v-link-active><a v-link="{path : '/index/photoReview', activeClass: 'active'}">影楼审核</a></li>
				<li v-link-active><a v-link="{path : '/index/workReview', activeClass: 'active'}">工作室审核</a></li>
				<li v-link-active><a v-link="{path : '/index/template', activeClass: 'active'}">模板管理</a></li>
				<li v-link-active><a v-link="{path : '/index/moneyDetails', activeClass: 'active'}">财务统计</a></li>
				<li v-link-active><a v-link="{path : '/index/addmoney', activeClass: 'active'}">充值(<small>流水</small>)</a></li>
				<li v-link-active><a v-link="{path : '/index/complaints', activeClass: 'active'}">投诉信息</a></li>
				<li v-link-active><a v-link="{path : '/index/works', activeClass: 'active'}">产品信息</a></li>
				<li v-link-active><a v-link="{path : '/index/abouts', activeClass: 'active'}">关于我们</a></li>
				<li v-link-active><a v-link="{path : '/index/contactus', activeClass: 'active'}">联系我们</a></li>
				<li v-link-active><a v-link="{path : '/index/help', activeClass: 'active'}">帮助中心</a></li>
			</template>
			<template v-else>
				<li v-link-active><a v-link="{path : '/index/handOrder', activeClass: 'active'}">手动派单</a></li>
			</template>
			<li class="lastLi"><a v-link="{path : '/'}">退出</a></li>
		</ul>
	</div>
</template>
<script type="text/javascript">
import Lib from '../assets/lib'
export default {
	props: {

    },
	data: () => ({
		host: Lib.C.hostBackstage,
		userinfo:{},
		h_role:localStorage.getItem('h_role'),
	}),
	created() {
		if(localStorage.getItem('h_id')){
			this.finduserinfo();
		}else{
			Lib.M.topRightInfoTips({ title: '登录超时，请重新登录！', time:2000 })
			setTimeout(function(){
				window.location.href = window.location.href.split('#/')[0];
			},2000)
		}
	},
	ready (){

	},
	watch: {},
	methods: {
		finduserinfo:function(){
			let url = this.host + 'onLinePs/systemAccount/findSystemInfo/'+localStorage.getItem('h_id');
            let self = this;
            let params = {};
            params.id = localStorage.getItem('h_id');
            Lib.M.load(url,'', function(data) {
            	 self.$set('userinfo',data.data[0])
            },'get');
		},
	}
}

</script>
<style type="text/css" scoped>
.headImg{
	padding-top: 40px;
	text-align: center;
}
.headImg img{
	width: 160px;
	height: 160px;
}
.bsidebar{
	position: fixed;
	top: 0;
	bottom: 0;
	width: 220px;
	background-color: #f5f5f5;
    border-right: 1px solid #eee;
	z-index: 1000;
}
.bsidebar ul {
	text-align: center;
	padding-top: 45px;
}
.bsidebar ul li{
	padding: 2px;
	margin-top: 5px;
	overflow: hidden;
}
.bsidebar ul li:hover{
	background-color: #eeeeee;
}
.bsidebar ul li a{
	float: left;
	width: 100%;
	font-size: 19px;
    color: #428bca;
    text-decoration: none;
}
.lastLi{
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    background: #428bca;
    width: 160px;
    margin: auto;
    border-radius: 3px;
}
.bsidebar .lastLi a{
	color: #fff;
}
.bsidebar .lastLi:hover{
	background-color: #428bca;
	color: #fff;
}
.bsidebar .active>a{
	background-color: #428bca;
	color: #fff;
}
</style>