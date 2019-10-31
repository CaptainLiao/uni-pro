import Vue from 'vue';
import Router from './libs/plugins/router';
import routes from './routes';

Vue.use(Router);

// TODO
const auth = {
  get: Promise.resolve(),
  login: Promise.resolve()
}

const router = new Router(routes);
Vue.prototype.$Router = router;

router.beforeEach((to, next) => {
  if (to && to.meta && to.meta.auth) {
    auth.get().then(
      () => {
        next()
      },
      () => {
        auth.login().then(() => {
          next()
        })
      }
    );
  } else {
    next()
  }
})

export default router
