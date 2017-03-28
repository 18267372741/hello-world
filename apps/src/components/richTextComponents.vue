<template lang="html">
    <div class="editor-sidebar">
        <div v-el:rich-editor></div>
    </div>
</template>
<script>
    import M from '../assets/common'

    export default {
        data: () => ({
            files: [
	            '../../../static/ueditor/ueditor.config.js', 
	            '../../../../static/ueditor/ueditor.all.min.js',
	            '../../../../static/ueditor/dialogs/custom/addCustomizeUpload.js',
	            '../../../../static/ueditor/dialogs/custom/addCustomizeVideo.js'
            ],
            ueditor: '',
            richTextData: {}
        }),
        created() {
            M.loadFiles(this.files);
        },
        ready() {
            this.richTextFn();
        },
        events: {
            /***
             * 获取来自父级的content
             * @param content 字符串
             * @returns {boolean}
             */
            'parent-rich-text-data' (content){
                const ueditor = this.ueditor;
                if(!ueditor) return false;
                //对编辑器的操作最好在编辑器ready之后再做
                ueditor.ready(function () {
                    ueditor.setContent(content);
                });
            }
        },
        methods: {
            richTextFn() {
                const self = this;
                const editorObj = this.$els.richEditor;
                let ueditor;
                ueditor = UE.getEditor(editorObj, {
                    initialFrameHeight: 500,
//		            initialFrameWidth: 920,
                    zIndex: 9,
                    toolbars: [
                        ['help', 'undo', 'redo', 'forecolor', 'backcolor', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'autotypeset',
	                        'blockquote', 'pasteplain', 'insertorderedlist', 'insertunorderedlist', 'lineheight', 'customstyle', 'paragraph', 'fontfamily', 'fontsize',
	                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'imagenone', 'imageleft', 'imageright', 'imagecenter', 'insertvideo', 'music', 'attachment', 'map', 'pagebreak',
	                        'template', 'horizontal', 'date', 'time', 'spechars', 'inserttable', 'deletetable', 'dialog','video'
	                    ]
                    ]
                });
                this.$set('ueditor', ueditor);
                ueditor.on('contentChange', function() {
                    const content = ueditor.getContent();
                    self.$dispatch('child-rich-text-data',content);
                });
            }
        }
    }
</script>