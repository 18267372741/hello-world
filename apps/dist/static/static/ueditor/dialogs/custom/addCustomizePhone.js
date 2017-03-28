/**
 * Created by apple on 2016/12/17.
 */
UE.registerUI('phone',function(editor,uiName){
	//创建dialog
	var dialog = new UE.ui.Dialog({
		//指定弹出层中页面的路径，这里只能支持页面,因为跟addCustomizeDialog.js相同目录，所以无需加路径
		iframeUrl:'static/ueditor/dialogs/custom/addCustomizePhone.html',
		//需要指定当前的编辑器实例
		editor:editor,
		//指定dialog的名字
		name: uiName,
		//dialog的标题
		title: "添加电话号码",

		//指定dialog的外围样式
		cssRules:"width:300px;height:100px;",

		//如果给出了buttons就代表dialog有确定和取消
		buttons:[
			{
				className:'edui-okbutton',
				label:'确定',
				onclick:function (e, a) {
					if(dialog.content){
						editor.execCommand('inserthtml', dialog.content);
						dialog.close();
					}else{
						alert('请填写电话号码!');
					}
				}
			},
			{
				className:'edui-cancelbutton',
				label:'取消',
				onclick:function () {
					dialog.close();
				}
			}
		]
	});

	//参考addCustomizeButton.js
	var btn = new UE.ui.Button({
		name:'添加电话号码',
		title:'添加电话号码',
		//需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
		cssRules :'background-position: -728px -100px;',
		onclick:function () {
			//渲染dialog
			(dialog.content || dialog.content == '') && (delete dialog.content);
			dialog.iframeUrl = "static/ueditor/dialogs/custom/addCustomizePhone.html";
			dialog.render();
			dialog.open();
		}
	});

	return btn;
}/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);