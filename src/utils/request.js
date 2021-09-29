import { request, history } from 'umi';
import { Toast } from 'antd-mobile';

/**
 * 基于 request 封装的 post 请求，入参改为 json 传递
 * @param {string} api
 * @param {object} params
 */
export const post = async (api, params = {}) => {
  try {
    const { response, data } = await request(api, {
      method: 'post',
      params: {
        token: window.sessionStorage.getItem('TOKEN'), // 推荐使用 cookie 方式存储登录状态
      },
      data: params,
      requestType: 'json', // 如需使用表单提交方式，改为 form 即可
      getResponse: true,
    });
    // 服务异常了，报错
    if (response.status < 200 || response.status >= 400) {
      Toast.fail(`服务开小差了，请稍后重试：${response.status}`);
      return Promise.reject();
    }
    // 约定：登录失效，要重新授权或登录
    if (data.code === 999) {
      window.sessionStorage.clear();
      history.replace('/login');
      return Promise.reject();
    }
    // 约定：接口异常，直接报错
    if (data.code === -1) {
      Toast.fail(data.msg);
      return Promise.reject();
    }
    return data;
  } catch (error) {
    console.error('request error: ', error);
    Toast.fail(String(error));
  }
};
