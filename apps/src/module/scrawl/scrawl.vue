<template>
	<div align="center" v-show="scrawlOption.show">
		<div v-el:scrawl-obj class="img-thumbnail tupian scrawl">
			<canvas :class="{'gaodu':daxiao=='bad'}" :class="{'touming':finish!='finish'}" v-el:scrawl-canvas></canvas>
			<ul class="scrawlSelText" v-el:scrawl-sel-text>
				<li>颜色调整</li>
				<li>修瘦</li>
				<li>穿帮修掉</li>
				<li>衣服褶皱修饰</li>
				<li>服饰修补完整</li>
				<li>卡子修掉</li>
				<li>凌乱头发修掉</li>
				<li>抬头纹修掉</li>
				<li>眼袋淡化</li>
				<li>鱼尾纹修掉</li>
				<li>双下巴修掉</li>
				<li>耳钉、双眼皮胶带修掉</li>
				<li>牙齿修饰</li>
				<li>脖子皱纹修掉</li>
				<li>胸贴修掉</li>
				<li>岔线、别针、线头修掉</li>
				<li>腰带断裂修饰</li>
				<li>袜子外漏修掉</li>
				<li>皮鞋脏烂修掉</li>
				<li>纹身修掉</li>
				<li>背景脏烂修饰</li>
				<li>雀子、瘊子修掉</li>
			</ul>
		</div>
		<div class="scrawl-control-ops">
			<button type="button" class="btn btn-primary" @click="clearArea">清空画板</button>
			划线宽度 :
			<select v-model="scrawlSelWidth">
				<option value="1">1</option>
				<option value="3">3</option>
				<option value="5">5</option>
				<option value="7">7</option>
				<option value="9">9</option>
			</select>
			线条颜色 :
			<select v-model="scrawlSelColor">
				<option value="black">黑色</option>
				<option value="blue">蓝色</option>
				<option value="red">红色</option>
				<option value="green">绿色</option>
				<option value="yellow">黄色</option>
				<option value="gray">灰色</option>
			</select>
		</div>
	</div>
	<div v-if="finish!='finish'" class="load1">
		<div class="loader"></div>
	</div>
	<img v-on:load="loading" v-el:scrawl-img crossOrigin="Anonymous" style="display: none" :src="scrawlOption.sourceImg">
</template>
<script>
    export default {
        props: {
            scrawlOption: Object
        },
        data: () => ({
            URL: document.URL.split("#")[1].split("/")[2].split("?")[0],
            ctx: '',
            lastX: 0,
            lastY: 0,
            scrawlSelWidth: 3,
            scrawlSelColor: 'red',
            scrawlSelText: '请选择',
            ctxT: '',
            canvasText: '',
            textOption: {
                x: null,
                y: null
            },
            finish: "", //终止
            daxiao: "good" //终止
        }),
        ready() {
            this.$nextTick(function() {
                this.InitThis();
            });
            //右键
            this.clickRight();
        },
        events: {
            'child-msg': function(msg) {
                this.$set("finish", "");
                console.log(msg);
            },
            'child-bigPic':function(msg){
                this.$set("daxiao", msg);
            }
        },
        methods: {
            loading() {
                this.$set("finish", "finish");
                // console.log(this.finish);
            },
            //右键事件
            clickRight() {
                var self = this;
                var scrawlObj = this.$els.scrawlObj;
                var scrawlSelText = this.$els.scrawlSelText;
                scrawlObj.addEventListener("contextmenu", (e) => {
                    //阻止默认的右键事件
                    e.preventDefault();
                    //新菜单位置跟随鼠标
                    // console.log(e);
                    scrawlSelText.style.left = e.screenX + "px";
                    scrawlSelText.style.top = e.offsetY + "px";
                    this.$set('textOption.x', e.layerX);
                    this.$set('textOption.y', e.offsetY + 10);
                    //显示菜单
                    scrawlSelText.style.visibility = "visible";
                    $(scrawlObj).css({
                        overflow: 'hidden'
                    });
                });
                scrawlObj.addEventListener("click", function(e) {
                    $(scrawlObj).css({
                        overflow: 'auto'
                    });
                    scrawlSelText.style.visibility = "hidden";
                });
                //添加text
                $(scrawlSelText).find('li').on('click', function() {
                    self.initText($(this).text(), self.textOption.x, self.textOption.y);
                });
            },
            //初始化添加文字
            initText(txt, x, y) {
                var ctx = '';
                const scrawlCanvas = this.$els.scrawlCanvas;
                ctx = scrawlCanvas.getContext("2d");
                this.$set('canvasText', scrawlCanvas);
                this.$set('ctxT', ctx);
                this.DrawText(txt, x, y);
            },
            //画文字
            DrawText(txt, x, y) {
                console.log(this.URL)
                if (this.URL == "downPic1") {
                    x = x + 138
                }
                var ctx = this.ctxT;
                ctx.strokeStyle = this.scrawlSelColor;
                ctx.lineWidth = 1;
                ctx.font = "22px serif";
                ctx.textBaseline = "ideographic";
                ctx.strokeText(txt, x, y);
            },
            //初始化 划线
            InitThis() {
                var ctx = this.ctx;
                const scrawlCanvas = this.$els.scrawlCanvas;
                ctx = scrawlCanvas.getContext("2d");
                this.$set('scrawlOption.scrawlCanvas', scrawlCanvas);
                this.$set('ctx', ctx);
                this.loadImg();
                this.getEvent();
            },
            //获取事件
            getEvent() {
                var mousePressed = false;
                const self = this;
                const scrawlCanvas = this.$els.scrawlCanvas;
                $(scrawlCanvas).mousedown(function(e) {
                    mousePressed = true;
                    self.Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
                });

                $(scrawlCanvas).mousemove(function(e) {
                    if (mousePressed) {
                        self.Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
                    }
                });

                $(scrawlCanvas).mouseup(function(e) {
                    mousePressed = false;
                });
                $(scrawlCanvas).mouseleave(function(e) {
                    mousePressed = false;
                });
            },
            //加载图片
            loadImg() {
                var ctx = this.ctx;
                const scrawlCanvas = this.$els.scrawlCanvas;
                const scrawlImg = this.$els.scrawlImg;
                var callback = function(image) {
                    if (!image) image = this;
                    scrawlCanvas.width = scrawlImg.width;
                    scrawlCanvas.height = scrawlImg.height;
                    ctx.drawImage(scrawlImg, 0, 0, scrawlImg.width, scrawlImg.height, 0, 0, scrawlImg.width, scrawlImg.height);
                };
                if (scrawlImg.complete) { //check if image was already loaded by the browser
                    callback(scrawlImg);
                } else {
                    scrawlImg.onload = callback;
                }
            },
            //画线
            Draw(x, y, isDown) {
                var lastX = this.lastX,
                    lastY = this.lastY;
                const ctx = this.ctx;
                const scrawlSelWidth = this.scrawlSelWidth;
                const scrawlSelColor = this.scrawlSelColor;
                if (isDown) {
                    ctx.beginPath();
                    ctx.strokeStyle = scrawlSelColor;
                    ctx.lineWidth = scrawlSelWidth;
                    ctx.lineJoin = "round";
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(x, y);
                    ctx.closePath();
                    ctx.stroke();
                }
                lastX = x;
                lastY = y;
                this.$set('lastX', lastX);
                this.$set('lastY', lastY);
            },
            //清除区域
            clearArea() {
                const ctx = this.ctx;
                // Use the identity matrix while clearing the canvas
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                this.loadImg();
            },
            //上传涂鸦至七牛
            uploadCrawl() {
                const scrawlCanvas = this.$els.scrawlCanvas;
                this.putb64(scrawlCanvas.toDataURL("image/jpeg", 0.9));
            },
            putb64(b64) {
                const self = this;
                const token = Lib.M.load(this.host + Lib.C.qiniu.URL, {
                    bucketname: Lib.C.qiniu.ldmall.name
                })[0].result;
                const pic = b64.split("base64,")[1];
                const optionKey = this.scrawlOption.key ? this.scrawlOption.key : 'unPath';
                let name = new Date().getTime();
                let key = Lib.M.b64EncodeUnicode(this.merchantId + "/" + optionKey + '/' + name).replace(/\|/g, '%7c').replace(/\+/g, '-').replace(/\//g, '_');
                let url = "http://upload.qiniu.com/putb64/-1/key/" + key + "/";
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            const getUrl = self.domain + JSON.parse(xhr.responseText).key;
                            self.$set('scrawlOption.scrawlSrc', getUrl);
                            self.$set('scrawlOption.show', false);
                        }
                    }
                };
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-Type", "application/octet-stream");
                xhr.setRequestHeader("Authorization", 'UpToken ' + token);
                xhr.send(pic);
            }
        }
    }
