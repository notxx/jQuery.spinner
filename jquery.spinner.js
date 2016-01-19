(function($) { // spinner
	function _init() {
		var $this = $(this).addClass("form-control");
		if ($this.length > 1) {
			$this.each(_init);
			return this;
		}
		var $parent = $this.closest(".input-group");
		if (!$parent.length) {
			$parent = $('<div class="input-group">').appendTo($this.parent()).append($this);
		}
		var $group = $('<div class="input-group-btn-vertical input-group-addon">'),
			$up = $('<a class="btn btn-default">').appendTo($group),
			$down = $('<a class="btn btn-default">').appendTo($group);
		$this.after($group).blur(function() {
			var $this = $(this),
				data = $this.data("spinner"),
				value = $this.val();
			value = parseInt(value);
			if (value) {
				data.value = value;
			} else {
				$this.val(data.value);
			}
		});
		$up.append('<span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>').click(function() {
			_inc.apply($this);
		});
		$down.append('<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>').click(function() {
			_dec.apply($this);
		});
		$this.data("spinner", {
			parent: $parent,
			group: $group,
			up: $up,
			down: $down,
			value: null
		});
	}
	function _inc() {
		var $this = $(this),
			data = $this.data("spinner");
		if (!data.value) data.value = 0;
		data.value += 1;
		$this.val(data.value);
	}
	function _dec() {
		var $this = $(this),
			data = $this.data("spinner");
		if (!data.value) data.value = 0;
		data.value -= 1;
		$this.val(data.value);
	}
	function _value(value) {
		var $this = $(this),
			data = $this.data("spinner");
		if (typeof value === 'number') {
			data.value = value;
			return this.val(value);
		} else {
			return data.value;
		}
	}
	$.fn.spinner = function(method, arg) {
		var $this = $(this),
			data = $this.data("spinner");
		if (!method && !data) { _init.call(this, arg); return this; }
		switch(method) {
		case "inc":
			return _inc.call(this, arg);
		case "dec":
			return _dec.call(this, arg);
		case "value":
			return _value.call(this, arg);
		}
	};
})(jQuery);
