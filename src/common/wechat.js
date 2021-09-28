import wx from "weixin-js-sdk"; // 引入wx
import axios from "./request";
import Service from "@/api/request-mine";

/** *
 * 微信分享
 * @param shareTitle 分享标题
 * @param shareDesc 分享详情，摘要，简介
 * @param shareLink 分享的链接 会到redirect.html 中去重定向到分享页面
 * @param shareImgUrl 分享图片地址
 */
export function wxChatShare(shareTitle, shareDesc, shareLink, shareImgUrl) {
  Service.getWXConfig().then(config => {
    let weChatId = config.data.wechatId;
    let url = window.location.href.split("#")[0];
    console.log("url", url);
    let param = {
      url: url,
      weChatId: weChatId
    };
    Service.getJsapiSignature(param).then(res => {
      console.log("分享接口res", res);
      const result = res.data;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: result.wxAppId, // 必填，公众号的唯一标识
        timestamp: result.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.nonceStr, // 必填，生成签名的随机串
        signature: result.signature, // 必填，签名，见附录1
        jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
      });
      wx.ready(function() {
        // 分享到朋友圈
        wx.updateTimelineShareData({
          title: shareTitle,
          link: shareLink,
          imgUrl: shareImgUrl,
          success: function() {
            console.log("分享到朋友圈");
          }
        });

        // 分享给朋友
        wx.updateAppMessageShareData({
          title: shareTitle,
          desc: shareDesc,
          link: shareLink,
          imgUrl: shareImgUrl,
          success: function() {
            console.log("分享给朋友");
          }
        });

        // wx.onMenuShareQQ({
        //   title: shareTitle,
        //   desc: shareDesc,
        //   link: shareLink,
        //   imgUrl: shareImgUrl
        // });
      });
    });
  });
}
/**
 * getBrandWCPayRequest 和 chooseWXPay 都是发起微信支付请求
 * chooseWXPay 依赖 http://res.wx.qq.com/open/js/jweixin-1.0.0.js
 * 也就是说，chooseWXPay 需要注入 wx.config 配置，但 getBrandWCPayRequest 不需要
 * 新版微信使用 chooseWXPay
 * 参数为接口返回 一定要主要字段取值要正确
 */
export function wxPay(
  appIdArg,
  timeStampArg,
  nonceStrArg,
  packageArg,
  signTypeArg,
  paySignArg,
  callback
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
      success: function(res) {
        //跳转到支付成功页面有这个页面
        // router.push({
        //   path: "/pay-result",
        //   query: {
        //     payData: res
        //   }
        // });
        console.log("res微信支付成功", res);
      },
      cancel: function(res) {
        callback && callback();
      },
      fail: function(res) {}
    });

    // WeixinJSBridge.invoke(
    //   "getBrandWCPayRequest",
    //   {
    //     appId: appIdArg,
    //     timeStamp: timeStampArg, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    //     nonceStr: nonceStrArg, // 支付签名随机串，不长于 32
    //     package: packageArg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
    //     signType: signTypeArg, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    //     paySign: paySignArg // 支付签名
    //   },
    //   function(res) {
    //     console.log("resssss", res);
    //     if (res.err_msg == "get_brand_wcpay_request:ok") {
    //       // 使用以上方式判断前端返回,微信团队郑重提示：
    //       //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
    //     }
    //   }
    // );
  });
  //   }
  // });
}

export function wxAuthor() {
  const _url = `//actweb.cqliving.com/weixin/getsc.html?a=70&url=${encodeURIComponent(
    window.location.href.split("#")[0]
  )}`;
  axios.post(_url).then(res => {
    if (res.code === 0) {
      const result = JSON.parse(res.data);
      let urlrouter = window.location.href.split("#/")[1]; // 当前路由
      let authorUrl =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        result.appId +
        "&redirect_uri=" +
        urlrouter +
        "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";

      console.log("微信授权连接：", authorUrl);
      window.location.href = authorUrl;
    }
  });
}
