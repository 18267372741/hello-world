<template lang="html">
	<div class="worksList clearfix row">
		<div class="col-sm-12" style="min-height: 720px;background:white">
			<ol class="breadcrumb daohang">
				<li><a @click="photoOrders($event,'ASSIGNED')" class="active" href="javascript:;">服务中<span v-if="orderNum.serverIng-orderNum.waitFenPei!=0" class="jiaobiaoSL">{{orderNum.serverIng-orderNum.waitFenPei}}</span></a></li>
				<li><a @click="photoOrders($event,'WAIT_EMP')" href="javascript:;">待分配<span v-if="orderNum.waitFenPei!=0" class="jiaobiaoSL">{{orderNum.waitFenPei}}</span></a></li>
				<li><a @click="photoOrders($event,'WAIT_CHECK')" href="javascript:;">工作室审核<span v-if="orderNum.waitCheck!=0" class="jiaobiaoSL">{{orderNum.waitCheck}}</span></a></li>
				<li><a @click="photoOrders($event,'WAIT_CONFIRM')" href="javascript:;">影楼审核<span v-if="orderNum.waitConfirm!=0" class="jiaobiaoSL">{{orderNum.waitConfirm}}</span></a></li>
				<li><a @click="photoOrders($event,'REWORK')" href="javascript:;">返工中<span v-if="orderNum.reworkIng!=0" class="jiaobiaoSL">{{orderNum.reworkIng}}</span></a></li>
				<li>
					<a @click="photoOrders($event,'FINISH')" href="javascript:;">已完结</a>
				</li>
			</ol>
			<table class="table table-condensedn table-hover table-bordered">
				<thead>
					<tr>
						<th style="min-width:250px">
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
						</th>
						<th style="min-width:80px">类型</th>
						<th style="min-width:150px">下单时间</th>
						<th style="min-width:150px" v-if="status!= 'FINISH'">剩余时间</th>
						<th style="min-width:150px" v-if="status== 'FINISH'">下单时间/完成时间</th>
						<th style="min-width:160px">加急价格/限定时间</th>
						<th style="min-width:180px">修图师/设计师</th>
						<th style="min-width:350px">操作</th>
					</tr>
				</thead>
				<tbody style="background:white">
					<tr v-for="photoOrder in photoOrder">
						<td v-if="dingdanmMZ=='订单标题'">{{photoOrder.title}}</td>
						<td v-if="dingdanmMZ=='影楼'">{{photoOrder.nickName}}</td>
						<td v-if="photoOrder.type=='ALL'">修图设计</td>
						<td v-if="photoOrder.type=='XT'">修图</td>
						<td v-if="photoOrder.type=='SJ'">设计</td>
						<td>{{photoOrder.createTime}}</td>
						<td :class="{'jinggao': photoOrder.finishTime=='已超期'}" v-if="status!= 'FINISH'">{{photoOrder.finishTime}}</td>
						<td :class="{'jinggao': photoOrder.finishTime=='已超期'}" v-if="status== 'FINISH'">{{photoOrder.createTime}}/{{photoOrder.endTime}}</td>
						<td v-if="photoOrder.isUrgent=='YES'">{{photoOrder.urgentPrice}}倍/{{photoOrder.urgentTime}}</td>
						<td v-if="photoOrder.isUrgent=='NO'">不加急</td>
						<td>{{photoOrder.workXtName ? photoOrder.workXtName : "无"}}/{{photoOrder.workSjName ? photoOrder.workSjName : "无"}}</td>
						<td class="chaozuo">
						 	<span @click="getDetails($index)" type="button" data-toggle="modal" data-target=".xiangqing">
						 		<a @click="tianjiaYS($event)" href="javascript:;">订单详情</a></span>
							<span>
				  				<a @click="tianjiaYS($event)" href="{{qnyUrl+photoOrder.oldFiles}}" download="{{qnyUrl+photoOrder.oldFiles}}">下载</a>
				  			</span>
				  			<!-- <template v-if="status=='WAIT_CHECK'">
					  			<span @click="gettongguoId($event,'no',photoOrder.id)">
								    <a @click="tianjiaYS($event,qubie)" href="javascript:;">不通过</a>
								</span>
							    <span @click="gettongguoId($event,'yes',photoOrder.id)">
							    	<a @click="tianjiaYS($event)" href="javascript:;">通过</a>
							    </span>	
				  			</template> -->
