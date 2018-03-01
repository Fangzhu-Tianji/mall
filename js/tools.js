/**
 * @date    2017/03/28
 * @version 左工
 */
; (function (window, document, undefined) {
    window.T = {};
    // 域名配置
    var _HOSTNAME = location.hostname,
    // 最后一个点号的位置 15 - 5 = 10 ，截取从第10个字符到最后字符 得到当前域：cst58.cn
    _DOMAIN = _HOSTNAME.slice(parseInt(_HOSTNAME.lastIndexOf(".") - 7));
    T.DOMAIN = {
        WWW: 'http://www.' + _DOMAIN + '/',
        IMGS: 'http://imgs.' + _DOMAIN + '/',
        WEBAPP: 'http://webapp.' + _DOMAIN + '/',
        UPLOAD: 'http://upload.' + _DOMAIN + '/',
        SQUAREAPI: 'http://squareapi.' + _DOMAIN + '/',
        INFORMATIONAPI: 'http://informationapi.' + _DOMAIN + '/',
        MEMBERAPI: 'http://memberapi.' + _DOMAIN + '/',
        LOGINAPI: 'http://loginapi.' + _DOMAIN + '/',
        FINDAPI: 'http://findapi.' + _DOMAIN + '/',
        CONFIGAPI: 'http://configapi.' + _DOMAIN + '/',
        TURNTABLE: 'http://raffleactivity.' + _DOMAIN + '/',
        DOMAIN: _DOMAIN
    };
    // 跨域配置 设置跨域的基域名称必须与后台一致
    // document.domain = T.DOMAIN.DOMAIN;

    // 通过ID、NAME、TAGNAME获取标签
    T.$id = function(id) {
        return document.getElementById(id);
    };
    T.$name = function(name) {
        return document.getElementsByName(name);
    };
    T.$tagname = function(tagName) {
        return document.getElementsByTagName(tagName);
    };
    //删除左边的空格
    T.ltrim = function(str) {
        return str.replace(/(^\s*)/g,'');
    };
    //删除右边的空格
    T.rtrim = function(str) {
        return str.replace(/(\s*$)/g,'');
    };
    //删除左右两端的空格
    T.trim = function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    };
    //正则
    T.RE = {
        number: /^\d+$/,
        mobile: /^1[3|4|5|6|7|8|9]\d{9}$/,
        email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        mobile_email: /^1[3|4|5|6|7|8|9]\d{9}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        mobile_email_uname: /^1[3|4|5|6|7|8|9]\d{9}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$|^[_a-zA-Z0-9\-]{4,16}$/,
        code: /^[0-9]{6}$/,
        qq: /^[0-9]{5,12}$/,
        pwd: /^\S{6,16}$/,
        url: /^[a-zA-z]+:\/\/[\w-]+\.[\w-]+\.[\w-]+\S*$/,
        date: /^((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31))|(([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)$/,
        time: /sdf/,
        datetime: /asd/,
        uname: /^[a-zA-Z]\w{5,15}$/,
        name: /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,
        nonempty: /\S/,
        size: /\d+[\d.]*[A-za-z]*\*+\d+[\d.]*[A-za-z]*|\d+[*×]\d+/i
    };
    /*
     * 用途：获取浏览器版本
     * @example T.getBrowser().ios  return true OR false
     * 返回：{os:**,engine:**,browser:**,version:**}
     */
    T.getBrowser = function () {
        var ua = navigator.userAgent.toLowerCase(),
            u = navigator.userAgent,
            re_msie = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/;
        function toString(object) {
            return Object.prototype.toString.call(object);
        }
        function isString(object) {
            return toString(object) === "[object String]";
        }
        var ENGINE = [
            ["trident", re_msie],
            ["webkit", /\bapplewebkit[\/]?([0-9.+]+)/],
            ["gecko", /\bgecko\/(\d+)/],
            ["presto", /\bpresto\/([0-9.]+)/]
        ];
        var BROWSER = [
            ["ie", re_msie],
            ["firefox", /\bfirefox\/([0-9.ab]+)/],
            ["opera", /\bopr\/([0-9.]+)/],
            ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
            ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//]
        ];
        // 操作系统信息识别表达式
        var OS = [
            ["windows", /\bwindows nt ([0-9.]+)/],
            ["ipad", "ipad"],
            ["ipod", "ipod"],
            ["iphone", /\biphone\b|\biph(\d)/],
            ["mac", "macintosh"],
            ["linux", "linux"]
        ];
        var IE = [
            [6, 'msie 6.0'],
            [7, 'msie 7.0'],
            [8, 'msie 8.0'],
            [9, 'msie 9.0'],
            [10, 'msie 10.0']
        ];
        var detect = function (client, ua) {
            for (var i in client) {
                var name = client[i][0],
                    expr = client[i][1],
                    isStr = isString(expr),
                    info;
                if (isStr) {
                    if (ua.indexOf(expr) !== -1) {
                        info = name;
                        return info
                    }
                } else {
                    if (expr.test(ua)) {
                        info = name;
                        return info;
                    }
                }
            }
            return 'unknow';
        };
        return {
            os: detect(OS, ua),
            browser: detect(BROWSER, ua),
            engine: detect(ENGINE, ua),
            //只有IE才检测版本，否则意义不大
            version: re_msie.test(ua) ? detect(IE, ua) : '',
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == "qq" //是否QQ
        };
    };
    /*
     * 用途：返回上一级
     */
    T.GoBack = function () {
        window.history.back(-1);
    };
    /*
     * 用途：基于时间戳生成20位全局唯一标识（每一毫秒只对应一个唯一的标识，适用于生成DOM节点ID）
     */
    T.UUID = function (len) {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    /*
     * 用途：生成GUID的方法
     */
    T.Guid = function () {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) guid += "-";
        }
        return guid;
    };
    /*
     * 用途：解析参数
     */
    T.Parse = {
        /**
        * 解析URL中的参数
        * @return {Object} url中参数的键值对形式 {search: Object, hash: Object}
        */
        url: function () {
            var a = function (q) {
                var f = (q + "").replace(/(&amp;|\?)/g, "&").split("&");
                var g = {};
                var j = f.length;
                for (var d = 0; d < j; d++) {
                    var h = f[d].indexOf("=");
                    if (-1 == h) {
                        continue
                    }
                    g[f[d].substr(0, h).replace(/[^a-zA-Z0-9_]/g, "")] = decodeURI(f[d].substr(h + 1))
                }
                return g
            };
            var b = location.href.toString().indexOf("#");
            if (b < 0) {
                b = ""
            } else {
                b = location.href.toString().substring(b, location.href.toString().length)
            }
            return {
                search: a(location.search.substr(1)),
                hash: a(b)
            }
        },
        _localurl: null,
        /* 获取URL中的参数值 */
        key: function (str) {
            if (this._localurl == null) {
                this._localurl = G.util.parse.url();
            }
            if (this._localurl) {
                return this._localurl.search[str] || this._localurl.hash[str] || null;
            }
            return null;
        },
        desItem: null,
        desKey: function (str) {
            if (!this.desItem) {
                if (this._localurl == null) {
                    this._localurl = G.util.parse.url();
                }
                if (this._localurl) {
                    var item = this._localurl.search["q"] || this._localurl.hash["q"] || null;
                    if (item) {
                        this.desItem = G.util.des(item);
                    }
                }
            }
            if (this.desItem) {
                var a = function (q) {
                    var f = (q + "").replace(/(&amp;|\?)/g, "&").split("&");
                    var g = {};
                    var j = f.length;
                    for (var d = 0; d < j; d++) {
                        var h = f[d].indexOf("=");
                        if (-1 == h) {
                            continue
                        }
                        g[f[d].substr(0, h).replace(/[^a-zA-Z0-9_]/g, "")] = decodeURI(f[d].substr(h + 1))
                    }
                    return g
                };
                return a(this.desItem)[str];
            }
            return null;
        },
        //获取问号前面部分的url地址
        location: function () {
            var b = location.href.toString().indexOf("?");
            if (b < 0) {
                b = location.href
            } else {
                b = location.href.toString().substring(0, b)
            }
            return b
        },
        /**
         * 获取URL参数
         * @example T.Parse.getQueryString('a')
         * @param {String} name 必选参数
         * Return 对应的参数值
         */
        getQueryString: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]); return '';
        },
        /**
         * 修改URL参数
         * @example T.Parse.changeQueryString(window.location.href, 'a', 10)
         * @param names 需要修改的地址，需要修改地址的参数名，需要修改地址的参数值
         * @returns {string}
         */
        changeQueryString: function (url,arg,arg_val) {
            var pattern=arg+'=([^&]*)';
            var replaceText=arg+'='+arg_val; 
            if(url.match(pattern)){
                var tmp='/('+ arg+'=)([^&]*)/gi';
                tmp=url.replace(eval(tmp),replaceText);
                return tmp;
            }else{ 
                if(url.match('[\?]')){ 
                    return url+'&'+replaceText; 
                }else{ 
                    return url+'?'+replaceText; 
                } 
            }
        },
        /**
        * 删除当前url中指定参数
        * @example T.Parse.delQueryString(['MemberName','AccessToken'])
        * @param names 数组或字符串
        * @returns {string}
         */
        delQueryString: function (names){
            if (typeof (names) == 'string') {
                names = [names];
            }
            var loca = window.location;
            var obj = {}
            var arr = loca.search.substr(1).split("&");
            //获取参数转换为object
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split("=");
                obj[arr[i][0]] = arr[i][1];
            };
            //删除指定参数
            for (var i = 0; i < names.length; i++) {
                delete obj[names[i]];
            }
            //重新拼接url
            var url = loca.origin + loca.pathname + "?" + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
            return url;
        },
        /**
         * 获取URL参数
         * Return 参数集合
         */
        getRequest: function () {
            var url = location.search;//获取url中'?'符后的字符串
            var theRequest = {};
            if (url.indexOf('?') < 0) return theRequest;
            var str = url.substr(1);
            strs = str.split('&');
            for (var i = 0; i < strs.length; i++)
                theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
            return theRequest;
        },
        /* 获取页面的跳转链接 即 ?url=后面的URL地址 */
        geturl: function () {
            var b = G.util.parse.url();
            var url = b.search.backurl || b.hash.backurl || G.util.parse.location();
            return url
        },
        /**
        * 对目标字符串进行html编码
        * 编码字符有5个：&<>"'
        * @returns {string} html编码后的字符串
        */
        encodeHtml: function (a) {
            return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;")
        },
        /**
        * 对目标字符串进行html解码
        * @returns {string} html解码后的字符串
        */
        decodeHtml: function (a) {
            return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#0?39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
        },
        /**
        * 用途：时间戳转换成时间对象
        * @example T.Parse.getTimeInfo()
        */
        getTimeInfo: function () {
            var date = new Date();
            return {
                year: date.getFullYear(),
                month: (date.getMonth() >= 0 && date.getMonth() <= 9) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
                date: date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
                hour: date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
                minute: date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
                sec: date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
                week: new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()]
            }
        }
    },
    /*
     * 用途：移动端方法
     */
    T.Touch= {
        /**
        * 用途：获取滑动方向
        * @example T.Touch.getTouchPosition(document.getElementById('**'),function(){})
        * 例：判断touch_x与touch_end_x
        */
        getTouchPosition: function (touch_box, fn) {
            var touch_x, touch_y, touch_end_x, touch_end_y;
            touch_box.addEventListener('touchstart', function (e) {
                var touch = e.touches[0];
                touch_x与 = parseInt(touch.pageX);
                touch_y = parseInt(touch.pageY);
                touch_end_x = touch_x;
                touch_end_y = touch_y;
            }, false);
            touch_box.addEventListener('touchmove', function (e) {
                e.preventDefault();
                var touch = e.touches[0];
                touch_end_x = parseInt(touch.pageX);
                touch_end_y = parseInt(touch.pageY);
            }, false);
            touch_box.addEventListener('touchend', function (e) {
                fn();
            }, false);
        }
    }
}(window, document));

