<template lang="html">
    <div class="modal fade" :class="{in: modal.show}" v-show="modal.show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click="modal.show=false">
                        <span>&times;</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title">删除</h4>
                </div>
                <div class="modal-body">
                    <p>确定删除【{{modal.title}}】？</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default"  @click="modal.show=false">取消</button>
                    <button type="button" class="btn btn-primary" @click="sureFn">确定删除</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <div class="modal-backdrop fade" :class="{in: modal.show}" v-show="modal.show"></div>
</template>
<script>
    import Lib from '../../assets/lib'
    export default{
        data: () => ({
            modal: {
                show: false,
                title: '删除模太框'
            }
        }),
        events: {
            'parent-delete-data' (obj){
                $.extend(this.modal, obj);
            }
        },
        methods: {
            sureFn (){
                const URL = this.modal.url;
                Lib.M.load(URL,'',(data)=>{
                    if(data.code==-1){
                        this.$set('modal.show', false);
                        this.$dispatch('child-delete-modal',{delete: true});
                        Lib.M.topRightInfoTips({title: '删除成功！', color: 'success'});
                    }else{
                        Lib.M.topRightInfoTips({content: data.sub_msg});
                    }
                },'delete')
            }
        }
    }
</script>