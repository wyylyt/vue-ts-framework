/**
 * 通用返回结构
 */
export interface IResponse {
  code: number;
  message: string;
  sessionId: string;
  success?: boolean;
  data?: any;
}
/** 首页banner图 */
interface IndexBanner {
  /** id:  */
  id: number;
  /** 轮播图  */
  image: string;
  /** 轮播名称  */
  name: string;
  /** 轮播类型(0:外链,1:商品详情,2:商品列表,3:类目列表) */
  type: number;
  /** 外链 */
  linkUrl: string;
  /** 商品id */
  commodityId: number;
}
/** 首页banner图 */
interface IndexBanner extends IResponse {
  data: IndexBanner[];
}

/** 首页分类 */
interface IndexCate {
  /** 顶图:  */
  categoryExhibitionType: number;
  /** 轮播图  */
  categoryName: string;
  /** 轮播名称  */
  categoryType: number;
  /** 轮播类型(0:外链,1:商品详情,2:商品列表,3:类目列表) */
  goodsList: goodsList[];
  /** 展示分类id */
  id: number;
  /** 分类图片 */
  image: string;
  /** 外链地址 */
  linkUrl: string;
}
/** 首页分类 */
interface IndexCate extends IResponse {
  data: IndexCate[];
}

/**商品列表*/
interface goodsList {
  /** 列表图片*/
  commodityImage: string;
  /** 商品名称 */
  commodityName: string;
  /** 商品id*/
  id: number;
  /** 是否支持积分抵扣（0:是，1:不是） */
  isPointsDeduction: number;
  /** 积分抵扣 */
  scale?: string;
  /** 原价 */
  originalPrice: number;
  /** 0:金额，1：积分兑换，2积分加金额 */
  saleType: number;
  /** 是否积分购买 */
  needPoint: number;
  /** 售价 */
  price: number;
  /** 规格id */
  specificationId: number;
  /** 商品标签(多个标签逗号隔开) */
  shopLabel: string | Array<string> | null;
}
/**商品列表*/
interface goodsList extends IResponse {
  data: goodsList[];
}

/**店铺主页*/
interface shopInfo {
  /** 店铺主营类目id*/
  categoryId: string;
  /** 店铺主营类目名称 */
  categoryName: string;
  /** 店铺id*/
  id: string;
  /**	店铺商品集合 */
  commodityList: goodsList[];
  /** 联系电话 */
  contactPhone: number;
  /** 店铺简介 */
  shopExplain: number;
  /** 店铺头像 */
  shopImg: number;
  /** 店铺logo图标 */
  shopLogo: number;
  /** 积分抵扣 */
  scale: string;
  /** 店铺名称 */
  shopName: string;
  /** 店铺类型(0:商家入驻,1:平台自营) */
  shopType: string;
}
/**店铺主页*/
interface shopInfo extends IResponse {
  data: shopInfo;
}

/**商品详情顶部导航*/
interface goodsInfoTab {
  values: string;
  id: string;
  option: number;
}

/**商品信息*/
interface goodsInfo {
  /** 评价数*/
  EvaluateCount: number;
  /** 收藏状态（0:未收藏,1已收藏） */
  collection: number;
  /** 商品详情*/
  commodityDetails: string;
  /**	商品图片(最多7张,使用","分隔符隔开) */
  commodityImage: string;
  /** 商品简介 */
  commodityIntroduction: string;
  /** 商品名称 */
  commodityName: string;
  /** 商品视频 */
  commodityVideo: string;
  /** 	商品视频封面图 */
  commodityVideoImage: string;
  /** 	商品视频时长 */
  commodityVideoDuration: number;
  /** 	用户积分 */
  currentPoint: number;
  /** 发货类型(0 快递，1自提) */
  deliveryType: number;
  /** 评价(0:商家入驻,1:平台自营) */
  evaluate: object;
  /** 评价数量 */
  evaluateCount: number;
  /** 快递发货类型(统一运费,运费模板) */
  expressType: number;
  /** 运费模板 */
  freightTemplate: number;
  /** 规格信息 */
  goodsSpecifications: Array<specsDto>;
  /** 商品id */
  id: number;
  /** 是否支持退货(0:支持，1:不支持，默认不支持) */
  isReturnGoods: number;
  /** 自提地址 */
  raisingPlace: string;
  /** 销量 */
  sales: number;
  /** 店铺id */
  shopId: number;
  /** 店铺信息 */
  shopInfo: object;
  /** 商品标签（多个用逗号隔开的） */
  labels: string;
  /** 商品标签（多个用逗号隔开的） */
  shopLabel: string;
  /** 状态（状态{3:上线,88:下线}） */
  status: number;
  /** 运费模板信息 */
  templateInfo?: object;
  /** 统一运费 */
  uniformFreight: number;
}
/**商品信息*/
interface goodsInfo extends IResponse {
  data: goodsInfo;
}

