<template lang="html">
	<div class="help">
		<h3>
			{{address.works?'修改':'添加'}}分组下产品
		</h3>
		<form class="form-horizontal" role="form">
		  <div class="form-group">
		    <label  class="col-sm-2 control-label">产品名称</label>
		    <div class="col-sm-9">
		      <input type="text" class="form-control" placeholder="产品名称" maxlength="13" v-model="groupwork.name">
		    </div>
		  </div>
		  <div class="form-group">
		    <label  class="col-sm-2 control-label">封面图(最大5M)</label>
		    <div class="col-sm-9">
		    	<div class="uploadImg">
		    		<qiniu :options.sync="workLogo"></qiniu>
		    	</div>
		    	<span class="showImgUp">
		    		<img :src="domain + groupwork.image"/>
		    	</span>
		    </div>
		  </div>
		  <div class="form-group">
		    <label  class="col-sm-2 control-label">产品详情</label>
		    <div class="col-sm-9">
		      	<rich-text :option.sync="option"></rich-text>
		    </div>
		  </div>
		</form>
	</div>
	<div style="text-align: center;">
		<button type="button" class="btn btn-primary" @click="addgroup">{{address.works?'修改':'添加'}}</button>
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
		address:Lib.M.getUrlParams(),
		host: Lib.C.hostBackstage,
		domain:Lib.C.qiniu.jsUrl,
		type:'post',
		groupwork:{
			image:'',
			name:'',
			productionTypeId:'',
			detail:''
		},
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
		if(this.address.works){
			this.findworks();
		}
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
		
	},
	watch: {},
	methods: {
		//查询作品
		findworks:function(){
			let url = this.host + 'v1/system/productionInfo';
            let self = this;
            let param={};
            param.id = this.address.works;
            param.typeId = this.address.id ;
            param.pageSize = 15;
            param.pageNo =1;
            Lib.M.load(url, param , function(data) {
        		self.$set('groupwork',data.data.list[0]);
        		self.$broadcast('parent-rich-text-data', data.data.list[0].detail);
            },'get');
		},
		//添加作品
		addgroup:function(){
			let url = this.host + 'v1/system/productionInfo';
			if(this.address.works){
				this.type = 'put'
			}else{
				this.type = 'post'
			}
            let self = this;
            let param={};
            param = this.groupwork;
            if(this.address.works){
        	param.id =this.address.works*1 ;
            }
            param.productionTypeId =this.address.id*1 ;
            Lib.M.load(url, JSON.stringify(param), function(data) {
            	if(data.code == -1){
            		window.location.href = '#/index/works'
            	}else{
            		Lib.M.topRightInfoTips({title: data.message})
            	}
            },self.type);
		},
	}
}
	
</script>
<style type="text/css" scoped>

</style>