import get from '@/utils/get'

function loginWeixin ({ target_url } = {}) {
  return new Promise(resolve => {

    const onPageShow = event => {
      window.removeEventListener('pageshow', onPageShow)
      // https://stackoverflow.com/questions/17432899/javascript-bfcache-pageshow-event-event-persisted-always-set-to-false
      if (event.persisted || get(window.performance, 'navigation.type') == 2) {
        resolve()
      }
    }

    window.addEventListener('pageshow', onPageShow)

    const redirect_uri = encodeURIComponent(`http://viptest.allinpayhb.com/tl/wx_oauth2_callback?target_url=${encodeURIComponent(target_url)}`)
    const appid = 'wx4f846ad0880d1fcf' || `${process.env.WX_APPID}`
    // 微信会对授权链接做正则强匹配校验，如果链接的参数顺序不对，授权页面将无法正常访问
    const u = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
    window.location = u
  })

}

// FIX ME
export default {
  login: loginWeixin,
  logout: loginWeixin,
  ensure: loginWeixin,
  get: loginWeixin,
  set: loginWeixin,
  refresh: loginWeixin
}



