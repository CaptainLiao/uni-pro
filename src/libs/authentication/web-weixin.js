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

    const redirect_uri = encodeURIComponent(`${process.env.AUTH_HOST}/wx_oauth2_callback?target_url=${encodeURIComponent(target_url)}`)
    const appid = `${process.env.WX_APPID}`
    window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=${redirect_uri}&appid=${appid}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
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



