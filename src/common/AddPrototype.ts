interface PropertyDescriptor {
  [key: string]: any; // Add index signature
}
interface Object {
  /**
   *  方法返回通过测试（函数内判断）的数组的第一个元素的值
   * @param {object}  func 必需。数组每个元素需要执行的函数
   */
  find: (func: (item: any) => any) => object | undefined;
}
interface Date {
  /**
   * 格式化时间
   * @param {string}  rule 格式化规则 默认 yyyy-MM-dd hh:mm:ss
   */
  format: (rule?: string) => string;
}

interface Array<T> {
  /**
   * 最后一个元素
   */
  lastChild: T;
}
Reflect.defineProperty(Object.prototype, "find", {
  value(callBack: (item: object) => {}) {
    if (typeof callBack === "function") {
      for (const key in this) {
        if (this.hasOwnProperty(key)) {
          if (callBack(this[key])) {
            return this[key];
          }
        }
      }
    }
  }
});
Reflect.defineProperty(Date.prototype, "format", {
  value(rule: string = "yyyy-MM-dd hh:mm:ss") {
    const year = this.getFullYear() + "";
    const month = this.getMonth() + 1 + "";
    const day = this.getDate() + "";
    const hour = this.getHours() + "";
    const minutes = this.getMinutes() + "";
    const second = this.getSeconds() + "";
    rule = rule.replace(/yyyy/g, year);
    rule = rule.replace(/MM/g, month.padStart(2, "0"));
    rule = rule.replace(/dd/g, day.padStart(2, "0"));
    rule = rule.replace(/hh/g, hour.padStart(2, "0"));
    rule = rule.replace(/mm/g, minutes.padStart(2, "0"));
    rule = rule.replace(/ss/g, second.padStart(2, "0"));
    return rule;
  }
});

Reflect.defineProperty(Array.prototype, "lastChild", {
  get: function<T>(): T {
    return this[this.length - 1];
  }
});
