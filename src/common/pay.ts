/*
 * @Description:拉起微信和支付宝支付公共方法
 * @Author: wanjikun
 * @Date: 2021-04-08 08:58:40
 * @LastEditTime: 2021-04-09 16:51:02
 * @LastEditors: wanjikun
 */
import wx from "weixin-js-sdk"; // 引入wx
class PayMent {
  /**
   * 获取运行环境
   * */
  get sysName() {
    let os;
    if (ZWY_CLOUD.isOpenInApp()) {
      os = "APP";
    } else {
      let wx = navigator.userAgent.toLowerCase();
      if ((wx.match(/MicroMessenger/i) as any) == "micromessenger") {
        os = "WX";
      } else {
        os = "H5";
      }
    }
    return os;
  }
  /**
   * 微信内支付
   * getBrandWCPayRequest 和 chooseWXPay 都是发起微信支付请求
   * chooseWXPay 依赖 http://res.wx.qq.com/open/js/jweixin-1.0.0.js
   * 也就是说，chooseWXPay 需要注入 wx.config 配置，但 getBrandWCPayRequest 不需要
   * 新版微信使用 chooseWXPay
   * 参数为接口返回 一定要主要字段取值要正确
   */
  private wxPay(
    appIdArg: string,
    timeStampArg: number,
    nonceStrArg: string,
    packageArg: string,
    signTypeArg: string,
    paySignArg: string,
    callback: () => void
  ) {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appIdArg, // 必填，公众号的唯一标识
      timestamp: timeStampArg, // 必填，生成签名的时间戳
      nonceStr: nonceStrArg, // 必填，生成签名的随机串
      signature: paySignArg, // 必填，签名，见附录1
      jsApiList: ["chooseWXPay"] //result.jsApiList
    });
    wx.ready(function() {
      wx.chooseWXPay({
        appId: appIdArg,
        timestamp: timeStampArg, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: nonceStrArg, // 支付签名随机串，不长于 32
        package: packageArg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: signTypeArg, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: paySignArg, // 支付签名
        success: function(res: any) {
          console.log("res微信支付成功", res);
        },
        cancel: function(res: any) {
          callback && callback();
        },
        fail: function(res: any) {}
      });
    });
  }
  /**
   * type 0:支付宝，1：微信
   */
  private doneAppPay(type: number, data: any, callback: () => void) {
    console.log("data", data);

    if (!ZWY_CLOUD.isOpenInApp()) return;

    //支付回调
    const PayStrCallback = (data: any) => {
      let res = JSON.parse(data);
      //type 0支付宝 payStr 6001； type 1支付宝 payStr -2为 取消支付
      if (
        (res.type === "0" && res.payStr === "6001") ||
        (res.type === "1" && res.payStr === "-2")
      ) {
        //取消支付
        callback && callback();
      }
    };
    (window as any).PayStrCallback = PayStrCallback;

    if (ZWY_CLOUD.getOS() == "iOS") {
      (window as any).webkit.messageHandlers.appPay.postMessage({
        type: type, //0:支付宝，1：微信
        payStr: data, //json字符串
        callback: "PayStrCallback"
      });
    } else {
      (window as any).AppJsObj.appPay(type, data, "PayStrCallback");
    }
  }
  /**
   * 拉起支付
   * payType alipay wxpay
   * payStr 接口返回的 由微信和支付宝第三方返回的字符串 一定要是字符串 如果不是要转换成字符串传进来
   */
  pay(params: { payType: "alipay" | "wxpay"; payStr: string }) {
    let { payType, payStr } = params;
    console.log("payStr", payStr);

    return new Promise((resolve, reject) => {
      if (payType === "alipay") {
        //支付宝支付
        if (this.sysName === "APP") {
          //App内
          this.doneAppPay(0, payStr, () => {
            resolve({ type: -1 });
          });
        } else {
          //h5
          const d = payStr;
          const div = document.createElement("div");
          div.innerHTML = d; //此处form就是后台返回接收到的数据
          document.body.appendChild(div);
          document.forms[0].submit();
        }
      }
      if (payType === "wxpay") {
        //微信支付
        if (this.sysName === "APP") {
          //app内
          this.doneAppPay(1, payStr, () => {
            resolve({ type: -1 });
          });
        } else if (this.sysName === "WX") {
          let resObj = JSON.parse(payStr);
          this.wxPay(
            resObj.appid,
            resObj.timestamp,
            resObj.nonce_str,
            resObj.package,
            "MD5",
            resObj.sign,
            function() {
              //取消支付
              resolve({ type: -1 });
            }
          );
        } else {
          let resObj = JSON.parse(payStr);
          let redirectUrl = location.href.slice(0, location.href.indexOf("?"));
          (window as any).location.href =
            resObj.mweb_url +
            "&redirect_url=" +
            encodeURIComponent(redirectUrl);
        }
      }
    });
  }
}
export default new PayMent();
