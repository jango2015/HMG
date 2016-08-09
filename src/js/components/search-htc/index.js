/* 
 * @name search
 * @des  保证搜索框的父容器类名为m_headbar_search_inner ，id为J_search_trigger
 */

'use strict';
require('./search.scss');

$(function() {
    $('#J_search_trigger').append('<input class="search" type="text" placeholder="请输入商品关键字" /><span class="search-icon"></span>');
    $('#viewport').append('<div class="ui_mask"></div>');

    //不要用事件代理，iPhone环境下不起作用
    $('#J_search_trigger').on('click', function() {
        $(this).find('.search').addClass('active').focus();
        $('.ui_mask').addClass('active');
    });
    $('.search-icon').on('click', function(e) {
        var search = $('.search');
        var query = search.val().replace(/^\s|\s$/g, '');
        if (search.hasClass('active') && query) {
            window.location.href = '/html/shop/productList.html?keyword=' + query;
        }
    });
    $('.ui_mask').on('click', function() {
        $('.search').removeClass('active');
        $(this).removeClass('active');
    });
});

module.exports = $;
