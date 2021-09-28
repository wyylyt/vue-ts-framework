declare module "weixin-js-sdk" {
  interface ConfigParams {
    debug: boolean;
    appId: string;
    timestamp: number;
    nonceStr: string;
    signature: string;
    jsApiList: any[];
  }

  interface MenuShareTimeline {
    title: string;
    link: string;
    imgUrl: string;
  }

  interface MenuShareAppMessage extends MenuShareTimeline {
    desc: string;
  }

  interface WXInstance {
    config: (params: ConfigParams) => void;
    ready: (callback: () => void) => void;
    onMenuShareTimeline: (params: MenuShareTimeline) => void;
    onMenuShareAppMessage: (params: MenuShareAppMessage) => void;
    onMenuShareQQ: (params: MenuShareAppMessage) => void;
    chooseWXPay: (params: any) => void;
  }

  const WX: WXInstance;

  export default WX;
}
