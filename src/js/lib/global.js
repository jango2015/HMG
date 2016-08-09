;(function(exports){

    var HTC = {};

    /**
     * 一些正则
     */
    HTC.reg = {
        mobile: /^0?(13|15|18|14|17)[0-9]{9}$/,
        email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        QQ: /^[1-9]\d{4,11}$/,
        tel: /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,8}/,
        ID: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        date: /^\d{4}-\d{1,2}-\d{1,2}$/,
        postCode: /^[0-9]\d{5}$/,
        accout: /^[a-zA-Z]\w{3,19}$/,
        mobilecode: /^\d{6}$/,
        validcode: /^\d{4}$/,
        password: /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{6,20}$/,
        nogb: /^[\u0000-\u00FF]+$/ // 不含中文
    };

    /**
     * validate
     */
    HTC.validate = {
        isEmpty: function(value) {
            return $.trim(value) === '';
        },
        min: function(value, n) {
            return $.trim(value).length >= n;
        },
        max: function(value, n) {
            return $.trim(value).length <= n;
        },
        range: function(value, range) {
            var vl = $.trim(value).length;
            return vl >= range[0] && vl <= range[1];
        },
        bytesRange: function(value, range) {
            var vl = value.replace(/[^\x00-\xff]/gi, '--').length;
            return vl >= range[0] && vl <= range[1];
        },
        isMobile: function(value) {
            return HTC.reg.mobile.test(value);
        },
        isPostCode: function(value) {
            return HTC.reg.postCode.test(value);
        },
        isTel: function(value) {
            return HTC.reg.tel.test(value);
        },
        isEmail: function(value) {
            return HTC.reg.email.test(value);
        },
        isQQ: function(value) {
            return HTC.reg.QQ.test(value);
        },
        isID: function(value) {
            return HTC.reg.ID.test(value);
        },
        isDate: function(value) {
            return HTC.reg.date.test(value);
        },
        password: function(value) {
            return HTC.reg.nobg && HTC.reg.password.test(value);
        }
    };

    /**
     * 图片相关
     */

    /**
     * cookie
     * 只传name时为取值，同时传name和value时为设值
     * @param  {string} name    [cookie name]
     * @param  {[type]} value   [cookie value]
     * @param  {[type]} options [cookie options]
     */
    HTC.cookie = function(name, value, options) {
        if (typeof value === 'undefined') {
            var n, v,
                cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                n = $.trim(cookies[i].substr(0, cookies[i].indexOf('=')));
                v = cookies[i].substr(cookies[i].indexOf('=') + 1);
                if (n === name) {
                    return unescape(v);
                }
            }
        } else {
            options = options || {};
            if (!value) {
                value = '';
                options.expires = -365;
            } else {
                value = escape(value);
            }
            if (options.expires) {
                var d = new Date();
                d.setDate(d.getDate() + options.expires);
                value += '; expires=' + d.toUTCString();
            }
            if (options.domain) {
                value += '; domain=' + options.domain;
            }
            if (options.path) {
                value += '; path=' + options.path;
            }
            document.cookie = name + '=' + value;
        }
    };

    /**
     * 一些辅助工具
     */
    HTC.utils = {
        /**
         * 检测元素是否在可视区域
         * @param {dom}
         */
        isInViewport: function(element){
            var rect = element.getBoundingClientRect();

            return rect.bottom > 0 &&
                rect.right > 0 &&
                rect.left < (window.innerWidth || document. documentElement.clientWidth) &&
                rect.top < (window.innerHeight || document. documentElement.clientHeight);        
        }
    };

    exports.HTC = HTC;

})(window);


