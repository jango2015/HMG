require('components/swiper');
require('components/toast');
require('extend/template7');
var cookie = require('extend/cookie');
var common = require('extend/common');
var app = {
    init: function() {
        var option = {
                expires: 365,
                path: '/'
            },
            shopId, //商店ID
            productId, //商品ID
            subId; //商品规格ID
        /haitaocity/.test(window.location.host) ? option.domain = 'haitaocity.com' : '';

        //获取链接中的参数
        var searchArray = window.location.search.slice(1).split('&');
        if (searchArray.length === 2) { //有多个商品规格时，会有多一个参数
            productId = searchArray[0].split('=')[1];
            subId = searchArray[1].split('=')[1];
        } else {
            productId = window.location.search.split('=')[1];
        }

        //开始请求页面数据
        $.showLoading();
        $.ajax({
            url: '/micromall/shop/product/detail',
            type: 'GET',
            data: {
                productId: productId
            },
            dataType: 'json',
            success: function(response) {
                $.hideLoading();
                if (response.code == 0) { //成功获取数据
                    var objData = response.value,
                        context = {},
                        html = '',
                        arr = [],
                        temp,
                        isBuyNow = false;

                    //渲染并启动轮播
                    context.data = objData.images[0];
                    html = common.renderTemplate7('#template-slide', context);
                    $('.swiper-wrapper').append(html);
                    $('#J_focus_swiper').swiper({
                        loop: true,
                        autoplay: 3000,
                        autoplayDisableOnInteraction: false
                    });

                    //获取最低价格
                    temp = objData.salePriceMap;
                    for (var key in temp) {
                        arr.push(temp[key]);
                    }
                    temp = Math.min.apply(null, arr);

                    //渲染商品信息
                    context.data = {
                        '1': objData.name,
                        '2': temp,
                        '3': objData.originCtCnName,
                        '4': objData.weight,
                        '5': objData.stock,
                        '6': objData.description
                    };
                    html = common.renderTemplate7('#template-detail', context);
                    $('#pro').append(html);



                    //渲染右出页面          
                    context.dataObj = objData.skuVoList[0];
                    context.dataObj.image = objData.images[0].smallPicUrl;
                    context.dataAttr = {
                        hasContainer: objData.skuVoList[0].attrList.length > 0,
                        dataArray: objData.skuVoList
                    };
                    html = common.renderTemplate7('#template-open', context);
                    $('.open-page').append(html);

                    // 带规格参数时，显示对应的商品规格和价格，一般是从购物车中跳到详情页
                    if (subId) {
                        var skuList = $('.sku').find('span');
                        var len = skuList.length;
                        for (var i = len - 1; i >= 0; i--) {
                            var sku = $(skuList[i]);
                            if (sku.data('pid') == subId) {
                                sku.addClass('active').siblings().removeClass('active');
                                $('.price,.open-price span').text(sku.data('price'));
                                $('.whouse').text(sku.data('warehouse'));
                                $('.stock').text(sku.data('stock'));
                                break;
                            }
                        }
                    }

                    //*********************加入购物车******************************
                    $('#J-In-Cart,#J-Buy-Now').on('click', function(e) {
                        $('.open-page').addClass('open');
                        $('.open-mask').css('display', 'block');
                        isBuyNow = e.target === $('#J-In-Cart')[0] ? false : true;
                    });
                    //点击遮罩
                    $('.open-mask').on('click', function() {
                        $('.open-page').removeClass('open');
                        $(this).css('display', 'none');
                    });
                    //点击确定按钮(加入购物车或立即购买)
                    $('#J_confirm').on('click', function() {
                        var url, submitData, mark,
                            pnum = $('.pnum').data('pnum') - 0, //新增数量
                            proId = $('.pro-size').find('.active').data('pid') || objData.skuVoList[0].id, //选中的商品ID
                            pname = objData.skuVoList[0].name;

                        if (isBuyNow) { //立即购买
                            url = subId ? '/micromall/order/save?fr=' + subId : '/micromall/order/save';
                            submitData = {
                                itemList: [{
                                    sellerItemId: proId,
                                    pname: pname,
                                    quantity: pnum
                                }]
                            };
                            submitData = JSON.stringify(submitData);
                            $.showLoading();
                            $.ajax({
                                url: url,
                                type: 'POST',
                                dataType: 'json',
                                contentType: "application/json",
                                data: submitData,
                                success: function(res) {
                                    $.hideLoading();
                                    window.location.href = '/order/submit/confirm?orderNo=' + res.value;
                                },
                                error: function() {
                                    $.hideLoading();
                                    $.toast('网络出错...', 'cancel');
                                }
                            });
                        } else { //加入购物车
                            $('.open-page').removeClass('open');
                            $('.open-mask').css('display', 'none');

                            //动画
                            $('.animation').addClass('active');
                            $('.mark').css('opacity', '1').addClass('active');
                            setTimeout(function() {
                                $('.animation').removeClass('active');
                                $('.mark').removeClass('active');
                            }, 500);

                            mark = $('.mark').text().replace(/^\s|\s$/g, '') - 0; //购物车商品数量
                            mark += pnum;
                            $('.mark').text(mark);

                            //更新cookie
                            var currentCo = cookie.get(shopId),
                                selected,
                                flag = false; //false表示cookie没有即将添加的商品

                            currentCo = currentCo ? JSON.parse(currentCo) : [];
                            if (currentCo.length > 0) {
                                $.each(currentCo, function(index, el) {
                                    if (el.itemStorePriceId == proId) {
                                        el.quantity += pnum;
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
                            cookie.set(shopId, JSON.stringify(currentCo), option);
                        }
                    });

                    //选择规格
                    $('.pro-size').on('click', '.ui-btn', function() {
                        var $this = $(this);
                        $this.toggleClass('active').siblings().removeClass('active');
                        $('.open-price span,.price').text($this.data('price'));

                        $('.whouse').text($this.data('warehouse'));
                        $('.stock').text($this.data('stock'));
                        $('.pnum').data('pnum', 1);
                        $('.pnum').text(1);
                    });
                    //数量加
                    $('#J_plus').on('click', function() {
                        var pnum = $('.pnum').data('pnum') - 0 + 1;
                        var stock = $('.stock').text().replace(/^\s|\s$/g, '') - 0;
                        pnum = pnum > stock ? stock : pnum;
                        $('.pnum').data('pnum', pnum);
                        $('.pnum').text(pnum);
                    });
                    //数量减
                    $('#J_minus').on('click', function() {
                        var pnum = $('.pnum').data('pnum') || 1;
                        pnum = pnum === 1 ? 1 : pnum - 1;
                        $('.pnum').data('pnum', pnum);
                        $('.pnum').text(pnum);
                    });
                } else {
                    $.toast('系统出错...', 'cancel');
                }
            },
            error: function() {
                $.hideLoading();
                $.toast('网络出错...', 'cancel');
            }
        });

        //获取商店id
        $.ajax({
            url: '/micromall/shop',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.code == 0) {
                    shopId = response.value.id + '';
                    //获取购物车商品信息，同步cookie
                    $.ajax({
                        url: '/cart/product',
                        type: 'GET',
                        dataType: 'json',
                        success: function(response) {
                            if (response.code == 0) {
                                var co = [],
                                    count = 0,
                                    item = {};

                                //cookie同步购物车
                                if (response.value.length === 0) {
                                    cookie.set(shopId, '', option);
                                } else {
                                    $.each(response.value, function(index, val) {
                                        count += val.quantity;
                                        item = {
                                            'sellerListingId': val.sellerListingId,
                                            'itemStorePriceId': val.itemStorePriceId,
                                            'microShopId': shopId,
                                            'quantity': val.quantity
                                        };
                                        co.push(item);
                                        cookie.set(val.shopId, JSON.stringify(co), option);
                                    });
                                    $('.mark').css('opacity', '1').text(count);
                                }
                            }
                        },
                        error: function() {}
                    });
                }
            },
            error: function() {}
        });
    }
};

$(function() {
    app.init();
});
