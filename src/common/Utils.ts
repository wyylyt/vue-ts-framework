/*
 * @Description:
 * @Author: wanjikun
 * @Date: 2020-11-10 15:52:07
 * @LastEditTime: 2021-09-28 09:31:31
 * @LastEditors: wanjikun
 */
import store from "@/store";
import router from "@/router";
import Service from "@/api/request-mine";
import { WeChartUserParam } from "@/api/types-mine";
import { Toast } from "vant";
/** 短横线转驼峰 */
export function underlineToHump(str: string) {
  const strList = str.split("-");
  return strList
    .map(item => {
      item = item.slice(0, 1).toUpperCase() + item.slice(1);
      return item;
    })
    .join("");
}

/**返回app名*/
export enum AppInfo {
  "新重庆" = 1,
  "巫山" = 2,
  "五彩石柱" = 3,
  "掌新南岸" = 4,
  "巫溪" = 5,
  "人人长寿" = 6,
  "武隆印象" = 7,
  "今日合川" = 8,
  "永川头条" = 9,
  "铜梁" = 10,
  "爱璧山" = 11,
  "渝北掌媒" = 12,
  "翠翠秀山" = 13,
  "品位忠州" = 14,
  "缙享北碚" = 15,
  "爱涪陵" = 16,
  "大美綦江" = 17,
  "重庆垫江" = 18,
  "重庆渝中" = 19,
  "家在奉节" = 20,
  "苗乡彭水" = 21,
  "帅开州" = 22,
  "家在梁平" = 23,
  "酉州城事" = 24,
  "最江津" = 25,
  "家在黔江" = 26,
  "重庆江北" = 27,
  "看万州" = 28,
  "幸福万盛" = 29,
  "重庆荣昌" = 30,
  "看丰都" = 31,
  "今日南川" = 32,
  "见十" = 33,
  "看巴南" = 34,
  "掌上城口" = 35,
  "沙磁荟" = 36,
  "新潼南" = 37,
  "掌上大足" = 38,
  "义渡热爱" = 39,
  "智慧云阳" = 40,
  "无线铜梁" = 41,
  "全球渝商" = 50,
  "汽车频道" = 51,
  "手机cms" = 52,
  "重庆市政府" = 53,
  "华龙家园" = 59,
  "投资渝中" = 60,
  "重庆618" = 62,
  "重庆联盟" = 71
}
/**
 * 获取url参数
 */
export function getUrlParam(name: string) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * 获取运行环境
 */
export function getSystemName() {
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
 * 处理url 去掉微信返回时带的参数
 */
export function handleWXbackUrl() {
  const w = location.href.indexOf("?");
  const j = location.href.indexOf("#");
  let href = window.location.href;
  let url;
  if (w !== -1 && j > w) {
    href =
      location.href.substr(0, w) +
      location.href.substr(j, location.href.length);
    url = href;
  } else {
    url = location.href;
  }
  return encodeURIComponent(url);
}
/**
 * 获取微信用户信息
 */
export function getWechatUserInfoFun(params: WeChartUserParam, url: string) {
  return new Promise((resolve, reject) => {
    Service.getWechatUserInfo(params).then(res => {
      //getWechatUserInfo接口获取微信授权用户信息
      console.log("获取微信授权用户信息", res);
      if (res.code === 0) {
        //获取成功处理token及一系列操作
        store.commit("SET_OPENID", res.data.openId);
        if (!res.data.token) {
          router.push({
            path: "/login",
            query: {
              from: url
            }
          });
        } else {
          store.commit("SET_TOKEN", res.data.token);
          resolve(res.data.token);
        }
      } else {
        //获取失败需要重新授权
        needTokenInWx(true);
      }
    });
  });
}
/**
 * 微信端内需要微信授权
 * 获取到token后存入store并resovle出去了
 * again 当前code有问题 重新获取授权
 */
export function needTokenInWx(again?: boolean) {
  return new Promise((resolve, reject) => {
    Service.getWXConfig().then(config => {
      //getWXConfig接口先获取公众号配置 获取id

      let secret, weChatId, appIdApp;
      secret = config.data.secret;
      weChatId = config.data.wechatId || 8;
      appIdApp = config.data.appIdApp || "wx113b7c2747b3fad5";
      let url = encodeURIComponent(window.location.href); //处理授权redirect_uri
      let code = getUrlParam("code"); //获取url上的code

      let token = store.state.Token;
      if (!code || again) {
        //当url没有code或者是再次重新授权时
        if (again && code) {
          //重新授权时处理url去掉微信授权返回的那些参数
          url = handleWXbackUrl();
          console.log("url", url);
        }
        window.location.replace(
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appIdApp}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        );
      } else {
        //当url有code时，此情况有可能是授权完成返回页面 或者 用户通过一个带有无效code的链接进入
        if (token) {
          //有token时说明已经授权完成 不需要再授权
          resolve(token);
        } else {
          let params = {
            appId: store.state.appId,
            code: code,
            weChatId: weChatId
          };
          //没有token时需要通过url的code调取接口获取用户信息
          getWechatUserInfoFun(params, url).then(response => {
            resolve(response);
          });
        }
      }
    });
  });
}
