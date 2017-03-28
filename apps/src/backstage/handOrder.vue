<template lang="html">
	<div class="moneyDetails">
		<h3>手动派单</h3>
		<form class="form-inline" role="form" style="margin-left: 30px; min-width: 750px;">
			<div class="form-group">
		   		<nav>
				  <ul class="pagination" style="margin-top: 25px;" >
				    <li><a class="btn btn-link" @click="findMoney('')">全部</a></li>
				    <li><a class="btn btn-link" @click="findMoney('PAYMENT')">待审核</a></li>
				    <li><a class="btn btn-link" @click="findMoney('SENDING')">派单中</a></li>
				    <li><a class="btn btn-link" @click="findMoney('SERVER')">服务中</a></li>
				    <li><a class="btn btn-link" @click="findMoney('REWORK')">返工</a></li>
				    <li><a class="btn btn-link" @click="findMoney('WAIT_COMMENT')">待评价</a></li>
				    <li><a class="btn btn-link" @click="findMoney('FINISH')">已完成</a></li>
				    <li><a class="btn btn-link" @click="findMoney('CLOSE')">已关闭</a></li>
				  </ul>
				</nav>
		    </div>
		    <div class="form-group">
			    <label class="sr-only"></label>
			    <input type="text" class="form-control" placeholder="影楼名称/标题" v-model="photoName">
			</div>
		    <button type="button" class="btn btn-default btn-sm" @click="findMoney('')">搜索</button>
		</form>
		<table class="table table-bordered table-hover text-center" style="font-size: 14px;">
		  <tr>
		  	<th style="min-width: 120px;">影楼名称</th>
		  	<th style="min-width: 74px;">订单标题</th>
		  	<th style="min-width: 125px;">数量/单价</th>
		  	<th style="min-width: 155px;">创建时间</th>
		  	<th style="min-width: 265px;">类型/时长/剩余时间</th>
		  	<th style="min-width: 101px;">状态</th>
		  	<th style="min-width: 155px;">接单时间</th>
		  	<th style="min-width: 102px;">工作室</th>
		  	<!-- <th style="min-width: 123px;">查看</th> -->
		  	<th style="min-width: 74px;">操作详情</th>
		  	<th style="min-width: 64px;">操作</th>
		  </tr>
		  <tr v-for="moneyData in moneyData.list">
		  	<template  v-if="!show">
		  		<td>{{moneyData.photoNickName}}</td>
			  	<td>{{moneyData.title}}</td>
			  	<td>
			  		设计：{{moneyData.designNum}}张/{{moneyData.designPrice}}元<br />
			  		修图：{{moneyData.photoNum}}张/{{moneyData.photoPrice}}元<br />
			  	</td>
			  	<td>{{moneyData.createTime}}</td>
			  	<td>
			  		<small v-show="moneyData.isUrgent =='YES'"> 加急{{moneyData.urgentPrice}}元/加急时间{{moneyData.urgentTime}}小时</small>
			  		<small v-if="moneyData.orderType=='ALL'"> 常规 /时间96小时</small>
			  		<small v-if="moneyData.orderType!='ALL'"> 常规 /时间72小时</small>
			  		<br /><strong v-if="moneyData.startTime" v-html="moneyData.countdown" style="color: royalblue;font-size: 12px;"></strong><strong v-if="!moneyData.startTime" style="color: royalblue;font-size: 12px;">暂未接单</strong>
			  	</td>
			  	<td>
			  		<template v-if="moneyData.orderStatus == 'PAYMENT'">代付款</template>
