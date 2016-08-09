"use strict";
require('./modal.scss');
var defaults;
var domLib = window.Zepto || window.jQuery;

if (domLib) {
    if (!('transitionEnd' in domLib.fn)) {
        domLib.fn.transitionEnd = function(callback) {
            var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                i, j, dom = this;

            function fireCallBack(e) {
                /*jshint validthis:true */
                if (e.target !== this) return;
                callback.call(this, e);
                for (i = 0; i < events.length; i++) {
                    dom.off(events[i], fireCallBack);
                }
            }
            if (callback) {
                for (i = 0; i < events.length; i++) {
                    dom.on(events[i], fireCallBack);
                }
            }
            return this;
        };
    }
    if (!('transform' in domLib.fn)) {
        domLib.fn.transform = function(transform) {
            for (var i = 0; i < this.length; i++) {
                var elStyle = this[i].style;
                elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
            }
            return this;
        };
    }
    if (!('transition' in domLib.fn)) {
        domLib.fn.transition = function(duration) {
            if (typeof duration !== 'string') {
                duration = duration + 'ms';
            }
            for (var i = 0; i < this.length; i++) {
                var elStyle = this[i].style;
                elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
            }
            return this;
        };
    }
}

var show = function(html, className) {

    className = className || "";
    var mask = $("<div class='weui_mask_transparent'></div>").appendTo(document.body);

    var tpl = '<div class="weui_toast ' + className + '">' + html + '</div>';
    var dialog = $(tpl).appendTo(document.body);

    dialog.show();
    dialog.addClass("weui_toast_visible");
};

var hide = function(callback) {
    $(".weui_mask_transparent").remove();
    $(".weui_toast_visible").removeClass("weui_toast_visible").transitionEnd(function() {
        var $this = $(this);
        $this.remove();
        callback && callback($this);
    });
}

$.toast = function(text, style, callback) {
    if (typeof style === "function") {
        callback = style;
    }
    var className;
    if (style == "cancel") {
        className = "weui_toast_cancel";
    } else if (style == "forbidden") {
        className = "weui_toast_forbidden";
    } else if (style == "text") {
        className = "weui_toast_text";
    }
    show('<i class="weui_icon_toast"></i><p class="weui_toast_content">' + (text || "已经完成") + '</p>', className);

    setTimeout(function() {
        hide(callback);
    }, toastDefaults.duration);
}

$.showLoading = function(text) {
    var html = '<div class="weui_loading">';
    for (var i = 0; i < 12; i++) {
        html += '<div class="weui_loading_leaf weui_loading_leaf_' + i + '"></div>';
    }
    html += '</div>';
    html += '<p class="weui_toast_content">' + (text || "数据加载中") + '</p>';
    show(html, 'weui_loading_toast');
}

$.hideLoading = function() {
    hide();
}

var toastDefaults = $.toast.prototype.defaults = {
    duration: 2000
}
$.fn.transitionEnd = function(callback) {
    var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
        i, dom = this;

    function fireCallBack(e) {
        /*jshint validthis:true */
        if (e.target !== this) return;
        callback.call(this, e);
        for (i = 0; i < events.length; i++) {
            dom.off(events[i], fireCallBack);
        }
    }
    if (callback) {
        for (i = 0; i < events.length; i++) {
            dom.on(events[i], fireCallBack);
        }
    }
    return this;
};

module.exports = $;
