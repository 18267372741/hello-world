<template lang="html">
	<div class="worksList clearfix row"> 
		<div class="col-sm-12" style="min-height: 753px;background:white;overflow:auto">
			<ol class="breadcrumb daohang">
				<li><a @click="findOrder($event,'SERVER')" class="active" href="javascript:;">服务中<span v-if="orderNum.serverIng!=0" class="jiaobiaoSL">{{orderNum.serverIng}}</span></a></li>
				<li><a @click="findOrder($event,'WAIT_CHECK')" href="javascript:;">待审核<span v-if="orderNum.waitCheck!=0" class="jiaobiaoSL">{{orderNum.waitCheck}}</span></a></li>
				<li><a @click="findOrder($event,'REWORK')" href="javascript:;">返工中<span v-if="orderNum.reworkIng!=0" class="jiaobiaoSL">{{orderNum.reworkIng}}</span></a></li>
				<li><a @click="findOrder($event,'FINISH')" href="javascript:;">已完结</a></li>
			</ol>
			<table class="table table-condensedn table-hover table-bordered">
				<thead>
					<tr>
						<!-- <th style="min-width:250px">
							{{dingdanmMZ}}
							<div class="btn-group">
							  <span type="button" class="dropdown-toggle" data-toggle="dropdown">
							    <span style="margin-top: -6px;" class="caret"></span>
							  </span>
							  <ul style="margin: 2px -72px 0px;min-width: 100px;text-align:center" class="dropdown-menu" role="menu">
							    <li @click="yinglou"><a href="javascript:;">影楼</a></li>
							    <li style="margin: 4px 0;" class="divider"></li>
							    <li @click="mingzi"><a href="javascript:;">订单名称</a></li>
							  </ul>
							</div>
						</th> -->
						<th style="min-width:250px">影楼</th>
						<th style="min-width:150px">订单名称</th>
						<th style="min-width:83px">类型</th>
						<th style="min-width:154px">下单时间</th>
						<th style="min-width:150px" v-if="status!='FINISH'">剩余时间</th>
						<th style="min-width:150px" v-if="status=='FINISH'">完成时间</th>
						<th style="min-width:100px">加急/时间</th>
						<th style="min-width:100px">模板</th>
						<th style="min-width:350px">操作</th>
					</tr>
				</thead>
				<tbody style="background: white;">
					<tr v-for="diOrder in diOrder">
						<td>{{diOrder.nickName}}</td>
						<td>{{diOrder.title}}</td>
						<td v-if="diOrder.type=='ALL'">修片设计</td>
						<td v-if="diOrder.type=='XT'">修片</td>
						<td v-if="diOrder.type=='SJ'">设计</td>
						<td>{{diOrder.createTime}}</td>
						<td :class="{'jinggao': diOrder.sixiaoshi<0}" v-if="status!='FINISH'">{{diOrder.finishTime}}</td>
						<td :class="{'jinggao': diOrder.chaoqi}" v-if="status=='FINISH'">{{diOrder.endTime?(diOrder.endTime):"影楼未审核"}}</td>
						<td v-if="diOrder.isUrgent=='YES'">{{diOrder.urgentPrice}}倍/{{diOrder.urgentTime}}</td>
						<td v-if="diOrder.isUrgent=='NO'">不加急</td>
						<td>
							<span style="cursor:pointer" v-if="diOrder.tempInfoId!=0" @click="getTemps($event,diOrder.tempInfoId)">
								<a @click="tianjiaYS($event)" href="javascript:;">预览下载</a>
							</span>
							<span v-if="diOrder.tempInfoId==0">
								无模板
							</span>
						</td>
						<td class="chaozuo">
							<span @click="getDetails($index)" type="button" data-toggle="modal" data-target=".xiangqing">
								<a @click="tianjiaYS($event)" href="javascript:;">详情</a></span>
							<span v-if="status!='FINISH'">
						    	<a @click="tianjiaYS($event)" href="{{qnyUrl+diOrder.oldFiles}}" download="{{qnyUrl+diOrder.oldFiles}}">
									下载源文件
								</a>
						    </span>
						    <template v-if="status=='SERVER'">
						    	<template v-if=" diOrder.type=='ALL'||diOrder.type=='XT' ">
									<span>
								    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic2?orderId={{diOrder.code}}&workXtId={{diOrder.workXtId}}&workSjId={{diOrder.workSjId}}&type={{diOrder.type}}&per=XT&status={{diOrder.newOneFiles}}&id={{diOrder.id}}&title={{diOrder.title}}">
								    		修图
								    	</a>
								    </span>
							    </template>
