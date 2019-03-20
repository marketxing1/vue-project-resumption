
### 1. `Vue` 中的双向数据绑定是怎么实现的？


    vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty() 来劫持各个属性的 setter，getter，
    在数据变动时发布信息给订阅者，触发相应的回调监听。

具体步骤：

```javascript
1. 循环遍历 data 下所有数据对象属性，并添加到 发布者-订阅者模式 中进行管理。

class Observer {
  constructor(data) {
    this.data = data;
    this.observe(data);
  }

  // 添加观察数据方法
  observe(data) {
    if(!(typeof data === 'object') || !(Object.prototype.toString(data) === '[object Object]')) return;

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
        if(Dep.target) { dep.addSubs(Dep.target);  }
        return value;
      },
      set(newValue) {
        if(newValue === value) return;
        value = newValue;
        this.observe(value);

        // 当数值发生改变时，通知所有订阅者更新数据
        dep.notify(value);

      }
    });

    this.observe(value);
  }
}


class Dep {
  constructor(data) {
    this.subs = {};
  }

  // 添加订阅方法
  addSubs(target) {
    // 防止重复订阅
    if(!this.subs[target.uid]) {
      this.subs[target.uid] = target;
    }
  }

  // 发布数据更改通知
  notify(newValue) {
    for(let uid in this.subs) {
      this.subs[uid].update(newValue);
    }
  }
}

Dep.target = null;
```
