// uni-app的Storage在不同端的实现不同：

// H5端为localStorage，浏览器限制5M大小，是缓存概念，可能会被清理
// App端为原生的plus.storage，无大小限制，不是缓存，持久化
// 各个小程序端为其自带的storage api，数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，否则数据都一直可用。
// 微信小程序单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。
// 支付宝小程序单条数据转换成字符串后，字符串长度最大200*1024。同一个支付宝用户，同一个小程序缓存总上限为10MB。
// 百度、头条小程序文档未说明大小限制

export default {
  set: (key, value) => uni.setStorageSync(key, JSON.stringify(value)),
  get: key => {
    const value = uni.getStorageSync(key);
    if (value) {
      if (typeof value === 'string') {
        let returnValue;
        try {
          returnValue = JSON.parse(value);
        } catch (e) {
          uni.removeStorageSync(key);
          returnValue = undefined;
        }
        return returnValue;
      } else {
        return value;
      }
    }
    return null;
  },
  remove: key => uni.removeStorageSync(key),
  clear: () => uni.clearStorageSync()
};