/**评论列表*/
interface commentDto {
  /** 客户端appid*/
  appid: number;
  /** 评价人头像 */
  avatar: string;
  /** 商品id*/
  commodityId: number;
  /**	评价内容 */
  content: string;
  /** 商品简介 */
  createTime: string;
  /** 商品名称 */
  creator: string;
  /** 商品视频 */
  creatorId: number;
  /** 是否已删除 */
  deleted: number;
  /** 发货类型(0 快递，1自提) */
  id: number;
  /** 评价图片（逗号分隔） */
  images: string | string[];
  /** 评价数量 */
  index: number;
  /** 订单号 */
  orderno: string;
  /** 评价店铺id */
  shopId: number;
  /** 商品规格id */
  specificationsId: number;
  /** 星级 */
  star: number;
  /** 状态(3:正常) */
  status: number;
  /** 自提地址 */
  updateTime: string;
  /** 销量 */
  updator: string;
  /** 店铺id */
  updatorId: number;
  /** 用户id */
  userId: number;
  /** 视频地址 */
  vedio: string;
}
/**评论列表*/
interface commentDto extends IResponse {
  data: commentDto[];
}

/**购物车列表*/
interface cartListDto {
  invalidData: Array<cartListInvalid>;
  shopCartData: any;
  shopCartNumber: number;
}
/**失效列表*/
interface cartListInvalid {
  /** 商品id */
  commodityId: number;
  /** 购物车id */
  id: number;
  /** 是否支持积分抵扣（ 0:是，1:不是） */
  isPointsDeduction: number;
  /** 规格名称 */
  name: string;
  /** 商品数量 */
  number: number;
  /** 售价 */
  price: number;
  /** 店铺id */
  shopId: number;
  /** 规格展示图片 */
  showImage: string;
  /** 规格id */
  specificationsId: number;
  /** 状态{3:上线,88:下线} */
  status: number;
  /** 库存 */
  stock: number;
}
/**购物车列表*/
interface cartListDto extends IResponse {
  data: cartListDto;
}

/**商品规格集合*/
interface specsDto {
  /** 获得积分 */
  giveScale: string;
  /** 规格id */
  id: number;
  /** 是否购买得积分（ 0:是，1:不是） */
  isGivePoint: number;
  /** 是否支持积分抵扣（ 0:是，1:不是） */
  isPointsDeduction: number;
  /** 是否限购（ 0:是，1:不是） */
  isPurchaseRestriction: number;
  /** 规格名称 */
  name: string;
  /** 兑换所需积分(特定规格才有) */
  needPoint: number;
  /** 原价 */
  originalPrice: number;
  /** 售价 */
  price: number;
  /** 限购数量 */
  purchaseNumber: number;
  /** 售卖类型( 0:现金购买,1:积分兑换,2:积分+现金 购买) */
  saleType: number;
  /** 积分抵扣现金 */
  scale: string;
  /** 规格展示图片 */
  showImage: string;
  /** 库存 */
  stock: number;
}
/**商品规格集合*/
interface specsDto extends IResponse {
  data: specsDto[];
}

interface orderSubmitDto {
  /**订单地址信息 没有则为空*/
  addressDTO: orderAdressDto;
  /**	合计面板数据*/
  amountData: orderAmountData;
  /**商品信息*/
  shopOrderConfirmData: Array<object>;
}
/**订单地址信息*/
interface orderAdressDto {
  /** 	详细地址 */
  addressDetail: string;
  /** 区县id */
  appid: number;
  /** 	市 */
  city: string;
  /** 	县(区) */
  county: string;
  /** 地址ID */
  id: number;
  /** 是否超出范围 */
  outOfRange: number;
  /** 	邮政编码 */
  postcode: string;
  /** 省 */
  province: string;
  /** 收货人名称 */
  receiverNickname: string;
  /** 状态{0:默认收货地址,3:可使用} */
  status: number;
  /** 	手机号 */
  telephone: string;
  /** 政务云用户id */
  userid: number;
}
/**订单合计面板*/
interface orderAmountData {
  /** 优惠 */
  discount: string;
  /** 积分抵扣 */
  pointsDeduction: number;
  /** 总运费 */
  totolFreight: string;
  /** 商品总价 */
  totolPrice: string;
  /** 用户所拥有的积分 */
  userScale: number;
}
/**订单结算*/
interface orderSubmitDto extends IResponse {
  data: orderSubmitDto;
}

/**创建订单*/
interface createOrderData {
  /** 订单号 */
  orderno: string;
  /** 支付金额 */
  payMoney: number;
}
/**创建订单*/
interface createOrderData extends IResponse {
  data: createOrderData;
}
/**
 * 浏览量日志记录Param
 */
export interface ViewLogParam {
  goodsCommodityInfoId: string;
  type: number; //来源渠道(0app，1H5, 2微信)
  token?: string;
}
