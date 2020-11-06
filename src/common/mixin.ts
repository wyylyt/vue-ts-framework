import Vue from "vue";
import store from "../store";
import native from "./Native";
Vue.mixin({
  beforeRouteEnter(to, from, next) {
    if (to.meta.needToken && store.state.Token) {
      if (to.meta.keepAlive) {
        const content = document.getElementById("app");
        if (content) {
          next(vm => {
            content.scrollTop = to.meta.scrollTop;
          });
        }
      } else {
        next();
      }
    } else {
      if (to.meta.needToken) {
        native.goToken().then(result => {
          store.commit("SET_STATE", {
            sessionId: result.sessionId,
            Token: result.token
          });
          next();
        });
      } else {
        if (to.meta.keepAlive) {
          const content = document.getElementById("app");
          if (content) {
            next(vm => {
              setTimeout(() => {
                content.scrollTop = to.meta.scrollTop;
              }, 0);
            });
          }
        } else {
          next();
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/") {
      native.close();
    }
    if (from.meta.keepAlive) {
      const content = document.getElementById("app");
      if (content) {
        from.meta.scrollTop = content.scrollTop;
      }
    }
    next();
  }
});
