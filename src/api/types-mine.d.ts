/*
 * @Description:我的模块 申明
 * @Author: wanjikun
 * @Date: 2020-11-13 09:26:04
 * @LastEditTime: 2021-03-19 12:59:48
 * @LastEditors: wanjikun
 */
/**
 * 通用返回结构
 */
export interface IResponse {
  code: number;
  message: string;
}
/**
 * 首页模块
 */
/**
 * 获取用户信息
 */
export interface UserInfoData {
  anonymousName: string; // 匿名昵称
  name: string; //姓名
  currentPoint: number; // 当前积分
  imgUrl: string; // 头像
  telephone: string; // 手机号
  waitpayOrder?: number; //待付款订单数
  waitSendOrder?: number; //待发货订单数
  waittakeOrder?: number; //待收货订单数
  waitreplyOrder?: number; //待评价订单数
  refundOrder?: number; //退款数
}
export interface UserInfo extends IResponse {
  data: UserInfoData;
}
/**
 * 获取积分明细
 */
export interface PointsDetail {
  appid: number; // 区县appid
  createTime: string; //创建时间
  details: string; // 描述
  id: number; // 区县appid
  orderno: string; //订单号
  shopImg: string; //商品图片
  sourceType: number; // 	使用业务类型{0:政务云兑换,1:购买商品使用,2:评论赠送积分,3:退款退回积分,4:退款扣除积分,5:取消订单
  usePoint: number; // 积分数(正为增加，负为减少)
  userid: number; // 政务云用户id
}
export interface PointsDetail extends IResponse {
  data: PointsDetail[];
}
/**
 * 订单模块
 */
/**
 * 单个商品
 */
export interface CommodityListItem {
  id: number;
  commodityId: string; // 商品id
  commodityName: string; // 商品名
  commodityIntroduction: string; // 商品简介
  deliveryType: string; // 支持的提货方式 0 快递 1 自提 2都可以
  commondityPrice: number; //商品单价
  payMoney: number; // 商品金额
  number: number; // 商品数量
  showImage: string; // 规格展示图片
  replyUserName: string; //评价人姓名
  replyUserAvatar: string; //评价人头像
  replyTime: string; //评价时间
  replyStar: number; //评价星级
  images: string; //评价图片
  replyContent: string; //评价内容
  specificationsId: number; //规格id
  specificationsName: string; //规格名称
  isReply: number; //是否评价(0:未评价,1:已评价)
  status: number; //(0,正常,1:退款中,2:退款完成,3:退款关闭)
  expressType: number; //快递发货类型(统一运费,运费模板) 为1时
  freightTemplate: number; //运费模板
  payType?: number; //售卖类型(0:现金购买,1:积分兑换,2:现金+积分)
}
/**
 * 单个店铺
 */
export interface OrderListItemType {
  commodityList: Array<CommodityListItem>; // 这个店铺的商品订单列表
  shopName: string; // 店铺名
  status: number; // 订单状态 (1:待付款,2:待发货,3:待收货,4:待评价,5:已评价,6:取消)
  receiveType: number; // 配送方式 (0:快递发货,1:线下自提)
  freightMoney: number; // 运费
  salePrice: number; // 总价
  discountPrice: number; // 优惠
  payMoney: number; // 实际支付金额
  shopPhone: string; // 店铺联系方式
  orderno: string; //订单号
  id: number; //id
}
/**
 * 完整订单数据
 */
export interface OrderListRes extends IResponse {
  data: Array<OrderListItemType>;
}
/**
 * 商品已评价列表接口数据
 */
export interface CommodityListRes extends IResponse {
  data: Array<CommodityListItem>;
}

/**
 * 退款数据
 */
