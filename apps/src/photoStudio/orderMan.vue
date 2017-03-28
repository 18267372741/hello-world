<template lang="html">
	<div class="worksList clearfix row">
		<div class="col-sm-12" style="min-height: 753px;background:white;overflow:auto">
			<ol class="breadcrumb daohang">
				<li>
				<a @click="photoOrders($event,'WAIT_UPLOAD')" class="active" href="javascript:;">待上传<span v-if="orderNum.waitUpload!=0" class="jiaobiaoSL">{{orderNum.waitUpload}}</span></a>
				</li>
				<li>
				<a @click="photoOrders($event,'SENDING')" href="javascript:;">派单中<span v-if="orderNum.sendIng!=0" class="jiaobiaoSL">{{orderNum.sendIng}}</span></a>
				</li>
				<li>
				<a @click="photoOrders($event,'SERVER')" href="javascript:;">服务中<span v-if="orderNum.serverIng!=0" class="jiaobiaoSL">{{orderNum.serverIng}}</span></a>
				</li>
				<li><a @click="photoOrders($event,'WAIT_CONFIRM')" href="javascript:;">待审核<span v-if="orderNum.waitConfirm!=0" class="jiaobiaoSL">{{orderNum.waitConfirm}}</span></a></li>
				<li><a @click="photoOrders($event,'REWORK')" href="javascript:;">返工中<span v-if="orderNum.reworkIng!=0" class="jiaobiaoSL">{{orderNum.reworkIng}}</span></a></li>
				<li><a @click="photoOrders($event,'FINISH')" href="javascript:;">已完结</a></li>
			</ol>
			<table class="table table-condensedn table-hover table-bordered">
				<thead>
					<tr>
						<th style="min-width:250px">订单标题</th>
						<th v-if="statuss=='FINISH'" style="min-width:80px">工作室</th>
						<th style="min-width:150px">下单时间</th>
						<th style="min-width:153px" v-if="statuss!='FINISH'">剩余时间</th>
						<!-- <th style="min-width:150px" v-if="statuss=='FINISH'">消耗时间</th> -->
						<th style="min-width:150px" v-if="statuss=='FINISH'">完成时间</th>
						<th style="min-width:100px">加急/时间</th>
						<th style="min-width:100px">模板</th>
						<th style="min-width:83px">类型</th>
						<th style="min-width:350px">操作 </th>
					</tr>
				</thead>
				<tbody style="background: white;">
					<tr v-for="photoOrder in photoOrder">
						<td>{{photoOrder.title}}</td>
						<td v-if="statuss=='FINISH'"> {{photoOrder.nickName}} </td>
						<td>{{photoOrder.createTime}}</td>
						<td :class="{'jinggao': photoOrder.sixiaoshi<0}" v-if="statuss!='FINISH'">{{photoOrder.startTime?photoOrder.finishTime:"暂无人接单"}}</td>
						<td :class="{'jinggao': photoOrder.chaoqi}" v-if="statuss=='FINISH'">{{photoOrder.endTime}}</td>
						<td v-if="photoOrder.isUrgent=='YES'">{{photoOrder.urgentPrice}}倍/{{photoOrder.urgentTime}}</td>
						<td v-if="photoOrder.isUrgent=='NO'">不加急</td>
						<td>
							<span style="cursor:pointer" v-if="photoOrder.tempInfoId!=0" @click="getTemps($event,photoOrder.tempInfoId)">
								<a @click="tianjiaYS($event)" href="javascript:;">预览下载</a>
							</span>
							<span v-if="photoOrder.tempInfoId==0">
								无模板
							</span>
						</td>
						<td v-if="photoOrder.type=='ALL'"> 修图设计 </td>
						<td v-if="photoOrder.type=='XT'"> 修图 </td>
						<td v-if="photoOrder.type=='SJ'"> 设计 </td>
						<td class="chaozuo">
							<span @click="getDetails($index)" type="button" data-toggle="modal" data-target=".xiangqing">
								<a @click="tianjiaYS($event)" href="javascript:;">详情</a></span>
							<template v-if="statuss=='WAIT_UPLOAD'">
								<span>
									<a @click="tianjiaYS($event)" target="_blank" href="#/index/sendOrder2?id={{photoOrder.id}}">上传</a>
								</span>
							</template>
