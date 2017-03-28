<template lang="html">
    <div class="shangchuan" v-el:qi-niu-container>
        <div v-if="upPic.list.length" class="btn btn-default tingzhi" style="margin-right:4px">
            <i class="iconfont icon-tingzhi" style="font-size:14px"></i>
            <span @click="shuaxin">全部停止</span>
        </div>
        <div class="btn btn-default shangC" v-el:qi-niu-button>
            <i class="iconfont icon-001" style="font-size:14px"></i> 
            <span>上传图片</span>
        </div>
        <div @click="downUp" class="btn btn-primary jindu">
            <i v-if="gaodu=='100'" class="iconfont icon-adown downUps" style="font-size:14px"></i>
            <i v-if="gaodu=='200'" class="iconfont icon-ahead downUps" style="font-size:14px"></i>
            <span>进度详情</span>
        </div>
        <div class="neirong">
            <span v-if="!upPic.list.length" class="tuozhuai">请将文件夹拖拽到此处</span>
            <span v-if="shangCleiXing.shangchuan&&shangCleiXing.leixing" :class="{'tuozhuai2':shangCleiXing.shangchuan}" class="tuozhuai">正在上传...</span>
            <table class="table table-condensedn table-hover" style="text-align:left">
                <template v-if="!shangCleiXing.leixing">
                <thead>
                    <tr>
                        <th style="width:100px;overflow:hidden">文件名</th>
                        <th style="width:100px">大小</th>
                        <th style="width:320px">详情</th>
                        <th style="width:80px">操作</th>
                    </tr>
                </thead>
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
                </template>
                <template v-if="shangCleiXing.leixing">
                <thead>
                    <tr>
                        <th style="min-width:520px">详情</th>
                        <th style="width:80px">操作</th>
                    </tr>
                </thead>
                <tbody class="stop_load">
                    <tr>
                        <td style="min-width:520px">
                            <div v-if="upPic.n!=0" class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" :style="{ width :(upPic.n/upPic.totleNum)*100 + '%' }">
                                {{((upPic.n/upPic.totleNum)*100).toFixed(0)}}%
                            </div>
                            <div v-if="upPic.n==0" class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" style=" width :5% ">
                                0%
                            </div>
                        </td>
                        <td style="width:80px">
                            <span v-if="(upPic.n/upPic.totleNum)<1&&(upPic.n/upPic.totleNum)>=0" class="btn btn-info btn-xs" @click="shuaxin">取消上传</span>
                            <span v-if="(upPic.n/upPic.totleNum)==1" class="btn btn-info btn-xs">上传成功</span>
                        </td>
                    </tr>
                </tbody>    
                </template>
                
            </table>
        </div>
    </div>
