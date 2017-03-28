<template lang="html">
	<div class="container-fluid">
		<div class="row" style="min-width: 1208px;min-height: 834px;">
			<div class="col-md-4 zuobian">
				<div class="triangle-left"></div>
				<div class="yinying">
					<div class="diyibu">
						<div class="NO" :class="{'bianliangXZ': tempInfoId.way=='2'||tempInfoId.workInfoId}">1</div>
						<div class="gongZS">
							<label @click="workAll" class="diyi">
								<input v-model="tempInfoId.way" checked type="radio" name="zhi" value="1">
								<span class="meixuan" :class="{'xuanZ': tempInfoId.way=='1'}">工作室</span>
								<span class="nicheng" v-if="tempInfoId.way=='1'&&tempInfoId.nickName">
									您已选择
									<span style="color: #ed9a0f;">
										{{tempInfoId.nickName}}
									</span>
								</span>
							</label>
							<label class="dier">
								<input v-model="tempInfoId.way" type="radio" name="zhi" value="2">
								<span class="meixuan" :class="{'xuanZ': tempInfoId.way=='2'}">系统派单</span>
								<span class="nicheng" v-if="tempInfoId.way=='2'">
									您已选择 <span style="color: #ed9a0f;"> 系统派单 </span>
								</span>
							</label>
						</div>
					</div>
					<div class="dierbu">
						<div class="NO" :class="{'bianliangXZ': tempInfoId.id}">2</div>
						<div :class="{'bianliangXZ': tempInfoId.name}" style="cursor:pointer" @click="tempTypes($event,'ziyou','',1)" class="xmb">
							选择模板
							<span class="nicheng" v-if="tempInfoId.name">
								您已选择 <span style="color: #ed9a0f;"> {{tempInfoId.name}} </span>
								<i @click="delits($event)" style="padding-bottom: 4px;font-size: 12px;margin-left: 8px;cursor: pointer;" class="iconfont icon-shanchujian"></i>
							</span>
						</div>
					</div>
					<div class="disanbu">
						<div class="NO" :class="{'bianliangXZ': tempInfoId.key}">3</div>
						<div class="wenjian">
							<span style="cursor:pointer" :class="{'bianliangXZ': tempInfoId.key}" @click="xianshi">上传文件</span>
							<span class="underLine" v-if="!tempInfoId.key">
								上传.rar，.ios，.7z，.zip格式文件
							</span>
							<span class="underLine" v-if="tempInfoId.key">
								<i class="iconfont icon-yasuobao" style="font-size: 14px;color: #ed9a0f;margin:0 6px 0 0;"></i>
								<span>{{tempInfoId.key}}</span>
								<i @click="delit($event,tempInfoId.oldFiles)" style="padding-bottom: 4px;font-size: 12px;margin-left: 8px;cursor: pointer;" class="iconfont icon-shanchujian"></i>
							</span>
						</div>
					</div>
					<div class="orderXQ">
						<p class="sendTitle">
							订单详情<br>
							Details of order
						</p>
						<table class="table table-bordered xiangqing">
							<tbody style="border: 1px #fff double;">
								<tr>
									<td>订单名称<br><span>{{orderInfo.title}}</span></td>
									<td> 订单号<br><span>{{orderInfo.code}}</span> </td>
								</tr>
								<tr>
									<td>订单日期<br><span>{{orderInfo.createTime}}</span></td>
									<td> 类型<br>
										<span v-if="orderInfo.type=='XT'">修图</span> 
										<span v-if="orderInfo.type=='SJ'">设计</span> 
										<span v-if="orderInfo.type=='ALL'">修图设计</span> 
									</td>
								</tr>
								<tr>
									<td>限定时间<br>
										<span v-if="orderInfo.type!='ALL'">{{orderInfo.urgentTime=="0"?"72":orderInfo.urgentTime}}小时</span>
										<span v-if="orderInfo.type=='ALL'">{{orderInfo.urgentTime=="0"?"96":orderInfo.urgentTime}}小时</span>
									</td>
									<td> 订单总价 <br><span>{{((orderInfo.photoPrice*orderInfo.photoNum+orderInfo.designPrice*orderInfo.designNum)*orderInfo.urgentPrice).toFixed(2)}}</span> </td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="col-md-7 youbian">
				<div class="col-sm-12">
					<div class="yinying bianju">
						<div v-if="!qubie" class="caiwu col-sm-12 control-label">
							<div class="col-sm-6">
								<button type="button" @click="workAll($event,photoTemp.id,'','SERVERED')" class="btn btn-primary btn-sm"> 
									服务过
								</button>
								<button type="button" @click="workAll($event,photoTemp.id,'','PAIXU')" class="btn btn-primary btn-sm"> 
									综合排序
								</button>
							</div>
							<div class="form-group col-sm-4">
							    <div class="input-group">
								    <div class="input-group-addon">
								    	<i class="iconfont icon-snimicsousuo"></i>
								    </div>
								    <input v-model="search" class="form-control" type="text" placeholder="搜索工作室">
							    </div>
							</div>
							<div class="form-group col-sm-2">
								<button style="margin-top:2px" type="button" @click="workAll($event,photoTemp.id,'',sousuo)" class="btn btn-primary btn-sm">
									搜索
								</button>
							</div>
						</div>
						<p v-if="qubie" class="xuanzhe">
							<span class="tianjiaxuanzhong" @click="tempTypes($event,'ziyou','yangshi',1)">自有模板</span>
							<span @click="tempTypes($event,'xitong','yangshi',1)">系统模板</span>
							<span @click="tempTypes($event,'gongzuoshi','yangshi',1)" v-if="tempInfoId.workInfoId&&tempInfoId.way=='1'">工作室模板</span>
						</p>
						<ol v-if="qubie" class="breadcrumb">
							<span v-if="muban.totlePage>1" @click="tempTypes($event,zuLeiXing,'fanye','prev')" class="iconfont icon-aleft"></span>
							<template v-for="photoTemp in photoTemp">
								<li @click="workAll($event,photoTemp.id,qubie)" class="ziyoucss">
									<a href="javascript:;">{{photoTemp.name}}</a>
								</li>
							</template>
