/**
 * Created by apple on 16/6/29.
 */

UE.registerUI('dialog',function(editor,uiName){
    //创建dialog
    var dialog = new UE.ui.Dialog({
        //指定弹出层中页面的路径，这里只能支持页面,因为跟addCustomizeDialog.js相同目录，所以无需加路径
        iframeUrl:'static/static/ueditor/dialogs/custom/addCustomizeUpload.html',
        //需要指定当前的编辑器实例
        editor:editor,
        //指定dialog的名字
        name:uiName,
        //dialog的标题
        title:"上传图片",

        //指定dialog的外围样式
        cssRules:"width:600px;height:300px;",

        //图片上传位置
        uploadPath: editor.options.uploadPath,

        //如果给出了buttons就代表dialog有确定和取消
        buttons:[
            {
                className:'edui-okbutton',
                label:'确定',
                onclick:function (e, a) {
                    if(dialog.content&&dialog.content.length){
                        var hasChecked = false;
                        for(var i=0;i<dialog.content.length;i++){
                            var one = dialog.content[i];
                            if(one.checked){
                                hasChecked = true;
                                one.url = one.domain+one.imgUrl;
                                editor.execCommand('insertimage', {
                                    src: one.url,
                                    width: 'auto',
                                    height: 'auto'
                                });
                            }
                        }
                        if(hasChecked){
                            dialog.close(true);
                        }else{
                            alert('请点击图片进行选择!')
                        }
                    }else{
                        alert('请点击图片进行选择!')
                    }
                }
            },
            {
                className:'edui-cancelbutton',
                label:'取消',
                onclick:function () {
                    dialog.close(false);
                }
            }
        ]});

    //参考addCustomizeButton.js
    var btn = new UE.ui.Button({
        name:'上传图片',
        title:'上传图片',
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -726px -76px;',
        onclick:function () {
            //渲染dialog
            dialog.render();
            dialog.open();
        }
    });

    return btn;
}/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);