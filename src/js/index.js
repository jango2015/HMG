require('components/infinite');
// 图片轮播
require('components/swiper');

//搜索
require('components/search-htc');

// 图片延时加载
require('extend/lazyload');

require('extend/template7');
var common = require('extend/common');
var path = require('extend/path');

// loading图片
var placeholderImage = require('images/loading.gif');

var app = {
  init: function(){
    
    //店铺详情
    shopDetailFn();

    //轮播
    swiperFn();
    
    //加载分类
    getCategory();
    
    var initGroupCounts = 3;
    var groupObjArr = [];
    //加载分组
    var data = {};
    common.getData(path.product_group_url, data, 'get', function(msg){
      if(msg == '' || msg.length == 0 || JSON.stringify(msg) == '{}'){
        $('#p_index_cont').destroyInfinite();
        $('#loading_scroll').hide();
        return false;
      };
      console.log(window.history)
      groupObjArr = msg;
      for(var i = 0; i <= initGroupCounts; i++){
        if(groupObjArr[i] == undefined || groupObjArr[i] == null){
          $('#p_index_cont').destroyInfinite();
          return false;
        }
        showGroup(msg[i]);
      }
    });

    //上滑加载 主要部分
    var loading = false;  //状态标记
    $('#p_index_cont').infinite().on('infinite', function() {
      if(loading){
        return false;
      }
      $('#loading_scroll').show();
      initGroupCounts++;
      loading = true;
      if(groupObjArr[initGroupCounts] == undefined || groupObjArr[initGroupCounts] == null){
        $('#p_index_cont').destroyInfinite();
        $('#loading_scroll').hide();
        return false;
      }
      showGroup(groupObjArr[initGroupCounts]);
    });

    //展示分组
    function showGroup(obj){
        if(obj.showType == 'banner'){
          var msgCont = obj;
          var pcHtml = common.renderTemplate7('#show_group_pc', msgCont);
          $('#group_list').append(pcHtml);
        }else{
          var listData = {
            'groupId' : obj.id,
            'page.pageSize': 4
          };
          var msgCont = obj;
          var listTitleHtml = common.renderTemplate7('#show_group_title', msgCont);
          $('#group_list').append(listTitleHtml);

          common.getData(path.product_list_url, listData, 'get', function(msgGroup){
            var listHtml = common.renderTemplate7('#show_group_list', msgGroup);
            $('#list'+obj.id).append(listHtml);
          });
        }
        $('#loading_scroll').hide();
        loading = false;
    }
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

    //轮播
    function swiperFn(){
      var adData = {}
      common.getData(path.get_ad_url, adData, 'get', function(msg){
        if(msg.length == 0 ){
          $('#focus_swiper').hide();
          return false;
        }
        var adCont = {
          adList: msg
        }
        var adHtml = common.renderTemplate7('#ad_template', adCont);
        $('#weiper_list').append(adHtml);
        $('#J_focus_swiper').swiper({
          loop: true,
          autoplay: 5000,
          pagination : '.swiper-pagination'
        });
      })
    }

    //商店详情
    function shopDetailFn(){
      var shopData = {};
      common.getData(path.shop_detail_url, shopData, 'get', function(msg){
        if(msg.code != 0 || msg.value == null){
          $.toast('请求失败');
          return false;
        }
        $('#logoPc').attr('src', '/file/idcard/img?imgPath='+msg.value.logoPath);
        $('#indexTitle').html(msg.value.name ? msg.value.name : '')
      })
    }
    //加载分类
    function getCategory(){
      common.getData(path.product_category_url, null, 'get', function(msg){
        if(msg.length == 0){
          return false;
        }
        
      });
    }

    this.bindEvent();
  },
  bindEvent: function(){}
};

$(function(){
  app.init();
});