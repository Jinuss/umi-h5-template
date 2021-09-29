/**
 * 格式化金额，分转为元
 * @param {*} money
 */
export function formatMoney(money) {
  return (money / 100).toFixed(2);
}

/**
 * 暂停一段时间，单位为毫秒
 * @param {*} duration
 */
export function sleep(duration = 1000) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

/**
 * 判断浏览器内核、所处客户端
 */
export const browser = {
  versions: (function() {
    const UA = navigator.userAgent;
    return {
      trident: UA.includes('Trident'), //IE内核
      presto: UA.includes('Presto'), //opera内核
      webKit: UA.includes('AppleWebKit'), //苹果、谷歌内核
      gecko: UA.includes('Gecko') && !UA.includes('KHTML'), //火狐内核
      mobile: !!UA.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //iOS终端
      android: UA.includes('Android') || UA.includes('Adr'), //Android终端
      iPhone: UA.includes('iPhone'), //是否为iPhone或者QQHD浏览器
      iPad: UA.includes('iPad'), //是否iPad
      webApp: !UA.includes('Safari'), //是否web应该程序，没有头部与底部
      weChat: UA.includes('MicroMessenger'), //是否微信
      qq: UA.match(/\sQQ/i) == ' qq', //是否QQ
    };
  })(),
};
