<template lang="html">
	<div class="topclass">
		<h5 style="min-width:300px">
			<strong style="color: #428bca;">订单完成{{bili.clearDay}}天后结算 ,平台提成比例{{bili.pushMoney}}%</strong>
			<template v-if="h_role == 1">
				<span title="修改" class="glyphicon glyphicon-pencil" style="color: red;cursor: pointer;"data-toggle="modal"  data-target=".exit"></span>
			</template>
		</h5>
		<!--模态框  查看。预览 star-->
		<div class="modal fade exit" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-dialog modal-bg">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		        <h4 class="modal-title" style="text-align: left;">修改分配比例</h4>
		      </div>
		      <div class="modal-body">
		      		<form class="form-horizontal" role="form">
					  <div class="form-group">
					    <label class="col-sm-3 control-label">超期审核：</label>
					    <div class="col-sm-8">
					    	<input type="text" class="form-control" placeholder="审核时间" v-model="checkDay">
					    </div>
					  </div>
					  <div class="form-group">
					    <label class="col-sm-3 control-label">结算时间：</label>
					    <div class="col-sm-8">
					    	<input type="text" class="form-control" placeholder="点单完成后几天结算" v-model="clearDay">
					    </div>
					  </div>
					  <div class="form-group">
					    <label class="col-sm-3 control-label">提成比例：</label>
					    <div class="col-sm-8">
					    	<input type="text" class="form-control" placeholder="平台所占百分比" v-model="pushMoney">
					    </div>
					  </div>
					</form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">暂不修改</button>
		        <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="exitdata">确认修改</button>
		      </div>
		    </div>
		  </div>
		</div>
		<!--模态框  查看。预览 end-->
	</div>
</template>
<script type="text/javascript">
import Lib from '../assets/lib'
export default {
	props: {

    },
	data: () => ({
		host: Lib.C.hostBackstage,
		userinfo:{},
		bili:{},
		clearDay:1,
		pushMoney:1,
		checkDay:1,
		h_role:localStorage.getItem('h_role'),
	}),
	created() {
		this.findbili();
	},
	ready (){

	},
	watch: {
		'pushMoney':function(val){
			if(val<1 || val>100){
				Lib.M.topRightInfoTips({title:'请输入1~100之间的整数'});
				this.$set('pushMoney',1)
			}else if(val*10%10>0){
				Lib.M.topRightInfoTips({title:'请输入1~100之间的整数'});
				this.$set('pushMoney',Math.floor(val))
			}
		},
		'clearDay':function(val){
			if(val<1){
				Lib.M.topRightInfoTips({title:'请输入大于0的整数！'});
				this.$set('clearDay',1)
			}else if(val*10%10>0){
				Lib.M.topRightInfoTips({title:'请输入大于0的整数！'});
				this.$set('clearDay',Math.floor(val))
			}
		}
	},
	methods: {
		findbili:function(){
			let url = this.host + 'onLinePs/systemAccount/info';
            let self = this;
            let params = {};
            params.id = localStorage.getItem('h_id');
            Lib.M.load(url,'', function(data) {
            	self.$set('bili',data.data);
            	self.$set('clearDay',data.data.clearDay);
            	self.$set('pushMoney',data.data.pushMoney);
            	self.$set('checkDay',data.data.checkDay);
            },'get');
		},
		exitdata:function(){//修改资金分配比例
			let url = this.host + 'onLinePs/systemAccount/info';
            let self = this;
            let params = {};
            params.checkDay = this.checkDay*1;
            params.clearDay = this.clearDay*1;
            params.pushMoney = this.pushMoney*1;
            Lib.M.load(url,JSON.stringify(params), function(data) {
            	if(data.code == -1){
            		self.findbili();
            	}else{
            		Lib.M.topRightInfoTips({title:data.message});
            	}
            },'put');
		},
	}
}

</script>
<style type="text/css" scoped>
.topclass{
    text-align: right;
    padding: 15px 70px;
    background: whitesmoke;
}
</style>