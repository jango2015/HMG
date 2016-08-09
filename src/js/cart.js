
// 图片延时加载
require('extend/lazyload');
require('extend/template7');
require('components/counter');
require('components/toast');
var common = require('extend/common');
var path = require('extend/path');
var cookie = require('extend/cookie');

//如果购物车为空，显示为空
/*
var isEmpty = true;
if(isEmpty){
	$('#cart_empty').hide();
	$('#cart').show();
	$('#cart_foot').show();
}
*/

    

// loading图片
var placeholderImage = require('images/loading.gif');
var app = {
  init: function(){

    //获取商店详情
    var microShopId = '';
    common.getData(path.shop_detail_url, null, 'get', function(msg){
      if(msg.value == undefined || msg.value.id == undefined){
        return false;
      }
      microShopId = msg.value.id + '';
    });

    var data = {};
    //获取购物车中的商品
    common.getData(path.get_product_url, data, 'get', function(msg){
      if(msg.code != 0){
        return false;
      }
      if(msg.value.length == 0){
        var emptyHtml = common.renderTemplate7('#cartEmptyTemplate');
        $('#p_cart_cont').append(emptyHtml);
        return false;
      }
      var html = common.renderTemplate7('#cartListTemplate', msg);

      $('#p_cart_cont').append(html);
      $('#cart_foot').show();
      initTotal();
      //加减按钮
      $('.counter_box').counter();
      //图片延时加载
      $('img.lazy').lazyload({
        threshold: 100,
        failure_limit:0,
        effect_speed: 500,
        data_attribute: 'src',
        container: $('.u_content'),
        placeholder: placeholderImage,
        load: function(){
            $(this).removeClass('lazy').addClass('lazyloaded');
        }
      });
    });

    //全选
    $('#cart_foot').on('click', '#selectAll', function(event) {
      if($('#selectAll .select').hasClass('selected')){
        $('.select').removeClass('selected');
        $('#selectWord').html('全选');
      }else{
        $('.select').addClass('selected');
      }
      initTotal();
    });

    //单选
    $('#viewport').on('click', '.select', function(event) {
      if($(this).hasClass('selected')){
        $(this).removeClass('selected');
      }else{
        $(this).addClass('selected');
      }
      checkSelect();
      initTotal();
    });
    
    //编辑
    $('#viewport').on('click', '#edit_btn', function(event) {
      event.preventDefault();
      $(this).hide();
      $('.select').removeClass('selected');
      $('#settlement').hide();
      $('#delete').show();
      $('#success_btn').show();
      $('#total').addClass('total_hide');
    });

    //完成
    $('#viewport').on('click', '#success_btn', function(event) {
      event.preventDefault();
      $(this).hide();
      $('.select').addClass('selected');
      $('#delete').hide();
      $('#settlement').show();
      $('#edit_btn').show();
      $('#total').removeClass('total_hide');
      initTotal();
    });

    //删除
    $('#viewport').on('click', '#delete', function(event) {
      event.preventDefault();
      var deleteCartData = {
        itemStorePriceIds:''
      };
      
      var deleteDom = $('#cart_list .selected').parents('li');

      for(var i = 0; i < deleteDom.length; i++){
        var itemId = $(deleteDom[i]).data('itemstorepriceid');
        deleteCartData.itemStorePriceIds += $(deleteDom[i]).data('itemstorepriceid')+',';

        delCookie($(deleteDom[i]).data('shopid'), $(deleteDom[i]).data('itemstorepriceid'));
      }
      $('#cart_list .selected').parents('li').remove();
      common.getData(path.delete_cart_product_url, deleteCartData, 'get', function(msg){
        $.toast(msg.message);
      });
      if($('#cart_list .select').parents('li').length == 0){
        var emptyHtml = common.renderTemplate7('#cartEmptyTemplate');
        $('#p_cart_cont').html(emptyHtml);
        $('#cart_foot').hide();
      }
    });

    //减数量
    $('#viewport').on('click', '.m_counter_minus', function(event) {
      event.preventDefault();
      initTotal();
      saveCookie(this);
    });
    //加数量
    $('#viewport').on('click', '.m_counter_plus', function(event) {
      event.preventDefault();
      initTotal();
      saveCookie(this);
    });
    //直接输入数量
    $('#viewport').on('blur', '.m_counter_count', function(event) {
      event.preventDefault();
      initTotal();
      saveCookie(this);
    });
    //结算
    $('#viewport #settlement').on('click', function() {
       var objArr = $('#cart_list .selected');
       var length = objArr.length;
       if(length == 0){
         $.toast('请选择要购买的商品');
       }else{
          var objArr = $('#cart_list .selected');
          var length = objArr.length;
          var submitData = {
            itemList:[]
          };
          
          for(var i = 0; i < length; i++) {
             var dataObj = {};
             dataObj.sellerItemId = $(objArr[i]).parents('li').data('itemstorepriceid');
             dataObj.pname = $(objArr[i]).parents('li').find('.name').html();
             dataObj.quantity = $(objArr[i]).parents('li').find('.m_counter_count').val();
             submitData.itemList.push(dataObj);
          }
          var submitData = JSON.stringify(submitData);
          $.ajax({
            url: path.sure_order_url,
            data: submitData,
            type: 'post',
            dataType: 'json',
            contentType:'application/json',
            success:function(msg){
              if(msg.code != 0){
                $.toast('生成订单失败');
                return false;
              }
              location.href = path.sure_order_success_url + msg.value
            },
            error: function(msg){
              $.toast('生成订单失败');
            }
          });
          
       }
     });

    //检测每一项是否都被选择了
    function checkSelect(){
      var radioDom = $('#cart_list .select');
      for(var i = 0; i < radioDom.length; i++){
        if(!$(radioDom[i]).hasClass('selected')){
          $('#selectAll .select').removeClass('selected');
          $('#selectWord').html('全选');
          return false;
        }
      }
      $('#selectAll .select').addClass('selected');
    }

    //计算合计
    function initTotal(){
      var objArr = $('#cart_list .selected');
      var length = objArr.length;
      var totalPrice = 0.00;
      for(var i = 0; i < length; i++) {
         var salePrice = $(objArr[i]).parents('li').find('.m_counter_count').val();
         var count = $(objArr[i]).parents('li').find('.price').html();
         totalPrice += salePrice * count;
      }
      
      $('#totalMoney').html(totalPrice.toFixed(2));
    }

    function delCookie(microShopId,itemStorePriceId){
      var val = getCookie(microShopId);
      val = decodeURIComponent(val);
      if(val){
        var obj = eval(val);
        for (var i = 0; i < obj.length; i++) {
          var cart = obj[i];

          if(itemStorePriceId && itemStorePriceId==cart.itemStorePriceId){
            obj.splice(i,1);
            break;
          }
        }
        addCookie(microShopId,obj);
      }
    }

    function getCookie(key){
      var strCookie=document.cookie;
      var arrCookie=strCookie.split(";");
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if(arr[0] && arr[0].trim()==key){
          return arr[1].replace(/\"/g,"");
        }
      }
      return "";
    }

    function addCookie(key,obj){
      var exp = new Date();  
        exp.setTime(exp.getTime() + 60 * 60 * 24 * 30 * 1000);//过期时间 一个月
        var val = JSON.stringify(obj).replace(/\"/g,"'");
        var cookieStr = key+"=\""+val+"\";path=/;domain="+document.domain+";expires="+ exp.toGMTString();
      document.cookie = cookieStr;
    }

    function saveCookie(obj){
    //点击确定按钮(加入购物车或立即购买)
    //$('#cart_list').on('click','.m_counter_minus', function() {
        var url, submitData, mark,
        pnum = $('.m_counter_count').val() - 0, //新增数量
        proId = $(obj).parents('li').data('itemstorepriceid'), //选中的商品ID
        pname = $(obj).parents('li').find('.word h3 a').html(),
        shopId = $(obj).parents('li').data('shopid')+'',
        productId = $(obj).parents('li').data('sellerListingId');

        //更新cookie
        // debugger
        var currentCo = cookie.get(shopId),
            selected,
            flag = false; //false表示cookie没有即将添加的商品

        currentCo = currentCo ? JSON.parse(currentCo) : [];
        if (currentCo.length > 0) {
            $.each(currentCo, function(index, el) {
                if (el.itemStorePriceId == proId) {
                    el.quantity = pnum;
                    flag = true; //cookie中有对应的商品
                }
            });
        }
        if (!flag) {
            selected = {
                'sellerListingId': productId,
                'itemStorePriceId': proId,
                'microShopId': shopId,
                'quantity': pnum
            };
            currentCo.push(selected);
        }
        var option = {
                  expires: 365,
                  path: '/'
              }
        cookie.set(shopId, JSON.stringify(currentCo), option);
    
    }

    this.bindEvent();
  },
  bindEvent: function(){
  }
};

$(function(){
  app.init();
});