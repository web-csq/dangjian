import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './interactive.scss'
import Grid from '../../components/grid/grid';
import Notice from "../../components/notice/notice";
import {GridModel} from "../../../model/GridModel";
import {SwiperModel} from "../../../model/SwiperModel";
import HSwiper from '../../components/hswiper/hswiper';

export interface InteractiveProps {

}

export interface State {
  swipers: SwiperModel[]
}

export default class Interactive extends Component<InteractiveProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#386fe4",
    navigationBarTextStyle: "white",
    backgroundColor: "#386fe4",
    //    backgroundTextStyle: "light"
  };

  constructor(props) {
    super(props);
    this.state = {
      swipers: [
        {id: 'aa', imgs: '../../../images/swiper_blue1.jpg'},
        {id: 'ss', imgs: '../../../images/swiper_blue2.jpg'},
        {id: 'dd', imgs: '../../../images/swiper_blue3.jpg'},
      ]
    }
  }


  componentWillMount() {
    Taro.setTabBarStyle({selectedColor: '#2161e0',})
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  componentDidShow() {
    // 判断未登录时提示
    if (!Taro.getStorageSync('cookie')) {
      Taro.showModal({
        title: '需要登录',
        content: '当前页面需要登录才能继续参与互动',
        cancelText: '返回'
      }).then((res) => {
        if (res.confirm) {
          Taro.navigateTo({
            url: '/pages/login/login'
          })
        } else {
          Taro.switchTab({
            url: '/pages/index/index'
          })
        }
      })
    }
  }

  componentDidHide() {
  }

  // 小程序分享有关的方法,添加上时才有分享功能
  onShareAppMessage() {
    return {}
  }

  render() {
    const GridList: GridModel[] = [
      {
        iconfont: 'shandian',
        backgroundColor: '#0a7c25',
        link: '/pages/institutions/institutions?type=wyjs',
        name: '电话查询'
      }, {
        iconfont: 'liuyanfill',
        backgroundColor: '#e70012',
        link: '/pages/suggest/edit?type=suggest',
        name: '我有建议'
      }, {
        iconfont: 'youjian',
        backgroundColor: '#00a0ea',
        link: '/pages/suggest/list?type=all',
        name: '建议中心'
      }, {
        iconfont: 'zhaopin',
        backgroundColor: '#ea6101',
        link: '/pages/recruit/recruit?type=zpqz',
        name: '招聘求职'
      }, {
        iconfont: 'fuwu',
        backgroundColor: '#a175b4',
        link: '/pages/service/service',
        name: '政务服务'
      }, {
        iconfont: 'web-icon-',
        backgroundColor: '#2561e3',
        link: '/pages/suggest/edit?type=desired',
        name: '企业需求'
      },
    ];
    return (
      <View className='interactive page'>
        <HSwiper swipers={this.state.swipers} />

        <Notice />

        <Grid list={GridList} />
      </View>
    )
  }
}
