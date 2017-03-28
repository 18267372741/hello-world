<template lang="html">
	<div class="title">
		<h3>信息修改</h3>
		<!-- <h4>Information Modify</h4> -->
	</div>
    <form class="form-horizontal">
		<div class="form-group">
			<label class="col-sm-2 control-label"><span></span>姓名:</label>
			<div class="col-sm-9">
				<input v-model="digital.name" type="text" class="form-control" name="shopName">
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label"><span>*</span>详细地址:</label>
			<div class="col-sm-9 row">
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
			<label class="col-sm-2 control-label"><span> </span></label>
			<div class="col-sm-9">
				<textarea v-model="address" class="form-control" rows="4" name="" maxlength="200" placeholder=""></textarea>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label"><span></span>昵称:</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" v-model="digital.nickName">
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label"><span></span>电话:</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" v-model="digital.phone">
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label"><span></span>上传头像:</label>
			<div class="col-sm-9">
				<qiniu :options="logo"></qiniu>
			</div>
			
			<label class="col-sm-2 control-label"><span></span></label>
			<div class="col-sm-9">
				<img :src="digital.logo" class="img-thumbnail" style="width: 170px"  />
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label"><span></span>身份证:</label>
			<div class="col-sm-9">
				<qiniu :options="identity"></qiniu>	
			</div>
			
			<label class="col-sm-2 control-label"><span></span></label>
			<div class="col-sm-9">
				<img :src="qnyUrl+digital.identity+'?imageView2/0/w/400'" class="img-thumbnail" style="width: 170px"  />
				<!-- <p>身份证样照</p>
				<img src="../assets/shenfencade.jpg" class="img-thumbnail" style="width: 400px"  /> -->
			</div>
		</div>
		
		<div class="infofooter">
			<input @click="edWorkInfo" type="button" class="btn btn-primary anniu"  value="确定修改">
		</div>
		
	</form>
</template>
<script>
    import Lib from '../assets/lib.js'
    import qiniu from '../components/qiniu.vue'
    export default {
        data: () => ({
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
            qnyUrl: Lib.C.qiniu.jsUrl,
            id: sessionStorage.getItem("id"),
            workInfoId: sessionStorage.getItem("workInfoId"),
            host: Lib.C.hostPhotoStudio,
            digital: {}, //数码师
        }),
        created: function() {
            this.workInfo();
        },
        ready: function() {},
        events: {
            'child-qiniu-data' (obj) {
                var self = this,
                    name;
                if (obj.key) {
                    name = obj.key.split("/")[2];
                }
                if (obj.key && name == "logo") {
                    self.$set("digital.logo", this.qnyUrl + obj.key);
                }
                if (obj.key && name == "identity") {
                    self.$set("digital.identity", obj.key);
                }
            }
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
            workInfo() {
                var url = this.host + 'v1/work/emp/one/' + this.id,
                    postParam = {},
                    self = this;
                postParam = {
                    "id": this.id
                };
                Lib.M.load(url, postParam, function(data) {
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
                    self.$set("digital", data);
                    self.findcitys(self.province.id);
                    self.findcountys(self.city.id);
                }, "get");
            },
            edWorkInfo() {
                var url = this.host + 'v1/work/emp',
                    postParam = {},
                    self = this;
                this.digital.address = {
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
                    "id": parseInt(this.id),
                    "logo": this.digital.logo,
                    "address": JSON.stringify(this.digital.address),
                    "identity": this.digital.identity,
                    "nickName": this.digital.nickName,
                    "name": this.digital.name,
                    "phone": this.digital.phone
                };
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    if (data.code == -1) {
                        self.workInfo();
                    }
                }, "PUT");
            },
        },
        components: {
            qiniu
        }
    }
</script>
<style scoped>
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
    
    label {
        font-size: 15px;
        font-weight: normal;
    }
    
    .headh {
        text-align: center;
        margin: auto;
        margin-bottom: 40px;
        width: 800px;
    }
    
    .form-horizontal {
        margin: auto;
        width: 660px;
    }
    
    .form-group {
        margin-bottom: 22px;
    }
    
    .infofooter {
        overflow: hidden;
        margin-top: 76px;
        text-align: center;
    }
    
    .anniu {
        font-size: 14px;
        padding: 8px 56px;
        background: #275482;
        border-radius: 50px;
        margin-bottom: 100px
    }
</style>