<template v-if="moneyData.orderStatus == 'WAIT_UPLOAD'">等待上传图片</template>
<template v-if="moneyData.orderStatus == 'SENDING'">派单中</template>
<template v-if="moneyData.orderStatus == 'SERVER'">服务中</template>
<template v-if="moneyData.orderStatus == 'WAIT_CHECK'">待审核</template>
<template v-if="moneyData.orderStatus == 'WAIT_CONFIRM'">等待影楼确认</template>
<template v-if="moneyData.orderStatus == 'FINISH'">已完成</template>
<template v-if="moneyData.orderStatus == 'REWORK'">返工</template>
<template v-if="moneyData.orderStatus == 'WAIT_COMMENT'">待评价</template>
<template v-if="moneyData.orderStatus == 'CLOSE'">关闭订单</template>
</td>
<td>
    <template v-if="moneyData.workId == 0 && moneyData.orderStatus != 'WAIT_UPLOAD'"> <strong style="color: #5bc0de;">未指派</strong> </template>
    <template v-if="moneyData.workId != 0 && moneyData.startTime == '' "> <strong style="color: #ff0700;">未接单</strong> </template>
    <template v-if="moneyData.workId != 0 && moneyData.startTime != '' "> {{moneyData.startTime}} </template>
    <template v-if="moneyData.orderStatus == 'WAIT_UPLOAD'"> 等待上传图片 </template>
    <td>
        <template v-if="moneyData.workId == 0 && moneyData.orderStatus != 'WAIT_UPLOAD'"> <strong style="color: #5bc0de;">未指派</strong> </template>
        <template v-if="moneyData.workId != 0"> {{moneyData.workNickName}} </template>
        <template v-if="moneyData.orderStatus == 'WAIT_UPLOAD'"> 等待上传图片 </template>
    </td>
    <!-- <td>
			  		<template v-if="moneyData.orderStatus != 'CLOSE'">
				  		<template v-if="moneyData.orderStatus == 'WAIT_UPLOAD'">等待上传</template>
				  		<template v-if="moneyData.orderStatus != 'WAIT_UPLOAD'">
				  			<a href="{{moneyData.files != ''?moneyData.files:''}}" target="_blank"><button type="button" class="btn btn-link">下载</button></a>
				  			<button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target=".yulan" @click="findOneorder(moneyData.orderId)">预览</button>
				  		</template>
			  		</template>
			  		<template v-if="moneyData.orderStatus == 'CLOSE'">
			  			已关闭
			  		</template>
			  	</td> -->
    <td><a v-link="{path :'orderDetails?orderId='+moneyData.orderId}">详情</a></td>
    <td>
        <template v-if="moneyData.workId == 0 && moneyData.orderStatus != 'CLOSE'">
			  			<button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target=".chedan" @click="gitid(moneyData.orderId)">撤单</button>
			  		</template>
        <template v-if="moneyData.workId == 0 && moneyData.orderStatus == 'SENDING'">
			  			<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target=".chongxin" @click="gitid(moneyData.orderId,'addSystemRecord')">指派</button>
			  		</template>
        <template v-if="moneyData.workId != 0 && moneyData.orderStatus == 'SENDING'">
			  			<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target=".chongxin" @click="gitid(moneyData.orderId,'againOrder')">重新指派</button>
			  		</template>
        <template v-if="moneyData.orderStatus == 'SERVER' || moneyData.orderStatus == 'WAIT_CHECK' || moneyData.orderStatus == 'WAIT_CONFIRM' || moneyData.orderStatus == 'REWORK'">
			  			<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target=".tuidan" @click="gitid(moneyData.orderId)">退单</button>
			  		</template>
        <template v-if="moneyData.orderStatus == 'CLOSE' || moneyData.orderStatus == 'FINISH'">
			  			<button type="button" class="btn btn-success btn-sm"  disabled="disabled">不可操作</button>
			  		</template>
    </td>
    </template>
    </tr>
    </table>
    <div v-if="show">
        没有数据！
    </div>
    <page :turn-page="pageData"></page>
    <!--模态框  撤单 star-->
    <div class="modal fade chedan" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel">谨慎操作！</h4>
                </div>
                <div class="modal-body">
                    <p>是否确认<strong>撤单</strong>？撤单后订单将会关闭！ </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">再想想</button>
                    <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="revokeOrder">确认</button>
                </div>
            </div>
        </div>
    </div>
    <!--模态框  撤单 end-->
    <!--模态框  退单 star-->
    <div class="modal fade tuidan" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel">谨慎操作</h4>
                </div>
                <div class="modal-body">
                    <p>是否确认<strong>退单</strong>？退单后订单将关闭！ </p>
                    <input type="number" style="width: 200px;" class="form-control" v-model="money" placeholder="输入洽谈好的退款金额" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">再想想</button>
                    <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="cancelOrder">确认</button>
                </div>
            </div>
        </div>
    </div>
    <!--模态框  退单 end-->
    <!--模态框  重新指派 star-->
    <div class="modal fade chongxin" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel">谨慎操作</h4>
                </div>
                <div class="modal-body" style="height: 220px;text-align: center;">
                    <div class="dropdown">
                        <p>输入想要指定的工作室名称！</p>
                        <input type="text" style="width: 200px;" class="form-control" v-model="workNickName" placeholder="输入想指定的工作室名称" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                            <template v-if="showFind">
				  		<div>没找到想要的！</div>
				  	</template>
                            <template v-else>
				  		<li v-for="workdata in workdata" style="padding:5px 10px;cursor: pointer;" @click="findoneWoek(workdata.workId)">{{workdata.workNickName}}</li>
				  	</template>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">再想想</button>
                    <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="addOrder(workOnedata.workId)">确认</button>
                </div>
            </div>
        </div>
    </div>
    <!--模态框  重新指派 end-->
    <!--模态框  预览 star-->
    <div class="modal fade yulan" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel">预览完成效果</h4>
                </div>
                <div class="modal-body">
                    <img style="border-radius: 6px;border: 1px solid #ccc;" :src="domain + showPic +'?imageView2/2/w/200'" / v-for="showPic in oneData.showPic">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
    <!--模态框  预览 end-->
    </div>
    </template>
    <script type="text/javascript">
        const moment = require('moment')
        import Lib from '../assets/lib'
        import page from '../components/page/pagegai.vue'
        export default {
            props: {

            },
            data: () => ({
                domain: Lib.C.qiniu.jsUrl,
                host: Lib.C.hostBackstage,
                moneyData: {},
                photoName: '',
                pageNo: 1,
                show: false,
                showInupt: true,
                orderId: '',
                workNickName: '', //工作室名称
                workId: '', //工作室id
                workdata: {},
                money: '', //退款金额
                oneData: {},
                workOnedata: {},
                showFind: true,
                addOrdertype: '',
                orderStatus: '',
                pageData: {},
            }),
            created() {
                this.findMoney();
                this.findWork();
                this.getSocket();
            },
            ready() {

            },
            components: {
                page
            },
            events: {
                'child-turn-page' (obj) {
                    this.pageNo = obj.pageNo;
                    this.findMoney(this.orderStatus);
                },
            },
            watch: {
                'workNickName': function(val) {
                    this.findWork(val)
                },
                'money': function(val) {
                    if (val * 10 % 10 > 0) {
                        Lib.M.topRightInfoTips({
                            title: '退款金额必须为整数'
                        });
                        this.money = 1;
                    }
                }
            },
            methods: {
                getSocket: function() {
                    var self = this;
                    var sockjsAddr = "118.178.236.192:8080" + "/scoket/join/" + "man0";
                    var sockjsClient;
                    var nickName = localStorage.getItem('position');
                    var onopen = function() {
                        console.log('open1')
                    };
                    var onmessage = function(e) {
                        console.log(e);
                        if (e) {
                            location.reload();
                        }
                    };
                    var onclose = function() {
                        console.log('close');
                        this.getSocketNum++;
                        if (this.getSocketNum < 10) {
                            this.getSocket();
                        }
                    };
                    // var sockjsClient = new WebSocket('ws://118.178.236.192:8080'+ "/scoket/join/"+"emp"+this.id;);
                    sockjsClient = new WebSocket('ws:' + sockjsAddr);
                    sockjsClient.onopen = onopen;
                    sockjsClient.onmessage = onmessage;
                    sockjsClient.onclose = onclose;
                },
                findMoney: function(orderStatus) {
                    this.orderStatus = orderStatus;
                    let url = this.host + 'onLinePs/orderInfo/findOrderInfo';
                    let self = this;
                    let params = {};
                    params = {
                        orderStatus: this.orderStatus,
                        condition: this.photoName,
                        pageNo: this.pageNo,
                        pageSize: 10,
                    };
                    Lib.M.load(url, params, function(data) {
                        if (data.hasOwnProperty('code')) {
                            self.show = true;
                        } else {
                            self.show = false;
                            self.$set('moneyData', data.data);
                            self.$set('pageData', data.data);
                            setInterval(function() {
                                self.daojishi();
                            }, 1000)
                        }
                    }, 'get');
                },
                daojishi: function() {
                    for (let i = 0; i < this.moneyData.list.length; i++) {
                        let dd, hh, mm, ss, over, countdown, overtime;
                        let one = this.moneyData.list[i];
                        let startime = one.startTime; //开始时间
                        let completetime = one.endTime; //完成时间
                        let addtime = one.urgentTime == 0 ? 72 : one.urgentTime;
                        if (addtime == 72) {
                            if (one.orderType == "ALL") {
                                addtime = 96
                            } else {
                                addtime = 72
                            }
                        }
                        let nowtime = moment()._d.getTime();
                        let endtime = moment(startime).add(addtime, 'h')._d.getTime(); //应该结束时间
                        if (one.orderStatus == 'FINISH') {
                            over = moment(completetime)._d.getTime() - moment(startime)._d.getTime();
                            dd = parseInt(over / 86400000);
                            hh = parseInt(over / 3600000);
                            mm = parseInt(over % 86400000 % 3600000 / 60000);
                            ss = parseInt(over % 86400000 % 3600000 % 60000 / 1000);
                            countdown = '<span style="color:#449d44">' + '用时' + hh + '小时' + mm + '分' + ss + '</span>';
                            overtime = moment(completetime)._d.getTime() > endtime ? '<span style="color:red">(超时完成)</span>' : ''; //完成但是超时了
                            this.$set('moneyData.list[' + i + '].countdown', countdown + overtime);
                        } else {
                            if (nowtime > endtime) {
                                countdown = '<span style="color:red">已经超时</span>';
                                this.$set('moneyData.list[' + i + '].countdown', countdown);
                            } else {
                                over = endtime - nowtime;
                                dd = parseInt(over / 86400000);
                                hh = parseInt(over / 3600000);
                                mm = parseInt(over % 86400000 % 3600000 / 60000);
                                ss = parseInt(over % 86400000 % 3600000 % 60000 / 1000);
                                countdown = '还有' + hh + '小时' + mm + '分' + ss + '秒结束';
                                this.$set('moneyData.list[' + i + '].countdown', countdown);
                            }
                        }
                    }
                },
                gitid: function(index, type) {
                    this.orderId = index;
                    this.money = '';
                    this.addOrdertype = type;
                },
                //退单
                cancelOrder: function() {
                    let url = this.host + 'onLinePs/orderInfo/cancelOrder';
                    let self = this;
                    let params = {};
                    params = {
                        money: this.money,
                        orderId: this.orderId,
                        systemId: localStorage.getItem('h_id')
                    };
                    Lib.M.load(url, JSON.stringify(params), function(data) {
                        if (data.code == -1) {
                            self.findMoney(self.findMoney);
                            Lib.M.topRightInfoTips({
                                title: data.message
                            });
                        } else {
                            Lib.M.topRightInfoTips({
                                title: data.message
                            });
                        }
                    }, 'put');
                },
                //撤单
                revokeOrder: function() {
                    let url = this.host + 'onLinePs/orderInfo/revokeOrder';
                    let self = this;
                    let params = {};
                    params = {
                        orderId: this.orderId,
                        systemId: localStorage.getItem('h_id')
                    };
                    Lib.M.load(url, JSON.stringify(params), function(data) {
                        if (data.code == -1) {
                            self.findMoney(self.findMoney);
                            Lib.M.topRightInfoTips({
                                title: data.message
                            });
                        } else {
                            Lib.M.topRightInfoTips({
                                title: data.message
                            });
                        }
                    }, 'put');
                },
                //重新指派
                addOrder: function(workId) {
                    let url;
                    if (this.addOrdertype == 'againOrder') {
                        url = this.host + 'onLinePs/orderInfo/againOrder';
                    } else if (this.addOrdertype == 'addSystemRecord') {
                        url = this.host + 'onLinePs/orderInfo/addSystemRecord';
                    }
                    let self = this;
                    let params = {};
                    params = {
                        workId: workId,
                        orderId: this.orderId,
                        manage: localStorage.getItem('h_id') * 1
                    };
                    Lib.M.load(url, JSON.stringify(params), function(data) {
                        if (data.code == -1) {
                            self.findMoney(self.orderStatus);
                            Lib.M.topRightInfoTips({
                                title: data.message
                            });
                        } else {
                            Lib.M.topRightInfoTips({
                                title: data.message
                            });
                        }
                    }, self.addOrdertype == 'againOrder' ? 'put' : 'post');
                },
                //查找工作室
                findWork: function(val) {
                    let url = this.host + 'onLinePs/workInfo/findWorkInfo';
                    let self = this;
                    let params = {};
                    params = {
                        pageNo: 1,
                        pageSize: 6,
                        status: 'YES',
                        workNickName: val,
                    };
                    Lib.M.load(url, params, function(data) {
                        if (data.hasOwnProperty('code')) {
                            self.showFind = true;
                        } else {
                            self.showFind = false;
                            self.$set('workdata', data.data.list)
                        }
                    }, 'get');
                },
                //查询单个工作室信息
                findoneWoek: function(workid) {
                    let url = this.host + 'onLinePs/workInfo/findWorkInfo';
                    let self = this;
                    let params = {};
                    params = {
                        workId: workid,
                    };
                    Lib.M.load(url, params, function(data) {
                        self.$set('workOnedata', data.data.list[0])
                        self.$set('workNickName', data.data.list[0].workNickName)
                    }, 'get');
                },
                //查找订单
                findOneorder: function(orderId) {
                    let url = this.host + 'onLinePs/orderInfo/findOrderInfo';
                    let self = this;
                    let params = {};
                    params = {
                        orderId: orderId,
                    };
                    Lib.M.load(url, params, function(data) {
                        self.$set('oneData', data.data.list[0]);
                        if (self.oneData.showPic != '') {
                            self.oneData.showPic = JSON.parse(self.oneData.showPic)
                        } else {
                            self.oneData.showPic = []
                        }

                    }, 'get');
                },
            }
        }
    </script>
    <style type="text/css" scoped>
        .form-inline {
            margin-bottom: 10px;
        }
        
        tr th {
            text-align: center;
        }
        
        .time {
            width: 320px;
        }
        
        .moneyDetails a {
            text-decoration: none;
        }
        
        span {
            cursor: pointer;
        }
        
        .close {
            display: none;
        }
        
        .dropdown-menu li:hover {
            background: #7fc9e0;
        }
    </style>