export default options => {
  let { baseURL, url, method, data, headers } = options;

  if (baseURL && !isAbsoluteUrl(url)) {
    url = baseURL.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '');
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method,
      data,
      header: headers,
      success: (r) => {
        let { data, statusCode, header } = r;
        resolve({
          status: statusCode,
          body: data,
          headers: header
        });
      },
      fail: (e) => {
        reject(e);
      }
    });
  });
};

function isAbsoluteUrl(url) {
  // 绝对地址以`<scheme>://`或`//`开头
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}
