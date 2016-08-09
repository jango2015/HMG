;(function($){

	function Counter(wrap, option){

		if(!wrap){
			throw new Error('请指定计数容器');
		}
		this.wrap = wrap;
		this.option = $.extend({}, Counter.defaults, option);
		this.init();
	}

	Counter.prototype = {
		init: function(){
			var option = this.option;
			
			['plus', 'minus', 'count'].forEach(function(key){
				this[key] = this.wrap.find(option[key]);
			}.bind(this));

			
			var countEl = this.count,
				fn = countEl.get(0).tagName === 'INPUT' ? 'val' : 'text';

			this.min = this.wrap.data('min') || option.min;
			this.max = this.wrap.data('max') || option.max;

			this.setCount = function(n){countEl[fn](n);};
			this.getCount = function(){return countEl[fn]();};

			this.originalCount = this.currentCount = this.getCount() * 1;

			this.validate = (function(){
				var _this = this;
				var _min = this.min,
					_max = this.max;

				var ret = {};

				[{
					type: 'isNumber',
					rule: function(n){ return !isNaN(n);}
				},{
					type: 'max',
					rule: function(n){ return _max !== undefined && n <= _max;}
				},{
					type: 'min',
					rule: function(n){ return _min !== undefined && n >= _min;}
				}
				].forEach(function(item){
					ret[item.type] = function(count, success, error){
						var flag = item.rule(count);
						if(flag){
							success && success.call(_this, count);
						}else{
							error && error.call(_this, count);
						}
						return flag;
					};
				});
				return ret;
			}).call(this);

			// bind event
			var self = this;
			this.wrap.on('click', option.plus, function(){self.change('plus');})
					 .on('click', option.minus, function(){self.change('minus');});

			if(fn === 'val'){
				this.wrap.on('focus', option.count, function(){
					this.currentCount = this.getCount();
				}.bind(this));

				this.wrap.on('blur', option.count, function(){self.change('blur');});
			}

		},
		change: function(type){
			var self = this;
			var option = this.option,
				validate = this.validate,
				count = this.getCount() * 1,
				_min = this.min,
				_max = this.max,
			    data = {
		            types: type, 
		            currentCount: count,
		            preCount: count,
		            originalCount: self.originalCount
		        };

			function setResult(c){
				self.setCount(c);
				self.currentCount = c;
			}

			function setErrorInfo(message, oc, cc){
				setResult(oc);
				data.message = message;
				data.currentCount = cc;
				option.onError.call(this, data);
			}

			function setSuccessInfo(c){
				setResult(c);
				data.currentCount = c;
				option.onChange.call(this, data);
			}

			validate.isNumber(count, function(){
				var countParse = parseInt(count, 10);

				switch(type){
					case 'plus':
						var nextCount =  countParse + 1;

						if(_max !== undefined){
							validate.max(nextCount, function(){
								setSuccessInfo.call(this, nextCount);
							}, function(){
								setErrorInfo.call(this, Counter.TIP.MAX, countParse, nextCount);
							});	
						}else{
							setSuccessInfo.call(this, nextCount);
						}
					
						break;

					case 'minus':
						var prevCount = countParse - 1;

						validate.min(prevCount, function(){
							setResult.call(this, prevCount);
						}, function(){
							setErrorInfo.call(this, Counter.TIP.MIN, countParse, prevCount);
						});
						break;

					case 'blur':

						if(this.currentCount*1 === countParse){
							this.currentCount = countParse;
							return;
						}

						if(!validate.min(countParse)){
							setErrorInfo.call(this, Counter.TIP.MIN, _min, countParse);
							return;							
						}

						if(_max !== undefined){
							if(!validate.max(countParse)){
								setErrorInfo.call(this, Counter.TIP.MAX, _max, countParse);
								return;
							}						
						}

						setSuccessInfo.call(this, countParse);
						break;
				}
			}, function(){
				setErrorInfo.call(this, '输入的值不是数字', _min, count);
			});
		},
		constructor: Counter
	};

	Counter.defaults = {
		min: 1,
		max: undefined,
		count: '.m_counter_count',
		minus: '.m_counter_minus',
		plus: '.m_counter_plus',
		onChange: function(){},
		onError: function(){}
	};

	Counter.TIP = {
    	MIN: '小于最小值',
    	MAX: '大于最大值',
    	NAN: '输入的值不是数字'
	};


	$.fn.counter = function(option){
		return this.each(function(){
			var $this = $(this);
			if(undefined === $this.data('counter')){
				$this.data('counter', new Counter($this, option));
			}
		});
	};

	if(typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
		module.exports = Counter;
	}
})($);