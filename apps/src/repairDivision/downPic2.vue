<template lang="html">
    <div class="title">
        <h3>图片预览</h3>
    </div>
    <div class="row box">
        <div class="col-sm-8 row picBox">
            <template v-if="loadBigZheZhao==true">
            <a v-if="mulvNumLook.length&&!shanchu" style="position: absolute; top: 32px; left: 47px;z-index: 1;">
                <button v-if="onOff" @click="findAllEndPic('','','del')" type="button" class="btn btn-primary btn-sm">
                    返回
                </button>
                <button v-if="!onOff" @click="findAllEndPic('','','deLook')" type="button" class="btn btn-primary btn-sm">
                    返回
                </button> 
            </a>
            <strong style="position: absolute; top: 38px; left: 100px;z-index: 1;font-weight: normal;">{{mulvNum[mulvNum.length-1]}}</strong>
            <div class="col-sm-12 pic tuBox">
                <div style="color:red; box-shadow: 0px 0px 9px 1px rgba(9, 2, 4, 0);" v-if="myPic.myPic.length==0">
                    暂无修后图片
                </div>
                <div @click="tuyas($event,myPic.imgUrl,myPic.NO,'add',$index)" v-for="myPic in myPic.myPic" data-toggle="modal" data-target=".tuya">
                    <span v-if="myPic.imgUrl" @click.stop="deleteFile($event,myPic.imgUrl)" class="jiaobiao">×</span>
                    <span v-if="!myPic.imgUrl" @click.stop="shanchus($event,myPic)" class="jiaobiao">×</span>
                    <img v-if="!myPic.imgUrl&&onOff" @click.stop="findAllEndPic($event,myPic,'add')" src="../assets/images/wenjianjia3.png" class="wenjian" />
                    <img v-if="!myPic.imgUrl&&!onOff" @click.stop="findAllEndPic($event,myPic,'look')" src="../assets/images/wenjianjia3.png" class="wenjian" />
                    <img v-on:error="yuantu($index,$event)" v-if="myPic.imgUrl" :src="qnyUrl+myPic.imgUrl+'?imageView2/1/w/250/h/250'" class="imgtu" />
                    <p v-if="!myPic.imgUrl" class="beijing">
                        <span class="name">{{myPic}}</span>
                    </p>
                    <p v-if="myPic.imgUrl" class="beijing">
                        <span v-if="!onOff" class="names">{{myPic.imgUrl.split("/")[mulvNum.length+2]}}</span>
                        <span v-if="onOff" class="names">{{myPic.imgUrl.split("/")[mulvNum.length+1]}}</span>
                    </p>
                </div>
            </div>
            </template>
            <template v-if="loadBigZheZhao==false">
                <div class="col-sm-12" style="height: 656px; box-shadow: 0px 2px 25px 0px rgba(22, 22, 22, 0.175); text-align: center;">
                    <div class="loader">
                        <div class="loader-inner ball-spin-fade-loader"> 
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="col-sm-3 listInfo">
            <form v-if="card==addr.per&&!addr.status" class="col-sm-12">
                <div class="row">
                    <div class="col-xs-4 col-sm-2"></div>
                    <div style="margin-bottom: 10px;" class="col-xs-4 col-sm-4">
                        <div @click="xianshi" class="btn btn-default">
                            <i class="iconfont icon-001" style="font-size:14px"></i>
                            <span>上传图片</span>
                        </div>
                    </div>
                    <div style="margin-bottom: 10px;" class="col-xs-4 col-sm-4">
                        <button type="button" class="btn btn-default" data-toggle="modal" data-target=".accept">提交审核</button>
                    </div>
                </div>
            </form>
            <table class="table table-condensedn table-hover">
                <tbody>
                    <tr v-for="tuyaLists in tuyaListss">
                        <td style="text-align:left;padding-left:25px">{{tuyaLists.NO}}<br>{{tuyaLists.name}}</td>
                        <td style="width:100px">
                            <button class="btn btn-primary btn-xs" @click="findXQ($event,$index,'edi')" data-toggle="modal" data-target=".tuya1">详情</button>
                        </td>
                    </tr>
                    <tr v-if="!tuyaList.length">
                        <td>暂无消息</td>
                    </tr>
                </tbody>
            </table>
            <page :turn-page="tupian"></page>
        </div>
        <div class="modal fade tuya1" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" style="width:100%">
                <div style="height:100%;display:table;margin: 0 auto;margin-bottom:20px">
                    <a :href="qnyUrl+tuya.url" target="_blank">
                        <img v-on:error="bad($event)" v-on:load="loading" style="height:870px" :src="qnyUrl+tuya.url+'?imageView2/0/w/2500'" :class="{'touming':finish!='finish'}" class="tupian"/>
                        <div v-if="finish!='finish'" class="load1">
                            <div class="loader"></div>
                        </div>
                    </a>
                </div>
                <div class="col-sm-2"></div>
                <div class="col-sm-8">
                    <textarea disabled v-model="tuya.main" class="form-control" rows="4" cols="12"></textarea>
                </div>
            </div>
        </div>
        <div class="modal fade tuya" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg picMutai" style="width:100%">
                <div style="height:100%;display:table;margin: 0 auto;">
                    <a style="display:table-cell;vertical-align:middle;" :href="qnyUrl+tuya.url" target="_blank">
                        <img v-on:error="bad($event)" v-on:load="loading" style="height:870px" :src="qnyUrl+tuya.url+'?imageView2/0/w/2500'" :class="{'touming':finish!='finish'}" class="tupian"/>
                        <div v-if="finish!='finish'" class="load1">
                            <div class="loader"></div>
                        </div>
                    </a>
                </div>
                <span @click="shangyizhang" class="iconfont icon-aleft"></span>
                <span @click="xiayizhang" class="iconfont icon-aright"></span>
            </div>
        </div>
        <div class="modal fade accept" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>
                            确认审核吗?
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button @click="audit" type="button" class="btn btn-primary sure" data-dismiss="modal">确定</button>
                        <button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade shanchu" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>
                            确认删除该文件夹吗?
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button @click="findAllEndPic($event,shanchu,'look','ALL')" type="button" class="btn btn-primary sure" data-dismiss="modal">确定</button>
                        <button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <lock-page></lock-page>
    </div>
    <pages :turn-page="tupianPage"></pages>
