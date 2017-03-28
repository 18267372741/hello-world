<template lang="html">
	<template v-if="loginPass">
		<div class="shejixiutu">
			<ul>
				<li v-if="orderInfo.type=='XT'||orderInfo.type=='ALL'">
					<img @click="findAllEndPic('','','XT',$event)" :src="digital.xiutu.logo">
					<p>修图师</p>
					<p>{{digital.xiutu.phone}}</p>
				</li>
				<li v-if="orderInfo.type=='SJ'||orderInfo.type=='ALL'">
					<img @click="findAllEndPic('','','SJ',$event)" :src="digital.sheji.logo">
					<p>设计师</p>
					<p>{{digital.sheji.phone}}</p>
				</li>
			</ul>
		</div>
		<div class="neirongBox">
			<div class="bigTitle">
		    	<h3>致设计影楼</h3>
			</div>
			<div class="title">
		    	<h4>订单名称：{{orderInfo.title}}</h4>
			</div>
			<div class="row box">
				<div v-if="xsyc.tupian" class="col-sm-8 row picBox">
					<a style="position: absolute; top: 32px; left: 47px;z-index: 1;">
						<button @click="findAllEndPic('','',typeChaKanTuPian)" type="button" class="btn btn-primary btn-sm">
				            返回
				        </button>
				    </a>
				    <strong style="position: absolute; top: 38px; left: 100px;z-index: 1;font-weight: normal;">{{myPic.name}}</strong>
					<div class="col-sm-12 pic tuBox">
						<div @click="tuyas($event,myPic.imgUrl,myPic.NO,'add',$index)" v-for="myPic in myPic.myPic" data-toggle="modal" data-target=".tuya">
							<img :src="qnyUrl+myPic.imgUrl+'?imageMogr2/thumbnail/250x250!'" class="imgtu" />
							<span v-if="myPic.FG=='FG'" class="topleft"></span>
							<span v-if="myPic.FG=='FG'" class="fangong">返工</span>
							<p class="beijing">
								<span v-if="!myPic.FG" class="NO">{{myPic.NO}}</span>
								<span class="names">{{myPic.imgUrl.split("/")[2].split("_")[0]}}</span>
							</p> 
						</div>
					</div>
				</div>
				<div v-if="xsyc.wenjianjia" class="col-sm-8 row picBox">
					<div class="col-sm-12 pic wenjianBigBox">
						<div class="wenjianBox" v-for="myPic in myPic.wenjianjia">
							<img @click="findAllEndPic($event,myPic,typeChaKanTuPian)" src="../assets/images/wenjianjia.png" class="wenjian" />
							<p class="beijing">
								<span class="name">{{myPic}}</span>
							</p>
						</div>
					</div>
				</div>
				<div class="col-sm-3 listInfo">
					<form class="col-sm-12">
						<div class="row">
							<div class="row col-sm-12">
								<div class="col-sm-4"></div>
								<div class="col-sm-3">
									<button style="border-radius: 50px;padding: 3px 16px;" data-toggle="modal" data-target=".fangongMT" type="button" class="btn btn-primary btn-sm">返工</button>
								</div>
								<div class="col-sm-3">
									<button style="border-radius: 50px;padding: 3px 16px;" data-toggle="modal" data-target=".tongguoMT" type="button" class="btn btn-primary btn-sm">通过</button>
								</div>
							</div>
						</div>
					</form>
					<p class="col-sm-12 fangongmingxi">返工明细</p>
					<table class="table table-condensedn table-hover">
						<tbody>
							<tr v-for="tuyaLists in tuyaListss">
								<td style="text-align:left; padding: 10px 0 8px 30px;" v-if="tuyaLists.NO!='返工图'">{{tuyaLists.NO}}张<br>{{tuyaLists.name}}</td>
								<td style="text-align:left; padding: 10px 0 8px 30px;" v-if="tuyaLists.NO=='返工图'">{{tuyaLists.NO}}<br>{{tuyaLists.name}}</td>
								<td style="width:100px">
									<button class="btn btn-primary btn-xs" @click="findXQ($event,$index,'edi')" data-toggle="modal" data-target=".tuya">详情</button>
									<button class="btn btn-default btn-xs" @click="del($event,$index)" data-toggle="modal" data-target=".delmodal">删除</button>
								</td>
							</tr>
							<tr v-if="!tuyaList.length">
								<td>暂无消息</td>
							</tr>
						</tbody>
					</table>
					<page :turn-page="tupian"></page>
				</div>
			</div>	
		</div>
		<!--  -->
		<div style="overflow:auto" class="modal fade tuya" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div v-if="PCPhone.bIsIpad||PCPhone.bIsIphoneOs||PCPhone.bIsMidp||PCPhone.bIsUc7||PCPhone.bIsUc||PCPhone.bIsAndroid||PCPhone.bIsCE||PCPhone.bIsWM" data-dismiss="modal" class="modal-dialog modal-lg picMutai" style="width:100%">
				<div style="height:100%;display:table;margin: 0 auto;">
					<a style="display:table-cell;vertical-align:middle;">
						<img :src="qnyUrl+tuya.URL+'?imageView2/0/w/2500'"/>
					</a>
				</div>
				<!-- <span @click="shangyizhang" class="iconfont icon-aleft"></span>
				<span @click="xiayizhang" class="iconfont icon-aright"></span> -->
			</div>
			<div v-if="!(PCPhone.bIsIpad||PCPhone.bIsIphoneOs||PCPhone.bIsMidp||PCPhone.bIsUc7||PCPhone.bIsUc||PCPhone.bIsAndroid||PCPhone.bIsCE||PCPhone.bIsWM)" class="modal-dialog modal-lg picMutai" style="width:100%">
				<div class="modal-content" style="padding: 15px;background:rgba(0,0,0,0);box-shadow: 0 5px 15px rgba(0,0,0,0); border: 0;">
					<div class="modal-body row" style="padding: 0 10px 0px 15px;background:rgba(0,0,0,0)">
						<t-scrawl :scrawl-option.sync="scrawlOption"></t-scrawl>
						<!-- <div style="margin-bottom:20px" class="col-sm-12 foot">
							<button class="btn btn-default sure" @click="fangda">放大</button>
						</div> -->
						<div class="col-sm-2"></div>
						<div class="col-sm-8">
							<textarea placeholder="备注：" v-model="tuya.main" class="form-control" rows="4" cols="12"></textarea>
						</div>
					</div>
					<template v-if='type.typerukou!="edi"'>
						<span @click="shangyizhang" class="iconfont icon-aleft"></span>
						<span @click="xiayizhang" class="iconfont icon-aright"></span>
					</template>
					<div class="modal-footer foot" style="border:0">
						<button v-if="type.typerukou" @click="lists" type="button" class="btn btn-default sure" data-dismiss="modal">
							确认返工
						</button>
						<button v-if="!type.typerukou" @click="lists" type="button" class="btn btn-default sure" data-dismiss="modal">
							确认修改
						</button>
						<button v-if="type.typerukou" type="button" class="btn btn-default sure" data-dismiss="modal">
							取消返工
						</button>
						<button v-if="!type.typerukou" type="button" class="btn btn-default sure" data-dismiss="modal">
							取消修改
						</button>
					</div>
				</div>
			</div>
		</div>
		<!--删除模态框-->
	    <div class="modal fade delmodal" tabindex="-1" role="dialog">
	        <div class="modal-dialog modal-sm">
	            <div class="modal-content">
	                <div class="modal-body">
	                    <p>
							您确定删除该明细么？
						</p>
	                </div>
	                <div class="modal-footer">
	    				<button type="button" @click="demingxi" class="btn btn-primary sure" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
	    	        </div>
	            </div>
	        </div>
	    </div>
	    <div class="modal fade fangongMT" tabindex="-1" role="dialog">
	        <div class="modal-dialog modal-sm">
	            <div class="modal-content">
	                <div class="modal-body">
	                    <p>
							您确定返工吗？
						</p>
	                </div>
	                <div class="modal-footer">
	    				<button type="button"  @click="rework" class="btn btn-primary sure" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
	    	        </div>
	            </div>
	        </div>
	    </div>
	    <div class="modal fade tongguoMT" tabindex="-1" role="dialog">
	        <div class="modal-dialog modal-sm">
	            <div class="modal-content">
	                <div class="modal-body">
	                    <p>
							您确定通过吗？
						</p>
	                </div>
	                <div class="modal-footer">
	    				<button type="button" @click="tongguo" class="btn btn-primary sure" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
	    	        </div>
	            </div>
	        </div>
	    </div>
		<pages :turn-page="tupianPage"></pages>		
	</template>
	<template v-if="!loginPass">
		<header>
			<h2>上海金尚图文设计制作集团公司</h2>
			<h4>SHANGHAI JINSHANG GRAPHIC DESIGN CO., LTD</h4>
		</header>
		<div class="login">
			<h4>自助在线看样系统</h4>
			<div class="form-group">
				<div class="col-sm-12 input-group input-group-lg">
					<input v-model="login.number" type="number" class="form-control" placeholder="请输入手机号">
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-12 input-group input-group-lg">
					<input v-model="login.password" type="password" class="form-control" placeholder="请输入密码">
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-offset-4 col-sm-4">
					<button @click="photoOrder" type="button" class="btn btn-primary btn-block">登陆</button>
				</div>
			</div>
		</div>
		<footer>
			<img src="../assets/images/logo4.png">
			<p>Copyright © 2016 金尚图文&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target="_black" href="http://www.miitbeian.gov.cn/">沪ICP备16044122号-1</a></p>
		</footer>
	</template>