/*
* 表单序列化对象
* @example $('form').serializeJson()
*/
// $.fn.serializeJson = function () {
//     var serializeObj = {};
//     $(this.serializeArray()).each(function () {
//         serializeObj[this.name] = this.value;
//     });
//     return serializeObj;
// };

/*
* 绑定上传控件
* @parameter (string)   wrapId      应用的容器id
*            (function) callback    回调函数
*            (bool)     notForm     是否存在表单，若存在则必须在Form中加上 enctype="multipart/form-data"
*            (string)   siteName    上传服务分配的siteName，用于确定存储路径
*            (string)   fileType    上传的是文件还是图片
*/
function BindFileUpload(wrapId, callback, notForm, siteName, fileType) {
    if (!callback) {
        alert("请输入回调事件。");
        return;
    }

    if (BindFileUpload.Count == null) BindFileUpload.Count = 0;
    window["BindFileUpload_" + BindFileUpload.Count] = callback;
    var uploadPath = T.DOMAIN.UPLOAD + fileType + '.upload?fmt=nocheck&callback=BindFileUpload_' + BindFileUpload.Count;
    var html = "";
    siteName = siteName || "";

    var accepts = "";    //储存上传文件类型
    var type = "";       //文件类型
    if (fileType == "img") {
        accepts = "image/png,image/gif,image/jpg,image/jpeg,image/PNG,image/GIF,image/JPG,image/JPEG";
        type = "图片";
    }
    else if (fileType == "file") {
        //accepts = "image/png,image/gif,image/jpg,image/jpeg,image/PNG,image/GIF,image/JPG,image/JPEG,application/msword,application/vnd.ms-powerpoint,application/vnd.ms-excel,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        accepts = "application/pdf";
        type = "文件";
    }

    if (notForm) html += "<form id='formMain' method=\"post\" enctype=\"multipart/form-data\" action=\"" + uploadPath + "\"  target=\"uploadiframe_" + BindFileUpload.Count + "\" style=\"padding:0px;margin:0px;\">";
    html += "<div id='divUploadFileContent" + BindFileUpload.Count + "'>";
    html += '<input type="hidden" name="siteName" value=' + siteName + ' style= "display:none"/>';
    html += '<a href="javascript:;" class="form_upload_file">';
    //html += "<input type=\"file\" id=\"uploadfile\" name=\"uploadfile\" onchange=\"BindFileUpload.OnUploadFile(this.form, \'" + uploadPath+"\' ," + BindFileUpload.Count + "," + notForm + ");\"  multiple='false' accept='image/png,image/gif,image/jpg,image/jpeg,image/PNG,image/GIF,image/JPG,image/JPEG' autocomplete='off'/><span>上传图片</span>";
    html += '<input id="filess" type="file" name="uploadfile" accept="' + accepts + '" autocomplete="off"/><span>上传' + type + '</span>';
    html += '</a>';
    html += "</div>";
    if (notForm) html += "</form>";
    html += "<iframe name=\"uploadiframe_" + BindFileUpload.Count + "\" scrolling=\"no\" width=\"100\" height=\"100\" frameborder=\"1\" style=\"display:none;width:0px;height:0px;\" src=\"about:blank\"></iframe> ";
    $("#" + wrapId).html(html);

    BindFileUpload.Count++;
}

