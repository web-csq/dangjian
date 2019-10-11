import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, ScrollView, Navigator} from '@tarojs/components'
import './institutions.scss'
import Navbar from "../../components/navbar/navbar";
import {NavbarModel} from "../../../model/NavbarModel";
import url, {getJSON} from "../../url";
import {ErrorTip} from "../../utils";

export interface InstitutionsProps {

}

export interface State {
  currentNavTab: string,
  list: any[],
  page: number,
  isLock: boolean
}

// 主要用于 我有急事、招聘求职 页面，institutions 翻译为机构
export default class Institutions extends Component<InstitutionsProps, State> {

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
      currentNavTab: 'bmjg',
      list: [],
      page: 0,
      isLock: false
    }
  }

  componentWillMount() {
    this.getList('bmjg');
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
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
      case 'bmjg':
        apiUrl = url.apiMent;
        break;
      case 'qyjg':
        apiUrl = url.apiEnterprise;
        break;
      case 'fwjg':
        apiUrl = url.apiService;
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
      {name: '部门机构', type: 'bmjg'},
      {name: '企业机构', type: 'qyjg'},
      {name: '服务机构', type: 'fwjg'},
    ];

    return (
      <View className='institutions page'>
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
            return <Navigator className='item'
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
                <View  className='content-desc'>
                  {item.introduce}
                </View>
              </View>
            </Navigator>
          })}
        </ScrollView>
      </View>
    )
  }
}

