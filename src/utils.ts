import Taro, {getCurrentPages} from '@tarojs/taro'
import {logError, urlBase} from './url';


/**
 * 检测资源的url是不是带http/https协议的，如果不匹配则补全配置的根域名
 * @param resUrl
 */
export const checkResUrl = (resUrl: string) => {
  if (resUrl.search('http') === -1) {
    return urlBase + resUrl;
  } else {
    return resUrl;
  }
};

/**
 * 检测是不是手机号
 * @param phoneStr
 */
export const checkPhone = (phoneStr) => {
  return (/^1[345789]\d{9}$/.test(phoneStr));
};

/*
** 时间戳转换成指定格式日期
** eg. dateFormat(11111111111111, 'Y年m月d日 H时i分')  → "2322年02月06日 03时45分"
*  代码参考自：https://www.zhangxinxu.com/php/microCodeDetail?id=10
*/
export const dateFormat = (timestamp, formats: string = 'Y-m-d') => {
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  if (typeof timestamp !== 'number') timestamp = timestamp * 1;
  const zero = function (value) {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  };
  const myDate = timestamp ? new Date(timestamp) : new Date();
  const year = myDate.getFullYear();
  const month = zero(myDate.getMonth() + 1);
  const day = zero(myDate.getDate());
  const hour = zero(myDate.getHours());
  const minite = zero(myDate.getMinutes());
  const second = zero(myDate.getSeconds());
  return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
    return ({
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second
    })[matches];
  });
};

/**
 * 登录出错
 */
export const loginError = () => {
  Taro.showModal({
    title: '登录时出错',
    content: '自动登录失败，请检查当前网络状况'
  })
};

/**
 * 获取指定历史页url
 * 传的参数是整数。如果错误或没有传，默认是当前页面
 * @param num
 */
export const getHistoryPageUrl = (num = 1) => {
  let selected = num > 0 ? num + 1 : 1;//回退的页面
  let pages = getCurrentPages();    //获取加载的页面
  console.log('已经访问的页面：', pages);
  let selectedPage = pages[pages.length - selected];   //获取页面的对象
  return pages.length - selected >= 0 ? selectedPage.route : null;   //页面url
};

/**
 * 获取带参数的url
 * @param num
 */
export const getCurrentPageUrlWithArgs = (num = 1) => {
  let selected = num > 0 ? num + 1 : 1;
  let pages = getCurrentPages();  //获取加载的页面
  let currentPage = pages[pages.length - selected];   //获取当前页面的对象
  let currentUrl = currentPage.route;  //当前页面url
  let options = currentPage.options; //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  let urlWithArgs = currentUrl + '?';
  for (let key in options) {
    let value = options[key];
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);
  console.log(urlWithArgs);
  return urlWithArgs
};

/**
 * 保留小数位
 * @param value
 * @param decimal
 */
export const toFixed = (value, decimal) => {
  let result: string | number | null = null;
  if (typeof value === "number") {
    let x = typeof decimal === "number" ? decimal : 2;
    result = value.toFixed(x)
  } else {
    result = 0;
  }
  return result
};

/**
 * 封装的错误提示
 * @constructor
 */
export const ErrorTip = (msg: string, apiUrl: string = '', isModel: boolean = false) => {

  // 如果请求的apiUrl被传递，则记录到错误日志中
  if (apiUrl) {
    logError('api', apiUrl, msg || '')
  }
  // 如果内容重要则以模态窗形式提示
  if (isModel) {
    Taro.showModal({
      title: '提示',
      content: msg || '网络繁忙，请稍后再试',
      confirmText: '我知道了',
      showCancel: false
    });
    return;
  }
  // 正常提示
  Taro.showToast({
    title: msg || '网络繁忙',
    icon: 'none',
    mask: true
  });
};


export default {};