<span v-if=" diOrder.type!='ALL'&&diOrder.type!='XT' ">
							    	<i style="padding: 4px 12px;cursor:default"> 一一 </i>
							    </span>
<template v-if=" diOrder.type=='ALL'||diOrder.type=='SJ' ">
								    <span>
								    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic2?orderId={{diOrder.code}}&workXtId={{diOrder.workXtId}}&workSjId={{diOrder.workSjId}}&type={{diOrder.type}}&per=SJ&status={{diOrder.newFiles}}&id={{diOrder.id}}&title={{diOrder.title}}">
								    		设计
								    	</a>
								    </span>	
							    </template>
<span v-if=" diOrder.type!='ALL'&&diOrder.type!='SJ' ">
							    	<i style="padding: 4px 12px;cursor:default"> 一一 </i>
							    </span>
</template>
<template v-if="status=='WAIT_CHECK'">
								<template v-if=" diOrder.type=='ALL'||diOrder.type=='XT' ">
									<span>
								    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?orderId={{diOrder.code}}&workXtId={{diOrder.workXtId}}&id={{diOrder.id}}&workSjId={{diOrder.workSjId}}&type={{diOrder.type}}&per=XT&status=REWORK&title={{diOrder.title}}">
											修图
										</a>
								    </span>
							    </template>
<span v-if=" diOrder.type!='ALL'&&diOrder.type!='XT' ">
							    	<i style="padding: 4px 12px;cursor:default"> 一一 </i>
							    </span>
<template v-if=" diOrder.type=='ALL'||diOrder.type=='SJ' ">
									<span>
								    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?orderId={{diOrder.code}}&workXtId={{diOrder.workXtId}}&id={{diOrder.id}}&workSjId={{diOrder.workSjId}}&type={{diOrder.type}}&per=SJ&status=REWORK&title={{diOrder.title}}">
								    		设计
								    	</a>
								    </span>
							    </template>
<span v-if=" diOrder.type!='ALL'&&diOrder.type!='SJ' ">
							    	<i style="padding: 4px 12px;cursor:default"> 一一 </i>
							    </span>
</template>
<template v-if="status=='FINISH'">
								<template v-if=" diOrder.type=='ALL'||diOrder.type=='XT' ">
									<span>
								    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?orderId={{diOrder.code}}&workXtId={{diOrder.workXtId}}&id={{diOrder.id}}&workSjId={{diOrder.workSjId}}&type={{diOrder.type}}&per=XT&status=FINISH&title={{diOrder.title}}">
											修图
										</a>
								    </span>
							    </template>
<span v-if=" diOrder.type!='ALL'&&diOrder.type!='XT' ">
							    	<i style="padding: 4px 12px;cursor:default"> 一一 </i>
							    </span>
<template v-if=" diOrder.type=='ALL'||diOrder.type=='SJ' ">
									<span>
								    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?orderId={{diOrder.code}}&workXtId={{diOrder.workXtId}}&id={{diOrder.id}}&workSjId={{diOrder.workSjId}}&type={{diOrder.type}}&per=SJ&status=FINISH&title={{diOrder.title}}">
								    		设计
								    	</a>
								    </span>
							    </template>
<span v-if=" diOrder.type!='ALL'&&diOrder.type!='SJ' ">
							    	<i style="padding: 4px 12px;cursor:default"> 一一 </i>
							    </span>
</template>
<template v-if="status=='REWORK'">
								<template v-if=" diOrder.type=='ALL'||diOrder.type=='XT' ">
									<span>
								    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?orderId={{diOrder.code}}&workXtId={{diOrder.workXtId}}&id={{diOrder.id}}&workSjId={{diOrder.workSjId}}&type={{diOrder.type}}&per=XT&status=REWORK&title={{diOrder.title}}">
											修图
										</a>
								    </span>
							    </template>
