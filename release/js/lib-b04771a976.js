var Zepto=function(){function t(t){return null==t?String(t):U[W.call(t)]||"object"}function e(e){return"function"==t(e)}function n(t){return null!=t&&t==t.window}function i(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function r(e){return"object"==t(e)}function o(t){return r(t)&&!n(t)&&Object.getPrototypeOf(t)==Object.prototype}function s(t){return"number"==typeof t.length}function a(t){return P.call(t,function(t){return null!=t})}function u(t){return t.length>0?C.fn.concat.apply([],t):t}function c(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function l(t){return t in D?D[t]:D[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function f(t,e){return"number"!=typeof e||Z[c(t)]?e:e+"px"}function h(t){var e,n;return A[t]||(e=$.createElement(t),$.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),A[t]=n),A[t]}function p(t){return"children"in t?N.call(t.children):C.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function d(t,e,n){for(E in e)n&&(o(e[E])||Y(e[E]))?(o(e[E])&&!o(t[E])&&(t[E]={}),Y(e[E])&&!Y(t[E])&&(t[E]=[]),d(t[E],e[E],n)):e[E]!==b&&(t[E]=e[E])}function m(t,e){return null==e?C(t):C(t).filter(e)}function v(t,n,i,r){return e(n)?n.call(t,i,r):n}function g(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function y(t,e){var n=t.className||"",i=n&&n.baseVal!==b;return e===b?i?n.baseVal:n:void(i?n.baseVal=e:t.className=e)}function w(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?C.parseJSON(t):t):t}catch(e){return t}}function x(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)x(t.childNodes[n],e)}var b,E,C,S,j,T,O=[],N=O.slice,P=O.filter,$=window.document,A={},D={},Z={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},V=/^\s*<(\w+|!)[^>]*>/,_=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,L=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,R=/^(?:body|html)$/i,k=/([A-Z])/g,z=["val","css","html","text","data","width","height","offset"],M=["after","prepend","before","append"],q=$.createElement("table"),F=$.createElement("tr"),I={tr:$.createElement("tbody"),tbody:q,thead:q,tfoot:q,td:F,th:F,"*":$.createElement("div")},H=/complete|loaded|interactive/,B=/^[\w-]*$/,U={},W=U.toString,X={},J=$.createElement("div"),Q={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},Y=Array.isArray||function(t){return t instanceof Array};return X.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=J).appendChild(t),i=~X.qsa(r,e).indexOf(t),o&&J.removeChild(t),i},j=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},T=function(t){return P.call(t,function(e,n){return t.indexOf(e)==n})},X.fragment=function(t,e,n){var i,r,s;return _.test(t)&&(i=C($.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(L,"<$1></$2>")),e===b&&(e=V.test(t)&&RegExp.$1),e in I||(e="*"),s=I[e],s.innerHTML=""+t,i=C.each(N.call(s.childNodes),function(){s.removeChild(this)})),o(n)&&(r=C(i),C.each(n,function(t,e){z.indexOf(t)>-1?r[t](e):r.attr(t,e)})),i},X.Z=function(t,e){return t=t||[],t.__proto__=C.fn,t.selector=e||"",t},X.isZ=function(t){return t instanceof X.Z},X.init=function(t,n){var i;if(!t)return X.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&V.test(t))i=X.fragment(t,RegExp.$1,n),t=null;else{if(n!==b)return C(n).find(t);i=X.qsa($,t)}else{if(e(t))return C($).ready(t);if(X.isZ(t))return t;if(Y(t))i=a(t);else if(r(t))i=[t],t=null;else if(V.test(t))i=X.fragment(t.trim(),RegExp.$1,n),t=null;else{if(n!==b)return C(n).find(t);i=X.qsa($,t)}}return X.Z(i,t)},C=function(t,e){return X.init(t,e)},C.extend=function(t){var e,n=N.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){d(t,n,e)}),t},X.qsa=function(t,e){var n,r="#"==e[0],o=!r&&"."==e[0],s=r||o?e.slice(1):e,a=B.test(s);return i(t)&&a&&r?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:N.call(a&&!r?o?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},C.contains=$.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},C.type=t,C.isFunction=e,C.isWindow=n,C.isArray=Y,C.isPlainObject=o,C.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},C.inArray=function(t,e,n){return O.indexOf.call(e,t,n)},C.camelCase=j,C.trim=function(t){return null==t?"":String.prototype.trim.call(t)},C.uuid=0,C.support={},C.expr={},C.map=function(t,e){var n,i,r,o=[];if(s(t))for(i=0;i<t.length;i++)n=e(t[i],i),null!=n&&o.push(n);else for(r in t)n=e(t[r],r),null!=n&&o.push(n);return u(o)},C.each=function(t,e){var n,i;if(s(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},C.grep=function(t,e){return P.call(t,e)},window.JSON&&(C.parseJSON=JSON.parse),C.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){U["[object "+e+"]"]=e.toLowerCase()}),C.fn={forEach:O.forEach,reduce:O.reduce,push:O.push,sort:O.sort,indexOf:O.indexOf,concat:O.concat,map:function(t){return C(C.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return C(N.apply(this,arguments))},ready:function(t){return H.test($.readyState)&&$.body?t(C):$.addEventListener("DOMContentLoaded",function(){t(C)},!1),this},get:function(t){return t===b?N.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return O.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return e(t)?this.not(this.not(t)):C(P.call(this,function(e){return X.matches(e,t)}))},add:function(t,e){return C(T(this.concat(C(t,e))))},is:function(t){return this.length>0&&X.matches(this[0],t)},not:function(t){var n=[];if(e(t)&&t.call!==b)this.each(function(e){t.call(this,e)||n.push(this)});else{var i="string"==typeof t?this.filter(t):s(t)&&e(t.item)?N.call(t):C(t);this.forEach(function(t){i.indexOf(t)<0&&n.push(t)})}return C(n)},has:function(t){return this.filter(function(){return r(t)?C.contains(this,t):C(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!r(t)?t:C(t)},last:function(){var t=this[this.length-1];return t&&!r(t)?t:C(t)},find:function(t){var e,n=this;return e=t?"object"==typeof t?C(t).filter(function(){var t=this;return O.some.call(n,function(e){return C.contains(e,t)})}):1==this.length?C(X.qsa(this[0],t)):this.map(function(){return X.qsa(this,t)}):C()},closest:function(t,e){var n=this[0],r=!1;for("object"==typeof t&&(r=C(t));n&&!(r?r.indexOf(n)>=0:X.matches(n,t));)n=n!==e&&!i(n)&&n.parentNode;return C(n)},parents:function(t){for(var e=[],n=this;n.length>0;)n=C.map(n,function(t){return(t=t.parentNode)&&!i(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return m(e,t)},parent:function(t){return m(T(this.pluck("parentNode")),t)},children:function(t){return m(this.map(function(){return p(this)}),t)},contents:function(){return this.map(function(){return N.call(this.childNodes)})},siblings:function(t){return m(this.map(function(t,e){return P.call(p(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return C.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=h(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var n=e(t);if(this[0]&&!n)var i=C(t).get(0),r=i.parentNode||this.length>1;return this.each(function(e){C(this).wrapAll(n?t.call(this,e):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){C(this[0]).before(t=C(t));for(var e;(e=t.children()).length;)t=e.first();C(t).append(this)}return this},wrapInner:function(t){var n=e(t);return this.each(function(e){var i=C(this),r=i.contents(),o=n?t.call(this,e):t;r.length?r.wrapAll(o):i.append(o)})},unwrap:function(){return this.parent().each(function(){C(this).replaceWith(C(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var e=C(this);(t===b?"none"==e.css("display"):t)?e.show():e.hide()})},prev:function(t){return C(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return C(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var n=this.innerHTML;C(this).empty().append(v(this,t,e,n))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=v(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(t,e){var n;return"string"!=typeof t||1 in arguments?this.each(function(n){if(1===this.nodeType)if(r(t))for(E in t)g(this,E,t[E]);else g(this,t,v(this,e,n,this.getAttribute(t)))}):this.length&&1===this[0].nodeType?!(n=this[0].getAttribute(t))&&t in this[0]?this[0][t]:n:b},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){g(this,t)},this)})},prop:function(t,e){return t=Q[t]||t,1 in arguments?this.each(function(n){this[t]=v(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(t,e){var n="data-"+t.replace(k,"-$1").toLowerCase(),i=1 in arguments?this.attr(n,e):this.attr(n);return null!==i?w(i):b},val:function(t){return 0 in arguments?this.each(function(e){this.value=v(this,t,e,this.value)}):this[0]&&(this[0].multiple?C(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var n=C(this),i=v(this,t,e,n.offset()),r=n.offsetParent().offset(),o={top:i.top-r.top,left:i.left-r.left};"static"==n.css("position")&&(o.position="relative"),n.css(o)});if(!this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(e,n){if(arguments.length<2){var i,r=this[0];if(!r)return;if(i=getComputedStyle(r,""),"string"==typeof e)return r.style[j(e)]||i.getPropertyValue(e);if(Y(e)){var o={};return C.each(e,function(t,e){o[e]=r.style[j(e)]||i.getPropertyValue(e)}),o}}var s="";if("string"==t(e))n||0===n?s=c(e)+":"+f(e,n):this.each(function(){this.style.removeProperty(c(e))});else for(E in e)e[E]||0===e[E]?s+=c(E)+":"+f(E,e[E])+";":this.each(function(){this.style.removeProperty(c(E))});return this.each(function(){this.style.cssText+=";"+s})},index:function(t){return t?this.indexOf(C(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?O.some.call(this,function(t){return this.test(y(t))},l(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){S=[];var n=y(this),i=v(this,t,e,n);i.split(/\s+/g).forEach(function(t){C(this).hasClass(t)||S.push(t)},this),S.length&&y(this,n+(n?" ":"")+S.join(" "))}}):this},removeClass:function(t){return this.each(function(e){if("className"in this){if(t===b)return y(this,"");S=y(this),v(this,t,e,S).split(/\s+/g).forEach(function(t){S=S.replace(l(t)," ")}),y(this,S.trim())}})},toggleClass:function(t,e){return t?this.each(function(n){var i=C(this),r=v(this,t,n,y(this));r.split(/\s+/g).forEach(function(t){(e===b?!i.hasClass(t):e)?i.addClass(t):i.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var e="scrollTop"in this[0];return t===b?e?this[0].scrollTop:this[0].pageYOffset:this.each(e?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var e="scrollLeft"in this[0];return t===b?e?this[0].scrollLeft:this[0].pageXOffset:this.each(e?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),i=R.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(C(t).css("margin-top"))||0,n.left-=parseFloat(C(t).css("margin-left"))||0,i.top+=parseFloat(C(e[0]).css("border-top-width"))||0,i.left+=parseFloat(C(e[0]).css("border-left-width"))||0,{top:n.top-i.top,left:n.left-i.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||$.body;t&&!R.test(t.nodeName)&&"static"==C(t).css("position");)t=t.offsetParent;return t})}},C.fn.detach=C.fn.remove,["width","height"].forEach(function(t){var e=t.replace(/./,function(t){return t[0].toUpperCase()});C.fn[t]=function(r){var o,s=this[0];return r===b?n(s)?s["inner"+e]:i(s)?s.documentElement["scroll"+e]:(o=this.offset())&&o[t]:this.each(function(e){s=C(this),s.css(t,v(this,r,e,s[t]()))})}}),M.forEach(function(e,n){var i=n%2;C.fn[e]=function(){var e,r,o=C.map(arguments,function(n){return e=t(n),"object"==e||"array"==e||null==n?n:X.fragment(n)}),s=this.length>1;return o.length<1?this:this.each(function(t,e){r=i?e:e.parentNode,e=0==n?e.nextSibling:1==n?e.firstChild:2==n?e:null;var a=C.contains($.documentElement,r);o.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!r)return C(t).remove();r.insertBefore(t,e),a&&x(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},C.fn[i?e+"To":"insert"+(n?"Before":"After")]=function(t){return C(t)[e](this),this}}),X.Z.prototype=C.fn,X.uniq=T,X.deserializeValue=w,C.zepto=X,C}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function e(t){return t._zid||(t._zid=h++)}function n(t,n,o,s){if(n=i(n),n.ns)var a=r(n.ns);return(v[e(t)]||[]).filter(function(t){return t&&(!n.e||t.e==n.e)&&(!n.ns||a.test(t.ns))&&(!o||e(t.fn)===e(o))&&(!s||t.sel==s)})}function i(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function r(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function o(t,e){return t.del&&!y&&t.e in w||!!e}function s(t){return x[t]||y&&w[t]||t}function a(n,r,a,u,l,h,p){var d=e(n),m=v[d]||(v[d]=[]);r.split(/\s/).forEach(function(e){if("ready"==e)return t(document).ready(a);var r=i(e);r.fn=a,r.sel=l,r.e in x&&(a=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?r.fn.apply(this,arguments):void 0}),r.del=h;var d=h||a;r.proxy=function(t){if(t=c(t),!t.isImmediatePropagationStopped()){t.data=u;var e=d.apply(n,t._args==f?[t]:[t].concat(t._args));return e===!1&&(t.preventDefault(),t.stopPropagation()),e}},r.i=m.length,m.push(r),"addEventListener"in n&&n.addEventListener(s(r.e),r.proxy,o(r,p))})}function u(t,i,r,a,u){var c=e(t);(i||"").split(/\s/).forEach(function(e){n(t,e,r,a).forEach(function(e){delete v[c][e.i],"removeEventListener"in t&&t.removeEventListener(s(e.e),e.proxy,o(e,u))})})}function c(e,n){return!n&&e.isDefaultPrevented||(n||(n=e),t.each(S,function(t,i){var r=n[t];e[t]=function(){return this[i]=b,r&&r.apply(n,arguments)},e[i]=E}),(n.defaultPrevented!==f?n.defaultPrevented:"returnValue"in n?n.returnValue===!1:n.getPreventDefault&&n.getPreventDefault())&&(e.isDefaultPrevented=b)),e}function l(t){var e,n={originalEvent:t};for(e in t)C.test(e)||t[e]===f||(n[e]=t[e]);return c(n,t)}var f,h=1,p=Array.prototype.slice,d=t.isFunction,m=function(t){return"string"==typeof t},v={},g={},y="onfocusin"in window,w={focus:"focusin",blur:"focusout"},x={mouseenter:"mouseover",mouseleave:"mouseout"};g.click=g.mousedown=g.mouseup=g.mousemove="MouseEvents",t.event={add:a,remove:u},t.proxy=function(n,i){var r=2 in arguments&&p.call(arguments,2);if(d(n)){var o=function(){return n.apply(i,r?r.concat(p.call(arguments)):arguments)};return o._zid=e(n),o}if(m(i))return r?(r.unshift(n[i],n),t.proxy.apply(null,r)):t.proxy(n[i],n);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var b=function(){return!0},E=function(){return!1},C=/^([A-Z]|returnValue$|layer[XY]$)/,S={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,n,i,r,o){var s,c,h=this;return e&&!m(e)?(t.each(e,function(t,e){h.on(t,n,i,e,o)}),h):(m(n)||d(r)||r===!1||(r=i,i=n,n=f),(d(i)||i===!1)&&(r=i,i=f),r===!1&&(r=E),h.each(function(f,h){o&&(s=function(t){return u(h,t.type,r),r.apply(this,arguments)}),n&&(c=function(e){var i,o=t(e.target).closest(n,h).get(0);return o&&o!==h?(i=t.extend(l(e),{currentTarget:o,liveFired:h}),(s||r).apply(o,[i].concat(p.call(arguments,1)))):void 0}),a(h,e,r,i,n,c||s)}))},t.fn.off=function(e,n,i){var r=this;return e&&!m(e)?(t.each(e,function(t,e){r.off(t,n,e)}),r):(m(n)||d(i)||i===!1||(i=n,n=f),i===!1&&(i=E),r.each(function(){u(this,e,i,n)}))},t.fn.trigger=function(e,n){return e=m(e)||t.isPlainObject(e)?t.Event(e):c(e),e._args=n,this.each(function(){e.type in w&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,i){var r,o;return this.each(function(s,a){r=l(m(e)?t.Event(e):e),r._args=i,r.target=a,t.each(n(a,e.type||e),function(t,e){return o=e.proxy(r),r.isImmediatePropagationStopped()?!1:void 0})}),o},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){m(t)||(e=t,t=e.type);var n=document.createEvent(g[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),c(n)}}(Zepto),function(t){function e(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function n(t,n,i,r){return t.global?e(n||y,i,r):void 0}function i(e){e.global&&0===t.active++&&n(e,null,"ajaxStart")}function r(e){e.global&&!--t.active&&n(e,null,"ajaxStop")}function o(t,e){var i=e.context;return e.beforeSend.call(i,t,e)===!1||n(e,i,"ajaxBeforeSend",[t,e])===!1?!1:void n(e,i,"ajaxSend",[t,e])}function s(t,e,i,r){var o=i.context,s="success";i.success.call(o,t,s,e),r&&r.resolveWith(o,[t,s,e]),n(i,o,"ajaxSuccess",[e,i,t]),u(s,e,i)}function a(t,e,i,r,o){var s=r.context;r.error.call(s,i,e,t),o&&o.rejectWith(s,[i,e,t]),n(r,s,"ajaxError",[i,r,t||e]),u(e,i,r)}function u(t,e,i){var o=i.context;i.complete.call(o,e,t),n(i,o,"ajaxComplete",[e,i]),r(i)}function c(){}function l(t){return t&&(t=t.split(";",2)[0]),t&&(t==C?"html":t==E?"json":x.test(t)?"script":b.test(t)&&"xml")||"text"}function f(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function h(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=f(e.url,e.data),e.data=void 0)}function p(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function d(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?d(e,u,i,n):e.add(n,u)})}var m,v,g=0,y=window.document,w=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,x=/^(?:text|application)\/javascript/i,b=/^(?:text|application)\/xml/i,E="application/json",C="text/html",S=/^\s*$/,j=y.createElement("a");j.href=window.location.href,t.active=0,t.ajaxJSONP=function(e,n){if(!("type"in e))return t.ajax(e);var i,r,u=e.jsonpCallback,c=(t.isFunction(u)?u():u)||"jsonp"+ ++g,l=y.createElement("script"),f=window[c],h=function(e){t(l).triggerHandler("error",e||"abort")},p={abort:h};return n&&n.promise(p),t(l).on("load error",function(o,u){clearTimeout(r),t(l).off().remove(),"error"!=o.type&&i?s(i[0],p,e,n):a(null,u||"error",p,e,n),window[c]=f,i&&t.isFunction(f)&&f(i[0]),f=i=void 0}),o(p,e)===!1?(h("abort"),p):(window[c]=function(){i=arguments},l.src=e.url.replace(/\?(.+)=\?/,"?$1="+c),y.head.appendChild(l),e.timeout>0&&(r=setTimeout(function(){h("timeout")},e.timeout)),p)},t.ajaxSettings={type:"GET",beforeSend:c,success:c,error:c,complete:c,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:E,xml:"application/xml, text/xml",html:C,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n,r=t.extend({},e||{}),u=t.Deferred&&t.Deferred();for(m in t.ajaxSettings)void 0===r[m]&&(r[m]=t.ajaxSettings[m]);i(r),r.crossDomain||(n=y.createElement("a"),n.href=r.url,n.href=n.href,r.crossDomain=j.protocol+"//"+j.host!=n.protocol+"//"+n.host),r.url||(r.url=window.location.toString()),h(r);var p=r.dataType,d=/\?.+=\?/.test(r.url);if(d&&(p="jsonp"),r.cache!==!1&&(e&&e.cache===!0||"script"!=p&&"jsonp"!=p)||(r.url=f(r.url,"_="+Date.now())),"jsonp"==p)return d||(r.url=f(r.url,r.jsonp?r.jsonp+"=?":r.jsonp===!1?"":"callback=?")),t.ajaxJSONP(r,u);var g,w=r.accepts[p],x={},b=function(t,e){x[t.toLowerCase()]=[t,e]},E=/^([\w-]+:)\/\//.test(r.url)?RegExp.$1:window.location.protocol,C=r.xhr(),T=C.setRequestHeader;if(u&&u.promise(C),r.crossDomain||b("X-Requested-With","XMLHttpRequest"),b("Accept",w||"*/*"),(w=r.mimeType||w)&&(w.indexOf(",")>-1&&(w=w.split(",",2)[0]),C.overrideMimeType&&C.overrideMimeType(w)),(r.contentType||r.contentType!==!1&&r.data&&"GET"!=r.type.toUpperCase())&&b("Content-Type",r.contentType||"application/x-www-form-urlencoded"),r.headers)for(v in r.headers)b(v,r.headers[v]);if(C.setRequestHeader=b,C.onreadystatechange=function(){if(4==C.readyState){C.onreadystatechange=c,clearTimeout(g);var e,n=!1;if(C.status>=200&&C.status<300||304==C.status||0==C.status&&"file:"==E){p=p||l(r.mimeType||C.getResponseHeader("content-type")),e=C.responseText;try{"script"==p?(0,eval)(e):"xml"==p?e=C.responseXML:"json"==p&&(e=S.test(e)?null:t.parseJSON(e))}catch(i){n=i}n?a(n,"parsererror",C,r,u):s(e,C,r,u)}else a(C.statusText||null,C.status?"error":"abort",C,r,u)}},o(C,r)===!1)return C.abort(),a(null,"abort",C,r,u),C;if(r.xhrFields)for(v in r.xhrFields)C[v]=r.xhrFields[v];var O="async"in r?r.async:!0;C.open(r.type,r.url,O,r.username,r.password);for(v in x)T.apply(C,x[v]);return r.timeout>0&&(g=setTimeout(function(){C.onreadystatechange=c,C.abort(),a(null,"timeout",C,r,u)},r.timeout)),C.send(r.data?r.data:null),C},t.get=function(){return t.ajax(p.apply(null,arguments))},t.post=function(){var e=p.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=p.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var r,o=this,s=e.split(/\s/),a=p(e,n,i),u=a.success;return s.length>1&&(a.url=s[0],r=s[1]),a.success=function(e){o.html(r?t("<div>").html(e.replace(w,"")).find(r):e),u&&u.apply(o,arguments)},t.ajax(a),this};var T=encodeURIComponent;t.param=function(e,n){var i=[];return i.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(T(e)+"="+T(n))},d(i,e,n),i.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.fn.serializeArray=function(){var e,n,i=[],r=function(t){return t.forEach?t.forEach(r):void i.push({name:e,value:t})};return this[0]&&t.each(this[0].elements,function(i,o){n=o.type,e=o.name,e&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&r(t(o).val())}),i},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(0 in arguments)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(Zepto),function(t){function e(e){return e=t(e),!(!e.width()&&!e.height())&&"none"!==e.css("display")}function n(t,e){t=t.replace(/=#\]/g,'="#"]');var n,i,r=a.exec(t);if(r&&r[2]in s&&(n=s[r[2]],i=r[3],t=r[1],i)){var o=Number(i);i=isNaN(o)?i.replace(/^["']|["']$/g,""):o}return e(t,n,i)}var i=t.zepto,r=i.qsa,o=i.matches,s=t.expr[":"]={visible:function(){return e(this)?this:void 0},hidden:function(){return e(this)?void 0:this},selected:function(){return this.selected?this:void 0},checked:function(){return this.checked?this:void 0},parent:function(){return this.parentNode},first:function(t){return 0===t?this:void 0},last:function(t,e){return t===e.length-1?this:void 0},eq:function(t,e,n){return t===n?this:void 0},contains:function(e,n,i){return t(this).text().indexOf(i)>-1?this:void 0},has:function(t,e,n){return i.qsa(this,n).length?this:void 0}},a=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),u=/^\s*>/,c="Zepto"+ +new Date;i.qsa=function(e,o){return n(o,function(n,s,a){try{var l;!n&&s?n="*":u.test(n)&&(l=t(e).addClass(c),n="."+c+" "+n);var f=r(e,n)}catch(h){throw console.error("error performing selector: %o",o),h}finally{l&&l.removeClass(c)}return s?i.uniq(t.map(f,function(t,e){return s.call(t,e,f,a)})):f})},i.matches=function(t,e){return n(e,function(e,n,i){return(!e||o(t,e))&&(!n||n.call(t,null,i)===t)})}}(Zepto),function(t){function e(e,i){var u=e[a],c=u&&r[u];if(void 0===i)return c||n(e);if(c){if(i in c)return c[i];var l=s(i);if(l in c)return c[l]}return o.call(t(e),i)}function n(e,n,o){var u=e[a]||(e[a]=++t.uuid),c=r[u]||(r[u]=i(e));return void 0!==n&&(c[s(n)]=o),c}function i(e){var n={};return t.each(e.attributes||u,function(e,i){0==i.name.indexOf("data-")&&(n[s(i.name.replace("data-",""))]=t.zepto.deserializeValue(i.value))}),n}var r={},o=t.fn.data,s=t.camelCase,a=t.expando="Zepto"+ +new Date,u=[];t.fn.data=function(i,r){return void 0===r?t.isPlainObject(i)?this.each(function(e,r){t.each(i,function(t,e){n(r,t,e)})}):0 in this?e(this[0],i):void 0:this.each(function(){n(this,i,r)})},t.fn.removeData=function(e){return"string"==typeof e&&(e=e.split(/\s+/)),this.each(function(){var n=this[a],i=n&&r[n];i&&t.each(e||i,function(t){delete i[e?s(this):t]})})},["remove","empty"].forEach(function(e){var n=t.fn[e];t.fn[e]=function(){var t=this.find("*");return"remove"===e&&(t=t.add(this)),t.removeData(),n.call(this)}})}(Zepto),function(t,e){function n(n,i,r,o,s){"function"!=typeof i||s||(s=i,i=e);var a={opacity:r};return o&&(a.scale=o,n.css(t.fx.cssPrefix+"transform-origin","0 0")),n.animate(a,i,null,s)}function i(e,i,r,o){return n(e,i,0,r,function(){s.call(t(this)),o&&o.call(this)})}var r=window.document,o=(r.documentElement,t.fn.show),s=t.fn.hide,a=t.fn.toggle;t.fn.show=function(t,i){return o.call(this),t===e?t=0:this.css("opacity",0),n(this,t,1,"1,1",i)},t.fn.hide=function(t,n){return t===e?s.call(this):i(this,t,"0,0",n)},t.fn.toggle=function(n,i){return n===e||"boolean"==typeof n?a.call(this,n):this.each(function(){var e=t(this);e["none"==e.css("display")?"show":"hide"](n,i)})},t.fn.fadeTo=function(t,e,i){return n(this,t,e,null,i)},t.fn.fadeIn=function(t,e){var n=this.css("opacity");return n>0?this.css("opacity",0):n=1,o.call(this).fadeTo(t,n,e)},t.fn.fadeOut=function(t,e){return i(this,t,null,e)},t.fn.fadeToggle=function(e,n){return this.each(function(){var i=t(this);i[0==i.css("opacity")||"none"==i.css("display")?"fadeIn":"fadeOut"](e,n)})}}(Zepto),function(t){"use strict";["width","height"].forEach(function(e){var n=e.replace(/./,function(t){return t[0].toUpperCase()});t.fn["outer"+n]=function(t){var n=this;if(n){var i=n[e](),r={width:["left","right"],height:["top","bottom"]};return r[e].forEach(function(e){t&&(i+=parseInt(n.css("margin-"+e),10))}),i}return null}}),t.fn.prevAll=function(e){var n=[],i=this[0];if(!i)return t([]);for(;i.previousElementSibling;){var r=i.previousElementSibling;e?t(r).is(e)&&n.push(r):n.push(r),i=r}return t(n)},t.fn.nextAll=function(e){var n=[],i=this[0];if(!i)return t([]);for(;i.nextElementSibling;){var r=i.nextElementSibling;e?t(r).is(e)&&n.push(r):n.push(r),i=r}return t(n)},t.fn.show=function(){function t(t){var n,i;return e[t]||(n=document.createElement(t),document.body.appendChild(n),i=getComputedStyle(n,"").getPropertyValue("display"),n.parentNode.removeChild(n),"none"===i&&(i="block"),e[t]=i),e[t]}var e={};return this.each(function(){"none"===this.style.display&&(this.style.display=""),"none"===getComputedStyle(this,"").getPropertyValue("display"),this.style.display=t(this.nodeName)})}}(Zepto),function(t){"use strict";var e={},n=navigator.userAgent,i=n.match(/(Android);?[\s\/]+([\d.]+)?/),r=n.match(/(iPad).*OS\s([\d_]+)/),o=n.match(/(iPod)(.*OS\s([\d_]+))?/),s=!r&&n.match(/(iPhone\sOS)\s([\d_]+)/);if(e.ios=e.android=e.iphone=e.ipad=e.androidChrome=!1,i&&(e.os="android",e.osVersion=i[2],e.android=!0,e.androidChrome=n.toLowerCase().indexOf("chrome")>=0),(r||s||o)&&(e.os="ios",e.ios=!0),s&&!o&&(e.osVersion=s[2].replace(/_/g,"."),e.iphone=!0),r&&(e.osVersion=r[2].replace(/_/g,"."),e.ipad=!0),o&&(e.osVersion=o[3]?o[3].replace(/_/g,"."):null,e.iphone=!0),e.ios&&e.osVersion&&n.indexOf("Version/")>=0&&"10"===e.osVersion.split(".")[0]&&(e.osVersion=n.toLowerCase().split("version/")[1].split(" ")[0]),e.webView=(s||r||o)&&n.match(/.*AppleWebKit(?!.*Safari)/i),e.os&&"ios"===e.os){var a=e.osVersion.split(".");e.minimalUi=!e.webView&&(o||s)&&(1*a[0]===7?1*a[1]>=1:1*a[0]>7)&&t('meta[name="viewport"]').length>0&&t('meta[name="viewport"]').attr("content").indexOf("minimal-ui")>=0}var u=t(window).width(),c=t(window).height();e.statusBar=!1,e.webView&&u*c===screen.width*screen.height?e.statusBar=!0:e.statusBar=!1;var l=[];if(e.pixelRatio=window.devicePixelRatio||1,l.push("pixel-ratio-"+Math.floor(e.pixelRatio)),e.pixelRatio>=2&&l.push("retina"),e.os&&(l.push(e.os,e.os+"-"+e.osVersion.split(".")[0],e.os+"-"+e.osVersion.replace(/\./g,"-")),"ios"===e.os))for(var f=parseInt(e.osVersion.split(".")[0],10),h=f-1;h>=6;h--)l.push("ios-gt-"+h);e.statusBar?l.push("with-statusbar-overlay"):t("html").removeClass("with-statusbar-overlay"),l.length>0&&t("html").addClass(l.join(" ")),t.device=e,"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=t)}($),function(t){var e={};e.reg={mobile:/^0?(13|15|18|14|17)[0-9]{9}$/,email:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,QQ:/^[1-9]\d{4,11}$/,tel:/(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,8}/,ID:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,date:/^\d{4}-\d{1,2}-\d{1,2}$/,postCode:/^[0-9]\d{5}$/,accout:/^[a-zA-Z]\w{3,19}$/,mobilecode:/^\d{6}$/,validcode:/^\d{4}$/,password:/((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{6,20}$/,nogb:/^[\u0000-\u00FF]+$/},e.validate={isEmpty:function(t){return""===$.trim(t)},min:function(t,e){return $.trim(t).length>=e},max:function(t,e){return $.trim(t).length<=e},range:function(t,e){var n=$.trim(t).length;return n>=e[0]&&n<=e[1]},bytesRange:function(t,e){var n=t.replace(/[^\x00-\xff]/gi,"--").length;return n>=e[0]&&n<=e[1];
},isMobile:function(t){return e.reg.mobile.test(t)},isPostCode:function(t){return e.reg.postCode.test(t)},isTel:function(t){return e.reg.tel.test(t)},isEmail:function(t){return e.reg.email.test(t)},isQQ:function(t){return e.reg.QQ.test(t)},isID:function(t){return e.reg.ID.test(t)},isDate:function(t){return e.reg.date.test(t)},password:function(t){return e.reg.nobg&&e.reg.password.test(t)}},e.cookie=function(t,e,n){if("undefined"==typeof e){for(var i,r,o=document.cookie.split(";"),s=0;s<o.length;s++)if(i=$.trim(o[s].substr(0,o[s].indexOf("="))),r=o[s].substr(o[s].indexOf("=")+1),i===t)return unescape(r)}else{if(n=n||{},e?e=escape(e):(e="",n.expires=-365),n.expires){var a=new Date;a.setDate(a.getDate()+n.expires),e+="; expires="+a.toUTCString()}n.domain&&(e+="; domain="+n.domain),n.path&&(e+="; path="+n.path),document.cookie=t+"="+e}},e.utils={isInViewport:function(t){var e=t.getBoundingClientRect();return e.bottom>0&&e.right>0&&e.left<(window.innerWidth||document.documentElement.clientWidth)&&e.top<(window.innerHeight||document.documentElement.clientHeight)}},t.HTC=e}(window);