</script>
<style scoped>
    .touming {
        opacity: 0
    }
    .gaodu{
        height: 900px;
    }
    .load1 .loader,
    .load1 .loader:before,
    .load1 .loader:after {
        background: #FFF;
        -webkit-animation: load1 1s infinite ease-in-out;
        animation: load1 1s infinite ease-in-out;
        width: 1em;
        height: 4em;
    }
    
    .load1 .loader:before,
    .load1 .loader:after {
        position: absolute;
        top: 0;
        content: '';
    }
    
    .load1 .loader:before {
        left: -1.5em;
    }
    
    .load1 .loader {
        text-indent: -9999em;
        margin: 40% auto;
        position: relative;
        font-size: 11px;
        -webkit-animation-delay: 0.16s;
        animation-delay: 0.16s;
    }
    
    .load1 .loader:after {
        left: 1.5em;
        -webkit-animation-delay: 0.32s;
        animation-delay: 0.32s;
    }
    
    @-webkit-keyframes load1 {
        0%,
        80%,
        100% {
            box-shadow: 0 0 #FFF;
            height: 4em;
        }
        40% {
            box-shadow: 0 -2em #ffffff;
            height: 5em;
        }
    }
    
    @keyframes load1 {
        0%,
        80%,
        100% {
            box-shadow: 0 0 #FFF;
            height: 4em;
        }
        40% {
            box-shadow: 0 -2em #ffffff;
            height: 5em;
        }
    }
    
    .load1 {
        position: absolute;
        top: 38%;
        left: 48%;
    }
    
    .scrawl-control-ops {
        padding: 10px 0;
        background: white;
        width: 65%;
        border-radius: 4px;
        margin-bottom: 12px;
    }
    
    .tupian {
        min-height: 300px;
        width: 100%;
        margin-bottom: 30px;
        background: rgba(0, 0, 0, 0);
        border: 0
    }
    
    .scrawl>.scrawlSelText {
        position: fixed;
        visibility: hidden;
        z-index: 3;
        overflow-y: auto;
        width: 180px;
        background: #ffffff;
        text-align: left;
        margin: 0;
        padding: 10px;
        border-radius: 4px;
        box-shadow: 0 0 1px 0 #c0c0c0;
    }
    
    .scrawl>.scrawlSelText li {
        list-style: none;
        padding: 0 6px;
    }
    
    .scrawl>.scrawlSelText li:hover {
        background: #337ab7;
        color: #ffffff;
    }
    
    .scrawl-control-ops {
        margin-top: 6px;
    }
    
    .scrawl-control-ops button {
        display: inline-block;
        margin: 10px;
    }
</style>