import { useEffect } from 'react';
import { useLocation } from 'umi';
import queryString from 'query-string';

import { browser } from '../../utils/index';

/**
 * 统一封装微信 h5 的授权
 */
export default function useWxAuth(search = {}) {
  const location = useLocation();
  const query = queryString.parse(location.search);

  useEffect(() => {
    // 不存在 token 时，要授权
    const TOKEN = window.sessionStorage.getItem('TOKEN') || query.token;
    if (TOKEN) {
      window.sessionStorage.setItem('TOKEN', TOKEN);
    } else if (browser.versions.weChat) {
      // 先判断是不是在微信里面，在的话有两个方案可以进行授权

      // 1、前端拼接微信授权地址，直接跳转
      const { origin, pathname, hash } = window.location;
      // 成功后的前端访问页面
      const url = encodeURIComponent(
        `${origin}${pathname}${hash}${queryString.stringify(search)}`,
      );
      const REDIRECT_URL = ''; // 接收 code 的回调地址
      const redirect_uri = encodeURIComponent(`${REDIRECT_URL}?url=${url}`);
      const wechatUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7246c423626355ae&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=123&connect_redirect=1#wechat_redirect`;
      window.location.replace(wechatUrl);

      // 2、通过表单提交方式直接访问后台接口，后台重定向
    }
    return () => {};
  }, []);
}
