import request from "../common/request";
import store from "@/store";
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
}
export default new RequestIndex();
