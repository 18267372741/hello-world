<template lang="html">
    <div class="content row">
    	<div class="toubuNav">
            <div class="logo"><img src="../assets/images/logozi.png"></div>
            <div class="neirong">
                <ul>
                    <li class="dengji">等级: {{work.level}}</li>
                    <li><img :src="work.logo"/></li>
                    <li class="name">{{work.companyName}}</li>
                    <li class="yue">余额: <span>{{Math.floor(work.money*100)/100}}</span></li>
                    <li style="cursor: pointer;" v-link-active v-link="{path: '/index/payment'}" class="chongzhis">充值</li>
                    <!-- <li style="cursor: pointer;" @click="loads" v-link-active  v-link="{path: '/index/payment?type=withdraw'}">提现</li> -->
                    <li>
                        <button v-link="{path: '/'}" type="button" class="btn btn-primary btn-sm tuichu">
                            <i style="font-size: 18px;margin-right: 4px;" class="iconfont icon-tuichu"></i>退出登录
                        </button>
                    </li>
                </ul>
            </div>
    	</div>
        <router-view></router-view>
    </div>
    <side-bar></side-bar>
    <websocket></websocket>
    <qiniu-up></qiniu-up>
</template>
<script>
	import sideBar from './common/sideBar.vue'
    import websocket from './common/websocket.vue'
    import qiniuUp from './common/qiniuUp.vue'
    import Lib from '../assets/lib.js'
    export default {
        data: () => ({
            id: sessionStorage.getItem("id"),
            host: Lib.C.hostPhotoStudio,
            qnyUrl:Lib.C.qiniu.jsUrl,
            work:{},
            addr:Lib.M.getUrlParams().type?true:false
        }),
        created: function () {
            this.works()
        },
        events: {
            'child-qiniu-data' (obj){
                var self = this,
                    name;
                if(obj.key){
                    name = obj.key.split("/")[2];
                }
                if(obj.key&&name=="logo"){
                    self.$set("work.logo",obj.key);
                }
                if(obj.key&&name=="license"){
                    self.$set("work.license",obj.key);
                }
            },
        },
        ready: function () {  },
        methods: {
            works (){
                var url = this.host+'v1/photo/'+this.id,
                    postParam = {},
                    self = this;
                Lib.M.load(url, {},function(data){
                    self.$set("work",data.data)
                },"GET");
            },
        },
    	components: {
			sideBar,
            websocket,
            qiniuUp
		}
    }
</script>
<style scoped>
    .toubuNav{
    	color: #275482; background: white; overflow: hidden;padding: 34px 0; min-width: 900px;
    }
    .toubuNav .logo{
        float: left; margin-left: 80px; margin-top: 10px;
    }
    .toubuNav .neirong{
        float: right; font-size: 15px; 
    }
    .neirong ul{
        overflow: hidden; margin-bottom: 0; line-height: 46px
    }
    .neirong li{
        float: left; margin-right: 12px;
    }
    .dengji{
        font-size: 18px; color: #f15252; margin-right: 15px;
    }
    .dengji:after{
        content: "|"; color: black; padding-left: 12px;
    }
    .neirong .name{
        font-size: 16px; margin: 0 60px 0 14px;
    }
    .yue span{
        color: #0a99e3;
    }
    .chongzhis:before{
        content: "|";color: black;padding-right: 10px; font-size: 14px;
    }
    .tuichu{
        border-radius: 50px;border-radius: 50px; margin:0 20px; padding: 2px 12px;font-size: 15px;background: #275482
    }
    .neirong img{
        width: 47px;height: 47px;border-radius: 50%
    }
    .content{
    	margin:0 0 0 138px; overflow: hidden; background: white;
    }
</style>