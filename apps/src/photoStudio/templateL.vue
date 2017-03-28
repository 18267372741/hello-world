<template lang="html">
<div id="products" class="container-fluid row">
    <div class="row">
        <div class="col-lg-12">
            <div v-if="!addr.groupid" class="addMuban">
                <a href="#/index/templateAdd?group=group">
                    <span>+</span>
                </a>
                <span>添加组</span>
            </div>
            <div v-if="addr.groupid" class="addMuban">
                <a href="#/index/templateAdd?groupId={{addr.groupid}}">
                    <span>+</span>
                </a>
                <span>添加模板</span>
                <a @click="reload" href="#/index/templateL" style="margin:0 0 0 74px;display:inline-block">
                    <button type="button" class="btn btn-primary btn-xs">
                        返回
                    </button> 
                </a>
            </div>
            <div class="block-bg">
            	<div class="mubanBox">
                    <p v-if="!photoTemp.length" style="text-align: center;font-size:24px">不存在模板，请新建</p>
                    <div class="mubans" v-for="photoTemp in photoTemp">
                        <div>
                            <div v-if="!addr.groupid" class="pic">
                                <div class="zuMing">
                                    {{photoTemp.name}}
                                </div>
                                <a @click="reload" href="#/index/templateL?groupId={{photoTemp.id}}">
                                    <img  src="../assets/images/wenjianjiaHS.png">
                                </a>
                            </div>
                            <div v-if="!addr.groupid" class="mubanZu">
                                <a v-if="!addr.groupid" href="#/index/templateAdd?id={{photoTemp.id}}&groupedi=groupedi">
                                    <span class="active">设置</span>
                                </a>
                                <span @click="getId($event,photoTemp.id)">删除</span>
                            </div>
                            <div v-if="addr.groupid" class="pic">
                                <img style="width:93%" :src="qnyUrl+photoTemp.logo+'?imageMogr2/thumbnail/300x300!'" alt="{{photoTemp.name}}">
                            </div>
                        	<div v-if="addr.groupid" class="boNav">
                        		<ul>
                        			<li v-if="addr.groupid" style="font-size: 16px; width: 90px; text-align: left; overflow: hidden;">
                        				{{photoTemp.name}}
                        			</li>
                        			<li class="operating">
                        				<div>
		                                	<a v-if="addr.groupid" href="#/index/templateAdd?id={{photoTemp.id}}">
	                                    		<span class="active">设置</span>
		                                	</a>
                                            <a v-if="!addr.groupid" href="#/index/templateAdd?id={{photoTemp.id}}&groupedi=groupedi">
                                                <span class="active">设置</span>
                                            </a>
		                                    <span @click="getId($event,photoTemp.id)">删除</span>
		                                </div>
                        			</li>
                        		</ul>
                    		</div>
                    	</div>
                    </div>
                </div>
            </div>
			
        </div>
		<page :turn-page="muban"></page>
        <!--删除模态框-->
        <div class="modal fade delmodal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>
							您确定删除该模板么？
						</p>
                    </div>
                    <div class="modal-footer">
        				<button type="button" @click="dePhotoTemp" class="btn btn-primary sure" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
        	        </div>
                </div>
            </div>
        </div>
	</div>	
