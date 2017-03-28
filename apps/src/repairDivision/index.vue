<template lang="html">
	<div class="content row">
        <div class="toubuNav">
            <div class="logo"><img src="../assets/images/logozi.png"></div>
            <div class="neirong">
                <ul>
                    <li class="dengji">等级: {{work.level}}</li>
                    <li><img :src="work.logo"/></li>
                    <li class="name">{{work.name}}</li>
                    <li class="yue">余额: <span>{{Math.floor(work.money*100)/100}}</span></li>
                    <li style="cursor: pointer;" v-link="{path: '/index/payment'}" class="chongzhi">提现</li>
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
            workInfoId: sessionStorage.getItem("workInfoId"),
            addr:Lib.M.getUrlParams().type?true:false
        }),
        created: function () {
            this.workInfo();
        },
        ready: function () {  },
        methods: {
            workInfo() {
                var url = this.host + 'v1/work/emp/one/' + this.id,
                    postParam = {},
                    self = this;
                postParam = {
                    "id": this.id
                };
                Lib.M.load(url, postParam, function(data) {
                    data = data.data;
                    self.$set("work", data);
                }, "get");
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
       color: #275482; background: white;overflow: hidden; padding: 34px 0; min-width:  900px;
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
        float: left; margin-right: 15px
    }
    .dengji{
        font-size: 18px; color: #f15252; margin-right: 15px
    }
    .dengji:after{
        content: "|";color: black;padding-left: 15px
    }
    .name{
        font-size: 16px; margin: 0 40px 0 14px;
    }
    .yue span{
        color: #0a99e3
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