</template>

<script>
    import qiniu from '../components/qiniu.vue'
    import page from '../components/page/pagegai.vue'
    import pages from '../components/page/page.vue'
    import lockPage from '../module/common/lockPage.vue'
    import Lib from '../assets/lib.js'
    import bus from './bus.js'
    export default {
        data: () => ({
            addr: Lib.M.getUrlParams(), //获取地址栏参数
            qnyUrl: Lib.C.qiniu.jsUrl,
            id: sessionStorage.getItem("id"),
            workInfoId: sessionStorage.getItem("workInfoId"),
            host: Lib.C.hostPhotoStudio,
            xsyc: {
                wenjianjia: true,
                tupian: false
            },
            tupianPage: {}, //图片翻页
            tupian: {},
            myPic: { //成图
                "name": "",
                "n": 1,
                "myPic": [],
                "myPics": [],
                "wenjianjia": []
            },
            end: {
                key: "end",
                max_file_size: "100mb"
            },
            tuyaListss: [],
            tuyaList: [],
            type: {},
            tuya: {
                "n": 1
            },
            card: "XT",
            onOff: true, //开关
            mulvNum: [], //目录次数
            mulvNumLook: [], //预览目录次数
            finish: "", //终止
            loadBigZheZhao: false,//数据请求加载
            shanchu :""
        }),
        watch: {},
        created: function() {
            var self = this;
            bus.$on('finishOne', function(data) {
                if (data) {
                    if (self.myPic.name) {
                        self.findAllEndPic("chuan", self.myPic.name);
                    } else {
                        self.findAllEndPic("chuan");
                    }
                }
            });
            bus.$on('finishThree', function(data) {
                if (data == "open") {
                    self.$set("onOff", true);
                    // location.reload();
                } else if (data == "clone") {
                    self.$set("onOff", false);
                }
            });
            if (this.addr.workxtid == this.addr.worksjid) {
                this.$set("card", this.addr.per)
            } else if (this.id == this.addr.workxtid) {
                this.$set("card", "XT")
            } else if (this.id == this.addr.worksjid) {
                this.$set("card", "SJ")
            }
            let dir;
            this.addr.per == 'XT' ? dir = "endXT" : dir = "endSJ"
            this.end.key = dir + this.addr.orderid; //"endXT/"+orderId;
            this.findAllEndPic();
        },
        events: {
            'child-qiniu-data' (obj) {
                if (obj.key) {
                    this.findAllEndPic("1");
                }
            },
            'child-turn-page' (obj) {
                if (obj.type == 'fangong') {
                    this.$set('tuya.n', obj.pageNo);
                    this.xiangqingXYY();
                }
            },
            'child-turn-pageTu' (obj) {
                this.$set('myPic.n', obj.pageNo);
                this.xiayiye();
            }
        },
        ready: function() {
            this.zuoyoujianpan()
        },
        methods: {
            yuantu(i, e) {
                $(e.target).attr('src', this.qnyUrl + this.myPic.myPic[i].imgUrl);
            },
            loading() {
                this.$set("finish", "finish");
            },
            bad(e) {
                if (this.tuya.url) {
                    $(e.target).attr('src', this.qnyUrl + this.tuya.url);
                }
            },
            zuoyoujianpan() {
                var self = this;
                $(document).keydown(function(event) {
                    if (event.keyCode == 37) {
                        self.shangyizhang()
                    } else if (event.keyCode == 39) {
                        self.xiayizhang()
                    }
                })
            },
            xianshi() {
                $(".shangchuan").css("display", "block");
                $(".shangchuan").css("bottom", "0px");
            },
            audit() { //提交审核
                var url = this.host + "v1/work/order/empOrder",
                    self = this,
                    postParam = {};
                postParam = {
                    "id": parseInt(this.addr.id),
                    "status": "WAIT_CHECK"
                };
                if (this.addr.per == "XT") {
                    postParam.newOneFiles = "1";
                } else if (this.addr.per == "SJ") {
                    postParam.newFiles = "1";
                }
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    if (data.code == -1) {
                        location.href = "#index/orderMan"; //"#/index/templateL";
                    }
                }, "put");
            },
            deleteFile(e, name) { //删除单张图片
                var url = this.host + "qiNiu/deleteFile",
                    self = this,
                    postParam = {};
                postParam = {
                    "key": name
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    if (data.code == -1) {
                        self.findAllEndPic("1", self.myPic.name);
                    }
                });
            },
            shanchus(e,myPic) {
                $('.shanchu').modal('show');
                this.$set( "shanchu",myPic );
            },
            deleteAll(data) { //删除文件夹图片
                var url = this.host + "qiNiu/deleteFile",
                    self = this,name="",
                    postParam = {};
                for(var i=0;i<data.length;i++){
                    name = name + data[i].imgUrl +","
                }
                postParam = {
                    "key": name
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    if (data.code == -1) {
                        setTimeout(function(){
                            self.$broadcast('parent-lock-page-off', "文件夹删除中");
                            self.mulvNumLook.pop();
                            self.findAllEndPic("1", self.myPic.name);
                        },1000)
                    }
                });
            },
            findAllEndPic(e, name, addDel, deletes) { //查询订单上传的所有图片
                if(e!="chuan") this.$set('loadBigZheZhao', false);
                if(!deletes){
                    this.$set( "shanchu","" );
                }
                if (addDel == 'add') {
                    this.mulvNumLook.push(name);
                    this.mulvNum.push(name);
                } else if (addDel == 'del') {
                    this.mulvNumLook.pop();
                    this.mulvNum.pop();
                } else if (addDel == 'look') {
                    this.mulvNumLook.push(name);
                } else if (addDel == 'deLook') {
                    this.mulvNumLook.pop();
                }
                if (e) {
                    this.$set("myPic.name", name);
                } else if (!e) {
                    this.$set("myPic.name", '');
                }
                if (this.onOff) {
                    bus.$emit("finishTwo", this.mulvNum);
                }
                bus.$emit("finishFourth", this.mulvNumLook);
                var url = this.host + "qiNiu/bucketManagerFile",
                    self = this,
                    digitalId, dir,
                    postParam = {};
                if (this.addr.type == "XT") {
                    digitalId = this.addr.workxtid;
                } else if (this.addr.type == "SJ") {
                    digitalId = this.addr.worksjid;
                } else if (this.addr.type == "ALL") {
                    if (this.addr.per == "SJ") {
                        digitalId = this.addr.worksjid;
                    } else if (this.addr.per == "XT") {
                        digitalId = this.addr.workxtid;
                    }
                }
                if (this.addr.per == "XT") {
                    dir = "endXT";
                } else if (this.addr.per == "SJ") {
                    dir = "endSJ";
                }
                postParam = {
                    "pageSize": 1000
                };
                var b = '';
                for (var i = 0; i < this.mulvNumLook.length; i++) {
                    b = b + "/" + this.mulvNumLook[i];
                }
                postParam.prefix = (digitalId + this.addr.id + dir + this.addr.title + b).replace(/\,/g, "").replace(/\&/g, "").replace(/\=/g, "").replace(/\ /g, "");
                Lib.M.load(url, postParam, function(data) {
                    data = data.data.list;
                    for (var i = 0; i < data.length; i++) {
                        data[i].uploadTimes = new Date(data[i].uploadTime);
                    }
                    data.sort(function sortDate(a, b) {
                        return b.uploadTimes - a.uploadTimes;
                    })
                    for (var i = 0; i < data.length; i++) {
                        data[i].NO = i + 1;
                    }
                    if(deletes){
                        self.$broadcast('parent-lock-page-on', "文件夹删除中");
                        self.deleteAll(data);
                        return false;
                    }
                    self.$set("myPic.myPic", data);
                    self.$set("myPic.myPics", data);
                    var arr1 = [],
                        arr2 = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].imgUrl.split("/").length > self.mulvNumLook.length + 2) {
                            arr1.push(data[i].imgUrl.split("/")[self.mulvNumLook.length + 1]);
                        }
                        if (data[i].imgUrl.split("/").length == self.mulvNumLook.length + 2) {
                            arr2.push(data[i]);
                        }
                    }
                    self.$set("myPic.myPics", self.distinct(arr1).concat(arr2));
                    // console.log(self.myPic.myPics);
                    // self.$set( "myPic.wenjianjia",self.distinct (arr1) );
                    self.xiayiye();
                    self.$set('loadBigZheZhao', true);
                }, "get");
            },
            findXQ(e, index, type) {
                this.type.index = index;
                this.$set("type.typerukou", type);
                let lingshi = this.tuyaListss[index];
                lingshi = JSON.stringify(lingshi);
                this.$set("tuya", JSON.parse(lingshi));
            },
            xiangqingXYY() { //明细翻页
                this.$set("tuyaListss", this.tuyaList.slice(7 * (this.tuya.n - 1), 7 * this.tuya.n));
            },
            tuyas(e, url, NO, type, index) { //涂鸦
                this.$set("type.index", (index + (this.myPic.n - 1) * 8));
                this.$set("type.typerukou", type);
                this.$set("tuya.main", "");
                this.$set("tuya.url", url);
                this.$set("tuya.name", url.split("/")[1]);
                this.$set("tuya.NO", NO);
                this.$set("finish", "");
            },
            xiayizhang() {
                this.type.index++;
                if (this.type.index > this.myPic.myPics.length - 1) {
                    this.type.index = this.myPic.myPics.length - 1;
                    Lib.M.topRightInfoTips({
                        title: "已经到了最后一张了！"
                    });
                    return false;
                }
                this.$set("finish", "");
                this.$set("tuya.url", this.myPic.myPics[this.type.index].imgUrl);
            },
            shangyizhang() {
                this.type.index--;
                if (this.type.index < 0) {
                    this.type.index = 0;
                    Lib.M.topRightInfoTips({
                        title: "已经到了第一张了！"
                    });
                    return false;
                }
                this.$set("finish", "");
                this.$set("tuya.url", this.myPic.myPics[this.type.index].imgUrl);
            },
            xiayiye(e, page) { //图片翻页
                if(this.myPic.n > Math.ceil(this.myPic.myPics.length/8)){
                    this.myPic.n = Math.ceil(this.myPic.myPics.length/8);
                }
                let allPage = {
                    pageSize: 8,
                    totalCount: this.myPic.myPics.length,
                    pageNo: this.myPic.n
                };
                this.$set("tupianPage", allPage);
                this.$set("myPic.myPic", this.myPic.myPics.slice(8 * (this.myPic.n - 1), 8 * (this.myPic.n)));
            },
            distinct(arr) {
                var obj = {},
                    i = 0,
                    len = 0;
                if (Array.isArray(arr) && arr.length > 0) {
                    len = arr.length;
                    for (i = 0; i < len; i += 1) {
                        obj[arr[i]] = arr[i];
                    }
                    return Object.keys(obj);
                }
                return [];
            }
        },
        components: {
            page,
            qiniu,
            lockPage,
            pages
        }
    }
