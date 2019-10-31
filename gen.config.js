const fs = require('fs');
const stripJsonComments = require('strip-json-comments');
const path = require('path');
const readline = require('readline');
const appName = process.env.APP_NAME;

const matchedRouteFileName = 'route.json';
const routeFilePath = 'src/pages.json';
const regExcludeDirs = [/.*projects\/home-.*/];

Promise.resolve()
  .then(() => genPages('src', routeFilePath))
  .then(() => {
    console.log('生成路由 ' + routeFilePath);
    genRoutes();
  })
  .catch(e => console.error(e))

// 生成 src/routes.js
function genRoutes() {
  let data = fs.readFileSync('src/pages.json').toString();
  data = stripJsonComments(data);
  data = JSON.parse(data);

  const routes = config2routes(data);
  const s = 'export default ' + JSON.stringify(routes, ' ', 2);
  fs.writeFileSync('src/routes.js', s);
  console.log('生成路由', 'src/routes.js');
}

// 生成src/projects/payment/tabBars.js
function genTabBars() {
  let data = fs.readFileSync('src/pages.json').toString();
  data = stripJsonComments(data);
  data = JSON.parse(data);

  const tabBars = data.tabBar && data.tabBar.list ? data.tabBar.list : [];
  const s = 'export default ' + JSON.stringify(tabBars, ' ', 2);
  fs.writeFileSync('src/projects/payment/tabBars.js', s);
  console.log('生成tabBar', 'src/projects/payment/tabBars.js');
}

function config2routes(config) {
  const configs = [
    {
      pages: config.pages
    },
    ...config.subPackages
  ];
  return [].concat(...configs.map(pages2routes));
}

function pages2routes(config) {
  const root = config.root ? config.root + '/' : '';
  const routes = config.pages.map(p => {
    const r = {
      path: '/' + root + p.path
    };
    if (p.name) {
      r.name = p.name;
    }
    if (p.meta) {
      r.meta = p.meta;
    }
    return r;
  });
  return routes;
}

function genPages(srcDir, targetPath) {
  let fileName = matchedRouteFileName

  return Promise.all(getRoutePages(srcDir, fileName))
    .then(routes => {
      const r = merge(routes);
      r.pages = handleHomePage(r.pages)
      fs.writeFileSync(path.resolve(__dirname, targetPath), JSON.stringify(r, ' ', 2));
    })

  function handleHomePage(pages) {
    const homeIndex = pages.findIndex(p => p.path.includes('^'));
    if (homeIndex < 0) return pages;

    const home = {
      ...pages[homeIndex],
      path: pages[homeIndex].path.replace('^', '')
    };
    pages.splice(homeIndex, 1);
    pages.unshift(home);
    return pages;
  }

  function merge(routes) {
    return routes.reduce((obj, item) => {
      Object.keys(item).forEach(k => {
        switch (k) {
          case 'pages':
          case 'subPackages':
            obj[k] = obj[k].concat(item[k]);
            break;
          case 'workers':
            obj[k] = item[k];
            break;
          default:
            obj[k] = {
              ...obj[k],
              ...item[k]
            }
            break;
        }
      })
      return obj;

    }, { pages: [], subPackages: [] });
  }
}

function getRoutePages(dir, fileName = matchedRouteFileName) {
  let result = [];
  fs.readdirSync(dir).forEach(function(file) {
    const curFilePath = dir + '/' + file;
    const stat = fs.statSync(curFilePath);

    if (stat && stat.isDirectory()) {
      const notInExcludeDirs = !regExcludeDirs.some(reg => reg.test(curFilePath))
      if (notInExcludeDirs) result = result.concat(getRoutePages(curFilePath, fileName));
    } else {
      if (curFilePath.includes(fileName)) result.push(pruneRoute(curFilePath));
    }
  })
  return result
}

function pruneRoute(filePath) {
  let res = '';
  const needprune = [];

  return new Promise((resolve, reject) => {
    readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity
      })
      .on('line', function(line) {
        line = line.trim();

        const hasIfdef = line.includes('#ifdef');
        const hasIfndef = line.includes('#ifndef');
        if (hasIfdef || hasIfndef) {
          const index = line.indexOf(appName);
          const shouldprune = hasIfdef ? index === -1 : index > -1;
          if (shouldprune || needprune.length) needprune.push(1);
          line = '';
        } else if (line.includes('#endif')) {
          needprune.pop();
          line = '';
        }

        if (!needprune.length && line) res += line;
      })
      .on('error', function(e) {
        reject('解析路由出错', e);
      })
      .on('close', function() {
        res = res.replace(',]', ']').replace(',}', '}')
        resolve(JSON.parse(res));
      });
  })
}
