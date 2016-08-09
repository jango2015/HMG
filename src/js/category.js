require('components/toast');
require('extend/template7');
require('components/search-htc');
var common = require('extend/common');

var category = {
    init: function() {
        $.showLoading();

        //获取一级分类  
        var context = {};
        $.ajax({
            url: '/micromall/shop/category',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                $.hideLoading();
                context.data = res;
                var htmlLeft = common.renderTemplate7('#templateNav', context);
                $('.nav_left').append(htmlLeft);
                //获取二级分类
                $.ajax({
                    url: '/micromall/shop/category',
                    type: 'GET',
                    data: { parentId: $('.m_body_left').find('li').data('pid') },
                    dataType: 'json',
                    success: function(data) {
                        context.data = data;
                        var htmlRight = common.renderTemplate7('#templateContent', context);
                        $('.m_body_right').append(htmlRight);
                    },
                    error: function() {
                        $.toast('网络出错...', 'cancel');
                    }
                });
            },
            error: function() {
                $.hideLoading();
                $.toast('网络出错...', 'cancel');
            }
        });
        //切换tab
        $('.m_body_left').on('click', 'li', function(event) {
            var $this = $(this),
                className = 'category' + $this.data('pid');

            $this.addClass('active').siblings().removeClass('active');
            if ($this.hasClass('loaded')) {
                $('.m_body_right').find('ul.' + className).addClass('visible').siblings().removeClass('visible');
            } else {
                $('.m_body_right ul').removeClass('visible');
                $.showLoading();
                $.ajax({
                    url: '/micromall/shop/category',
                    type: 'GET',
                    data: { parentId: $this.data('pid') },
                    dataType: 'json',
                    success: function(data) {
                        $.hideLoading();
                        context.data = data;
                        var htmlRight = common.renderTemplate7('#templateContent', context);
                        $('.m_body_right').append(htmlRight);
                        $this.addClass('loaded');
                    },
                    error: function() {
                        $.hideLoading();
                        $.toast('网络出错...', 'cancel');
                    }
                });
            }
        });
    }
};
$(function() {
    category.init();
});
