'use strict';

export default class Dep {
	constructor(data) {
		this.subs = {};
	}

	// 添加订阅方法
	addSubs(target) {
		// 防止重复订阅
		if (!this.subs[target.uid]) {
			this.subs[target.uid] = target;
		}
	}

	// 发布数据更改通知
	notify(newValue) {
		for (let uid in this.subs) {
			this.subs[uid].update(newValue);
		}
	}
}

Dep.target = null;
