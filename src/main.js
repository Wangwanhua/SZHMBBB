import Vue from 'vue';
import App from './App.vue';
// 引入路由模块
import VueRouter from 'vue-router';
// 引入 首页 组件
import index from './components/index.vue';
// 引入 商品详情 组件
import goodsInfo from './components/goodsinfo.vue';
// 引入 购物车 组件
import buyCar from './components/buyCar.vue';
// 引入 订单支付 组件
import payOrder from './components/payOrder.vue';
// 引入 登录 组件
import login from './components/login.vue';
// 引入 订单详情 组件
import orderInfo from './components/orderInfo.vue';
// 引入 支付成功页 组件
import paySuccess from './components/paySuccess.vue';
// 引入 会员中心 组件
import personalCenter from './components/personalCenter.vue';
// 引入 交易订单 组件
import orderCenter from './components/orderCenter.vue';
// 引入 订单详情 组件
import lookOrder from './components/lookOrder.vue';

// 导入 element ui框架
import ElementUI from 'element-ui';
// 导入css
import 'element-ui/lib/theme-chalk/index.css';
// 引入模块 moment时间插件
import moment from "moment";
// 导入懒加载插件
import VueLazyload from 'vue-lazyload';
// 引入css
import './assets/statics/site/css/style.css';
// 导入axios模块 目的是让所有组件都可以使用
import axios from "axios";
// 导入iView UI框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 导入Vuex
import Vuex from 'vuex';

// 设置基础的URL,调用接口时 会自动的拼接这个基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//让ajax携带cookie
axios.defaults.withCredentials = true;
// 挂载到Vue的原型上->Vue实例化出来的对象 共用 vue-resource this.$http
Vue.prototype.axios = axios;



// 使用路由中间件
Vue.use(VueRouter);
// 使用element ui中间件
Vue.use(ElementUI);
// 使用懒加载中间件
Vue.use(VueLazyload, {
  // 图片当做资源来引入
  loading: require('./assets/img/01.gif')
});
// 使用iView 中间件
Vue.use(iView);
// 使用Vuex
Vue.use(Vuex)

// 注册路由规则
const router = new VueRouter({
  routes: [
    // 访问的是 / 打到(重定向)
    {
      path: '/',
      redirect: '/index'
    },
    // index 都显示 index这个组件
    {
      path: '/index',
      component: index
    },
    {
      // 动态路径参数 以冒号开头
      path: '/goodsInfo/:id',
      component: goodsInfo
    },
    {
      // 注册购物车路由
      path: '/buyCar',
      component: buyCar
    },
    {
      // 订单支付路由
      // 动态路由匹配
      path: '/payOrder/:ids',
      component: payOrder,
      // 路由元信息
      meta: {
        checkLogin: true
      }
    },
    {
      // 登录路由
      path: '/login',
      component: login
    },
    // 订单详情路由
    {
      path: "/orderInfo/:orderid",
      component: orderInfo,
      // 路由元信息
      meta: {
        checkLogin: true
      }
    },
    // 支付成功页
    {
      path: "/paySuccess",
      component: paySuccess,
      // 路由元信息
      meta: {
        checkLogin: true
      }
    },
    // 会员中心
    {
      path: "/personalCenter",
      component: personalCenter,
      // 路由元信息
      meta: {
        checkLogin: true
      }
    },
    // 交易订单
    {
      path: "/orderCenter",
      component: orderCenter,
      // 路由元信息
      meta: {
        checkLogin: true
      }
    },
    // 订单详情
    {
      path: "/lookOrder/:orderId",
      component: lookOrder,
      // 路由元信息
      meta: {
        checkLogin: true
      }
    },
  ]
});

// 注册全局过滤器
// 支持自定义规则
Vue.filter('cutTime', function (value,myFormat) {
  if(myFormat){
    return moment(value).format(myFormat);
  }else{
    // 默认的切割方式 不够通用
    // return value.slice(0,10);
    // 使用moment.js进行替换
    return moment(value).format("YYYY年MM日DD日");
  }
})

// 判断数据是否存在
let buyList = JSON.parse(window.localStorage.getItem('buyList')) || {};

// 实例化一个 Vuex的 仓库
const store = new Vuex.Store({
  // 状态
  state: {
    // 数量
    buyList,
    isLogin: false,
    // 来时的路由
    fromPath: "/"
  },
  // 类似于computed的计算属性,计算购物车总数量
  getters: {
    totalCount(state) {
      let num = 0;
      // 遍历对象
      for (const key in state.buyList) {
        // 累加总数 parseInt()字符串转数字
        num += parseInt(state.buyList[key]);
      }
      return num;
    }
  },
  mutations: {
    // 对象格式 info->{goodId:xx,goodNum:xxx}
    buyGood(state, info) {
      // 判断 有值累加
      if (state.buyList[info.goodId]) {
        // 解决字符串累加问题
        let oldNum = parseInt(state.buyList[info.goodId]);
        oldNum += parseInt(info.goodNum);
        // 重新赋值
        state.buyList[info.goodId] = oldNum;
      } else {
        // 没有 直接赋值这种方法 vue不会跟踪属性
        // state.buyList[info.goodId]=info.goodNum;
        // 需要使用 Vue.set(obj, 'newProp', 123) 替代
        Vue.set(state.buyList, info.goodId, parseInt(info.goodNum));
      }
    },
    // 直接修改数值的方法
    changeNum(state, info) {
      state.buyList[info.goodId] = info.goodNum;
    },
    // 删除数据
    delGoodById(state, id) {
      // 使用Vue的方法来删除 
      Vue.delete(state.buyList, id);
    },
    // 修改登陆状态
    changeLogin(state, login) {
      state.isLogin = login;
    },
    // 保存来时的路由
    saveFromPath(state, fromPath) {
      state.fromPath = fromPath;
    }
  }
})

// 导航守卫 beforeEach 可以当做一个回调函数 不是立刻触发 所以这里顺序不调整是可以的
router.beforeEach((to, from, next) => {
  // 保存来时的路由
  store.commit('saveFromPath', from.path);
  // from 从哪来 to 去哪里 next()下一个 indexOf 如果要检索的字符串值没有出现，则该方法返回 -1。
  // 判断去 下订单页
  // if (to.path.indexOf('/payOrder') != -1) {
  // 使用路由元信息进行判断
  if (to.meta.checkLogin) {
    axios.get("site/account/islogin")
      .then(response => {
        if (response.data.code == "nologin") {
          // 去登录页
          next('/login')
        } else {
          // 继续执行
          next();
        }
      })
      .catch(err => {
        console.log(err);
      })
  } else {
    next();
  }

})

Vue.config.productionTip = false

new Vue({
  // 选择器
  el: "#app",
  // 挂载到vue
  router,
  // 渲染 App组件
  render: h => h(App),
  // 挂载仓库
  store,
  // 生命周期函数
  beforeCreate() {
    axios.get('site/account/islogin')
      .then(response => {
        // console.log(response);
        store.state.isLogin = response.data.code == 'logined';
      })
      .catch(err => {
        console.log(err);
      })
  }
});

// 注册一些逻辑
window.onbeforeunload = function () {
  window.localStorage.setItem('buyList', JSON.stringify(store.state.buyList));
}