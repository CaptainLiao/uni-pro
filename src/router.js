import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

// TODO
const auth = {
  get: Promise.resolve(),
  login: Promise.resolve()
}

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior
});

router.beforeEach((to, next) => {
  console.log(to)
  if (to && to.meta && to.meta.auth) {
    auth.get().then(
      () => {
        next();
      },
      () => {
        auth.login().then(() => {
          next();
        });
      }
    );
  } else {
    next();
  }
});

export default router;


function scrollBehavior(to, from, savedPosition) {
  // NOTE: 如果路由切换的动画改变了要进入的页面容器的高度，那么此处需要返回异步，或者在动画里滚动
  if (savedPosition) {
    // XXX:
    // 同时满足以下条件，
    // (1) iOS WKWebView下
    // (2) 此处直接`return savedPosition`
    // (3) 页面的根节点用<c-loading>动态加载一些数据并渲染
    // (4) 并且此页面不是keepalive
    // 页面渲染完后滑动到任意中间位置，然后点击某个链接去下一个页面再返回，此时会
    // 重新加载数据并显示Loading，加载结束再渲染页面时会造成整个屏幕或屏幕的某一
    // 区域无法渲染，必须手动滑一下才能显示出来。
    //
    // 目前可以用延迟scroll解决，或者不要这样使用<c-loading>，或者keepalive。
    // return savedPosition;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(savedPosition);
      }, 0);
    });
  } else {
    return {
      x: 0,
      y: 0
    };
  }
}
