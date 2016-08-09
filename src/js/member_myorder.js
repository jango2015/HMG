require('extend/template7');
require('components/toast');
require('components/calendar');
require('components/city-picker');
var common = require('extend/common');
var path = require('extend/path');
var app = {
  init: function(){
    
    

    $('#order_list').on('click', '.panel-heading', function(event) {
      event.preventDefault();
      $(this).parents('li').find('.goods_infor_box').toggle();
    });

    $('#u_content_menu').on('click', '.tabbar_item', function(event) {
      event.preventDefault();
      $('.tabbar_item').removeClass('selected');
      $(this).addClass('selected');
    });

    this.getMemberOrderCount();
  	this.bindEvent();
  },
  getMemberOrderCount: function(){
    //获取会员订单数量
    common.getData(path.member_order_count_url, null, 'get', function(msg){
    if(msg.code != 0 || msg.code == undefined){
      $.toast("获取订单失败");
      return false;
    }
    var orderHtml = common.renderTemplate7('#order_count_template', msg);
    $('#order_count').html(orderHtml);
    var idParameter = common.getParameter('event');
    console.log($('#'+idParameter).attr('class'))
    $('#'+idParameter).trigger('click');
  });
  },
  bindEvent: function(){
    
  }
};

$(function(){
  app.init();
});
