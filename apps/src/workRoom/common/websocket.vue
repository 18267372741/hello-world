<template lang="html">
    <div class="infosss">
        
    </div>
    <audio id="bgMusic">
        <source src="http://ofw0ozozx.bkt.clouddn.com/song.mp3" type="audio/mp3">
    </audio>
</template>
<script>
    import Lib from '../../assets/lib.js'
    import bus from '../bus.js'
    export default {
        data: () => ({
            id: sessionStorage.getItem("id"),
            host: Lib.C.hostPhotoStudio,
            qnyUrl: Lib.C.qiniu.jsUrl,
            getSocketNum: 0
        }),
        created: function() {
            this.getSocket();
        },
        ready: function() {
            this.guanbi();
        },
        methods: {
            guanbi() {
                $('.ddd').click(function() {
                    $('.alert').css("display", "none");
                })
            },
            getSocket: function() {
                var option,
                    style = '',
                    html = '';
                $('.alert .close').click();
                option = {
                    color: 'danger',
                    title: '',
                    content: '',
                    time: '100000'
                };
                var setT = setTimeout(function() {
                    $('.alert .close').click();
                }, option.time);
                $('.alert').on('click', '.close', function() {
                    clearInterval(setT);
                });
                $('.alert').on('mouseover', function() {
                    clearInterval(setT);
                });
                $('.alert').on('mouseout', function() {
                    setT = setTimeout(function() {
                        $('.alert .close').click();
                    }, option.time);
                });
                var self = this;
                var sockjsAddr = "118.178.236.192:8080" + "/scoket/join/" + "wor" + this.id;
                var sockjsClient;
                var nickName = localStorage.getItem('position');
                var onopen = function() {
                    console.log('open')
                };
                var onmessage = function(e) {
                    console.log(e);
                    bus.$emit("finishThree", "open");
                    if (e.data == '绑定成功' || e.data == '该微信已绑定其他账号') {
                        Lib.M.topRightInfoTips({
                            title: e.data
                        });
                    } else {
                        var audio = document.getElementById("bgMusic");
                        html = '<div class="alert alert-' + option.color + ' alert-dismissible fade in" style="' + style + '" role="alert"> ' +
                            '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span></button> ' +
                            '<span>' + e.data + '</span> ' + '<button style="position:absolute;right:0" class="ddd btn btn-danger btn-xs"> 全部关闭 </button>' + ' </div>';
                        $('.infosss').append(html);
                        audio.play();
                        self.guanbi();
                    }
                };
                var onclose = function() {
                    console.log('close');
                    this.getSocketNum++;
                    if (this.getSocketNum < 10) {
                        this.getSocket();
                    }
                };
                // var sockjsClient = new WebSocket('ws://118.178.236.192:8080'+ "/scoket/join/"+"emp"+this.id;);
                sockjsClient = new WebSocket('ws:' + sockjsAddr);
                sockjsClient.onopen = onopen;
                sockjsClient.onmessage = onmessage;
                sockjsClient.onclose = onclose;
            },
        }
    }
</script>
<style scoped>
    .infosss {
        width: 300px;
        position: fixed;
        right: 0px;
        bottom: 64px;
    }
    
    .ddd {
        position: absolute;
        right: 0;
    }
</style>