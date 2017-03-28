<template>
    <div class="turn-page clearfix" style="padding: 8px;">
        <div class="pages">
        	<div v-if="page.pageCount>1">
	            <span style="font-size:14px;padding: 5px 8px;" v-if="page.pageCount>1" @click="pageFn('prev')" class="iconfont icon-fanhui"></span>
	            <span @click="pageFn(1)" v-if="page.pageNo-3>=1">1</span>
	            <em v-if="page.pageNo-3>1">……</em>
	            <template v-for="one in page.pageCount">
	                <span v-if="filterPage($index)" :class="$index+1==page.pageNo?'active':''" @click="pageFn($index+1)" data-index="{{$index+1}}">{{$index+1}}</span>
	            </template>
	            <em v-if="page.pageNo+3<page.pageCount&&page.pageNo+3+1!=page.pageCount">……</em>
	            <span @click="pageFn(page.pageCount)" v-if="page.pageNo+3<page.pageCount">{{page.pageCount}}</span>
                <span style="font-size:14px;padding: 5px 8px;" v-if="page.pageCount>1" @click="pageFn('next')" class="iconfont icon-xiangyou"></span>
	        </div>
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
                page: {
                    pageCount: 1,
                    pageNo: 1
                }
            }
        },
        ready: function(){
            this.sumPageFn()
        },
        watch: {
            'turnPage' (obj){
                this.sumPageFn()
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
            }
        },
        methods: {
            //计算页数
            sumPageFn (){
				const turnPage = this.turnPage;
				let pageSize = turnPage.pageSize;
                let totalCount = turnPage.totalCount;
                this.$set('page', turnPage);
                this.$set('page.pageCount', Math.ceil(totalCount/pageSize));
            },
            //翻页
            pageFn: function(index){
                let pageNo = this.page.pageNo;
                let pageCount = this.page.pageCount;
                switch (index){
                    case 'prev':
                        pageNo--;
                        break;
                    case 'next':
                        pageNo++;
                        break;
                    default :
                        pageNo = index;
                }
                if(pageNo<1){
                    pageNo = 1;
                }else if(pageNo>pageCount){
                    pageNo = pageCount;
                }
                this.$set('page.pageNo', pageNo);
                this.dispatchParent();
            },
            //子组件派发消息给父组件
            dispatchParent: function(){
                this.$dispatch('child-turn-page', this.page);
            },
            //过滤翻页
            filterPage (index){
                return (this.page.pageNo-3<=index && index<this.page.pageNo+3)
            }
        }
    }
</script>
<style type="text/css" scoped>
    .turn-page{
        text-align: center;
    }
    .pull-right {
        float:none;
    }
    .turn-page .pages span{
        height: 2rem;
        background: white;
        padding: 0.3rem 1rem;border: solid 1px #bfbfbf;
        color: #2b2b2b;
        -webkit-border-radius: 0.2rem;
        -moz-border-radius: 0.2rem;
        border-radius: 0.2rem;
        margin: 0 4px;
        cursor: pointer;
    }
    .turn-page .pages span:hover,
    .turn-page .pages span.active{
        background: #337ab7; color: white; border: solid 1px #337ab7;
    }
</style>