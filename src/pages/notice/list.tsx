import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, Navigator} from '@tarojs/components'
import './list.scss'
import {ArticleModel} from "../../../model/ArticleModel";
import {dateFormat} from "../../utils";
import NullTips from "../../components/nulltips/nulltips";

export interface NoticeListProps {

}

export interface State {
  notices: ArticleModel[]|null
}

export default class NoticeList extends Component<NoticeListProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#3970e5",
    navigationBarTextStyle: "white",
    backgroundColor: "#3970e5",
    navigationBarTitleText: '公告'
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      notices:null
    }
  }

  componentWillMount() {
    const notices = Taro.getStorageSync('notices');
    if (notices) {
      this.setState({notices})
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

  // 小程序分享有关的方法,添加上时才有分享功能
  onShareAppMessage() {
    return {}
  }

  render() {
    return (
      <View className='list page'>
        {this.state.notices&&this.state.notices.map((item) => {
          return <Navigator
            key={item.id + item.createtime * 1000}
            className='item'
            url={`/pages/article/detail_blue?id=${item.id}&type=notice`}
          >
            <Text className='title'>{item.title}</Text>
            <View className='post-time'>
              {dateFormat(item.createtime * 1000, 'Y年m月d日 H:i:s')}
            </View>
          </Navigator>
        })}
        {this.state.notices&&this.state.notices.length < 1 ?
          <NullTips /> : null}
      </View>
    )
  }
}

