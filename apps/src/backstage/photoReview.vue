<template lang="html">
	<div class="workReview">
		<h3 style="min-width:300px">影楼审核</h3>
		<form class="form-inline" role="form" style="margin-left: 30px;">
			<div class="form-group">
		   		<nav>
				  <ul class="pagination" style="margin-top: 25px;min-width:300px" >
				    <li><a class="btn btn-link" @click="findReview('')">全部</a></li>
				    <li><a class="btn btn-link" @click="findReview('NONE')">未处理</a></li>
				    <li><a class="btn btn-link" @click="findReview('NO')">未通过</a></li>
				    <li><a class="btn btn-link" @click="findReview('YES')">已通过</a></li>
				  </ul>
				</nav>
		    </div>
		    <div class="form-group">
			    <label class="sr-only"></label>
			    <input type="text" class="form-control" placeholder="影楼名称" v-model="photoName">
			</div>
		    <button type="button" class="btn btn-default" @click="findReview('',photoName)">搜索</button>
		</form>
		<table class="table table-bordered text-center">
			<tr>
			  <td style="min-width:200px">影楼名称</td>
			  <td style="min-width:200px">电话</td>
			  <td style="min-width:200px">营业执照</td>
			  <td style="min-width:200px">信用等级</td>
			  <td style="min-width:200px">操作</td>
			</tr>
			<tr v-for="reviewData in reviewData.list">
				<template v-if="!show">
					<td>{{reviewData.companyName}}</td>
					<td>{{reviewData.account}}</td>
					<td>
						<img style="cursor: pointer;width: 60px;height: 60px;" :src="domain + reviewData.license +'?imageView2/2/w/60'"  data-toggle="modal"  data-target=".showimg" @click='findImg(reviewData.id)'/>
					</td>
				    <td>{{reviewData.level}}</td>
				    <td>
				    	<button type="button" class="btn btn-primary btn-sm" data-toggle="modal"  data-target=".openexit" @click='findifons(reviewData.id)'>修改信息</button>
				    	<template v-if="reviewData.status == 'NONE'">
				    		<button type="button" class="btn btn-default btn-sm" data-toggle="modal"  data-target=".pass" @click='getId($event,reviewData.id)'>通过</button>
					  		<button type="button" class="btn btn-default btn-sm" data-toggle="modal"  data-target=".nopass" @click='getId($event,reviewData.id)'>不通过</button>
				    	</template>
<template v-if="reviewData.status == 'YES'">已通过</template>
<template v-if="reviewData.status == 'NO'">未通过</template>
</td>
</template>
</tr>
</table>
<div v-if="show">
    没有数据！
</div>
<page :turn-page="pageData"></page>
</div>
<!--模态框  显示图片 star-->
<div class="modal fade showimg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">营业执照图片</h4>
            </div>
            <div class="modal-body">
                <img style="max-width: 98%;" :src="domain + findImgData.license" />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
<!--模态框  显示图片 end-->
<!--模态框  通过审核 star-->
<div class="modal fade pass" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">谨慎操作</h4>
            </div>
            <div class="modal-body">
                <p>是否确认通过？</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="pass('YES')">确认</button>
            </div>
        </div>
    </div>
</div>
<!--模态框  通过审核 end-->
<!--模态框  不通过审核 star-->
<div class="modal fade nopass" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">谨慎操作</h4>
            </div>
            <div class="modal-body">
                <p>是否确认不通过？<small>(谨慎操作！)</small></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="pass('NO')">确认</button>
            </div>
        </div>
    </div>
</div>
<!--模态框  不通过审核 end-->
<!--模态框  修改信息 star-->
<div class="modal fade openexit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-bg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">修改用户信息（谨慎修改，修改时要仔细询问，确认后再修改）</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">影楼昵称</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="影楼昵称" v-model="findifon.nickName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">营业执照</label>
                        <div class="col-sm-10">
                            <qiniu :options.sync="license"></qiniu>
                            <img style="max-width: 100%;" :src="domain + findifon.license" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">logo</label>
                        <div class="col-sm-10">
                            <qiniu :options.sync="logo"></qiniu>
                            <img style="max-width: 100%;" :src="findifon.logo" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">电话</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="联系电话" v-model="findifon.phone">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">公司名称</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="公司名称" v-model="findifon.companyName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">地址</label>
                        <div class="col-sm-10">
                            <select id="add1" style="width: 130px;float: left;margin-right: 5px;" v-model="province.id" class="form-control" @change="findcitys(province.id)">
                        	<option selected value="{{province.id}}">{{province.name}}</option>
	                        <option v-for="one in provinces" value="{{one.id}}">{{one.fullname}}</option>
	                    </select>
                            <select id="add2" style="width: 130px;float: left;margin-right: 5px;" v-model="city.id" class="form-control" @change="findcountys(city.id)">
	                         <option selected value="{{city.id}}">{{city.name}}</option>
	                        <option v-for="one in citys" value="{{one.id}}">{{one.fullname}}</option>
	                    </select>
                            <select id="add3" style="width: 130px;float: left;" v-model="county.id" class="form-control">
	                         <option selected value="{{county.id}}">{{county.name}}</option>
	                        <option v-for="one in countys" value="{{one.id}}">{{one.fullname}}</option>
	                    </select>
                            <input type="text" style="margin-top: 45px;" class="form-control" placeholder="详细地址" v-model="address">
                            <!--<input type="text" class="form-control"  placeholder="公司地址" v-model="findifon.address">-->
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">暂不修改</button>
                <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="exitifon">已经确认修改</button>
            </div>
        </div>
    </div>
