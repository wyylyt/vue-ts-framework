import { executable } from "./decorator";
interface ShareConfig {
  /** 分享标题 */
  title: string;
  /** 分享内容 */
  content: string;
  /** 分享图标 */
  icon: string;
  /** 分享地址 */
  url: string;
  /** 分享类型 */
  sourceType: number;
}
class Native {
  /** App分享内容 */
  private shareConfig = {};
  /** 手机端-关闭当前页面 */
  @executable()
  close() {
    ZWY_CLOUD.appCloseWeb({ type: 0 });
  }

  /** 获取token */
  @executable({
    token: "2c699d5e6d85473e80660afb7847af11",
    sessionId: "fd028b66dffe47b680d9f319c91c13cb",
    phone: "13399844444"
  })
  goToken(): Promise<{ token: string; sessionId: string; phone: string }> {
    const result = this.callBack("tokenBack");
    ZWY_CLOUD.appSessionToken({
      loginType: 1,
      callback: "tokenBack"
    });
    return result;
  }

  /**
   * 获取用户登录信息
   */
  @executable({
    token: "35a21e130b24444095299815b55bd80a",
    sessionId: "fd028b66dffe47b680d9f319c91c13cb",
    phone: "13399844444"
  })
  getUserInfo(): Promise<{ phone: string; sessionId: string; token: string }> {
    return new Promise(resolve => {
      resolve(ZWY_CLOUD.getUserInfo());
    });
  }

  /**
   * 设置APP顶部状态栏
   * @param isShow 是否显示APP顶部状态栏 0 or 1
   */
  @executable()
  setTopBar(isShow = 0) {
    ZWY_CLOUD.topBarConfig({
      isShowTop: isShow,
      isShowBackBtn: 0,
      isShowTitle: "江南巧",
      isShowMoreBtn: "0"
    });
  }

  /**
   * 调动APP分享 - 调用之前必须调用 setShareConfig 设置APP分享内容
   */
  @executable()
  shareApp() {
    ZWY_CLOUD.share(this.shareConfig as ShareConfig);
  }

  /**
   * 拨打电话(需要webview配合)
   * @param tel 电话号码
   */
  @executable()
  call(tel: string) {
    location.href = `tel:${tel}`;
  }

  /**
   * 设置APP分享内容
   * @param title 分享标题
   * @param content 分享内容
   * @param icon 分享图标地址
   * @param path 分享地址
   */
  setShareConfig(params: ShareConfig) {
    params.url = process.env.VUE_APP_SHARE_URL + params.url;
    this.shareConfig = params;
  }

  /**
   * 上传图片
   * @param max 最大数量
   */
  @executable(
    "http://192.168.6.136:8084/images/common/app_10/serverb16f7322f78a4a70985e0547b863a952_200x200.jpg"
  )
  appUpload(max: number): Promise<string> {
    const result = this.callBack("uploadBack");
    ZWY_CLOUD.appUpload({
      callback: "uploadBack",
      num: max
    });
    return result;
  }

  /**
   * 打开原生Webview
   * @param url 跳转URL
   */
  @executable()
  openWebBrowser(params: {
    id: string;
    sourceId: string;
    detailViewType: string;
    sourceType: string;
    commentType: string;
    contextType: string;
    isShowTop: string;
    isShowBottom: string;
    isShowMore: string;
    url: string;
    shareUrl: string;
    title: string;
    synopsis: string;
    shareImgUrl: string;
  }) {
    ZWY_CLOUD.redirectUrl(params);
  }

  /**
   * 设置回调函数
   * @param funcName 回调函数名
   */
  private callBack(funcName: string): Promise<any> {
    return new Promise(resolve => {
      (<any>window)[funcName] = (result: string | JSON) => {
        if (typeof result === "string") {
          try {
            result = JSON.parse(result);
            resolve(result);
          } catch {
            resolve(result);
          }
        }
      };
    });
  }
}
export default new Native();
