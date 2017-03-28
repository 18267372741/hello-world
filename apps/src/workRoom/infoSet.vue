<template lang="html">
	<div class="title">
    	<h3>信息修改</h3>
    	<!-- <h4>Information Modify</h4> -->
	</div>
    <form class="form-horizontal box">
    	
		<div class="form-group">
			<label class="col-sm-3 control-label">昵称:</label>
			<div class="col-sm-7">
				<input type="text" class="form-control" v-model="work.nickName">
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-sm-3 control-label"><span>*</span>详细地址:</label>
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
		
		<div class="form-group row">
			<label class="col-sm-3 control-label zijin">资金分配比例:</label>
			<div class="col-sm-7 row zijinBox">
				<label class="col-sm-4">工作室<input class="form-control" v-model="work.moneySize.work" type="number" placeholder="10"></label>
				<label class="col-sm-4">设计<input class="form-control" v-model="work.moneySize.sj" type="number" placeholder="40"></label>
				<label class="col-sm-4">修片<input class="form-control" v-model="work.moneySize.xt" type="number" placeholder="50"></label>
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-sm-3 control-label">电话:</label>
			<div class="col-sm-7">
				<input v-model="work.phone" type="number" class="form-control">
			</div>
		</div>
		
		<!-- <div class="form-group">
			<label class="col-sm-3 control-label">提现时间</label>
			<div class="col-sm-7">
				<input type="text" class="form-control" v-model="work.empWithdrawTime">
			</div>
		</div> -->
		
		<div class="form-group">
			<label class="col-sm-3 control-label">上传头像:</label>
			
			<div class="col-sm-7">
				<qiniu :options.sync="logo"></qiniu>
			</div>
			
			<label class="col-sm-3 control-label"></label>
			<div class="col-sm-7 pic">
				<img :src="work.logo" alt="logo" class="img-thumbnail"/>
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-sm-3 control-label">身份证:</label>
			
			<div class="col-sm-7">
				<qiniu :options="identity"></qiniu>
			</div>
			
			<label class="col-sm-3 control-label"></label>
			<div class="col-sm-7 pic">
				<img :src="qnyUrl+work.identity+'?imageView2/0/w/400'" alt="身份证" class="img-thumbnail"/>
			<!-- 	<p>身份证样照</p>
				<img src="../assets/shenfencade.jpg" class="img-thumbnail"/> -->
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-sm-3 control-label">简介:</label>
			<div class="col-sm-7">
				<textarea v-model="work.introduce" class="form-control" rows="4" maxlength="200"></textarea>
			</div>
		</div>
		
		<div class="form-group">
			<div class="col-sm-12 anniuBox">
				<input @click="edWork" type="button" class="btn btn-primary anniu" value="确定修改">
			</div>
		</div>
		
		<div class="weizhi">
			<div class="QR"></div>
			<p>请扫描二维码绑定微信账号</p>
		</div>

	</form>
</template>
<script>
    import Lib from '../assets/lib.js'
    import qiniu from '../components/qiniu.vue'
    const qrCode = require('qrcode');
    export default {
        data: () => ({
            id: sessionStorage.getItem("id"),
            qnyUrl: Lib.C.qiniu.jsUrl,
            host: Lib.C.hostPhotoStudio,
            qrCode: {}, //二维码
            logo: {
                key: "logo"
            },
            identity: {
                key: "identity"
            },
            province: {
                id: '',
                name: '省'
            },
            city: {
                id: '',
                name: '市'
            },
            county: {
                id: '',
                name: '县'
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
            work: {
                "moneySize": {},
                "address": {}
            },
        }),
        events: {
            'child-qiniu-data' (obj) {
                var self = this,
                    name;
                if (obj.key) {
                    name = obj.key.split("/")[2];
                }
                if (obj.key && name == "logo") {
                    self.$set("work.logo", self.qnyUrl + obj.key);
                }
                if (obj.key && name == "identity") {
                    self.$set("work.identity", obj.key);
                }
            }
        },
        created: function() {
            this.registerQrcode();
            this.works();
        },
        ready: function() {

        },
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
                var url = this.host + 'v1/wx/qrCode',
                    self = this,
                    postParam = {};
                postParam = {
                    "workInfoId": this.id
                };
                Lib.M.load(url, postParam, function(data) {
                    self.$set("qrCode.qrCodes", data.code_url);
                    var QC;
                    QC = qrCode.qrcode(5, 'L');
                    QC.addData(self.qrCode.qrCodes);
                    QC.make();
                    const imgTag = QC.createImgTag(5);
                    $(".QR").html(imgTag);
                }, "get");
            },
            works() {
                var url = this.host + 'v1/work/' + this.id,
                    postParam = {},
                    self = this;
                Lib.M.load(url, {}, function(data) {
                    data = data.data;
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
                    self.$set("work", data);
                    if (self.work.moneySize) {
                        self.work.moneySize = JSON.parse(data.moneySize);
                    }
                    self.findcitys(self.province.id);
                    self.findcountys(self.city.id);
                }, "GET");
            },
            edWork() {
                var url = this.host + 'v1/work',
                    self = this,
                    postParam = {};
                this.work.address = {
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
                if (this.work.moneySize.work * 1 < 0 || this.work.moneySize.sj * 1 < 0 || this.work.moneySize.xt * 1 < 0) {
                    Lib.M.topRightInfoTips({
                        title: "请核对 ‘资金分配比例’ 是否合理 "
                    });
                    return false
                }
                if (this.work.moneySize.work * 1 + this.work.moneySize.sj * 1 + this.work.moneySize.xt * 1 != 100) {
                    Lib.M.topRightInfoTips({
                        title: "请核对 ‘资金分配比例’ 是否合理 "
                    });
                    return false
                }
                this.work.moneySize.work = parseInt(this.work.moneySize.work);
                this.work.moneySize.sj = parseInt(this.work.moneySize.sj);
                this.work.moneySize.xt = parseInt(this.work.moneySize.xt);
                postParam = {
                    "address": JSON.stringify(this.work.address),
                    "id": parseInt(this.id),
                    "introduce": this.work.introduce,
                    "identity": this.work.identity,
                    "logo": this.work.logo,
                    "nickName": this.work.nickName,
                    "moneySize": JSON.stringify(this.work.moneySize), //资金分配比例
                    "phone": this.work.phone
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    // if (data.code == -1) {
                    //     location.reload();
                    //     location.href = "#/index/orderMan";
                    // }
                }, "put");
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
        padding: 30px 0;
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
        width: 170px;
    }
    
    .anniuBox {
        text-align: center;
    }
    
    .anniu {
        border-radius: 0;
        font-size: 14px;
        padding: 8px 36px;
        background: #275482;
        border-radius: 50px;
    }
    
    .box label {
        font-size: 16px;
        font-weight: normal;
    }
    
    .zijin {
        margin-top: 22px;
    }
    
    .zijinBox label {
        font-size: 14px;
    }
</style>