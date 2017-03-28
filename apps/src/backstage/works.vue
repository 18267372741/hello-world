<template lang="html">
	<div class="help">
		<h3 style="min-width:300px">
			产品列表
			<button type="button" class="btn btn-success"  @click="openMolde('post')">添加产品分组</button>
		</h3>
		<h3>
			<button style="margin-right:10px ;margin-bottom: 10px;position: relative;" type="button" class="btn btn-info" @click="findworks(groupdata.id)" v-for="groupdata in groupdata">
				{{groupdata.name}}
				<em class="deleteg"  @click="geitid(groupdata.id,'group')">x</em>
			</button>
		</h3>
		<h3 style="min-width:300px">
			<a v-link="{path:'/index/workadd?id='+typeId}"><button type="button" class="btn btn-success">添加分组产品</button></a>
			<small>产品分组名称：<span style="color: red;">{{Onegroupdata.name}}</span></small>
			<small>产品分组描述：<span style="color: red;">{{Onegroupdata.description}}</span></small>
			<button type="button" class="btn btn-primary btn-xs"  @click="openMolde('put')">修改产品分组信息</button>
		</h3>
		<table class="table table-bordered text-center">
			<tr>
			  <td style="min-width:200px">名称</td>
			  <td style="min-width:200px">封面图</td>
			  <td style="min-width:200px">操作</td>
			</tr>
			<tr v-for="work in worksdata">
			    <td>
			    	{{work.name}}
			    </td>
			    <td>
			    	<img style="width: 200px;" :src="domain + work.image"/>
			    </td>
			    <td>
			    	<a v-link="{path:'/index/workadd?id='+typeId+'&works='+work.id}"><button type="button" class="btn btn-primary">修改</button></a>
			    	<button type="button" class="btn btn-danger"  @click="geitid(work.id,'works')">删除</button>
			    </td>
			</tr>
		</table>
		<page :turn-page="pageData"></page>
		<div v-if="show">
			没有数据！
		</div>
		<!--添加产品分组  modal-->
        <div class="modal fade {{addgroup.show?'in':''}}" style="display: block;" v-if="addgroup.show">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="addgroup.show=false"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">{{addgroup.type=='put'?'修改':'添加'}}产品分组 </h4>
                    </div>
                    <div class="modal-body">
                       	<form class="form-horizontal" role="form">
						  <div class="form-group">
						    <label  class="col-sm-3 control-label">产品分组名称</label>
						    <div class="col-sm-9">
						      <input type="text" class="form-control" placeholder="产品分组名称" maxlength="13" v-model="group.name">
						    </div>
						  </div>
						  <div class="form-group">
						    <label  class="col-sm-3 control-label">产品分组描述</label>
						    <div class="col-sm-9">
						      <input type="text" class="form-control" placeholder="产品分组描述" v-model="group.description">
						    </div>
						  </div>
						</form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="addgroup.show=false">暂不{{addgroup.type=='put'?'修改':'添加'}}</button>
                        <button type="button" class="btn btn-primary" @click="addgruops">确定{{addgroup.type=='put'?'修改':'添加'}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop fade {{addgroup.show?'in':''}}" v-if="addgroup.show"></div>
        
        
        <!--删除分组提示确认  modal-->
        <div class="modal fade {{deletes.show?'in':''}}" style="display:block;" v-if="deletes.show">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="deletes.show=false"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">删除分组（谨慎操作） </h4>
                    </div>
                    <div class="modal-body">
                       	<p>是否确认删除？</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="deletes.show=false">暂不删除</button>
                        <button type="button" class="btn btn-primary" @click="deleteGroup">确定删除</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop fade {{deletes.show?'in':''}}" v-if="deletes.show"></div>
	</div>
</template>
<script type="text/javascript">
	import Lib from '../assets/lib'
	import Qiniu from '../components/qiniu'
	import page from '../components/page/pagegai.vue'
	import richText from '../components/richTextComponents.vue'
export default {
	props: {
        
    },
	data: () => ({
		host: Lib.C.hostBackstage,
		domain:Lib.C.qiniu.jsUrl,
		pageNo:1,
		pageSize:20,
		show:false,
		pageData:{},
		groupdata:{},
		Onegroupdata:{},
		worksdata:{},
		leixin:'',
		addgroup:{
			show:false,
			type:'post'
		},
		deletes:{
			show:false
		},
		addgroupwork:{
			show:false
		},
		group:{
			description:'',
			name:''
		},
		groupwork:{
			image:'',
			name:'',
			productionTypeId:'',
			detail:''
		},
		typeId:'',
		workLogo:{
			key:'workLogo',
			max_file_size:'5m',
		},
		option: {
            initialFrameHeight: 600,
            initialFrameWidth: 700,
            toolbars: [
                ['help', 'undo', 'redo', 'forecolor', 'backcolor', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'autotypeset',
                    'blockquote', 'pasteplain', 'insertorderedlist', 'insertunorderedlist', 'lineheight', 'customstyle', 'paragraph', 'fontfamily', 'fontsize', 'justifyleft',
                    'justifycenter', 'justifyright', 'justifyjustify', 'imagenone', 'imageleft', 'imageright', 'imagecenter', 'insertvideo', 'music', 'attachment', 'map', 'pagebreak',
                    'template', 'horizontal', 'date', 'time', 'spechars', 'inserttable', 'deletetable', 'dialog'
                ]
            ],
            uploadPath: 'shop/richText'
        },
	}),
	created() {
	},
	components:{
		richText,
		page,
		Qiniu
	},
	events: {
		'child-rich-text-data': function (content) {
            this.$set("groupwork.detail", content)
        },
		'child-turn-page'(obj){
			this.pageNo = obj.pageNo;
			this.findworks(this.typeId);
		},
		'child-qiniu-data' (obj){
			let self = this;
			let	name;
            if(obj.key){
				name = obj.key.split("/")[2];
				if(name == 'workLogo'){
					self.$set('groupwork.image',obj.key)
				}
            }
		},
    },
	ready (){
		this.findGroup();
	},
	watch: {},
	methods: {
		opengroupwork:function(){
			this.$set('addgroupwork.show',true);
		},
		//打开模态框
		openMolde:function(type){
			this.$set('addgroup.type',type);
			this.$set('addgroup.show',true);
		},
		//添加分组
		addgruops:function(){
			let url = this.host + 'v1/system/productionType';
            let self = this;
            let params = {};
            params = this.group;
            if(this.addgroup.type == 'put'){
            	params.id = this.typeId;
            }
            Lib.M.load(url, JSON.stringify(params), function(data) {
            	if(data.code == -1){
            		self.$set('addgroup.show',false);
        			self.findGroup();
            	}else{
            		Lib.M.topRightInfoTips({title:data.message})
            	}
            },self.addgroup.type);
		},
		//查询分组
		findGroup:function(){
			let url = this.host + 'v1/system/productionType';
            let self = this;
            Lib.M.load(url, '', function(data) {
            	if(data.hasOwnProperty('code')){
            		self.$set('groupdata','');
            	}else{
            		self.$set('groupdata',data.data);
            		self.findworks(data.data[0].id)
            	}
            },'get');
		},
		//删除分组
		deleteGroup:function(){
			let url ;
			if(this.leixin == 'group'){
				url = this.host + 'v1/system/productionType/'+this.id;
			}else{
				url = this.host + 'v1/system/productionInfo/'+this.id;
			}
			
            let self = this;
            Lib.M.load(url, '', function(data) {
            	if(data.code == -1){
            		self.$set('deletes.show',false);
            		if(self.leixin == 'group'){
            			self.findGroup();
            		}else{
            			self.findworks(self.typeId);
            		}
            	}else{
            		Lib.M.topRightInfoTips({title:data.message})
            	}
            },'delete');
		},
		//查询单个分组信息
		findOnegroup:function(id){
			let url = this.host + 'v1/system/productionType?id='+id;
            let self = this;
            Lib.M.load(url, '', function(data) {
        		self.$set('Onegroupdata',data.data[0]);
        		self.$set('group.name',data.data[0].name);
        		self.$set('group.description',data.data[0].description);
            },'get');
		},
		//获取id
		geitid:function(id,leixin){
			this.$set('leixin',leixin)
			this.$set('deletes.show',true)
			this.id = id;
		},
		//查询作品
		findworks:function(typeId){
			this.typeId = typeId;
			this.findOnegroup(this.typeId);
			let url = this.host + 'v1/system/productionInfo';
            let self = this;
            let param={};
            param.typeId = this.typeId ;
            param.pageSize = 15;
            param.pageNo = this.pageNo;
            Lib.M.load(url, param , function(data) {
            	if(data.hasOwnProperty('code')){
            		self.$set('worksdata','');
            	}else{
            		self.$set('worksdata',data.data.list);
            	}
            },'get');
		},
	}
}
	
</script>
<style type="text/css" scoped>
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