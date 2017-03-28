<template lang="html">
    <div v-el:qi-niu-container>
        <div class="btn btn-default" v-el:qi-niu-button>
            <i class="iconfont icon-001" style="font-size:14px;color:#696969"></i>
            <span style="color:#696969">{{options.yasuobao ? options.yasuobao : "上传图片"}}</span>
        </div>
        
       
    </div>
</template>
<script>
    import Lib from '../assets/lib'

    export default{
        props: {
        	options: Object,
        },
        data: () => ({
            addrQN:Lib.M.getUrlParams(),//获取地址栏参数
            URL:"",
            upPic:{
                have:"",
                list: [],
                n: 0,
                index: 0,
                arr:[]
            },
            host: Lib.C.hostPhotoStudio,
            domain: Lib.C.qiniu.imgmanagesystem.domain,
            token: '',
            files: ['http://cdn.staticfile.org/Plupload/2.1.1/plupload.full.min.js', 'http://cdn.staticfile.org/Plupload/2.1.1/moxie.min.js', 'http://cdn.staticfile.org/qiniu-js-sdk/1.0.14-beta/qiniu.js']
        }),
        created (){
            Lib.M.loadFiles(this.files);
            this.getToken();
        },
        ready (){
            var self = this;
            setTimeout(()=>{
                // self.$set( "URL",document.URL.split("#")[1].split("/")[2].split("?")[0] );
                // self.$set( "addrQN",Lib.M.getUrlParams() );
                this.uploadQNImg();
            }, 1500);
        },
        methods: {
            /***
             *上传图片
             * @param option
             * @param callback {callbackType: //回调类型属于进度回调还是成功回调}
             */
            indexs (index,e){
                if(e){
                    this.upPic.have="you";
                }
                this.upPic.index = index;
                if( $(e.target).html()=="取消上传" ){
                    $(e.target).html("已经取消")
                }
            },
            uploadQNImg: function(){
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
                    max_file_size: '1mb',             // 最大文件体积限制
//                  flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入flash，相对路径
                    max_retries: 3,                     // 上传失败最大重试次数
                    dragdrop: true,                     // 开启可拖曳上传
                    chunk_size: '4mb',			// 分块上传时，每块的体积
                    auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    isCover: false,    					//是否覆盖,默认为不覆盖
                    key: 'unPath',						//默认路径
                    init: {
                        'FilesAdded': function(up, files) {
                            // if( self.addrQN.id && document.URL.split("#")[1].split("/")[2].split("?")[0]!="templateAdd" ){
                            //     $(".tuya3").modal({show:true,backdrop: 'static', keyboard: false})
                            // }
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
                            // console.log(info);
                            self.$dispatch('child-qiniu-data', info);
                        },
                        'Error': function(up, err, errTip) {
                            if(err.code==-600){
                                Lib.M.topRightInfoTips({title:"请上传规定大小的图片(默认1M，有说明请按说明传规定大小的图片)"});
                            }
                        	if(err.code==-200){
                        		Lib.M.topRightInfoTips({title:"您的网络可能信号不好，请重新上传"});
                                alert("您的网络可能信号不好，请重新上传")
								location.reload();
                        	}
                            //上传出错时，处理相关的事情
                        },
                        'UploadComplete': function() {
                            //队列文件处理完毕后，处理相关的事情
                            if(self.upPic.n==self.upPic.list.length-1){
                                setTimeout(function(){
                                    $(".tuya3").modal('hide');
                                },2000)
                            }
                        },
                        'Key': function(up,file) {
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在unique_names: false，save_key: false时才生效
                            const options = self.options;
                        	let id = sessionStorage.getItem('id');
                        	let position = sessionStorage.getItem('position');
                            let key = options.key ? options.key : defaultOption.key;
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
                $.extend(defaultOption, self.options);
                const uploader = Qiniu2.uploader(defaultOption);
            },

            getToken (){
                const URL = this.host + 'qiNiu/getToken';
                Lib.M.load(URL, '', (data)=>{
                    this.$set('token', data.data.result);
                },"get");
            }
        }
    }
</script>
<style type="text/css" scoped>
    .picMutai1 {
        height: 100%;margin-top: 0;
    }
    .beijing{
        background: white; padding: 20px;border-radius: 6px;
    }
    .table tr th,.table tr td{
        text-align: center;font-weight: normal;
    }  
    .table{
        overflow: auto;max-height: 300px; display: inherit
    }
    .jindu{
        position: fixed;bottom: 30px;right: 60px;
    }
</style>