</div>
<!--模态框  修改信息 end-->
</template>
<script type="text/javascript">
    import Lib from '../assets/lib'
    import Qiniu from '../components/qiniu'
    import page from '../components/page/pagegai.vue'
    export default {
        props: {

        },
        data: () => ({
            host: Lib.C.hostBackstage,
            domain: Lib.C.qiniu.jsUrl,
            pageNo: 1,
            pageSize: 20,
            reviewData: {}, //影楼信息
            show: false,
            type: '',
            pageData: {},
            findImgData: {},
            photoName: '',
            findifon: { //影楼基本信息
                nickName: '',
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
                companyName: '',
                license: '',
                logo: '',
                phone: '',
                id: '',
            },
            logo: {
                key: 'logo',
                max_file_size: '5m',
            },
            license: {
                key: 'license',
                max_file_size: '2m',
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
        }),
        created() {
            this.findReview()
        },
        ready() {

        },
        components: {
            page,
            Qiniu
        },
        events: {
            'child-turn-page' (obj) {
                this.pageNo = obj.pageNo;
                this.findReview(this.type);
            },
            'child-qiniu-data' (obj) {
                let self = this;
                let name;
                if (obj.key) {
                    name = obj.key.split("/")[2];
                    if (name == 'license') {
                        self.$set('findifon.license', obj.key)
                    } else if (name == 'logo') {
                        self.$set('findifon.logo', this.domain + obj.key)
                    }
                }
            },
        },
        watch: {},
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
            //修改用户信息
            exitifon: function() {
                this.findifon.address = {
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
                let url = this.host + 'onLinePs/photoInfo/updatePhoto';
                let self = this;
                let params = {};
                params.nickName = this.findifon.nickName,
                    params.address = JSON.stringify(this.findifon.address),
                    params.companyName = this.findifon.companyName,
                    params.license = this.findifon.license,
                    params.logo = this.findifon.logo,
                    params.phone = this.findifon.phone,
                    params.id = this.findifon.id * 1,
                    Lib.M.load(url, JSON.stringify(params), function(data) {
                        if (data.code == -1) {
                            self.findReview(self.type);
                            Lib.M.topRightInfoTips({
                                title: "修改成功！"
                            });
                        } else {
                            Lib.M.topRightInfoTips({
                                content: data.message + '重新修改'
                            });
                        }
                    }, 'PUT');
            },
            //查询单个影楼的信息
            findifons: function(id) {
                let url = this.host + 'onLinePs/photoInfo/findPhotoInfo';
                let self = this;
                let params = {};
                params = {
                    id: id,
                };
                Lib.M.load(url, params, function(data) {
                    self.$set('findifon', data.data.list[0])
                    self.$set('findifon.phone', data.data.list[0].account)
                    if (data.data.list[0].address.split('"').length < 10) {
                        self.findProvince();
                        self.$set('province', {})
                        self.$set('city', {})
                        self.$set('county', {})
                        self.$set('address', self.findifon.address)
                    } else {
                        self.$set('findifon.address', JSON.parse(data.data.list[0].address))
                        self.$set('province', self.findifon.address.province)
                        self.$set('city', self.findifon.address.city)
                        self.$set('county', self.findifon.address.county)
                        self.$set('address', self.findifon.address.address)
                        self.findProvince();
                    }
                }, 'GET');
            },
            findImg: function(workId) {
                let url = this.host + 'onLinePs/photoInfo/findPhotoInfo';
                let self = this;
                let params = {};
                params = {
                    id: workId,
                };
                Lib.M.load(url, params, function(data) {
                    self.$set('findImgData', data.data.list[0])
                }, 'GET');
            },
            findReview: function(type, name) {
                this.type = type;
                let url = this.host + 'onLinePs/photoInfo/findPhotoInfo';
                let self = this;
                let params = {};
                params = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    status: this.type,
                    companyName: name,
                };
                Lib.M.load(url, params, function(data) {
                    if (data.hasOwnProperty('code')) {
                        self.show = true;
                        Lib.M.topRightInfoTips({
                            title: data.message
                        })
                    } else {
                        self.show = false;
                        self.$set('reviewData', data.data)
                        self.$set('pageData', data.data)
                    }
                }, 'GET');
            },
            getId: function(inde, workId) {
                this.workId = workId;
            },
            pass: function(type) {
                let url = this.host + 'onLinePs/photoInfo/updatePhotoInfo';
                let self = this;
                let params = {};
                params.id = this.workId;
                params.status = type;
                Lib.M.load(url, JSON.stringify(params), function(data) {
                    if (data.code == -1) {
                        Lib.M.topRightInfoTips({
                            title: data.message
                        })
                        self.findReview(type);
                    } else {
                        Lib.M.topRightInfoTips({
                            title: data.message
                        })
                    }
                }, 'put');
            }
        }
    }
</script>
<style type="text/css" scoped>

</style>