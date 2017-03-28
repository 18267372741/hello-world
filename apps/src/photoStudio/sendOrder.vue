<template lang="html">
	<div class="sendOrder col-lg-12">
		<form class="form-horizontal" role="form">
			<div class="form-group dingdanBT">
				<div style="overflow:hidden;text-align:center;">
					<label class="xbiaoti">订单标题</label>
					<div class="btshuru">
						<input v-model="order.title" type="text" class="form-control">
					</div>	
				</div>
				<div class="checkbox jiaji">
					<label class="quedingJJ">加急<input style="margin-left:6px;" v-model="order.isUrgent" type="checkbox"> 
					</label>
					<div class="radio-inline cheRadio jiajishuru">
						<fieldset disabled class="jiajixuan">
							<label>
								<input value="6" v-model="order.urgentTime" name="shijain" type="radio">6小时
					        </label>
					        <label>
					        	<input value="12" v-model="order.urgentTime" name="shijain" type="radio">12小时
					        </label>
					        <label>
					        	<input value="24" v-model="order.urgentTime" name="shijain" type="radio">24小时
					        </label>
					        <label>
					        	<input :checked="order.isUrgent" value="48" v-model="order.urgentTime" name="shijain" type="radio">48小时
					        </label>
				        </fieldset>
			        </div>
			        <div v-if="order.isUrgent" style="color:red; display:inline-block">
			        	<span v-if="order.urgentTime=='6'">总价格的3倍</span>
			        	<span v-if="order.urgentTime=='12'">总价格的2.5倍</span>
			        	<span v-if="order.urgentTime=='24'">总价格的2倍</span>
			        	<span v-if="order.urgentTime=='48'">总价格的1.5倍</span>
			        </div>
				    <div style="display:inline-block;margin-left:90px;">
						<div>
					        <label style="padding-top:0" class="radio-inline">
								<input v-model="order.isSee" type="checkbox">
								<span class="unCheck" :class="{'check': order.isSees}">在线看样</span>
							</label>
							<div style="margin-left:22px;display:inline-block;font-size:15px">
								<template v-if="order.isSees">
									<span class="mingzi">{{order.seeName}}</span>
									<span class="shoujihao">{{order.seePhone}}</span>
								</template>
							</div>
				        </div>
						<div v-if="order.isSee" style="position: absolute; width: 238px; background: white; padding: 40px 14px 20px 14px; z-index: 1;border-radius:5px;border:solid 1px #c2c2c2;top:44px" class="">
							<div class="form-group">
								<div class="col-sm-12">
									<input v-model="order.seeName" type="text" class="form-control mingdian" placeholder="姓名">
								</div>
							</div>
							<div class="form-group">
								<div class="col-sm-12">
									<input v-model="order.seePhone" type="number" class="form-control mingdian" placeholder="电话">
								</div>
							</div>
							<div style="margin-top:60px" class="form-group">
								<div class="col-sm-offset-1 col-sm-5">
									<button style="border-radius:50px; padding: 2px 0px;background:#275482" @click="querenKY" type="button" class="btn btn-primary btn-block btn-sm">确认看样</button>
								</div>
								<div class="col-sm-5">
									<button style="border-radius:50px; padding: 2px 0px;background:#275482" @click="quxiaoKY" type="button" class="btn btn-primary btn-block btn-sm">取消看样</button>
								</div>
							</div>
						</div>
					</div>    
				</div>
				
			</div>
			
			<div class="form-group col-sm-12 detail">
				<label for="inputEmail3" class="col-sm-1 control-label"></label>
				<div class="col-sm-5 xiutuBox">
					<div class="checkbox">
						<label class="checkbox-inline">
				        	<input v-model="order.xiutu" type="checkbox" style="margin-top: 9px;">
				        	<span style="font-size: 20px;">修片</span>
				        </label>
					</div>
					<fieldset class="xiutu">
						<div class="form-group">
							<label for="inputEmail3" class="col-sm-3 control-label">数量</label>
							<div class="col-sm-6">
								<input v-model="order.photoNum" type="number" class="form-control">
							</div>
						</div>
						<div class="form-group">
							<label for="inputEmail3" class="col-sm-3 control-label">单价</label>
							<div class="col-sm-6">
								<input v-model="order.photoPrice" type="number" class="form-control">
							</div>
						</div>
						<div v-if="order.isUrgent" class="form-group">
							<label for="inputEmail3" class="col-sm-3 control-label">加急单价</label>
							<div class="col-sm-6">
								<input :value="Math.floor(order.photoPrice*100*3)/100" v-if="order.urgentTime=='6'" disabled type="number" class="form-control">
								<input :value="Math.floor(order.photoPrice*100*2.5)/100" v-if="order.urgentTime=='12'" disabled type="number" class="form-control">
								<input :value="Math.floor(order.photoPrice*100*2)/100" v-if="order.urgentTime=='24'" disabled type="number" class="form-control">
								<input :value="Math.floor(order.photoPrice*100*1.5)/100" v-if="order.urgentTime=='48'" disabled type="number" class="form-control">
							</div>
						</div>
						<div class="form-group line"> </div>
						<div class="form-group">
							<label for="inputEmail3" class="col-sm-3 control-label">痣</label>
							<div>
						        <label class="radio-inline">
									<input v-model="details.xiutu.zhi" checked type="radio" name="zhi" value="1">
									<span class="unCheck" :class="{'check': details.xiutu.zhi=='1'}">修掉</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.xiutu.zhi" type="radio" name="zhi" value="2"> 
									<span class="unCheck" :class="{'check': details.xiutu.zhi=='2'}">不修</span>
								</label>
					        </div>	
						</div>
						<div class="form-group">
							<label for="inputEmail3" class="col-sm-3 control-label">疤痕</label>
							<div>
						        <label class="radio-inline">
									<input v-model="details.xiutu.baheng" checked type="radio" name="baheng" value="1"> 
									<span class="unCheck" :class="{'check': details.xiutu.baheng=='1'}">修掉</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.xiutu.baheng" type="radio" name="baheng" value="2"> 
									<span class="unCheck" :class="{'check': details.xiutu.baheng=='2'}">不修</span>
								</label>
					        </div>	
						</div>
						<div class="form-group">
							<label for="inputEmail3" class="col-sm-3 control-label">塑型（液化）</label>
							<div>
						        <label class="radio-inline">
									<input v-model="details.xiutu.suxing" checked type="radio" name="suxing" value="1"> 
									<span class="unCheck" :class="{'check': details.xiutu.suxing=='1'}">不修</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.xiutu.suxing" type="radio" name="suxing" value="2"> 
									<span class="unCheck" :class="{'check': details.xiutu.suxing=='2'}">微修</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.xiutu.suxing" type="radio" name="suxing" value="3"> 
									<span class="unCheck" :class="{'check': details.xiutu.suxing=='3'}">很瘦</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.xiutu.suxing" type="radio" name="suxing" value="4"> 
									<span class="unCheck" :class="{'check': details.xiutu.suxing=='4'}">非常瘦</span>
								</label>
					        </div>	
						</div>
						<div class="form-group">
							<label for="inputEmail3" class="col-sm-3 control-label">面部杂质</label>
							<div>
						        <label class="radio-inline">
									<input v-model="details.xiutu.mianbu" checked type="radio" name="mianbu" value="1"> 
									<span class="unCheck" :class="{'check': details.xiutu.mianbu=='1'}">修掉</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.xiutu.mianbu" type="radio" name="mianbu" value="2"> 
									<span class="unCheck" :class="{'check': details.xiutu.mianbu=='2'}">淡化</span>
								</label>
					        </div>	
						</div>
						<div class="form-group">
							<label for="inputEmail3" class="col-sm-3 control-label">眼袋皱纹</label>
							<div>
						        <label class="radio-inline">
									<input v-model="details.xiutu.yandai" checked type="radio" name="yandai" value="1"> 
									<span class="unCheck" :class="{'check': details.xiutu.yandai=='1'}">修掉</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.xiutu.yandai" type="radio" name="yandai" value="2"> 
									<span class="unCheck" :class="{'check': details.xiutu.yandai=='2'}">淡化</span>
								</label>
					        </div>	
						</div>
						<div class="form-group">
							<label for="inputEmail3" class="col-sm-3 control-label">腋下颈纹</label>
							<div>
						        <label class="radio-inline">
									<input v-model="details.xiutu.yexia" checked type="radio" name="yexia" value="1"> 
									<span class="unCheck" :class="{'check': details.xiutu.yexia=='1'}">修掉</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.xiutu.yexia" type="radio" name="yexia" value="2"> 
									<span class="unCheck" :class="{'check': details.xiutu.yexia=='2'}">淡化</span>
								</label>
					        </div>	
						</div>
						<div class="form-group">
							<label for="inputEmail3" class="col-sm-3 control-label">风格</label>
							<div>
						        <label class="radio-inline">
									<input v-model="details.xiutu.fengge" checked type="radio" name="fengge" value="1"> 
									<span class="unCheck" :class="{'check': details.xiutu.fengge=='1'}">欧式</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.xiutu.fengge" type="radio" name="fengge" value="2"> 
									<span class="unCheck" :class="{'check': details.xiutu.fengge=='2'}">中国风</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.xiutu.fengge" type="radio" name="fengge" value="3"> 
									<span class="unCheck" :class="{'check': details.xiutu.fengge=='3'}">旅拍</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.xiutu.fengge" type="radio" name="fengge" value="4"> 
									<span class="unCheck" :class="{'check': details.xiutu.fengge=='4'}">纪实</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.xiutu.fengge" type="radio" name="fengge" value="5"> 
									<span class="unCheck" :class="{'check': details.xiutu.fengge=='5'}">文艺</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.xiutu.fengge" type="radio" name="fengge" value="6"> 
									<span class="unCheck" :class="{'check': details.xiutu.fengge=='6'}">大牌</span>
								</label>
					        </div>	
						</div>
					</fieldset>
				</div>
				<div class="col-sm-5 shejiBox">
					<label style="font-size: 20px;" for="inputEmail3" class="col-sm-2 control-label"></label>
					<div style="font-size: 20px;margin-bottom: 15px;" class="checkbox">
				        <label class="checkbox-inline">
				        	<input v-model="order.sheji" type="checkbox" style="margin-top: 9px;">
				        	<span style="font-size: 20px;">设计</span>
				        </label>
					</div>
					
					<fieldset disabled class="sheji">
						<div class="form-group">
							<label for="inputEmail3" class="col-sm-3 control-label">数量</label>
							<div class="col-sm-6">
								<input v-model="order.designNum" type="number" class="form-control">
							</div>
						</div>
						<div class="form-group">
							<label for="inputEmail3" class="col-sm-3 control-label">单价</label>
							<div class="col-sm-6">
								<input v-model="order.designPrice" type="number" class="form-control">
							</div>
						</div>
						<div v-if="order.isUrgent" class="form-group">
							<label for="inputEmail3" class="col-sm-3 control-label">加急单价</label>
							<div class="col-sm-6">
								<input :value="Math.floor(order.designPrice*100*3)/100" disabled v-if="order.urgentTime=='6'" type="number" class="form-control">
								<input :value="Math.floor(order.designPrice*100*2.5)/100" disabled v-if="order.urgentTime=='12'" type="number" class="form-control">
								<input :value="Math.floor(order.designPrice*100*2)/100" disabled v-if="order.urgentTime=='24'" type="number" class="form-control">
								<input :value="Math.floor(order.designPrice*100*1.5)/100" disabled v-if="order.urgentTime=='48'" type="number" class="form-control">
							</div>
						</div>
						<div class="form-group line" style="margin-bottom:16px"> </div>
						<div class="form-group">
							<label class="col-sm-3 control-label" style="width: 140px;">禁用文字</label>
							<div>
						        <label class="radio-inline">
									<input v-model="details.sheji.wenzi" checked type="radio" name="wenzi" value="1"> 
									<span class="unCheck" :class="{'check': details.sheji.wenzi=='1'}">中文</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.sheji.wenzi" type="radio" name="wenzi" value="2"> 
									<span class="unCheck" :class="{'check': details.sheji.wenzi=='2'}">日文</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.sheji.wenzi" type="radio" name="wenzi" value="3"> 
									<span class="unCheck" :class="{'check': details.sheji.wenzi=='3'}">韩文</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.sheji.wenzi" type="radio" name="wenzi" value="4"> 
									<span class="unCheck" :class="{'check': details.sheji.wenzi=='4'}">英文</span>
								</label>
								<label class="radio-inline">
									<input v-model="details.sheji.wenzi" type="radio" name="wenzi" value="5"> 
									<span class="unCheck" :class="{'check': details.sheji.wenzi=='5'}">不限文字</span>
								</label>
					        </div>	
						</div>
						<div class="form-group lines"> </div>
						<div class="form-group sheji" style="margin-left: 37px;">
							<div class="radio">
						        <label class="radio-inline">
									<input v-model="details.sheji.sheji" checked type="radio" name="sheji" value="1"> 
									<span class="unCheck" :class="{'check': details.sheji.sheji=='1'}">简约唯美</span>
								</label>
								<label class="col-sm-8 control-label">适用于普通相册，接地气，符合大众审美</label>
					        </div>
					       
							<div class="radio">
						        <label class="radio-inline">
									<input v-model="details.sheji.sheji" type="radio" name="sheji" value="2"> 
									<span class="unCheck" :class="{'check': details.sheji.sheji=='2'}">时尚大气</span>
								</label>
								<label class="col-sm-8 control-label">适用于凸显衣着、装饰和气质</label>
							</div>
							<div class="radio">
						        <label class="radio-inline">
									<input v-model="details.sheji.sheji" type="radio" name="sheji" value="3"> 
									<span class="unCheck" :class="{'check': details.sheji.sheji=='3'}">可爱花销</span>
								</label>
								<label class="col-sm-8 control-label">适用于青年萌系列</label>
							</div>
							<div class="radio">
						        <label class="radio-inline">
									<input v-model="details.sheji.sheji" type="radio" name="sheji" value="4"> 
									<span class="unCheck" :class="{'check': details.sheji.sheji=='4'}">主题系列</span>
								</label>
								<label class="col-sm-8 control-label">适用于套图系列，高逼格</label>
							</div>
							<div class="radio">
						        <label class="radio-inline">
									<input v-model="details.sheji.sheji" type="radio" name="sheji" value="5"> 
									<span class="unCheck" :class="{'check': details.sheji.sheji=='5'}">复古端庄</span>
								</label>
								<label class="col-sm-8 control-label">更加突出复古怀旧的味道</label>
							</div>
							<div class="radio">
						        <label class="radio-inline">
									<input v-model="details.sheji.sheji" type="radio" name="sheji" value="6"> 
									<span class="unCheck" :class="{'check': details.sheji.sheji=='6'}">旅拍风格</span>
								</label>
								<label class="col-sm-8 control-label">文字图案多元化，赋予画面潮流感</label>
							</div>
						</div>
					<fieldset>
				</div>
			</div>
			
			<div class="form-group">
				<label for="inputEmail3" class="col-sm-4 control-label"></label>
				<div class="col-sm-4">
					<textarea v-model="order.remark" class="form-control" rows="4" placeholder="备注"></textarea>
				</div>
			</div>
			
			<div class="form-group">
				<div style="text-align: center;">
					<button @click="test" type="button" class="btn btn-primary nextStep">下一步</button>
				</div>
			</div>
		</form>
		<div class="modal fade next" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
			<div class="modal-dialog modal-sm">
				<div class="modal-content">
					<div class="modal-body" v-if="order.xiutu&&!order.sheji">
						<p class="sendTitle">
							修图订单<br>
							Order of Modify
						</p>
						<p class="sendMain">
							订单将扣除您
							<span style="color: #275482;">{{Math.floor(order.totle*100)/100}}元</span>
							，请问是否确认发单？
						</p>
						<p class="sendxiangqing">
							单价：{{order.photoPrice}}元/张 &nbsp;&nbsp;&nbsp;&nbsp;  数量：{{order.photoNum}}张
						</p>
					</div>
					<div class="modal-body" v-if="!order.xiutu&&order.sheji">
						<p class="sendTitle">
							设计订单<br>
							Order of Design
						</p>
						<p class="sendMain">
							订单将扣除您
							<span style="color: #275482;">{{Math.floor(order.totle*100)/100}}元</span>
							，请问是否确认发单？
						</p>
						<p class="sendxiangqing">
							单价：{{order.designPrice}}元/张&nbsp;&nbsp;&nbsp;&nbsp; 数量：{{order.designNum}}张
						</p>
					</div>
					<div class="modal-body" v-if="order.xiutu&&order.sheji">
						<p class="sendTitle">
							修图/设计<br>
							Design & Modify
						</p>
						<p class="sendMain">
							订单将扣除您
							<span style="color: #275482;">{{Math.floor(order.totle*100)/100}}元</span>
							，请问是否确认发单？
						</p>
						<p class="sendxiangqing">
							修图单价：{{order.photoPrice}}元/张&nbsp;&nbsp;&nbsp;&nbsp;修图数量：{{order.photoNum}}张 &nbsp;&nbsp;&nbsp;&nbsp;设计单价：{{order.designPrice}}元/张 &nbsp;&nbsp;&nbsp;&nbsp;设计数量：{{order.designNum}}张
						</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary sure" @click="addOrder" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
