<template lang="html">
	<div class="row box">
		<form class="col-sm-12">
			<div class="row">
				<div class="row col-sm-3">
					<div class="col-sm-3"> </div>
					<div class="col-sm-4">
						<button type="button" @click="bale" class="btn btn-warning">打包下载</button>
					</div>
					<div class="col-sm-5">
						<a href="#/index/orderMan">
							<button type="button" class="btn btn-default">返回</button>
						</a>
					</div>
				</div>
			</div>
		</form>
		<div class="col-sm-12">
			<table class="table table-condensedn table-hover">
				<thead>
					<tr>
						<th>图片</th>
						<th>图片名称</th>
						<th>时间</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="myPic in myPic.myPic">
						<td>
							<img :src="qnyUrl+myPic.imgUrl+'?imageMogr2/thumbnail/100x100!'" class="img-thumbnail" />
						</td>
						<td>{{myPic.imgUrl.split("/")[4].split("_")[0]}}</td>
						<td>{{myPic.uploadTime}}</td>
						<td class="operate">
							<button class="btn btn-warning">
								<a :href="qnyUrl+myPic.imgUrl" download="{{qnyUrl+myPic.imgUrl}}" style="color: white;">下载</a>
							</button>
							
							<button class="btn btn-default" data-toggle="modal" data-target="#myModal">
								<a target="_blank" :href="qnyUrl+myPic.imgUrl" style="color: black;">预览</a>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<p v-if="!myPic.myPic.length" style="font-size: 24px;margin-bottom: 211px;">
				无修后图片
			</p>
			<page :turn-page="tupian"></page>
		</div>
	</div>		
</template>

<script>
import page from '../components/page/page.vue'
import Lib from '../assets/lib.js'
export default {
	data: () => ({
		addr:Lib.M.getUrlParams(),//获取地址栏参数
		qnyUrl:Lib.C.qiniu.jsUrl,
    	id: sessionStorage.getItem("id"),
    	workInfoId: sessionStorage.getItem("workInfoId"),
    	host: Lib.C.hostPhotoStudio,
    	tupian: {},
		myPic:{//成图
			"n":1,
			"myPic":[],
			"myPics":[]
		},
	}),
	watch: {},
	created: function () {
		this.findAllEndPic();
	},
	events: {
        'child-turn-page' (obj){
            this.$set('myPic.n', obj.pageNo);
            this.xiayiye();
        }
    },
	ready: function () {  },
	methods: {
		bale: function(){//打包下载
			var url = this.host + "qiNiu/fileZip",
				self = this,
				imgUrls="",
				postParam = {};
			for(var i=0;i<this.myPic.myPics.length;i++){
				imgUrls = imgUrls + (this.qnyUrl+this.myPic.myPics[i].imgUrl)+",";
			}
			postParam = {
				"imgUrl":imgUrls,
				"keys":this.myPic.myPics[0].imgUrl,
				"zipName":new Date().getTime()+'jsimg.zip',
			};
			Lib.M.load(url, JSON.stringify(postParam) ,function(data){
				if(data.data.result){
					self.findbaleSess(data.data.result);
				}
			});
		},
		//查询是否打包成功
		findbaleSess: function(id) {
			var url = this.host + "qiNiu/isSuccess",
				self = this,
				postParam = {};
			postParam = {
				"id": id,
			};
			Lib.M.load(url, postParam, function(data) {
				console.log(data);
				if(data.code == 0) {
					self.generateUrl(data.items[0].key)
				} else if(data.code == 2){
					setTimeout(function(){
						self.findbaleSess(id)
					},500)
				}else if(data.code == 1){
					setTimeout(function(){
						self.findbaleSess(id)
					},500)
				}
			},"get");
		},
		generateUrl: function(key){
			var url = this.host + "qiNiu/downLoadUrl",
				self = this,
				postParam = {};
			postParam = {
				"key": key,
			};
			Lib.M.load(url, JSON.stringify(postParam), function(data) {
				var a = document.createElement('a');
				var url = data.data.result;
				var filename = '';
				a.href = url;
				a.download = filename;
				a.click();
				window.URL.revokeObjectURL(url); //释放 url 内容
			});
		},
		findAllEndPic: function(){//查询订单上传的所有图片
			var url = this.host + "qiNiu/bucketManagerFile",
				self = this,digitalId,dir,
				postParam = {};
			if(this.addr.type=="XT"){
				digitalId = this.addr.workxtid;
			}else if(this.addr.type=="SJ"){
				digitalId = this.addr.worksjid;
			}else if(this.addr.type=="ALL"){
				if(this.addr.per=="SJ"){
					digitalId = this.addr.worksjid;
				}else if(this.addr.per=="XT"){
					digitalId = this.addr.workxtid;
				}
			}
			if(this.addr.per=="XT"){
				dir = "/endXT/";
			}else if(this.addr.per=="SJ"){
				dir = "/endSJ/";
			}
			postParam = {
				"pageSize":1000,
				"prefix":"digital/"+digitalId+ dir +this.addr.orderid
			};
			Lib.M.load(url, postParam ,function(data){
				data = data.data.list;
				for(var i=0;i<data.length;i++){
					data[i].uploadTimes =new Date(data[i].uploadTime);
				}
				data.sort(function sortDate(a,b){
					return b.uploadTimes - a.uploadTimes;
				})
				self.$set("myPic.myPic",data);
				self.$set("myPic.myPics",data);
				self.$set( "myPic.myPic",self.myPic.myPics.slice(20*(self.myPic.n-1), 20*self.myPic.n) );
				if(self.myPic.myPics.length==0){
					self.$set("tupian",{});
					return false;
				}
				var page = {
	                pageSize: 20,
	                totalCount: self.myPic.myPics.length,
	                pageNo: self.myPic.n
	            };
	            self.$set("tupian",page);	
			},"get");
		},
		xiayiye: function(){//图片翻页
			this.$set( "myPic.myPic",this.myPic.myPics.slice(20*(this.myPic.n-1), 20*(this.myPic.n+1)) );
		},
	},
	components: {
		page
	}
}
</script>
<style scoped>
/*@import url("../assets/css/photoStudio/sendOrder.css");*/
.table thead{
	border-top: solid 1px #b6b6b6;
}
.table tr th,.table tr td{
	text-align: center; padding: 30px 0;
}
.table tr th{
	font-size: 18px;
}
.box{
	padding: 36px 80px;
}
.table{
	margin-top: 50px;
}
/*分页*/
.goods_list_button {
   margin-left: 45%; margin-top: 30px; margin-bottom: 50px;
}
.table td{
	vertical-align: middle 
}
</style>