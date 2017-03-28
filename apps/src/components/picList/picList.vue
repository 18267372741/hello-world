<template lang="html">
    <div class="modal fade" :class="{'in': show}" v-show="show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click="show=false">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">关闭</span>
                    </button>
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                <div class="modal-body no-padding">
                    <ul class="img-list clearfix row no-margin">
                        <li class="logo" v-for="one in data" :class="{'active': one.checked}" @click="choosePic($index)">
                            <img class="thumbnail" :src="one.url+'@70h_70w_1e_1c'">
                            <span class="ld-pic-del" title="删除" data-dir="{{one.dir}}" data-name="{{one.name}}" @click="deleteFn($index, $event)">×</span>
                            <span>{{one.cutName}}</span>
                        </li>
                    </ul>
                    <div class="page-attachment clearfix">
                        <label class="btn-upload pull-left">
                            <span>上传图片</span>
                            <input type="file" class="upload-img" @change="uploadFn">
                        </label>
                        <div class="pull-right pages">
                            <button type="button" class="btn btn-sm btn-info pull-left js-prev">上一页</button>
                            <span class="pull-left" data-value="1">当前 第 1 页</span>
                            <button type="button" class="btn btn-sm btn-info pull-left js-next">下一页</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-sm"  @click="show=false">关闭</button>
                    <button type="button" class="btn btn-primary btn-sm" @click="sureFn">确定</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <div class="modal-backdrop fade" :class="{'in': show}" v-show="show"></div>
</template>
<script>
    import M from '../../assets/common.js'
    import O from '../../assets/componentOption.js'
    import UP from '../../assets/wantu-jssdk/upfile.js'

    export default {
        data: () => ({
            merchantId: localStorage.getItem('merchantId'),
            show: false,
            title: '图片列表',
            data: [],
            param: {
                dir: '/microPage',
                pageSize: 12,
                pageNo: 1,
                open: false
            },
            url: O.host+O.head.wantu.imgs,//获取图片列表
            token: O.host+O.wantu.token,//上传图片获取token
            deleteUrl: O.host+O.wantu.delete,//删除图片
            maxSize: '300',
            name: 'LOGO'
        }),
        created (){

        },
        events: {
            //接受来自父级的data
            //{show: false, param: '参数', url: '接口地址', token: '玩图获取token url', maxSize: 30}
            'pic-list' (obj){
                this.$set('show', obj.show);
                if(this.show){
                    for(let i in obj){
                        obj[i] && this.$set(i, obj[i]);
                    }
                    this.loadPic();
                }
            }
        },
        methods: {
            //加在图片
            loadPic (){
                let url = this.url;
                let param = this.param;
                let self = this;
                M.load(url, param, function(data){
                    data = data.data;
                    if(data.length){
                        self.$set('data', M.cutTime(data));
                    }
                });
            },
            //选择图片
            choosePic (index){
                let D = this.data;
                let self = this;
                D.forEach(function(item, i){
                    if(i==index){
                        self.$set('data['+i+'].checked', true);
                    }else{
                        self.$set('data['+i+'].checked', false);
                    }
                });
            },
            //确定选择
            sureFn (){
                const D = this.data;
                const self = this;
                let hasPic = false;
                D.forEach(function(item, i){
                    if(item.checked){
                        self.$dispatch('parent-pic-list', item);
                        self.$set('show', false);
                        hasPic = true;
                    }
                });
                if(hasPic) return false;
                M.topRightInfoTips({
                    content: '您没有选择图片！'
                });
            },
            //上传图片
            uploadFn (e){
                //声明
                let self = this;
                let ntoken;
                let uploader = UP.uploadJSSDK;
                let files = e.target.files;
                let dir = this.param.dir;
                let url = this.token;
                let maxSize = this.maxSize;
                ntoken = M.load(url,{});
                for (var i = 0; i < files.length; i++) {
                    var fileName = files[i].name;
                    uploader({
                        file: files[i], //文件，必填,html5 file类型，不需要读数据流，
                        name: fileName, //文件名称，选填，默认为文件名称
                        token: ntoken, //token，必填
                        dir: dir, //目录，选填，默认根目录''
                        retries: 0, //重试次数，选填，默认0不重试
                        maxSize: maxSize*1024, //上传大小限制，选填，默认0没有限制
                        callback: function(percent, result) {
                            var curOperaIndex = self.curOperaIndex,
                                    url = result.url;
                            if(percent==100){
                                result.cutName = result.name.replace(/\_\d{1,}$/,'');
                                self.data.unshift(result);
                            }else if(percent==-1){
                                M.topRightInfoTips({content: self.name+'图片大小不能超过'+maxSize+'KB'})
                            }
                        }
                    });
                }
            },
            //删除图片
            deleteFn (index, e){
                let data = e.target.dataset;
                let self = this;
                let url = this.deleteUrl;
                let param = {
                    dir: data.dir,
                    name: data.name
                };
                M.load(url, param, function(data){
                    if(data.code==-1){
                        self.data.splice(index, 1);
                        M.topRightInfoTips({content:'图片删除成功!'});
                    }
                });
                e.stopPropagation();
            }
        }
    }
</script>
<style lang="less">
    .modal .img-list {
        padding: 0;
    }
    .modal .img-list ul{
        padding: 0;
    }
    .modal .img-list li {
        float: left;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        margin: 10px;
        width: 70px;
        height: 70px;
        & img{
            margin: auto;
            max-width: 100%;
        }

        & span{
            display: block;
            width: 100%;
            position: absolute;
            left: 0;
            height: 15px;
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            bottom: 10px;
            background: rgba(204, 204, 204, 0.8);
            border-radius: 0 0 4px;
            bottom: 0;
            text-align: center;
            line-height: 1.4rem;
        }

        &.active:after {
             content: ' ';
             width: 10px;
             height: 10px;
             background-color: #50ce8d;
             position: absolute;
             right: 0;
             bottom: 0;
             border-radius: 50%;
             filter: drop-shadow(0 0 1px #000);
             -webkit-filter: drop-shadow(0 0 1px #000);
             -moz-filter: drop-shadow(0 0 1px #000);
        }
    }
    .modal .page-attachment {
        background: #DDD;
        padding: 0.5rem 1.5rem;
        margin: 0.9rem 1.4rem;

        & .btn-upload{
            position: relative;
            width: 10rem;
            background: #50ce8d;
            height: 2.5rem;
            border-radius: 0.2rem;
            margin-top: 0.8rem;
        }

        & .pages>span{
            height: 3rem;
            line-height: 4.0rem;
            padding: 0 1rem;
        }
    }
    .modal .img-list li span.ld-pic-del {
        position: absolute;
        top: 0;
        right: 0;
        width: 16px;
        height: 16px;
        background: red;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        line-height: 14px;
        left: auto;
        -webkit-box-shadow: 0 0 2px 0 #CCCCCC;
        -moz-box-shadow: 0 0 2px 0 #CCCCCC;
        box-shadow: 0 0 2px 0 #CCCCCC;
    }

</style>