<template v-if="status=='WAIT_EMP'||status=='ASSIGNED'||status=='REWORK'">
							    <template v-if="photoOrder.type=='XT'||photoOrder.type=='SJ'">
									<span v-if="photoOrder.workXtId!='0'||photoOrder.workSjId!='0'" @click="getId($event,photoOrder.id,photoOrder.type)">
										<a @click="tianjiaYS($event)" href="javascript:;">重选数码师</a>
									</span>
									<span v-if="photoOrder.workXtId=='0'&&photoOrder.workSjId=='0'" @click="getId($event,photoOrder.id,photoOrder.type)">
										<a @click="tianjiaYS($event)" href="javascript:;">选择数码师</a>
									</span>
								</template>
<template v-if="photoOrder.type=='ALL'">
									<span v-if="!photoOrder.newOneFiles&&photoOrder.workXtId=='0'" @click="getId($event,photoOrder.id,photoOrder.type)">
										<a @click="tianjiaYS($event)" href="javascript:;">选择修图师</a>
									</span>
									<span v-if="!photoOrder.newOneFiles&&photoOrder.workXtId!='0'" @click="getId($event,photoOrder.id,photoOrder.type)">
										<a @click="tianjiaYS($event)" href="javascript:;">重选修图师</a>
									</span>
									<span v-if="photoOrder.newOneFiles&&photoOrder.workSjId=='0'" @click="getId($event,photoOrder.id,photoOrder.type,photoOrder.newOneFiles,photoOrder.workXtId)">
										<a @click="tianjiaYS($event)" href="javascript:;">选择设计师</a>
									</span>
									<span v-if="photoOrder.newOneFiles&&photoOrder.workSjId!='0'" @click="getId($event,photoOrder.id,photoOrder.type,photoOrder.newOneFiles,photoOrder.workXtId)">
										<a @click="tianjiaYS($event)" href="javascript:;">重选设计师</a>
									</span>
								</template>
</template>
<span v-if=" photoOrder.type=='ALL'||photoOrder.type=='XT' ">
						    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?id={{photoOrder.id}}&orderId={{photoOrder.code}}&title={{photoOrder.title}}&workXtId={{photoOrder.workXtId}}&workSjId={{photoOrder.workSjId}}&type={{photoOrder.type}}&per=XT">
						    		修图
						    	</a>
						    </span>
<span v-if=" photoOrder.type=='ALL'||photoOrder.type=='SJ' ">
						    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?id={{photoOrder.id}}&orderId={{photoOrder.code}}&title={{photoOrder.title}}&workXtId={{photoOrder.workXtId}}&workSjId={{photoOrder.workSjId}}&type={{photoOrder.type}}&per=SJ">
						    		设计
						    	</a>
						    </span>

</td>
</tr>
</tbody>
</table>
<p v-if="!photoOrder.length" style="font-size: 24px;margin-bottom: 100px;text-align: center;">
    暂无信息
</p>

</div>
<page :turn-page="paidan"></page>

<!--通过，不通过-->
<div class="modal fade accept" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <p v-if="status=='pass'">确认通过吗</p>
                <p v-if="status=='unPass'">确认不通过吗</p>
            </div>
            <div class="modal-footer">
                <button v-if="status=='jie'" @click="receiveOrder" type="button" class="btn btn-primary sure" data-dismiss="modal">确定</button>
                <button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
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