<span v-if="muban.totlePage>1" @click="tempTypes($event,zuLeiXing,'fanye','next')" class="iconfont icon-aright"></span>
</ol>
<div class="gongMu">
    <div class="bigBox" v-for="workRooms in workRooms">
        <template v-if="!qubie">
									<div class="box" @click="getId($event,workRooms.id,'gongzuoshi',workRooms.nickName)">
			                            <div style="cursor:pointer">
											<img :src="workRooms.logo">
			                            </div>
			                        	<div class="mingzi">
			                    			<p>{{workRooms.nickName}}</p>
			                    			<p class="level">等级：{{workRooms.level}}<br>
			                    			质量分：{{(workRooms.massScore).toFixed(1)}}&nbsp;&nbsp;&nbsp;回件分：{{workRooms.satisfyScore.toFixed(1)}}</p>
			                    		</div>
				                    </div>
								</template>
        <template v-if="qubie">
									<div class="box" @click="getId($event,workRooms.id,'muban',workRooms.name)">
			                            <div style="cursor:pointer">
											<img :src="qnyUrl+workRooms.logo">
			                            </div>
			                        	<div class="mingzi">
			                    			<p>{{workRooms.name}}</p>
			                    		</div>
				                    </div>
								</template>
    </div>
    <div style="font-size:30px" v-if="workRooms.length==0">暂无数据</div>
</div>
<page :turn-page="workPage"></page>
</div>
</div>
</div>
<div class="form-group col-sm-12" style="overflow: hidden">
    <div class="form-group">
        <div class="sendSure">
            <input @click="sendSure" type="button" class="form-control btn-primary" value="确认发单">
        </div>
    </div>
