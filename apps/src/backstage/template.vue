<template lang="html">
	<div class="template">
		<h3 style="min-width:600px">系统模板 
			<button type="button" class="btn btn-primary"  data-toggle="modal"  data-target=".addgroup">添加模板分组</button>
		</h3>
		<h3>
			<button style="margin-right:10px ;margin-bottom: 10px;position: relative;" type="button" class="btn btn-info" @click="findTemplate(groupdata.id)" v-for="groupdata in groupdata">
				{{groupdata.name}}
				<em class="deleteg" data-toggle="modal"  data-target=".deletgroup" @click="gitid(groupdata.id)">x</em>
			</button>
		</h3>
		<div class="templateCnot">
			<div class="container-fluid">
				<div class="row template">
					<div v-if="hasdata == true">
						<h4>没有数据！</h4>
					</div>
					<div v-else>
						<div class="col-md-2" v-for="templateData in templateData.list" style="min-width: 230px;">
							<div class="margin-10">
								<div>
						    		<img style="height:210px" :src="domain + templateData.logo+'?imageView2/2/w/230'"/>
						    		<!--<img style="height:210px" :src="domain + templateData.logo+'?imageView2/2/w/230'"/ data-toggle="modal"  data-target=".find" @click="findOneTemplate(templateData.id)">-->
						    	</div>
						    	<div class="teampName">
						    		{{templateData.name}}
						    	</div>
						    	<div>
						    		<button class="btn btn-danger btn-sm"  data-toggle="modal"  data-target=".deletTe" @click="gitid(templateData.id)">删除</button>
						    		<button class="btn btn-success btn-sm"  data-toggle="modal"  data-target=".exitTe" @click="findOneTemplate(templateData.id)">修改</button>
						    		<button class="btn btn-sm"><a href="{{domain}}{{templateData.files}}" target="_blank">下载模板</a></button>
						    	</div>
							</div>
					    </div>
					</div>
				    <div class="col-md-2">
				    	<div data-toggle="modal"  data-target=".addTemplate" @click="clear">
				    		<img style="border: 0;cursor: pointer;" title="添加模板" src="../assets/images/addTe.png"/>
				    	</div>
				    </div>
				</div>
				 <page :turn-page="pageData"></page>
			</div>
		</div>
	</div>
	<!--模态框  添加模板分组 star-->
	<div class="modal fade addgroup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-bg">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title" >添加模板分组</h4>
	      </div>
	      <div class="modal-body">
	      		<form class="form-horizontal" role="form">
				  <div class="form-group">
				    <label class="col-sm-4 control-label">模板分组名称：</label>
				    <div class="col-sm-8">
			    		<input type="text" class="form-control"  placeholder="填写模板分组名称" v-model="addname">
				    </div>
				  </div>
				</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">暂不添加</button>
	        <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="addgroup">确认添加</button>
	      </div>
	    </div>
	  </div>
	</div>
	<!--模态框  添加模板分组 end-->
	<!--模态框  删除模板分组 star-->
	<div class="modal fade deletgroup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-sm">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title" >删除</h4>
	      </div>
	      <div class="modal-body">
	      		<p>是否确认删除此分组？</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="deletgroup">确认</button>
	      </div>
	    </div>
	  </div>
	</div>
	<!--模态框  删除模板分组 end-->
	<!--模态框  查看。预览 star-->
	<!--<div class="modal fade find" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-lg">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title" >预览图片( <a href="{{domain + OneTemplateData.files}}" target="_blank">下载查看详细内容</a>)</h4>
	      </div>
	      <div class="modal-body">
	      		<div class="row">
			    	<div style="padding-bottom: 5px;" class="col-md-4" v-for="showPic in OneTemplateData.showPic">
			    		<img style="max-width: 100%;height: 200px;" :src="domain + showPic"/>
			    	</div>
			    </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
	        <a href="{{domain + OneTemplateData.files}}" target="_blank"><button type="button" class="btn btn-primary btn-sm">下载</button></a>
	      </div>
	    </div>
	  </div>
	</div>-->
	<!--模态框  查看。预览 end-->
	<!--模态框  修改模板 star-->
	<div class="modal fade exitTe" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title" >修改信息</h4>
	      </div>
	      <div class="modal-body">
	      		<div class="row">
			    	<div class="col-md-12">
			    		<form class="form-horizontal" role="form">
						  <div class="form-group">
						    <label for="inputEmail3" class="col-sm-4 control-label">模板名称：</label>
						    <div class="col-sm-8">
						      <input type="text" class="form-control" id="inputEmail3" placeholder="模板名称" v-model="OneTemplateData.tempName">
						    </div>
						  </div>
						  <div class="form-group">
						    <label class="col-sm-4 control-label">模板分组：</label>
						    <div class="col-sm-8">
					    		<select class="form-control" v-model="OneTemplateData.tempTypeId">
							  		<option v-for="groupdata in groupdata" value="{{groupdata.id}}">{{groupdata.name}}</option>
						    	</select>
						    </div>
						  </div>
						  <div class="form-group">
						    <label for="inputPassword3" class="col-sm-4 control-label">模板封面(max5M)：</label>
						    <div class="col-sm-8">
						    	<div class="uploadImg">
						    		<qiniu :options.sync="tempLogo"></qiniu>
						    	</div>
						    	<span class="showImgUp">
						    		<img :src="domain + OneTemplateData.tempLogo"/>
						    	</span>
						    </div>
						  </div>
						  <!--<div class="form-group">
						    <label for="inputPassword3" class="col-sm-4 control-label">预览图(max5M)：</label>
						    <div class="col-sm-8">
						    	<div class="uploadImg">
						    		<qiniu :options.sync="showPic"></qiniu>
						    	</div>
						    	<span class="showImgUp" v-for="showPic in OneTemplateData.showPic">
						    		<img :src="domain + showPic"/>
						    		<span class="iconfont icon-shanchujian deletImg" title="删除"  @click="deletImg($index)"></span>
						    	</span>
						    </div>
						  </div>-->
						  <div class="form-group">
						    <label for="inputPassword3" class="col-sm-4 control-label">模板文件(max1GB)：</label>
						    <div class="col-sm-8">
						    	<div class="uploadImg">
						    		<qiniu :options.sync="files"></qiniu>
						    	</div>
						    	<span class="showImgUp">
						    		<p>文件地址：{{OneTemplateData.files != ''?OneTemplateData.files.split("/")[OneTemplateData.files.split("/").length - 1]:'请上传压缩文件'}}</p>
						    	</span>
						    </div>
						  </div>
						</form>
			    	</div>
			    </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="exitTe(OneTemplateData.tempId)">确认</button>
	      </div>
	    </div>
	  </div>
	</div>
	<!--模态框  修改模板 end-->
	<!--模态框  删除模板 star-->
	<div class="modal fade deletTe" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-sm">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title" >删除</h4>
	      </div>
	      <div class="modal-body">
	      		<p>是否确认删除此模板？</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="deletTe">确认</button>
	      </div>
	    </div>
	  </div>
	</div>
	<!--模态框  删除模板 end-->
	<!--模态框  添加模板 star-->
	<div class="modal fade addTemplate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title" >添加模板</h4>
	      </div>
	      <div class="modal-body">
	      		<div class="row">
			    	<div class="col-md-12">
			    		<form class="form-horizontal" role="form">
						  <div class="form-group">
						    <label class="col-sm-4 control-label">模板名称：</label>
						    <div class="col-sm-8">
						      <input type="text" class="form-control"  placeholder="模板名称" v-model="OneTemplateData.tempName">
						    </div>
						  </div>
						  <!--<div class="form-group">
						    <label class="col-sm-4 control-label">模板分组：</label>
						    <div class="col-sm-8">
					    		<select class="form-control" v-model="OneTemplateData.tempTypeId">
							  		<option v-for="groupdata in groupdata" value="{{groupdata.id}}">{{groupdata.name}}</option>
						    	</select>
						    </div>
						  </div>-->
						  <div class="form-group">
						    <label for="inputPassword3" class="col-sm-4 control-label">模板封面(max5M)：</label>
						    <div class="col-sm-8">
						    	<div class="uploadImg">
						    		<qiniu :options.sync="tempLogo"></qiniu>
						    	</div>
						    	<span class="showImgUp">
						    		<img :src="OneTemplateData.tempLogo!=''?domain + OneTemplateData.tempLogo:''"/>
						    	</span>
						    </div>
						  </div>
						  <!--<div class="form-group">
						    <label for="inputPassword3" class="col-sm-4 control-label">预览图(max5M)：</label>
						    <div class="col-sm-8">
						    	<div class="uploadImg">
						    		<qiniu :options.sync="showPic"></qiniu>
						    	</div>
						    	<span class="showImgUp" v-for="showPic in OneTemplateData.showPic">
						    		<img :src="domain + showPic"/>
						    		<span class="iconfont icon-shanchujian deletImg" title="删除"  @click="deletImg($index)"></span>
						    	</span>
						    </div>
						  </div>-->
						  <div class="form-group">
						    <label for="inputPassword3" class="col-sm-4 control-label">模板文件(max1GB)：</label>
						    <div class="col-sm-8">
						    	<div class="uploadImg">
						    		<qiniu :options.sync="files"></qiniu>
						    	</div>
						    	<span class="showImgUp">
						    		<p>文件地址：{{OneTemplateData.files != ''?OneTemplateData.files.split("/")[OneTemplateData.files.split("/").length - 1]:'请上传压缩文件'}}</p>
						    	</span>
						    </div>
						  </div>
						</form>
			    	</div>
			    </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="addTemplate">确认</button>
	      </div>
	    </div>
	  </div>
	</div>
	<!--模态框  添加模板 end-->
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
		tempId:'',
		hasdata:false,
		pageNo:1,
		templateData:{},
		OneTemplateData:{
			tempName:'',
			showPic:[],
			files:'',
			tempLogo:'',
			tempTypeId:'',
		},
		showPic:{
			key:'showPic',
			max_file_size:'5m',
		},
		tempLogo:{
			key:'tempLogo',
			max_file_size:'5m',
		},
		files:{
			max_file_size:'1100m',
			key:'files',
		},
		pageData:{},
		groupdata:{},
		addname:'',
	}),
	created() {
		this.findgroup();
	},
	ready (){

	},
	events: {
		'child-turn-page'(obj){
			this.pageNo = obj.pageNo;
			this.findTemplate(this.OneTemplateData.tempTypeId);
		},
        'child-qiniu-data' (obj){
			let self = this;
			let	name;
            if(obj.key){
				name = obj.key.split("/")[2];
				if(name == 'showPic'){
					self.OneTemplateData.showPic.push(obj.key)
				}else if(name == 'tempLogo'){
					self.$set('OneTemplateData.tempLogo',obj.key)
				}else if(name == 'files'){
					self.$set('OneTemplateData.files',obj.key)
				}
            }
		},
	},
	watch: {
	},
	methods: {
		//删除分组
		deletgroup:function(){
			let url = this.host + 'v1/group/tempType/?id='+this.tempId;
            let self = this;
            let params = {};
            Lib.M.load(url,'', function(data) {
            	if(data.code == -1){
            		self.findgroup();
            		Lib.M.topRightInfoTips({title: data.message})
            	}else{
            		Lib.M.topRightInfoTips({title: data.message})
            	}
            },'delete');
		},
		//添加分组
		addgroup:function(){
			let url = this.host + 'v1/group/tempType';
            let self = this;
            let params = {};
            params.name = this.addname != ''?this.addname:'后台模板';
            Lib.M.load(url,JSON.stringify(params), function(data) {
            	if(data.code == -1){
            		self.findgroup();
            		Lib.M.topRightInfoTips({title: data.message})
            	}else{
            		Lib.M.topRightInfoTips({title: data.message})
            	}
            },'post');
		},
		//查询分组
		findgroup:function(){
			let url = this.host + 'v1/group/tempType';
            let self = this;
            let params = {};
            params = {};
            Lib.M.load(url, params, function(data) {
            	self.$set('groupdata',data.data.list)
            	self.$set('OneTemplateData.tempTypeId',data.data.list[0].id)
            	self.findTemplate(data.data.list[0].id)
            },'GET');
		},
		findTemplate: function(id) {
			this.OneTemplateData.tempTypeId = id;
            let url = this.host + 'v1/temp/getTemp/system';
            let self = this;
            let params = {};
            params = {
                pageNo: this.pageNo,
                pageSize: 19,
                tempTypeId:id
            };
            Lib.M.load(url, params, function(data) {
                if(data.hasOwnProperty('code')){
                	self.hasdata = true;
                }else{
                	self.hasdata =false;
                	self.$set('templateData',data.data)
                	self.$set('pageData',data.data)
                }
            },'GET');
        },
        addTemplate:function(){
        	let url = this.host + 'onLinePs/tempInfo/addTempInfo';
            let self = this;
            let params = {};
            params = {
                showPic: this.OneTemplateData.showPic,
                tempLogo: this.OneTemplateData.tempLogo,
                tempName:this.OneTemplateData.tempName,
                files:this.OneTemplateData.files,
                tempTypeId:this.OneTemplateData.tempTypeId*1,
            };
            Lib.M.load(url, JSON.stringify(params), function(data) {
                if(data.code == -1) {
                    self.findTemplate(self.OneTemplateData.tempTypeId)
                    Lib.M.topRightInfoTips({
                        title: data.message
                    })
                } else {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    })
                }
            });
        },
        gitid:function(tempId){
        	this.tempId = tempId
        },
        deletTe:function(){
        	let url = this.host + 'onLinePs/tempInfo/deleteTempInfoById/'+this.tempId;
            let self = this;
            let params = {};
            Lib.M.load(url, params, function(data) {
                if(data.code == -1) {
                    self.findTemplate(self.OneTemplateData.tempTypeId);
                    Lib.M.topRightInfoTips({
                        title: data.message
                    })
                } else {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    })
                }
            },'delete');
        },
        findOneTemplate: function(tempId) {
            let url = this.host + 'onLinePs/tempInfo/findTempInfo';
            let self = this;
            let params = {};
            params = {
                tempId: tempId,
            };
            Lib.M.load(url, params, function(data) {
            	self.$set('OneTemplateData',data.data.list[0])
            	self.OneTemplateData.showPic =JSON.parse(self.OneTemplateData.showPic)
            },'GET');
        },
        exitTe:function(tempId){
        	let url = this.host + 'onLinePs/tempInfo/updateTempInfo';
            let self = this;
            let params = {};
            params = {
            	tempId:tempId,
                showPic: this.OneTemplateData.showPic,
                tempLogo: this.OneTemplateData.tempLogo,
                tempName:this.OneTemplateData.tempName,
                files:this.OneTemplateData.files,
                tempTypeId:this.OneTemplateData.tempTypeId*1,
            };
            Lib.M.load(url, JSON.stringify(params), function(data) {
                if(data.code == -1) {
                	self.findTemplate(self.OneTemplateData.tempTypeId);
                    Lib.M.topRightInfoTips({
                        title: data.message
                    })
                } else {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    })
                }
            },'put');
        },
        //清数据
        clear:function(){
        	this.OneTemplateData.tempName = '';
        	this.OneTemplateData.showPic =[];
        	this.OneTemplateData.tempLogo ='';
        	this.OneTemplateData.files ='';
        },
        deletImg:function(index){
        	this.OneTemplateData.showPic.splice(index,1)
        }
	},
	components: {
		Qiniu,
		page
	}
}