</div>
</template>
<script>
    import Lib from '../assets/lib.js'
    import page from '../components/page/page.vue'
    export default {
        data: () => ({
        	id: sessionStorage.getItem("id"),
        	host: Lib.C.hostPhotoStudio,
        	qnyUrl:Lib.C.qiniu.jsUrl,
            addr:Lib.M.getUrlParams(),
        	pageNo:1,
        	muban:{},//模板翻页
        	photoTempIdL:"",
            photoTemp:[]
        }),
        created: function () {
            if(this.addr.groupid){
                this.photoTemps(this.addr.groupid);
            }else{
                this.tempTypes();
            }
		},
		ready: function () {  },
		events: {
            'child-turn-page' (obj){
                this.$set('pageNo', obj.pageNo);
                if(this.addr.groupid){
                    this.photoTemps(this.addr.groupid);
                }else{
                    this.tempTypes();
                }    
            }
        },
        methods: {
            tempTypes (){//分组列表
                var url = this.host+'v1/group/tempType',
                    postParam = {},
                    self = this;
                postParam = {
                    "photoInfoId":this.id,
                    "pageNo":this.pageNo,
                    "pageSize":10
                }
                Lib.M.load(url, postParam ,function(data){
                    console.log(data)
                    if(data.code==8){
                        self.$set("muban",{});
                        self.$set("photoTemp",[]);
                        return false;
                    };
                    data = data.data;
                    const page = {
                        pageSize: data.pageSize,
                        totalCount: data.totalCount,
                        pageNo: data.pageNo
                    };
                    self.$set("muban",page);
                    data = data.list;
                    self.$set("photoTemp",data);
                },"GET");
            },
        	photoTemps (id){//模板列表         
				var url = this.host+'v1/photo/temp/photoTemp/'+this.id,
					postParam = {},
					self = this;
				postParam = {
                    "tempTypeId":id,
					"pageNo":this.pageNo,
					"pageSize":4
				}
				Lib.M.load(url, postParam ,function(data){
					if(data.code==8){
						self.$set("muban",{});
                		self.$set("photoTemp",[]);
						return false;
					};
					data = data.data;
					const page = {
                        pageSize: data.pageSize,
                        totalCount: data.totalCount,
                        pageNo: data.pageNo
                    };
                	self.$set("muban",page);
					data = data.list;
					self.$set("photoTemp",data);
				},"GET");
			},
			getId (e,id){
				this.photoTempId = id;
				$('.delmodal').modal('show');
			},
			dePhotoTemp (){//删除模板
                if(this.addr.groupid){
                    var url = this.host+'v1/photo/temp/photoTemp/'+this.photoTempId;
                }else{
                    var url = this.host+'v1/group/tempType?id='+this.photoTempId+'&photoInfoId='+this.id;
                }
				var	postParam = {},
					self = this;
				Lib.M.load(url, postParam ,function(data){
                    Lib.M.topRightInfoTips({title: data.message });
					if(data.code==-1){
                        if(self.addr.groupid){
                            self.photoTemps(self.addr.id);
                        }else{
                            self.tempTypes();
                        }
					}
				},"delete");
			},
            reload (){
                location.reload()
            }
		},
		components: {
            page
        }
	}
</script>
<style scoped>
    .mubanBox{
    	overflow: hidden; padding: 0px 40px; min-height: 662px;
    }
    .mubans{
    	float: left; width: 17%; margin:1% 2% 0.5% 1.5%; text-align: center; background: white;max-width: 235px;
        box-shadow: 0px 1px 9px 0px rgba(9, 2, 4, 0.125);
    }
    .mubanZu{
        background: #eeeeee; padding: 16px 0;
    }
    .zuMing{
        font-size: 16px;border-bottom: solid 1px #dfe0e1; margin: 0 50px;padding-bottom: 6px;
    }
    .mubanZu span{
        display: inline-block; padding: 2px 18px; border-radius: 50px;border:solid 1px #1d262e; font-size: 11px; color: black; cursor: pointer;
    }
    .mubanZu span.active{
        color: white;background: #275482;border: solid 1px #275482;
    }
    .pic{
    	width: 100%; padding: 3% 0 6% 0;
    }
    .pic a{
        display: block; padding: 17% 0 10% 0;
    }
    .pic img{
    	width: 35%;
    }
    .boNav ul{
    	overflow: hidden;padding: 0 0 5px 0; border-bottom: 1px solid #bfbfbf; margin-bottom: 26px; margin: 0 10px 21px 13px;
    }
    .boNav li{
    	float: left;
    }
    .boNav .operating{
    	float: right;
    }
    .operating span{
    	display: inline-block;border: solid 1px #bfbfbf; padding: 0px 12px; color: black; border-radius: 50px; cursor: pointer;
        font-size: 14px
    }
    .operating .active{
    	background: #275482; border: solid 1px #275482; color: white;
    }
    .addMuban{
    	background: #ecedf3; padding: 29px 0; padding-left: 80px; border-bottom: solid #ddd 1px;
    }
    .addMuban a span{
    	background: #275482;display: inline-block; width: 32px;height: 32px;text-align: center;line-height: 28px;border-radius: 50%;color: white;font-size: 26px;
    }
    .addMuban span{
    	font-size: 16px;
    }
    /*模态框*/
    .modal-sm{
    	width: 450px;
    }
    .modal-content{
        padding: 46px 33px 30px 33px;
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