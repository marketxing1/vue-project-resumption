'use strict';

import Observer from './observer';

export default class Vue {
	constructor(options) {
		options = options || {};

		this.$vm = this;
		this.$data = options.data || {};
		if (options.el) {
			this.$el = document.querySelector(options.el);
			const ob = new Observer(this.$data);
			if (!ob) return;
		}
	}
}
