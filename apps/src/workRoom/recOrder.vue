<template lang="html">
	<div class="worksList clearfix row">
		<div class="col-sm-12" style="min-height: 753px;background:white;overflow:auto">
			<ol class="breadcrumb daohang">
				<li><a @click="assignOrder($event,'zhiding')" class="active" href="javascript:;">指定订单<span v-if="orderNum.assign!=0" class="jiaobiaoSL">{{orderNum.assign}}</span></a></li>
				<li><a @click="assignOrder($event,'kejie')" href="javascript:;">可接订单<span v-if="orderNum.canServer!=0" class="jiaobiaoSL">{{orderNum.canServer}}</span></a></li>
				<li><a @click="assignOrder($event,'WAIT_EMP')" href="javascript:;">待分配<span v-if="orderNum.waitFenPei!=0" class="jiaobiaoSL">{{orderNum.waitFenPei}}</span></a></li>
				<li><a @click="assignOrder($event,'SERVER')" href="javascript:;">服务中<span v-if="orderNum.serverIng!=0" class="jiaobiaoSL">{{orderNum.serverIng}}</span></a></li>
				<li><a @click="assignOrder($event,'WAIT_CHECK')" href="javascript:;">工作室审核<span v-if="orderNum.waitCheck!=0" class="jiaobiaoSL">{{orderNum.waitCheck}}</span></a></li>
				<li><a @click="assignOrder($event,'WAIT_CONFIRM')" href="javascript:;">影楼审核<span v-if="orderNum.waitConfirm!=0" class="jiaobiaoSL">{{orderNum.waitConfirm}}</span></a></li>
				<li><a @click="assignOrder($event,'REWORK')" href="javascript:;">返工<span v-if="orderNum.reworkIng!=0" class="jiaobiaoSL">{{orderNum.reworkIng}}</span></a></li>
				<!-- <li @click="assignOrder($event,'WAIT_COMMENT')">
					<a href="javascript:;"> 待评价 </a>
				</li> -->
				<li><a @click="assignOrder($event,'FINISH')" href="javascript:;">已完结</a></li> 
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
						<th style="min-width:100px">订单名称</th>
						<th style="min-width:153px">下单时间</th>
						<th style="min-width:150px" v-if="orderStatus != 'FINISH'">
							剩余时间
							<div class="btn-group">
							  <span type="button" class="dropdown-toggle" data-toggle="dropdown">
							    <span style="margin-top: -6px;" class="caret"></span>
							  </span>
							  <ul style="margin: 2px -72px 0px;min-width: 100px;text-align:center" class="dropdown-menu" role="menu">
							    <li @click="paixu"><a href="javascript:;">剩余时间排序</a></li>
							    <li style="margin: 4px 0;" class="divider"></li>
							    <li @click="assignOrder('',orderStatus,'')"><a href="javascript:;">普通排序</a></li>
							  </ul>
							</div>
						</th>
						<th style="min-width:150px" v-if="orderStatus == 'FINISH'">完成时间</th>
						<th style="min-width:90px">修图师</th>
						<th style="min-width:90px">设计师</th>
						<th style="min-width:82px">类型</th>
						<th style="min-width:100px">加急/时间</th>
						<th style="min-width:434px">操作</th>
					</tr>
				</thead>
				<tbody style="background:white">
					<tr v-for="getOrder in getOrder">
						<td>{{getOrder.nickName}}</td>
						<td>{{getOrder.title}}</td>
						<td>{{getOrder.createTime}}</td>
						<td :class="{'jinggao': getOrder.sixiaoshi<0}" v-if="orderStatus != 'FINISH'">{{getOrder.startTime?getOrder.finishTime:"还未接单"}}</td>
						<td :class="{'jinggao': getOrder.chaoqi}" v-if="orderStatus == 'FINISH'">{{getOrder.endTime}}</td>
						<td>{{getOrder.workXtName ? getOrder.workXtName : "无"}}</td>
						<td>{{getOrder.workSjName ? getOrder.workSjName : "无"}}</td>
						<td v-if="getOrder.type=='ALL'">修图设计</td>
						<td v-if="getOrder.type=='XT'">修图</td>
						<td v-if="getOrder.type=='SJ'">设计</td>
						<td v-if="getOrder.isUrgent=='YES'">{{getOrder.urgentPrice}}倍/{{getOrder.urgentTime}}</td>
						<td v-if="getOrder.isUrgent=='NO'">不加急</td>
						<td class="chaozuo">
							<span @click="getDetails($index,'yiwancheng')" type="button" data-toggle="modal" data-target=".xiangqing">
								<a @click="tianjiaYS($event)" href="javascript:;">详情</a></span>
							<!-- <span v-if="getOrder.tempInfoId!=0" @click="getTemps($event,getOrder.tempInfoId)">
						    	<a @click="tianjiaYS($event)" @click="tianjiaYS($event)" href="javascript:;">预览模板</a>
						    </span> -->
						    <span v-if="!(orderStatus=='zhiding'||orderStatus=='kejie'||orderStatus=='FINISH')">
						    	<a @click="tianjiaYS($event)" :href="qnyUrl+getOrder.oldFiles" :download="qnyUrl+getOrder.oldFiles">下载</a>
						    </span>
						    <template v-if="orderStatus=='zhiding'">
						    	<span @click="getOrderId($event,getOrder.id,'jie')">
							    	<a @click="tianjiaYS($event)" href="javascript:;">接单</a>
							    </span>
							    <span @click="getOrderId($event,getOrder.id,'ju')">
									<a @click="tianjiaYS($event,'qubie')" href="javascript:;">拒单</a>
								</span>
						    </template>
