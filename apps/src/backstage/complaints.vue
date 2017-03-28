<template lang="html">
	<div class="workReview">
		<h3 style="min-width:300px">投诉列表</h3>
		<table class="table table-bordered text-center">
			<tr>
			  <td style="min-width:100px">用户名称</td>
			  <td style="min-width:100px">内容</td>
			  <td style="min-width:100px">时间</td>
			  <td style="min-width:100px">操作</td>
			</tr>
			<tr v-for="reviewData in reviewData.list">
				<template v-if="!show">
					<td>
						<template v-if="reviewData.type == 'PHOTO'">
							{{reviewData.photokName}}
						</template>
						<template v-if="reviewData.type == 'WORK'">
							{{reviewData.workName}}
						</template>
						<template v-if="reviewData.type == 'EMP'">
							{{reviewData.empName}}
						</template>
					</td>
				    <td>{{reviewData.content}}</td>
				    <td>{{reviewData.createTime}}</td>
				    <td>
				    	<button type="button" class="btn btn-danger btn-sm" data-toggle="modal"  data-target=".delets" @click='getId(reviewData.id)'>删除</button>
				    </td>
				</template>
			</tr>
		</table>
		<div v-if="show">
			没有数据！
		</div>
		<page :turn-page="pageData"></page>
	</div>
	<!--模态框  通过审核 star-->
	<div class="modal fade pass" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-sm">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title">是否处理</h4>
	      </div>
	      <div class="modal-body">
	      		<p>是否已经处理！</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">还未处理</button>
	        <button type="button" class="btn btn-primary btn-sm" @click="exitstyp">已处理</button>
	      </div>
	    </div>
	  </div>
	</div>
	<!--模态框  通过审核 end-->
	<!--模态框  通过审核 star-->
	<div class="modal fade delets" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-sm">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title">删除信息（谨慎操作）</h4>
	      </div>
	      <div class="modal-body">
	      		<p>是否确认删除！</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">暂不删除</button>
	        <button type="button" class="btn btn-primary btn-sm" @click="deletes" data-dismiss="modal">确认删除</button>
	      </div>
	    </div>
	  </div>
	</div>
	<!--模态框  通过审核 end-->
</template>
<script type="text/javascript">
	import Lib from '../assets/lib'
	import page from '../components/page/pagegai.vue'
export default {
	props: {
        
    },
	data: () => ({
		host: Lib.C.hostBackstage,
		domain:Lib.C.qiniu.jsUrl,
		pageNo:1,
		pageSize:10,
		reviewData:{},//工作室信息
		show:false,
		id:'',
		pageData:{},
	}),
	created() {
		this.findReview()
	},
	components:{
		page
	},
	events: {
		'child-turn-page'(obj){
			this.pageNo = obj.pageNo;
			this.findReview();
		},
    },
	ready (){
		
	},
	watch: {},
	methods: {
		//删除投诉列表
		deletes:function(){
			let url = this.host + 'onLinePs/complaint/deleteComplaintRecordById/'+ this.id;
            let self = this;
            let params = {};
            Lib.M.load(url, JSON.stringify(params), function(data) {
            	Lib.M.topRightInfoTips({title:data.message})
            	if(data.code == -1){
            		self.findReview();
            	}
            },'delete');
		},
		//分页查询投诉列表
		findReview: function() {
            let url = this.host + 'onLinePs/complaint/findComplaintRecord';
            let self = this;
            let params = {};
            params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            };
            Lib.M.load(url,(params), function(data) {
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
        //取ID
        getId:function(id){
        	this.id = id;
        },
        //修改状态  没有修改
        exitstyp:function(){
    		let url = this.host + 'onLinePs/complaint/updateComplaintStatus/' + this.id*1 + '/YES/' + localStorage.getItem('h_id')*1;
            let self = this;
            let params = {
            	complainStatus:'YES',
            	complaintId:this.id*1,
            	systemId:localStorage.getItem('h_id')*1,
            };
            Lib.M.load(url, '', function(data) {
            	console.log(data)
//	          	if(data.code == -1){
//	          		Lib.M.topRightInfoTips({content:data.message})
//	          		self.findReview();
//	          	}else{
//	          		Lib.M.topRightInfoTips({title:data.message})
//	          	}
            },'put');
        }
	}
}
	
</script>
<style type="text/css" scoped>

</style>