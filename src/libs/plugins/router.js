import qs from 'qs';

let _index = 0;
function getNextId() {
  _index++;
  return '' + _index;
}

const _store = [];
function storeAdd(data) {
  const id = getNextId();
  _store.push({
    id,
    data
  });
  return id;
}
function storeGet(id, keep = false) {
  let index = 0;
  while (index < _store.length) {
    if (_store[index].id === id) {
      const data = _store[index].data;
      if (!keep) {
        _store.splice(index, 1);
      }
      return data;
    }
    index++;
  }
  return undefined;
}

// ---

let _Vue;
function install(Vue) {
  if (install.installed && _Vue === Vue) return;
  install.installed = true;
  _Vue = Vue;

  Vue.mixin({
    onLoad(query) {
      const route_id = query && query.route_id;
      const data = {};
      if (route_id) {
        data = storeGet(route_id) || {};
      } else {
        const pages = getCurrentPages();
        data.query = query;
        data.path = pages[pages.length - 1].route;
        //;({[pages.length - 1]: {route: data.path}} = pages)
      }

      this._route = {
        ...data
      };
    }
  });

  Object.defineProperty(Vue.prototype, '$Route', {
    get() {
      return this._route;
    }
  });
}

function Router(routes = []) {
  this.pathMap = {};
  this.nameMap = {};
  this.addRoutes(routes);
  this.beforeHooks = [];
}

Router.install = install;

Router.prototype.beforeEach = function beforeEach(f) {
  this.beforeHooks.push(f);
};

Router.prototype.addRoutes = function addRoutes(routes = []) {
  // 全部按最简单处理，不存在子组件路由
  routes.forEach(route => {
    this.pathMap[route.path] = route;
    if (route.name) {
      this.nameMap[route.name] = route;
    }
  });
};

Router.prototype.push = function push(opt) {
  this.proxy(opt, uni.navigateTo);
};

Router.prototype.replace = function push(opt) {
  this.proxy(opt, uni.redirectTo);
};

Router.prototype.switchTab = function push(opt) {
  this.proxy(opt, uni.switchTab, true);
};

Router.prototype.reLaunch = function push(opt) {
  this.proxy(opt, uni.reLaunch);
};

Router.prototype.go = function go(d) {
  uni.navigateBack({ delta: -d });
};

Router.prototype.back = function back() {
  uni.navigateBack();
};

Router.prototype.proxy = function proxy(opt, fn, noQuery) {
  let { path, name, query, params } = opt;
  let matched = null;
  if (name) {
    // 偷懒...name也可以匹配path，因为vue-router只有name才能传params
    matched = this.nameMap[name] || this.pathMap[name] || null;
  } else {
    const qi = path.indexOf('?');
    if (qi >= 0) {
      // path带参数
      query = {
        ...qs.parse(path.slice(qi + 1)),
        ...query
      };
      path = path.slice(0, qi);
    }
    matched = this.pathMap[path] || null;
  }

  if (!matched) {
    console.error('route not found:', opt);
    return;
  }

  if (noQuery) {
    return fn({ url: matched.path});
  }

  const data = {
    path: matched.path,
    query: query || {},
    params: params || {},
    meta: matched.meta
  };

  runHooks(this.beforeHooks, data, () => {
    let url = matched.path + '?'
    if (query) {
      url += qs.stringify(query)
    } else {
      const route_id = storeAdd(data);
      url += matched.path + '?route_id=' + route_id;
    }
    
    fn({url});
  });

};

function runHooks(hooks, param, cb) {
  const len = hooks.length;

  const next = i => () => {
    if (i >= len) {
      return cb(param);
    } else {
      return hooks[i](param, next(i + 1));
    }
  };
  next(0)(param);
}

export default Router;
