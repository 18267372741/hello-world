<template lang="html">
	<div class="title">
    	<h3 @click="edAccount">账号管理</h3>
	</div>
    <div class="main">
    	<h3 @click="deAccount">管理员</h3>
    	<div class="mainBox">
	    	<div class="oneman">
	    		<img :src="work.logo">
	    		<!-- <i class="iconfont icon-jingyin"></i>
	    		<i class="iconfont icon-voice"></i> -->
	    	</div>
		</div>
	</div>
	<div class="main">
    	<h3 @click="deAccount">授权登陆</h3>
    	<div class="mainBox">
	    	<div v-for="accountInfo in accountInfo" class="oneman">
	    		<img :src="accountInfo.logo">
	    		<i data-toggle="modal" data-target=".delmodal" @click="getId($event,accountInfo.id,'clone')" class="iconfont icon-svg26"></i>
	    		<i data-toggle="modal" data-target=".delmodal" @click="getId($event,accountInfo.id,'YES')" v-if="accountInfo.isReceiveMsg=='NO'" class="iconfont icon-jingyin"></i>
	    		<i data-toggle="modal" data-target=".delmodal" @click="getId($event,accountInfo.id,'NO')"  v-if="accountInfo.isReceiveMsg=='YES'" class="iconfont icon-voice"></i>
	    	</div>
	    	<div class="tianjia">
	    		<span data-toggle="modal" data-target=".addZhanghao">+</span>
	    	</div>
    	</div>
    </div>
    <!--删除模态框-->
    <div class="modal fade delmodal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-body">
					<p v-if='caozuo.type=="clone"'> 确定删除授权账户？ </p>
					<p v-if='caozuo.type=="YES"'> 是否打开消息推送提醒？ </p>
					<p v-if='caozuo.type=="NO"'> 是否关闭消息推送提醒？ </p>
				</div>
				<div class="modal-footer">
					<button v-if='caozuo.type=="clone"' @click="deAccount" type="button" class="btn btn-primary sure" data-dismiss="modal">确定</button>
					<button v-if='caozuo.type!="clone"' @click="edAccount" type="button" class="btn btn-primary sure" data-dismiss="modal">确定</button>
					<button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
    	        </div>
            </div>
        </div>
    </div>
    <div class="modal fade addZhanghao" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog kuan" style="width:390px">
			<div class="modal-content">
				<div class="modal-body" style="text-align: center;">
					<div class="chongzhishow">
						<div class="QR"></div>
						<p>请扫描二维码绑定微信账号</p>
					</div>
				</div>
			</div>
		</div> 
	</div>
</template>
<script>
    import Lib from '../assets/lib.js'
    import bus from './bus.js'
    const qrCode = require('qrcode')
    export default {
        data: () => ({
			qnyUrl:Lib.C.qiniu.jsUrl,
			id: sessionStorage.getItem("id"),
			host: Lib.C.hostPhotoStudio,
			qrCode:{},
			accountInfo:{},//授权登陆
			work:{},//管理员
			caozuo:{}//模态框类型
        }),
        created: function () {
        	var self = this;
        	bus.$on('tongxun',function(data){
				console.log(data);
				if(data){
					self.account();
				}
			});
			this.qrCodes();
			this.account();
			this.works();
		},
		ready: function () {  },
        methods: {
			works (){
				var url = this.host+'v1/photo/'+this.id,
					postParam = {},
					self = this;
				Lib.M.load(url, {},function(data){
					self.$set("work",data.data);
				},"GET");
			},
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
			account (){
				var url = this.host+'v1/account',
					self = this,
					postParam = {};
				postParam = {
					"id":parseInt(this.id),
					"type":"PHOTO"
				};
				Lib.M.load(url, postParam, function(data){
					if(data.code==8){
						self.$set("accountInfo",[])
						return false;
					}
					data = data.data;
					self.$set("accountInfo",data)
				},"get");
			},
			getId (e,id,type){
				this.$set("caozuo.id",id);
				this.$set("caozuo.type",type);
			},
			deAccount (){
				var url = this.host+'v1/account/'+this.caozuo.id,
					self = this,
					postParam = {};
				postParam = {
					"id":this.caozuo.id
				};
				Lib.M.load(url, postParam, function(data){
					self.account();
				},"delete");
			},
			edAccount (){
				var url = this.host+'v1/account',
					self = this,
					postParam = {};
				postParam = {
					"id":this.caozuo.id,
					"isReceiveMsg":this.caozuo.type,
					// "nickName":"xuyulong",
					"type":"PHOTO"
				};
				Lib.M.load(url, JSON.stringify(postParam), function(data){
					self.account()
				},"put");
			}
		},
		components: {
			
		}
	}
</script>
<style scoped>	
	@import url("../assets/icon.css");
	.title{
		text-align: center; padding: 30px 0; background: #ecedf3; margin-bottom: 30px; border-bottom: solid #ddd 1px;
	}
	.title h3{
		margin: 0 0 3px 0;padding: 0;
	}
	.main{
		padding: 20px 140px;
	}
	.main h3{
		text-indent: 25px
	}
	.mainBox{
		overflow: hidden;
	}
	.oneman{
		width: 200px; position: relative; height: 200px; overflow: hidden; border-radius: 5px; float: left;margin: 25px;
	}
	.oneman i{
		cursor: pointer;
	}
	.oneman img{
		width: 200px;
	}
	.iconfont{
		font-size: 26px;
	}
	.icon-svg26{
		position: absolute; left: 6px; top: 0; color: #eb4460;
	}
	.icon-voice{
		color: #28d96f;
	}
	.icon-jingyin{
		color: #eb4460;
	}
	.icon-jingyin, .icon-voice{
		position: absolute; right: 6px; top: 0; 
	}
	.tianjia{
		width: 200px; height: 200px; display: inline-block; float: left; background: #f1f4f6; border-radius: 5px; text-align: center;
		margin: 25px;
	}
	.tianjia span{
		font-size: 80px; color: white;display: inline-block; width: 70px; height: 70px;background: #5cacdd;text-align: center;
		line-height: 57px; border-radius: 50%; margin-top: 60px; cursor: pointer;
	}
	.anniuBox{
		text-align: center;
	}
	.anniu{
		border-radius: 50px; font-size: 14px; padding: 8px 36px;
	}
	/*.weizhi{
		position: absolute; top: 230px; right: 60px;
	}*/
	.weizhi p{
		text-align: center; margin-top: 10px;
	}
	/*模态框*/
	.modal-sm{
		width: 450px;
	}
	.modal-sm .modal-content{
		padding: 71px 33px 30px 33px;
	}
	.modal-sm .tuya{
		padding: 20px;
	}
	.modal-sm .modal-footer{
		border: 0;text-align: center;
	}
	.modal-sm .modal-body p{
		font-size: 18px;text-align: center;
	}
	.sure,.cancel{
		border-radius: 50px; width: 90px;height: 36px;
	}
</style>