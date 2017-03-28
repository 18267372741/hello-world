/*  阿里云账号js
    json_parse.js
    2015-05-02

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    This file creates a json_parse function.

        json_parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = json_parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*jslint for */

/*property
    at, b, call, charAt, f, fromCharCode, hasOwnProperty, message, n, name,
    prototype, push, r, t, text
*/

var json_parse = (function () {
    "use strict";

// This is a function that can parse a JSON text, producing a JavaScript
// data structure. It is a simple, recursive descent parser. It does not use
// eval or regular expressions, so it can be used as a model for implementing
// a JSON parser in other languages.

// We are defining the function inside of another function to avoid creating
// global variables.

    var at,     // The index of the current character
        ch,     // The current character
        escapee = {
            '"': '"',
            '\\': '\\',
            '/': '/',
            b: '\b',
            f: '\f',
            n: '\n',
            r: '\r',
            t: '\t'
        },
        text,

        error = function (m) {

// Call error when something is wrong.

            throw {
                name: 'SyntaxError',
                message: m,
                at: at,
                text: text
            };
        },

        next = function (c) {

// If a c parameter is provided, verify that it matches the current character.

            if (c && c !== ch) {
                error("Expected '" + c + "' instead of '" + ch + "'");
            }

// Get the next character. When there are no more characters,
// return the empty string.

            ch = text.charAt(at);
            at += 1;
            return ch;
        },

        number = function () {

// Parse a number value.

            var number,
                string = '';

            if (ch === '-') {
                string = '-';
                next('-');
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
            if (ch === '.') {
                string += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    string += ch;
                }
            }
            if (ch === 'e' || ch === 'E') {
                string += ch;
                next();
                if (ch === '-' || ch === '+') {
                    string += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    string += ch;
                    next();
                }
            }
            number = +string;
            if (!isFinite(number)) {
                error("Bad number");
            } else {
                return number;
            }
        },

        string = function () {

// Parse a string value.

            var hex,
                i,
                string = '',
                uffff;

// When parsing for string values, we must look for " and \ characters.

            if (ch === '"') {
                while (next()) {
                    if (ch === '"') {
                        next();
                        return string;
                    }
                    if (ch === '\\') {
                        next();
                        if (ch === 'u') {
                            uffff = 0;
                            for (i = 0; i < 4; i += 1) {
                                hex = parseInt(next(), 16);
                                if (!isFinite(hex)) {
                                    break;
                                }
                                uffff = uffff * 16 + hex;
                            }
                            string += String.fromCharCode(uffff);
                        } else if (typeof escapee[ch] === 'string') {
                            string += escapee[ch];
                        } else {
                            break;
                        }
                    } else {
                        string += ch;
                    }
                }
            }
            error("Bad string");
        },

        white = function () {

// Skip whitespace.

            while (ch && ch <= ' ') {
                next();
            }
        },

        word = function () {

// true, false, or null.

            switch (ch) {
            case 't':
                next('t');
                next('r');
                next('u');
                next('e');
                return true;
            case 'f':
                next('f');
                next('a');
                next('l');
                next('s');
                next('e');
                return false;
            case 'n':
                next('n');
                next('u');
                next('l');
                next('l');
                return null;
            }
            error("Unexpected '" + ch + "'");
        },

        value,  // Place holder for the value function.

        array = function () {

// Parse an array value.

            var array = [];

            if (ch === '[') {
                next('[');
                white();
                if (ch === ']') {
                    next(']');
                    return array;   // empty array
                }
                while (ch) {
                    array.push(value());
                    white();
                    if (ch === ']') {
                        next(']');
                        return array;
                    }
                    next(',');
                    white();
                }
            }
            error("Bad array");
        },

        object = function () {

// Parse an object value.

            var key,
                object = {};

            if (ch === '{') {
                next('{');
                white();
                if (ch === '}') {
                    next('}');
                    return object;   // empty object
                }
                while (ch) {
                    key = string();
                    white();
                    next(':');
                    if (Object.hasOwnProperty.call(object, key)) {
                        error('Duplicate key "' + key + '"');
                    }
                    object[key] = value();
                    white();
                    if (ch === '}') {
                        next('}');
                        return object;
                    }
                    next(',');
                    white();
                }
            }
            error("Bad object");
        };

    value = function () {

// Parse a JSON value. It could be an object, an array, a string, a number,
// or a word.

        white();
        switch (ch) {
        case '{':
            return object();
        case '[':
            return array();
        case '"':
            return string();
        case '-':
            return number();
        default:
            return ch >= '0' && ch <= '9'
                ? number()
                : word();
        }
    };

// Return the json_parse function. It will have access to all of the above
// functions and variables.

    return function (source, reviver) {
        var result;

        text = source;
        at = 0;
        ch = ' ';
        result = value();
        white();
        if (ch) {
            error("Syntax error");
        }

// If there is a reviver function, we recursively walk the new structure,
// passing each name/value pair to the reviver function for possible
// transformation, starting with a temporary root object that holds the result
// in an empty key. If there is not a reviver function, we simply return the
// result.

        return typeof reviver === 'function'
            ? (function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }({'': result}, ''))
            : result;
    };
}());

