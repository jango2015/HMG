// 图片延时加载
require('extend/lazyload');
require('extend/template7');
require('components/toast');
var common = require('extend/common');
    
var context = {
  items:[{
    title:'(保税区发货) 荷兰Nutrilon 原装正品荷兰生产牛栏婴幼儿奶粉 3段 (10-12个月宝宝)...',
    name:'0',
    specifications:'2罐',
    warehouse:'虎门保税仓',
    count:'1',
    price:'50.00'
  },{
    title:'英国Vaseline凡士林 深层滋润护唇霜 原味 20g ',
    name:'0',
    specifications:'25ML',
    warehouse:'英国直邮',
    count:'1',
    price:'25.00'
  }]
};

// loading图片
var placeholderImage = require('images/loading.gif');

var app = {
  init: function(){

    var html = common.renderTemplate7('#order_items', context);
    $('#order_list ul').append(html);


    $('img.lazy').lazyload({
        threshold: 200,
        effect_speed: 500,
        data_attribute: 'src',
        placeholder: placeholderImage,
        load: function(){
            $(this).removeClass('lazy').addClass('lazyloaded');
        }
    });

    this.bindEvent();
  },
  bindEvent: function(){
    
   

  }
};

$(function(){
  app.init();
});