<template v-if="statuss=='WAIT_CONFIRM'">
						    	<template v-if="photoOrder.type=='XT'">
							    	<span>
							    		<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?orderId={{photoOrder.code}}&workXtId={{photoOrder.workXtId}}&workSjId={{photoOrder.workSjId}}&type={{photoOrder.type}}&per=XT&title={{photoOrder.title}}&id={{photoOrder.id}}">
							    			预览
							    		</a>
							    	</span>
						    	</template>
<span v-if="photoOrder.type=='SJ'||photoOrder.type=='ALL'">
						    		<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?orderId={{photoOrder.code}}&workXtId={{photoOrder.workXtId}}&workSjId={{photoOrder.workSjId}}&type={{photoOrder.type}}&per=SJ&title={{photoOrder.title}}&id={{photoOrder.id}}">
						    			预览
						    		</a>
						    	</span>
<span @click="getId($event,photoOrder.id,'pass',status.status,photoOrder.workInfoId)" data-toggle="modal" data-target=".pinglun" v-if="photoOrder.status=='WAIT_CONFIRM'">
							    	<a @click="tianjiaYS($event)" href="javascript:;">通过</a>
							    </span>
</template>
<template v-if="statuss=='REWORK'">
						    	<template v-if="photoOrder.type=='XT'">
							    	<span>
							    		<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic2?orderId={{photoOrder.code}}&workXtId={{photoOrder.workXtId}}&workSjId={{photoOrder.workSjId}}&type={{photoOrder.type}}&per=XT&title={{photoOrder.title}}&id={{photoOrder.id}}">
							    			预览
							    		</a>
							    	</span>
						    	</template>
<span v-if="photoOrder.type=='SJ'||photoOrder.type=='ALL'">
						    		<a  @click="tianjiaYS($event)" target="_blank" href="#/index/downPic2?orderId={{photoOrder.code}}&workXtId={{photoOrder.workXtId}}&workSjId={{photoOrder.workSjId}}&type={{photoOrder.type}}&per=SJ&title={{photoOrder.title}}&id={{photoOrder.id}}">
						    			预览
						    		</a>
						    	</span>
</template>
<template v-if="statuss=='FINISH'">
						    	<template v-if="photoOrder.type=='XT'||photoOrder.type=='ALL'">
							    	<span>
							    		<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic2?orderId={{photoOrder.code}}&workXtId={{photoOrder.workXtId}}&workSjId={{photoOrder.workSjId}}&type={{photoOrder.type}}&per=XT&title={{photoOrder.title}}&id={{photoOrder.id}}&down={{photoOrder.downloadNum}}">
							    			修图
							    		</a>
							    	</span>
						    	</template>
<template v-if="photoOrder.type!='XT'&&photoOrder.type!='ALL'">
							    	<span>
							    		<i style="padding: 4px 12px;cursor:default"> 一一 </i>
							    	</span>
						    	</template>
<span v-if="photoOrder.type=='SJ'||photoOrder.type=='ALL'">
						    		<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic2?orderId={{photoOrder.code}}&workXtId={{photoOrder.workXtId}}&workSjId={{photoOrder.workSjId}}&type={{photoOrder.type}}&per=SJ&title={{photoOrder.title}}&id={{photoOrder.id}}&down={{photoOrder.downloadNum}}">
						    			设计
						    		</a>
						    	</span>
<template v-if="photoOrder.type!='SJ'&&photoOrder.type!='ALL'">
							    	<span>
							    		<i style="padding: 4px 12px;cursor:default"> 一一 </i>
							    	</span>
						    	</template>