<template v-if="orderStatus=='kejie'">
						    	<span @click="getOrderId($event,getOrder.id,'jie')">
							    	<a @click="tianjiaYS($event)" href="javascript:;">接单</a>
							    </span>
						    </template>
<template v-if="orderStatus=='SERVER'||orderStatus=='WAIT_EMP'||orderStatus=='REWORK'">
						    	<template v-if="getOrder.type=='XT'||getOrder.type=='SJ'">
									<span v-if="getOrder.workXtId!='0'||getOrder.workSjId!='0'" @click="getId($event,getOrder.id,getOrder.type)">
										<a @click="tianjiaYS($event)" href="javascript:;">重选数码师</a>
									</span>
									<span v-if="getOrder.workXtId=='0'&&getOrder.workSjId=='0'" @click="getId($event,getOrder.id,getOrder.type)">
										<a @click="tianjiaYS($event)" href="javascript:;">选择数码师</a>
									</span>
								</template>
<template v-if="getOrder.type=='ALL'">
									<span v-if="!getOrder.newOneFiles&&getOrder.workXtId=='0'" @click="getId($event,getOrder.id,getOrder.type)">
										<a @click="tianjiaYS($event)" href="javascript:;">选择修图师</a>
									</span>
									<span v-if="!getOrder.newOneFiles&&getOrder.workXtId!='0'" @click="getId($event,getOrder.id,getOrder.type)">
										<a @click="tianjiaYS($event)" href="javascript:;">重选修图师</a>
									</span>
									<span v-if="getOrder.newOneFiles&&getOrder.workSjId=='0'" @click="getId($event,getOrder.id,getOrder.type,getOrder.newOneFiles,getOrder.workXtId)">
										<a @click="tianjiaYS($event)" href="javascript:;">选择设计师</a>
									</span>
									<span v-if="getOrder.newOneFiles&&getOrder.workSjId!='0'" @click="getId($event,getOrder.id,getOrder.type,getOrder.newOneFiles,getOrder.workXtId)">
										<a @click="tianjiaYS($event)" href="javascript:;">重选设计师</a>
									</span>
								</template>
