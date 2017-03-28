<template lang="html">
	<div class="row box">
		
	</div>		
</template>

<script>
import Lib from '../assets/lib.js'
export default {
	data: () => ({
		addr:Lib.M.getUrlParams(),//获取地址栏参数
		qnyUrl:Lib.C.qiniu.jsUrl,
    	id: sessionStorage.getItem("id"),
    	workInfoId: sessionStorage.getItem("workInfoId"),
    	host: Lib.C.hostPhotoStudio,
	}),
	watch: {},
	created: function () {
		
	},
	ready: function () {  },
	methods: {
		bale: function(){//打包下载
			
		},
	},
	components: {
		
	}
}
</script>
<style lang="less" scoped>
@import url("../assets/css/photoStudio/sendOrder.css");

</style>