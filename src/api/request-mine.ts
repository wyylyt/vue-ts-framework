/*
 * @Description: 我的 模块的接口
 * @Author: wanjikun
 * @Date: 2020-11-10 15:52:07
 * @LastEditTime: 2021-03-29 16:23:53
 * @LastEditors: wanjikun
 */
import request from "@/common/request";
import store from "@/store";
import {
  IResponse,
  UserInfo,
  CommodityListRes,
  RefundOrderResponse,
  RefundOrderDetailResponse,
  OrderDetailRes,
  AddressListRes,
  AddressInfoRes,
  IGetAliOssConfig,
  LogisticsListRes,
  refundOrderLogRes,
  AddAddressParams,
  ReplyOrder,
  QueryRefundInfoParam,
  QueryRefundInfoResponse,
  WXConfigRes,
  WeChartUserParam,
  WeChartUserInfoRes,
  CaptchaParam,
  LoginParam,
  LoginRes,
  JsapiSignatureParameter,
  JsapiSignatureRequest
} from "./types-mine";
import { needToken } from "@/common/decorator";
/**
 * 网络请求类 接口调用
 */
class RequestMine {
  get token() {
    return store.state.token;
  }
  get appId() {
    return store.state.appId;
  }
  private get(url: string, param: any): Promise<any> {
    param.appid = this.appId;
    return new Promise((resolve, reject) => {
      request
        .get(url, { params: param })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  private post(url: string, param: any): Promise<any> {
    param.appid = this.appId;
    return new Promise((resolve, reject) => {
      request
        .post(url, param)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  /**
   * 获取用户信息
   */
  @needToken(true, true)
  getUerInfo(): Promise<UserInfo> {
    return this.get("/ykg-user/user/getUerInfo", {});
  }
  /**
   * 获取订单列表
   */
  @needToken(true, true)
  getPointDetail(params: any): Promise<any> {
    return this.post("/ykg-user/user/getPointsLosList", params);
  }
  /**
   * 获取订单列表
   */
  @needToken(true, true)
  getOrderList(params: any): Promise<any> {
    return this.get("/ykg-order/order/orderList", params);
  }
  /**
   * 获取已评价商品列表
   */
  @needToken(true, true)
  getEvalutionList(params: any): Promise<CommodityListRes> {
    return this.get("/ykg-order/order/orderReplyList", params);
  }
  /**
   * 获取退款数据
   * 这个接口传lastId
   */
  @needToken(true, true)
  getRefundOrderList(params: any): Promise<RefundOrderResponse> {
    return this.get("/ykg-order/refundOrder/refundOrderList", params);
  }
  /**
   * 获取退款列表数据
   * 这个接口改为传page
   */
  getRefundOrderList2(params: any): Promise<RefundOrderResponse> {
    return this.get("/ykg-order/refundOrder/refundOrderList2", params);
  }
  /**
   * 获取订单详情
   */
  @needToken(true, true)
  getOrderDetails(params: any): Promise<OrderDetailRes> {
    return this.get("/ykg-order/order/orderDetail", params);
  }
  /**
   * 获取收货地址
   */
  @needToken(true, true)
  getAddressList(params: any): Promise<AddressListRes> {
    return this.get("/ykg-user/user/addressList", params);
  }
  /**
   * 根据 id获取地址信息
   */
  getAddressById(params: any): Promise<AddressInfoRes> {
    return this.get("/ykg-user/user/getAddressById", params);
  }
  /**
   * 获取包裹列表
   */
  getLogisticsList(params: any): Promise<LogisticsListRes> {
    return this.get("/ykg-order/order/logisticsList", params);
  }
  /**
   * 获取退款处理记录
   */
  getRefundOrderLog(params: any): Promise<refundOrderLogRes> {
    return this.get("/ykg-order/refundOrder/refundOrderLog", params);
  }
  /**
   * 获取退款订单详情
   */
  getRefundOrderDetail(params: any): Promise<RefundOrderDetailResponse> {
    return this.get("/ykg-order/refundOrder/refundOrderDetail", params);
  }
  /**
   * 获取阿里云配置
   * @param suffix 文件后缀
   */
  getAliOssConfig(suffix: string): Promise<IGetAliOssConfig> {
    let url = process.env.VUE_APP_ZWY_API;

    return request.post(
      `${url}/common/alioss/getConfig.html`,
      // "http://192.168.6.136:8088/common/alioss/getConfig.html",
      {
        appId: this.appId,
        suffix,
        withoutToken: true
      }
    );
  }
  /**
   * 修改订单地址
   */
  editOrderAddress(params: any): Promise<IResponse> {
    return this.post("/ykg-order/order/editOrderAddress", params);
  }
  /**
   * 获取区域列表
   */
  getRegion(params: any): Promise<any> {
    return this.post("/ykg-user/ol/getRegion", params);
  }
  /**
   * 新增收货地址
   */
  addAddress(params: AddAddressParams): Promise<any> {
    return this.post("/ykg-user/user/saveAddress", params);
  }
  /**
   * 修改收货地址
   */
  editAddress(params: AddAddressParams): Promise<any> {
    return this.post("/ykg-user/user/updateAddress", params);
  }
  /**
   * 删除收货地址
   */
  delAddress(params: any): Promise<any> {
    return this.post("/ykg-user/user/deleteAddress", params);
  }
  /**
   * 取消订单
   */
  cancelOrder(params: any): Promise<any> {
    return this.post("/ykg-order/order/cancelOrder", params);
  }
  /**
   * 申请退款
   */
  applyRefundOrder(params: any): Promise<any> {
    return this.post("/ykg-order/refundOrder/applyRefundOrder", params);
  }
  /**
   * 修改退款申请
   */
  editRefundOrder(params: any): Promise<any> {
    return this.post("/ykg-order/refundOrder/editRefundOrder", params);
  }
  /**
   * 取消退款
   */
  cancelRefundOrder(params: any): Promise<IResponse> {
    return this.post("/ykg-order/refundOrder/cancelRefundOrder", params);
  }
  /**
   * 确认收货
   */
  confirmOrder(params: any): Promise<IResponse> {
    return this.post("/ykg-order/order/confirmOrder", params);
  }
  /**
   * 评价商品
   */
  replyOrder(params: ReplyOrder): Promise<IResponse> {
    return this.post("/ykg-order/reply/replyOrder", params);
  }
  /**
   * 删除订单
   */
  delOrder(params: any): Promise<IResponse> {
    return this.post("/ykg-order/order/delOrder", params);
  }
  /**
   * 快递公司列表
   */
  getExpressCompany(params: any): Promise<any> {
    return this.get("/ykg-order/refundOrder/getExpressCompany", params);
  }
  /**
   * 退回商品
   */
  backRefundOrderCommodity(params: any): Promise<any> {
    return this.post("/ykg-order/refundOrder/backRefundOrderCommodity", params);
  }
  /**
   * 获取退款金额
   */
  getQueryRefundInfo(
    params: QueryRefundInfoParam
  ): Promise<QueryRefundInfoResponse> {
    return this.post("/ykg-order/refundOrder/queryRefundInfo", params);
  }

  /**
   * 获取微信公众号信息
   */
  getWXConfig(): Promise<WXConfigRes> {
    return this.get("/ykg-shop/shp/bindingWechat/getBinding", {});
  }
  /**
   * 获取微信授权用户信息
   */
  getWechatUserInfo(params: WeChartUserParam): Promise<WeChartUserInfoRes> {
    return this.get("/cqliving-boot-sso/weChat/userInfo", params);
  }
  /**
   * 获取验证码
   */
  getCaptcha(params: CaptchaParam): Promise<any> {
    return this.post("/cqliving-boot-sso/auth2/getCaptcha", params);
  }
  /**
   * 微信绑定手机号
   */
  login(params: LoginParam): Promise<LoginRes> {
    return this.post("/cqliving-boot-sso/weChat/userBindPhoneCaptcha", params);
  }
  /**
   * 获取微信分享的配置
   */
  getJsapiSignature(
    params: JsapiSignatureParameter
  ): Promise<JsapiSignatureRequest> {
    return this.get("/cqliving-boot-sso/weChat/jsapiSignature", params);
  }
}
export default new RequestMine();