</template>
<template v-if="orderStatus=='WAIT_CHECK'">
						    	<span v-if="getOrder.status=='WAIT_CHECK'" @click="getOrderId($event,getOrder.id,'unPass',getOrder.type,getOrder.newFiles)">
							    	<a @click="tianjiaYS($event,qubie)" href="javascript:;">不通过</a>
							    </span>
							    <span v-if="getOrder.status=='WAIT_CHECK'" @click="getOrderId($event,getOrder.id,'pass',getOrder.type,getOrder.newFiles)" >
							    	<a @click="tianjiaYS($event)" href="javascript:;">通过</a>
							    </span>
							    <span v-if=" getOrder.type=='ALL'||getOrder.type=='XT' ">
							    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?id={{getOrder.id}}&orderId={{getOrder.code}}&workXtId={{getOrder.workXtId}}&workSjId={{getOrder.workSjId}}&type={{getOrder.type}}&per=XT&title={{getOrder.title}}">
							    		修图
							    	</a>
							    </span>
							    <span v-if="getOrder.type!='XT'&&getOrder.type!='ALL'">
						    		<i style="padding: 4px 12px;cursor:default"> 一一 </i>
						    	</span>
							    <span v-if=" getOrder.type=='ALL'||getOrder.type=='SJ' ">
							    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?id={{getOrder.id}}&orderId={{getOrder.code}}&workXtId={{getOrder.workXtId}}&workSjId={{getOrder.workSjId}}&type={{getOrder.type}}&per=SJ&title={{getOrder.title}}">
							    		设计
							    	</a>
							    </span>
							    <span v-if="getOrder.type!='SJ'&&getOrder.type!='ALL'">
						    		<i style="padding: 4px 12px;cursor:default"> 一一 </i>
						    	</span>
						    </template>
<template v-if="orderStatus=='WAIT_CONFIRM'">
							    <span v-if=" getOrder.type=='ALL'||getOrder.type=='XT' ">
							    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?id={{getOrder.id}}&orderId={{getOrder.code}}&workXtId={{getOrder.workXtId}}&workSjId={{getOrder.workSjId}}&type={{getOrder.type}}&per=XT&title={{getOrder.title}}">
							    		修图
							    	</a>
							    </span>
							    <span v-if="getOrder.type!='XT'&&getOrder.type!='ALL'">
						    		<i style="padding: 4px 12px;cursor:default"> 一一 </i>
						    	</span>
							    <span v-if=" getOrder.type=='ALL'||getOrder.type=='SJ' ">
							    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?id={{getOrder.id}}&orderId={{getOrder.code}}&workXtId={{getOrder.workXtId}}&workSjId={{getOrder.workSjId}}&type={{getOrder.type}}&per=SJ&title={{getOrder.title}}">
							    		设计
							    	</a>
							    </span>
							    <span v-if="getOrder.type!='SJ'&&getOrder.type!='ALL'">
						    		<i style="padding: 4px 12px;cursor:default"> 一一 </i>
						    	</span>
						    </template>
<template v-if="orderStatus=='REWORK'">

							    <span v-if=" getOrder.type=='ALL'||getOrder.type=='XT' ">
							    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?id={{getOrder.id}}&orderId={{getOrder.code}}&workXtId={{getOrder.workXtId}}&workSjId={{getOrder.workSjId}}&type={{getOrder.type}}&per=XT&title={{getOrder.title}}">
							    		修图
							    	</a>
							    </span>
						    	<span v-if="getOrder.type!='XT'&&getOrder.type!='ALL'">
						    		<i style="padding: 4px 12px;cursor:default"> 一一 </i>
						    	</span>
							    <span v-if=" getOrder.type=='ALL'||getOrder.type=='SJ' ">
							    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?id={{getOrder.id}}&orderId={{getOrder.code}}&workXtId={{getOrder.workXtId}}&workSjId={{getOrder.workSjId}}&type={{getOrder.type}}&per=SJ&title={{getOrder.title}}">
							    		设计
							    	</a>
							    </span>
						    	<span v-if="getOrder.type!='SJ'&&getOrder.type!='ALL'">
						    		<i style="padding: 4px 12px;cursor:default"> 一一 </i>
						    	</span>
						    </template>
