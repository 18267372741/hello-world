<template lang="html">
	<div class="title">
    	<h3 v-if="!addr.id">添加员工</h3>
    	<h3 v-if="addr.id">修改员工</h3>
    	<h4 v-if="!addr.id">Add Workers</h4>
    	<h4 v-if="addr.id">Edit Workers</h4>
	</div>
    <form class="form-horizontal box">
    	
		<div class="form-group">
			<label class="col-sm-3 control-label"><span class="hongse" :class="{'luse': works.account}">*</span>账号:</label>
			<div class="col-sm-7">
				<input type="number" class="form-control" v-model="works.account" placeholder="手机号">
			</div>
		</div>
		
		<div v-if="addr.id" class="form-group">
			<label class="col-sm-3 control-label"><span class="hongse" :class="{'luse': works.address}">*</span>详细地址:</label>
			<div class="col-sm-7 row">
				<label class="col-sm-4">
					<select id="add1" v-model="province.id" class="form-control" @change="findcitys(province.id)">
						<option selected value="{{province.id}}">{{province.name}}</option>
						<option v-for="one in provinces" value="{{one.id}}">{{one.fullname}}</option>
					</select>
				</label>
				<label class="col-sm-4">
					<select id="add2" v-model="city.id" class="form-control" @change="findcountys(city.id)">
						<option selected value="{{city.id}}">{{city.name}}</option>
						<option v-for="one in citys" value="{{one.id}}">{{one.fullname}}</option>
					</select>
				</label>
				<label class="col-sm-4">
					<select id="add3" v-model="county.id" class=" form-control">
						<option selected value="{{county.id}}">{{county.name}}</option>
						<option v-for="one in countys" value="{{one.id}}">{{one.fullname}}</option>
					</select>
				</label>
			</div>
			<label class="col-sm-3 control-label"><span> </span></label>
			<div class="col-sm-7">
				<textarea v-model="address" class="form-control" rows="4" name="" maxlength="200" placeholder=""></textarea>
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-sm-3 control-label"><span class="hongse" :class="{'luse': works.name}">*</span>姓名:</label>
			<div class="col-sm-7">
				<input v-model="works.name" type="text" class="form-control">
			</div>
		</div>
		
		<div v-if="addr.id" class="form-group">
			<label class="col-sm-3 control-label"><span class="hongse" :class="{'luse': works.nickName}">*</span>昵称:</label>
			<div class="col-sm-7">
				<input v-model="works.nickName" type="text" class="form-control">
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-sm-3 control-label"><span class="hongse" :class="{'luse': works.password}">*</span>密码:</label>
			<div class="col-sm-7">
				<input type="password" class="form-control" v-model="works.password">
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-sm-3 control-label"><span class="hongse" :class="{'luse': works.phone}">*</span>电话:</label>
			<div class="col-sm-7">
				<input v-model="works.phone" type="number" class="form-control">
			</div>
		</div>
		
		<!--<div class="form-group">
			<label class="col-sm-3 control-label"><span>*</span>权限:</label>
			<div class="col-sm-7">
				<input v-model="works.role" type="number" class="form-control">
			</div>
		</div>-->
		
		<div class="form-group">
			<label class="col-sm-3 control-label"><span class="hongse" :class="{'luse': works.logo}">*</span>上传头像:(限大1M)</label>
			
			<!-- <div v-if="addr.id" class="col-sm-7">
				<qiniu :options="logos"></qiniu>
			</div> -->
			
			<label class="col-sm-3 control-label"><span class="hongse" :class="{'luse': works.logo}"></span></label>
			<div class="col-sm-7">
				<img :src="works.logo" class="img-thumbnail" alt="logo" style="width: 174px" />
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-sm-3 control-label"><span class="hongse" :class="{'luse': works.identity}">*</span>身份证:(限大1M)</label>
			
			<div class="col-sm-7">
				<qiniu :options="identity"></qiniu>
			</div>
			
			<label class="col-sm-3 control-label"><span></span></label>
			<div class="col-sm-7">
				<img style="width:400px;height:255px;" class="col-sm-6 img-thumbnail" :src="qnyUrl+works.identity" alt="身份证"/>
				<img style="width:400px" class="col-sm-6 img-thumbnail" src="../assets/shenfencade.jpg" title="身份证样图"/>
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-sm-3 control-label"><span class="hongse"></span>介绍:</label>
			<div class="col-sm-7">
				<textarea v-model="works.introduce" class="form-control" rows="4" maxlength="200"></textarea>
			</div>
		</div>
		
		<div class="form-group">
			<div class="col-sm-12 anniuBox">
				<input v-if="!addr.id" @click="verificat" type="button" class="btn btn-primary anniu" value="添加员工">
				<input v-if="addr.id" @click="modify" type="button" class="btn btn-primary anniu" value="修改员工">
			</div>
		</div>
		
	</form>
	<div v-if="!addr.id" class="weizhi">
		<div class="QR"></div>
		<p>请扫描二维码绑定微信账号</p>
	</div>
