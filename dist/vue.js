/*!
 * vue-project-resumption
 * (c) 2018-2019 H_VK
 * This is the source code of vue source code analysis series.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Vue = factory());
}(this, (function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Dep = function () {
  	function Dep(data) {
  		classCallCheck(this, Dep);

  		this.subs = {};
  	}

  	// 添加订阅方法


  	createClass(Dep, [{
  		key: 'addSubs',
  		value: function addSubs(target) {
  			// 防止重复订阅
  			if (!this.subs[target.uid]) {
  				this.subs[target.uid] = target;
  			}
  		}

  		// 发布数据更改通知

  	}, {
  		key: 'notify',
  		value: function notify(newValue) {
  			for (var uid in this.subs) {
  				this.subs[uid].update(newValue);
  			}
  		}
  	}]);
  	return Dep;
  }();


  Dep.target = null;

  var Observer = function () {
  	function Observer(data) {
  		classCallCheck(this, Observer);

  		this.data = data;
  		this.observe(data);
  	}

  	// 添加观察数据方法


  	createClass(Observer, [{
  		key: 'observe',
  		value: function observe(data) {
  			var _this = this;

  			if (!((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') || !(Object.prototype.toString(data) === '[object Object]')) return;

  			Object.keys(data).forEach(function (key) {
  				_this.defineReactive(data, key, data[key]);
  			});
  		}
  	}, {
  		key: 'defineReactive',
  		value: function defineReactive(data, key, value) {
  			var dep = new Dep();

  			Object.defineProperty(data, key, {
  				configurable: true,
  				enumerable: true,
  				get: function get$$1() {
  					// 判断该对象是否为订阅对象
  					if (Dep.target) {
  						dep.addSubs(Dep.target);
  					}
  					return value;
  				},
  				set: function set$$1(newValue) {
  					if (newValue === value) return;
  					value = newValue;
  					this.observe(value);

  					// 但数值发生改变时，通知所有订阅者更新数据
  					dep.notify(value);
  				}
  			});

  			this.observe(value);
  		}
  	}]);
  	return Observer;
  }();

  var Vue = function Vue(options) {
  	classCallCheck(this, Vue);

  	options = options || {};

  	this.$vm = this;
  	this.$data = options.data || {};
  	if (options.el) {
  		this.$el = document.querySelector(options.el);
  		var ob = new Observer(this.$data);
  		if (!ob) return;
  	}
  };

  return Vue;

})));
