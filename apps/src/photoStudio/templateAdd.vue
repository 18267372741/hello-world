<template lang="html">
	<div class="title">
    	<h3>添加模板</h3>
	</div>
	<form class="form-horizontal box">
		<div class="form-group">
			<div class="col-sm-12">
				<label v-if="!addr.group&&!addr.groupedi" class="col-sm-4 control-label"><span :class="{'blue':photoTemp.name}" class="red">*</span>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题:</label>
				<label v-if="addr.group||addr.groupedi" class="col-sm-4 control-label"><span :class="{'blue':photoTemp.name}" class="red">*</span>模板分组名称:</label>
				<div class="col-sm-6">
					<input v-model="photoTemp.name" type="text" class="form-control">
				</div>
			</div>
		</div>
		<template v-if="!addr.group&&!addr.groupedi">
			<div class="form-group">
				<div class="col-sm-12">
					<label class="col-sm-4 control-label"><span :class="{'blue':photoTemp.logo}" class="red">*</span>封&nbsp;&nbsp;面&nbsp;&nbsp;图:</label>
					<div class="col-sm-6">
						<qiniu :options="logo"></qiniu><span class="line-height">(封面图限大5M)</span>
					</div>
				</div> 
			</div>
			<div class="form-group">
				<div class="col-sm-12">
					<div class="col-sm-offset-4 col-sm-6 pic">
						<img :src="qnyUrl+photoTemp.logo" alt="封面" style="width: 180px;height: 140px;"/>
					</div>
				</div>
			</div>
			<!-- <div class="form-group">
				<div class="col-sm-12">
					<label class="col-sm-4 control-label"><span class="red">*</span>模板文件:</label>
					<div class="col-sm-6">
						<qiniu :options="files"></qiniu><span class="line-height">(添加模板文件限大1G、压缩文件)</span>
					</div>
				</div>
			</div> -->
			<div class="form-group">
				<div class="col-sm-12">
					<label class="col-sm-4 control-label"><span :class="{'blue':photoTemp.files}" class="red">*</span>模板文件:</label>
					<div class="col-sm-6">
						<qiniu-up></qiniu-up>
						<span class="line-height">(添加模板文件限大1G、压缩文件)</span>
					</div>
				</div>
			</div> 
			<div class="form-group">
				<div class="col-sm-offset-4 col-sm-6">
					<div class="col-sm-12" v-if="photoTemp.files">
						源文件
						<span style="color: red;">
							{{photoTemp.files.split("/")[photoTemp.files.split("/").length-1]}}
						</span>
						<span v-if="!addr.id">上传成功</span>
					</div>
				</div>
			</div>
			<!-- <div class="form-group">
				<div class="col-sm-12">
					<label class="col-sm-4 control-label"><span class="red">*</span>预&nbsp;&nbsp;览&nbsp;&nbsp;图:</label>
					<div class="col-sm-6">
						<qiniu :options="showPic"></qiniu><span class="line-height">(预览图每张限大20M)</span>
					</div>
				</div>
			</div> -->
			<div class="form-group">
				<div class="col-sm-12">
					<div class="col-sm-offset-4 col-sm-6 pic">
						<template v-for="showPic in photoTemp.showPic">
							<div style="position: relative; float: left; width: 100px;margin: 16px 8px 10px 0; box-shadow: 0 0 5px #ccc;">
								<span @click="deleteFile($index)" class="jiaobiao">×</span>
								<a target="_blank" :href="qnyUrl+showPic">
									<img :src="qnyUrl+showPic+'?imageMogr2/thumbnail/110x110!'"/>
								</a>	
							</div>
						</template>
					</div>
				</div>
			</div>	
		</template>
		
		<div style="overflow: hidden; margin-top: 7%;">
			<div class="form-group col-sm-12 add-input anniu">
				<input v-if="addr.group" @click="addtempType" type="button" class="btn-primary" value="确认添加">
				<input v-if="addr.groupid" @click="addPhotoTemps(addr.groupid)" type="button" class="btn-primary" value="确认添加">
				<input v-if="addr.id&&!addr.groupedi" @click="upPhotoTemps" type="button" class="btn-primary" value="确认修改">
				<input v-if="addr.groupedi" @click="uptempType" type="button" class="btn-primary" value="确认修改">
		        <button onclick="javascript:history.back(-1);" type="button" class="btn-primary" style="width: 110px; height: 40px; border: 0;">
		            取消
		        </button>
			</div>
		</div>
		
	</form>
