import Taro, {Component, Config} from '@tarojs/taro'
import {Image, SwiperItem, Swiper} from '@tarojs/components'
import './hswiper.scss'
import {SwiperModel} from "../../../model/SwiperModel";
import url, {getJSON, urlBase} from "../../url";
import {AjaxModel} from "../../../model/AjaxModel";
import {ErrorTip} from "../../utils";

export interface HSwiperProps {
  swipers: SwiperModel[]
}

export interface State {
  swipers: SwiperModel[]
}

export default class HSwiper extends Component<HSwiperProps, State> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    //    navigationBarBackgroundColor: "#e63c25",
    //    navigationBarTextStyle: "white",
    //    backgroundColor: "#e63c25",
    //    backgroundTextStyle: "light"
  };
  static defaultProps = {
    swipers: []
  };

  constructor(props) {
    super(props);
    this.state = {
      swipers: this.props.swipers
    }
  }

  componentWillMount() {
    const nowTime = new Date().getTime();
    const swipers = Taro.getStorageSync('swipers');
    const lastSetSwipers = Taro.getStorageSync('lastSetNotices');
    if (swipers) {
      this.setState({swipers})
    }
    if (!lastSetSwipers || nowTime - lastSetSwipers > 1000 * 60 * 5) {
      this.getSwipers();
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  // 获取轮播图列表
  getSwipers = () => {
    getJSON(url.apiAdvertList, {}, (res: AjaxModel) => {
      if (res.code === 200) {
        const swipers = res.data || [];
        this.setState({swipers});
        Taro.setStorageSync('swipers',swipers);
        Taro.setStorageSync('lastSetSwipers', new Date().getTime());
      } else {
        ErrorTip(res.msg || '网络繁忙', url.apiNoticeList)
      }
    })
  };

  render() {
    return (
      <Swiper indicatorDots className='swiper' autoplay indicatorActiveColor='#ffffff'>
        {this.state.swipers.map((item, index) => {
          return <SwiperItem key={'k'+item.id + index}>
            <Image className='swiper-img'
              src={urlBase + item.imgs}
              lazyLoad
              mode='aspectFill'
            />
          </SwiperItem>
        })}
      </Swiper>
    )
  }
}