<span v-if=" diOrder.type!='ALL'&&diOrder.type!='XT' ">
							    	<i style="padding: 4px 12px;cursor:default"> 一一 </i>
							    </span>
<template v-if=" diOrder.type=='ALL'||diOrder.type=='SJ' ">
									<span>
								    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?orderId={{diOrder.code}}&workXtId={{diOrder.workXtId}}&id={{diOrder.id}}&workSjId={{diOrder.workSjId}}&type={{diOrder.type}}&per=SJ&status=REWORK&title={{diOrder.title}}">
								    		设计
								    	</a>
								    </span>
							    </template>
<span v-if=" diOrder.type!='ALL'&&diOrder.type!='SJ' ">
							    	<i style="padding: 4px 12px;cursor:default"> 一一 </i>
							    </span>
</template>
</td>
</tr>
</tbody>
</table>
<p v-if="!diOrder.length" style="font-size: 24px;margin-bottom: 100px;text-align: center;">
    暂无信息
</p>
</div>
<page :turn-page="pageOrder"></page>
<!-- 模板 -->
<div class="modal fade muban" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="gridSystemModalLabel">模板预览</h4>
            </div>
            <div class="modal-body">
                <div class="center row">
                    <div class="col-sm-2 mubantu">
                        <div>
                            <a target="_blank" :href="qnyUrl+getTemp.logo">
                                <img :src="qnyUrl+getTemp.logo+'?imageMogr2/thumbnail/120x120!'">
                            </a>
                        </div>
                        <div>
                            <p>封面</p>
                        </div>
                    </div>
                    <div class="col-sm-2 mubantu" v-for="showPic in getTemp.showPic">
                        <div>
                            <a target="_blank" :href="qnyUrl+showPic">
                                <img :src="qnyUrl+showPic+'?imageMogr2/thumbnail/120x120!'">
                            </a>
                        </div>
                        <div>
                            <p>预览图</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a href="{{qnyUrl+getTemp.files}}" download="{{getTemp.files}}">
                    <button type="button" class="btn btn-primary">
								下载模板源文件
							</button>
                </a>
            </div>
        </div>
    </div>
