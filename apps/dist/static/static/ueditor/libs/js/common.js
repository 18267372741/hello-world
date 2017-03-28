/*公用js*/

function HQ() {
	/**
	 *
	 * @param url 请求地址
	 * @param params 上传至后台参数
	 * @param callback 回调
	 * @param type ajax请求接口
	 */
	this.load = function(url, params, callback, type) {
		var result = "";
		var self = this;
		$.ajax({
			async: callback ? true : false,
			timeout: 150000,
			type: type?type:'POST',
			url: url,
			data: params,
			processData: true,
			datatype: 'json',
			success: function(data) {
				var curData = '';
				if(data.responseData && data.responseData.data){
					curData = data.responseData.data;
				}else if(data.response&&data.response.sub_msg){
					curData = data.response;
					if(data.response.code==3){
						self.topRightInfoTips({content: data.response.sub_msg});
						setTimeout(function(){
							location.href = '/unlogin/login.html';
						}, 2000);
					}
				}else{
                    curData = data;
                }

				if(callback){
					callback(curData);
				}else{
					result = curData;
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				self.topRightInfoTips({content:XMLHttpRequest+textStatus+errorThrown});
			}
		});
		return result;
	},
	/***
	 * 获取翻页
	 * option {
	 * pageSize:1,//每页条数
	 * totalCount:1,//总条数
	 * pageNo:1//第几页
	 * }
	 */
	this.pagesHtml = function(option){
		var totalPage = 0,
			opt = {},
			html = '',
			pageSize = option.pageSize*1,
			totalCount = option.totalCount*1,
			spaceNum = 4;
		if(!pageSize || (!totalCount&&totalCount!=0) || !(typeof pageSize == 'number')||!(typeof totalCount == 'number')){
			this.topRightInfoTips({content:'请传入正确的参数'});
			opt.html = html;
			opt.totalPage = totalPage;
			return opt;
		}
		if(pageSize>totalCount||pageSize==0||totalCount==0){
			html += '<div class="ld-pages pull-right"><p>每页 '+pageSize+'条, 总共 '+totalCount+'条</p></div>';
			opt.html = html;
		}else{
			totalPage = Math.ceil(totalCount/pageSize);
			html += '<div class="ld-pages pull-right"><span class="prev btn-group" data-value="prev"><i class="glyphicon glyphicon-chevron-left"></i></span>';
			for(var i=0;i<totalPage;i++){
				var num = i+1,
					active = '',
					maxNum = option.pageNo+spaceNum,
					minNum = option.pageNo-spaceNum;
				maxNum = maxNum>totalPage?totalPage:maxNum;
				minNum = minNum<1?0:minNum;
				if(num==option.pageNo){
					active = 'active';
				}
				if(totalPage>10){
					if(i>minNum && i<maxNum){
						html += '<span class="'+active+'" data-value="'+num+'">'+num+'</span>';
					}else if(i==minNum && minNum>0){
						html += '... <span class="'+active+'" data-value="'+num+'">'+num+'</span>';
					}else if(i==minNum && minNum==0){
						html += '<span class="'+active+'" data-value="'+num+'">'+num+'</span>';
					}else if(i==0 && minNum!=0){
						html += '<span class="'+active+'" data-value="'+num+'">'+num+'</span>';
					}else if(i==maxNum && maxNum<totalPage-1){
						html += '<span class="'+active+'" data-value="'+num+'">'+num+'</span> ...';
					}else if(i==totalPage-1 &&  maxNum!=totalPage){
						html += '<span class="'+active+'" data-value="'+num+'">'+num+'</span>';
					}
				}else{
					html += '<span class="'+active+'" data-value="'+num+'">'+num+'</span>';
				}
			}
			html += '<span class="next" data-value="next"><i class="glyphicon glyphicon-chevron-right"></i></span></div>';
		}
		opt.html = html;
		opt.totalPage = totalPage;
		return opt;
	}
}

HQ.prototype = {
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
		if (url.indexOf('?') < 0) {
			return paraObj;
		}
		url = url.replace('#', '');
		var paraString = url.substring(url.indexOf('?') + 1, url.length)
			.split('&');
		if (!isNoToLower) {
			for (var i = 0; j = paraString[i]; i++) {
				paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] =
					j.substring(j.indexOf('=') + 1, j.length);
			}
		} else {
			for (var i = 0; j = paraString[i]; i++) {
				try {
					paraObj[j.substring(0, j.indexOf('='))] =
						decodeURIComponent(j.substring(j.indexOf('=') +
							1, j.length));
				} catch (ex) {
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
	topRightInfoTips: function(options){
		var option,
			style = 'position: fixed;right:0px;top:4px;font-size: 16px;',
			html = '';
		$('.alert .close').click();
		option = {color: 'warning', title: '警告!', content: '', time: '3000'};
		$.extend(option,options);
		html ='<div class="alert alert-'+option.color+' alert-dismissible fade in" style="'+style+'" role="alert"> ' +
			'<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span></button> ' +
			'<strong>'+option.title+'</strong> '+option.content+' </div>';
		$('body').append(html);
		var setT = setTimeout(function(){
			$('.alert .close').click();
		}, option.time);
		$('.alert').on('click', '.close', function(){
			clearInterval(setT);
		});
		$('.alert').on('mouseover',function(){
			clearInterval(setT);
		});
		$('.alert').on('mouseout',function(){
			setT = setTimeout(function(){
				$('.alert .close').click();
			}, option.time);
		});
	},
    /**
     * 锁定页面
     *
     * @param {string} message 消息文本
     * @param {object} css     css
     * @param {int}    timeout 自动解锁时间
     *
     * @return {void}
     */
    lockPage: function(option, timeout) {
        var clientHeight = $(window).height();
        var o = {
            message: '<h4><i class="fa fa-repeat  fa-spin"></i> 正在加载……</h4>',
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#fff',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .8,
                color: '#000',
                top: clientHeight/2+'px'
            }
        };
        if (option&&option.message !== undefined && option.message != '') {
            o.message = option.message;
        }
        if (option&&option.css !== undefined && typeof option.css == 'object') {
            $.extend(o.css, option.css);
        }
        $.blockUI(o);
        if (timeout != undefined && timeout > 0) {
            setTimeout(this.unLockPage, timeout);
        }
    },
    /**
     * 解除锁定页面
     *
     * @return {void}
     */
    unLockPage: function() {
        $.unblockUI();
    },
	/***
	 *
	 * @param content 需要拷贝的内容
	 * @constructor
     */
	CopyToClipboard: function(content){
		var textToClipboard = content;

		var success = true;
		if (window.clipboardData) { // Internet Explorer
			window.clipboardData.setData ("Text", textToClipboard);
		}
		else {
			// create a temporary element for the execCommand method
			var forExecElement = this.CreateElementForExecCommand (textToClipboard);

			/* Select the contents of the element
			 (the execCommand for 'copy' method works on the selection) */
			this.SelectContent (forExecElement);

			var supported = true;

			// UniversalXPConnect privilege is required for clipboard access in Firefox
			try {
				if (window.netscape && netscape.security) {
					netscape.security.PrivilegeManager.enablePrivilege ("UniversalXPConnect");
				}

				// Copy the selected content to the clipboard
				// Works in Firefox and in Safari before version 5
				success = document.execCommand ("copy", false, null);
			}
			catch (e) {
				success = false;
			}

			// remove the temporary element
			document.body.removeChild (forExecElement);
		}

		if (success) {
			this.topRightInfoTips({type: 'success',title:'恭喜您,拷贝成功!'});
		} else {
			this.topRightInfoTips({type: 'success',title:'soory,拷贝失败!'});
		}
	},
	SelectContent: function(element){
		// first create a range
		var rangeToSelect = document.createRange ();
		rangeToSelect.selectNodeContents (element);

		// select the contents
		var selection = window.getSelection ();
		selection.removeAllRanges ();
		selection.addRange (rangeToSelect);
	},
	CreateElementForExecCommand: function(textToClipboard){
		var forExecElement = document.createElement ("div");
		// place outside the visible area
		forExecElement.style.position = "absolute";
		forExecElement.style.left = "-10000px";
		forExecElement.style.top = "-10000px";
		// write the necessary text into the element and append to the document
		forExecElement.textContent = textToClipboard;
		document.body.appendChild (forExecElement);
		// the contentEditable mode is necessary for the  execCommand method in Firefox
		forExecElement.contentEditable = true;

		return forExecElement;
	},
	/***
	 *上传图片
	 * @param option
	 * @param callback {callbackType: //回调类型属于进度回调还是成功回调}
	 */
	uploadQNImg: function(option, callback){
		var self = this;
		!option.domain && (option.domain='img.ludanmall.com');
		var defaultOption = {
			runtimes: 'html5,flash,html4',      // 上传模式，依次退化
			browse_button: option.browse_button,         // 上传选择的点选按钮，必需
			uptoken : option.uptoken, // uptoken是上传凭证，由其他程序生成
			domain: option.domain,     // bucket域名，下载资源时用到，必需
			container: option.container,             // 上传区域DOM ID，默认是browser_button的父元素
			get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
			max_file_size: '1mb',             // 最大文件体积限制
			flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入flash，相对路径
			max_retries: 3,                     // 上传失败最大重试次数
			dragdrop: true,                     // 开启可拖曳上传
			chunk_size: '4mb',			// 分块上传时，每块的体积
			auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
			isCover: false,    					//是否覆盖,默认为不覆盖
			key: 'ldwsc',						//默认路径
			init: {
				'FilesAdded': function(up, files) {
					plupload.each(files, function(file) {
						// 文件添加进队列后，处理相关的事情
					});
				},
				'BeforeUpload': function(up, file) {
					// 每个文件上传前，处理相关的事情
				},
				'UploadProgress': function(up, file) {
					// 每个文件上传时，处理相关的事情
					file.callbackType = 'UploadProgress';
					callback(file);
				},
				'FileUploaded': function(up, file, info) {
					// 每个文件上传成功后，处理相关的事情
					// 其中info是文件上传成功后，服务端返回的json，形式如：
					// {
					//    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
					//    "key": "gogopher.jpg"
					//  }
					// 查看简单反馈
					var domain = up.getOption('domain');
					// var res = parseJSON(info);
					// var sourceLink = domain + res.key; 获取上传成功后的文件的Url
					info = JSON.parse(info);
					info.domain = domain;
					info.callbackType = 'FileUploaded';
					callback(info);
				},
				'Error': function(up, err, errTip) {
					//上传出错时，处理相关的事情
				},
				'UploadComplete': function() {
					//队列文件处理完毕后，处理相关的事情
				},
				'Key': function(up,file) {
					// 若想在前端对每个文件的key进行个性化处理，可以配置该函数
					// 该配置必须要在unique_names: false，save_key: false时才生效
					var key = option.key+self.option.key;
					file.name = file.name.replace(/\.[a-z]*[A-Z]*$/, '');
					if(!option.isCover){
						file.name += '_'+new Date().getTime();
					}
					key += file.name;
					return key
				}
			}
		};
		$.extend(defaultOption, option);
		var uploader = Qiniu.uploader(defaultOption);
	}
};
var $HQ = new HQ();


//# sourceURL=common.js
