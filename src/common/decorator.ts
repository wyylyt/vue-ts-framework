/** 是否已加载 */
let isLoaded = false;

/**
 * 检验端方法是否可运行
 * @param someValue 一些在你开发环境中需要用到的返回值
 */
export function executable<T extends object>(someValue?: string | object) {
  return (target: T, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = new Proxy(descriptor.value, {
      // 拦截被装饰方法的调用时
      apply(proxyTarget, thisArg, argumentsList) {
        // 如果已经第一次加载(IOS第一次加载需要500毫秒缓冲)
        if (isLoaded) {
          //如果在手机端打开
          if (ZWY_CLOUD.isOpenInApp()) {
            return Reflect.apply(proxyTarget, thisArg, argumentsList);
          } else {
            //如果是测试环境
            if (process.env.NODE_ENV === "development") {
              //如果设置了默认返回值
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
              console.error("不是在APP中打开,不执行该函数");
            }
          }
        }
        // 如果未进行第一次加载(IOS第一次加载需要500毫秒缓冲)
        else {
          return Reflect.apply(
            () =>
              new Promise(resolve => {
                //进行等待缓冲
                setTimeout(() => {
                  isLoaded = true;
                  //如果在手机端打开
                  if (ZWY_CLOUD.isOpenInApp()) {
                    resolve(Reflect.apply(proxyTarget, thisArg, argumentsList));
                  } else {
                    if (process.env.NODE_ENV === "development") {
                      if (someValue) {
                        resolve(someValue);
                      }
                    } else {
                      console.error("不是在APP中打开,不执行该函数");
                    }
                  }
                }, 500);
              }),
            thisArg,
            argumentsList
          );
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
export function antiShake<T extends object>(interval: number = 500) {
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
