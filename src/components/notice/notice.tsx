import Taro, {Component, Config} from '@tarojs/taro'
import {Text, Swiper, SwiperItem, Navigator} from '@tarojs/components'
import './notice.scss'
import Iconfont from "../iconfont/iconfont";
import {ArticleModel} from "../../../model/ArticleModel";
import url, {getJSON} from "../../url";
import {ErrorTip} from "../../utils";

export interface NoticeProps {
}

export interface State {
  notices: ArticleModel[]
}

export default class Notice extends Component<NoticeProps, State> {

  config: Config = {
    //    navigationBarBackgroundColor: "#e63c25",
    //    navigationBarTextStyle: "white",
    //    backgroundColor: "#e63c25",
    //    backgroundTextStyle: "light"
  };

  constructor(props) {
    super(props);

    this.state = {
      notices: []
    }
  }

  componentWillMount() {
    const nowTime = new Date().getTime();
    const notices = Taro.getStorageSync('notices');
    const lastSetNotices = Taro.getStorageSync('lastSetNotices');
    if (notices) {
      this.setState({notices})
    }
    if (!lastSetNotices || nowTime - lastSetNotices > 1000 * 60 * 5) {
      this.getnotices();
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

  // 获取公告列表
  getnotices = () => {
    getJSON(url.apiNoticeList, {}, (res) => {
      if (res.code === 200) {
        const notices = res.data || [];
        this.setState({notices});
        Taro.setStorageSync('notices', notices);
        Taro.setStorageSync('lastSetNotices', new Date().getTime());
      } else {
        ErrorTip(res.msg || '网络繁忙', url.apiNoticeList)
      }
    })
  };

  render() {
    const display = this.state.notices.length < 1 ? 'none' : '';
    return (
      <Navigator url='/pages/notice/list?type=notice' style={{display}}>
        <Swiper className='notice' autoplay vertical interval={3000}>
          {this.state.notices.map((item, index) => {
            return <SwiperItem className='notice-item' key={'k' + item.id + index}>
              <Iconfont name='yinlianglabashengyin' color='#e13f1e' size='32rpx'/>
              <Text className='notice-text'>{item.title}</Text>
            </SwiperItem>
          })}
        </Swiper>
      </Navigator>
    )
  }
}