</script>
<style type="text/css" scoped>
    /*模态框*/
    .loader {
        box-sizing: border-box;
        display: flex;
        flex: 0 1 auto;
        flex-direction: column;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 25%;
        width: 100%;
        height: 540px;
        align-items: center;
        justify-content: center;
    }
    .ball-spin-fade-loader {
        position: relative;
    }
    @-webkit-keyframes ball-spin-fade-loader {
        0%, 39%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }

    @keyframes ball-spin-fade-loader {
        50% { opacity: 0; }
        0%, 39%, 100%{ opacity: 1; } 
    }
    .ball-spin-fade-loader {
        position: relative; 
    }
    .ball-spin-fade-loader > div:nth-child(1) {
        top: 25px;
        left: 0;
        -webkit-animation-delay: 0s;
                 animation-delay: 0s;  }
    .ball-spin-fade-loader > div:nth-child(2) {
        top: 17.04545px;
        left: 17.04545px;
        -webkit-animation-delay: -0.1s;
                 animation-delay: -0.1s;  }
    .ball-spin-fade-loader > div:nth-child(3) {
        top: 0;
        left: 25px;
        -webkit-animation-delay: -0.2s;
                 animation-delay: -0.2s;  }
    .ball-spin-fade-loader > div:nth-child(4) {
        top: -17.04545px;
        left: 17.04545px;
        -webkit-animation-delay: -0.3s;
                 animation-delay: -0.3s;  }
    .ball-spin-fade-loader > div:nth-child(5) {
        top: -25px;
        left: 0;
        -webkit-animation-delay: -0.4s;
                 animation-delay: -0.4s;  }
    .ball-spin-fade-loader > div:nth-child(6) {
        top: -17.04545px;
        left: -17.04545px;
        -webkit-animation-delay: -0.5s;
                 animation-delay: -0.5s;  }
    .ball-spin-fade-loader > div:nth-child(7) {
        top: 0;
        left: -25px;
        -webkit-animation-delay: -0.6s;
                 animation-delay: -0.6s;  }
    .ball-spin-fade-loader > div:nth-child(8) {
        top: 17.04545px;
        left: -17.04545px;
        -webkit-animation-delay: -0.7s;
                 animation-delay: -0.7s;  }
    .ball-spin-fade-loader > div {
        animation: ball-spin-fade-loader 1s infinite ease-in-out both;
        background-color: #797979;
        width: 12px;
        height: 12px;
        border-radius: 100%;
        margin: 2px;
        -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
        position: absolute;
    }     
    .title {
        text-align: center;
        padding: 32px 0;
        background: #ecedf3;
        border-bottom: solid #ddd 1px;
    }
    
    .touming {
        opacity: 0
    }
    
    .load1 .loader,
    .load1 .loader:before,
    .load1 .loader:after {
        background: #FFF;
        -webkit-animation: load1 1s infinite ease-in-out;
        animation: load1 1s infinite ease-in-out;
        width: 1em;
        height: 4em;
    }
    
    .load1 .loader:before,
    .load1 .loader:after {
        position: absolute;
        top: 0;
        content: '';
    }
    
    .load1 .loader:before {
        left: -1.5em;
    }
    
    .load1 .loader {
        text-indent: -9999em;
        margin: 40% auto;
        position: relative;
        font-size: 11px;
        -webkit-animation-delay: 0.16s;
        animation-delay: 0.16s;
    }
    
    .load1 .loader:after {
        left: 1.5em;
        -webkit-animation-delay: 0.32s;
        animation-delay: 0.32s;
    }
    
    @-webkit-keyframes load1 {
        0%,
        80%,
        100% {
            box-shadow: 0 0 #FFF;
            height: 4em;
        }
        40% {
            box-shadow: 0 -2em #ffffff;
            height: 5em;
        }
    }
    
    @keyframes load1 {
        0%,
        80%,
        100% {
            box-shadow: 0 0 #FFF;
            height: 4em;
        }
        40% {
            box-shadow: 0 -2em #ffffff;
            height: 5em;
        }
    }
    
    .load1 {
        position: absolute;
        top: 38%;
        left: 48%;
    }
    
    h3 {
        margin: 0;
        padding: 0;
    }
    
    .picMutai {
        height: 100%;
        margin-top: 0
    }
    
    .picMutai .modal-content {
        background: rgba(0, 0, 0, 0) !important;
        -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
        border: 0
    }
    
    .picMutai span {
        font-size: 50px;
        font-weight: bold;
        color: white;
        position: fixed;
        top: 46%
    }
    
    .picMutai .icon-aleft {
        left: 100px
    }
    
    .picMutai .icon-aright {
        right: 100px
    }
    
    .picMutai span:hover {
        cursor: pointer;
        color: #ed9a0f;
    }
    
    .table tr th,
    .table tr td {
        text-align: center;
        padding: 10px 0;
    }
    
    .box {
        padding: 36px 80px;
    }
    
    .table {
        margin-top: 50px;
    }
    
    .table td {
        vertical-align: middle
    }
    
    .tuBox {
        padding-top: 80px;
    }
    
    .wenjianBigBox {
        padding: 80px 100px;
    }
    
    .wenjianBox {
        box-shadow: 0px 0px 9px 1px rgba(9, 2, 4, 0.257);
        border-radius: 4px;
    }
    
    .img-thumbnail {
        box-shadow: 0px 3px 5px 0px rgba(9, 2, 4, 0.2);
    }
    
    .names {
        float: left;
    }
    
    .pic {
        height: 656px;
        box-shadow: 0px 2px 25px 0px rgba(22, 22, 22, 0.175);
        text-align: center;
    }
    
    .pic div {
        width: 22%;
        margin: 17px 1.5%;
        position: relative;
        float: left;
        box-shadow: 0px 0px 9px 1px rgba(9, 2, 4, 0.257)
    }
    
    .pic img {
        width: 100%;
    }
    
    .picBox>span {
        width: 4%;
        font-size: 42px;
        font-weight: bold;
        margin-top: 39%;
        cursor: pointer;
        float: left;
    }
    
    .listInfo {
        background: white;
        padding: 20px 0;
        border-radius: 10px;
        margin-top: 5px;
        margin-left: 5%;
        box-shadow: 0px 3px 15px 0px rgba(9, 2, 4, 0.143);
        min-height: 650px;
    }
    
    .fangongmingxi {
        text-align: center;
        border-top: solid 1px #eaeaea;
        margin-top: 24px;
        padding-top: 34px;
        padding-bottom: 15px;
    }
    
    .foot {
        text-align: center;
    }
    
    .sure {
        border-radius: 50px;
    }
    
    .tupian {
        margin-bottom: 0;
        width: inherit;
    }
    
    .jiaobiao {
        width: 15px !important;
        height: 15px;
        background: red;
        display: inline-block;
        position: absolute !important;
        top: 0;
        cursor: pointer;
        font-size: 15px;
        right: 0;
        color: white;
        border-radius: 100%;
        text-align: center;
        line-height: 15px;
        z-index: 2
    }
    
    .NO {
        width: 24px;
        height: 24px;
        line-height: 23px;
        border: solid 1px white;
        border-radius: 50%;
        margin: 3px 5px 0 10px;
        font-size: 12px;
        float: left;
    }
    
    .beijing {
        position: absolute !important;
        bottom: 0px;
        left: 0px;
        background: rgba(0, 0, 0, 0.5);
        text-align: center;
        margin: 0;
        width: 100% !important;
        color: white;
        height: 30px;
        line-height: 30px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    
    .imgtu {
        box-shadow: 0 0 9px 0px rgba(9, 2, 4, 0.257);
    }
    
    .topleft {
        width: 0;
        position: absolute;
        left: 0;
        top: 0;
        height: 0;
        border-top: 45px solid #ed9a0f;
        border-right: 45px solid transparent;
    }
    
    .fangong {
        position: absolute;
        left: 2px;
        top: 2px;
        color: white;
        font-size: 12px;
    }
    /*模态框*/
    
    .modal-sm {
        width: 450px;
    }
    
    .modal-sm .modal-content {
        padding: 46px 33px 30px 33px;
    }
    
    .modal-sm .modal-footer {
        border: 0;
        text-align: center;
    }
    
    .modal-sm .modal-body p {
        font-size: 18px;
        text-align: center;
    }
    
    .sure,
    .cancel {
        border-radius: 50px;
        width: 90px;
        height: 36px;
    }
    /*遮罩层 开始*/
    
    .progressBar {
        border: solid 2px #86A5AD;
    }
    
    .progressBar {
        background: white;
        width: 500px;
        display: block;
        top: 40%;
        left: 36%;
        margin-top: -14px;
        padding: 10px;
        text-align: left;
        line-height: 27px;
        font-weight: bold;
        position: fixed;
        z-index: 2001;
        border-radius: 10px;
    }
    
    .background1 {
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0.4;
        filter: alpha(opacity=40);
        background: white;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
        background-color: #666666;
    }
</style>