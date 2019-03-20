'use strict';

import Dep from './dep';

export default class Observer {
	constructor(data) {
		this.data = data;
		this.observe(data);
	}

	// 添加观察数据方法
	observe(data) {
		if (!(typeof data === 'object') || !(Object.prototype.toString(data) === '[object Object]')) return;

		Object.keys(data).forEach(key => {
			this.defineReactive(data, key, data[key]);
		});
	}

	defineReactive(data, key, value) {
		const dep = new Dep();

		Object.defineProperty(data, key, {
			configurable: true,
			enumerable: true,
			get() {
				// 判断该对象是否为订阅对象
				if (Dep.target) { dep.addSubs(Dep.target); }
				return value;
			},
			set(newValue) {
				if (newValue === value) return;
				value = newValue;
				this.observe(value);

				// 但数值发生改变时，通知所有订阅者更新数据
				dep.notify(value);

			}
		});

		this.observe(value);
	}
}
