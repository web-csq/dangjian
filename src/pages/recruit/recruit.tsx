import Taro, {Component, Config} from '@tarojs/taro'
import {Navigator, ScrollView, Text, View} from '@tarojs/components'
import './recruit.scss'
import {NavbarModel} from "../../../model/NavbarModel";
import Navbar from "../../components/navbar/navbar";
import url, {getJSON} from "../../url";
import {ErrorTip} from "../../utils";


export interface RecruitProps {

}

export interface State {
  currentNavTab: string,
  list: any[],
  page: number,
  isLock: boolean
}

// 求职招聘页面
export default class Recruit extends Component<RecruitProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#3970e5",
    navigationBarTextStyle: "white",
    backgroundColor: "#3970e5",
    backgroundTextStyle: "light"
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      currentNavTab: 'zpxx',
      list: [],
      page: 0,
      isLock: false
    }
  }

  componentWillMount() {
    this.getList('zpxx');
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

  onNavTab = (event) => {
    if (this.state.currentNavTab === event.type) return;
    this.getList(event.type);
    this.setState({currentNavTab: event.type});
  };

  // 获取数据列表
  getList = (type: string = this.state.currentNavTab, isAddTo: boolean = false) => {
    if (this.state.isLock) return;
    let apiUrl = '';
    switch (type) {
      case 'zpxx':
        apiUrl = url.apiRecruit;
        break;
      case 'qzxx':
        apiUrl = url.apiWanted;
        break;
    }
    if (!apiUrl) return;
    this.setState({isLock: true});
    getJSON(apiUrl, {type, page: this.state.page}, (res) => {
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
        ErrorTip(res.msg || '网络繁忙', apiUrl)
      }
    })
  };

  render() {
    const NavBarList: NavbarModel[] = [
      {name: '招聘信息', type: 'zpxx'},
      {name: '求职信息', type: 'qzxx'},
    ];
    return (
      <View className='recruit page'>
        <Navbar
          list={NavBarList}
          currentIndex={this.state.currentNavTab}
          onClick={this.onNavTab}
        />
        <ScrollView
          className='list'
          scrollY
          enableBackToTop
          scrollWithAnimation
          onScrollToLower={this.getList.bind(this.state.currentNavTab, true, this)}
        >
          {this.state.list.map((item, index) => {
            return <Navigator
              className='item'
              key={item + index}
              url={`/pages/article/detail_blue?id=${item.id}&type=${this.state.currentNavTab}`}
            >
              <View className='icon-more'>
                <Text className='title'>
                  {item.title}
                </Text>
              </View>
              <View className='content'>
                <View className='content-top'>
                  <Text>负责人：{item.person}</Text>
                  <Text>服务电话：{item.phone}</Text>
                </View>
                <View className='content-desc'>
                  {item.describe}
                </View>
              </View>
            </Navigator>
          })}
        </ScrollView>
      </View>
    )
  }
}

