<template lang="html">
	<div class="title">
    	<h3 @click="">图片预览</h3>
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
						<div class="col-sm-5"></div>
						<div class="col-sm-3">
							<button data-toggle="modal" data-target=".fangongMT" type="button" class="btn btn-primary btn-xs">确认返工</button>
						</div>
					</div>
				</div>
			</form>
			<p class="col-sm-12 fangongmingxi">返工明细</p>
			<table class="table table-condensedn table-hover">
				<tbody>
					<tr v-for="tuyaLists in tuyaListss">
						<td style="text-align:left;padding-left:25px">{{tuyaLists.NO}}<br>{{tuyaLists.name}}</td>
						<td style="width:100px">
							<button class="btn btn-primary btn-xs" @click="findXQ($event,$index,'edi')" data-toggle="modal" data-target=".tuya">详情</button>
							<button class="btn btn-default btn-xs" @click="del($event,$index)" data-toggle="modal" data-target=".delmodal">删除</button>
						</td>
					</tr>
					<tr v-if="!tuyaList.length">
						<td>暂无消息</td>
					</tr>
				</tbody>
			</table>
			<page :turn-page="tupian"></page>
		</div>
		<div class="modal fade tuya" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg picMutai" style="width:100%">
				<div class="modal-content" style="padding: 15px;background:rgba(0,0,0,0);box-shadow: 0 5px 15px rgba(0,0,0,0); border: 0;">
					<div class="modal-body row" style="padding: 0 10px 0px 15px;background:rgba(0,0,0,0)">
						<t-scrawl :scrawl-option.sync="scrawlOption"></t-scrawl>
						<div class="col-sm-2"></div>
						<div class="col-sm-8">
							<textarea placeholder="备注：" v-model="tuya.main" class="form-control" rows="4" cols="12"></textarea>
						</div>
					</div>
					<template v-if='type.typerukou!="edi"'>
						<span @click="shangyizhang" class="iconfont icon-aleft"></span>
						<span @click="xiayizhang" class="iconfont icon-aright"></span>
					</template>
<div class="modal-footer foot" style="border:0">
    <button v-if="type.typerukou" @click="lists" type="button" class="btn btn-default sure" data-dismiss="modal">
							确认返工
						</button>
    <button v-if="!type.typerukou" @click="lists" type="button" class="btn btn-default sure" data-dismiss="modal">
							确认修改
						</button>
    <button v-if="type.typerukou" type="button" class="btn btn-default sure" data-dismiss="modal">
							取消返工
						</button>
    <button v-if="!type.typerukou" type="button" class="btn btn-default sure" data-dismiss="modal">
							取消修改
						</button>