</div>
</div>
</div>
<div class="modal fade send" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <p v-if="timerNum.status=='shoudong'"> 确认发送订单吗？ </p>
                <p v-if="timerNum.status=='zidong'"> 剩余<span style="color: red">{{timerNum.num}}</span>秒订单将自动派送 </p>
            </div>
            <div class="modal-footer">
                <button v-if="timerNum.status=='shoudong'" @click="sendOrder" type="button" class="btn btn-primary sure" data-dismiss="modal">确定</button>
                <button v-if="timerNum.status=='zidong'" @click="sendOrder" type="button" class="btn btn-primary sure" data-dismiss="modal">直接派单</button>
                <button @click="shoudong" type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import Lib from '../assets/lib.js'
    import qiniu from '../components/qiniu.vue'
    import page from '../components/page/pagegai.vue'
    import bus from './bus.js'
    export default {
        data: () => ({
            id: sessionStorage.getItem("id"),
            host: Lib.C.hostPhotoStudio,
            qnyUrl: Lib.C.qiniu.jsUrl,
            addr: Lib.M.getUrlParams(),
            orderInfo: {}, //订单信息
            qubie: "", //区别
            mubanId: "", //模板id
            search: "", //工作室搜索
            pageNo: 1, //
            pageNoZu: 1, //
            muban: {}, //模板分组翻页
            photoTemp: {}, //模板分组
            workPage: {}, //所有工作室翻页
            workRooms: {}, //所有工作室
            tempInfoId: {}, //各种信息
            bale: {
                pic: {}
            },
            zuLeiXing: '',
            timerNum: {
                num: 10,
                status: 'zidong',
                timer: ""
            } //时间倒计时
        }),
        created: function() {
            var self = this;
            bus.$on('finishOne', function(data) {
                if (data) {
                    self.findAllBalePic();
                }
            });
            bus.$on('finishTwo', function(data) {
                console.log(data);
                self.timerNum.num = 10;
                if (data) {
                    $('.send').modal('show');
                    self.$set("timerNum.status", "zidong");
                    self.timerNum.timer = setInterval(function() {
                        self.timerNum.num--;
                        if (self.timerNum.num <= 1) {
                            $('.send').modal('hide');
                            self.sendOrder();
                        }
                    }, 1000)
                }
            });
            this.photoOrder();
            this.workAll();
            this.findAllBalePic();
        },
        ready: function() {},
        events: {
            'child-qiniu-data' (obj) {
                this.$set("tempInfoId.percent", obj.percent);
                if (obj.key) {
                    this.$set("tempInfoId.oldFiles", obj.key);
                    this.$set("tempInfoId.key", obj.key.split("/")[4]);
                }
            },
            'child-turn-page' (obj) {
                this.pageNo = obj.pageNo;
                this.workAll('', this.mubanId, this.qubie);
            }
        },
        methods: {
            shoudong() {
                this.$set("timerNum.status", "shoudong");
                clearInterval(this.timerNum.timer);
            },
            getId(e, id, gongMu, nickName) {
                $(".box").css("opacity", 1);
                $(e.target).parents(".box").css("opacity", "0.7");
                if (gongMu == 'gongzuoshi') {
                    this.$set("tempInfoId.nickName", nickName);
                    this.$set("tempInfoId.workInfoId", id);
                } else if (gongMu == 'muban') {
                    this.$set("tempInfoId.id", id);
                    this.$set("tempInfoId.name", nickName);
                }
            },
            tempTypes(e, leixing, yangshi, pageNo) { //分组列表
                this.$set("zuLeiXing", leixing);
                if (yangshi == 'yangshi') {
                    $(".xuanzhe span").removeClass("tianjiaxuanzhong");
                    $(e.target).addClass("tianjiaxuanzhong");
                }
                if (this.tempInfoId.way == '1' && !this.tempInfoId.nickName) {
                    Lib.M.topRightInfoTips({
                        title: "请先完成你的第一步"
                    });
                    return false;
                }
                if (pageNo == 'prev') {
                    this.pageNoZu--;
                    if (this.pageNoZu < 1) {
                        this.pageNoZu = 1
                    }
                } else if (pageNo == 'next') {
                    this.pageNoZu++;
                    if (this.pageNoZu > this.muban.totlePage) {
                        this.pageNoZu = this.muban.totlePage;
                    }
                } else if (pageNo == 1) {
                    this.pageNoZu = 1;
                }
                var url = this.host + 'v1/group/tempType',
                    postParam = {},
                    self = this;
                this.$set("qubie", leixing);
                postParam = {
                    "pageNo": this.pageNoZu,
                    "pageSize": 6
                }
                if (leixing == 'ziyou') {
                    $(".triangle-left").css("top", "122px");
                    postParam.photoInfoId = this.id;
                } else if (leixing == 'gongzuoshi') {
                    postParam.workInfoId = this.tempInfoId.workInfoId;
                }
                Lib.M.load(url, postParam, function(data) {
                    if (data.code == 8) {
                        self.$set("muban", {});
                        self.$set("photoTemp", []);
                        self.$set("workRooms", []);
                        return false;
                    };
                    data = data.data;
                    const page = {
                        pageSize: data.pageSize,
                        totalCount: data.totalCount,
                        pageNo: data.pageNo
                    };
                    self.$set("muban", page);
                    self.$set("muban.totlePage", Math.ceil(self.muban.totalCount / self.muban.pageSize));
                    data = data.list;
                    self.$set("photoTemp", data);
                    self.workAll("", data[0].id, self.qubie);
                }, "GET");
            },
            workAll(e, id, qubie, chaxunleixing) { //查询所有工作室,模板
                if (!qubie) {
                    $(".triangle-left").css("top", "32px");
                    var url = this.host + "v1/work/all";
                } else if (qubie == 'ziyou') {
                    var url = this.host + 'v1/photo/temp/photoTemp/' + this.id;
                } else if (qubie == 'xitong') {
                    var url = this.host + 'v1/temp/getTemp/system';
                } else if (qubie == 'gongzuoshi') {
                    var url = this.host + 'v1/work/temp/workTemp/' + this.tempInfoId.workInfoId;
                }
                if (qubie) {
                    $(".ziyoucss a").css("color", "#337ab7");
                    $(e.target).css("color", "#ed9a0f");
                }
                this.$set("qubie", qubie);
                this.$set("mubanId", id);
                var self = this,
                    postParam = {};
                postParam = {
                    "pageNo": this.pageNo,
                    "pageSize": 8
                };
                if (!qubie) {
                    postParam.search = this.search;
                    postParam.type = chaxunleixing ? chaxunleixing : 'SERVERED';
                    postParam.photoInfoId = this.id;
                }
                if (qubie) {
                    postParam.tempTypeId = id;
                }
                Lib.M.load(url, postParam, function(data) {
                    if (data.code == 8) {
                        self.$set("workPage", {});
                        self.$set("workRooms", []);
                        return false;
                    };
                    data = data.data;
                    const page = {
                        pageSize: data.pageSize,
                        totalCount: data.totalCount,
                        pageNo: data.pageNo
                    };
                    self.$set("workPage", page);
                    self.$set("workRooms", data.list);
                }, "get");
            },
            sendOrder() {
                var url = this.host + "v1/photo/order/two",
                    self = this,
                    postParam = {};
                postParam = {
                    "id": parseInt(this.addr.id),
                    "oldFiles": this.tempInfoId.oldFiles
                };
                if (this.tempInfoId.id) {
                    postParam.tempInfoId = this.tempInfoId.id;
                }
                if (this.tempInfoId.way == '1') {
                    postParam.workInfoId = this.tempInfoId.workInfoId;
                }
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    clearInterval(self.timerNum.timer);
                    if (data.code == -1) {
                        setTimeout(function() {
                            location.href = "#/index/orderMan";
                        }, 1500);
                    }
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                });
            },
            photoOrder() {
                var url = this.host + "v1/photo/order/photoOrder/" + this.id + "/" + parseInt(this.addr.id);
                var self = this;
                Lib.M.load(url, {}, function(data) {
                    self.$set("orderInfo", data.data)
                }, "get");
            },
            findAllBalePic() { //查询订单上传的所有图片
                var url = this.host + "qiNiu/bucketManagerFile",
                    self = this,
                    digitalId, dir,
                    postParam = {};
                postParam = {
                    "pageSize": 1000,
                    "prefix": "yinglou/" + this.id + "/archive/" + this.addr.id
                };
                Lib.M.load(url, postParam, function(data) {
                    data = data.data.list;
                    for (var i = 0; i < data.length; i++) {
                        data[i].uploadTimes = new Date(data[i].uploadTime);
                    }
                    data.sort(function sortDate(a, b) {
                        return b.uploadTimes - a.uploadTimes;
                    })
                    if (data.length) {
                        self.$set("tempInfoId.oldFiles", data[0].imgUrl);
                        self.$set("tempInfoId.key", data[0].imgUrl.split("/")[4]);
                    }
                }, "get");
            },
            delits(e) {
                this.$set("tempInfoId.id", "");
                this.$set("tempInfoId.name", "");
            },
            delit(e, name) { //删除
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
                    self.findAllBalePic();
                });
                this.$set("tempInfoId.key", "");
                this.$set("tempInfoId.oldFiles", "");
            },
            sendSure() {
                if (!this.tempInfoId.oldFiles) {
                    Lib.M.topRightInfoTips({
                        title: "请上传压缩包"
                    });
                    return false;
                }
                if (this.tempInfoId.way == '1' && !this.tempInfoId.workInfoId) {
                    Lib.M.topRightInfoTips({
                        title: "请选择工作室"
                    });
                    return false;
                }
                $('.send').modal('show');
            },
            xianshi() {
                if (this.tempInfoId.way == '1' && !this.tempInfoId.nickName) {
                    Lib.M.topRightInfoTips({
                        title: "请先完成你的第一步"
                    });
                    return false;
                }
                $(".shangchuan").css("display", "block");
                $(".shangchuan").css("bottom", "0px");
            }
        },
        components: {
            page,
            qiniu
        }
    }