<template v-if="orderStatus=='WAIT_COMMENT'">
						    	<span v-if=" getOrder.type=='ALL'||getOrder.type=='XT' ">
							    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?id={{getOrder.id}}&orderId={{getOrder.code}}&workXtId={{getOrder.workXtId}}&workSjId={{getOrder.workSjId}}&type={{getOrder.type}}&per=XT&title={{getOrder.title}}">
							    		修图
							    	</a>
							    </span>
						    	<span v-if="getOrder.type!='XT'&&getOrder.type!='ALL'">
						    		<i style="padding: 4px 12px;cursor:default"> 一一 </i>
						    	</span>
							    <span v-if=" getOrder.type=='ALL'||getOrder.type=='SJ' ">
							    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?id={{getOrder.id}}&orderId={{getOrder.code}}&workXtId={{getOrder.workXtId}}&workSjId={{getOrder.workSjId}}&type={{getOrder.type}}&per=SJ&title={{getOrder.title}}">
							    		设计
							    	</a>
							    </span>
							    <template v-if="getOrder.type!='XT'&&getOrder.type!='ALL'">
							    	<span>
							    		<i style="padding: 4px 12px;cursor:default"> 一一 </i>
							    	</span>
						    	</template>
<span @click="gitPlId($event,getOrder.id)" data-toggle="modal" data-target=".pinglun">
							    	<a @click="tianjiaYS($event)" href="javascript:;">
										添加评论
							    	</a>
							    </span>
<span @click="lookPL($event,getOrder.id)" data-toggle="modal" data-target=".pinglun">
							    	<a @click="tianjiaYS($event)" href="javascript:;">
							    		评论
							    	</a>
							    </span>
</template>
<template v-if="orderStatus=='FINISH'">
						    	<span v-if=" getOrder.type=='ALL'||getOrder.type=='XT' ">
							    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?id={{getOrder.id}}&orderId={{getOrder.code}}&workXtId={{getOrder.workXtId}}&workSjId={{getOrder.workSjId}}&type={{getOrder.type}}&per=XT&title={{getOrder.title}}">
							    		修图
							    	</a>
							    </span>
						    	<span v-if="getOrder.type=='SJ'">
						    		<i style="padding: 4px 12px;cursor:default"> 一一 </i>
						    	</span>
							    <span v-if=" getOrder.type=='ALL'||getOrder.type=='SJ' ">
							    	<a @click="tianjiaYS($event)" target="_blank" href="#/index/downPic1?id={{getOrder.id}}&orderId={{getOrder.code}}&workXtId={{getOrder.workXtId}}&workSjId={{getOrder.workSjId}}&type={{getOrder.type}}&per=SJ&title={{getOrder.title}}">
							    		设计
							    	</a>
							    </span>
						    	<span v-if="getOrder.type=='XT'">
						    		<i style="padding: 4px 12px;cursor:default"> 一一 </i>
						    	</span>
							    <span @click="lookPL($event,getOrder.id)" data-toggle="modal" data-target=".pinglun">
							    	<a @click="tianjiaYS($event)" href="javascript:;">
							    		评论
							    	</a>
							    </span>
						    </template>
</td>
</tr>
</tbody>
</table>
<p v-if="!getOrder.length" style="font-size: 24px;margin-bottom: 100px;text-align: center;">
    暂无信息
