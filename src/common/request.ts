/*
 * @Description:
 * @Author: wanjikun
 * @Date: 2020-11-10 15:52:07
 * @LastEditTime: 2021-03-20 12:10:32
 * @LastEditors: wanjikun
 */
import axios from "axios";
import qs from "qs";
import Native from "@/common/Native";
import store from "@/store/index";
import { Toast } from "vant";
import { getSystemName, needTokenInWx } from "@/common/Utils";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false,
  timeout: 9000
});

service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";

    if (!(config.data && config.data.withoutToken)) {
      config.headers.cqliving_server_token = sessionStorage.getItem("token");
    }

    // config.headers.cqliving_server_token = "ed8c2b6375b847c0b58a1717e8c9f000";

    config.data = qs.stringify(config.data);

    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  resp => {
    // TODO http异常代码处理
    // TODO 接口自定义请求异常处理
    if (resp.data.code === -1) {
      //"没有查询到相关用户"
      if (getSystemName() === "WX") {
        needTokenInWx().then(() => {
          window.location.reload();
        });
      } else {
        Native.goToken(2).then(token => {
          console.log("tokenres", token);
          store.commit("SET_TOKEN", token.token);
          window.location.reload();
        });
      }
    }

    return resp.data;
  },
  error => {
    Toast("网络异常，请稍候~ ");
    console.log("response error: ", error); // for debug
    return Promise.reject(error);
  }
);

export default service;