</script>
<style type="text/css" scoped>
    .xuanzhe .tianjiaxuanzhong {
        border-radius: 50px;
        background: #275482;
        color: white;
    }
    
    .xuanzhe span {
        color: black;
        padding: 4px 14px;
        font-size: 16px;
        cursor: pointer;
        margin: 0 16px;
    }
    
    .bianliangXZ {
        color: white;
    }
    
    .nicheng {
        font-size: 14px;
        font-weight: normal;
        color: white;
    }
    
    li.ziyoucss:first-child a {
        color: #ed9a0f;
    }
    
    .orderXQ {
        padding-bottom: 30px;
    }
    
    .bigBox {
        padding: 14px 8px;
        float: left;
        width: 25%;
    }
    
    .mingzi p {
        margin: 10px 0 0 0;
        color: white;
        text-align: center;
        font-size: 12px;
    }
    
    .box {
        background: #2b2b2b;
        padding: 7px;
        border-radius: 8px;
        position: relative;
    }
    
    .icon-aright,
    .icon-aleft {
        font-size: 12px;
        font-weight: bold;
    }
    
    .icon-aright:hover,
    .icon-aleft:hover {
        color: #ed9a0f
    }
    
    .level {
        position: absolute;
        bottom: 33px;
        background: rgba(0, 0, 0, 0.5);
        width: 93%;
    }
    
    .box img {
        width: 100%;
        border-radius: 8px;
        height: 250px;
    }
    
    .zuobian {
        margin-left: 65px;
        color: #969696;
        margin-top: 50px;
        min-height: 460px;
        min-width: 420px;
    }
    
    .bianju {
        padding: 16px 50px 0 50px;
    }
    
    .yinying {
        box-shadow: 0px 0px 24px 0px rgba(9, 2, 4, 0.182);
        overflow: hidden;
        border-radius: 8px;
        min-height: 750px;
    }
    
    .diyibu,
    .dierbu,
    .disanbu {
        overflow: hidden;
        background: #275482;
        font-size: 18px;
        margin-bottom: 2px;
    }
    
    .youbian {
        margin-top: 50px;
        min-width: 630px;
    }
    
    .dierbu div,
    .disanbu div {
        float: left;
    }
    
    .xmb,
    .wenjian {
        padding: 31px 20px;
        font-weight: bold;
    }
    
    .gongMu {
        min-height: 488px;
    }
    
    .NO {
        font-size: 37px;
        padding: 18px 0;
        margin-left: 13px;
        font-weight: bold;
    }
    
    .NO,
    .gongZS {
        float: left;
    }
    
    .xuanZ {
        color: white;
    }
    
    .gongZS {
        width: 90%;
    }
    
    .gongZS .diyi {
        padding: 10px 0 8px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        margin-left: 18px;
        text-indent: -17px;
        cursor: pointer;
    }
    
    .gongZS .dier {
        padding: 8px 0 10px 0;
        cursor: pointer;
    }
    
    .sendTitle {
        font-size: 16px;
        color: black;
        text-align: center;
        margin: 35px 0;
    }
    
    .gongZS label {
        display: block;
        margin: 0;
    }
    
    .gongZS input {
        opacity: 0
    }
    
    .xiangqing {
        width: 80%;
        margin: 0 auto;
        color: #909090;
    }
    
    .xiangqing td {
        width: 50%;
        font-size: 14px;
        padding-left: 20px;
    }
    
    .xiangqing span {
        color: #595959;
        font-size: 18px;
    }
    
    .triangle-left {
        width: 0;
        position: absolute;
        right: -8px;
        height: 0;
        top: 32px;
        border-top: 12px solid transparent;
        border-left: 24px solid #275482;
        border-bottom: 12px solid transparent;
    }
    
    .sendSure {
        width: 100%;
        text-align: center;
    }
    
    .sendSure input {
        border-radius: 50px;
        height: 45px;
        width: 150px;
        display: initial;
        margin-right: 2%;
        margin-top: 40px
    }
    
    .modal-body {
        padding: 15px 70px;
    }
    
    .works .name {
        border-bottom: solid 1px #686763;
        margin: 0 54px;
    }
    
    .works .level {
        color: #ed9a0f;
        line-height: initial;
        margin-bottom: 8px;
    }
    
    .modal-sm {
        width: 450px;
    }
    
    .modal-sm .modal-content {
        padding: 71px 33px 30px 33px;
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
    
    .underLine {
        border-bottom: solid 1px #b2b2b2;
        padding-bottom: 5px;
        font-size: 14px;
        font-weight: normal;
        color: white;
        margin-left: 5px
    }
</style>