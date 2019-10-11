import Taro from '@tarojs/taro'

// 引入静态的图片,上线时可删除本段内容减少体积
import './images/icon_company.png';
import './images/bg_uesr_top.png';
import './images/default_headimg.png';
import './images/qrcode-hbzwfw.jpg';
import {AjaxModel} from "../model/AjaxModel";
import {dateFormat} from "./utils";


// 接口地址
export const urlBase = 'https://party.boxinid.com/';
export const apiBase = `${urlBase}api`;
// wss协议
export const apiWebSocket = `ws://192.168.199.11:8080/api`;

const version = '1.0.1';//当前版本


// 暴露出去的api参数地址
export default {
  // 党建基本知识列表[api/article/article_list]
  apiArticleList: `${apiBase}/article/article_list`,
  // 党的十九大精神[api/article/article_spirit]
  apiArticleSpirit: `${apiBase}/article/article_spirit`,
  // 党的工作风采[api/article/article_work]
  apiArticleWork: `${apiBase}/article/article_work`,
  // 平语近人[api/article/article_near]
  apiArticleNear: `${apiBase}/article/article_near`,
  // 列表详情[api/article/detail?id=请求数据类型（get/post）]
  apiArticleDetail: `${apiBase}/article/detail`,
  // 轮播图[api/advert/advert_list]
  apiAdvertList: `${apiBase}/advert/advert_list`,
  // 通知公告列表 [api/notice/notice_list ]
  apiNoticeList: `${apiBase}/notice/notice_list`,
  //  列表详情[api/notice/detail?id=请求数据类型（get/post）]
  apiNoticeDetail: `${apiBase}/notice/detail`,
  // 大厂高新区简介[api/park/park_list]
  apiParkList: `${apiBase}/park/park_list`,
  // 大厂高新区宣传片[api/park/trailer]
  apiParkTrailer: `${apiBase}/park/trailer`,
  // 大厂高新区美景[api/park/scenery]
  apiParkScenery: `${apiBase}/park/scenery`,
  // 重点项目[api/park/project]
  apiParkProject: `${apiBase}/park/project`,
  // 招商信息[api/park/information]
  apiParkInformation: `${apiBase}/park/information`,
  // 企业名录[api/park/directories]
  apiParkDirectories: `${apiBase}/park/directories`,
  // 列表详情 [api/park/detail?id=请求数据类型（get/post）]
  apiParkDetail: `${apiBase}/park/detail`,
  // 互动交流
  // 我有急事：
  // 部门机构
  apiMent: `${apiBase}/interaction/ment_list`,
  // 详情页 id=请求数据类型
  apiMentDetail: `${apiBase}/interaction/ment_detail`,
  // 企业机构
  apiEnterprise: `${apiBase}/interaction/enterprise_list`,
  // 企业机构详情 id=请求数据类型(get/post)
  apiEnterpriseDetail: `${apiBase}/interaction/enterprise_detail`,
  // 服务机构
  apiService: `${apiBase}/interaction/service_list`,
  // 服务机构详情 id=请求数据类型（get/post）
  apiServiceDetail: `${apiBase}/interaction/service_detail`,
  // 招聘列表
  apiRecruit: `${apiBase}/interaction/recruit_list`,
  // 详情 id=请求类型（get/post）
  apiRecruitDetail: `${apiBase}/interaction/recruit_detail`,
  // 求职列表
  apiWanted: `${apiBase}/interaction/wanted_list`,
  // 详情id=（get/post）
  apiWantedDetail: `${apiBase}/interaction/wanted_detail`,
  // 建议中心
  apiProposal: `${apiBase}/interaction/proposal`,
  // 详情页id=（get/post）
  apiProposalDetail: `${apiBase}/interaction/proposal_datail`,
  // 政策信息
  // 园区动态列表
  apiPark: `${apiBase}/policy/park_list`,
  // 列表详情id=请求数据类型（get/post）
  apiPolicyDetail: `${apiBase}/policy/detail`,
  // 招商局列表
  apiPolicy: `${apiBase}/policy/policy_list`,
  // 国土局
  apiLand: `${apiBase}/policy/land_list`,
  // 科技局
  apiScience: `${apiBase}/policy/science_list`,
  // 经发局
  apiJing: `${apiBase}/policy/jing_list`,
  // 企服中心
  apiPolicyEnterprise: `${apiBase}/policy/enterprise_list`,
  // 公服中心
  apiCenter: `${apiBase}/policy/center_list`,
  // 财政局
  apiFinance: `${apiBase}/policy/finance_list`,
  // 综事局
  apiZ: `${apiBase}/policy/z_list`,
  // 党政综合办公室
  apiDzOffice: `${apiBase}/policy/dz_office`,
  // 文件上传
  apiUploads: `${apiBase}/proposal/uploadfiles`,
  // 我有建议
  apiPropoasl: `${apiBase}/proposal/proposal`,
  // 企业需求
  apiProposalRecruit: `${apiBase}/proposal/recruit`,
  // 下发短信验证,参数phone
  apiSmsSend: `${apiBase}/Smssend/send`,
  // 进行注册
  apiRegister: `${apiBase}/Register/register`,
  // 进行登录
  apiLogin: `${apiBase}/login/login`,
  // 获取用户个人信息
  apiMember: `${apiBase}/member/member`,
  // 修改密码
  apiForgetPwd: `${apiBase}/forget/forget_pwd`,
  // 修改个人信息
  apiChangeMember: `${apiBase}/member/change_member`,
}

