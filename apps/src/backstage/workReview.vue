<template lang="html">
	<div class="workReview">
		<h3 style="min-width:300px">工作室审核</h3>
		<form class="form-inline" role="form" style="margin-left: 30px;">
			<div class="form-group">
		   		<nav>
				  <ul class="pagination" style="margin-top: 25px;border-radius:3px;min-width:300px" >
				    <li><a class="btn btn-link" @click="findReview('','')">全部</a></li>
				    <li><a class="btn btn-link" @click="findReview('NONE','')">未处理</a></li>
				    <li><a class="btn btn-link" @click="findReview('NO','')">未通过</a></li>
				    <li><a class="btn btn-link" @click="findReview('YES','')">已通过</a></li>
				  </ul>
				</nav>
		    </div>
		    <div class="form-group">
			    <label class="sr-only"></label>
			    <input type="text" class="form-control" placeholder="工作室名称" v-model="photoName">
			</div>
		    <button type="button" class="btn btn-default" @click="findReview('',photoName)">搜索</button>
		</form>
		<table class="table table-bordered text-center">
			<tr>
			  <td style="min-width:200px">名称</td>
			  <td style="min-width:200px">电话</td>
			  <td style="min-width:200px">身份证</td>
			  <td style="min-width:200px">操作</td>
			</tr>
			<tr v-for="reviewData in reviewData.list">
				<template v-if="!show">
					<td>{{reviewData.name}}</td>
				    <td>{{reviewData.workAccount}}</td>
				    <td>
				    	<template v-if="reviewData.identity">
				    		<img style="cursor: pointer;width: 60px;height: 60px;" :src="domain + reviewData.identity+'?imageView2/2/w/60'" data-toggle="modal"  data-target=".showimg" @click='findImg(reviewData.workId)'/>
				    	</template>
				    	<template>
				    		未上传图片
				    	</template>
				    </td>
				    <td>
				    	<button type="button" class="btn btn-primary btn-sm" data-toggle="modal"  data-target=".openexit" @click='findifons(reviewData.workId)'>修改信息</button>
				    	<template v-if="reviewData.status == 'NONE'">
				    		<button type="button" class="btn btn-default btn-sm" data-toggle="modal"  data-target=".pass" @click='getId($event,reviewData.workId)'>通过</button>
				    		<button type="button" class="btn btn-default btn-sm" data-toggle="modal"  data-target=".nopass" @click='getId($event,reviewData.workId)'>不通过</button>
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
	<div class="modal fade showimg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-lg">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title" id="myModalLabel">身份证图片</h4>
	      </div>
	      <div class="modal-body">
	      		<img style="max-width: 98%;" :src="domain + findImgData.identity"/>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
	      </div>
	    </div>
	  </div>
	</div>
	<!--模态框  显示图片 end-->
	<!--模态框  通过审核 star-->
	<div class="modal fade pass" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-sm">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title" id="myModalLabel">谨慎操作</h4>
	      </div>
	      <div class="modal-body">
	      		<p>是否确认通过？</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" data-toggle="modal" data-target=".chooesWork">确认</button>
	      </div>
	    </div>
	  </div>
	</div>
	<!--模态框  通过审核 end-->
	<!--模态框  不通过审核 star-->
	<div class="modal fade nopass" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-sm">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title" id="myModalLabel">谨慎操作</h4>
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
	<!--模态框  工作室类型 star-->
	<div class="modal fade chooesWork" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-sm">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title" id="myModalLabel">请选择分配工作室类型！</h4>
	      </div>
	      <div class="modal-body">
      		<p style="text-align: center;">
      			<button type="button" class="btn btn-info btn-sm" data-dismiss="modal" @click="pass('OUT')">外部工作室</button>
	       		<button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="pass('IN')">内部工作室</button>
      		</p>
	      </div>
	    </div>
	  </div>
	</div>
	<!--模态框  工作室类型 end-->
	<!--模态框  修改信息 star-->
	<div class="modal fade openexit"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-bg">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title">修改用户信息（谨慎修改，修改时要仔细询问，确认后再修改）</h4>
	      </div>
	      <div class="modal-body">
	      		<form class="form-horizontal" role="form">
				  <div class="form-group">
				    <label  class="col-sm-3 control-label">工作室昵称</label>
				    <div class="col-sm-9">
				      <input type="text" class="form-control"  placeholder="工作室昵称" v-model="findifon.nickName">
				    </div>
				  </div>
				  <div class="form-group">
				    <label  class="col-sm-3 control-label">工作室类型</label>
				    <div class="col-sm-9">
				      外部工作室<input type="radio" name="work" value="OUT" v-model="findifon.type">
				      内部工作室<input type="radio" name="work" value="IN" v-model="findifon.type">
				    </div>
				  </div>
				  <div class="form-group">
				    <label  class="col-sm-3 control-label">真实姓名</label>
				    <div class="col-sm-9">
				      <input type="text" class="form-control"  placeholder="联系电话" v-model="findifon.name">
				    </div>
				  </div>
				  <div class="form-group">
				    <label  class="col-sm-3 control-label">身份证</label>
				    <div class="col-sm-9">
				    	<qiniu :options.sync="identity"></qiniu>
				      <img style="max-width: 100%;" :src="domain + findifon.identity"/>
				    </div>
				  </div>
				  <div class="form-group">
				    <label  class="col-sm-3 control-label">logo</label>
				    <div class="col-sm-9">
				    	<qiniu :options.sync="workLogo"></qiniu>
				    	<img style="max-width: 100%;" :src="findifon.workLogo"/>
				    </div>
				  </div>
				  <div class="form-group">
				    <label  class="col-sm-3 control-label">电话</label>
				    <div class="col-sm-9">
				      <input type="text" class="form-control"  placeholder="联系电话" v-model="findifon.phone">
				    </div>
				  </div>
				  <div class="form-group">
				    <label  class="col-sm-3 control-label">地址</label>
				    <div class="col-sm-9">
				        <select id="add1" style="width: 130px;float: left;margin-right: 5px;" v-model="province.id" class="form-control" @change="findcitys(province.id)">
	                        <option selected value="{{province.id}}">{{province.name}}</option>
	                        <option v-for="one in provinces" value="{{one.id}}">{{one.fullname}}</option>
	                    </select>
	                    <select id="add2" style="width: 130px;float: left;margin-right: 5px;" v-model="city.id" class="form-control" @change="findcountys(city.id)">
	                         <option selected value="{{city.id}}">{{city.name}}</option>
	                        <option v-for="one in citys" value="{{one.id}}">{{one.fullname}}</option>
	                    </select>
	                    <select id="add3" style="width: 130px;float: left;"  v-model="county.id" class="form-control">
	                         <option selected value="{{county.id}}">{{county.name}}</option>
	                        <option v-for="one in countys" value="{{one.id}}">{{one.fullname}}</option>
	                    </select>
	                    <input type="text" style="margin-top: 45px;" class="form-control"  placeholder="详细地址" v-model="address">
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
		domain:Lib.C.qiniu.jsUrl,
		pageNo:1,
		pageSize:20,
		workAccount:'',//工作室账号
		workId:'',//工作室ID
		workNickName:'',//工作室名字	
		reviewData:{},//工作室信息
		show:false,
		type:'',
		pageData:{},
		findImgData:{},
		photoName:'',
		findifon:{//影楼基本信息
			identity:'',
			address:{
				province:{id:'',name:''},
				city:{id:'',name:''},
				county:{id:'',name:''},
				address:'',
			},
			name:'',
			nickName:'',
			phone:'',
			type:'OUT',
			workLogo:'',
			workId:'',
		},
		workLogo:{
			key:'workLogo',
			max_file_size:'5m',
		},
		identity:{
			key:'identity',
			max_file_size:'2m',
		},
		province:{
			id:'',
			name:'省'
		},
		city:{
			id:'',
			name:'市'
		},
		county:{
			id:'',
			name:'县'
		},
		address:'',
		provinces:{},
		citys:{},
		countys:{},
	}),
	created() {
		this.findReview();
	},
	components:{
		page,
		Qiniu
	},
	events: {
		'child-turn-page'(obj){
			this.pageNo = obj.pageNo;
			this.findReview(this.type);
		},
		'child-qiniu-data' (obj){
			let self = this;
			let	name;
            if(obj.key){
				name = obj.key.split("/")[2];
				if(name == 'identity'){
					self.$set('findifon.identity',obj.key)
				}else if(name == 'workLogo'){
					self.$set('findifon.workLogo',this.domain+obj.key)
				}
            }
		},
    },
	ready (){},
	watch: {},
	methods: {
		//查询所有省
		findProvince:function(){
			let self = this;
			$.ajax({
				type: "get",
				url: "http://apis.map.qq.com/ws/district/v1/list?key=DBRBZ-MFTHJ-66MFB-KKETF-5K6AH-WMBT3&output=jsonp",
				dataType: "jsonp",
				success: function(data) {
					self.$set('provinces',data.result[0])
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {}
			});
		},
		//查询所有市
		findcitys:function(id){
			let self = this;
			$.ajax({
				type: "get",
				url: "http://apis.map.qq.com/ws/district/v1/getchildren?id="+id+'&key=DBRBZ-MFTHJ-66MFB-KKETF-5K6AH-WMBT3&output=jsonp',
				dataType: "jsonp",
				success: function(data) {
					self.$set('citys',data.result[0])
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {}
			});
		},
		//查询所有县
		findcountys:function(id){
			let self = this;
			$.ajax({
				type: "get",
				url: "http://apis.map.qq.com/ws/district/v1/getchildren?id="+id+'&key=DBRBZ-MFTHJ-66MFB-KKETF-5K6AH-WMBT3&output=jsonp',
				dataType: "jsonp",
				success: function(data) {
					self.$set('countys',data.result[0])
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {}
			});
		},
		//修改用户信息
		exitifon:function(){
			this.findifon.address ={
				province:{
					id:this.province.id,
					name:$('#add1').find("option:selected").text()
				},
				city:{
					id:this.city.id,
					name:$('#add2').find("option:selected").text()
				},
				county:{
					id:this.county.id,
					name:$('#add3').find("option:selected").text()
				},
				address:this.address,
			}
			let url = this.host + 'onLinePs/workInfo/updateWorkInfo';
            let self = this;
            let params ={};
			params.name = this.findifon.name,
            params.identity = this.findifon.identity,
			params.address = JSON.stringify(this.findifon.address),
			params.workNickName = this.findifon.nickName,
			params.phone = this.findifon.phone,
			params.type = this.findifon.type,
			params.workLogo = this.findifon.workLogo,
			params.workId = this.findifon.workId*1,
            Lib.M.load(url, JSON.stringify(params), function(data) {
            	if(data.code == -1){
            		self.findReview(self.type);
            		Lib.M.topRightInfoTips({title:"修改成功！"});
            	}else{
            		Lib.M.topRightInfoTips({content:data.message+'重新修改'});
            	}
            },'PUT');
		},
		//查询单个影楼的信息
		findifons:function(id){
			let url = this.host + 'onLinePs/workInfo/findWorkInfo';
            let self = this;
            let params = {};
            params = {
                workId: id,
            };
            Lib.M.load(url, params, function(data) {
            	self.$set('findifon',data.data.list[0])
            	self.$set('findifon.phone',data.data.list[0].workAccount)
            	self.$set('findifon.nickName',data.data.list[0].workNickName)
            	self.$set('findifon.name',data.data.list[0].name)
            	if(data.data.list[0].address.split('"').length<10){
            		self.findProvince();
            		self.$set('province',{})
	            	self.$set('city',{})
	            	self.$set('county',{})
	            	self.$set('address',self.findifon.address)
            	}else{
            		self.$set('findifon.address',JSON.parse(data.data.list[0].address))
	            	self.$set('province',self.findifon.address.province)
	            	self.$set('city',self.findifon.address.city)
	            	self.$set('county',self.findifon.address.county)
	            	self.$set('address',self.findifon.address.address)
	            	self.findProvince();
            	}
            	
            },'GET');
		},
		findImg:function(workId){
            let url = this.host + 'onLinePs/workInfo/findWorkInfo';
            let self = this;
            let params = {};
            params = {
                workId: workId,
            };
            Lib.M.load(url, params, function(data) {
            	self.$set('findImgData',data.data.list[0])
            },'GET');
		},
		findReview: function(type,name) {
			this.type = type;
            let url = this.host + 'onLinePs/workInfo/findWorkInfo';
            let self = this;
            let params = {};
            params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                status: this.type,
                name:name,
            };
            Lib.M.load(url, params, function(data) {
            	if(data.hasOwnProperty('code')){
            		self.show = true;
            		Lib.M.topRightInfoTips({title:data.message})
            	}else{
            		self.show = false;
            		self.$set('reviewData',data.data)
            		self.$set('pageData',data.data)
            	}
            },'GET');
        },
        getId:function(inde,workId){
        	this.workId = workId;
        },
        pass:function(type){
        	if(type == 'NO'){
        		let url = this.host + 'onLinePs/workInfo/updateWorkStatusById';
	            let self = this;
	            let params = {};
	            params.workId = this.workId;
	            params.status = 'NO';
	            Lib.M.load(url, JSON.stringify(params), function(data) {
		          	if(data.code == -1){
		          		Lib.M.topRightInfoTips({content:data.message})
		          		self.findReview();
		          	}else{
		          		Lib.M.topRightInfoTips({title:data.message})
		          	}
	            },'put');
        	}else{
        		let url = this.host + 'onLinePs/workInfo/updateWorkStatusById';
	            let self = this;
	            let params = {};
	            params.workId = this.workId;
	            params.status = 'YES';
	            params.type = type
	            Lib.M.load(url, JSON.stringify(params), function(data) {
		          	if(data.code == -1){
		          		Lib.M.topRightInfoTips({content:data.message});
		          		self.findReview();
		          	}else{
		          		Lib.M.topRightInfoTips({title:data.message});
		          	}
	            },'put');
        	}
        }
	}
}
	
</script>
<style type="text/css" scoped>

</style>