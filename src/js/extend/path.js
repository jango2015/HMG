
'use strict';
//var publicPath = 'http://localhost:8021';
var publicPath = '';
var path = {};

//产品列表 查询
path.product_list_url = publicPath + '/micromall/shop/product/search';

//获取商店的分组
path.product_group_url = publicPath + '/micromall/shop/group';

//根据父节点获取子类目
path.product_category_url = publicPath + '/micromall/shop/category';

//获取购物车中的商品
path.get_product_url = publicPath + '/cart/product';

//删除购物车商品
path.delete_cart_product_url = publicPath + '/cart/del';

//获取banner广告
path.get_ad_url = publicPath + '/micromall/shop/advertisement';

//订单保存
path.sure_order_url = publicPath + '/micromall/order/save';

//订单保存成功后的跳转
path.sure_order_success_url = publicPath + '/order/submit/confirm?orderNo='

//会员订单数量统计接口
path.member_order_count_url = publicPath + '/micromall/customer/orderCount';

//获取商店详情
path.shop_detail_url = publicPath + '/micromall/shop';

//获取个人信息
path.get_personal_infor_url = publicPath + '/micromall/customer';

//更新个人信息
path.update_personal_infor_url = publicPath + '/micromall/customer/updateInfo';

module.exports = path;