</div>
<!--详情-->
<div class="modal fade xiangqing" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
    <div class="modal-dialog modal-lg xiangqingMTKBox" :class="{'xiangqingMTKBox1': orderInfo.type!='ALL'}">
        <div class="modal-content xiangqingMTK">
            <div class="modal-body box">
                <button type="button" class="close hover guanbis" :class="{'guanbi':orderInfo.type=='ALL','guanbi1':orderInfo.type=='SJ','guanbi2':orderInfo.type=='XT'}" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
                <div class="row detail">
                    <div v-if="orderInfo.type=='ALL'||orderInfo.type=='XT'" class="xiutuBox" :class="{'col-sm-6': orderInfo.type=='ALL','col-sm-12': orderInfo.type!='ALL'}">
                        <div class="title">
                            <h4>修片详情</h4>
                            <h5>Details of Modify</h5>
                        </div>
                        <div class="xiutu">
                            <ul>
                                <li class="shuliang">
                                    <p>
                                        <span>数量&nbsp;&nbsp;&nbsp;</span>
                                        <span class="numb">{{orderInfo.photoNum}}张</span>
                                        <span>
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
													&nbsp;&nbsp;单价
												</span>
                                        <span class="numb">
													&nbsp;&nbsp;&nbsp;{{orderInfo.photoPrice}}元/张
												</span>
                                    </p>
                                </li>
                                <li class="fengge">
                                    <div>
                                        <span>风格</span>
                                        <span v-if="orderInfo.xiutu.fengge=='1'">欧式</span>
                                        <span v-if="orderInfo.xiutu.fengge=='2'">中国风</span>
                                        <span v-if="orderInfo.xiutu.fengge=='3'">旅拍</span>
                                        <span v-if="orderInfo.xiutu.fengge=='4'">纪实</span>
                                        <span v-if="orderInfo.xiutu.fengge=='5'">文艺</span>
                                        <span v-if="orderInfo.xiutu.fengge=='6'">大牌</span>
                                    </div>
                                </li>
                                <li class="miaoshuBox">
                                    <ul class="miaoshu">
                                        <li>
                                            <span>痣</span>
                                            <span>{{orderInfo.xiutu.zhi=='1'?'修掉':'不修'}}</span>
                                        </li>
                                        <li>
                                            <span>疤痕</span>
                                            <span>{{orderInfo.xiutu.baheng=='1'?'修掉':'不修'}}</span>
                                        </li>
                                        <li>
                                            <span>塑型（液化）</span>
                                            <span v-if="orderInfo.xiutu.suxing=='1'">不修</span>
                                            <span v-if="orderInfo.xiutu.suxing=='2'">微修</span>
                                            <span v-if="orderInfo.xiutu.suxing=='3'">很瘦</span>
                                            <span v-if="orderInfo.xiutu.suxing=='4'">非常瘦</span>
                                        </li>
                                        <li>
                                            <span>面部杂志</span>
                                            <span>{{orderInfo.xiutu.mianbu=='1'?'修掉':'淡化'}}</span>
                                        </li>
                                        <li>
                                            <span>眼袋皱纹</span>
                                            <span>{{orderInfo.xiutu.yandai=='1'?'修掉':'淡化'}}</span>
                                        </li>
                                        <li>
                                            <span>腋下颈纹</span>
                                            <span>{{orderInfo.xiutu.yexia=='1'?'修掉':'淡化'}}</span>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <p v-if="wenjianming" style="text-align:center">压缩包名：<a target="_blank" href="{{qnyUrl+wenjianming}}">{{wenjianming.split("/")[4]}}</a></p>
                            <div v-if="orderInfo.type=='XT'" class="form-group row" style="margin-bottom: 50px;">
                                <label class="col-sm-2 control-label"></label>
                                <div class="col-sm-8">
                                    <textarea disabled v-model="orderInfo.remark" class="form-control" name="" rows="4" cols=""></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="orderInfo.type=='ALL'||orderInfo.type=='SJ'" class="shejiBox" :class="{'col-sm-6': orderInfo.type=='ALL','col-sm-12': orderInfo.type!='ALL'}">
                        <div class="title">
                            <h4>设计详情</h4>
                            <h5>Details of Design</h5>
                        </div>
                        <div class="sheji">
                            <ul>
                                <li class="shuliang">
                                    <p>
                                        <span>数量&nbsp;&nbsp;&nbsp;</span>
                                        <span class="numb">{{orderInfo.designNum}}张</span>
                                        <span>
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
													&nbsp;&nbsp;单价
												</span>
                                        <span class="numb">
													&nbsp;&nbsp;&nbsp;{{orderInfo.designPrice}}元/张
												</span>
                                    </p>
                                </li>
                                <li class="jinyongBox">
                                    <div class="jinyong">禁用文字</div>
                                    <div>
                                        <span v-if="orderInfo.sheji.wenzi=='1'">中文</span>
                                        <span v-if="orderInfo.sheji.wenzi=='2'">日文</span>
                                        <span v-if="orderInfo.sheji.wenzi=='3'">韩文</span>
                                        <span v-if="orderInfo.sheji.wenzi=='4'">英文</span>
                                        <span v-if="orderInfo.sheji.wenzi=='5'">不限文字</span>
                                    </div>
                                </li>
                                <li class="jinyongBox">
                                    <div class="jinyong">设计风格</div>
                                    <div v-if="orderInfo.sheji.sheji=='1'">
                                        <p>简约唯美</p>
                                        <p>适用于普通相册，接地气，符合大众审美</p>
                                    </div>
                                    <div v-if="orderInfo.sheji.sheji=='2'">
                                        <p>时尚大气</p>
                                        <p>适用于凸显衣着、装饰和气质</p>
                                    </div>
                                    <div v-if="orderInfo.sheji.sheji=='3'">
                                        <p>可爱花销</p>
                                        <p>适用于青年萌系列</p>
                                    </div>
                                    <div v-if="orderInfo.sheji.sheji=='4'">
                                        <p>主题系列</p>
                                        <p>适用于套图系列，高逼格</p>
                                    </div>
                                    <div v-if="orderInfo.sheji.sheji=='5'">
                                        <p>复古端庄</p>
                                        <p>更加突出复古怀旧的味道</p>
                                    </div>
                                    <div v-if="orderInfo.sheji.sheji=='6'">
                                        <p>旅拍风格</p>
                                        <p>文字图案多元化，赋予画面潮流感美</p>
                                    </div>
                                </li>
                            </ul>
                            <p v-if="wenjianming" style="text-align:center">压缩包：<a target="_blank" href="{{qnyUrl+wenjianming}}" download="{{qnyUrl+wenjianming}}">{{wenjianming.split("/")[4]}}</a></p>
                            <div style="margin-bottom: 50px;" v-if="orderInfo.type=='SJ'" class="form-group row">
                                <label class="col-sm-2 control-label"></label>
                                <div class="col-sm-8">
                                    <textarea disabled v-model="orderInfo.remark" class="form-control" name="" rows="4" cols=""></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="orderInfo.type=='ALL'" class="form-group row" style="margin-top: 60px;">
                    <label v-if="orderInfo.type=='ALL'" class="col-sm-3 control-label"></label>
                    <div :class="{'col-sm-6':orderInfo.type=='ALL','col-sm-11-1':orderInfo.type=='XT','col-sm-11-2':orderInfo.type=='SJ'}">
                        <textarea disabled v-model="orderInfo.remark" class="form-control" name="" rows="4" cols=""></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 审核 -->