</template>

<script>
	import TScrawl from '../module/scrawl/scrawl.vue'
	import page from '../components/page/pagegai.vue'
	import pages from '../components/page/page.vue'
	import Lib from '../assets/lib.js'
	export default {
		data: () => ({
			PCPhone:{},
			scrawlOption: {
				sourceImg: '',//原图地址，必传
				key: 'yinglou'//路径，
			},
			loginPass:sessionStorage.getItem('loginPass'),
			addr:Lib.M.getUrlParams(),//获取地址栏参数
			qnyUrl:Lib.C.qiniu.jsUrl,
	    	id: sessionStorage.getItem("id"),
	    	workInfoId: sessionStorage.getItem("workInfoId"),
	    	host: Lib.C.hostPhotoStudio,
	    	xsyc:{
	    		wenjianjia: true,
	    		tupian: false
	    	},
	    	tupianPage: {},//图片翻页
	    	tupian: {},
			myPic:{//成图
				"name":"",
				"n":1,
				"myPic":[],
				"myPics":[],
				"wenjianjia":[]
			},
			tuyaListss:[],
			tuyaList:[],
			type:{},
			tuya:{
				"n":1
			},
			orderInfo:{},//订单
			down:{
				fangong:{},
				yuantu:{},
				yuantuXZ:{}
			},
			login:{},//登陆
			digital:{//数码师信息
				"xiutu":{},
				"sheji":{}
			},
			typeChaKanTuPian:"",
		}),
		watch: {},
		created: function () {
			this.browserRedirect();
			this.scrawlOption.key = "yinglou/"+this.id+"/tuya";
			if(sessionStorage.getItem("loginNum")&&sessionStorage.getItem("loginPass")){
				this.findOrder();
			}
		},
		events: {
	        'child-turn-page' (obj){
	        	if(obj.type=='fangong'){
					this.$set('tuya.n', obj.pageNo);
		            this.xiangqingXYY();
				}
	        },
	        'child-turn-pageTu' (obj){
				this.$set('myPic.n', obj.pageNo);
	            this.xiayiye();
	        }
	    },
		ready: function () {
			this.zuoyoujianpan();
			$(".toubuNav").css("display","none");
			$(".sideBar").css("display","none");
			$(".content").css("margin-left",0);
		},
		methods: {
			workInfo (id,type){
				var url = this.host+'v1/work/emp/one/'+ id,
					postParam = {},
					self = this;
				postParam = {
					"id": id
				};
				Lib.M.load(url, postParam ,function(data){
					data = data.data;
					if(type == "XT"){
						self.$set("digital.xiutu",data);
					}else if(type == "SJ"){
						self.$set("digital.sheji",data);
					}
				},"get");
			},
			findOrder (){
				var url = this.host + "v1/order/see/"+sessionStorage.getItem("loginNum")+"/"+sessionStorage.getItem("loginPass");
	    		var self = this;
				Lib.M.load(url, {} ,function(data){
					if(data.code==8){
						// location.reload();
						return false
					}
					self.$set("orderInfo",data.data);
					data = data.data;
					if(data.workXtId!=0&&data.workSjId==0){
						self.workInfo(data.workXtId,"XT");
						self.typeChaKanTuPian = "XT";
					}else if(data.workXtId==0&&data.workSjId!=0){
						self.workInfo(data.workSjId,"SJ");
						self.typeChaKanTuPian = "SJ";
					}else if(data.workXtId!=0&&data.workSjId!=0){
						self.workInfo(data.workXtId,"XT");
						self.workInfo(data.workSjId,"SJ");
						self.typeChaKanTuPian = "XT";
					}
					self.findAllEndPic('','',self.typeChaKanTuPian);
					self.findRework();
				},"get");
			},
			photoOrder (){
				if(!this.login.number||!this.login.password){
					Lib.M.topRightInfoTips({ title:"请输入账户或密码！" });
					return false;
				}
				if(this.login.number.length!=11){
					Lib.M.topRightInfoTips({ title:"请输入11位手机号码！" });
					return false;
				}
	    		var url = this.host + "v1/order/see/"+this.login.number+"/"+this.login.password;
	    		var self = this;
				Lib.M.load(url, {} ,function(data){
					if(data.code==8){
						Lib.M.topRightInfoTips({ title:"您输入的手机号或密码有误或您的订单并不是待审核订单" });
						return false
					}
					sessionStorage.setItem("loginNum", self.login.number);
	                sessionStorage.setItem("loginPass", self.login.password);
	                self.$set("loginPass",self.login.password);
					self.findOrder();
				},"get");
	    	},
			zuoyoujianpan (){
				var self = this;
				$(document).keydown(function(event){
			        if(event.keyCode == 37){
			 			self.shangyizhang()
			        }else if(event.keyCode == 39){
			        	self.xiayizhang()
			        }
		        })
		    },
			findXQ (e,index,type){
				this.type.index = index;
				this.$set("type.typerukou",type);
				let lingshi = this.tuyaListss[index]; 
				lingshi = JSON.stringify(lingshi);
				this.$set( "tuya",JSON.parse(lingshi) );
				this.$set('scrawlOption.show', true);
				this.$set('scrawlOption.sourceImg', this.qnyUrl+this.tuya.url);
			},
			fangda (){
				var a = document.createElement('a');
				var url = this.scrawlOption.sourceImg.split("?")[0]
				a.href = url;
				a.target = '_blank';
				a.click();
				window.URL.revokeObjectURL(url); //释放 url 内容
			},
			tuyas(e,url,NO,type,index){//涂鸦
				this.$set("type.index",( index+(this.myPic.n-1)*8 ));
				this.$set("type.typerukou",type);
				this.$set("tuya.main","");
				this.$set("tuya.name",url.split("/")[2].split("_")[0]);
				this.$set("tuya.URL",url);
				this.$set("tuya.NO",NO ? this.myPic.name+"第"+NO : "返工图");
				this.$set('scrawlOption.show', true);
				this.$set('scrawlOption.sourceImg', this.qnyUrl+url+'?imageView2/0/h/870');
			},
			xiayizhang (){
				this.type.index++;
				this.tuya.NO = this.tuya.NO.split("第")[0]+"第"+ (parseInt(this.tuya.NO.split("第")[1])+1);
				if(this.type.index>this.myPic.myPics.length-1){
					this.type.index=this.myPic.myPics.length-1;
					Lib.M.topRightInfoTips({title:"已经到了最后一张了！"});
					return false;
				}
				this.$set('scrawlOption.sourceImg',this.qnyUrl+this.myPic.myPics[this.type.index].imgUrl+'?imageView2/0/h/870');
			},
			shangyizhang (){
				this.type.index--;
				this.tuya.NO = this.tuya.NO.split("第")[0]+"第"+ (parseInt(this.tuya.NO.split("第")[1])-1);
				if(this.type.index<0){
					this.type.index=0;
					Lib.M.topRightInfoTips({title:"已经到了第一张了！"});
					return false;
				}
				this.$set('scrawlOption.sourceImg',this.qnyUrl+this.myPic.myPics[this.type.index].imgUrl+'?imageView2/0/h/870');
			},
			lists (){//返工详情
				const scrawlCanvas = this.scrawlOption.scrawlCanvas;
				if(scrawlCanvas){
					this.putb64(scrawlCanvas.toDataURL("image/jpeg", 0.9));
				}
			},
			out (){
				this.$set("tuya.url",this.scrawlOption.scrawlSrc);
				if(this.type.typerukou=="add"){
					if(this.orderInfo.reworkNum==3){
						Lib.M.topRightInfoTips({ title:"一个订单最多返工三次！" });
						return false;
					}
					let lingshi = this.tuya;
					lingshi = JSON.stringify(lingshi);
					this.tuyaList.push(JSON.parse(lingshi));
				}else if(this.type.typerukou=="edi"){
					if(this.orderInfo.reworkNum==3){
						Lib.M.topRightInfoTips({ title:"一个订单最多返工三次！" });
						return false;
					}
					let lingshi = this.tuya;
					lingshi = JSON.stringify(lingshi);
					this.$set("tuyaList[(this.tuya.n-1)+this.type.index]",JSON.parse(lingshi))
				}
				this.$set( "tuyaListss",this.tuyaList.slice(7*(this.tuya.n-1), 7*this.tuya.n) );
				if(this.tuyaList.length==0){
					this.$set("tupian",{});
					return false;
				}
				var page = {
	                pageSize: 8,
	                totalCount: this.tuyaList.length,
	                pageNo: this.tuya.n,
	                type:'fangong'
	            };
	            this.$set("tupian",page);
			},
			//上传至七牛
			putb64 (b64){
				const self = this;
				const token = Lib.M.load(this.host+Lib.C.qiniu.URL,'','','GET').data.result;
				const pic = b64.split("base64,")[1];
				const optionKey = this.scrawlOption.key?this.scrawlOption.key:'unPath';
				let name = new Date().getTime();
				let key = Lib.M.b64EncodeUnicode(optionKey+'/'+name).replace(/\|/g, '%7c').replace(/\+/g, '-').replace(/\//g, '_');
				let url = "http://upload.qiniu.com/putb64/-1/key/"+key+"/";
				let xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function(){
					if (xhr.readyState==4){
						if(xhr.status == 200){
							const getUrl = JSON.parse(xhr.responseText).key;
							self.$set('scrawlOption.scrawlSrc', getUrl);
							self.out();
							self.$set('scrawlOption.show', false);
						}
					}
				};
				xhr.open("POST", url, true);
				xhr.setRequestHeader("Content-Type", "application/octet-stream");
				xhr.setRequestHeader("Authorization", 'UpToken '+token);
				xhr.send(pic);
			},
			findFGPic (type){//查看返工图片
				var url = this.host + "qiNiu/bucketManagerFile",
					self = this,
					postParam = {};
				var id="";
				if(this.orderInfo.type=="XT"){
					id=this.orderInfo.workXtId;
					if(!type){
						type="XT";
					}
				}else if(this.orderInfo.type=="SJ"||this.orderInfo.type=="ALL"){
					id=this.orderInfo.workSjId;
					if(!type){
						type="SJ";
					}
				}
				postParam = {
					"pageSize":1000
				};
				if(this.myPic.name){
					postParam.prefix = JSON.stringify(id) + JSON.stringify(this.orderInfo.id) + "fgImg" +type + this.orderInfo.title+"/"+ this.myPic.name;
				}else if(!this.myPic.name){
					postParam.prefix = JSON.stringify(id) + JSON.stringify(this.orderInfo.id) + "fgImg" + type + this.orderInfo.title;
				}
				Lib.M.load(url, postParam ,function(data){
					data = data.data.list;
					for(var i=0;i<data.length;i++){
						data[i].uploadTimes =new Date(data[i].uploadTime);
					}
					data.sort(function sortDate(a,b){
						return b.uploadTimes - a.uploadTimes;
					})
					for(var i=0;i<data.length;i++){
						data[i].FG ="FG";
					}
					self.down.yuantu = self.myPic.myPic;
					self.down.fangong = data;
					self.$set("myPic.myPic",data.concat(self.myPic.myPic));
					self.$set("myPic.myPics",data.concat(self.myPic.myPics));
					self.xiayiye();
				},"get");
			},
			findAllEndPic (e,name,type,event){//查询订单上传的所有图片
				this.$set("myPic.n",1);
				if(e){
					this.$set( "myPic.name",name );
					this.$set( "xsyc.wenjianjia",false );
					this.$set( "xsyc.tupian",true );
				}else if(!e){
					this.$set( "myPic.name",'' );
					this.$set( "xsyc.wenjianjia",true );
					this.$set( "xsyc.tupian",false );
				}
				if(event){
					$(".shejixiutu li").css("background","#FFFFFF");
					$(event.target).parents("li").css("background","#c5ced8");
				}
				var url = this.host + "qiNiu/bucketManagerFile",
					self = this,digitalId,dir,
					postParam = {};
				postParam = {
					"pageSize":1000
				};
				this.$set("typeChaKanTuPian",type);
				if(this.typeChaKanTuPian=="XT"){
					digitalId = this.orderInfo.workXtId;
					dir = "endXT";
				}else if(this.typeChaKanTuPian=="SJ"){
					digitalId = this.orderInfo.workSjId;
					dir = "endSJ";
				}
				if(e){
					postParam.prefix = JSON.stringify(digitalId) + JSON.stringify(this.orderInfo.id) + dir+this.orderInfo.title +"/"+ name;
				}else if(!e){
					postParam.prefix = JSON.stringify(digitalId) + JSON.stringify(this.orderInfo.id) + dir+this.orderInfo.title ;
				}
				Lib.M.load(url, postParam ,function(data){
					data = data.data.list;
					for(var i=0;i<data.length;i++){
						data[i].uploadTimes =new Date(data[i].uploadTime);
					}
					data.sort(function sortDate(a,b){
						return b.uploadTimes - a.uploadTimes;
					})
					for(var i=0;i<data.length;i++){
						data[i].NO =i+1;
					}
					self.$set("myPic.myPic",data);
					self.$set("myPic.myPics",data);
					self.findFGPic(type);
				},"get");
			},
			findRework (){//查看返工详情
				var url = this.host + "v1/photo/order/rework/"+this.orderInfo.code,
					self = this,leixing,
					postParam = {};
				if(this.orderInfo.workXtId!=0&&this.orderInfo.workSjId==0){
					leixing = "XT";
				}else if(this.orderInfo.workXtId==0&&this.orderInfo.workSjId!=0){
					leixing = "SJ";
				}else if(this.orderInfo.workXtId!=0&&this.orderInfo.workSjId!=0){
					leixing = "SJ";
				}
				postParam = {
					"type":leixing
				}
				Lib.M.load(url, postParam ,function(data){
					if(data.code==8){
						return false;
					}
					data = data.data[0];
					self.$set("tuyaList", JSON.parse(data.content));
					self.lists();
				},"get");
			},
			rework (){//返工
				var url = this.host + "v1/photo/order/rework",
					self = this,leixing,
					postParam = {};
				if(this.orderInfo.type=="XT"){
					leixing = "XT";
				}else if(this.orderInfo.type=="SJ"||this.orderInfo.type=="ALL"){
					leixing = "SJ";
				}
				postParam = {
					"orderInfoId": parseInt(this.orderInfo.code),
					"content":JSON.stringify(this.tuyaList),
					"img":leixing,
					"type":leixing
				};
				Lib.M.load(url, JSON.stringify(postParam) ,function(data){
					if(data.code==-1){
						self.passBy();
					}
				});
			},
			tongguo (){//通过
				var url = this.host + "v1/photo/order/photoOrder",
					self = this,
					postParam = {};
				postParam = {
					"id":this.orderInfo.id,
					"status":"FINISH"
				};
				Lib.M.load(url, JSON.stringify(postParam) ,function(data){
					Lib.M.topRightInfoTips({title:data.message});
					if(data.code==-1){
						sessionStorage.setItem("loginNum", "");
	            		sessionStorage.setItem("loginPass", "");
	            		location.reload();
					}
				},"put");
			},
			passBy (){//返工
				var url = this.host + "v1/photo/order/photoOrder",
					self = this,leixing,
					postParam = {};
				if(this.orderInfo.type=="XT"){
					leixing = "XT";
				}else if(this.orderInfo.type=="SJ"||this.orderInfo.type=="ALL"){
					leixing = "SJ";
				}
				postParam = {
					"id":parseInt(this.orderInfo.id),
					"status":"REWORK",
					"reworkDescribe":"FG",
					"reworkType":leixing
				};
				Lib.M.load(url, JSON.stringify(postParam) ,function(data){
					Lib.M.topRightInfoTips({title:data.message});
					if(data.code==-1){
						sessionStorage.setItem("loginNum", "");
	            		sessionStorage.setItem("loginPass", "");
	            		location.reload();
					}
				},"put");
			},
			del (e,index){//删除详情
				this.tuya.index = index;
			},
			demingxi (){//删除详情
				this.tuyaList.splice((this.tuya.n-1)+this.tuya.index, 1);
				this.tuyaListss.splice(this.tuya.index, 1);
			},
			xiangqingXYY: function(){//明细翻页
				this.$set( "tuyaListss",this.tuyaList.slice(7*(this.tuya.n-1), 7*this.tuya.n) );
			},
			xiayiye: function(e,page){//图片翻页
				this.$set( "myPic.myPic",this.myPic.myPics.slice(8*(this.myPic.n-1), 8*(this.myPic.n)) );
				if(this.myPic.name){
					let allPage = {
	                    pageSize: 8,
	                    totalCount: this.myPic.myPics.length,
	                    pageNo: this.myPic.n
	                };
					this.$set("tupianPage",allPage);
				}else{
					this.$set("tupianPage",{});
				}
				var arrWenjian = [];
				var arrNo = [];
				this.down.yuantu = this.down.fangong.concat( this.down.yuantu );
				var arr=[];
				for( var i=0;i<this.myPic.myPics.length;i++ ){
					if(this.myPic.myPics[i].imgUrl.split("/").length>=3){
						arr.push(this.myPic.myPics[i].imgUrl.split("/")[1]);
					}
				}
				this.$set( "myPic.wenjianjia",this.distinct (arr) );
			},
			distinct (arr) {
			    var obj = {},
			        i = 0,
			        len = 0;
			    if (Array.isArray(arr) && arr.length > 0) {
			        len = arr.length;
			        for (i = 0; i < len; i += 1) {
			            obj[arr[i]] = arr[i];
			        }
			        return Object.keys(obj);
			    }
			    return [];
			},
			browserRedirect (){
			      var sUserAgent = navigator.userAgent.toLowerCase();
			      this.$set("PCPhone.bIsIpad",sUserAgent.match(/ipad/i) == "ipad");
			      this.$set("PCPhone.bIsIphoneOs",sUserAgent.match(/iphone os/i) == "iphone os");
			      this.$set("PCPhone.bIsMidp",sUserAgent.match(/midp/i) == "midp");
			      this.$set("PCPhone.bIsUc7",sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4");
			      this.$set("PCPhone.bIsUc",sUserAgent.match(/ucweb/i) == "ucweb");
			      this.$set("PCPhone.bIsAndroid",sUserAgent.match(/android/i) == "android");
			      this.$set("PCPhone.bIsCE",sUserAgent.match(/windows ce/i) == "windows ce");
			      this.$set("PCPhone.bIsWM",sUserAgent.match(/windows mobile/i) == "windows mobile");
				  if (this.PCPhone.bIsIpad) {
				    console.log("phone");
				  } else {
				    console.log("pc");
				  }
    		}
		},
		components: {
			page,
			TScrawl,
			pages
		}
	}
</script>
<style scoped>
	/*@import url("../assets/css/photoStudio/sendOrder.css");*/
	.shejixiutu{
		position: absolute;z-index: 999;width: 106px;left: 44px;top: 300px; text-align: center;
	}
	.shejixiutu li{
		padding:20px 0 1px 0;; margin-bottom: 12px; border-radius: 5px;
	}
	.shejixiutu li:first-child{
		 background:#c5ced8;
	}
	.shejixiutu img{
		width: 70px;height: 70px; border-radius: 50%; margin-bottom: 6px; cursor: pointer;
	}
	.neirongBox{
		padding-left: 195px;
	}
	.bigTitle{
		padding: 70px 84px 40px 0;text-align: center;
	}
	.title{
		text-align: center; padding: 12px 0; background: #e4e9ed; border: solid #cacaca 1px; border-radius: 4px; margin: 0 85px 0 0
	}
	h3{
		margin: 0;padding: 0;
	}
	.table tr th,.table tr td{
		text-align: center; padding: 10px 0;
	}
	.box{
		padding: 36px 15px;
	}
	.table{
		margin-top: 50px;
	}
	.table td{
		vertical-align: middle 
	}
	.picMutai span{
		font-size: 50px; font-weight: bold; color: white;position: fixed; top: 360px;
	}
	.picMutai .icon-aleft{
		left: 70px
	}
	.picMutai .icon-aright{
		right: 70px
	}
	.picMutai span:hover{
		cursor: pointer; color: #ed9a0f; 
	}
	.tuBox{
		padding-top: 80px;
	}
	.wenjianBigBox{
		padding: 40px 50px;
	}
	.wenjianBox{
		box-shadow: 0px 0px 9px 1px rgba(9, 2, 4, 0.257); border-radius: 4px;
	}
	.img-thumbnail{
		box-shadow: 0px 3px 5px 0px rgba(9, 2, 4, 0.2);
	}
	.pic div{
		width: 17%; margin: 9px 1.4%; position: relative; float: left;
	}
	.pic img{
		width: 100%;
	}
	.picBox>span{
		width: 4%; font-size: 42px; font-weight: bold; margin-top: 39%; cursor: pointer;
	}
	.picBox>span:hover{
		color: #ed9a0f;
	}
	.listInfo{
		background: white; padding: 20px 0; border-radius: 8px; min-height: 656px; margin-left: 5%; 
		border: 1px solid #cacaca;
	}
	.fangongmingxi{
		text-align: center;border-top: solid 1px #eaeaea; margin-top: 24px; padding: 15px 0 2px 0;
	}
	.topleft {
	    width: 0;position: absolute;left: 0;top: 0; height: 0; border-top: 45px solid #ed9a0f; border-right: 45px solid transparent;
	}
	.fangong{
		position: absolute;left: 2px;top: 2px;color: white; font-size: 12px;
	}
	.foot{
		text-align: center;
	}
	.sure{
		border-radius: 50px;
	}
	.tupian{
		min-height: 100px;width: 100%; margin-bottom: 30px; background: rgba(0,0,0,0);
	}
	/*模态框*/
	.modal-sm{
		width: 450px;
	}
	.modal-sm .modal-content{
		padding: 71px 33px 30px 33px;
	}
	.modal-sm .tuya{
		padding: 20px;
	}
	.modal-sm .modal-footer{
		border: 0;text-align: center;
	}
	.modal-sm .modal-body p{
		font-size: 18px;text-align: center;
	}
	.sure,.cancel{
		border-radius: 50px; width: 90px;height: 36px;
	}
	.names{
		float: left;
	}
	.pic{
		height: 656px; text-align: center; border: 1px solid #cacaca; border-radius: 8px;
	}
	.pic div{
		width: 22%; margin: 17px 1.5%; position: relative; float: left;
	}
	.pic img{
		width: 100%;
	}
	.picBox>span{
		width: 4%; font-size: 42px; font-weight: bold; margin-top: 39%; cursor: pointer; float: left;
	}
	.pic .wenjian{
		padding: 50px 0 75px; width: auto;
	}
	.NO{
		width: 24px;height: 24px; line-height: 23px; border: solid 1px white;border-radius: 50%; margin: 7px 5px 0 10px; font-size: 12px;
		float: left;
	}
	.beijing{
		position: absolute !important; bottom: 0px;left: 0px; background: rgba(0,0,0,0.5); font-size: 16px;
		width: 100% !important;color: white;height: 40px;line-height: 40px;
		text-align: center;margin: 0; text-overflow: ellipsis;white-space:nowrap;overflow: hidden;
	}
	.imgtu{
		box-shadow: 0 0 9px 0px rgba(9, 2, 4, 0.257);
	}

	/*登陆*/
	.form-group{
		overflow: hidden; margin: 15px 23px;
	}
	header{
		text-align: center; background: #3788cd;padding: 80px 0;color: white
	}
	.login{
		width: 520px; padding: 0px 0 20px 0; z-index: 1; margin:140px auto 150px;border-radius: 5px;
  		background-color: rgb(255, 255, 255); box-shadow: 0px 9px 27px 0px rgba(6, 58, 88, 0.102);overflow: hidden;
	}
	.login input{
		border-right: #ffffff 0px solid; border-top: #ffffff 0px solid; font-size: 9pt; border-left: #ffffff 0px solid; 
		border-bottom: #c0c0c0 1px solid; background-color: #ffffff;
	}
	.login h4{
		margin: 0 0 50px 0;padding:20px 0; background: #3788cd; color: white;text-align: center;
	}
	footer{
		text-align: center;
	}
	footer img{
		width: 60px;
	}
</style>