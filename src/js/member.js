require('extend/template7');
require('components/toast');
var common = require('extend/common');
var path = require('extend/path');


var app = {
  init: function(){
  	this.getPersonalInfo();
  	this.getMemberOrderCount();
    this.getMemberShop();
  	this.bindEvent();
  },
  getPersonalInfo: function(){
  	//获取会员信息
  	common.getData(path.get_personal_infor_url, null, 'get', function(msg){
		if(msg.code != 0 || msg.code == undefined){
			$.toast("获取个人信息失败");
			return false;
		}
		var personalHtml = common.renderTemplate7('#personal_template', msg);
	    $('#personal_infor').html(personalHtml);
	});
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
	  });
  },
  getMemberShop: function(){
    //获取会员订单数量
    common.getData(path.shop_detail_url, null, 'get', function(msg){
      if(msg.value.telephone){
         $('#phone').html('客服电话：'+msg.value.telephone);
       }else{
          if(msg.value.cellphone){
            $('#phone').html('客服电话：'+msg.value.cellphone);
          }else{
            $('#phone').html('客服电话：');
          }
       }
    });
  },
  bindEvent: function(){
    //个人中心中订单状态切换
   $("#order_count").on("click", ".tabbar_item", function() {
     var $this = $(this);
     var orderStatus = $this.data("value");
     //TODO 获取到订单状态orderStatus值，需要将type传到后台进行判断
     window.location.href="/micromall/microshopvip/queryOrders?orderStatus="+orderStatus;
   });
  }
};

$(function(){
  app.init();
});