<div class="modal fade accept" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <p>
                    确认审核吗?
                </p>
            </div>
            <div class="modal-footer">
                <button @click="audit" type="button" class="btn btn-warning sure" data-dismiss="modal">确定</button>
                <button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
    import Lib from '../assets/lib.js'
    import page from '../components/page/page.vue'
    import qiniu from '../components/qiniu.vue'
    import bus from './bus.js'
    const moment = require('moment')
    require('daterangepicker.js')
    require('daterangepicker.css')
    export default {
        data: () => ({
            addr: Lib.M.getUrlParams(),
            qnyUrl: Lib.C.qiniu.jsUrl,
            id: sessionStorage.getItem("id"),
            workInfoId: sessionStorage.getItem("workInfoId"),
            host: Lib.C.hostPhotoStudio,
            end: {
                yasuobao: "上传成图",
                key: "end",
                max_file_size: "100mb"
            },
            pageOrder: { //翻页组件
                "pageOrder1": {},
                "pageOrder2": {},
                "pageOrder3": {},
                "pageOrder4": {}
            },
            pageNo: 1,
            getTemp: {}, //模板
            myPic: { //成图
                "n": 0,
                "myPic": [],
                "myPics": []
            },
            orderInfo: {},
            wenjianming: "", //上传文件名
            status: "ALL", //订单状态
            orderId: { //获取订单id
                orderId: "",
                type: ""
            },
            upPic: {}, //上传图
            diOrder: { //yiwanjie  fangong daishenhe fuwu
                "fuwu": [],
                "daishenhe": [],
                "fangong": [],
                "yiwanjie": []
            },
            qiniu: {
                list: [],
                n: -1,
                kuang: false
            },
            dingdanmMZ: "订单标题",
            orderNum: {} //订单数量
        }),
        watch: {},
        created: function() {
            var self = this;
            bus.$on('finishThree', function(data) {
                console.log(self.status);
                if (data) {
                    setTimeout(function() {
                        self.findOrder("", self.status);
                        self.photoOrderNum();
                    }, 2000)
                }
            });
            this.findOrder("", "SERVER"); //SERVER WAIT_CHECK REWORK FINISH服务中
            this.photoOrderNum();
        },
        ready: function() {},
        events: {
            'child-sousuo' (obj) {
                this.findOrder("", this.status, obj);
            },
            'child-turn-page' (obj) {
                this.$set('pageNo', obj.pageNo);
                this.findOrder("", this.status);
            }
        },
        methods: {
            yinglou() {
                this.$set("dingdanmMZ", "影楼")
            },
            mingzi() {
                this.$set("dingdanmMZ", "订单标题")
            },
            findOrder(e, status, title) { //查询所有订单
                if (e) {
                    this.photoOrderNum();
                    this.$set("orderInfo", []);
                    this.$set('pageNo', 1);
                    $(".daohang a").removeClass("active");
                    $(e.target).addClass("active");
                }
                this.$set("status", status);
                var url = this.host + 'v1/work/order/empOrder/' + this.id,
                    postParam = {},
                    self = this;
                postParam = {
                    "pageNo": this.pageNo,
                    "pageSize": 10,
                    "status": status,
                    "title": title
                };
                Lib.M.load(url, postParam, function(data) {
                    if (data.code == 8) { //yiwanjie  fangong daishenhe fuwu
                        self.$set("pageOrder", {});
                        self.$set("diOrder", []);
                        return false;
                    };
                    data = data.data;
                    const page = {
                        pageSize: data.pageSize,
                        totalCount: data.totalCount,
                        pageNo: data.pageNo
                    };
                    self.$set("pageOrder", page);
                    data = data.list;
                    for (var i = 0; i < data.length; i++) { //倒计时
                        if (data[i].startTime) {
                            if (data[i].type == "ALL") {
                                data[i].dataStatus = data[i].urgentTime ? data[i].urgentTime : 96;
                            } else if (data[i].type != "ALL") {
                                data[i].dataStatus = data[i].urgentTime ? data[i].urgentTime : 72;
                            }
                            if (data[i].endTime) {
                                data[i].haoshi = moment(data[i].endTime)._d.getTime() - moment(data[i].startTime)._d.getTime();
                                data[i].haoshi = Math.floor(data[i].haoshi / 86400000) + "天" +
                                    Math.floor(data[i].haoshi / 3600000) + "时" +
                                    Math.floor(data[i].haoshi % 86400000 % 3600000 / 60000) + "分" + data[i].haoshi % 86400000 % 3600000 % 60000 / 1000 + "秒";
                            }
                            if (data[i].endTime) {
                                data[i].chaoqi = Math.floor(moment(data[i].endTime)._d.getTime() - moment(data[i].startTime)._d.getTime() > data[i].dataStatus * 3600000);
                            }
                            data[i].finishTime = Math.floor(((moment(data[i].startTime)._d.getTime() + data[i].dataStatus * 3600000) - moment(new Date())._d.getTime()) / 1000);
                            data[i].sixiaoshi = data[i].finishTime - 4 * 60 * 60;
                            if (data[i].finishTime > 0) {
                                data[i].finishTime = Math.floor(data[i].finishTime / 86400) + "天" +
                                    Math.floor(data[i].finishTime % 86400 / 3600) + "时" +
                                    Math.floor(data[i].finishTime % 86400 % 3600 / 60) + "分" + data[i].finishTime % 60 + "秒";
                            } else {
                                data[i].finishTime = "已超期";
                            }
                            data[i].endTimes = setInterval(function() {
                                for (var j = 0; j < data.length; j++) {
                                    data[j].finishTime = Math.floor(((moment(data[j].startTime)._d.getTime() + data[j].dataStatus * 3600000) - moment(new Date())._d.getTime()) / 1000);
                                    if (data[j].finishTime > 0) {
                                        data[j].finishTime = Math.floor(data[j].finishTime / 86400) + "天" +
                                            Math.floor(data[j].finishTime % 86400 / 3600) + "时" +
                                            Math.floor(data[j].finishTime % 86400 % 3600 / 60) + "分" + data[j].finishTime % 60 + "秒";
                                    } else {
                                        clearInterval(data[j].endTimes);
                                        data[j].finishTime = "已超期";
                                    }
                                }
                            }, 1000);
                        }
                    }
                    self.$set("diOrder", data);
                    self.photoOrderNum();
                }, "GET");
            },
            getOrderId: function(e, orderId, type, files, leixing) {
                this.orderId.orderId = orderId;
                this.orderId.type = type;
                this.orderId.files = files;
                this.orderId.leixing = leixing;
                $('.accept').modal('show');
            },
            audit: function() { //提交审核
                var url = this.host + "v1/work/order/empOrder",
                    self = this,
                    postParam = {};
                postParam = {
                    "id": this.orderId.orderId,
                    "status": "WAIT_CHECK"
                };
                if (this.orderId.type == "XT") {
                    postParam.newOneFiles = "1";
                } else if (this.orderId.type == "SJ") {
                    postParam.newFiles = "1";
                } else if (this.orderId.type == "ALL" && !this.orderId.files) {
                    postParam.newOneFiles = "1"; //修图新文件
                } else if (this.orderId.type == "ALL" && this.orderId.files) {
                    postParam.newFiles = "1"; //设计新文件
                }
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                }, "put");
            },
            getTemps: function(e, id) { //模板
                $('.muban').modal('show'); //#e4eae8
                var url = this.host + "v1/photo/temp/getTemp/" + id,
                    self = this,
                    postParam = {};
                Lib.M.load(url, {}, function(data) {
                    data = data.data;
                    self.$set("getTemp", data);
                    self.$set("getTemp.showPic", JSON.parse(data.showPic));
                }, "get");
            },
            getDetails(index) {
                this.$set("orderInfo", this.diOrder[index]);
                this.$set("wenjianming", this.diOrder[index].oldFiles);
                if (this.diOrder[index].type == "ALL") {
                    this.$set("orderInfo.xiutu", JSON.parse(this.diOrder[index].details).xiutu);
                    this.$set("orderInfo.sheji", JSON.parse(this.diOrder[index].details).sheji);
                } else if (this.diOrder[index].type == "XT") {
                    this.$set("orderInfo.xiutu", JSON.parse(this.diOrder[index].details));
                } else if (this.diOrder[index].type == "SJ") {
                    this.$set("orderInfo.sheji", JSON.parse(this.diOrder[index].details));
                }
            },
            photoOrderNum(e, id) { //数量
                // var url = this.host + "v1/work/order/"+this.id+"/workOrderNum",
                var url = this.host + "v1/work/order/" + this.id + "/empOrderNum",
                    self = this,
                    postParam = {};
                Lib.M.load(url, {}, function(data) {
                    data = data.data;
                    self.$set("orderNum", data);
                }, "get");
            },
            tianjiaYS(e) {
                $("span a").removeClass("tianjiaxuanzhong");
                $(e.target).addClass("tianjiaxuanzhong");
            }
        },
        components: {
            page,
            qiniu
        }
    }
