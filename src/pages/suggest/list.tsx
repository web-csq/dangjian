import Taro, {Component, Config} from '@tarojs/taro'
import {View, Image, Text, RichText, Navigator} from '@tarojs/components'
import './list.scss'
import url, {getJSON} from "../../url";
import {checkResUrl, ErrorTip} from "../../utils";
import NullTips from "../../components/nulltips/nulltips";

export interface SuggestListProps {

}

export interface State {
  list: any[]|null,
  type: string,// user只看自己的、all全部的
  page: number,
  isLock: boolean
}

export default class SuggestList extends Component<SuggestListProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#3970e5",
    navigationBarTextStyle: "white",
    backgroundColor: "#3970e5",
    backgroundTextStyle: "light",
    navigationBarTitleText: '建议中心'
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      list: null,
      type: '',
      page: 1,
      isLock: false
    }
  }

  componentWillMount() {
    const type = this.$router.params.type;
    this.setState({type}, () => {
      this.getList();
    });
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

  // 获取数据列表
  getList = (isAddTo: boolean = false) => {
    if (this.state.isLock) return;
    this.setState({isLock: true});
    getJSON(url.apiProposal, {
        type: this.state.type,
        page: this.state.page
      },
      (res) => {
        if (res.code === 200) {
          let list = this.state.list || [];
          if (isAddTo) {
            list.push.apply(list, res.data || []);
          } else {
            list = res.data || [];
          }
          this.setState({
            list, isLock: false,
            page: this.state.page + 1
          });
        } else {
          ErrorTip(res.msg || '网络繁忙', url.apiProposal)
        }
      })
  };


  render() {
    return (
      <View className='suggest page'>
        {this.state.list&&this.state.list.map((item) => {
          return <Navigator
            className='suggest-item'
            key={item}
            url={`/pages/article/detail_blue?id=${item.id}&type=suggest`}
          >
            <View className='user icon-more'>
              <Image
                className='user-headimg'
                src={checkResUrl(item.avatarUrl)}
              />
              <Text className='user-name'>{item.company}:{item.contactName || item.nickName}</Text>
            </View>
            <View className='info'>
              <Text className='info-title'>{item.title}</Text>
              <RichText
                className='info-content'
                nodes={item.content}
              />
            </View>
          </Navigator>
        })}
        {this.state.list&&this.state.list.length < 1 && <NullTips />}
      </View>
    )
  }
}

