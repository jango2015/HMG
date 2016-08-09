require('./gotop.scss');

require('extend/throttle');

function gotop(){
	var cel = $('.u_content'),
		cvp = $('.u_viewport');

	var scroller = cel[0] ? cel : (cvp[0] ? cvp : $(window)),
		scrollerHeight = scroller.height();

	var $gotop = $('<div class="m_gotop"><i class="iconfont">&#xe623;</i></div>');

	// 创建dom
	$('body').append($gotop);

	// 事件绑定
	// 滚动超过3屏，显示返回顶部按钮
	scroller.on('scroll', $.throttle(250, function(e){
		if($(this).scrollTop() > scrollerHeight * 3){
			$gotop.show();
		}else{
			$gotop.hide();
		}
	}));

	// 点击返回顶部
	$gotop.on('click', function(){
		scroller.scrollTop(0);
	});

	return $gotop;
}

module.exports = gotop();