<span @click="lookPL($event,photoOrder.id)" data-toggle="modal" data-target=".pinglun">
							    	<a @click="tianjiaYS($event)" href="javascript:;">评论</a>
							    </span>
</template>
</td>
</tr>
</tbody>
</table>
<p v-if="!photoOrder.length" style="font-size: 24px;margin-bottom: 211px;text-align: center;">
    暂无信息
</p>
</div>
<page :turn-page="orderPage"></page>
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
                            <p v-if="wenjianming" style="text-align:center">压缩包名：{{wenjianming}}</p>
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
                                    <div v-if="orderInfo.sheji.sheji=='1'">简约唯美</div>
                                    <div v-if="orderInfo.sheji.sheji=='1'">适用于普通相册，接地气，符合大众审美</div>
                                    <div v-if="orderInfo.sheji.sheji=='2'">时尚大气</div>
                                    <div v-if="orderInfo.sheji.sheji=='2'">适用于凸显衣着、装饰和气质</div>
                                    <div v-if="orderInfo.sheji.sheji=='3'">可爱花销</div>
                                    <div v-if="orderInfo.sheji.sheji=='3'">适用于青年萌系列</div>
                                    <div v-if="orderInfo.sheji.sheji=='4'">主题系列</div>
                                    <div v-if="orderInfo.sheji.sheji=='4'">适用于套图系列，高逼格</div>
                                    <div v-if="orderInfo.sheji.sheji=='5'">复古端庄</div>
                                    <div v-if="orderInfo.sheji.sheji=='5'">更加突出复古怀旧的味道</div>
                                    <div v-if="orderInfo.sheji.sheji=='6'">旅拍风格</div>
                                    <div v-if="orderInfo.sheji.sheji=='6'">文字图案多元化，赋予画面潮流感美</div>
                                </li>
                            </ul>
                            <p v-if="wenjianming" style="text-align:center">压缩包名：>{{wenjianming}}</p>
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
<!--返工-->
<div class="modal fade pass" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <p>
                    确认返工吗？
                </p>
            </div>
            <div class="modal-footer">
                <button @click="passBy" type="button" class="btn btn-primary sure" data-dismiss="modal">确定</button>
                <button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
