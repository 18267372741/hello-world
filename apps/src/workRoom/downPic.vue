<template lang="html">
	<form style="position: relative; overflow: hidden;" class="form-horizontal">
		<div style="overflow: hidden;margin-top: 1%;">
			<div style="float: left; margin-left: 3em;display: inline-block;">
				<a href="#/index/recOrder">
					<input type="button" value="返回" class="btn btn-info"/>
				</a>
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
						<img :src="qnyUrl+myPic.imgUrl+'?imageMogr2/thumbnail/60x60!'" />
					</td>
					<td>{{myPic.imgUrl.split("/")[4].split("_")[0]}}</td>
					<td>{{myPic.uploadTime}}</td>
					<td class="operate">
						<a :href="qnyUrl+myPic.imgUrl" download="{{qnyUrl+myPic.imgUrl}}"><span>下载</span></a>
						<span @click="" data-toggle="modal" data-target="#myModal">
							<a target="_blank" :href="qnyUrl+myPic.imgUrl">预览</a>
						</span>
					</td>
				</tr>
			</tbody>
		</table>
		<p v-if="!myPic.myPic.length" style="font-size: 24px;margin-bottom: 211px;">
			暂无信息
		</p>
		<!--分页-->
		<div class="goods_list_button">
			<div class="btn-group" role="group" aria-label="...">
				<button type="button" data-info="back" @click="xiayiye($event, 'prev')" class="btn btn-default">上一页</button>
				<button type="button" class="btn btn-default">第{{myPic.n+1}}页</button>
				<button type="button" data-info="next" @click="xiayiye($event, 'next')" class="btn btn-default">下一页</button>
			</div>
		</div>
	</div>
		
</template>

<script>
import Lib from '../assets/lib.js'
export default {
	data: () => ({
		addr:Lib.M.getUrlParams(),//获取地址栏参数
		qnyUrl:Lib.C.qiniu.jsUrl,
    	id: sessionStorage.getItem("id"),
    	workInfoId: sessionStorage.getItem("workInfoId"),
    	host: Lib.C.hostPhotoStudio,
		myPic:{//成图
			"n":0,
			"myPic":[],
			"myPics":[]
		},
	}),
	watch: {},
	created: function () {
		this.findAllEndPic();
	},
	ready: function () {  },
	methods: {
		findAllEndPic: function(){//查询订单上传的所有图片
			var url = this.host + "qiNiu/bucketManagerFile",
				self = this,digitalId,dir,
				postParam = {};
			if(this.addr.per=="XT"){
				digitalId = this.addr.workxtid;
			}else if(this.addr.per=="SJ"){
				digitalId = this.addr.worksjid;
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
				self.xiayiye();
			},"get");
		},
		xiayiye: function(e,page){//图片翻页
			this.$set( "myPic.myPic",this.myPic.myPics.slice(20*this.myPic.n, 20*(this.myPic.n+1)) );
			if(e){
				if(page=="next"){
					var totpage=Math.floor(this.myPic.myPics.length/20);
					this.myPic.n++;
					if(this.myPic.n>totpage){
						this.myPic.n=totpage;
						return false;
					}	
				}else if(page=="prev"){
					this.myPic.n--;
					if(this.myPic.n<0){
						this.myPic.n=0;
						return false;
					}
				}
				this.$set( "myPic.myPic",this.myPic.myPics.slice(20*this.myPic.n, 20*(this.myPic.n+1)) );
			}
		},
	},
	components: {
		
	}
}
</script>
<style lang="less" scoped>
	.table tr th,.table tr td{
		text-align: center;
	}
	/*分页*/
	.goods_list_button {
	   margin-left: 45%; margin-top: 30px; margin-bottom: 50px;
	}
	.table td{
		vertical-align: middle 
	}
</style>