</p>
</div>
<page :turn-page="pageOrder"></page>
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
                            <p v-if="wenjianming" style="text-align:center">压缩包名：{{wenjianming}}</p>
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
<!--接单，拒单，通过，不通过-->
<div class="modal fade accept" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <p v-if="status=='jie'">确认接单吗</p>
                <p v-if="status=='ju'">确认拒单吗</p>
                <p v-if="status=='pass'">确认通过吗</p>
                <p v-if="status=='unPass'">确认不通过吗</p>
            </div>
            <div class="modal-footer">
                <button v-if="status=='jie'" @click="receiveOrder" type="button" class="btn btn-primary sure" data-dismiss="modal">确定</button>
                <button v-if="status=='ju'" @click="unReceiveOrder" type="button" class="btn btn-primary sure" data-dismiss="modal">确定</button>
                <button v-if="status=='pass'" @click="passBy" type="button" class="btn btn-primary sure" data-dismiss="modal">确定</button>
                <button v-if="status=='unPass'" @click="passBy" type="button" class="btn btn-primary sure" data-dismiss="modal">确定</button>
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
                <h4 class="modal-title" id="gridSystemModalLabel">评论</h4>
            </div>
            <div class="modal-body" style="overflow: hidden;">
                <fieldset v-if="orderPinglun.status=='add'">
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-4 control-label">
									评论内容
								</label>
                        <div class="col-sm-12" style="margin-bottom: 10px;">
                            <textarea v-model="pinglun.content" class="form-control" rows="4"></textarea>
                        </div>
                        <div class="col-sm-12">
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
                <fieldset disabled v-if="orderPinglun.status=='look'">
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
											<img :src="qnyUrl+pinglun.workLogo" class="img-thumbnail" style="width: 110px;height: 110px;" />
											<p class="text-center">{{pinglun.workName}}</p>
										</template> -->
                            </div>
                            <div class="col-sm-9">
                                <span>{{pinglun.content?pinglun.content:""}}</span>
                                <div>
                                    <template v-for="images in pinglun.images">
												<div>
													<a target="_blank" :href="qnyUrl+images" class="row">
														<img :src="qnyUrl+images" style="padding: 5px;" class="img-thumbnail col-sm-12"/>
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
            <div class="modal-footer">
                <button v-if="orderPinglun.status=='add'" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button v-if="orderPinglun.status=='add'" @click="pingluns" type="button" class="btn btn-primary">确定</button>
                <button v-if="orderPinglun.status=='look'" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
            </div>
        </div>
    </div>
