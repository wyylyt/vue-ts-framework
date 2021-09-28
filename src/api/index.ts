/*
 * @Description:
 * @Author: wanjikun
 * @Date: 2020-11-10 15:52:07
 * @LastEditTime: 2021-03-30 09:02:44
 * @LastEditors: wanjikun
 */
import request from "../common/request";
import store from "@/store";
import { Toast } from "vant";

import {
  IResponse,
  IndexBanner,
  IndexCate,
  goodsList,
  shopInfo,
  goodsInfo,
  commentDto,
  cartListDto,
  specsDto,
  orderSubmitDto,
  createOrderData,
  ViewLogParam
} from "./types.d";
import { needToken } from "@/common/decorator";

/**
 * 网络请求类 接口调用
 */
class RequestIndex {
  get token() {
    return store.state.token;
  }
  get appId() {
    return store.state.appId;
  }
  private get(url: string, param: object): Promise<any> {
    return new Promise((resolve, reject) => {
      request
        .get(url, { params: param })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  private post(url: string, param: object): Promise<any> {
    return new Promise((resolve, reject) => {
      request
        .post(url, param)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  /**
   * 查询首页banner图  /ykg-commodity/getBanner
   * @param appid 客户端id
   */
  getIndexBanner(): Promise<IndexBanner> {
    return request.post("/ykg-commodity/getBanner", {
      appid: this.appId
    });
  }
  /**
   * 查询首页分类  /ykg-commodity/getCategory
   * @param Type 展示分类类型(0:分类推荐，1:分类入口)
   * @param appid 客户端id
   */
  getIndexCate(type: number): Promise<IndexCate> {
    return request.post("/ykg-commodity/getCategory", {
      Type: type,
      appid: this.appId
    });
  }
  /**
   * 根据条件获取商品列表  /ykg-commodity/getGoodsList
   * @param categoryId 分类id
   * @param page 页码
   * @param commodityName 商品名称
   * @param priceSort 价格排序 0降序 1升序
   * @param sortNo 排序码排序 0降序 1升序
   * @param appid 客户端id
   */
  getGoodsList(obj: any): Promise<goodsList> {
    return request.post("/ykg-commodity/getGoodsList", {
      categoryId: obj.categoryId,
      page: obj.page,
      commodityName: obj.commodityName,
      priceSort: obj.priceSort,
      sortNo: obj.sortNo,
      appid: this.appId
    });
  }
  /**
   * 根据bannerid获取商品列表  /ykg-commodity/getBannerGoodsList
   * @param bannerId bannerid
   * @param page 页码
   * @param commodityName 商品名称
   * @param priceSort 价格排序 0降序 1升序
   * @param sortNo 排序码排序 0降序 1升序
   * @param appid 客户端id
   */
  getBannerGoodsList(obj: any): Promise<goodsList> {
    return request.post("/ykg-commodity/getBannerGoodsList", {
      bannerId: obj.bannerId,
      page: obj.page,
      commodityName: obj.commodityName,
      priceSort: obj.priceSort,
      sortNo: obj.sortNo,
      appid: this.appId
    });
  }

  /**
   * 根据bannerid获取商品列表  /ykg-commodity/addShopCart
   * @param number 添加数量
   * @param specificationsId 规格id
   * @param appid 客户端id
   */
  @needToken(true)
  addGoodsInCart(obj: any): Promise<IResponse> {
    return request.post("/ykg-commodity/addShopCart", {
      number: obj.number,
      specificationsId: obj.specificationsId,
      appid: this.appId
    });
  }

  /**
   * 更新购物车数量  /ykg-commodity/updateCartNumber
   * @param number 添加数量
   * @param shopCartId 购物车id
   * @param specificId 规格id
   * @param appid 客户端id
   */
  @needToken(true, true)
  updateCartNumber(obj: any): Promise<IResponse> {
    return request.post("/ykg-commodity/updateCartNumber", {
      number: obj.number,
      shopCartId: obj.shopCartId,
      specificId: obj.specificId,
      appid: this.appId
    });
  }

  /**
   * 查询规格  /ykg-commodity/getSpecificListByCommodityId
   * @param CommodityId 购物车id
   */
  getSpecificListByCommodityId(id: number): Promise<specsDto> {
    return request.post("/ykg-commodity/getSpecificListByCommodityId", {
      CommodityId: id
    });
  }

  /**
   * 删除购物车  /ykg-commodity/deleteShopCart
   * @param shopCartIds 购物车id
   * @param appid 客户端id
   */
  @needToken(true, true)
  deleteShopCart(shopCartIds: string): Promise<IResponse> {
    return request.post("/ykg-commodity/deleteShopCart", {
      shopCartIds: shopCartIds,
      appid: this.appId
    });
  }

  /**
   * 根据id获取商品信息  /ykg-commodity/addShopCart
   * @param goodsId 商品id
   * @param appid 客户端id
   */
  getGoodsInfo(id: string): Promise<goodsInfo> {
    return request.post(`/ykg-commodity/getGoodsInfo/${this.appId}/${id}`, {});
  }
  /**
   * 根据id获取商品信息 /ykg-commodity/getGoodsInfoHistory
   * @param goodsId 商品id
   * @param historyId 快照id
   */
  getHistoryGoodsInfo(id: string, hisId: string): Promise<goodsInfo> {
    return request.post("/ykg-commodity/getGoodsInfoHistory", {
      goodsId: id,
      historyId: hisId
    });
  }

  /**
   * 根据商品id获取评论列表  /ykg-order/reply/replyList
   * @param commodityId 商品id
   * @param appid 客户端id
   */
  getCommentList(id: string): Promise<commentDto> {
    return request.post("/ykg-order/reply/replyList", {
      commodityId: id,
      appid: this.appId
    });
  }
  /**
   * 根据商品id获取评论列表  /ykg-commodity/getShopCart
   * @param appid 客户端id
   */
  @needToken(true, true)
  getShopCartList(): Promise<cartListDto> {
    return request.post("/ykg-commodity/getShopCart", {
      appid: this.appId
    });
  }

  /**
   * 立即购买  /ykg-commodity/confirmOrder
   * @param appid 客户端id
   */
  @needToken(true, true)
  confirmOrder(obj: object): Promise<orderSubmitDto> {
    return request.post("/ykg-commodity/confirmOrder", obj);
  }

  /**
   * 立即购买  /ykg-order/order/createOrder
   * @param appid 客户端id
   * @param addressId 地址id
   * @param orderSource 来源(0:客户端,1:微信)
   * @param receiveType 收货方式
   * @param shopId 店铺id
   * @param commoditys 商品信息
   * @param payPoint 抵扣积分
   * @param speremarks 备注说明
   */
  @needToken(true, true)
  createOrder(obj: object): Promise<createOrderData> {
    return request.post("/ykg-order/order/createOrder", obj);
  }

  /**
   * 支付  /ykg-order/pay/pay
   * @param cqliving_appid 客户端id
   * @param orderno 订单号
   * @param platform 支付平台{0:支付宝,1：微信}
   * @param orderno 订单号
   * @param type 下单类型{10:支付宝-PC网站支付,11：支付宝-手机移动网站,12:支付宝-手机移app支付,20:微信-app支付,21:微信-公众号支付,22:微信-扫码支付,23:微信-h5支付}
   * @param openid 微信公众号内支付需要授权
   */
  @needToken(true, true)
  payOrder(
    orderno: string,
    type: number,
    platform: number,
    openid?: number | string
  ): Promise<any> {
    // return request.post("/ykg-order/pay/pay", {
    //   cqlivingAppId: this.appId,
    //   orderno: orderno,
    //   paymentType: type,
    //   paymentPlatform: platform,
    //   openId: openid ? openid : null
    // });
    return new Promise((resolve, reject) => {
      // http://8ruj94.natappfree.cc/pay/pay
      request
        .post("/ykg-order/pay/pay", {
          cqlivingAppId: this.appId,
          orderno: orderno,
          paymentType: type,
          paymentPlatform: platform,
          openId: openid ? openid : null
        })
        .then((result: any) => {
          if (result.code >= 0) {
            resolve(result.data);
          } else {
            Toast(result.message);
            resolve(result.data);
          }
        });
    });
  }

  /**
   * 根据条件获取商品列表    /ykg-shop/getShopHomepage
   * @param id 店铺id
   * @param appid 客户端id
   */
  getShopInfo(id: number | string): Promise<shopInfo> {
    return request.get(
      "/ykg-shop/getShopHomepage?id=" + id + "&appid=" + this.appId
    );
  }
  getIndexShowType(): Promise<IResponse> {
    return request.get(
      "/cqliving-boot-bizconfig/feign/prop-data-detail?dataIds=" +
        process.env.VUE_APP_INDEX_SHOW_TYPE
    );
  }
  /**
   * 根据订单号查询店铺是否当前APP内店铺
   */
  @needToken(true, true)
  queryShopId(orderno: any): Promise<any> {
    return request.get(`/ykg-order/order/queryOrderAppid?orderno=${orderno}`);
  }
  /**
   * 埋点
   */
  addViewLog(params: ViewLogParam): Promise<IResponse> {
    return this.post("/ykg-commodity/addViewLog", params);
  }
}
export default new RequestIndex();
