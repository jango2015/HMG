'use strict';

var common = {
    getData: function(url, data, type, back){
        $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            data: data,
            success: back,
            error: back
        });
    },
    renderTemplate7: function(tempDom, context) {
        var template = $(tempDom).html();
        // compile it with Template7
        var compiledTemplate = $.Template7.compile(template);
        // Now we may render our compiled template by passing required context
        /*
        var context = {
          items:[{
            title:"1111"
            },{
            title:"22222"
          }]
        };
        */
        var html = compiledTemplate(context);
        return html;
    },
    getParameter: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
    getParameterArr: function(){
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
        }
        return theRequest; 
    }

}
module.exports = common;