</template>
<script>
    import Lib from '../assets/lib.js'
    import qiniu from '../components/qiniu.vue'
    const qrCode = require('qrcode');
    export default {
        data: () => ({
            id: sessionStorage.getItem("id"),
            host: Lib.C.hostPhotoStudio,
            addr: Lib.M.getUrlParams(),
            qnyUrl: Lib.C.qiniu.jsUrl,
            identity: {
                key: "identity"
            },
            logo: {
                key: "logo"
            },
            identity: {
                key: "identity"
            },
            province: {
                id: '',
                name: '请选择'
            },
            city: {
                id: '',
                name: '请选择'
            },
            county: {
                id: '',
                name: '请选择'
            },
            address: '',
            provinces: {},
            citys: {},
            countys: {},
            workss: {
                address: {
                    province: {
                        id: '',
                        name: ''
                    },
                    city: {
                        id: '',
                        name: ''
                    },
                    county: {
                        id: '',
                        name: ''
                    },
                    address: '',
                },
            },
            works: {}
        }),
        events: {
            'child-qiniu-data' (obj) {
                var self = this,
                    name;
                if (obj.key) {
                    name = obj.key.split("/")[2];
                }
                if (obj.key && name == "identity") {
                    self.$set("works.identity", obj.key);
                }
                if (obj.key && name == "logo") {
                    self.$set("works.logo", this.qnyUrl + obj.key);
                }
            }
        },
        created: function() {
            this.registerQrcode();
            this.addr.id && this.workInfo();
            !this.addr.id && this.findProvince();
        },
        ready: function() {},
        methods: {
            //查询所有省
            findProvince: function() {
                let self = this;
                $.ajax({
                    type: "get",
                    url: "http://apis.map.qq.com/ws/district/v1/list?key=DBRBZ-MFTHJ-66MFB-KKETF-5K6AH-WMBT3&output=jsonp",
                    dataType: "jsonp",
                    success: function(data) {
                        self.$set('provinces', data.result[0])
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {}
                });
            },
            //查询所有市
            findcitys: function(id) {
                let self = this;
                $.ajax({
                    type: "get",
                    url: "http://apis.map.qq.com/ws/district/v1/getchildren?id=" + id + '&key=DBRBZ-MFTHJ-66MFB-KKETF-5K6AH-WMBT3&output=jsonp',
                    dataType: "jsonp",
                    success: function(data) {
                        self.$set('citys', data.result[0])
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {}
                });
            },
            //查询所有县
            findcountys: function(id) {
                let self = this;
                $.ajax({
                    type: "get",
                    url: "http://apis.map.qq.com/ws/district/v1/getchildren?id=" + id + '&key=DBRBZ-MFTHJ-66MFB-KKETF-5K6AH-WMBT3&output=jsonp',
                    dataType: "jsonp",
                    success: function(data) {
                        self.$set('countys', data.result[0])
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {}
                });
            },
            registerQrcode() {
                var url = this.host + 'v1/wx/RegisterQrcode',
                    self = this,
                    postParam = {};
                postParam = {
                    "type": "emp"
                };
                Lib.M.load(url, postParam, function(data) {
                    data.id = JSON.stringify(data.id);
                    self.works.id = data.id.slice(3, data.id.length);
                    var QC;
                    QC = qrCode.qrcode(5, 'L');
                    QC.addData(data.url);
                    QC.make();
                    const imgTag = QC.createImgTag(5);
                    $(".QR").html(imgTag);
                    self.getSocket(data.id);
                }, "get");
            },
            getSocket(id) {
                var self = this;
                var sockjsAddr = "118.178.236.192:8080" + "/scoket/join/" + "reg" + id;
                var sockjsClient;
                var onopen = function() {
                    console.log('open')
                };
                var onmessage = function(e) {
                    console.log(e)
                    var data = JSON.parse(e.data);
                    Lib.M.topRightInfoTips({
                        title: data.messsge
                    });
                    self.$set("works.name", data.nickName);
                    self.$set("works.logo", data.headImage);
                    if (data.id) {
                        self.$set("works.idTwo", data.id);
                    }
                };
                var onclose = function() {
                    console.log('close');
                    this.getSocketNum++;
                    if (this.getSocketNum < 10) {
                        this.getSocket();
                    }
                };
                sockjsClient = new WebSocket('ws:' + sockjsAddr);
                sockjsClient.onopen = onopen;
                sockjsClient.onmessage = onmessage;
                sockjsClient.onclose = onclose;
            },
            workInfo() {
                var url = this.host + 'v1/work/emp/' + this.id,
                    postParam = {},
                    self = this;
                postParam = {
                    "empId": this.addr.id
                };
                Lib.M.load(url, postParam, function(data) {
                    data = data.data.list[0];
                    if (data.address.split('"').length < 10) {
                        self.findProvince();
                        self.$set('province', {})
                        self.$set('city', {})
                        self.$set('county', {})
                            //     self.$set('address', self.findifon.address)
                    } else {
                        self.$set('workss.address', JSON.parse(data.address))
                        self.$set('province', self.workss.address.province)
                        self.$set('city', self.workss.address.city)
                        self.$set('county', self.workss.address.county)
                        self.$set('address', self.workss.address.address)
                        self.findProvince();
                    }
                    self.$set("works", data);
                    self.$set("works.zhanghao", data.account);
                    self.findcitys(self.province.id);
                    self.findcountys(self.city.id);
                }, "get");
            },
            modify() { //修改员工
                var url = this.host + 'v1/work/emp',
                    postParam = {},
                    self = this;
                this.works.address = {
                    province: {
                        id: this.province.id,
                        name: $('#add1').find("option:selected").text()
                    },
                    city: {
                        id: this.city.id,
                        name: $('#add2').find("option:selected").text()
                    },
                    county: {
                        id: this.county.id,
                        name: $('#add3').find("option:selected").text()
                    },
                    address: this.address,
                }
                postParam = {
                    "id": parseInt(this.addr.id),
                    "logo": this.works.logo,
                    "address": JSON.stringify(this.works.address),
                    "identity": this.works.identity,
                    "introduce": this.works.introduce,
                    "name": this.works.name,
                    "nickName": this.works.nickName,
                    "password": this.works.password,
                    "phone": this.works.phone,
                    "role": this.works.role,
                    "workGroupId": 0
                };
                if (this.works.account != this.works.zhanghao) {
                    postParam.account = this.works.account;
                }
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    if (data.code == -1) {
                        setTimeout(function() {
                            location.href = "#/index/workList";
                        }, 1500);
                    }
                }, "put");
            },
            verificat() {
                this.works.address = {
                    province: {
                        id: this.province.id,
                        name: $('#add1').find("option:selected").text()
                    },
                    city: {
                        id: this.city.id,
                        name: $('#add2').find("option:selected").text()
                    },
                    county: {
                        id: this.county.id,
                        name: $('#add3').find("option:selected").text()
                    },
                    address: this.address,
                }
                if (!this.works.account) {
                    Lib.M.topRightInfoTips({
                        title: "请填写账号"
                    });
                    return false;
                } else if (!this.works.address) {
                    Lib.M.topRightInfoTips({
                        title: "请填写详细地址"
                    });
                    return false;
                } else if (!this.works.name) {
                    Lib.M.topRightInfoTips({
                        title: "请填写姓名"
                    });
                    return false;
                } else if (!this.works.password) {
                    Lib.M.topRightInfoTips({
                        title: "请填写密码"
                    });
                    return false;
                } else if (!this.works.phone) {
                    Lib.M.topRightInfoTips({
                        title: "请填写手机号码"
                    });
                    return false;
                } else if (!this.works.logo) {
                    Lib.M.topRightInfoTips({
                        title: "请用微信扫二维码绑定您的账号"
                    });
                    return false;
                } else if (!this.works.identity) {
                    Lib.M.topRightInfoTips({
                        title: "请上传身份证"
                    });
                    return false;
                }
                this.work();
            },
            work() {
                var url = this.host + 'v1/work/emp',
                    postParam = {},
                    self = this;
                postParam = {
                    "logo": this.works.logo,
                    "account": this.works.account,
                    "address": JSON.stringify(this.works.address),
                    "identity": this.works.identity,
                    "introduce": this.works.introduce,
                    "name": this.works.name,
                    "password": this.works.password,
                    "phone": this.works.phone,
                    "role": this.works.role,
                    "workGroupId": this.works.workGroupId,
                    "workInfoId": parseInt(this.id),
                    "id": this.works.idTwo ? parseInt(this.works.idTwo) : parseInt(this.works.id)
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    if (data.code == -1) {
                        setTimeout(function() {
                            location.href = "#/index/workList";
                        }, 1500);
                    }
                });
            },
        },
        components: {
            qiniu
        }
    }
</script>
<style scoped>
    .weizhi {
        position: absolute;
        top: 230px;
        right: 60px;
    }
    
    .weizhi p {
        text-align: center;
        margin-top: 10px;
    }
    
    .box {
        margin: 0px 24% 30px 20%;
    }
    
    .title {
        text-align: center;
        padding: 21px 0;
        background: #ecedf3;
        margin-bottom: 30px;
        border-bottom: solid #ddd 1px;
    }
    
    h3,
    h4 {
        margin: 0;
        padding: 0;
    }
    
    h3 {
        margin-bottom: 3px;
    }
    
    .pic img {
        width: 260px;
    }
    
    .anniuBox {
        text-align: center;
    }
    
    .anniu {
        border-radius: 50px;
        font-size: 14px;
        padding: 8px 36px;
    }
    
    .box label {
        font-size: 16px;
        font-weight: normal;
    }
    
    .hongse {
        color: red;
    }
    
    .luse {
        color: blue;
    }
    
    .img-thumbnail {
        padding: 4px !important;
    }
</style>