</template>
<script>
    import Lib from '../../assets/lib'
    import bus from '../bus.js'
    export default {
        props: {
            options: Object,
        },
        data: () => ({
            addrQN: Lib.M.getUrlParams(), //获取地址栏参数
            wenjianjiaName: "", //文件夹名字
            upPic: {
                have: "",
                list: [],
                folder: [],
                n: 0,
                index: 0,
                arr: [],
                totleNum: ""
            },
            gaodu: "100",
            key: "",
            keys: "",
            host: Lib.C.hostPhotoStudio,
            domain: Lib.C.qiniu.imgmanagesystem.domain,
            token: '',
            onOff: true,
            zancun: "",
            shangCleiXing:{
                "shangchuan":false,
                "leixing":""
            },
            files: ['/static/js/moxie.js', '/static/js/plupload.dev.js', '/static/js/qiniu.js']
        }),
        created() {
            var self = this;
            var name = "end";
            this.key = this.addrQN.id + name + this.addrQN.per + this.addrQN.title;
            this.keys = this.addrQN.id + name + this.addrQN.per + this.addrQN.title;
            Lib.M.loadFiles(this.files);
            this.getToken();
        },
        ready() {
            var self = this;
            bus.$on('finishTwo', function(data) {
                self.$set("wenjianjiaName", data);
            });
            bus.$on('finishFourth', function(data) {
                self.$set("zancun", data);
            });
            setTimeout(() => {
                self.$set("addrQN", Lib.M.getUrlParams());
                this.uploadQNImg();
            }, 1500);
        },
        methods: {
            /***
             *上传图片
             * @param option
             * @param callback {callbackType: //回调类型属于进度回调还是成功回调}
             */
            shuaxin() {
                location.reload()
            },
            distinct(arr) { //去重
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
            downUp() {
                if (parseInt($(".shangchuan").css("bottom")) >= 0) {
                    this.$set("gaodu", "200");
                    $(".shangchuan").css("bottom", "-300px");
                } else {
                    this.$set("gaodu", "100");
                    $(".shangchuan").css("bottom", "0px");
                }
            },
            indexs(index, e) {
                if (e) {
                    this.upPic.have = "you";
                }
                this.upPic.index = index;
                if ($(e.target).html() == "取消上传") {
                    $(e.target).html("已经取消")
                }
            },
            uploadQNImg() {
                const self = this;
                const qiNiuContainer = this.$els.qiNiuContainer;
                const qiNiuButton = this.$els.qiNiuButton;
                const token = this.token;
                const domain = this.domain;
                var Qiniu2 = new QiniuJsSDK();

                var defaultOption = {
                    runtimes: 'html5,flash,html4', // 上传模式，依次退化
                    browse_button: qiNiuButton, // 上传选择的点选按钮，必需
                    uptoken: token, // uptoken是上传凭证，由其他程序生成
                    domain: domain, // bucket域名，下载资源时用到，必需
                    container: qiNiuContainer, // 上传区域DOM ID，默认是browser_button的父元素
                    get_new_uptoken: true, // 设置上传文件的时候是否每次都重新获取新的uptoken
                    max_file_size: '100mb', // 最大文件体积限制
                    max_retries: 3, // 上传失败最大重试次数
                    chunk_size: '4mb', // 分块上传时，每块的体积
                    auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    isCover: true, //是否覆盖,默认为不覆盖
                    filters: {
                        prevent_duplicates: false //不允许选取重复文件
                    },
                    key: 'unPath',
                    dragdrop: true, // 开启可拖曳上传
                    drop_element: qiNiuContainer, //默认路径
                    select_folder: true, //选择文件夹，
                    directory: true, //上传文件夹
                    init: {
                        'FilesAdded': function(up, files) {
                            console.log(files[0].webkitRelativePath);
                            self.$set("shangCleiXing.shangchuan", "kaishi");
                            self.$set("shangCleiXing.leixing", files[0].webkitRelativePath);
                            bus.$emit("finishThree", "clone");
                            self.$set("upPic.totleNum", files.length);
                            console.log(self.upPic.totleNum);
                            // self.$set("upPic.list", []);
                            self.$set("upPic.n", 0);
                            plupload.each(files, function(file) {
                                self.$dispatch('child-qiniu-data', file);
                                self.upPic.folder.push(file.webkitRelativePath);
                                self.upPic.list.push(file);
                                // 文件添加进队列后，处理相关的事情
                            });
                            for (let i = 0; i < self.upPic.list.length; i++) {
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
                            // console.log( self.upPic.n );
                            self.upPic.list[self.upPic.n].percent == 100 ? self.upPic.list[self.upPic.n].percent == 100 : self.upPic.list[self.upPic.n].percent = file.percent;
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
                            bus.$emit("finishOne", "123");
                            if (self.upPic.n <= self.upPic.list.length - 1) {
                                self.upPic.n++;
                            }
                            // for (var i = 0; i < self.upPic.arr.length; i++) {
                            //     if (self.upPic.n == self.upPic.arr[i]) {
                            //         if (self.upPic.n < self.upPic.list.length - 1) {
                            //             self.upPic.n++;
                            //         }
                            //     }
                            // }
                            console.log(self.upPic.n);
                        },
                        'Error': function(up, err, errTip) {
                            self.upPic.n++;
                            console.log(self.upPic.n);
                            Lib.M.topRightInfoTips({
                                title: errTip
                            });
                            //上传出错时，处理相关的事情
                        },
                        'UploadComplete': function() {
                            //队列文件处理完毕后，处理相关的事情 
                            bus.$emit("finishThree", "open");
                            self.$set("wenjianjiaName", self.zancun);
                            console.log("队列完1");
                        },
                        'Key': function(up, file) {
                            self.$set("shangCleiXing.shangchuan", false);
                            // console.log(file)
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在unique_names: false，save_key: false时才生效
                            const options = self.options;
                            let id = sessionStorage.getItem('id');
                            let position = sessionStorage.getItem('position');
                            if (!file.webkitRelativePath) {
                                var b = '';
                                for (var i = 0; i < self.wenjianjiaName.length; i++) {
                                    b = b + "/" + self.wenjianjiaName[i];
                                }
                                if (!b) {
                                    b = b + "/" + "默认文件夹"
                                }
                                self.key = self.keys + b + "/";
                            }
                            if (file.webkitRelativePath) {
                                if (file.webkitRelativePath.split("/")[0]) {
                                    var b = '';
                                    for (var i = 0; i < self.wenjianjiaName.length; i++) {
                                        b = b + "/" + self.wenjianjiaName[i]
                                    }
                                    var houzui = '';
                                    for (var i = 0; i < file.webkitRelativePath.split("/").length - 1; i++) {
                                        houzui = houzui + "/" + file.webkitRelativePath.split("/")[i]
                                    }
                                    self.key = self.keys + b + houzui + "/";
                                } else if (!file.webkitRelativePath.split("/")[0]) {
                                    var b = '';
                                    for (var i = 0; i < self.wenjianjiaName.length; i++) {
                                        b = b + "/" + self.wenjianjiaName[i];
                                    }
                                    var houzui = '';
                                    for (var i = 1; i < file.webkitRelativePath.split("/").length - 1; i++) {
                                        houzui = houzui + "/" + file.webkitRelativePath.split("/")[i];
                                    }
                                    self.key = self.keys + b + houzui + "/";
                                }
                            }
                            let key = self.key;
                            id = id ? id : '888887';
                            key = id + key;
                            key = key.replace(/\,/g, "").replace(/\&/g, "").replace(/\=/g, "").replace(/\ /g, "");
                            if (file.name.indexOf(",") != -1) {
                                file.name = file.name.replace(/\,/g, "");
                            }
                            if (file.name.indexOf("&") != -1) {
                                file.name = file.name.replace(/\&/g, "");
                            }
                            if (file.name.indexOf("=") != -1) {
                                file.name = file.name.replace(/\=/g, "");
                            }
                            if (file.name.indexOf(" ") != -1) {
                                file.name = file.name.replace(/\ /g, "");
                            }
                            // file.name = file.name.replace(/\./, '_'+new Date().getTime()+'.');
                            key += file.name;
                            return key
                        }
                    },
                };
                $('.stop_load').on('click', () => {
                    if (!self.upPic.have) {
                        return false;
                    }
                    if (self.upPic.index < self.upPic.n) {
                        return false;
                    }
                    if (self.upPic.index == self.upPic.n) {
                        if (self.upPic.n <= self.upPic.list.length - 1) {
                            self.upPic.n++;
                        }
                    }
                    if (self.upPic.index > self.upPic.n) {
                        self.upPic.arr.push(self.upPic.index);
                    }
                    // console.log(self.upPic.n+","+self.upPic.index);
                    uploader.removeFile(self.upPic.list[self.upPic.index]);

                });
                $.extend(defaultOption, self.options);
                const uploader = Qiniu2.uploader(defaultOption);
            },

            getToken() {
                var URL = this.host + 'qiNiu/getToken';
                var postParam = {};
                postParam = {
                    // key:"1 (3)"
                };
                Lib.M.load(URL, postParam, (data) => {
                    this.$set('token', data.data.result);
                }, "get");
            }
        },
        components: {

        }
    }
</script>
<style type="text/css" scoped>
    .shangchuan {
        position: fixed;
        right: 0;
        bottom: 0;
        display: none;
        text-align: right;
        z-index: 2;
    }
    
    .neirong {
        height: 300px;
        overflow: auto;
        box-shadow: 0px 3px 15px 0px rgba(9, 2, 4, 0.243);
        border-radius: 6px 0 0 0;
        background: white;
    }
    
    .tuozhuai {
        position: absolute;
        top: 170px;
        left: 150px;
        font-size: 32px;
        font-weight: bold;
        color: #ccc;
    }
    .tuozhuai2{
        color: rgba(255,0,0,0.3); left: 210px;
    }
    .jindu {
        border-radius: 4px 0 0 0;
    }
    
    .shangC {
        border-radius: 4px 4px 0 0;
    }
    
    .tingzhi {
        border-radius: 4px 4px 0 0;
    }
    
    .stop_load {
        background: white
    }
</style>