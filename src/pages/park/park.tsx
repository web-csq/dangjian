import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './park.scss'
import {SwiperModel} from "../../../model/SwiperModel";
import {GridModel} from "../../../model/GridModel";
import Grid from '../../components/grid/grid';
import Notice from "../../components/notice/notice";
import HSwiper from '../../components/hswiper/hswiper';

export interface ParkProps {

}

export interface State {
  swipers: SwiperModel[]
}

export default class Park extends Component<ParkProps, State> {

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
        iconfont: 'yewujieshao-jifenduihuan',
        backgroundColor: '#186e31',
        link: '/pages/article/list_blue?type=dcgxqjj&title=大厂高新区简介',
        name: '大厂高新区简介'
      }, {
        iconfont: 'laba',
        backgroundColor: '#ed0111',
        link: '/pages/image/list?type=gxqxcp&title=大厂高新区宣传片',
        name: '大厂高新区宣传片'
      }, {
        iconfont: 'yewujieshao-lujingguihua',
        backgroundColor: '#06a0e4',
        link: '/pages/map/map',
        name: '大厂高新区地图'
      }, {
        iconfont: 'wenjianjia',
        backgroundColor: '#fab156',
        link: '/pages/image/list?type=gxqmj&title=大厂高新区美景',
        name: '大厂高新区美景'
      }, {
        iconfont: 'zhongdianbiaozhu',
        backgroundColor: '#f15e00',
        link: '/pages/image/list?type=zdxm&title=重点项目',
        name: '重点项目'
      }, {
        iconfont: 'hezuowoshou',
        backgroundColor: '#a889bd',
        link: '/pages/article/list_blue?type=zsxx&title=招商信息',
        name: '招商信息'
      }, {
        iconfont: 'songshu',
        backgroundColor: '#008bff',
        link: '/pages/article/list_blue?type=company&title=企业名录',
        name: '企业名录'
      },
    ];
    return (
      <View className='park page'>
        <HSwiper swipers={this.state.swipers} />

        <Notice />

        <Grid list={GridList} />
      </View>
    )
  }
}