<!--评论-->
<div class="modal fade pinglun" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="col-sm-12">
                    <h4 class="modal-title" id="gridSystemModalLabel">评论</h4>
                </div>
            </div>
            <div class="modal-body" style="overflow: hidden;">
                <fieldset v-if="orderPinglun.status=='add'">
                    <div class="form-group">
                        <div class="col-sm-12" style="margin-bottom: 20px;">
                            <p>
                                <span>质量满意分:</span>
                                <span @click="zlScore($event,'1')" class="iconfont icon-grade" v-bind:style="{'color': pinglun.eq6}"></span>
                                <span @click="zlScore($event,'2')" class="iconfont icon-grade" v-bind:style="{'color': pinglun.eq7}"></span>
                                <span @click="zlScore($event,'3')" class="iconfont icon-grade" v-bind:style="{'color': pinglun.eq8}"></span>
                                <span @click="zlScore($event,'4')" class="iconfont icon-grade" v-bind:style="{'color': pinglun.eq9}"></span>
                                <span @click="zlScore($event,'5')" class="iconfont icon-grade" v-bind:style="{'color': pinglun.eq10}"></span>
                                <span>{{pinglun.zLscore}}</span>
                            </p>
                        </div>
                        <div class="col-sm-12">
                            <p>
                                回件满意分:
                                <span @click="score($event,'1')" class="iconfont icon-grade" v-bind:style="{'color': pinglun.eq1}"></span>
                                <span @click="score($event,'2')" class="iconfont icon-grade" v-bind:style="{'color': pinglun.eq2}"></span>
                                <span @click="score($event,'3')" class="iconfont icon-grade" v-bind:style="{'color': pinglun.eq3}"></span>
                                <span @click="score($event,'4')" class="iconfont icon-grade" v-bind:style="{'color': pinglun.eq4}"></span>
                                <span @click="score($event,'5')" class="iconfont icon-grade" v-bind:style="{'color': pinglun.eq5}"></span>
                                <span>{{pinglun.score}}</span>
                            </p>
                        </div>
                        <p for="inputEmail3" class="col-sm-4 control-label">
                            评论内容
                        </p>
                        <div class="col-sm-12" style="margin-bottom: 10px;">
                            <textarea v-model="pinglun.content" class="form-control" rows="4"></textarea>
                        </div>
                        <div class="col-sm-12 qiniuBtn">
                            <qiniu :options="pinglunPic"></qiniu>
                        </div>
                        <div class="col-sm-12">
                            <div>
                                <template v-for="images in pinglun.images">
											<div style="position: relative; float: left; width: 100px;margin:8px 10px 0 0; box-shadow: 0 0 5px #ccc;">
												<span @click="deletePic($index)" class="jiaobiao">×</span>
												<a target="_blank" :href="qnyUrl+images">
													<img :src="qnyUrl+images+'?imageMogr2/thumbnail/110x110!'" class="img-thumbnail"/>
												</a>
											</div>
										</template>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset v-if="orderPinglun.status=='look'">
                    <div v-for="pinglun in pinglun" class="form-group row">
                        <div class="col-sm-12">
                            <div class="col-sm-2">
                                <template v-if="pinglun.photoLogo">
											<img :src="pinglun.photoLogo" class="img-thumbnail" style="width: 110px;height: 110px;" />
											<p class="text-center">{{pinglun.photoName}}</p>
											<p class="text-center">质量分:{{pinglun.massScore}}</p>
											<p class="text-center">满意分:{{pinglun.satisfyScore}}</p>
										</template>
                                <!-- <template v-if="pinglun.workLogo">
											<img :src="pinglun.workLogo" class="img-thumbnail" style="width: 110px;height: 110px;" />
											<p class="text-center">{{pinglun.workName}}</p>
										</template> -->
                            </div>
                            <div class="col-sm-9">
                                <span>{{pinglun.content?pinglun.content:""}}</span>
                                <div>
                                    <template v-for="images in pinglun.images">
												<div>
													<a target="_blank" :href="qnyUrl+images" class="row">
														<img :src="qnyUrl+images" style="padding: 5px;" class="col-sm-12"/>
													</a>
												</div>
											</template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p v-if="!pinglun.length">暂无评论</p>
                </fieldset>
            </div>

            <div v-if="orderPinglun.status=='add'" class="modal-footer">
                <div class="col-sm-12">
                    <button @click="pingluns" type="button" class="btn btn-primary">确定</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
    import Lib from '../assets/lib.js'
    import qiniu from '../components/qiniu.vue'
    import page from '../components/page/page.vue'
    import bus from './bus.js'
    const moment = require('moment')
    require('daterangepicker.js')
    require('daterangepicker.css')
    export default {
        data: () => ({
            host: Lib.C.hostPhotoStudio,
            qnyUrl: Lib.C.qiniu.jsUrl,
            id: sessionStorage.getItem("id"),
            pinglunPic: {
                key: "pinglunPic",
                max_file_size: "40mb"
            },
            pageNo: 1,
            getTemp: {}, //模板
            orderPage: {}, //订单翻页
            orderPinglun: { //评论状态
                "status": ""
            },
            statuss: "ALL", //订单状态
            photoOrder: {},
            pinglun: { //评论
                "images": []
            },
            orderInfo: {}, //详情
            wenjianming: "", //上传文件名
            status: {
                "status": "",
                "id": ""
            },
            orderNum: {}
        }),
        watch: {},
        created: function() {
            var self = this;
            bus.$on('finishThree', function(data) {
                if (data) {
                    setTimeout(function() {
                        self.photoOrders("", self.statuss);
                        self.photoOrderNum();
                    }, 2000)
                }
            });
            this.photoOrders("", "WAIT_UPLOAD");
            this.photoOrderNum();
        },
        ready: function() {},
        events: {
            'child-turn-page' (obj) {
                this.$set('pageNo', obj.pageNo);
                this.photoOrders("", this.statuss);
            },
            'child-sousuo' (obj) {
                this.photoOrders("", this.statuss, obj);
            },
            'child-qiniu-data' (obj) {
                if (obj.key) {
                    if (this.pinglun.images.length >= 5) {
                        Lib.M.topRightInfoTips({
                            title: "评论图不得大于5张"
                        });
                        return false;
                    }
                    this.pinglun.images.push(obj.key);
                }
            }
        },
        methods: {
            photoOrderNum(e, id) {
                var url = this.host + "v1/work/order/" + this.id + "/photoOrderNum",
                    self = this,
                    postParam = {};
                Lib.M.load(url, {}, function(data) {
                    data = data.data;
                    self.$set("orderNum", data);
                }, "get");
            },
            photoOrders(e, status, title) {
                if (e) {
                    this.$set("orderInfo", []);
                    this.$set('pageNo', 1);
                    $(".daohang a").removeClass("active");
                    $(e.target).addClass("active");
                }
                this.statuss = status;
                var url = this.host + 'v1/photo/order/photoOrder/' + this.id,
                    postParam = {},
                    self = this;
                postParam = {
                    "pageNo": this.pageNo,
                    "pageSize": 10,
                    "status": this.statuss,
                    "title": title
                };
                Lib.M.load(url, postParam, function(data) {
                    self.photoOrderNum();
                    if (data.code == 8) {
                        self.$set("orderPage", {});
                        self.$set("photoOrder", []);
                        return false;
                    };
                    data = data.data;
                    const page = {
                        pageSize: data.pageSize,
                        totalCount: data.totalCount,
                        pageNo: data.pageNo,
                    };
                    self.$set("orderPage", page);
                    data = data.list;
                    for (var i = 0; i < data.length; i++) { //倒计时
                        if (data[i].startTime) {
                            if (data[i].type == "ALL") {
                                data[i].dataStatus = data[i].urgentTime ? data[i].urgentTime : 96;
                            } else if (data[i].type != "ALL") {
                                data[i].dataStatus = data[i].urgentTime ? data[i].urgentTime : 72;
                            }
                            // data[i].dataStatus=data[i].urgentTime?data[i].urgentTime:72;
                            if (data[i].endTime) {
                                data[i].haoshi = moment(data[i].endTime)._d.getTime() - moment(data[i].startTime)._d.getTime();
                                data[i].haoshi = Math.floor(data[i].haoshi / 86400000) + "天" +
                                    Math.floor(data[i].haoshi / 3600000) + "时" +
                                    Math.floor(data[i].haoshi % 86400000 % 3600000 / 60000) + "分" + data[i].haoshi % 86400000 % 3600000 % 60000 / 1000 + "秒";
                            }
                            data[i].finishTime = Math.floor(((moment(data[i].startTime)._d.getTime() + data[i].dataStatus * 3600000) - moment(new Date())._d.getTime()) / 1000);
                            if (data[i].endTime) {
                                data[i].chaoqi = Math.floor(moment(data[i].endTime)._d.getTime() - moment(data[i].startTime)._d.getTime() > data[i].dataStatus * 3600000);
                                console.log(data[i].endTime);
                                console.log(data[i].startTime);
                                console.log(data[i].dataStatus * 3600000);
                                // -data[i].dataStatus*3600
                            }
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
                    self.$set("photoOrder", data);
                }, "GET");
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
            lookPL: function(e, id) { //评论订单
                this.$set("orderPinglun.status", "look")
                var url = this.host + "v1/photo/comment/" + id,
                    self = this,
                    postParam = {};
                Lib.M.load(url, {}, function(data) {
                    if (data.code == 8) {
                        self.$set("pinglun", []);
                        return false;
                    }
                    data = data.data;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].images) {
                            data[i].images = JSON.parse(data[i].images);
                        }
                    }
                    self.$set("pinglun", data);
                }, "get");
            },
            deletePic(index) { //删除图片
                this.pinglun.images.splice(index, 1);
            },
            pingluns: function() { //评论订单
                var url = this.host + "v1/photo/comment/photoComment",
                    self = this,
                    postParam = {};
                if (!this.pinglun.massScore) {
                    Lib.M.topRightInfoTips({
                        title: "请输入质量满意分"
                    });
                    return false;
                }
                if (!this.pinglun.satisfyScore) {
                    Lib.M.topRightInfoTips({
                        title: "请输入回件满意分"
                    });
                    return false;
                }
                postParam = {
                    "workInfoId": parseInt(this.pinglun.workId),
                    "photoInfoId": parseInt(this.id),
                    "orderInfoId": this.pinglun.id,
                    "content": this.pinglun.content ? this.pinglun.content : "未评论",
                    "images": JSON.stringify(this.pinglun.images),
                    "massScore": parseInt(this.pinglun.massScore),
                    "satisfyScore": parseInt(this.pinglun.satisfyScore)
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    if (data.code == -1) {
                        $('.pinglun').modal('hide');
                        self.passBy();
                    }
                });
            },
            getId: function(e, id, status, type, workId) { //获取id，返工或者通过
                if (status == "unPass") {
                    $('.pass').modal('show');
                } else if (status == "pass") {
                    this.$set("orderPinglun.status", "add");
                }
                this.$set("status.type", type);
                this.$set("status.status", status);
                this.$set("status.id", id);
                this.$set("pinglun", {});
                this.$set("pinglun.workId", workId);
                this.$set("pinglun.images", []);
                this.pinglun.id = id;
            },
            passBy: function() { //通过
                var url = this.host + "v1/photo/order/photoOrder",
                    self = this,
                    postParam = {};
                postParam = {
                    "id": this.status.id,
                };
                if (this.status.status == "pass") {
                    postParam.status = "FINISH";
                } else if (this.status.status == "unPass") {
                    postParam.status = "REWORK";
                    postParam.reworkDescribe = "FG";
                    postParam.reworkType = this.status.type;
                }
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    if (data.code == -1) {
                        self.photoOrderNum();
                        self.photoOrders("", "WAIT_UPLOAD");
                    }
                }, "put");
            },
            getDetails(index) {
                this.$set("orderInfo", this.photoOrder[index]);
                this.$set("wenjianming", this.photoOrder[index].oldFiles.split("/")[4]);
                if (this.photoOrder[index].type == "ALL") {
                    this.$set("orderInfo.xiutu", JSON.parse(this.photoOrder[index].details).xiutu);
                    this.$set("orderInfo.sheji", JSON.parse(this.photoOrder[index].details).sheji);
                } else if (this.photoOrder[index].type == "XT") {
                    this.$set("orderInfo.xiutu", JSON.parse(this.photoOrder[index].details));
                } else if (this.photoOrder[index].type == "SJ") {
                    this.$set("orderInfo.sheji", JSON.parse(this.photoOrder[index].details));
                }
            },
            score: function(e, num) {
                if (num == "1") {
                    this.$set("pinglun.score", "1分，失望");
                    this.$set("pinglun.eq1", "#737373");
                    this.$set("pinglun.eq2", "#d0d0d0");
                    this.$set("pinglun.eq3", "#d0d0d0");
                    this.$set("pinglun.eq4", "#d0d0d0");
                    this.$set("pinglun.eq5", "#d0d0d0");
                } else if (num == "2") {
                    this.$set("pinglun.score", "2分，不满");
                    this.$set("pinglun.eq1", "#737373");
                    this.$set("pinglun.eq2", "#737373");
                    this.$set("pinglun.eq3", "#d0d0d0");
                    this.$set("pinglun.eq4", "#d0d0d0");
                    this.$set("pinglun.eq5", "#d0d0d0");
                } else if (num == "3") {
                    this.$set("pinglun.score", "3分，一般");
                    this.$set("pinglun.eq1", "#fab54d");
                    this.$set("pinglun.eq2", "#fab54d");
                    this.$set("pinglun.eq3", "#fab54d");
                    this.$set("pinglun.eq4", "#d0d0d0");
                    this.$set("pinglun.eq5", "#d0d0d0");
                } else if (num == "4") {
                    this.$set("pinglun.score", "4分，满意");
                    this.$set("pinglun.eq1", "#fab54d");
                    this.$set("pinglun.eq2", "#fab54d");
                    this.$set("pinglun.eq3", "#fab54d");
                    this.$set("pinglun.eq4", "#fab54d");
                    this.$set("pinglun.eq5", "#d0d0d0");
                } else if (num == "5") {
                    this.$set("pinglun.score", "5分，惊喜");
                    this.$set("pinglun.eq1", "#dd2727");
                    this.$set("pinglun.eq2", "#dd2727");
                    this.$set("pinglun.eq3", "#dd2727");
                    this.$set("pinglun.eq4", "#dd2727");
                    this.$set("pinglun.eq5", "#dd2727");
                }
                this.pinglun.satisfyScore = num;
            },
            zlScore: function(e, num) {
                if (num == "1") {
                    this.$set("pinglun.zLscore", "1分，失望");
                    this.$set("pinglun.eq6", "#737373");
                    this.$set("pinglun.eq7", "#d0d0d0");
                    this.$set("pinglun.eq8", "#d0d0d0");
                    this.$set("pinglun.eq9", "#d0d0d0");
                    this.$set("pinglun.eq10", "#d0d0d0");
                } else if (num == "2") {
                    this.$set("pinglun.zLscore", "2分，不满");
                    this.$set("pinglun.eq6", "#737373");
                    this.$set("pinglun.eq7", "#737373");
                    this.$set("pinglun.eq8", "#d0d0d0");
                    this.$set("pinglun.eq9", "#d0d0d0");
                    this.$set("pinglun.eq10", "#d0d0d0");
                } else if (num == "3") {
                    this.$set("pinglun.zLscore", "3分，一般");
                    this.$set("pinglun.eq6", "#fab54d");
                    this.$set("pinglun.eq7", "#fab54d");
                    this.$set("pinglun.eq8", "#fab54d");
                    this.$set("pinglun.eq9", "#d0d0d0");
                    this.$set("pinglun.eq10", "#d0d0d0");
                } else if (num == "4") {
                    this.$set("pinglun.zLscore", "4分，满意");
                    this.$set("pinglun.eq6", "#fab54d");
                    this.$set("pinglun.eq7", "#fab54d");
                    this.$set("pinglun.eq8", "#fab54d");
                    this.$set("pinglun.eq9", "#fab54d");
                    this.$set("pinglun.eq10", "#d0d0d0");
                } else if (num == "5") {
                    this.$set("pinglun.zLscore", "5分，惊喜");
                    this.$set("pinglun.eq6", "#dd2727");
                    this.$set("pinglun.eq7", "#dd2727");
                    this.$set("pinglun.eq8", "#dd2727");
                    this.$set("pinglun.eq9", "#dd2727");
                    this.$set("pinglun.eq10", "#dd2727");
                }
                this.pinglun.massScore = num;
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
        color: #909090
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
        margin-bottom: 0;
    }
    
    .icon-grade {
        color: rgb(208, 208, 208);
    }
    
    .worksList .table tr th:first-child,
    .worksList .table tr td:first-child {
        text-align: left !important;
        padding-left: 80px
    }
    
    .dropdown-menu {
        min-width: 102px;
        left: 0px;
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
        line-height: 0;
        z-index: 1;
        top: -24px;
        right: -67px;
        color: white;
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
    
    .dingdanTitle {
        background: #ed9a0f;
        color: white;
        padding: 12px 0 10px 0;
        border-radius: 8px 8px 0 0;
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
        border-radius: 50px;
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