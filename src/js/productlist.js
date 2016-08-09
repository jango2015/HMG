require('components/infinite');
require('components/toast');
require('components/search-htc');
require('extend/template7');
var common = require('extend/common');
var path = require('extend/path');

var app = {
  init: function(){
    //列表展示方式转换
    $("#sort_list_btn").click(function(event) {
      if($("#list").hasClass('sort_block')){
        $("#sort_list_btn").removeClass('icon-app');
        $("#sort_list_btn").addClass('icon-list');
        $("#list").removeClass("sort_block");
        $("#list").addClass("sort_list");
        return false;
      }
       $("#sort_list_btn").addClass('icon-app');
       $("#sort_list_btn").removeClass('icon-list');
       $("#list").removeClass("sort_list");
       $("#list").addClass("sort_block");
    });
      //点击返回到顶部
     $(".returnTop").click(function() {
       $("#p_product_list").scrollTop('0');
     });

      //滚动
      $("#p_product_list").scroll(function(){
          var scrollTop = $(this).scrollTop();
          if(scrollTop > 100) {
            $(".returnTop").show(); 
          }else{
            $(".returnTop").hide();
          }
      });
    /*
    var data = {
        categoryId: common.getParameter('category'),
        grounpId: common.getParameter('grounpId'),
        sortType:'default',
        'page.pageNo':1
    };
    */
    var data = {
        sortType:'',
        'page.pageNo':1
    };
    var searchKeyword = escape(common.getParameter('keyword'));
    if(!!searchKeyword && searchKeyword != 'null'){
      $('#J_search_trigger input.search').val(decodeURI(searchKeyword));
    }

    var parameArr = common.getParameterArr();
    if(parameArr.length !== 0){
      var key = '';
      for(key in parameArr){
        data[key] = parameArr[key];
      }
    }
    sortType();
    infiniteLoad();

    //按价格排序
    $('#sort_money_btn').on('click', function(event) {
      event.preventDefault();
      if($(this).hasClass('sort_on')){
        if($(this).find('span').hasClass('down')){
          $(this).find('span').removeClass('down');
          data.sortType = 'priceAsc';
        }else{
          $(this).find('span').addClass('down');
          data.sortType = 'priceDesc';
        }
      }else{
        $('#sort_default_btn').removeClass('sort_on');
        $('#sort_sales_btn').removeClass('sort_on');
        $('#sort_sales_btn').find('span').removeClass('down');
        $(this).addClass('sort_on');
        data.sortType = 'priceAsc';
      }
      sortType();
      infiniteLoad();
    });
    //按销量排序
    $('#sort_sales_btn').on('click', function(event) {
      event.preventDefault();
      if($(this).hasClass('sort_on')){
        if($(this).find('span').hasClass('down')){
          $(this).find('span').removeClass('down');
          data.sortType = 'saleDesc';
        }else{
          $(this).find('span').addClass('down');
          data.sortType = 'saleDesc';
        }
      }else{
        $('#sort_default_btn').removeClass('sort_on');
        $('#sort_money_btn').removeClass('sort_on');
        $('#sort_money_btn').find('span').removeClass('down');
        $(this).addClass('sort_on');
        data.sortType = 'saleDesc';
      }
      sortType();
      infiniteLoad();
    });
    //默认排序
    $('#sort_default_btn').on('click', function(event){
      event.preventDefault();
      $('#sort_sales_btn').removeClass('sort_on');
      $('#sort_sales_btn').find('span').removeClass('down');
      $('#sort_money_btn').removeClass('sort_on');
      $('#sort_money_btn').find('span').removeClass('down');
      $(this).addClass('sort_on');
      data.sortType = '';
      sortType();
      infiniteLoad();
    });

    function infiniteLoad(){
      $('#p_product_list').infinite().off('infinite');
      var pageData = data;
      pageData['page.pageNo'] = 2;
      //上滑加载 主要部分
      var loading = false;  //状态标记
      $('#p_product_list').infinite().on('infinite', function() {
        if(loading){
          return false;
        }
        $('#loading_scroll').show();
        loading = true;
        pageData.sortType = data.sortType;
        common.getData(path.product_list_url, pageData, 'get', function(msg){
          if(msg.results == 'undefined'){
            return false;
          }
          if(msg.results.length == 0){
            $('#p_product_list').destroyInfinite();
            $('#loading_scroll').hide();
            return false;
          }
          var html = common.renderTemplate7('#product_items', msg);
          $('#list').append(html);
          loading = false;
          pageData['page.pageNo']++;
        });
      });
    }

    function sortType(){
      $("#p_product_list").scrollTop('0');
      data['page.pageNo'] = 1;
      common.getData(path.product_list_url, data, 'get', function(msg){
        $.showLoading();
        if(msg.results == 'undefined'){
          return false;
        }
        var html = common.renderTemplate7('#product_items', msg);
        $('#list').html(html);
        setTimeout(function(){$.hideLoading();}, 100);
      });
    }

    this.bindEvent();
  },
  bindEvent: function(){
    
  }
};

$(function(){
  app.init();
});