/**
 * 封装的支付方法
 * @param data
 * @param callback
 */
export function wechatpay(data, callback) {
  post('/wechat/wechat/pay.json', {
    id: data.id,
    version
  }, (res: AjaxModel) => {
    if (res.data.success) {
      const pkg = res.data.result;
      Taro.requestPayment({
        nonceStr: pkg.nonceStr,
        package: pkg.package,
        paySign: pkg.paySign,
        signType: "MD5",
        timeStamp: pkg.timeStamp,
      }).then(
        (payRes) => {
          return callback(payRes);
        }
      )
    } else {
      Taro.showToast({
        title: res.data.result || '请稍候再试',
        icon: 'none'
      })
    }
  })

}

/**
 * 封装的统一请求方法
 * @param params
 * @param callbak
 * @param header
 */
function request(params, callbak, header = false) {
  let {url, data, method} = params;
  method = params.method || 'GET';
  let contentType = 'application/x-www-form-urlencoded';
  contentType = params.contentType || contentType;
  data['version'] = version;
  const option = {
    url: url,
    data,
    method,
    header: {
      'content-type': contentType,
      'Cookie': Taro.getStorageSync('cookie'),
    },
    success(res) {
      return callbak(header ? res : res.data);
    },
    error(e) {
      logError('api', '请求接口出现问题', e)
    }
  };
  Taro.request(option);
}

/**
 * 封装的错误记录
 * @param name
 * @param action
 * @param info
 */
export const logError = (name, action, info) => {
  console.error(name, action, info);
  const errorLog = Taro.getStorageSync('errorLog') || [];
  const tempLog = {
    time: dateFormat(new Date().getTime()),
    name, action, info
  };
  errorLog.push(tempLog);
  Taro.setStorageSync('errorLog', errorLog);
};

/**
 * 封装的GET
 * @param url
 * @param data
 * @param callback
 * @param header
 */
export const getJSON = (url, data, callback, header = false) => {
  let option = {url, data, method: 'GET'};
  request(option, callback, header);
};


/**
 * 封装的POST方法
 * @param url
 * @param data
 * @param callback
 * @param header
 */
export const post = (url, data, callback, header = false) => {
  let option = {url, data, method: 'POST'};
  request(option, callback, header);
};


/**
 * 封装的上传接口
 * @param filePath
 * @param callback
 */
export function uploadFile(filePath, callback) {
  Taro.showLoading({
    title: '上传中',
    mask: true
  });
  console.log('filePath', filePath);
  Taro.uploadFile({
    url: `${apiBase}/proposal/uploadfiles`,
    filePath,
    name: 'imgs',
    header: {
      'Content-Type': 'multipart/form-data',
      'Cookie': Taro.getStorageSync('cookie')
    }
  }).then(
    (res) => {
      Taro.hideLoading();
      return callback(res.data)
    }
  )
}

/*
 * 合并多个ajax请求发出
 * @param arr
 * @param callback
 * 示例：
    const arr = [
      {
        url: url.apiLevelNum,
        data: {}
      },
      {
        url: url.apiAgencyReceiving,
        data: {}
      }
    ];
    allRequest(arr, (res) => {
      return console.log(res)
    })
*/
export function allRequest(arr, callback: Function) {
  if (!arr) {
    console.error('allRequest 需要传递多个请求方法');
    return;
  }
  const PromiseArray = arr.map((it) => {
    return new Promise(resolve => {
      getJSON(it.url, it.data, res => {
        resolve(res);
      })
    })
  });
  return Promise.all(PromiseArray)
    .then((res) => {
      return callback(res);
    })
    .catch((error) => {
      console.error(error)
    });
}
