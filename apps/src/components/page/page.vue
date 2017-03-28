<template>
    <div class="turn-page clearfix col-sm-12">
        <div class="shuaxin">
            <i @click="shuaxin" class="iconfont icon-shuaxin"></i>
        </div>
        <div @click.stop="xianshi" v-if="URL=='recOrder'||URL=='orderMan'" class="sousuo">
            <i class="iconfont icon-sousuo"></i>
            <input @keyup.enter="sousuos" type="text" v-model="sousuo">
        </div>
        <div class="pages">
            <span @click="pageFn('first')" class="iconfont icon-fanyezuo"></span>
            <span @click="pageFn('prev')" class="iconfont icon-icofanyezuo"></span>
            <span>页码</span>
            <input type="number" class="form-control shuru" v-model='index'>
            <span>共{{page.pageCount}}页</span>
            <span @click="pageFn('next')" class="iconfont icon-icofanyeyou"></span>
            <span @click="pageFn('last')" class="iconfont icon-fanyeyou"></span>
       	</div>
        <div class="bangzhu">
            <span>
                <a v-if="URLS=='photoStudio.html'" target="_black" href="http://www.17xiutu.com/phoHelpCenter.html">帮助中心</a>
                <a v-if="URLS!='photoStudio.html'" target="_black" href="http://www.17xiutu.com/helpCenter.html">帮助中心</a>
            <span class="wenhao">?</span></span>
        </div>
    </div>
</template>
<script> 
    export default {
        props: {
            turnPage: Object
        },
        data: function(){
            return {
                URL: '',
                URLS: '',
                page: {
                    pageCount: 1,
                    pageNo: 1
                },
                index:1,
                sousuo:''
            }
        },
        ready: function(){
            this.$set( "URL",document.URL.split("#")[1].split("/")[2].split("?")[0] );
            this.$set( "URLS",document.URL.split("#")[0].split("/")[document.URL.split("#")[0].split("/").length-1] );
            this.sumPageFn();
            this.xiaoshiAN();
        },
        watch: {
            'turnPage' (obj){
                this.sumPageFn()
            },
            'index' (val){
                val && this.pageFn(val);
            }
        },
        events: {
            /***
             * 来自父组件的消息
             * @param obj
             * {pageSize:'一页条数',
             * totalCount:'总条数',
             * pageNo:'当前是第几页'}
             */
            'parent-turn-page': function(obj){
                let pageSize = obj.pageSize;
                let totalCount = obj.totalCount;
                this.$set('page', obj);
                this.$set('page.pageCount', Math.ceil(totalCount/pageSize));
            },
            'parent-turn-pageTu': function(obj){
                let pageSize = obj.pageSize;
                let totalCount = obj.totalCount;
                this.$set('page', obj);
                this.$set('page.pageCount', Math.ceil(totalCount/pageSize));
            }
        },
        methods: {
            //计算页数
            shuaxin (){
                location.reload()
            },
            sumPageFn (){
				const turnPage = this.turnPage;
                this.$set("index",turnPage.pageNo);
                let pageNo = turnPage.pageNo;
				let pageSize = turnPage.pageSize;
                let totalCount = turnPage.totalCount;
                this.$set('page', turnPage);
                if(!pageNo){
                    this.index = 1;
                }
                if(!totalCount){ totalCount = 1 }
                if(!pageSize){ pageSize = 1 }
                this.$set('page.pageCount', Math.ceil(totalCount/pageSize));
            },
            //翻页
            pageFn: function(index){
                let pageNo = this.page.pageNo;
                let pageCount = this.page.pageCount;
                if(!pageCount){ pageCount = 1 }
                if(!pageNo){ pageNo = 1 }
                switch (index){
                    case 'prev':
                        pageNo--;
                        break;
                    case 'next':
                        pageNo++;
                        break;
                    case 'first':
                        pageNo=1;
                        break;
                    case 'last':
                        pageNo=pageCount;
                        break;
                    default :
                        pageNo = index;
                }
                if(pageNo<1){
                    pageNo = 1;
                }else if(pageNo>pageCount){
                    pageNo = pageCount;
                }
                this.$set("index",pageNo);
                this.$set('page.pageNo', pageNo);
                this.dispatchParent();
            },
            //子组件派发消息给父组件
            dispatchParent (){
                this.$dispatch('child-turn-page', this.page);
                this.$dispatch('child-turn-pageTu', this.page);
            },
            sousuos (){
                this.$dispatch('child-sousuo',this.sousuo );
            },
            xianshi (){
                $(".sousuo input").css("display","block")
            },
            xiaoshiAN (){
                $(window).click(function(event){
                    event.stopPropagation();
                    $(".sousuo input").css("display","none");
                })
            }
        }
    }
</script>
<style type="text/css" scoped>
    .clearfix{
        text-align: center; padding: 14px 0; background: #f1f2f9; position: relative;
    }
    .pages {
        overflow: hidden;padding: 6px 0;width: 452px; margin: 0 auto;
    }
    .shuru{
        width: 80px; background: rgba(0,0,0,0); float: left; height: 40px
    }
    .pages span{
        font-size: 17px; line-height: 38px; float: left; padding: 0 10px;
    }
    .pages .iconfont{
        font-size: 34px; color: #275482; margin-top: 2px;
    }
    .pages .iconfont:hover{
        color: #909090;
    }
    .shuaxin{
        position: absolute; top: 12px; left: 90px;
    }
    .shuaxin .iconfont:hover{
         color: #909090;
    }
    .icon-shuaxin{
        font-size: 40px; color: #275482;
    }
    .sousuo{
        position: absolute; top: 10px; left: 150px;
    }
    .sousuo .iconfont{
        float: left;
     }
    .sousuo input{
        width: 140px; height: 36px; border-radius: 4px; border: 1px solid #ccc; float: left;  margin-top: 12px; display: none;
    }
    .sousuo .iconfont:hover{
         color: #909090
    }
    .icon-sousuo{
        font-size: 38px; color: #275482;
    }
    .bangzhu{
        position: absolute; top: 28px; right: 90px;color: #275482; font-size: 16px;
    }
    .wenhao{
        width: 20px;height: 20px;text-align: center;line-height: 20px;background: #275482;color: white;display: inline-block; border-radius: 50%;
        margin-left: 6px;
    }
</style>