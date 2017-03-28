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
                    <li>质量满意度：{{work.massScore}}&nbsp;&nbsp;回件满意度：{{work.satisfyScore}}</li>
                    <li>员工：{{emp}}</li>
                    <li>单量：{{work.orderNum}}</li>
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
</template>
<script>
	import sideBar from './common/sideBar.vue'
    import websocket from './common/websocket.vue'
    import Lib from '../assets/lib.js'
    export default {
    	data: () => ({
            id: sessionStorage.getItem("id"),
            qnyUrl:Lib.C.qiniu.jsUrl,
            host: Lib.C.hostPhotoStudio,
            work:{},
            emp:1
        }),
        created: function () {
            this.works();
            this.empList();
        },
        ready: function () {  },
        methods: {
            empList (){
                var url = this.host+'v1/work/emp/'+this.id,
                    postParam = {},
                    self = this;
                postParam = {
                    "pageNo":this.pageNo,
                    "pageSize":10
                };
                Lib.M.load(url, postParam ,function(data){
                    if(data.code==8){
                        self.$set("emp",0);
                        return false;
                    };
                    data = data.data;
                    self.$set("emp",data.totalCount);
                },"get");
            },
            works (){
                var url = this.host+'v1/work/'+this.id,
                    postParam = {},
                    self = this;
                Lib.M.load(url, {},function(data){
                    self.$set("work",data.data);
                },"GET");
            }
        },
        components: {
            sideBar,
            websocket
        }
    }
</script>
<style scoped>
    .toubuNav{
       color: #275482; background: white; overflow: hidden;padding: 34px 0; min-width: 1250px;
    }
    .toubuNav .logo{
        float: left; margin-left: 80px;margin-top: 10px;
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
        content: "|";color: black;padding-left: 15px;
    }
    .name{
        font-size: 16px; margin: 0 40px 0 14px;
    }
    .yue span{
        color: #0a99e3
    }
    .chongzhi:after{
        content: "|";color: black;padding-left: 15px
    }
    .tuichu{
        border-radius: 50px; border-radius: 50px; margin:0 20px; padding: 2px 12px; font-size: 15px; background: #275482
    }
    .neirong img{
        width: 47px;height: 47px; border-radius: 50%
    }
    .content{
        margin:0 0 0 138px; overflow: hidden; background: white; 
    }
</style>