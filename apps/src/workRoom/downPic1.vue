<template lang="html">
	<div class="title">
    	<h3>图片预览</h3>
	</div>
	<div class="row box">
		<div class="col-sm-8 row picBox">
            <template v-if="loadBigZheZhao==true">
			<a v-if="mulvNum.length" style="position: absolute; top: 32px; left: 47px;z-index: 1;">
				<button @click="findAllEndPic('','','del')" type="button" class="btn btn-primary btn-sm">
					返回
				</button>
			</a>
			<strong style="position: absolute; top: 38px; left: 100px;z-index: 1;font-weight: normal;">{{mulvNum[mulvNum.length-1]}}</strong>
			<div class="col-sm-12 pic tuBox">
				<div style="color:red; box-shadow: 0px 0px 9px 1px rgba(9, 2, 4, 0);" v-if="myPic.myPic.length==0">
					暂无修后图片
				</div>
				<div @click="tuyas($event,myPic.imgUrl,myPic.NO,'add',$index)" v-for="myPic in myPic.myPic" data-toggle="modal" data-target=".tuya">
					<img v-if="!myPic.imgUrl" @click.stop="findAllEndPic($event,myPic,'add')" src="../assets/images/wenjianjia3.png" class="wenjian" />
					<img v-on:error="yuantu($index,$event)" v-if="myPic.imgUrl" :src="qnyUrl+myPic.imgUrl+'?imageView2/1/w/250/h/250'" class="imgtu" />
					<p v-if="!myPic.imgUrl" class="beijing">
						<span class="name">{{myPic}}</span>
					</p>
					<p v-if="myPic.imgUrl" class="beijing">
						<span class="names">{{myPic.imgUrl.split("/")[mulvNum.length+1]}}</span>
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
			<form class="col-sm-12">
				<div class="row">
					<div class="row col-sm-12">
						<div class="col-sm-4"></div>
					</div>
				</div>
			</form>
			<p class="col-sm-12 fangongmingxi">返工明细</p>
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
						<img v-on:load="loading" v-on:error="bad($event)" style="height:870px" :src="qnyUrl+tuya.url+'?imageView2/0/w/2500'" :class="{'touming':finish!='finish'}" class="tupian"/>
                        <div v-if="finish!='finish'" class="load1">
                            <div class="loader"></div>
                        </div>
					</a>
				</div>
				<div class="col-sm-2"></div>
				<div class="col-sm-8" style="margin-bottom:20px">
					<textarea disabled v-model="tuya.main" class="form-control" rows="4" cols="12"></textarea>
				</div>
			</div>
		</div>
		<div class="modal fade tuya" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg picMutai" style="width:100%">
				<div style="height:100%;display:table;margin: 0 auto;">
					<a style="display:table-cell;vertical-align:middle;" :href="qnyUrl+tuya.url" target="_blank">
						<img v-on:load="loading" v-on:error="bad($event)" style="height:870px" :src="qnyUrl+tuya.url+'?imageView2/0/w/2500'" :class="{'touming':finish!='finish'}" class="tupian"/>
                        <div v-if="finish!='finish'" class="load1">
                            <div class="loader"></div>
                        </div>
					</a>
				</div>
				<span @click="shangyizhang" class="iconfont icon-aleft"></span>
				<span @click="xiayizhang" class="iconfont icon-aright"></span>
			</div>
		</div>
		<lock-page></lock-page>
	</div>
	<pages :turn-page="tupianPage"></pages>
</template>

