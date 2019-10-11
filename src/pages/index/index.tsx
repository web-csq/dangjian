import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'
import Notice from "../../components/notice/notice";
import {SwiperModel} from "../../../model/SwiperModel";
import Grid from "../../components/grid/grid";
import {GridModel} from "../../../model/GridModel";
import HSwiper from "../../components/hswiper/hswiper";

export interface IndexProps {

}

export interface State {
  swipers: SwiperModel[]
}

export default class Index extends Component<IndexProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#e63c25",
    navigationBarTextStyle: "white",
    backgroundColor: "#e63c25",
    backgroundTextStyle: "light"
  };

  constructor(props) {
    super(props);
    this.state = {
      swipers: [
        {id: 'aa', imgs: '../../../images/swiper_red1.png'},
        {id: 'a2', imgs: '../../../images/swiper_red1.png'},
      ]
    }
  }

  // 程序被载入,对应小程序onLaunch
  componentWillMount() {
  }

  // 程序被载入,对应小程序onLaunch,在 componentWillMount 后执行
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  // 程序展示出来,onShow
  componentDidShow() {
    Taro.setTabBarStyle({selectedColor: '#dd411d',})
  }

  // 程序被隐藏,onHide
  componentDidHide() {
    Taro.setTabBarStyle({selectedColor: '#2161e0',})
  }

  // 小程序分享有关的方法,添加上时才有分享功能
  onShareAppMessage() {
    return {}
  }


  onTabItemTap(item) {
    console.log(1);
    console.log(item.index);
    console.log(item.pagePath);
    console.log(item.text)
  }

  render() {
    const GridList: GridModel[] = [
      {
        iconfont: 'qizhi',
        backgroundColor: '#e93a21',
        link: '/pages/article/list?type=djjbzs&title=党建基本知识',
        name: '党建基本知识'
      },
      {
        iconfont: 'taiwangdahui-shouyedianjitai',
        backgroundColor: '#f4663c',
        link: '/pages/article/list?type=sjdjs&title=党的十九大精神',
        name: '党的十九大精神'
      },
      {
        iconfont: 'xiangji',
        backgroundColor: '#b1d469',
        link: '/pages/article/list?type=djgzfc&title=党建工作风采',
        name: '党建工作风采'
      },
      {
        iconfont: 'message-channel',
        backgroundColor: '#018bfd',
        link: '/pages/article/list?type=pyjr&title=平语进人',
        name: '主题教育'
      },
    ];
    return (
      <View className='index page'>

        <HSwiper swipers={this.state.swipers}/>

        <Notice/>

        <Grid list={GridList}/>
      </View>
    )
  }
}