</div>
</div>
</div>
</div>
<!--删除模态框-->
<div class="modal fade delmodal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <p>
                    您确定删除该明细么？
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" @click="demingxi" class="btn btn-primary sure" data-dismiss="modal">确定</button>
                <button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade fangongMT" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <p>
                    您确定返工吗？
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" @click="rework" class="btn btn-primary sure" data-dismiss="modal">确定</button>
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
    import TScrawl from '../module/scrawl/scrawl.vue'
    import page from '../components/page/pagegai.vue'
    import pages from '../components/page/page.vue'
    import lockPage from '../module/common/lockPage.vue'
    import Lib from '../assets/lib.js'
    import bus from './bus.js'
    export default {
        data: () => ({
            scrawlOption: {
                sourceImg: '', //原图地址，必传
                key: 'yinglou' //路径，
            },
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
            orderInfo: {}, //订单
            down: {
                fangong: {},
                yuantu: {},
                yuantuXZ: {}
            },
            arrBad:[],//20M大图
            loadBigZheZhao: false,//数据请求加载
            mulvNum: [] //目录次数
        }),
        
        created: function() {
            this.scrawlOption.key = "yinglou/" + this.id + "/tuya";
            this.findRework();
            this.findAllEndPic();
            this.photoOrder();
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
                this.arrBad.push(i);
                $(e.target).attr('src', this.qnyUrl + this.myPic.myPic[i].imgUrl);
            },
            photoOrder() {
                var url = this.host + "v1/photo/order/photoOrder/" + this.id + "/" + parseInt(this.addr.id);
                var self = this;
                Lib.M.load(url, {}, function(data) {
                    self.$set("orderInfo", data.data)
                }, "get");
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
            findXQ(e, index, type) {
                this.type.index = index;
                this.$set("type.typerukou", type);
                let lingshi = this.tuyaListss[index];
                lingshi = JSON.stringify(lingshi);
                this.$set("tuya", JSON.parse(lingshi));
                this.$set('scrawlOption.show', true);
                this.$set('scrawlOption.sourceImg', this.qnyUrl + this.tuya.url);
                this.$broadcast('child-msg', "123");
            },
            fangda() {
                var a = document.createElement('a');
                var url = this.scrawlOption.sourceImg.split("?")[0]
                a.href = url;
                a.target = '_blank';
                a.click();
                window.URL.revokeObjectURL(url); //释放 url 内容
            },
            tuyas(e, url, NO, type, index) { //涂鸦
                this.$set("type.index", (index + (this.myPic.n - 1) * 8));
                this.$set("type.typerukou", type);
                this.$set("tuya.main", "");
                this.$set("tuya.name", url.split("/")[this.mulvNum.length + 1]);
                this.$set("tuya.URL", url);
                this.$set("tuya.NO", this.mulvNum);
                this.$set('scrawlOption.show', true);
                for(var i=0;i<this.arrBad.length;i++){
                    if(index==this.arrBad[i]){
                        this.$broadcast('child-bigPic', "bad");
                        this.$set('scrawlOption.sourceImg', this.qnyUrl + this.tuya.URL);
                        return false
                    }
                }
                this.$broadcast('child-bigPic', "good");
                if( this.scrawlOption.sourceImg != (this.qnyUrl + url + '?imageView2/0/h/870') ){
                    this.$broadcast('child-msg', "123");
                }
                this.$set('scrawlOption.sourceImg', this.qnyUrl + url + '?imageView2/0/h/870');
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
                this.$set("tuya.name", this.myPic.myPics[this.type.index].imgUrl.split("/")[this.mulvNum.length + 1]);
                for(var i=0;i<this.arrBad.length;i++){
                    if(this.type.index-(this.myPic.n - 1) * 8==this.arrBad[i]){
                        this.$broadcast('child-bigPic', "bad");
                        this.$set('scrawlOption.sourceImg', this.qnyUrl + this.myPic.myPics[this.type.index].imgUrl);
                        return false
                    }
                }
                this.$broadcast('child-bigPic', "good");
                this.$broadcast('child-msg', "123");
                this.$set('scrawlOption.sourceImg', this.qnyUrl + this.myPic.myPics[this.type.index].imgUrl + '?imageView2/0/h/870');
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
                this.$set("tuya.name", this.myPic.myPics[this.type.index].imgUrl.split("/")[this.mulvNum.length + 1]);
                for(var i=0;i<this.arrBad.length;i++){
                    if(this.type.index-(this.myPic.n - 1) * 8==this.arrBad[i]){
                        this.$broadcast('child-bigPic', "bad");
                        this.$set('scrawlOption.sourceImg', this.qnyUrl + this.myPic.myPics[this.type.index].imgUrl);
                        return false
                    }
                }
                this.$broadcast('child-bigPic', "good");
                this.$broadcast('child-msg', "123");
                this.$set('scrawlOption.sourceImg', this.qnyUrl + this.myPic.myPics[this.type.index].imgUrl + '?imageView2/0/h/870');
            },
            lists() { //返工详情
                const scrawlCanvas = this.scrawlOption.scrawlCanvas;
                if (scrawlCanvas) {
                    this.putb64(scrawlCanvas.toDataURL("image/jpeg", 0.9));
                }
            },
            out() {
                this.$set("tuya.url", this.scrawlOption.scrawlSrc);
                if (this.type.typerukou == "add") {
                    if (this.orderInfo.reworkNum == 3) {
                        Lib.M.topRightInfoTips({
                            title: "一个订单最多返工三次！"
                        });
                        return false;
                    }
                    let lingshi = this.tuya;
                    lingshi = JSON.stringify(lingshi);
                    this.tuyaList.unshift(JSON.parse(lingshi));
                } else if (this.type.typerukou == "edi") {
                    if (this.orderInfo.reworkNum == 3) {
                        Lib.M.topRightInfoTips({
                            title: "一个订单最多返工三次！"
                        });
                        return false;
                    }
                    let lingshi = this.tuya;
                    lingshi = JSON.stringify(lingshi);
                    this.$set("tuyaList[(this.tuya.n-1)+this.type.index]", JSON.parse(lingshi))
                }
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
            //上传至七牛
            putb64(b64) {
                const self = this;
                const token = Lib.M.load(this.host + Lib.C.qiniu.URL, '', '', 'GET').data.result;
                const pic = b64.split("base64,")[1];
                const optionKey = this.scrawlOption.key ? this.scrawlOption.key : 'unPath';
                let name = new Date().getTime();
                let key = Lib.M.b64EncodeUnicode(optionKey + '/' + name).replace(/\|/g, '%7c').replace(/\+/g, '-').replace(/\//g, '_');
                let url = "http://upload.qiniu.com/putb64/-1/key/" + key + "/";
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            const getUrl = JSON.parse(xhr.responseText).key;
                            self.$set('scrawlOption.scrawlSrc', getUrl);
                            self.out();
                            self.$set('scrawlOption.show', false);
                        }
                    }
                };
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-Type", "application/octet-stream");
                xhr.setRequestHeader("Authorization", 'UpToken ' + token);
                xhr.send(pic);
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
                    for (var i = 0; i < data.length; i++) {
                        data[i].NO = i + 1;
                    }
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
                    if (!e) {
                        self.down.yuantu = self.myPic.myPic;
                    }
                    self.xiayiye();
                    self.$set('loadBigZheZhao', true);
                }, "get");
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
                    self.lists();
                }, "get");
            },
            deleteFile(e, name) { //删除图片
                var url = this.host + "qiNiu/deleteFile",
                    self = this,
                    arr1 = [],
                    arr2 = [],
                    imgUrls = "",
                    arr3 = [],
                    postParam = {};
                for (var i = 0; i < this.tuyaList.length; i++) {
                    arr1.push(this.tuyaList[i].URL);
                }
                for (var i = 0; i < this.down.yuantu.length; i++) {
                    arr2.push(this.down.yuantu[i].imgUrl)
                }
                arr3 = arr1.filter(function(v) {
                    return arr2.indexOf(v) > -1
                });
                if (arr3.length > 0) {
                    for (var i = 0; i < arr3.length; i++) {
                        imgUrls = imgUrls + arr3[i] + ",";
                    }
                    postParam = {
                        "key": imgUrls
                    };
                    Lib.M.load(url, JSON.stringify(postParam), function(data) {
                        Lib.M.topRightInfoTips({
                            title: data.message
                        });
                        if (data.code == -1) {
                            location.href = "#/index/orderMan";
                        }
                    });
                } else {
                    location.href = "#/index/orderMan";
                }
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
                    if (data.code == -1) {
                        self.passBy();
                    }
                });
            },
            passBy: function() { //返工
                var url = this.host + "v1/photo/order/photoOrder",
                    self = this,
                    postParam = {};
                postParam = {
                    "id": parseInt(this.addr.id),
                    "status": "REWORK",
                    "reworkDescribe": "FG",
                    "reworkType": this.addr.type
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    if (data.code == -1) {
                        self.deleteFile();
                    }
                }, "put");
            },
            del(e, index) { //删除详情
                this.tuya.index = index;
            },
            demingxi() { //删除详情
                this.tuyaList.splice((this.tuya.n - 1) + this.tuya.index, 1);
                this.tuyaListss.splice(this.tuya.index, 1);
            },
            xiangqingXYY: function() { //明细翻页
                this.$set("tuyaListss", this.tuyaList.slice(7 * (this.tuya.n - 1), 7 * this.tuya.n));
            },
            bale() { //打包下载
                this.$broadcast('parent-lock-page-on', 123);
                var url = this.host + "qiNiu/fileZip",
                    self = this,
                    imgUrls = "",
                    arr1 = [],
                    arr2 = [],
                    postParam = {};
                for (var i = 0; i < this.tuyaList.length; i++) {
                    arr1.push(this.tuyaList[i].URL);
                }
                for (var i = 0; i < this.down.yuantu.length; i++) {
                    arr2.push(this.down.yuantu[i].imgUrl)
                }
                for (var i = 0; i < arr2.length; i++) {
                    for (var j = 0; j < arr1.length; j++) {
                        if (arr2[i] == arr1[j]) {
                            arr2.splice(i, 1);
                            i = i - 1;
                        }
                    }
                }
                for (var i = 0; i < arr2.length; i++) {
                    imgUrls = imgUrls + (this.qnyUrl + arr2[i]) + ",";
                }
                postParam = {
                    "imgUrl": imgUrls,
                    "keys": this.myPic.myPics[0].imgUrl,
                    "zipName": this.addr.title + '.zip'
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    if (data.data.result) {
                        self.findbaleSess(data.data.result);
                    }
                });
            },
            //查询是否打包成功
            findbaleSess: function(id) {
                var url = this.host + "qiNiu/isSuccess",
                    self = this,
                    postParam = {};
                postParam = {
                    "id": id,
                };
                Lib.M.load(url, postParam, function(data) {
                    if (data.code == 0) {
                        self.generateUrl(data.items[0].key)
                    } else if (data.code == 2) {
                        setTimeout(function() {
                            self.findbaleSess(id)
                        }, 500)
                    } else if (data.code == 1) {
                        setTimeout(function() {
                            self.findbaleSess(id)
                        }, 500)
                    }
                }, "get");
            },
            generateUrl: function(key) {
                this.$broadcast('parent-lock-page-off', 123);
                var url = this.host + "qiNiu/downLoadUrl",
                    self = this,
                    postParam = {};
                postParam = {
                    "key": key,
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    var a = document.createElement('a');
                    var url = data.data.result;
                    var filename = '';
                    a.href = url;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(url); //释放 url 内容
                });
            },
            xiayiye: function(e, page) { //图片翻页
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
            TScrawl,
            lockPage,
            pages
        }
    }