<script>
    import page from '../components/page/pagegai.vue'
    import pages from '../components/page/page.vue'
    import Lib from '../assets/lib.js'
    import lockPage from '../module/common/lockPage.vue'
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
            tuyaListss: [],
            tuyaList: [],
            type: {},
            tuya: {
                "n": 1
            },
            down: {
                fangong: {},
                yuantu: {}
            },
            mulvNum: [], //目录次数
             loadBigZheZhao: false,//数据请求加载
            finish: "" //终止
        }),
        watch: {},
        created: function() {
            this.findRework();
            this.findAllEndPic();
        },
        events: {
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
                        self.shangyizhang();
                    } else if (event.keyCode == 39) {
                        self.xiayizhang();
                    }
                })
            },
            findAllEndPic(e, name, addDel) { //查询订单上传的所有图片
                this.$set('loadBigZheZhao', false);
                if (addDel == 'add') {
                    this.mulvNum.push(name);
                } else if (addDel == 'del') {
                    this.mulvNum.pop();
                }
                if (e) {
                    this.$set("myPic.name", name);
                } else if (!e) {
                    this.$set("myPic.name", '');
                }
                bus.$emit("finishTwo", this.mulvNum);
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
                for (var i = 0; i < this.mulvNum.length; i++) {
                    b = b + "/" + this.mulvNum[i];
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
                    self.$set("myPic.myPic", data);
                    self.$set("myPic.myPics", data);
                    var arr1 = [],
                        arr2 = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].imgUrl.split("/").length > self.mulvNum.length + 2) {
                            arr1.push(data[i].imgUrl.split("/")[self.mulvNum.length + 1]);
                        }
                        if (data[i].imgUrl.split("/").length == self.mulvNum.length + 2) {
                            arr2.push(data[i]);
                        }
                    }
                    self.$set("myPic.myPics", self.distinct(arr1).concat(arr2));
                    self.xiayiye();
                    self.$set('loadBigZheZhao', true);
                }, "get");
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
            },
            findRework() {
                var url = this.host + "v1/photo/order/rework/" + this.addr.orderid,
                    self = this,
                    postParam = {};
                postParam = {
                    "type": this.addr.per
                }
                Lib.M.load(url, postParam, function(data) {
                    if (data.code == 8) {
                        return false;
                    }
                    data = data.data[0];
                    self.$set("tuyaList", JSON.parse(data.content));
                    console.log(self.tuyaList);
                    self.lists();
                }, "get");
            },
            rework() {
                var url = this.host + "v1/photo/order/rework",
                    self = this,
                    postParam = {};
                postParam = {
                    "orderInfoId": parseInt(this.addr.orderid),
                    "content": JSON.stringify(this.tuyaList),
                    "img": this.addr.per,
                    "type": this.addr.per
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    if (data.code == -1) {
                        location.href = "#/index/recOrder";
                    }
                });
            },
            findXQ(e, index, type) {
                this.type.index = index;
                this.$set("type.typerukou", type);
                let lingshi = this.tuyaListss[index];
                lingshi = JSON.stringify(lingshi);
                this.$set("tuya", JSON.parse(lingshi));
            },
            del(e, index) { //删除详情
                this.tuya.index = index;
            },
            demingxi() { //删除详情
                this.tuyaList.splice((this.tuya.n - 1) + this.tuya.index, 1);
                this.tuyaListss.splice(this.tuya.index, 1);
            },
            lists() { //返工详情
                
                this.$set("tuyaListss", this.tuyaList.slice(7 * (this.tuya.n - 1), 7 * this.tuya.n));
                if (this.tuyaList.length == 0) {
                    this.$set("tupian", {});
                    return false;
                }
                var page = {
                    pageSize: 7,
                    totalCount: this.tuyaList.length,
                    pageNo: this.tuya.n,
                    type: 'fangong'
                };
                this.$set("tupian", page);
            },
            xiangqingXYY: function() { //明细翻页
                this.$set("tuyaListss", this.tuyaList.slice(7 * (this.tuya.n - 1), 7 * this.tuya.n));
            },
            tuyas(e, url, NO, type, index) { //涂鸦
                this.$set("type.index", (index + (this.myPic.n - 1) * 8));
                this.$set("type.typerukou", type);
                this.$set("tuya.main", "");
                this.$set("tuya.url", url);
                this.$set("tuya.name", url.split("/")[1].split("_")[0]);
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
        },
        components: {
            page,
            lockPage,
            pages
        }
    }
</script>
<style scoped>
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
        margin-top: 0;
    }
    
    .picMutai .modal-content {
        background: rgba(0, 0, 0, 0) !important;
        -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
        border: 0;
    }
    
    .picMutai span {
        font-size: 50px;
        font-weight: bold;
        color: white;
        position: fixed;
        top: 46%;
    }
    
    .picMutai .icon-aleft {
        left: 100px;
    }
    
    .picMutai .icon-aright {
        right: 100px;
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
        vertical-align: middle;
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
        box-shadow: 0px 0px 9px 1px rgba(9, 2, 4, 0.257);
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
        width: 100% !important;
        color: white;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    
    .imgtu {
        box-shadow: 0 0 9px 0px rgba(9, 2, 4, 0.257);
    }
    
    .listInfo {
        background: white;
        padding: 0 0 20px 0;
        border-radius: 10px;
        margin-top: 5px;
        min-height: 650px;
        margin-left: 5%;
        box-shadow: 0px 3px 15px 0px rgba(9, 2, 4, 0.143);
    }
    
    .fangongmingxi {
        text-align: center;
        border-top: solid 1px #eaeaea;
        padding: 20px 0 10px 0;
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
    
    .topleft {
        width: 0;
        position: absolute;
        left: 0;
        top: 0;
        height: 0;
        border-right: 45px solid transparent;
        border-top: 45px solid #ed9a0f;
    }
    
    .fangong {
        position: absolute;
        left: 2px;
        top: 2px;
        color: white;
        font-size: 12px;
    }
</style>