<!-- 选择数码师 -->
<div class="modal fade workRoom" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="gridSystemModalLabel">选择数码师</h4>
            </div>
            <div class="modal-body row">
                <div class="col-sm-12">
                    <form class="form-horizontal row">
                        <div class="caiwu col-sm-12 control-label">
                            <div class="col-sm-6"></div>
                            <div class="form-group col-sm-4" style="margin-left:42px">
                                <div class="input-group">
                                    <div style="border-radius:50px 0 0 50px" class="input-group-addon">
                                        <i class="iconfont icon-snimicsousuo"></i>
                                    </div>
                                    <input style="border-radius:0 50px 50px 0" v-model="search" class="form-control" type="text" placeholder="搜索数码师">
                                </div>
                            </div>
                            <div class="form-group col-sm-2" style="margin-left: -5%;">
                                <button style="border-radius:50px;padding: 7px 20px;" type="button" @click="workMans('')" class="btn btn-primary btn-sm">
											搜索
										</button>
                            </div>
                        </div>
                    </form>
                    <div class="center row shumashi">
                        <p v-if="!workEmp.length" style="font-size: 24px;">
                            暂无信息
                        </p>
                        <div class="col-sm-3 weiyi" @click="getDigitalId($event,workEmp.id)" v-for="workEmp in workEmp">
                            <div class="product-block">
                                <div>
                                    <img :src="workEmp.logo">
                                </div>
                                <div class="product-bottom">
                                    <p>{{workEmp.nickName}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button style="border-radius:50px;padding: 7px 20px;" type="button" class="btn btn-default" data-dismiss="modal">
							取消
						</button>
                <button style="border-radius:50px;padding: 7px 20px;" v-if="getIds.digitalId" @click="workOrder" type="button" class="btn btn-primary">
							确定
						</button>
                <button style="border-radius:50px;padding: 7px 20px;" v-if="!getIds.digitalId" disabled type="button" class="btn btn-primary">
							确定
						</button>
            </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
    import Lib from '../assets/lib.js'
    import page from '../components/page/page.vue'
    import bus from './bus.js'
    const moment = require('moment')
    require('daterangepicker.js')
    require('daterangepicker.css')
    export default {
        data: () => ({
            qnyUrl: Lib.C.qiniu.jsUrl,
            host: Lib.C.hostPhotoStudio,
            id: sessionStorage.getItem("id"),
            pageNo: 1,
            paidan: {}, //翻页
            getIds: {
                orderId: "", //订单id
                digitalId: "" //工作室id
            },
            diInfo: {},
            status: "SERVER", //订单状态
            workEmp: {},
            orderInfo: {},
            photoOrder: {},
            search: "", //搜索数码师
            orderNum: {},
            dingdanmMZ: "订单标题",
            guo: '', //通过
            huoqudingdanId: '' //通过
        }),
        watch: {},
        created: function() {
            var self = this;
            bus.$on('tongxun', function(data) {
                console.log(11)
                if (data) {
                    self.photoOrders("", this.status);
                    self.photoOrderNum();
                }
            });
            this.workMans();
            this.photoOrderNum();
        },
        ready: function() {
            this.photoOrders("", "ASSIGNED");
        },
        events: {
            'child-sousuo' (obj) {
                this.photoOrders("", this.status, obj);
            },
            'child-turn-page' (obj) {
                this.$set('pageNo', obj.pageNo);
                this.photoOrders("", this.status);
            }
        },
        methods: {
            yinglou() {
                this.$set("dingdanmMZ", "影楼")
            },
            mingzi() {
                this.$set("dingdanmMZ", "订单标题")
            },
            photoOrderNum(e, id) { //数量
                var url = this.host + "v1/work/order/" + this.id + "/workOrderNum",
                    self = this,
                    postParam = {};
                Lib.M.load(url, {}, function(data) {
                    data = data.data;
                    self.$set("orderNum", data);
                }, "get");
            },
            photoOrders(e, status, title) { //查询所有订单
                if (e) {
                    this.$set("orderInfo", []);
                    this.$set('pageNo', 1);
                    $(".daohang a").removeClass("active");
                    $(e.target).addClass("active");
                }
                this.status = status;
                if (status == 'WAIT_EMP' || status == 'ASSIGNED' || status == 'REWORK') {
                    var url = this.host + 'v1/work/order/workOrder/' + this.id;
                } else if (status == 'WAIT_CHECK' || status == 'WAIT_CONFIRM' || status == 'FINISH') {
                    var url = this.host + "v1/work/order/workOrder/" + this.id;
                }
                var postParam = {},
                    self = this;
                this.$set("status", status);
                postParam = {
                    "pageNo": this.pageNo,
                    "pageSize": 10,
                    "status": status,
                    "title": title
                };
                Lib.M.load(url, postParam, function(data) {
                    self.photoOrderNum();
                    if (data.code == 8) {
                        self.$set("paidan", {});
                        self.$set("photoOrder", []);
                        return false;
                    };
                    data = data.data;
                    let page = {
                        pageSize: data.pageSize,
                        totalCount: data.totalCount,
                        pageNo: data.pageNo,
                    };
                    self.$set("paidan", page);
                    data = data.list;
                    for (var i = 0; i < data.length; i++) { //倒计时
                        if (data[i].startTime) {
                            data[i].dataStatus = data[i].urgentTime ? data[i].urgentTime : 72;
                            if (data[i].endTime) {
                                data[i].haoshi = moment(data[i].endTime)._d.getTime() - moment(data[i].startTime)._d.getTime();
                                data[i].haoshi = Math.floor(data[i].haoshi / 86400000) + "天" +
                                    Math.floor(data[i].haoshi / 3600000) + "时" +
                                    Math.floor(data[i].haoshi % 86400000 % 3600000 / 60000) + "分" + data[i].haoshi % 86400000 % 3600000 % 60000 / 1000 + "秒";
                            }
                            data[i].finishTime = Math.floor(((moment(data[i].startTime)._d.getTime() + data[i].dataStatus * 3600000) - moment(new Date())._d.getTime()) / 1000);
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
                    } //  
                    self.$set("photoOrder", data);
                }, "GET");
            },
            getId: function(e, id, type, files, empId) { //获取订单id
                this.getIds.orderId = id;
                this.$set("getIds.type", type);
                this.$set("getIds.files", files);
                this.$set("getIds.empId", empId);
                $(".product-block").css("opacity", 1);
                this.$set("getIds.digitalId", "");
                $(".workRoom").modal('show');
            },
            getDigitalId: function(e, id) { //获取数码师id
                $(".product-block").css("opacity", 1);
                $(e.target).parents(".product-block").css("opacity", 0.6);
                this.$set("getIds.digitalId", id);
            },
            workOrder: function() { //指派数码师
                var url = this.host + 'v1/work/order/workOrder',
                    postParam = {},
                    self = this;
                postParam = {
                    "id": this.getIds.orderId
                };
                if (this.getIds.type == "SJ") {
                    postParam.workSjId = this.getIds.digitalId;
                } else if (this.getIds.type == "XT") {
                    postParam.workXtId = this.getIds.digitalId;
                } else if (this.getIds.type == "ALL") {
                    if (!this.getIds.files) {
                        postParam.workXtId = this.getIds.digitalId;
                    } else {
                        postParam.workSjId = this.getIds.digitalId;
                    }
                }
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    $(".workRoom").modal('hide');
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    if (data.code == -1) {
                        self.photoOrders("", self.status);
                        self.photoOrderNum();
                    }
                }, "put");
            },
            workMans(e, xtId, sjId, type, files) { //查询所有数码师
                var url = this.host + 'v1/work/emp/' + this.id,
                    postParam = {},
                    self = this;
                postParam = {
                    "nickName": this.search,
                    "pageNo": this.pageNo,
                    "pageSize": 10
                };
                if (e) {
                    if (type == "SJ") {
                        postParam.empId = sjId;
                    } else if (type == "XT") {
                        postParam.empId = xtId;
                    } else if (type == "ALL") {
                        if (sjId) {
                            postParam.empId = sjId;
                        } else {
                            postParam.empId = xtId;
                        }
                    }
                    $(".workRoomInfo").modal('show');
                }
                Lib.M.load(url, postParam, function(data) {
                    if (e) {
                        data = data.data.list[0];
                        self.$set("diInfo", data);
                        return false;
                    }
                    if (data.code == 8) {
                        self.$broadcast('parent-turn-page', {});
                        self.$set("workEmp", []);
                        return false;
                    };
                    data = data.data;
                    const page = {
                        pageSize: data.pageSize,
                        totalCount: data.totalCount,
                        pageNo: data.pageNo
                    };
                    self.$broadcast('parent-turn-page', page);
                    data = data.list;
                    self.$set("workEmp", data);
                }, "get");
            },
            getDetails: function(index) {
                this.$set("orderInfo", this.photoOrder[index]);
                if (this.photoOrder[index].type == "ALL") {
                    this.$set("orderInfo.xiutu", JSON.parse(this.photoOrder[index].details).xiutu);
                    this.$set("orderInfo.sheji", JSON.parse(this.photoOrder[index].details).sheji);
                } else if (this.photoOrder[index].type == "XT") {
                    this.$set("orderInfo.xiutu", JSON.parse(this.photoOrder[index].details));
                } else if (this.photoOrder[index].type == "SJ") {
                    this.$set("orderInfo.sheji", JSON.parse(this.photoOrder[index].details));
                }
            },
            gettongguoId(e, guo, id) {
                this.$set("guo", guo);
                this.$set("huoqudingdanId", id);
            },
            passBy(e, guo, id) { //通过
                var url = this.host + "v1/work/order/workOrder",
                    self = this,
                    postParam = {};
                postParam = {
                    "id": this.huoqudingdanId
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    self.photoOrderNum();
                    self.photoOrders("", this.status);
                }, "put");
            },
            tianjiaYS(e) {
                $("span a").removeClass("tianjiaxuanzhong");
                $(e.target).addClass("tianjiaxuanzhong");
            }
        },
        components: {
            page
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
    
    .chaozuo span {
        padding: 2px 4px;
        cursor: pointer;
    }
    
    span a {
        color: #909090;
        padding: 4px 14px;
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
        width: 49.3%;
        margin: 0;
        text-align: center;
        padding: 10px 0;
        border-width: 0.5px;
        border-color: #5072c9;
        border-style: solid;
    }
    
    .hover:hover {
        opacity: 1;
        color: white;
    }
    
    .guanbis {
        padding: 14px;
        background: #275482 !important;
        position: absolute;
        box-shadow: 0px 3px 5px 0px rgba(9, 2, 4, 0.129);
        border-radius: 100%;
        opacity: 1;
        width: 50px;
        height: 50px;
        line-height: 0;
        z-index: 1;
        top: -24px;
        right: -67px;
        color: white;
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
        height: 370px;
        overflow: auto;
    }
    
    .dingdanTitle {
        background: #ed9a0f;
        color: white;
        padding: 12px 0 10px 0;
        border-radius: 8px 8px 0 0;
    }
    
    .dingdanTitle h4 {
        text-indent: 40px;
    }
    
    .shumashi {
        padding: 0 30px
    }
    
    .weiyi {
        margin-bottom: 30px
    }
    
    .center .product-block {
        width: 100%;
        margin: 0;
    }
    
    .kuandu {
        width: 110px
    }
    
    .center .product-block img {
        height: 180px
    }
</style>