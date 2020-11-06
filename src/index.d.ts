interface vicArray {
  /**图片地址 */
  imgUrl: string;

  /**图片描述 */
  desc: string;
}

/**文件上传（新）方法   图片参数 */

interface fuImage {
  /**图片KB大小  单张图片 */
  size: number;

  /**图片数量 */
  num: number;

  /**图片裁剪配置*/
  cfg: fuImageCfg;
}

/**文件上传（新）方法   图片参数  图片裁剪配置*/

interface fuImageCfg {
  /**是否裁剪*/
  isCut: boolean;

  /**裁剪后宽度 isCut为true时生效*/
  thumbWidth?: number;

  /**裁剪后高度 isCut为true时生效*/
  thumbHeight?: number;
}

/**文件上传（新）方法   视频参数 */

interface fuVideo {
  /**时长   单位秒*/
  time: number;
}

/**文件上传（新）方法   音频参数 */

interface fuAudio {
  /**时长   单位秒*/
  time: number;
}

/**文件上传（新）方法   视频参数 */

interface fuFile {
  /**KB大小*/
  size: number;
}

/**自定义参数模式 */

interface customParam {
  [propName: string]: any;
}

/**


 * 调用原生APP的功能库
 */
declare const ZWY_CLOUD: {
  /**


   * 无回调获取登录信息
   * @param 无
   * @response {obj}
   */
  getUserInfo(): {
    /**用户token*/
    token: string;

    /**用户sessionId*/
    sessionId: string;

    /**用户手机号码*/
    phone: string;
  };
  /**


   * 获取登录信息
   * @params {object} params 参数
   */
  appSessionToken(params: {
    /**登录方式 0：不需要登录，1：需要登录，2：需要登录（只能用手机号码登录）*/
    loginType: number;

    /**回调函数名  参数 string：{token:'',sessionId:'',phone:''}*/
    callback: string;
  }): void;
  /**


   * 调用强制登录
   * @params {object} params 参数
   */
  appForceToken(params: {
    /**登录方式 1：需要登录，2：需要登录（只能用手机号码登录）*/
    loginType: number;

    /**回调函数名  参数 string：{token:'',sessionId:'',phone:''}*/
    callback: string;
  }): void;
  /**


   * 分享
   * @params {object} params 参数
   */
  share(params: {
    /**分享标题  必传*/
    title: string;

    /**分享内容  必传*/
    content: string;

    /**分享图标  必传*/
    icon: string;

    /**分享地址  必传*/
    url: string;

    /**业务类型  必传*/
    sourceType: number;

    /**分享失败调用函数*/
    error?: string;

    /**分享成功回调函数*/
    success?: string;
  }): void;
  /**


   * 图片放大预览
   * @params {object} params 参数
   */
  viewImageContent(params: {
    /**图片数组 */
    array: vicArray[];

    /**初始预览编号 0:第一张 */
    index: number;
  }): void;
  /**


   * 原生消息提示(一段时间后自动消失)
   * @param {object} params 参数
   */
  appShowMessage(params: {
    /**提示消息*/
    message: string;

    /**消息显示时间*/
    time: number;
  }): void;
  /**


   * 原生消息提示(点击确定按钮消失)
   * @param {object} params 参数
   */
  appAlert(params: {
    /**消息提示内容 */
    message: string;
  }): void;
  /**


   * 原生确认消息框
   * @param {object} params 参数
   */
  appConfirm(params: {
    /**提示标题，非必传,app判断空时默认为”提示” */
    title: string;

    /**提示消息，必传 */
    msg: string;

    /**点击确认执行方法 为空时不调用 */
    callback: string;
  }): void;
  /**


   * 打开原生webview
   * @param {object} params 参数
   */
  redirectUrl(params: {
    /** 主键ID*/
    id: number | string;

    /** 引用的内容ID*/
    sourceId: string;

    /** 详情页打开方式：{1:图文新闻,2:普通新闻,3:专题新闻,4:随手拍,5:段子,7:话题,8:纯webView展示(无导航栏和底部评论),9:带有系统导航栏的webView,10:旅游详情,11:旅游专题详情,98:新版特殊webview,99:特殊webview}  暂定*/
    detailViewType: string;

    /** 来源类型：{1:新闻,2:问政,3:商情,4:随手拍,5:段子,6:活动,7:话题,8:便民,9:热线,10:旅游,11:置业,12:招聘}' */
    sourceType: string;

    /** 评论：0允许，1不允许*/
    commentType: string;

    /** */
    contextType: string;

    /** 是否显示顶部  1：显示；0：不显示*/
    isShowTop: string;

    /** 是否显示底部 0：不显示，1：显示*/
    isShowBottom: string;

    /** 是否显示顶部更多或者分享按钮 0：不显示，1：显示*/
    isShowMore: string;

    /** (非空)跳转的URL*/
    url: string;

    /** 分享url*/
    shareUrl: string;

    /** 分享标题(base64编码)*/
    title: string;

    /** 分享简介(base64编码)*/
    synopsis: string;

    /** 分享图片*/
    shareImgUrl: string;
  }): void;
  /**


   * 获取经纬度
   * @param {object} params 参数
   */
  getPosition(params: {
    /** 回调函数 参数：{postcode:"",longitude:111,latitude:111}*/
    callback: string;
  }): void;
  /**


   * 获取定位信息（新） 暂时不能用
   * @param {object} params 参数
   */
  getLatLong(params: {
    /** 回调函数*/
    callback: string;
  }): void;
  /**


   * 打开原生图片上传页面
   * @param {object} params 参数
   */
  appUpload(params: {
    /** 上传数量*/
    num: number;

    /** 回调函数 参数：上传图片url字符串，以逗号隔开*/
    callback: string;
  }): void;
  /**


   * 打开原生视频上传页面
   * @param {object} params 参数
   */
  videoUpload(params: {
    /** 上传视频时长限制 单位毫秒*/
    time: number;

    /** 回调函数 参数(videoUrl，imgUrl) videoUrl:上传成功后视频地址   imgUrl：视频封面图*/
    callback: string;
  }): void;
  /**


   * 获取微信登录授权信息
   * @param {object} params 参数
   */
  weixinSessionToken(params: {
    /** 回调函数*/
    callback: string;
  }): void;
  /**


   * 调用原生二维码扫描
   * @param {object} params 参数
   */
  getTwoDimensionalCode(params: {
    /** 回调函数*/
    callback: string;
  }): void;
  /**


   * 调用原生收货地址
   * @param {object} params 参数
   */
  getAddress(params: {
    /** 回调函数*/
    callback: string;
  }): void;
  /**


   * 调用原生收货地址
   * @param {object} params 参数
   */
  getAddress(params: {
    /** 回调函数 参数{username:"",id:"",phone:"",address:""}*/
    callback: string;
  }): void;
  /**


   * 调用原生导航页面
   * @param {object} params 参数
   */
  showNavigation(params: {
    /** 经度*/
    lat: number;

    /** 纬度*/
    lng: number;

    /** 地址*/
    address: string;

    /** 名称*/
    name: string;
  }): void;
  /**


   * 展示积分增加动画
   * @param {object} params 参数
   */
  showPointView(params: {
    /** 提示语*/
    message: string;

    /** 积分*/
    point: number;
  }): void;
  /**


   * 打开原生wifi页面
   * @param {object} params 参数
   */
  openSettingWifi(): void;
  /**


   * 文件上传（新）  还未启用
   * @param {object} params 参数
   * image video audio file  有定义则显示，没定义则不显示  如果都没定义，默认为显示全部选择项
   */
  fileUpload(params: {
    /** 上传回调函数*/
    callback: string;

    /** 图片参数*/
    image?: fuImage;

    /** 视频参数*/
    video?: fuVideo;

    /** 音频参数*/
    audio?: fuAudio;

    /** 文件参数*/
    file?: fuFile;
  }): void;
  /**


   * 打开原生页面
   * @param {object} params 参数
   */
  pushToController(params: {
    /** iOS方法名*/
    iOS: string;

    /** 安卓方法名*/
    Android: string;

    /** 自定义参数*/
    par: customParam;
  }): void;
  /**


   * 打开原生页面
   * @param {object} params 参数
   */
  showNativeView(params: {
    /** iOS方法名*/
    iOS: string;

    /** 安卓方法名*/
    Android: string;

    /** 自定义参数*/
    par: customParam;
  }): void;
  /**


   * 查看单条直播新闻全部评论
   * @param {object} params 参数
   */
  showLiveNewsComment(params: {
    /** 单条直播新闻的id*/
    sourceId: number;

    /** 评论类型 50：评论单条直播新闻*/
    sourceType: number;

    /** 关闭弹出列表时的回调函数*/
    callBackFun: string;
  }): void;
  /**


   * 配置顶部导航栏
   * @param {object} params 参数
   */
  topBarConfig(params: {
    /** 是否显示整个顶部  0：隐藏  1：显示*/
    isShowTop: number;

    /** 是否显示返回按钮  0：隐藏  1：显示*/
    isShowBackBtn: number;

    /** 显示自定义标题  如果是图片链接则显示成图片*/
    isShowTitle: string;

    /** 是否显示更多按钮  0：隐藏  1：显示*/
    isShowMoreBtn: string;
  }): void;
  /**


   * 配置底部导航栏
   * @param {object} params 参数
   */
  bottomBarConfig(params: {
    /** 是否显示整个底部  0：隐藏  1：显示*/
    isShowBottom: number;

    /** 自定义评论列表按钮点击回调事件*/
    callBack_replyList: string;

    /** 点赞数量*/
    praiseNum: number;

    /** 是否点赞  1:已点赞  其他：未点赞*/
    isPraised: number;
  }): void;
  /**


   * 无回调获取网络状态信息
   * @param {object} params 参数
   */
  /**0：网络不可用； 1:2G; 2:3G; 3:4G; 4:wifi*/
  getNetworkType(): string | number;

  /**


   * 配置底部导航栏
   * @param {object} params 参数
   */
  appCloseWeb(params: {
    /** 是否刷新前个页面  0：不刷新  1：刷新*/
    type: number;

    /** 自定义前个页面执行函数*/
    callBackFun?: string;

    /** 自定义参数*/
    par?: customParam;
  }): void;
  /**


   * 判断否则在app内打开
   * @param {object} params 参数
   */
  /** true：app内打开   fasle：app外打开 */
  isOpenInApp(): boolean;

  /**


   * 判断设备操作系统
   * @param {object} params 参数
   */
  /** iOS：苹果   Android：安卓  "":其他 */
  getOS(): string;

  /**


   * 判断app内webview版本号
   * @param version 参数
   */
  /** true：高于参数传递的版本号   fasle：低于参数传递的版本号 */
  getWebVersion(version: number): boolean;
};
