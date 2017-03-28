<template>
	<h1>涂鸦demo</h1>
	<button typeof="button" @click="scrawlFn">添加备注说明</button>
	<button typeof="button" @click="sureScrawl">确定上传</button>
	<t-scrawl :scrawl-option.sync="scrawlOption"></t-scrawl>
</template>
<script>
	import Lib from '../assets/lib'
	import TScrawl from '../module/scrawl/scrawl.vue'
	export default{
		data: ()=>({
			host: Lib.C.hostPhotoStudio,
			merchantId: localStorage.getItem('id'),
			scrawlOption: {
				sourceImg: '',//原图地址，必传
				key: 'yinglou'//路径，不用包括merchantId，默认带有
			}
		}),
		methods: {
			scrawlFn (){
				this.$set('scrawlOption.show', true);
				this.$set('scrawlOption.sourceImg', 'http://qiniu.ludanmall.com/283/commendList/player/%E4%BA%8C%E7%BB%B4%E7%A0%81_1479206450334.jpg');
			},
			sureScrawl (){
				const scrawlCanvas = this.scrawlOption.scrawlCanvas;
				if(scrawlCanvas){
					this.putb64(scrawlCanvas.toDataURL("image/jpeg", 0.9));
				}
			},
			//上传至七牛
			putb64 (b64){
				const self = this;
				const token = Lib.M.load(this.host+Lib.C.qiniu.URL,'','','GET').data.result;
				const pic = b64.split("base64,")[1];
				const optionKey = this.scrawlOption.key?this.scrawlOption.key:'unPath';
				let name = new Date().getTime();
				let key = Lib.M.b64EncodeUnicode(this.merchantId+"/"+optionKey+'/'+name).replace(/\|/g, '%7c').replace(/\+/g, '-').replace(/\//g, '_');
				let url = "http://upload.qiniu.com/putb64/-1/key/"+key+"/";
				let xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function(){
					if (xhr.readyState==4){
						if(xhr.status == 200){
							const getUrl = self.domain + JSON.parse(xhr.responseText).key;
							console.log(getUrl)
							self.$set('scrawlOption.scrawlSrc', getUrl);
							self.$set('scrawlOption.show', false);
						}
					}
				};
				xhr.open("POST", url, true);
				xhr.setRequestHeader("Content-Type", "application/octet-stream");
				xhr.setRequestHeader("Authorization", 'UpToken '+token);
				xhr.send(pic);
			}
		},
		components: {
			TScrawl
		}
	}
</script>