/*
* 上传控件的事件
* @parameter (object)   form    表单
*            (number)   number  表单编号
*/
BindFileUpload.OnUploadFile = function (form, uploadPath, number, notForm) {
    if (!notForm) {
        if (BindFileUpload.form != null) {
            form = BindFileUpload.form;
        }
        else {
            form = $("<form enctype=\"multipart/form-data\"></form>")
            form.attr('action', uploadPath)
            form.attr('enctype', 'multipart/form-data')
            form.attr('method', 'post')
            form.attr('style', 'display:none')
            form.attr('target', 'uploadiframe_' + number)

            var formContent = $("#divUploadFileContent" + number).children()
            form.append(formContent);
            form.appendTo("body")
            form = form[0];
        }
    }

    var _action = form.action;
    var _method = form.method;
    var _target = form.target;
    form.setAttribute("method", "post");
    form.setAttribute("target", "uploadiframe_" + number);
    form.setAttribute("action", uploadPath);
    form.submit();
    form.reset();

    if (!notForm) {
        $("#divUploadFileContent" + number).append(formContent);
        $(form).remove();
    }
    form.setAttribute("method", _method);
    form.setAttribute("target", _action);
    form.setAttribute("action", _action);
}

/*
* 上传文件控件回调
* @parameter (object)   res            回调的JSON
*            (string)   appendContent  需要添加的UL
*            (string)   splitPath      拼接的路径
*/
function callbackUploadFile(res, appendContent) {
    if (res.errno == 0) {
        var html = '';
        layer.closeAll('loading');
        html += '<li>';
        html += '<a href="' + res.list[0].FullPath + '" target="_blank" data-file="' + res.list[0].FileName + '|' + res.list[0].ClientFileName + '">' + res.list[0].ClientFileName + '</a>';
        html += '<i class="layui-icon">&#x1006;</i>';
        html += '</li>';
        appendContent.append(html);
    }
    else {
        //alert(res.errmsg);
        layer.alert(res.errmsg, { icon: 5 });
    }
}

// 例子
/*
 * 用途：获取浏览器版本
 * @example T.getBrowser().ios  return true OR false
 * @parameter (string)   wrapId      应用的容器id
 *            (function) callback    回调函数
 *            (bool)     notForm     是否存在表单，若存在则必须在Form中加上 enctype="multipart/form-data"
 *            (string)   siteName    上传服务分配的siteName，用于确定存储路径
 *            (string)   fileType    上传的是文件还是图片
 * @return true OR false
 */
