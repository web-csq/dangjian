import Taro, {Component, Config} from '@tarojs/taro'
import Index from './pages/index'
import './app.scss'
import {logError} from './url';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5') {
  require('nerv-devtools')
}

class App extends Component {

  config: Config = {
    pages: [
      'pages/index/index',
      'pages/park/park',
      'pages/login/login',
      'pages/debug/debug',
      'pages/policy/policy',
      'pages/interactive/interactive',
      'pages/information/information',
      'pages/article/list',
      'pages/article/list_blue',
      'pages/article/detail',
      'pages/article/detail_blue',
      'pages/map/map',
      'pages/image/list',
      'pages/institutions/institutions',
      'pages/notice/list',
      'pages/recruit/recruit',
      'pages/suggest/list',
      'pages/suggest/edit',
      'pages/register/register',
      'pages/password/forget',
      'pages/success/success',
      'pages/setting/setting',
      'pages/service/service',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '大厂高新技术产业开发区',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#888',
      selectedColor: '#d94127',
      list: [
        {
          pagePath: "pages/index/index",
          text: "党建引领",
          iconPath: './images/icon1.png',
          selectedIconPath: './images/icon1_active.png'
        },
        {
          pagePath: "pages/park/park",
          text: "园区名片",
          iconPath: './images/icon2.png',
          selectedIconPath: './images/icon2_active.png'
        },
        {
          pagePath: "pages/policy/policy",
          text: "政策信息",
          iconPath: './images/icon3.png',
          selectedIconPath: './images/icon3_active.png'
        },
        {
          pagePath: "pages/interactive/interactive",
          text: "互动交流",
          iconPath: './images/icon4.png',
          selectedIconPath: './images/icon4_active.png'
        },
        {
          pagePath: "pages/information/information",
          text: "企业登录",
          iconPath: './images/icon5.png',
          selectedIconPath: './images/icon5_active.png'
        }
      ]
    },
    networkTimeout: {
      request: 10000,
      downloadFile: 10000
    },
    debug: true,
    navigateToMiniProgramAppIdList: []
  };

  componentWillMount() {
    //  程序被载入	在微信小程序中这一生命周期方法对应 app 的 onLaunch
    // todo 根据业务需求，每次访问时先清除上次的登录状态
    // Taro.removeStorageSync('isLogin');
  }

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError(res) {
    logError('onError', '---', res);
  }


  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'));