import Lib from '../assets/lib.js'
export default {
    data: () => ({
    	id: sessionStorage.getItem("id"),
    	host: Lib.C.hostPhotoStudio,
    	order:{
    		"isUrgent":false,
    		"sheji":false,
    		"xiutu":true
    	},
    	details:{
			"xiutu":{},
			"sheji":{}
    	}
    }),
    created: function () {  },
	ready: function () {  },
	watch: {
		"order.isUrgent" (val){
			if(val){
				this.$set("order.urgentTime",48)
			}
			if(!val){
				$(".jiajixuan").attr("disabled","disabled");
			}else{
				$(".jiajixuan").removeAttr("disabled");
			}
		},
		"order.xiutu": function(val){
			if(!val){
				$(".xiutu").attr("disabled","disabled");
			}else{
				$(".xiutu").removeAttr("disabled");
			}
		},
		"order.sheji": function(val){
			if(!val){
				$(".sheji").attr("disabled","disabled");
			}else{
				$(".sheji").removeAttr("disabled");
			}
		},
		"order.photoNum":function(val){
			if(val&&val<0){
				this.order.photoNum=1;
			}
			if(val&&parseInt(val)/parseFloat(val)!=1){
				this.order.photoNum=parseInt(this.order.photoNum);
			}
		},
		"order.designNum":function(val){
			if(val&&val<1){
				this.order.designNum=1;
			}
			if(val&&parseInt(val)/parseFloat(val)!=1){
				this.order.designNum=parseInt(this.order.designNum);
			}
		},
		"order.photoPrice":function(val){
			if(val&&val<=0){
				this.order.photoPrice=1;
			}
		},
		"order.designPrice":function(val){
			if(val&&val<=0){
				this.order.designPrice=1;
			}
		},
	},
    methods: {
    	test: function(){
    		if(!this.order.title){
    			Lib.M.topRightInfoTips({title:"请输入订单标题"});
    			return false;
    		}
    		if(!this.order.xiutu && !this.order.sheji){
    			Lib.M.topRightInfoTips({title:"修片和设计必须选一个"});
    			return false;
    		}
    		if(this.order.isSee&&this.order.seePhone.length!=11){
    			Lib.M.topRightInfoTips({title:"请输入11位手机号码"});
    			return false;
    		}
    		if(this.order.xiutu&&!this.order.sheji){
    			if(!this.order.photoNum || !this.order.photoPrice){
    				Lib.M.topRightInfoTips({title:"修片数量或单价未填"});
    				return false;
    			}
    			this.$set("order.totle",this.order.photoNum*this.order.photoPrice);
    			if(this.order.isUrgent && this.order.urgentTime==6){
    				this.$set("order.totle",this.order.photoNum*this.order.photoPrice*3)
    			}else if(this.order.isUrgent && this.order.urgentTime==12){
    				this.$set("order.totle",this.order.photoNum*this.order.photoPrice*2.5)
    			}else if(this.order.isUrgent && this.order.urgentTime==24){
    				this.$set("order.totle",this.order.photoNum*this.order.photoPrice*2)
    			}else if(this.order.isUrgent && this.order.urgentTime==48){
    				this.$set("order.totle",this.order.photoNum*this.order.photoPrice*1.5)
    			}
			}else if(!this.order.xiutu&&this.order.sheji){
				if(!this.order.designNum || !this.order.designPrice){
    				Lib.M.topRightInfoTips({title:"设计数量或单价未填"});
    				return false;
    			}
				this.$set("order.totle",this.order.designNum*this.order.designPrice);
				if(this.order.isUrgent && this.order.urgentTime==6){
					this.$set("order.totle",this.order.designNum*this.order.designPrice*3);
    			}else if(this.order.isUrgent && this.order.urgentTime==12){
    				this.$set("order.totle",this.order.designNum*this.order.designPrice*2.5);
    			}else if(this.order.isUrgent && this.order.urgentTime==24){
    				this.$set("order.totle",this.order.designNum*this.order.designPrice*2);
    			}else if(this.order.isUrgent && this.order.urgentTime==48){
    				this.$set("order.totle",this.order.designNum*this.order.designPrice*1.5);
    			}
			}else if(this.order.sheji&&this.order.xiutu){
				if(!this.order.photoNum || !this.order.photoPrice || !this.order.designNum || !this.order.designPrice){
    				Lib.M.topRightInfoTips({title:"数量或单价未填"});
    				return false;
    			}
				this.$set( "order.totle",this.order.photoNum*this.order.photoPrice + this.order.designNum*this.order.designPrice );
				if(this.order.isUrgent && this.order.urgentTime==6){
					this.$set( "order.totle",(this.order.photoNum*this.order.photoPrice + this.order.designNum*this.order.designPrice)*3 );
    			}else if(this.order.isUrgent && this.order.urgentTime==12){
    				this.$set( "order.totle",(this.order.photoNum*this.order.photoPrice + this.order.designNum*this.order.designPrice)*2.5 );
    			}else if(this.order.isUrgent && this.order.urgentTime==24){
    				this.$set( "order.totle",(this.order.photoNum*this.order.photoPrice + this.order.designNum*this.order.designPrice)*2 );
    			}else if(this.order.isUrgent && this.order.urgentTime==48){
    				this.$set( "order.totle",(this.order.photoNum*this.order.photoPrice + this.order.designNum*this.order.designPrice)*1.5 );
    			}
			}
			$('.next').modal('show');
    	},
		addOrder: function(){
			var url = this.host + "v1/photo/order/one",
				postParam = {},
				self = this;
			postParam = {
				"isSee":this.order.isSees?"YES":"NO",
				"seeName":this.order.seeName,
				"seePhone":this.order.seePhone,
				"finishTime":this.order.finishTime,	//要求完成时间
				"isUrgent":this.order.isUrgent ? "YES" : "NO",	//是否加急
				"photoInfoId":parseInt(this.id),	//影楼主键id
				"remark":this.order.remark,	//备注
				"request":this.order.request,	//固定请求
				"title":this.order.title,	//订单标题
				"urgentPrice":1
			};
			if(this.order.xiutu&&!this.order.sheji){
				this.order.type = "XT";
				this.order.details = this.details.xiutu;
				postParam.photoNum = parseFloat(this.order.photoNum);
				postParam.photoPrice = parseFloat(this.order.photoPrice);
			}else if(!this.order.xiutu&&this.order.sheji){
				this.order.type = "SJ";
				this.order.details = this.details.sheji;
				postParam.designNum = parseFloat(this.order.designNum);
				postParam.designPrice =parseFloat(this.order.designPrice);
			}else if(this.order.sheji&&this.order.xiutu){
				this.order.type = "ALL";
				this.order.details = this.details;
				postParam.photoNum = parseFloat(this.order.photoNum);
				postParam.photoPrice = parseFloat(this.order.photoPrice);
				postParam.designNum = parseFloat(this.order.designNum);
				postParam.designPrice = parseFloat(this.order.designPrice);
			}
			if(this.order.isUrgent && this.order.urgentTime==6){
				postParam.urgentTime = parseInt(this.order.urgentTime);
				postParam.urgentPrice = 3;
			}else if(this.order.isUrgent && this.order.urgentTime==12){
				postParam.urgentTime = parseInt(this.order.urgentTime);
				postParam.urgentPrice = 2.5;
			}else if(this.order.isUrgent && this.order.urgentTime==24){
				postParam.urgentTime = parseInt(this.order.urgentTime);
				postParam.urgentPrice = 2;
			}else if(this.order.isUrgent && this.order.urgentTime==48){
				postParam.urgentTime = parseInt(this.order.urgentTime);
				postParam.urgentPrice = 1.5;
			}
			postParam.type = this.order.type;
			postParam.details = JSON.stringify(this.order.details);
			Lib.M.load(url, JSON.stringify(postParam) ,function(data){
				Lib.M.topRightInfoTips({title:data.message});
				if(data.code==-1){
					setTimeout(function(){
						location.href="#/index/sendOrder2?id="+ data.id;
						location.reload();
					},2000);
					window.open("#/index/sendOrder2?id=" + data.id);
				}
			});
		},
		querenKY (){
			if(this.order.seeName && this.order.seePhone && this.order.seePhone.length==11){
				this.$set("order.isSees",true)
				this.$set("order.isSee",false)
			}else{
				Lib.M.topRightInfoTips({title: "请填写姓名或请输入11位手机号码" });
			}
		},
		quxiaoKY (){
			this.$set("order.isSees",false)
			this.$set("order.isSee",false)
		},
	},
	components: {
		
    }
}
</script>
<style scoped>
	.mingzi:after {
		content: "|"; color: black; padding-right: 10px; font-size: 14px;margin-left: 10px;
	}
	.mingdian{
		border-right: #ffffff 0px solid; border-top: #ffffff 0px solid; font-size: 9pt; border-left: #ffffff 0px solid; 
		border-bottom: #c0c0c0 1px solid; background-color: #ffffff
	}
	.jiaji .jiajishuru{
		padding-top: 0;margin-left: 35px;
	}
	.mingzi{
		margin-left: 15px;
	}
	.sendOrder{
		min-height: 834px;
	}
	.dingdanBT{
		background: #ecedf3; padding: 11px 0 8px; margin-bottom: 0; border-bottom: solid #ddd 1px;
	}
	.jiaji{
		display: inline-block; width: 100%; text-align: center; padding-top: 14px;
	}
	.jiajixuan label{
		margin-right:15px;
	}
	.btshuru{
		width: 300px; display: inline-block;
	}
	.xbiaoti{
		font-size: 18px; padding-top: 3px;
	}
	.btshuru input{
		border-radius: 50px; background: rgba(0,0,0,0);height: 33px;padding-left: 20px;width: 300px;
	}
	.checkbox label,.radio label{
		min-height: 18px;
	}
	label{
		font-weight: normal;
	}
	.detail{
		margin-top: 20px;
	}
	.xiutuBox,.shejiBox{
		min-height: 500px;border-radius: 5px;background-color: rgb(255, 255, 255); box-shadow: 0px 0px 9px 0px rgba(9, 2, 4, 0.284);
	}
	/*详情修图*/
	.xiutuBox{
		margin-right: 60px;
	}
	.xiutu{
		margin-top: 15px;
	}
	/*详情设计*/
	.radio .control-label{
		text-align: left !important; cursor:default;
	}
	.radio{
		overflow: hidden; padding-top: 10px;
	}
	.radio .radio-inline{
		width: 100px; float: left;
	}
	/*公共*/
	.radio-inline{
		padding-left: 0; 
	}
	.radio-inline input{
		opacity: 0;
	}
	.cheRadio input{
		opacity: 1;
	}
	.unCheck{
		border: solid 1px #bfbfbf; display: inline-block; padding: 1px 12px; border-radius: 25px;
	}
	.check{
		background: #275482;border: solid 1px #275482; color: white;
	}
	.sheji .line,.xiutu .line{
		border-top: solid 1px #959595;margin: 20px;
	}
	.sheji .lines{
		margin: 15px 20px 0px 20px;; border-top: solid 1px #959595;
	}
	.form-group {
	    margin-bottom: 13px;
	}
	/*模态框*/
	.modal-body .sendTitle{
		font-size:16px;margin-bottom:32px;
	}
	.modal-body .sendMain{
		border-bottom:solid 1px #c1c1c1; padding: 7px 0;  margin: 10px 37px;
	}
	.modal-body .sendxiangqing{
		font-size:14px;
	}
	.modal-sm{
		width: 550px;
	}
	.modal-content{
		padding: 0 33px 30px 33px;
	}
	.modal-footer{
		border: 0;text-align: center;
	}
	.modal-body p{
		font-size: 18px;text-align: center;
	}
	/*.sure{
		background: #
	}*/
	.sure,.cancel{
		border-radius: 50px; width: 90px;height: 36px; 
	}
	.nextStep{
		width: 170px; height: 45px; border-radius: 50px; margin-left: 40px;background: #275482
	}
</style>