<template lang="html">
	<div class="worksList clearfix row">
		<form class="form-horizontal">
			<div class="addBox">
				<a href="#/index/addWork">
					<span class="addWork">+ </span>
				</a>
				<span>添加员工</span>
			</div>
		</form>
		
		<div class="col-sm-12" style="min-height: 662px; background:white">
			<table class="table table-condensedn table-hover">
				<thead>
					<tr>
						<th>头像</th>
						<th>账号</th>
						<th>等级/名称</th>
						<th>昵称/电话</th>
						<th>创建时间</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="workEmp in workEmp">
						<td>
							<img :src="workEmp.logo" alt="logo" style="width: 80px;height: 80px" />
						</td>
						<td>{{workEmp.account}}</td>
						<td>{{workEmp.level}}/{{workEmp.name}}</td>
						<td>{{workEmp.nickName}}/{{workEmp.phone}}</td>
						<td>{{workEmp.createTime}}</td>
						<td class="annius">
							<span>
								<a @click="tianjiaXZ($event)" href="#/index/addWork?id={{workEmp.id}}"> 编辑 </a>
							</span>
							<span @click="getId($event,workEmp.id)">
								<a @click="tianjiaXZ($event)" href="javascript:;">删除</a>
							</span> 
						</td>
					</tr>
				</tbody>
			</table>
			<p v-if="!workEmp.length" style="font-size: 24px;margin-bottom: 100px;text-align: center;">
				暂无信息
			</p>
		</div>
		<page :turn-page="emps"></page>

		<div class="modal fade delete" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
			<div class="modal-dialog modal-sm">
				<div class="modal-content">
					
					<div class="modal-body">
                        <p>
							您确定删除该员工么？
						</p>
                    </div>
					
					<div class="modal-footer">
						<button @click="deWorkEmp" type="button" class="btn btn-primary sure" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
					</div>
					
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	import Lib from '../assets/lib.js'
	import page from '../components/page/page.vue'
	const moment =require('moment')
	require('daterangepicker.js')
	require('daterangepicker.css')
	export default {
		data: () => ({
			qnyUrl:Lib.C.qiniu.jsUrl,
			host: Lib.C.hostWorkRoom,
			id: sessionStorage.getItem("id"),
			pageNo:1,
			emps:{},//员工翻页
			workEmpId:"",
			workEmp:{}
		}),
		watch: {},
		created: function () {
			this.work();
		},
		ready: function () {  },
		events: {
			'child-turn-page' (obj){
				this.$set('pageNo', obj.pageNo);
				this.work();
			}
	    },
		methods: {
			tianjiaXZ (e){
				$(".annius a").removeClass("xuanzhong");
				$(e.target).addClass("xuanzhong");	
			},
			getId: function(e,id){
				this.$set("workEmpId",id);
				$('.delete').modal('show');
			},
			deWorkEmp: function(){//删除员工
				var url = this.host+'v1/work/emp/'+this.workEmpId,
					postParam = {},
					self = this;
				Lib.M.load(url, {} ,function(data){
					Lib.M.topRightInfoTips({title:data.message});
					if(data.code==-1){
						self.work();
					}
				},"delete");
			},
			work (){
				var url = this.host+'v1/work/emp/'+this.id,
					postParam = {},
					self = this;
				postParam = {
					"pageNo":this.pageNo,
					"pageSize":5
				};
				Lib.M.load(url, postParam ,function(data){
					if(data.code==8){
						self.$set("emp",{});
						self.$set("workEmp",[]);
						return false;
					};					
					data = data.data;
					const page = {
	                    pageSize: data.pageSize,
	                    totalCount: data.totalCount,
	                    pageNo: data.pageNo
	                };
	                self.$set("emps",page);
					data = data.list;
					self.$set("workEmp",data);
				},"get");
			},
		},
		components: {
	        page
	    }
	}
</script>
<style scoped>
/*@import url("../assets/css/photoStudio/sideBar.css");*/
	.annius a{
		color: #909090; padding: 4px 14px;
	}
	.annius a.xuanzhong{
		border-radius: 50px; background: #275482; color: white; font-size: 16px
	}
	.worksList .table tr th,.worksList .table tr td{
		text-align: center; vertical-align: middle;font-size: 16px;
	}
	.worksList .table tr td{
		color: #909090; background: white; padding: 20px 0; 
	}
	.worksList .table tr th{
		font-weight: normal; padding: 15px 0;  border-bottom: solid 1px #e7ebf3; background: #f7f8fc;
	}
	.addWork{
		width: 32px;height: 32px;text-align: center;line-height: 32px;font-weight: bold; display: inline-block;
		background: #275482;color: white;border-radius: 50%; font-size: 18px;
	}
	.worksList .table tr th:first-child,.worksList .table tr td:first-child{
		text-align: left !important;padding-left: 80px
	}
	.addWork:hover{
		text-decoration: none;
	}
	.addBox{
		padding: 29px 95px; background: #ecedf3; border-bottom: solid #ddd 1px;
	} 
	/*模态框*/
	.modal-sm{
		width: 450px;
	}
	.modal-content{
		padding: 40px 33px 30px 33px;
	}
	.modal-footer{
		border: 0;text-align: center;
	}
	.modal-body p{
		font-size: 18px;text-align: center;
	}
	.sure,.cancel{
		border-radius: 50px; width: 90px;height: 36px;
	}
</style>