</script>
<style type="text/css" scoped>
.col-md-2{
	position: relative;
	text-align: center;
	margin-bottom: 15px;
}
.col-md-2 span{
	cursor: pointer;
}
.col-md-2>.exit{
	position: absolute;
	left: 30px;
	top: 10px;
}
.col-md-2>.delet{
	position: absolute;
	right:30px;
	top: 10px;
}
.col-md-2 .save{
	position: absolute;
    right: 0;
}
.col-md-2 .glyphicon{
    background: #929292;
    border-radius: 50%;
    padding: 2px;
    color: #000;
}
.template img{
    width: 99%;
	cursor: pointer;
}
.margin-10{
	padding-top: 30px;
	border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: 3px 3px 3px #333;
    -moz-box-shadow: 3px 3px 3px #333;
    box-shadow: 3px 3px 3px #333;
}

.uploadImg{
    padding: 7px 0;
}
.showImgUp{
	float: left;
	position: relative;
}
.showImgUp img{
	width: 80px;
	height: 80px;
	border-radius: 4px;
	margin-right: 5px;
}
.teampName{
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-box-orient: vertical;
    padding: 0 20px;
    top: 3px;
    background-color: #428bca;
    height: 30px;
    line-height: 2;
    color: #fff;
    left: 17px;
    right: 17px;
    /*border-radius: 4px;*/
}
.deletImg{
	position: absolute;
    right: 8px;
    top: -2px;
    border-radius: 50%;
    color: #d9534f;
    cursor: pointer;
}
.deleteg{
	position: absolute;
    z-index: 1000;
    cursor: pointer;
    width: 20px;
    height: 20px;
    background: red;
    border-radius: 50%;
    font-style: initial;
    top: -10px;
}
</style>