/*公用js*/
export default {
	//各种选项
	option: {
		key: ''
	},
	/**
	 *
	 * @param url 请求地址
	 * @param params 上传至后台参数
	 * @param callback 回调
	 * @param type ajax请求接口
	 */
	load: function(url, params, callback, type) {
		var result = "";
		var self = this;
		$.ajax({
			async: callback ? true : false,
			timeout: 150000,
			type: type ? type : 'POST',
			url: url,
			data: params,
			processData: true,
			datatype: 'json',
			success: function(data) {
				var curData = '';
				if(data.responseData && data.responseData.data) {
					curData = data.responseData.data;
				} else if(data.response && data.response.sub_msg) {
					curData = data.response;
					if(data.response.code == 3) {
						self.topRightInfoTips({
							content: data.response.sub_msg
						});
						setTimeout(function() {
							location.href = '/unlogin/login.html';
						}, 2000);
					}
				} else {
					curData = data;
				}

				if(callback) {
					callback(curData);
				} else {
					result = curData;
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				self.topRightInfoTips({
					content: XMLHttpRequest + textStatus + errorThrown
				});
			}
		});
		return result;
	},
	/**
	 * 解析URL返回GET参数,可以手动传入如:aa=bb&cc=dd
	 *
	 * @param  {[type]}  purl        地址
	 * @param  {Boolean} isNoToLower 是否全部变为小写
	 *
	 * @return {Object}
	 */
	getUrlParams: function(purl, isNoToLower) {
		isNoToLower = isNoToLower || false;
		var url = purl || window.location.href;
		var paraObj = {};
		var j = 0;
		if(url.indexOf('?') < 0) {
			return paraObj;
		}
		url = url.replace('#', '');
		var paraString = url.substring(url.indexOf('?') + 1, url.length)
			.split('&');
		if(!isNoToLower) {
			for(var i = 0; j = paraString[i]; i++) {
				paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] =
					j.substring(j.indexOf('=') + 1, j.length);
			}
		} else {
			for(var i = 0; j = paraString[i]; i++) {
				try {
					paraObj[j.substring(0, j.indexOf('='))] =
						decodeURIComponent(j.substring(j.indexOf('=') +
							1, j.length));
				} catch(ex) {
					paraObj[j.substring(0, j.indexOf('='))] =
						unescape(j.substring(j.indexOf('=') + 1, j.length));
				}
			}
		}
		return paraObj;
	},
	/***
	 *  警告框
	 * @param options
	 * {color:'warning',//warning 黄色,success 绿色,info 蓝色,danger 红色
	 * title:'警告!',//标题
	 * content:''//内容
	 * }
	 */

	topRightInfoTips: function(options) {
		var option,
			style = 'position: fixed;right:45%;top:40%;font-size: 16px;z-index: 2050;',
			html = '';
		$('.alert .close').click();
		option = {
			color: 'info',
			title: '警告!',
			content: '',
			time: '3000'
		};
		$.extend(option, options);
		html = '<div class="alert alert-' + option.color + ' alert-dismissible fade in" style="' + style + '" role="alert"> ' +
			'<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span></button> ' +
			'<span>' + option.title + '</span> ' + option.content + ' </div>';
		$('body').append(html);
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
	},
	/**
	 * 锁定页面
	 *
	 * @param obj vue对象 消息文本
	 * @param {data} JSON 将数据传给子组件，lockPage
	 *
	 * @return {void}
	 */
	lockPage: function(obj, data) {
		obj.$broadcast('parent-lock-page-data', data);
	},
	/**
	 * 解除锁定页面
	 *@param obj vue对象
	 * JSON 将数据传给子组件，lockPage
	 */
	unLockPage: function(obj) {
		obj.$broadcast('parent-lock-page-data', {show:false});
	},
	/***
	 *
	 * @param content 需要拷贝的内容
	 * @constructor
	 */
	CopyToClipboard: function(content) {
		var textToClipboard = content;

		var success = true;
		if(window.clipboardData) { // Internet Explorer
			window.clipboardData.setData("Text", textToClipboard);
		} else {
			// create a temporary element for the execCommand method
			var forExecElement = this.CreateElementForExecCommand(textToClipboard);

			/* Select the contents of the element
			 (the execCommand for 'copy' method works on the selection) */
			this.SelectContent(forExecElement);

			var supported = true;

			// UniversalXPConnect privilege is required for clipboard access in Firefox
			try {
				if(window.netscape && netscape.security) {
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				}

				// Copy the selected content to the clipboard
				// Works in Firefox and in Safari before version 5
				success = document.execCommand("copy", false, null);
			} catch(e) {
				success = false;
			}

			// remove the temporary element
			document.body.removeChild(forExecElement);
		}

		if(success) {
			this.topRightInfoTips({
				type: 'success',
				title: '恭喜您,拷贝成功!'
			});
		} else {
			this.topRightInfoTips({
				type: 'success',
				title: 'sorry,拷贝失败!'
			});
		}
	},
	SelectContent: function(element) {
		// first create a range
		var rangeToSelect = document.createRange();
		rangeToSelect.selectNodeContents(element);

		// select the contents
		var selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(rangeToSelect);
	},
	CreateElementForExecCommand: function(textToClipboard) {
		var forExecElement = document.createElement("div");
		// place outside the visible area
		forExecElement.style.position = "absolute";
		forExecElement.style.left = "-10000px";
		forExecElement.style.top = "-10000px";
		// write the necessary text into the element and append to the document
		forExecElement.textContent = textToClipboard;
		document.body.appendChild(forExecElement);
		// the contentEditable mode is necessary for the  execCommand method in Firefox
		forExecElement.contentEditable = true;

		return forExecElement;
	},
	/***
	 * 加在文件
	 * @param files
	 */
	loadFiles: function(files) {
		var files = files?files:[];
		for(var i=0;i<files.length;i++){
			var creatDom = '';
			var creat = true;
			if(/\.css$/.test(files[i])){
				$('body link').each(function(index, item){
					$(item).attr('href');
					if($(item).attr('href')==files[i]){
						$(item).remove();
						creat = false;
					}
				});
				//if(!creat){continue;}
				creatDom = '<link type="text/css" rel="stylesheet" href="'+files[i]+'"/>';
			}else if(/\.js/.test(files[i])){
				$('body script').each(function(index, item){
					$(item).attr('src');
					if($(item).attr('src')==files[i]){
						$(item).remove();
						creat = false;
					}
				});
				//if(!creat){continue;}
				creatDom = '<script src="'+files[i]+'"></script>';
			}
			$('head').append(creatDom);
		}
	},
	/**
	 *将str转为base64
	 *
	 * @param str
	 * @returns {string}
	 */
	b64EncodeUnicode (str){//编码
		return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
			return String.fromCharCode('0x' + p1);
		}));
	}
}

//# sourceURL=common.js