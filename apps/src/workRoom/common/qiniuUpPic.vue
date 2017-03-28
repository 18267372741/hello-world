<template lang="html">
    <div class="shangchuan" v-el:qi-niu-container>
        <div class="btn btn-default" v-el:qi-niu-button>
            <i class="iconfont icon-001" style="font-size:14px"></i>
            <span>上传图片</span>
        </div>
        <!-- <div @click="downUp" class="btn btn-primary">
            <i v-if="gaodu=='100'" class="iconfont icon-adown downUps" style="font-size:14px"></i>
            <i v-if="gaodu=='200'" class="iconfont icon-ahead downUps" style="font-size:14px"></i>
            <span>进度详情</span>
        </div> -->
        <div class="neirong">
            <table class="table table-condensedn table-hover">
                <!-- <thead>
                    <tr>
                        <th style="width:100px;overflow:hidden">文件名</th>
                        <th style="width:100px">大小</th> 
                        <th style="width:320px">详情</th>
                        <th style="width:80px">操作</th>
                    </tr>
                </thead> -->
                <tbody class="stop_load">
                    <tr v-for="list in upPic.list">
                        <td style="width:100px;overflow:hidden">{{list.names}}</td>
                        <td style="width:100px">{{(list.size/1000000).toFixed(2)}}M</td>
                        <td style="width:320px">
                            <div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" v-bind:style="{width: list.percent+'%'}">
                                {{list.percent}}%
                            </div>
                        </td>
                        <td style="width:80px">
                            <span class="btn btn-info btn-xs" @click="indexs($index,$event)">{{list.percent=="100" ? "上传成功" : "取消上传"}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>    
        </div>
        
    </div>
</template>
<script>
    import Lib from '../../assets/lib'
    export default{
        props: {
            options: Object,
        },
        data: () => ({
            addrQN:Lib.M.getUrlParams(),//获取地址栏参数
            upPic:{
                have:"",
                list: [],
                n: 0,
                index: 0,
                arr:[]
            },
            gaodu:"100",
            key:"",
            host: Lib.C.hostPhotoStudio,
            domain: Lib.C.qiniu.imgmanagesystem.domain,
            token: '',
            files: ['http://cdn.staticfile.org/Plupload/2.1.1/plupload.full.min.js', 'http://cdn.staticfile.org/Plupload/2.1.1/moxie.min.js', 'http://cdn.staticfile.org/qiniu-js-sdk/1.0.14-beta/qiniu.js']
        }),
        created (){
            if( !this.addrQN.status ){
                var name = "end";
            }else {
                var name = "fgImg";
            }
            this.key = "files" ;
            Lib.M.loadFiles(this.files);
            this.getToken();
        },
        ready (){
            var self = this;
            setTimeout(()=>{
                self.$set( "addrQN",Lib.M.getUrlParams() );
                this.uploadQNImg();
            }, 1500);
        },
        methods: {
            /***
             *上传图片
             * @param option
             * @param callback {callbackType: //回调类型属于进度回调还是成功回调}
             */
            downUp (){
                if(  parseInt( $(".shangchuan").css("bottom") )>0){
                    this.$set("gaodu","200");
                    $(".shangchuan").css("bottom","-300px");
                }else{
                    this.$set("gaodu","100");
                    $(".shangchuan").css("bottom","5px");
                }
            },
            indexs (index,e){
                if(e){
                    this.upPic.have="you";
                }
                this.upPic.index = index;
                if( $(e.target).html()=="取消上传" ){
                    $(e.target).html("已经取消")
                }
            },
            uploadQNImg (){
                const self = this;
                const qiNiuContainer = this.$els.qiNiuContainer;
                const qiNiuButton = this.$els.qiNiuButton;
                const token = this.token;
                const domain = this.domain;
                var Qiniu2 = new QiniuJsSDK();

                var defaultOption = {
                    runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                    browse_button: qiNiuButton,         // 上传选择的点选按钮，必需
                    uptoken : token, // uptoken是上传凭证，由其他程序生成
                    domain: domain,     // bucket域名，下载资源时用到，必需
                    container: qiNiuContainer,             // 上传区域DOM ID，默认是browser_button的父元素
                    get_new_uptoken: true,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                    max_file_size: '1024mb',             // 最大文件体积限制
                    max_retries: 3,                     // 上传失败最大重试次数
                    chunk_size: '4mb',          // 分块上传时，每块的体积
                    auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    isCover: false,                     //是否覆盖,默认为不覆盖
                    key: 'unPath',
                    multi_selection: false,
                    dragdrop: true,                     // 开启可拖曳上传
                    drop_element: qiNiuContainer,                       //默认路径
                    init: {
                        'FilesAdded': function(up, files) {
                            console.log(files)
                            plupload.each(files, function(file) {
                                self.$dispatch('child-qiniu-data', file);
                                self.upPic.list.push(file)
                                // 文件添加进队列后，处理相关的事情
                            });
                            for(let i=0;i<self.upPic.list.length;i++){
                                self.upPic.list[i].percent ? self.upPic.list[i].percent : 0;
                                self.upPic.list[i].names = self.upPic.list[i].name;
                            }
                        },
                        'BeforeUpload': function(up, file) {
                            self.$dispatch('child-qiniu-data', file);
                            // 每个文件上传前，处理相关的事情
                        },
                        'UploadProgress': function(up, file) {
                            // 每个文件上传时，处理相关的事情
                            file.callbackType = 'UploadProgress';
                            self.$dispatch('child-qiniu-data', file);
                            console.log( self.upPic.n );
                            self.upPic.list[self.upPic.n].percent==100? self.upPic.list[self.upPic.n].percent==100 :self.upPic.list[self.upPic.n].percent = file.percent;
                        },
                        'FileUploaded': function(up, file, info) {
                            // 每个文件上传成功后，处理相关的事情
                            // 其中info是文件上传成功后，服务端返回的json，形式如：
                            // {
                            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                            //    "key": "gogopher.jpg"
                            //  }
                            // 查看简单反馈
                            var domain = up.getOption('domain');
                            // var res = parseJSON(info);
                            // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                            info = JSON.parse(info);
                            info.domain = domain;
                            info.callbackType = 'FileUploaded';
                            self.$dispatch('child-qiniu-data', info);
                            if( self.upPic.n<=self.upPic.list.length-1 ){
                                self.upPic.n++;
                            }
                            // console.log(self.upPic.arr);
                            for(var i=0;i<self.upPic.arr.length;i++){
                                if(self.upPic.n==self.upPic.arr[i]){
                                    if( self.upPic.n<self.upPic.list.length-1 ){
                                        self.upPic.n++;
                                    }    
                                }
                            }
                        },
                        'Error': function(up, err, errTip) {
                            if(err.code==-600){
                                Lib.M.topRightInfoTips({title:"请上传规定大小的图片(默认1M，有说明请按说明传规定大小的图片)"});
                            }
                            if(err.code==-200){
                                Lib.M.topRightInfoTips({title:"您的网络可能信号不好，请重新上传"});
                                 //  alert("您的网络可能信号不好，请重新上传")
                                // location.reload();
                            }
                            //上传出错时，处理相关的事情
                        },
                        'UploadComplete': function() {
                            //队列文件处理完毕后，处理相关的事情
                            console.log("队列完");
                        },
                        'Key': function(up,file) {
                            // console.log(file)
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在unique_names: false，save_key: false时才生效
                            const options = self.options;
                            let id = sessionStorage.getItem('id');
                            let position = sessionStorage.getItem('position');
                            let key = self.key;
                            id = id ? id : '888887';
                            key = position +"/"+ id + '/' + key;
                            if((!options)||(!options.isCover)){
                                file.name = file.name.replace(/\./, '_'+new Date().getTime()+'.');
                            }
                            key += '/'+file.name;
                            return key
                        }
                    },
                };

                $('.stop_load').on('click', ()=>{
                    if(!self.upPic.have){
                        return false;
                    }
                    if(self.upPic.index < self.upPic.n){
                        return false;
                    }
                    if(self.upPic.index == self.upPic.n){
                        if( self.upPic.n<=self.upPic.list.length-1 ){
                            self.upPic.n++;
                        }
                    }
                    if(self.upPic.index > self.upPic.n){
                        self.upPic.arr.push(self.upPic.index);
                    }
                    uploader.removeFile(self.upPic.list[ self.upPic.index ]);

                });
                $.extend(defaultOption, self.options);
                const uploader = Qiniu2.uploader(defaultOption);
            },

            getToken (){
                const URL = this.host + 'qiNiu/getToken';
                Lib.M.load(URL, '', (data)=>{
                    this.$set('token', data.data.result);
                },"get");
            }
        },
        components: {
            
        }
    }
</script>
<style type="text/css" scoped>
    .shangchuan{
       
    }
    /*.neirong{
        height: 300px;overflow: auto; box-shadow: 0px 3px 15px 0px rgba(9, 2, 4, 0.243);border-radius: 6px;
        background: url(../../assets/images/tuozhua.png) no-repeat center white;
    }*/
    .stop_load{
        background: white
    }
</style>