export interface RefundOrderItem {
  commodityList: Array<CommodityListItem>; //商品列表
  contactPhone: string; //店铺联系方式
  orderno: string; //订单号
  refundContent: string; //退款理由
  refundMoney: number; //退款金额
  refundTime: string; //创建时间
  refundType: number; //退款类型(0:退货退款,1:仅退款)
  refundno: string; //退款编号
  serverDate: string; //服务器时间
  shopId: string; //店铺id
  shopName: string; //店铺名
  status: number; //售后状态(0:审核中,1:审核通过,2:已寄回商品，待商家收货,3:完成退款,4:审核不通过,5:取消退款)
  commondityCount: number; //商品总数
  totalPay: number; //商品总价
  address: string; //退回地址
  backPhone: string; //退回电话
  contact: string; //	退回联系人
  postCode: string; //	退回邮政编码
  id: number;
}
/**
 * 退款接口数据
 */
export interface RefundOrderResponse extends IResponse {
  data: Array<RefundOrderItem>;
  page: number; //
}
/**
 * 订单详情
 */
export interface OrderDetail {
  addressDetail: string; //收货地址
  commodityList: Array<CommodityListItem>; //商品列表
  discountPrice: number; //优惠金额
  freightMoney: number; //运费
  orderPoint: number; //订单赠送积分
  orderTime: string; //下单时间
  orderno: string; //订单号
  payMoney: number; //实际支付金额
  payPoint: number; //支付积分
  pointDeduct: number; //积分抵扣金额
  receiveType: number; //收货方式 0快递发货 1线下自提
  receiverNickname: string; //收货人
  salePrice: number; //总价
  shopName: string; // 店铺名
  shopPhone: string; //店铺联系方式
  speremarks: string; //备注说明
  status: number; //订单状态(1:待付款,2:待发货,3:待收货,4:待评价,5:已评价,6:取消)
  surplusTime: number; //订单剩余时间,仅待付款订单(秒)\
  telephone: string; //收货人电话
  payCode: string; //支付类型
  payTime: string; //支付时间
  trackingNumber: string; //快递单号
  deliverTime: string; //发货时间
  isovertime: number; //是否超时关闭 1 超时
}
/**
 * 订单详情 接口
 */
export interface OrderDetailRes extends IResponse {
  data: OrderDetail;
}
/**
 * 退款订单详情
 */
export interface RefundOrderDetail {
  commodityList: Array<CommodityListItem>; //商品列表
  commondityCount: number; //商品总数
  contactPhone: string; //店铺联系方式
  orderno: string; //订单号
  refundContent: string; //退款理由
  refundCause: string; //退款原因
  refundMoney: number; //退款金额
  refundTime: string; //创建时间
  refundno: string; //退款编号
  shopId: number; //店铺id
  shopName: string; // 店铺名
  status: number; // 售后状态 (0:审核中,1:审核通过,2:已寄回商品，待商家收货,3:完成退款,4:审核不通过,5:取消退款)
  totalPay: number; //商品总价
  video: string;
  images: string; //
  refundType: number; //退款类型(0:退货退款,1:仅退款)
}
/**
 * 退款订单详情接口
 */
export interface RefundOrderDetailResponse extends IResponse {
  data: RefundOrderDetail;
}
/**
 * 收货地址
 */
export interface AddressListItem {
  addressDetail: string; //详细地址
  appid: number; //区县id
  city: string; //市
  county: string; //县
  deleted: number; //是否已删除
  id: number; //
  postcode: string; //邮政编码
  province: string; //省
  receiverNickname: string; //收货人名称
  status: number; // 状态{0:默认收货地址,3:可使用}
  telephone: string; //手机号
  regionId: string;
  regionType: number; //模板id判断是否可选，默认不可选{0：不可选，1：可选}
}
/**
 * 收货地址接口
 */
export interface AddressListRes extends IResponse {
  data: Array<AddressListItem>;
}
/**
 * 根据id查询收货地址
 */
export interface AddressInfoRes extends IResponse {
  data: AddressListItem;
}
export interface AddressListItemVant {
  id: number;
  name: string;
  tel: string;
  address: string;
  isDefault: boolean;
  province?: string;
  city?: string;
  county?: string;
  addressDetail?: string;
  areaCode?: string;
}

/**
 * 包裹列表的商品
 */
