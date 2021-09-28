import { Dialog } from "vant";
import native from "@/common/Native";
import store from "@/store";
import { getSystemName, needTokenInWx } from "@/common/Utils";
/* global ZWY_CLOUD:true */

/**
 * 检验端方法是否可运行(如果在端内则调用交互js，如果在端外则跳转下载页 - 开发环境会返回预设的值)
 * @param someValue 一些在你开发环境中需要用到的返回值
 */
export function executable<T extends object>(someValue?: string | object) {
  return (target: T, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = new Proxy(descriptor.value, {
      // 拦截被装饰方法的调用时
      apply(proxyTarget, thisArg, argumentsList) {
        // 如果在手机端打开
        if (ZWY_CLOUD.isOpenInApp()) {
          return Reflect.apply(proxyTarget, thisArg, argumentsList);
        } else {
          // 如果是测试环境
          if (process.env.NODE_ENV === "development") {
            // 如果设置了默认返回值
            if (someValue) {
              return Reflect.apply(
                () =>
                  new Promise(resolve => {
                    resolve(someValue);
                  }),
                thisArg,
                argumentsList
              );
            }
          } else {
            if (store.state.downloadUrl) {
              location.href = store.state.downloadUrl;
            }
          }
        }
      }
    });
  };
}

let isOver = false;

/**
 * 防抖
 * @param interval 间隔
 */
export function antiShake<T extends object>(interval = 500) {
  return function(
    target: T,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.value = new Proxy(descriptor.value, {
      // 拦截被装饰方法的调用时
      apply(proxyTarget, thisArg, argumentsList) {
        if (!isOver) {
          isOver = true;
          setTimeout(() => {
            isOver = false;
          }, interval);
          return Reflect.apply(proxyTarget, thisArg, argumentsList);
        }
      }
    });
  };
}
/**
 * 标识当前操作需要Token
 * @param required 是否必须使用token,true的话未登录时会强制进入登录页
 * @param needPhone 是否必须使用手机号登录,必须在required == true 时才有效
 */
export function needToken<T extends object>(
  required: boolean,
  needPhone = false
) {
  return function(
    target: T,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.value = new Proxy(descriptor.value, {
      // 拦截被装饰方法的调用时
      apply(proxyTarget, thisArg, argumentsList) {
        if (store.state.token) {
          return Reflect.apply(proxyTarget, thisArg, argumentsList);
        }
        // process.env.NODE_ENV === "development" || ZWY_CLOUD.isOpenInApp()
        if (ZWY_CLOUD.isOpenInApp()) {
          return new Promise(resolve => {
            if (required) {
              native.getUserInfo().then(info => {
                if (needPhone && !info.phone) {
                  native.goToken(2).then(() => {
                    store.commit("SET_TOKEN", info.token);
                    if (location && location.reload) {
                      location.reload();
                    }
                  });
                } else {
                  store.commit("SET_TOKEN", info.token);
                  store.commit("SET_STATE", info);
                  resolve(Reflect.apply(proxyTarget, thisArg, argumentsList));
                }
              });
            } else {
              native.getUserInfo().then(info => {
                store.commit("SET_TOKEN", info.token);
                store.commit("SET_STATE", info);
                resolve(Reflect.apply(proxyTarget, thisArg, argumentsList));
              });
            }
          });
        } else if (getSystemName() === "WX") {
          //微信内打开需要微信授权并登陆
          if (required && !store.state.Token) {
            needTokenInWx().then(res => {
              if (location && location.reload) {
                location.reload();
              }
              // return Reflect.apply(proxyTarget, thisArg, argumentsList);
            });
          } else {
            return Reflect.apply(proxyTarget, thisArg, argumentsList);
          }
        } else {
          if (required) {
            location.href =
              "http://www.newchongqing.com/install/index.html?id=" +
              store.state.appId;
          }
          return Reflect.apply(proxyTarget, thisArg, argumentsList);
        }
      }
    });
  };
}
