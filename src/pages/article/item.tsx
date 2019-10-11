import Taro, {Component, Config} from '@tarojs/taro'
import {Image, Text, View} from '@tarojs/components'
import './item.scss'
import {ArticleModel} from "../../../model/ArticleModel";
import {dateFormat} from "../../utils";
import {urlBase} from "../../url";

export interface ArticleItemProps {
  item: ArticleModel,
  color: string,
  isCompany: boolean,
  type?: string
}

export interface State {

}

// 这里是文章列表的组件
export default class Item extends Component<ArticleItemProps, State> {

  config: Config = {
    //    navigationBarBackgroundColor: "#e63c25",
    //    navigationBarTextStyle: "white",
    //    backgroundColor: "#e63c25",
    //    backgroundTextStyle: "light"
  };

  static defaultProps = {
    item: {
      id: '',
      title: '',
      postTime: 0,
      cover: '',
      state: 0,//1是否需要登录、2不需要，其他忽略
    },
    color: '',
    isCompany: false
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onNavigator = () => {
    const cookie = Taro.getStorageSync('cookie');
    if (this.props.item.state == 1 && !cookie) {
      Taro.showModal({
        title: '需要登录',
        content: '当前内容需要登录才能阅读，点击确定将前往登录页面',
      }).then((res) => {
        if (res.confirm) {
          Taro.navigateTo({
            url: `/pages/login/login`
          })
        }
      });
      return;
    }
    Taro.navigateTo({
      url: `/pages/article/${this.props.color === 'blue' ? 'detail_blue' : 'detail'}?id=${this.props.item.id}&type=${this.props.type}`
    })
  };

  render() {
    const {title, phone, createtime, cover} = this.props.item;
    return (
      <View
        onClick={this.onNavigator}
        className='clearfix article-item'
      >
        <View className='f-left content'>
          <Text className='title'>{title}</Text>
          {this.props.isCompany ?
            <Text className='phone'>服务电话：{phone}</Text> :
            <Text className='post-time'>{dateFormat(createtime * 1000)}</Text>}
        </View>
        <Image
          className='f-right cover'
          src={urlBase + cover}
          lazyLoad
        />
      </View>
    )
  }
}

