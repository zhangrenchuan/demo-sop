import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        if (username === 'zhang@soundbus.cn' && userInfo.password === '123456') {
          setToken('xxx-platform-frontend');
          resolve();
        } else {
          const errMsg = {
            error: {
              errCode: 'E10001'
            }
          };
          reject(errMsg);
        }
        /*
        login(username, userInfo.password).then(response => {
          setToken(response.access_token, response.expires_in);
          resolve();
        }).catch(error => {
          reject(error);
        });
        */
      });
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLES', ['admin']); // 前端写死，统一设置登录用户为"管理员"权限，admin | editor
        commit('SET_NAME', '张人川'); // 用户名
        commit('SET_ACCOUNT', 'zhang@soundbus.cn'); // 邮箱地址
        resolve();
        /*
        getInfo().then(response => {
          commit('SET_ROLES', ['admin']); // 前端写死，统一设置登录用户为"管理员"权限，admin | editor
          commit('SET_NAME', response.name); // 用户名
          commit('SET_ACCOUNT', response.account); // 邮箱地址
          resolve(response);
        }).catch(error => {
          reject(error);
        });
        */
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        removeToken();
        resolve();
        /*
        logout(state.token).then(() => {
          commit('SET_ROLES', []);
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
        */
      });
    }
  }
};

export default user;
