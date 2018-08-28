import router from './router';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth'; // 验权

const whiteList = ['/login']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // 用户刷新会使 store 里的用户信息失效，此时重新获取
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next();
        }).catch((err) => {
          store.dispatch('LogOut').then(() => {
            Message.error(err || '验证错误，请重新登录');
            next({ path: '/' });
          });
        });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      Message({
        message: '您的访问权限已过期或您已登出，请重新登录',
        type: 'waiting',
        duration: 2 * 1000
      });
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