</script>
<style scoped>
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
    
    h3 {
        margin: 0;
        padding: 0;
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
    
    .picMutai span {
        font-size: 50px;
        font-weight: bold;
        color: white;
        position: fixed;
        top: 360px;
    }
    
    .picMutai .icon-aleft {
        left: 70px
    }
    
    .picMutai .icon-aright {
        right: 70px
    }
    
    .picMutai span:hover {
        cursor: pointer;
        color: #ed9a0f;
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
    
    .pic div {
        width: 17%;
        margin: 9px 1.4%;
        position: relative;
        float: left;
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
    }
    
    .picBox>span:hover {
        color: #ed9a0f;
    }
    
    .listInfo {
        background: white;
        padding: 20px 0;
        border-radius: 10px;
        margin-top: 5px;
        box-shadow: 0px 3px 15px 0px rgba(9, 2, 4, 0.143);
        min-height: 650px;
        margin-left: 5%;
    }
    
    .fangongmingxi {
        text-align: center;
        border-top: solid 1px #eaeaea;
        margin-top: 16px;
        padding-top: 10px;
        padding-bottom: 0px;
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
    
    .foot {
        text-align: center;
    }
    
    .sure {
        border-radius: 50px;
    }
    
    .tupian {
        min-height: 100px;
        width: 100%;
        margin-bottom: 30px;
        background: rgba(0, 0, 0, 0);
    }
    /*模态框*/
    
    .modal-sm {
        width: 450px;
    }
    
    .modal-sm .modal-content {
        padding: 71px 33px 30px 33px;
    }
    
    .modal-sm .tuya {
        padding: 20px;
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
</style>