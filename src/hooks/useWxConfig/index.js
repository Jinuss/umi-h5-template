import { useCallback } from 'react';
import { useMount } from 'ahooks';

import { post } from '@/utils/request';
import { browser } from '@/utils/index';

const SIGN_URL = '';

/**
 * 微信 jssdk 注册
 * @param {*} params
 */
export default function useWxConfig(params = {}) {
  const { origin, pathname } = window.location;
  useMount(() => {
    if (browser.versions.weChat) {
      weChatConfig();
    } else {
      console.error('请在微信客户端环境内访问');
    }
  });

  const weChatConfig = useCallback(async () => {
    try {
      // 获取签名数据
      const { code, data } = await post(SIGN_URL, {
        url: encodeURIComponent(`${origin}${pathname}`),
      });
      if (code === 0 && data) {
        const { appId, timestamp, nonceStr, signature } = data;
        window.wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature, // 必填，签名
          jsApiList: [
            'updateAppMessageShareData',
            'updateTimelineShareData',
            ...(params.jsApiList || []),
          ], // 必填，需要使用的JS接口列表
        });
      }
    } catch (error) {}
  }, []);

  // sdk注册完成后触发，返回 promise
  const wxReady = useCallback(
    () => new Promise(resolve => window.wx.ready(resolve)),
    [],
  );
  return {
    wxReady,
  };
}