</script>
<style scoped>
    .worksList .table .jinggao {
        color: red;
    }
    
    .tianjiaxuanzhong {
        border-radius: 50px;
        background: #275482;
        color: white;
        font-size: 16px
    }
    
    .chaozuo {
        text-align: left !important;
    }
    
    .chaozuo span {
        padding: 2px 0;
        cursor: pointer;
    }
    
    span a {
        color: #909090;
        padding: 4px 12px;
    }
    
    .daohang {
        padding: 31px 80px;
        font-size: 20px;
        background: #ecedf3;
        margin-bottom: 0;
        min-width: 1000px;
    }
    
    .daohang a {
        color: #7d7e81;
        position: relative;
        padding: 2px 18px;
        border-radius: 50px;
    }
    
    .jiaobiaoSL {
        width: 17px;
        height: 17px;
        background: red;
        display: inline-block;
        position: absolute;
        top: -6px;
        font-size: 12px;
        line-height: 16px;
        right: 0;
        color: white;
        border-radius: 100%;
        text-align: center;
    }
    
    .daohang a.active {
        color: white;
        background: #275482;
    }
    
    .breadcrumb>li+li:before {
        padding: 0 12px 0 8px;
        content: "|";
    }
    
    .worksList .table tr th {
        font-weight: normal;
        color: #000 !important;
        border-bottom: solid 1px #f7f8fc;
        background: #f7f8fc;
    }
    
    .worksList .table tr th,
    .worksList .table tr td {
        text-align: center;
        font-size: 16px;
        color: #909090;
    }
    
    .jiaobiao {
        width: 15px;
        height: 15px;
        background: red;
        display: inline-block;
        position: absolute;
        top: 0;
        cursor: pointer;
        font-size: 15px;
        right: 0;
        color: white;
        border-radius: 100%;
        text-align: center;
        line-height: 15px;
    }
    
    .table>tbody>tr>td,
    .table>tbody>tr>th,
    .table>tfoot>tr>td,
    .table>tfoot>tr>th,
    .table>thead>tr>td,
    .table>thead>tr>th {
        padding: 16px 8px;
    }
    
    .table {
        margin-bottom: 0
    }
    
    tr th {
        font-size: 14px;
    }
    
    .worksList .table tr th:first-child,
    .worksList .table tr td:first-child {
        text-align: left !important;
        padding-left: 80px
    }
    
    .xiangqingMTKBox {
        margin-top: 80px;
        width: 1160px;
    }
    
    .box {
        padding: 0;
    }
    
    .xiangqingMTK {
        background: rgba(0, 0, 0, 0);
        -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
        border: 0;
    }
    
    .xiutuBox,
    .shejiBox {
        background: white;
        padding: 0;
        border-radius: 8px;
        overflow: hidden;
        min-height: 560px;
    }
    
    .xiutuBox {
        margin: 0 30px 0 -30px;
    }
    
    .shejiBox {
        margin: 0 -30px 0 30px;
    }
    
    .title {
        background: #275482;
        color: white;
        text-align: center;
        padding: 15px 0;
    }
    
    .title h4,
    .title h5 {
        margin: 0;
    }
    
    .shuliang {
        font-size: 14px;
    }
    
    .shuliang p {
        text-align: center;
        margin: 46px 45px 16px 46px;
        border-bottom: solid 1px #bfbfbf;
        padding-bottom: 7px;
    }
    
    .shuliang .numb {
        color: #275482;
    }
    
    .fengge {
        margin: 24px 0;
    }
    
    .fengge div {
        border-radius: 6px;
        border: solid 1px #bfbfbf;
        font-size: 14px;
        width: 102px;
        margin: 0 auto;
        text-align: center;
        padding: 4px 0;
    }
    
    .miaoshuBox {
        width: 390px;
        margin: 0 auto;
        background: #275482;
        color: white;
        font-size: 16px;
        border-radius: 6px;
        overflow: hidden;
    }
    
    .miaoshu li {
        width: 100%;
    }
    
    .miaoshu span {
        display: inline-block;
        border: solid 1px #5072c9;
        width: 49.3%;
        margin: 0;
        text-align: center;
        padding: 10px 0;
    }
    
    .hover:hover {
        opacity: 1;
        color: white;
    }
    
    .guanbis {
        padding: 14px;
        background: #275482 !important;
        position: absolute;
        top: -24px;
        right: -67px;
        color: white;
        line-height: 0;
        z-index: 1;
        box-shadow: 0px 3px 5px 0px rgba(9, 2, 4, 0.129);
        border-radius: 100%;
        opacity: 1;
        width: 50px;
        height: 50px;
    }
    
    .guanbi {
        top: -24px;
        right: -67px;
    }
    
    .guanbi1 {
        top: -24px;
        right: -67px;
    }
    
    .guanbi2 {
        top: -24px;
        right: -8px;
    }
    
    .jinyongBox {
        text-align: center;
        margin: 80px 0 0 0;
    }
    
    .jinyong {
        border-radius: 6px;
        border: solid 1px #bfbfbf;
        font-size: 14px;
        width: 102px;
        margin: 4px auto;
        text-align: center;
        padding: 4px 0;
    }
    
    .xiangqingMTKBox1 {
        width: 660px;
    }
    
    .background {
        background: white;
        border-radius: 0 0 8px 8px;
        padding-bottom: 20px;
        margin-bottom: 30px;
        height: 350px;
        overflow: auto;
    }
    
    .left {
        margin-right: -25px;
        margin-left: 25px;
    }
    
    .dingdanTitle {
        background: #ed9a0f;
        color: white;
        padding: 12px 0 10px 0;
        border-radius: 8px 8px 0 0
    }
    
    .dingdanTitle h4 {
        text-indent: 40px;
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
        border-radius: 0;
        width: 90px;
        height: 36px;
    }
    
    .nextStep {
        width: 150px;
        height: 45px;
        border-radius: 0;
        margin-left: 40px;
    }
    
    .center {
        padding: 0 40px;
    }
    
    .mubantu {
        box-shadow: 0px 1px 9px 0px rgba(9, 2, 4, 0.225);
        padding: 7px;
        margin: 10px 12px;
    }
    
    .mubantu p {
        margin: 13px 0 10px 0;
        text-align: center;
    }
    
    .mubantu img {
        width: 100%;
    }
    
    .kuandu {
        width: 110px
    }
</style>