export interface OdShopListItem {
  commodityDetails: string; //商品简介
  commodityImage: string; //商品图片
  commodityName: string; //商品名称
}
/**
 * 包裹列表
 */
export interface LogisticsListItem {
  id: number; //包裹id
  logisticsCompany: string; //物流公司
  logisticsNum: number; //包裹数
  trackingNumber: string; //快递单号
  odShopList: Array<OdShopListItem>;
}
/**
 * 包裹列表接口数据
 */
export interface LogisticsListRes extends IResponse {
  data: Array<LogisticsListItem>;
}
export interface IGetAliOssConfig extends IResponse {
  data: IAliOssConfig;
}
/**
 * 退款处理记录
 */
export interface RefundOrderLog {
  createTime: string; //
  creator: string;
  opContent: string;
}
/**
 * 退款处理记录接口
 */
export interface refundOrderLogRes extends IResponse {
  data: Array<RefundOrderLog>;
}
/**
 * 获取阿里配置
 */
export interface IAliOssConfig {
  /** 阿里云OSS securityToken */
  securityToken: string;
  /** 阿里云OSS accessKeySecret */
  accessKeySecret: string;
  /** 阿里云OSS accessKeyId */
  accessKeyId: string;
  /** 阿里云OSS expiration */
  expiration: string;
  /** 阿里云OSS dir */
  dir: string;
  /** 阿里云OSS endpoint */
  endpoint: string;
  /** 阿里云OSS bucket */
  bucket: string;
  /** 阿里云OSS 文件CDN地址 */
  fileCdnUrl: string;
}

/**
 * 新增收货地址
 */
export interface AddAddressParams {
  addressDetail: string; //
  city: string;
  province: string;
  county: string;
  receiverNickname: string; //收货人
  regionId: number;
  status: number; //
  telephone: string; //
  _contentType?: string;
}
/**
 * 评价商品
 */
export interface ReplyOrder {
  commodityId: any; //
  content: string; //内容
  images: string; //图片
  orderno: any; //订单号
  specificationsId: any;
  star: number;
  vedio: string;
}
// 获取退款金额
export interface QueryRefundInfoParam {
  orderno: string; //订单号
  specificationsIds: string; //规格id(逗号分隔)
}
export interface QueryRefundInfoResponse extends IResponse {
  data: {
    refundMoney: number; //退款金额
    refundType: number; //退款类型(0:退货退款,1:仅退款)
    freightMoney: number; // 运费
  };
}

/**
 * 微信公众号配置
 */
export interface WXConfig {
  appIdApp: string; //微信appid
  appid: number; // 区县appid
  name: string; //公众号名称
  secret: string; //secret
  wechatId: number; //单点登录sso中微信公众号配置id;
}
export interface WXConfigRes extends IResponse {
  data: WXConfig;
}
/**
 * 获取微信授权用户信息的参数
 */
export interface WeChartUserParam {
  code: string; //微信用户code
  weChatId: number; //微信公众号id
  appId: string | number;
}
/**
 * 微信授权用户信息
 */
export interface WeChartUserInfo {
  token: string;
  openId: string;
}
/**
 *  微信授权用户信息Res
 */
export interface WeChartUserInfoRes extends IResponse {
  data: WeChartUserInfo;
}

/**
 * 获取手机验证码参数
 */
export interface CaptchaParam {
  appId: string | number;
  phone: string;
  type: string | number;
}
/**
 * 登录参数
 */
export interface LoginParam {
  appId: string | number;
  captcha: string;
  openId: string;
  phoneNo: string;
}
export interface LoginRes extends IResponse {
  data: {
    token: string;
  };
}
/**
 * 获取微信分享配置
 * **/
export interface JsapiSignatureParameter {
  url: string;
  weChatId: number;
}
/**
 * 微信配置
 */
export interface JsapiSignature {
  nonceStr: string; //签名生成字符串
  signature: string; //签名sign
  timestamp: number; //签名时间戳
  url: string; //签名url
  wxAppId: string; //微信公众号APPID
}
export interface JsapiSignatureRequest extends IResponse {
  data: JsapiSignature;
}
