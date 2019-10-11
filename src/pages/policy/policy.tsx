import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './policy.scss'
import {SwiperModel} from "../../../model/SwiperModel";
import {GridModel} from "../../../model/GridModel";
import Notice from "../../components/notice/notice";
import Grid from '../../components/grid/grid';
import HSwiper from '../../components/hswiper/hswiper';

export interface PolicyProps {

}

export interface State {
  swipers: SwiperModel[]
}

export default class Policy extends Component<PolicyProps, State> {
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
    // 判断未登录时提示，20190403修改：根据需求去掉登录验证
    // if (!Taro.getStorageSync('cookie')) {
    //   Taro.showModal({
    //     title: '需要登录',
    //     content: '当前页面需要具备权限才能继续查看',
    //     cancelText: '返回'
    //   }).then((res) => {
    //     if (res.confirm) {
    //       Taro.navigateTo({
    //         url: '/pages/login/login'
    //       })
    //     } else {
    //       Taro.switchTab({
    //         url: '/pages/index/index'
    //       })
    //     }
    //   })
    // }
    // 判断没权限的不能查看
  }

  componentDidHide() {
  }

  render() {
    const GridList: GridModel[] = [
      {
        iconfont: 'zhengcefagui2',
        backgroundColor: '#2661e3',
        link: '/pages/article/list_blue?type=bm1zcxx&title=部门1政策信息',
        name: '招商局'
      }, {
        iconfont: 'zhengcefagui2',
        backgroundColor: '#ae5da0',
        link: '/pages/article/list_blue?type=bm2zcxx&title=部门2政策信息',
        name: '国土局'
      }, {
        iconfont: 'zhengcefagui2',
        backgroundColor: '#eb6100',
        link: '/pages/article/list_blue?type=bm3zcxx&title=部门3政策信息',
        name: '科技局'
      }, {
        iconfont: 'zhengcefagui2',
        backgroundColor: '#00b7ee',
        link: '/pages/article/list_blue?type=bm4zcxx&title=部门4政策信息',
        name: '经发局'
      }, {
        iconfont: 'zhengcefagui2',
        backgroundColor: '#eb3373',
        link: '/pages/article/list_blue?type=bm5zcxx&title=部门5政策信息',
        name: '企服中心'
      }, {
        iconfont: 'zhengcefagui2',
        backgroundColor: '#f39801',
        link: '/pages/article/list_blue?type=bm6zcxx&title=部门6政策信息',
        name: '公服中心'
      }, {
        iconfont: 'zhengcefagui2',
        backgroundColor: '#f9b552',
        link: '/pages/article/list_blue?type=bm7zcxx&title=部门7政策信息',
        name: '财政局'
      }, {
        iconfont: 'zhengcefagui2',
        backgroundColor: '#a40000',
        link: '/pages/article/list_blue?type=bm8zcxx&title=部门8政策信息',
        name: '综事局'
      }, {
        iconfont: 'zhengcefagui2',
        backgroundColor: '#6cb07d',
        link: '/pages/article/list_blue?type=bm9zcxx&title=部门9政策信息',
        name: '综合办公室'
      }, {
        iconfont: 'dcdn',
        backgroundColor: '#e70012',
        link: '/pages/article/list_blue?type=yqdtxx&title=园区动态信息',
        name: '园区动态信息'
      },
    ];
    return (
      <View className='policy page'>
        <HSwiper swipers={this.state.swipers} />

        <Notice />

        <Grid list={GridList} />
      </View>
    )
  }
}