</template>
<script>
	import Lib from '../assets/lib.js'
	import qiniu from '../components/qiniu.vue'
	import qiniuUp from './common/qiniuUpPic.vue'
	const moment =require('moment')
	require('daterangepicker.js')
	require('daterangepicker.css')
	export default {
		data: () => ({
			host: Lib.C.hostPhotoStudio,
			id: sessionStorage.getItem("id"),
			addr:Lib.M.getUrlParams(),
			qnyUrl:Lib.C.qiniu.jsUrl,
			logo:{
	    		key:"logo",
	    		max_file_size:"5mb"
	    	},
	    	files:{
	    		key:"files",
	    		max_file_size:"1024mb"
	    	},
	    	showPic:{	
	    		key:"showPic",
	    		max_file_size:"20mb"
	    	},
			photoTemp:{
				"showPic":[]
			},
		}),
		watch: {},
		events: {
	        'child-qiniu-data' (obj){
				var self = this,
					name;
	            if(obj.key){
					name = obj.key.split("/")[2];
	            }
	            if(obj.key&&name=="logo"){
					self.$set("photoTemp.logo",obj.key);
	            }
	            if(obj.key&&name=="files"){
					self.$set("photoTemp.files",obj.key);
	            }
	            if(obj.key&&name=="showPic"){
	            	if(self.photoTemp.showPic.length>=5){
	            		Lib.M.topRightInfoTips({title:"预览图不得大于5张"});
	            		return false;
	            	}
	            	self.photoTemp.showPic.push(obj.key);
				}
			}
		},
		created: function () {
			if( this.addr.id && this.addr.groupedi ){
				this.tempTypes();
			}
			if( this.addr.id && !this.addr.groupedi ){
				this.photoTemps();
			}
		},
		ready: function () { },
		methods: {
			tempTypes (){//分组列表
	            var url = this.host+'v1/group/tempType',
	                postParam = {},
	                self = this;
	            postParam = {
	                "photoInfoId":this.id,
	                "pageNo":this.pageNo,
	                "pageSize":5,
	                "id":parseInt(this.addr.id)
	            }
	            Lib.M.load(url, postParam ,function(data){
	                self.$set("photoTemp",data.data.list[0]);
	            },"GET");
	        },
			addtempType (){//模板分组
				var url = this.host+'v1/group/tempType',
					postParam = {},
					self = this;
				postParam = {
					"name":this.photoTemp.name,
					"photoInfoId": parseInt(this.id)
				};
				Lib.M.load(url, JSON.stringify(postParam) ,function(data){
					Lib.M.topRightInfoTips({title: data.message});
					if(data.code == -1){
						setTimeout(function(){
							location.href="#/index/templateL";
						},1500);
					}
				});
			},
			deleteFile (index){//删除图片
				this.photoTemp.showPic.splice(index, 1);
			},
			photoTemps (){//模板列表
				var url = this.host+'v1/photo/temp/photoTemp/'+this.id+"/"+this.addr.id,
					postParam = {},
					self = this;
				Lib.M.load(url, {},function(data){
					if(data.code==8){
						self.$set("photoTemp",[]);
						return false;
					};
					data.data.showPic = JSON.parse(data.data.showPic);
					self.$set("photoTemp",data.data);
				},"GET");
			},
			upPhotoTemps (){//修改模板
				var url = this.host+'v1/photo/temp/photoTemp',
					postParam = {},
					self = this;
				postParam = {
					"files":this.photoTemp.files,
					"logo":this.photoTemp.logo,
					"name":this.photoTemp.name,
					"showPic":JSON.stringify(this.photoTemp.showPic),
					"id": parseInt(this.addr.id)
				};
				Lib.M.load(url, JSON.stringify(postParam) ,function(data){
					Lib.M.topRightInfoTips({title: data.message});
					if(data.code == -1){
						setTimeout(function(){
							window.history.go(-1);
						},1500);
					}
				},"put");
			},
			uptempType (){//修改模板组
				var url = this.host+'v1/group/tempType',
					postParam = {},
					self = this;
				postParam = {
					"name":this.photoTemp.name,
					"photoInfoId": parseInt(this.id),
					"id": parseInt(this.addr.id)
				};
				Lib.M.load(url, postParam ,function(data){
					Lib.M.topRightInfoTips({title: data.message});
					if(data.code == -1){
						setTimeout(function(){
							window.history.go(-1);
						},1500);
					}
				},"put");
			},
			addPhotoTemps (){//添加模板
				if(!this.photoTemp.files||!this.photoTemp.logo||!this.photoTemp.name||!this.photoTemp.showPic){
					Lib.M.topRightInfoTips({title: "请填写完整信息"});
					return false
				}
				var url = this.host+'v1/photo/temp/photoTemp',
					postParam = {},
					self = this;
				postParam = {
					"files":this.photoTemp.files,
					"logo":this.photoTemp.logo,
					"name":this.photoTemp.name,
					"showPic":JSON.stringify(this.photoTemp.showPic),
					"photoInfoId": parseInt(this.id),
					"tempTypeId":parseInt( this.addr.groupid )
				};
				Lib.M.load(url, JSON.stringify(postParam) ,function(data){
					Lib.M.topRightInfoTips({title: data.message});
					if(data.code == -1){
						setTimeout(function(){
							location.href="#/index/templateL?groupId="+self.addr.groupid;
						},1500);
					}
				});
			},
		},
		components: {
			qiniu,
		    qiniuUp
		}
	}
</script>
<style scoped>
	.anniu input,.anniu button{
		background: #275482;border-radius: 50px
	}
	.box{
	    margin: 0 auto; width: 960px; padding-top: 50px;
	}
	.title{
		text-align: center; padding: 30px 0; background: #ecedf3; margin-bottom: 30px
	}
	h3,h4{
		margin: 0;padding: 0;
	}
	h3{
		margin-bottom: 4px;
	}
	.pic img{
		width: 100%;
	}
	.red{
		color: red
	}
	.blue{
		color: blue
	}
	.jiaobiao{
		width: 15px;height: 15px;background: red;display: inline-block;position: absolute; top: 0;
		right: 0;color: white;border-radius: 100%;text-align: center;line-height: 15px; cursor: pointer; font-size: 15px;
	}
	.line-height{
		line-height: 34px; margin-left: 10px;
	}
	.col-sm-6 > div{
		float: left;
	}
	.add-input{
		text-align: center;
	}
	.add-input>input{
		width: 110px; height: 40px; border: 0;
	}
</style>