/**
 * @module HavanaLoginModule
 */

/**
 * window.MiniLoginEmbedder
 * @class window.MiniLoginEmbedder
 */

(function() {

    /**
     * 开始定义MiniLoginEmbedder
     */
    if(window.MiniLoginEmbedder) return;

    window.MiniLoginEmbedder = function() {
        /**
         * 配置项
         * @property config {Object}
         */
        this.config = {
            /**
             * 目标元素
             * @property config.targetId {String}
             * @dafault "alibaba-login-iframe"
             */
            targetId: "alibaba-login-iframe",
            /**
             * 引用此控件BU id，弃用原fromSite参数
             * @property config.appKey {String}
             * @dafault ""
             */
            appKey: '',
            /**
             * 语言
             * @property config.lang {String}
             * @dafault "zh_CN"
             */
            lang: 'zh_CN',
            /**
             * 外链css
             * @property config.cssLink {String}
             * @dafault ""
             */
            cssLink: '',
            /**
             * 框体样式风格
             * @property config.styleType {String}
             * @dafault "vertical"
             * @options 'vertical', 'horizontal' , 'auto'
             */
            styleType : 'vertical',
            /**
             * 提交按钮前定制HTML区块内容
             * @property config.beforeSubmitBtnHtml {String}
             * @dafault ""
             */
            beforeSubmitBtnHtml: '',
            /**
             * 提交按钮后定制HTML区块内容
             * @property config.beforeSubmitBtnHtml {String}
             * @dafault ""
             */
            afterSubmitBtnHtml: '',
            /**
             * 业务方上下文参数传入bizParams
             * @property config.bizParamss {String}
             * @dafault ""
             */
            bizParams : '',
            /**
             * 请求查询串，供minilogin使用
             * @property config.queryStr {String}
             * @dafault ""
             */
            queryStr: '',
            /**
             * rezieIframe时候宽度是否固定
             * @property config.resizeIframeWidthFix {Boolean}
             * @dafault ""
             */
            resizeIframeWidthFix : false,
            /**
             * rezieIframe时候高度是否固定
             * @property config.resizeIframeHeightFix {Boolean}
             * @dafault ""
             */
            resizeIframeHeightFix : false,
            /**
             * loginId 传入覆写值
             * @property config.loginId {String}
             * @dafault null
             */
            loginId : null,

            /**
             * 账号placeholder
             * @property config.loginIdPlaceHolder {String}
             * @dafault null
             */
            loginIdPlaceHolder : null,
            /**
             * 宽度覆写值
             * @property config.iframeWidth {String}
             * @dafault 250
             */
            iframeWidth : 250,
            /**
             * 高度覆写值
             * @property config.iframeHeight {String}
             * @dafault 250
             */
            iframeHeight : 250,
            /**
             * 是否显示免登检查视图
             * @default false
             */
            notLoadSsoView : false,
            /**
             * 是否显示十天免登的选择框
             * @default false
             */
            notKeepLogin : true,
            /**
             * 来源是否是mobile
             */
            isMobile: false

        };

        /**
         * 缓存区
         * @property temp {Object}
         */
        this.temp = {
            /**
             * 目标元素DOM
             * @property temp.target {Dom}
             * @dafault null
             */
            target: null,
            /**
             * 创建的login-Iframe
             * @property temp.iframe {Dom}
             * @dafault null
             */
            iframe: null
        };

        /**
         * 整合轻量自定义事件 - 侦听器
         * @property _listeners {Object}
         * @dafault {}
         */
        this._listeners = {};
        /**
         * 整合轻量自定义事件 - 哈希记录
         * @property _hashCodeCounter {Number}
         * @dafault 0
         */
        this._hashCodeCounter = 0;

        /**
         * 消息机制模式 postMessage | windowName
         * @property _messageType {String}
         * @dafault null
         */
        this._messageType = null;

        /**
         * 为低端跨域方案备份window.name
         * @property _bakWindowName {String}
         * @dafault window.name
         */
        this._bakWindowName = window.name;

        /**
         * window.name hash 比较标志位
         * @property _windowNameHash {String}
         * @dafault null
         */
        this._windowNameHash = null;

        /**
         * 轮循获取 window.name interval id
         * @property _windowNameTimer {String}
         * @dafault null
         */
        this._windowNameTimer = null;

        return this;
    };

    window.MiniLoginEmbedder.prototype = {

        // UTIL
        /**
         * 在目标对象上合并源对象的属性，按从右到左的顺序将参数中的源对象自身的可枚举属性添加到目标对象中。
         * @demo var config = core.merge({ x: 1 }, { y: 2 }, { z : 3}) -> { x : 1, y : 2, z : 3 }
         * @method merge
         * @param [arguments] {Object} 多目标对象。
         * @return {Object} 最终合并对象。
         */
        merge: function() {
            var mergeObj = {},
                args = Array.prototype.slice.call(arguments),
                i = 0,
                src;

            // 双重遍历
            while(src = args[i++]) {
                for(var key in src) {
                    mergeObj[key] = src[key];
                }
            }

            return mergeObj;
        },
        /**
         * json对象转字符串形式
         * @demo var jstr = core.json2str({x:1});
         * @method core.json2str
         * @param o {Object} json
         * @return {String} 返回字符串
         */
        json2str: function(obj) {
            switch(obj.constructor) {
                case Object:
                    var str = "{";
                    for(var o in obj) {
                        if(!obj[o]) continue;
                        str += "\"" + o + "\":" + arguments.callee(obj[o]) + ",";
                    }
                    if(str.substr(str.length - 1) == ",") str = str.substr(0, str.length - 1);
                    return str + "}";
                case Array:
                    var str = "[";
                    for(var o in obj) {
                        str += arguments.callee(obj[o]) + ",";
                    }
                    if(str.substr(str.length - 1) == ",") str = str.substr(0, str.length - 1);
                    return str + "]";
                default:
                    return "\"" + obj.toString() + "\"";
            }
        },

        toQueryPair: function(key, value) {
            if (typeof value == 'undefined'){
                return key;
            }
            return key + '=' + encodeURIComponent(value === null ? '' : String(value));
        },
        toQueryString: function(obj) {
            var _self = this;
            var ret = [];
            for(var key in obj){
                key = encodeURIComponent(key);
                var values = obj[key];
                if(values && values.constructor == Array){//数组
                    var queryValues = [];
                    for (var i = 0, len = values.length, value; i < len; i++) {
                        value = values[i];
                        queryValues.push(_self.toQueryPair(key, value));
                    }
                    ret = ret.concat(queryValues);
                }else{ //字符串
                    ret.push(_self.toQueryPair(key, values));
                }
            }
            return ret.join('&');
        },

        // DOM
        /**
         * 根据id获取dom元素
         * @demo get('target')
         * @method get
         * @param domOrId {dom/id} dom元素或id
         */
        get: function(domOrId) {
            if(typeof domOrId === 'string') {
                return document.getElementById(domOrId);
            } else {
                return domOrId;
            }
        },
        /**
         * 判断元素是否包含Class
         * @demo var flag = hasClass(this.get('elid1'),'hide');
         * @method hasClass
         * @param el {Dom} 目标Dom
         * @param cls {String} 样式名
         * @return {Boolean} 是否有该ClassName
         */
        hasClass: function(el, cls) {
            return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },

        /**
         * 新增样式
         * @method addClass
         * @param el {Dom} 目标Dom
         * @param cls {String} 样式名
         */
        addClass: function(el, cls) {
            if(el.className === '') {
                el.className = cls;
                return;
            }
            if(!this.hasClass(el, cls)) el.className += " " + cls;
        },

        /**
         * 删除样式
         * @method addClass
         * @param el {Dom} 目标Dom
         * @param cls {String} 样式名
         */
        removeClass: function(el, cls) {
            if(this.hasClass(el, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                el.className = el.className.replace(reg, ' ');
            }
        },

        // EVENT
        /**
         * 新增绑定事件
         * @demo core.on('target','click',function(){});
         * @method on
         * @param domOrId {dom/id} dom元素或id
         * @param type {string} 事件类型
         * @param fn {function} 函数
         */
        on: function(domOrId, type, fn) {
            var obj = this.get(domOrId);

            if(obj.attachEvent) {
                obj['e' + type + fn] = fn;
                obj[type + fn] = function() {
                    obj['e' + type + fn](window.event);
                };
                obj.attachEvent('on' + type, obj[type + fn]);
            } else {
                obj.addEventListener(type, fn, false);
            }

        },

        /**
         * 外部订阅自定义事件
         * @demo MiniLoginEmbedder.addEvent('onInit',function(args){console.dir(args)}); -> MiniLoginEmbedder为初始化后实例
         * @event addEvent
         * @param sType {String} 自定义事件类型
         * @param fnHandle {Function} 自定义事件触发函数
         */
        addEvent: function(sType, fnHandle) {
            if('function' != typeof fnHandle) {
                return;
            }
            var ls = this._listeners[sType];
            if(!ls) ls = this._listeners[sType] = {};
            ls[this._toHashCode(fnHandle)] = fnHandle;
        },

        /**
         * 内部触发自定义事件
         * @demo this.fireEvent('onInit',{foo:1});
         * @method fireEvent
         * @param sType {String} 自定义事件类型
         * @param args {Object} 触发时候传递参数对象
         */
        fireEvent: function(sType, args) {
            if(!this._listeners[sType]) return;
            for(var hc in this._listeners[sType]) {
                this._listeners[sType][hc].call(this, args);
            }
        },

        /**
         * HASH订阅自定义事件
         * @method _toHashCode
         * @param o {Object} 触发时候传递参数对象
         */
        _toHashCode: function(o) {
            if(o._hashCode) return o._hashCode;
            return o._hashCode = "_" + (this._hashCodeCounter++).toString(32);
        },

        /**
         * 初始化时作用缓冲
         * @method _tempOnInit
         */
        _tempOnInit: function() {
            this.temp.target = this.get(this.config.targetId);
        },

        _parseWindowNameData: function(windowNameVal) {
            var oData = windowNameVal.split("[@]").pop().split("[login-iframe-message]");
            return {
                // 同名postMessage的域名来源
                origin: oData[0],
                // 同名postMessage数据
                data: oData[1]
            };
        },

        /**
         * 初始化
         * @method init
         * @param {Object} customConfig 初始化参数配置
         * @return {Object} self
         */
        init: function(customConfig) {

            // 合并配置
            this.config = this.merge(this.config, customConfig || {});

            // 定义别名
            var _self = this,
                config = this.config,
                temp = this.temp;

            // 初始化前缓冲器
            _self._tempOnInit();

            // 渲染 UI
            _self._renderIframe();

            // 侦听Message处理
            if(window.postMessage) {

                // message模式type
                _self._messageType = 'postMessage';

                // 注册事件
                _self.on(window, "message", function(oEvent) {
                    _self.messageHanlder.call(_self, oEvent);
                });

            } else {

                // message模式type
                _self._messageType = 'windowName';

                // 重置window.name及记录用于比较的标志位
                window.name = '';
                _self._windowNameHash = '';

                _self._windowNameTimer = setInterval(function() {

                    // 仅接受协议中数据
                    if(window.name === "" || window.name.indexOf('[login-iframe-message]') === -1) return;

                    if(window.name != _self._windowNameHash) {
                        _self._windowNameHash = window.name;

                        // 解析 window name 数据后抛给 messageHanlder
                        _self.messageHanlder(_self._parseWindowNameData(window.name));
                    }
                }, 50);

            }

            // 页面离开前隐藏iframe 以免看到accountCheck接口异常可能导致的问题
            _self.on(window, "beforeunload", function(oEvent) {
                temp.iframe.style.visibility = 'hidden';
            });

            /**
             * 自定义事件挂载触发点 - 初始化后
             * @event onInit
             * @param arg[0] {Object} 元素自身
             */
            this.fireEvent('onInit', {
                _self: this
            });


            // 清理资源
            this.free();

        },

        /**
         * 处理消息
         * @method messageHanlder
         * @param oEvent {object} 消息返回对象
         */
        messageHanlder: function(oEvent) {
            // 定义别名
            var _self = this,
                config = this.config,
                temp = this.temp,


            // 还原数据对象
                oData = json_parse(decodeURIComponent(oEvent.data));


            // 根据消息是否显示iframe
            if(oData.showIframe) {
                if(temp.iframe.style.visibility !== 'visible') {
                    // 显示iframe
                    temp.iframe.style.visibility = 'visible';
                }

                /**
                 * 自定义事件挂载触发点 - 显示Iframe的时候
                 * @event onIframeShow
                 * @param arg[0] {dom} iframe
                 */
                this.fireEvent('onIframeShow', {
                    _self: temp.iframe
                });

                // 增加阶段样式 - iframe显示 : iframe-show
                _self.addClass(temp.target, 'iframe-show');

            }

            if(oData.hideIframe) {
                if(temp.iframe.style.visibility !== 'hidden') {
                    // 隐藏iframe
                    temp.iframe.style.visibility = 'hidden';
                }

                /**
                 * 自定义事件挂载触发点 - 隐藏Iframe的时候
                 * @event onIframeHide
                 * @param arg[0] {dom} iframe
                 */
                this.fireEvent('onIframeHide', {
                    _self: temp.iframe
                });

                // 增加阶段样式 - iframe隐藏 : iframe-show
                _self.removeClass(temp.target, 'iframe-show');

            }

            // 开始根据对象内action值路由
            switch(oData.action) {
                case 'resizeIframe':

                    // 如果iframe处于隐藏状态 不做resize
                    if(temp.iframe.offsetHeight == 0)return;

                    if(!config.resizeIframeWidthFix){
                        temp.iframe.width = oData.width;
                    }

                    if(!config.resizeIframeHeightFix){
                        temp.iframe.height = oData.height;
                    }

                    //  备份第一次resize高宽, 用于后期width撑开后无法准确获取值
                    if(!_self._bakOriginalIframeWidth) {
                        if(!config.resizeIframeWidthFix){
                            _self._originalIframeWidth = oData.width;
                        }
                        if(!config.resizeIframeHeightFix){
                            _self._originalIframeHeight = oData.height;
                        }
                        _self._bakOriginalIframeWidth = true;
                    }
                    break;
                case 'otherAction':
                    break;
                default:
                    break;
            }

            /**
             * 自定义事件挂载触发点 - 收到消息
             * @event onMessage
             * @param args[0] {Object} 消息对象
             */
            this.fireEvent('onMessage', oData);

        },

        restoreOriginalWidth: function() {
            this.iframe.width = this._originalIframeWidth;
        },

        restoreOriginalHeight: function() {
            this.iframe.height = this._originalIframeHeight;
        },

        /**
         * 渲染Iframe目标容器部分UI
         * @method _renderIframe
         */
        _renderIframe: function() {

            // 定义别名
            var _self = this,
                config = this.config,
                temp = this.temp,
                target = temp.target,

            // 构建 iframe
                iframe = this.temp.iframe = document.createElement("iframe"),
                iframeQueryParam;

            // 生成 iframe 请求参数
            iframeQueryParam = {
                lang: config.lang,
                appKey: config.appKey,
                queryStr:config.queryStr,
                styleType : config.styleType,
                bizParams : config.bizParams,
                notLoadSsoView : config.notLoadSsoView,
                notKeepLogin : config.notKeepLogin,
                loginIdPlaceHolder : config.loginIdPlaceHolder,
                isMobile : config.isMobile
            };

            if(config.loginId){
                iframeQueryParam.loginId = config.loginId;
            }

            // iframe 加载地址
            iframe.id = "alibaba-login-box";
            iframe.src = config.iframeUrl + '?' +_self.toQueryString(iframeQueryParam) + _self.config.queryStr +'&rnd=' + Math.random();
            iframe.width = config.iframeWidth;
            iframe.height = config.iframeHeight;
            iframe.frameBorder = 'none';
            iframe.scrolling = 'no';
            iframe.style.border = 'none';



            // iframe 加载时机
            _self.on(iframe, 'load', function() {
                // 增加阶段样式 - iframe加载完成 : iframe-loaded
                _self.addClass(target, 'iframe-loaded');
            });

            // 推送入目标容器
            target.appendChild(iframe);

            /**
             * 自定义事件挂载触发点 - 初始化后
             * @event afterRenderIframe
             * @param _self {Object} 元素自身
             */
            this.fireEvent('afterRenderIframe', {
                iframe: iframe
            });

        },


        /**
         * 清理资源,释放内存
         * @method free
         */
        free: function() {
            if(/msie/i.test(navigator.userAgent)) {
                CollectGarbage();
            }
        },

        /**
         * 睡眠模式 暂停接收消息
         * @method sleep
         */
        sleep: function() {


            if(_self._messageType === 'windowName') {
                // 停止轮循
                clearInterval(_self._windowNameTimer);
                // 复原window.name
                window.name = this._bakWindowName;
            }

            // 释放内存
            this.free();

        },

        /**
         * 销毁函数
         * @method destory
         */
        destory: function() {

            if(_self._messageType === 'windowName') {
                // 停止轮循
                clearInterval(_self._windowNameTimer);
                // 复原window.name
                window.name = this._bakWindowName;
            }

            // 释放内存
            this.free();

        }


    };


})();