</div>
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
                    <div class="col-sm-3">
                        <div class="mubantu">
                            <div>
                                <a target="_blank" :href="qnyUrl+getTemp.logo">
                                    <img :src="qnyUrl+getTemp.logo+'?imageMogr2/thumbnail/140x140!'">
                                </a>
                            </div>
                            <div>
                                <p>封面</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3" v-for="showPic in getTemp.showPic">
                        <div class="mubantu">
                            <div>
                                <a target="_blank" :href="qnyUrl+showPic">
                                    <img :src="qnyUrl+showPic+'?imageMogr2/thumbnail/140x140!'">
                                </a>
                            </div>
                            <div>
                                <p>预览图</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a :href="qnyUrl+getTemp.files" download="{{qnyUrl+getTemp.files}}">
                    <button type="button" class="btn btn-primary sure">
								下载模板
							</button>
                </a>
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
                            <div class="product-block ">
                                <div>
                                    <img style="height:178px" :src="workEmp.logo">
                                </div>
                                <div class="product-bottom">
                                    <p>{{workEmp.nickName}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <pages :turn-page="pageSMS"></pages>
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
    import pages from '../components/page/pagegai.vue'
    import qiniu from '../components/qiniu.vue'
    import bus from './bus.js'
    const moment = require('moment')
    require('daterangepicker.js')
    require('daterangepicker.css')
    export default {
        data: () => ({
            qnyUrl: Lib.C.qiniu.jsUrl,
            host: Lib.C.hostWorkRoom,
            id: sessionStorage.getItem("id"),
            pinglunPic: {
                key: "pinglunPic",
                max_file_size: "40mb"
            },
            pageOrder: {}, //订单翻页
            pageSMS: {}, //数码师翻页
            orderPinglun: {
                "status": ""
            },
            getIds: {
                orderId: "", //订单id
                digitalId: "" //工作室id
            },
            workEmp: {}, //工作室
            pageNo: 1, //订单页码
            shumaPageNo: 1, //数码师页码
            judan: "", //拒单按钮
            orderStatus: "", //订单状态
            status: "", //接单拒单状态
            types: {
                type: "", //订单属于修图还是设计
                files: "" //新文件里面有没有东西，有通过后给影楼审核，没有回到派单到待分配给设计师设计
            },
            orderId: "", //工作室id
            getTemp: {}, //模板信息 
            getOrder: {},
            orderInfo: {},
            wenjianming: "", //上传文件名
            pinglun: { //评论
                "images": []
            },
            orderNum: {},
            dingdanmMZ: "订单标题"
        }),
        watch: {},
        events: {
            'child-turn-page' (obj) {
                if (obj.type == "shumashi") {
                    this.$set('shumaPageNo', obj.pageNo);
                    this.workMans()
                } else if (obj.type == "dingdan") {
                    this.$set('pageNo', obj.pageNo);
                    this.assignOrder("", this.orderStatus);
                }
            },
            'child-sousuo' (obj) {
                this.assignOrder("", this.orderStatus, obj);
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
        created: function() {
            var self = this;
            bus.$on('finishThree', function(data) {
                if (data) {
                    setTimeout(function() {
                        self.photoOrderNum();
                        self.assignOrder("", self.orderStatus);
                    }, 2000)

                }
            });
            this.assignOrder("", "zhiding");
            this.workMans();
            this.photoOrderNum();
        },
        ready: function() {},
        methods: {
            assignOrder(e, status, title) {
                if (e) {
                    this.$set("orderInfo", []);
                    this.$set('pageNo', 1);
                    $(".daohang a").removeClass("active");
                    $(e.target).addClass("active");
                }
                this.$set("orderStatus", status);
                var url, self = this,
                    postParam = {};
                if (status == "zhiding") { //查询指定订单
                    url = this.host + "v1/work/order/workOrder/" + this.id + "/assign";
                } else if (status == "kejie") { //查询可接订单
                    url = this.host + "v1/work/order/workOrder/get/" + this.id;
                } else if (status == "WAIT_CHECK" || status == "WAIT_CONFIRM" || status == "FINISH" || status == "REWORK" || status == "WAIT_CHECK" || status == "WAIT_COMMENT" || status == "SERVER" || status == "WAIT_EMP") { //查询
                    url = this.host + "v1/work/order/workOrder/" + this.id;
                }
                postParam = {
                    "pageNo": this.pageNo,
                    "pageSize": 10,
                    "status": this.orderStatus,
                    "title": title
                }; // if(status=="WAIT_CHECK"){
                // 	postParam.status="WAIT_CHECK";
                // }else if(status=="WAIT_CONFIRM"){
                // 	postParam.status="WAIT_CONFIRM";
                // }else if(status=="FINISH"){
                // 	postParam.status="FINISH";
                // }else if(status=="REWORK"){
                // 	postParam.status="REWORK";
                // }else if(status=="WAIT_CHECK"){
                // 	postParam.status="WAIT_CHECK";
                // }else if(status=="WAIT_COMMENT"){
                // 	postParam.status="WAIT_COMMENT";
                // }
                Lib.M.load(url, postParam, function(data) {
                    self.photoOrderNum();
                    if (data.code == 8) {
                        self.$set("pageOrder", {});
                        self.$set("getOrder", []);
                        self.$set("orderInfo", []);
                        return false;
                    };
                    data = data.data;
                    const page = {
                        pageSize: data.pageSize,
                        totalCount: data.totalCount,
                        pageNo: data.pageNo,
                        type: "dingdan"
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
                            // data[i].dataStatus=data[i].urgentTime?data[i].urgentTime:72; 
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
                    self.$set("getOrder", data);
                }, "GET");
            },
            paixu() { //排序
                this.getOrder.sort(function sortDate(a, b) {
                    return a.sixiaoshi - b.sixiaoshi;
                });
            },
            photoOrderNum(e, id) { //
                var url = this.host + "v1/work/order/" + this.id + "/workOrderNum",
                    self = this,
                    postParam = {};
                Lib.M.load(url, {}, function(data) {
                    data = data.data;
                    self.$set("orderNum", data);
                }, "get");
            },
            getDigitalId(e, id) { //获取数码师id
                $(".product-block").css("opacity", 1);
                $(e.target).parents(".product-block").css("opacity", 0.6);
                this.$set("getIds.digitalId", id);
            },
            workMans(e) { //查询所有数码师
                var url = this.host + 'v1/work/emp/' + this.id,
                    postParam = {},
                    self = this;
                postParam = {
                    "nickName": this.search,
                    "pageNo": this.shumaPageNo,
                    "pageSize": 8
                };
                Lib.M.load(url, postParam, function(data) {
                    if (data.code == 8) {
                        self.$set("pageSMS", {});
                        self.$set("workEmp", []);
                        return false;
                    };
                    data = data.data;
                    const page = {
                        pageSize: data.pageSize,
                        totalCount: data.totalCount,
                        pageNo: data.pageNo,
                        type: "shumashi"
                    };
                    self.$set("pageSMS", page);
                    data = data.list;
                    self.$set("workEmp", data);
                }, "get");
            },
            gitPlId(e, id) {
                this.$set("orderPinglun.status", "add");
                this.$set("pinglun.images", []);
                this.pinglun.id = id;
            },
            yinglou() {
                this.$set("dingdanmMZ", "影楼");
            },
            mingzi() {
                this.$set("dingdanmMZ", "订单标题");
            },
            workOrder() { //指派数码师
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
                        self.assignOrder("", self.orderStatus);
                        self.photoOrderNum();
                    }
                }, "put");
            },
            lookPL(e, id) { //查看评论订单
                this.$set("orderPinglun.status", "look");
                var url = this.host + "v1/work/comment/" + id,
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
            pingluns() { //评论订单
                var url = this.host + "v1/work/comment/workComment",
                    self = this,
                    postParam = {};
                postParam = {
                    "workInfoId": parseInt(this.id),
                    "orderInfoId": this.pinglun.id,
                    "content": this.pinglun.content,
                    "images": JSON.stringify(this.pinglun.images)
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    self.assignOrder("", self.orderStatus)
                    if (data.code == -1) {
                        $('.pinglun').modal('hide');
                    }
                });
            },
            getId(e, id, type, files, empId) { //获取订单id
                this.getIds.orderId = id;
                this.$set("getIds.type", type);
                this.$set("getIds.files", files);
                this.$set("getIds.empId", empId);
                $(".product-block").css("opacity", 1);
                this.$set("getIds.digitalId", "");
                $(".workRoom").modal('show');
            },
            getTemps(e, id) { //模板
                $('.muban').modal('show');
                var url = this.host + "v1/photo/temp/getTemp/" + id,
                    self = this,
                    postParam = {};
                Lib.M.load(url, {}, function(data) {
                    data = data.data;
                    self.$set("getTemp", data);
                    self.$set("getTemp.showPic", JSON.parse(data.showPic));
                }, "get");
            },
            getOrderId(e, id, status, type, files) {
                this.$set("orderId", id);
                this.$set("status", status);
                this.$set("types.type", type);
                this.$set("types.files", files);
                $('.accept').modal('show');
            },
            passBy() { //通过
                var url = this.host + "v1/work/order/workOrder",
                    self = this,
                    postParam = {};
                postParam = {
                    "id": this.orderId,
                };
                if (this.status == "pass") {
                    if (this.types.type == "ALL") {
                        if (this.types.files) {
                            postParam.status = "WAIT_CONFIRM";
                        } else {
                            postParam.status = "SERVER";
                        }
                    } else {
                        postParam.status = "WAIT_CONFIRM";
                    }
                } else if (this.status == "unPass") {
                    if (this.types.files) {
                        postParam.newFiles = "NO";
                    } else {
                        postParam.newOneFiles = "NO";
                    }
                    postParam.status = "SERVER";
                }
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    self.photoOrderNum();
                    self.assignOrder("", self.orderStatus);
                }, "put");
            },
            receiveOrder() { //接单
                var url = this.host + "v1/work/order/workOrder/receive",
                    self = this,
                    postParam = {};
                postParam = {
                    "id": this.orderId,
                    "workInfoId": parseInt(this.id)
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    self.assignOrder("", self.orderStatus)
                    self.photoOrderNum();
                });
            },
            unReceiveOrder: function() { //拒单
                var url = this.host + "v1/work/order/workOrder/unReceive",
                    self = this,
                    postParam = {};
                postParam = {
                    "id": this.orderId,
                    "workInfoId": parseInt(this.id)
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    self.assignOrder("", self.orderStatus)
                    self.photoOrderNum();
                });
            },
            getDetails(index) {
                this.$set("orderInfo", this.getOrder[index]);
                this.$set("wenjianming", this.getOrder[index].oldFiles.split("/")[4]);
                if (this.getOrder[index].type == "ALL") {
                    this.$set("orderInfo.xiutu", JSON.parse(this.getOrder[index].details).xiutu);
                    this.$set("orderInfo.sheji", JSON.parse(this.getOrder[index].details).sheji);
                } else if (this.getOrder[index].type == "XT") {
                    this.$set("orderInfo.xiutu", JSON.parse(this.getOrder[index].details));
                } else if (this.getOrder[index].type == "SJ") {
                    this.$set("orderInfo.sheji", JSON.parse(this.getOrder[index].details));
                }
            },
            tianjiaYS(e, qubie) {
                if (qubie) {
                    $("span a").removeClass("tianjiaxuanzhongju");
                    $("span a").removeClass("tianjiaxuanzhong");
                    $(e.target).addClass("tianjiaxuanzhongju");
                } else {
                    $("span a").removeClass("tianjiaxuanzhongju");
                    $("span a").removeClass("tianjiaxuanzhong");
                    $(e.target).addClass("tianjiaxuanzhong");
                }
            }
        },
        components: {
            page,
            qiniu,
            pages
        }
    }
</script>
<style scoped>
    /*@import url("../assets/css/photoStudio/sendOrder.css");*/
    
    .center .product-block {
        margin: 0;
        width: 100%;
    }
    
    .worksList .table .jinggao {
        color: red;
    }
    
    .tianjiaxuanzhong {
        border-radius: 50px;
        background: #275482;
        color: white;
        font-size: 16px
    }
    
    .tianjiaxuanzhongju {
        border-radius: 50px;
        background: red;
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
        min-width: 1230px;
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
        margin-bottom: 0;
    }
    
    tr th {
        font-size: 14px;
    }
    
    .btn-group,
    .btn-group-vertical {
        vertical-align: top;
    }
    
    .worksList .table tr th:first-child,
    .worksList .table tr td:first-child {
        text-align: left !important;
        padding-left: 80px;
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
        text-align: center;
        padding: 4px 0;
        margin: 0 auto;
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
        border-style: solid;
        border-color: #5072c9;
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
        margin-bottom: 30px
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
    /*详情*/
    
    .shumashi {
        padding: 0 30px
    }
    
    .weiyi {
        margin-bottom: 30px
    }
</style>