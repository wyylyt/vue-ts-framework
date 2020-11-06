import wx from "weixin-js-sdk"; // 引入wx
import axios from "./request";

/** *
 * 微信分享
 * @param shareTitle 分享标题
 * @param shareDesc 分享详情，摘要，简介
 * @param shareLink 分享的链接 会到redirect.html 中去重定向到分享页面
 * @param shareImgUrl 分享图片地址
 */
export function wxChatShare(shareTitle, shareDesc, shareLink, shareImgUrl) {
  const _url = `//actweb.cqliving.com/weixin/getsc.html?a=6&url=${encodeURIComponent(
    window.location.href.split("#")[0]
  )}`;
  axios.post(_url).then(res => {
    if (res.code === 0) {
      const result = JSON.parse(res.data);
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: result.appId, // 必填，公众号的唯一标识
        timestamp: result.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.nonceStr, // 必填，生成签名的随机串
        signature: result.signature, // 必填，签名，见附录1
        jsApiList: result.jsApiList
      });
      wx.ready(function() {
        // 分享到朋友圈

        wx.onMenuShareTimeline({
          title: shareTitle,
          link: shareLink,
          imgUrl: shareImgUrl
        });

        // 分享给朋友
        wx.onMenuShareAppMessage({
          title: shareTitle,
          desc: shareDesc,
          link: shareLink,
          imgUrl: shareImgUrl
        });

        wx.onMenuShareQQ({
          title: shareTitle,
          desc: shareDesc,
          link: shareLink,
          imgUrl: shareImgUrl
        });
      });
    }
  });
}
