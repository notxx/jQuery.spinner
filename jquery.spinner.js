(function($) { // spinner
	function _init(options) {
		var $this = $(this).addClass("form-control");
		if ($this.length > 1) {
			$this.each(function() {
				_init.call(this, options);
			});
			return this;
		}
		var $parent = $this.closest(".input-group");
		if (!$parent.length) {
			$parent = $('<div class="input-group">').appendTo($this.parent()).append($this);
		}
		var $group = $('<div class="spinner-btn-group">'),
			$up = $('<a class="btn btn-default">').appendTo($group),
			$down = $('<a class="btn btn-default">').appendTo($group);
		$this.after($group).blur(function() { // 失去焦点时验证数据
			var $el = $(this),
				data = $el.data("spinner"),
				options = $el.data("spinner.options");
			return _validate(this, 0, data, options);
		});
		$up.append('<span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>').click(function() {
			_inc.apply($this);
		});
		$down.append('<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>').click(function() {
			_dec.apply($this);
		});
		// 赋值钩子
		var _hook;
		if ($.valHooks.text)
			_hook = $.valHooks.text.set;
		else
			$.valHooks.text = {};
		$.valHooks.text.set = function(el, val) {
			var $el = $(el),
				data = $el.data("spinner"),
				options = $el.data("spinner.options");
			if (!data || !options) {
				return _hook ? _hook(el) : undefined;
			} else {
				//console.log(data, options, arguments);
				return _validate(el, val, data, options);
			}
		}
		$this.keydown(function(e) { // 响应按键
			var $el = $(this),
				data = $el.data("spinner"),
				options = $el.data("spinner.options");
			switch (e.keyCode) {
			case 33: // pageup
				//console.log(e.keyCode);
				e.preventDefault();
				_validate(this, 10, data, options);
				break;
			case 34: // pagedown
				//console.log(e.keyCode);
				e.preventDefault();
				_validate(this, -10, data, options);
				break;
			case 38: // up
			case 107: // +
				//console.log(e.keyCode);
				e.preventDefault();
				_validate(this, +1, data, options);
				break;
			case 40: // down
			case 109: // -
				//console.log(e.keyCode);
				e.preventDefault();
				_validate(this, -1, data, options);
				break;
			default:
				break;
			}
		});
		$this.data("spinner", {
			parent: $parent,
			group: $group,
			up: $up,
			down: $down,
			//value: null
		});
		options = $.extend({}, options);
		$this.data("spinner.options", options);
	}
	function _validate(el, diff, data, options) {
		var val;
		if (typeof diff === 'string') {
			if (diff === '') return delete data.value;
			val = diff;
			val = parseInt(val) || 0;
		} else {
			val = el.value;
			if (val === '' && !diff) return delete data.value;
			val = parseInt(val) || 0;
			val = (val + diff) || 0;
		}
		if (val >= options.max)
			val = options.max;
		else if (val <= options.min)
			val = options.min;
		return data.value = el.value = val;
	}
	function _inc() {
		var $this = $(this),
			data = $this.data("spinner"),
			options = $this.data("spinner.options");
		_validate($this[0], +1, data, options);
	}
	function _dec() {
		var $this = $(this),
			data = $this.data("spinner"),
			options = $this.data("spinner.options");
		_validate($this[0], -1, data, options);
	}
	$.fn.spinner = function(method, arg) {
		var $this = $(this),
			data = $this.data("spinner");
		if (typeof method !== "string" && !data) { _init.call(this, method); return this; }
		switch(method) {
		case "inc":
			return _inc.call(this, arg);
		case "dec":
			return _dec.call(this, arg);
		}
	};
})(jQuery);
