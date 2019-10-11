import Taro, {Component, Config} from '@tarojs/taro'
import {ScrollView} from '@tarojs/components'
import './list.scss'
import {ArticleModel} from "../../../model/ArticleModel";
import Item from "./item";
import url, {getJSON} from "../../url";
import NullTips from "../../components/nulltips/nulltips";
import {ErrorTip} from "../../utils";

export interface ArticleListBlueProps {

}

export interface State {
  type: string,
  list: ArticleModel[] | null,
  page: number,
  isLock: boolean
}

//  这是文章列表的第二个效果，布局\接口调用同第一个，只是背景颜色不同
//  使用单个页面制作，通过api切换背景颜色会有闪烁影响体验，因此两种效果此处采用两个页面
export default class ArticleListBlue extends Component<ArticleListBlueProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#386fe4",
    navigationBarTextStyle: "white",
    backgroundColor: "#386fe4",
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      type: '',
      list: null,
      page: 1,
      isLock: false
    }
  }

  componentWillMount() {

    // console.log('preload: ', this.$router.preload); //获取预加载传递数据
    // const abc = this.$router.params.abc 获取路由参数
    const type = this.$router.params.type;
    Taro.setNavigationBarTitle({
      title: this.$router.params.title
    });
    this.setState({type}, () => {
      this.getArticles();
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

  getArticles = () => {
    // 多个页面UI一致，所以采用了同一个页面，根据参数来判断。
    // 后端是写了多个接口，而不是接收参数类型判断的，所以前端判断类型选择需要调用的接口
    if (this.state.isLock) return;
    let apiUrl = '';
    const type = this.state.type;
    switch (type) {
      case 'dcgxqjj':
        apiUrl = url.apiParkList;
        break;
      case 'zsxx':
        apiUrl = url.apiParkInformation;
        break;
      case 'company':
        apiUrl = url.apiParkDirectories;
        break;
      case 'bm1zcxx':
        apiUrl = url.apiPolicy;
        break;
      case 'bm2zcxx':
        apiUrl = url.apiLand;
        break;
      case 'bm3zcxx':
        apiUrl = url.apiScience;
        break;
      case 'bm4zcxx':
        apiUrl = url.apiJing;
        break;
      case 'bm5zcxx':
        apiUrl = url.apiPolicyEnterprise;
        break;
      case 'bm6zcxx':
        apiUrl = url.apiCenter;
        break;
      case 'bm7zcxx':
        apiUrl = url.apiFinance;
        break;
      case 'bm8zcxx':
        apiUrl = url.apiZ;
        break;
      case 'bm9zcxx':
        apiUrl = url.apiDzOffice;
        break;
      case 'yqdtxx':
        apiUrl = url.apiPark;
        break;
      default:
      // apiUrl = url.apiParkList;
    }
    this.setState({isLock: true});
    getJSON(apiUrl, {page: this.state.page}, (res) => {
      if (res.code === 200) {
        const list = this.state.list || [];
        list.push.apply(list, res.data || []);
        this.setState({
          list, isLock: false,
          page: this.state.page + 1
        });
      } else {
        this.setState({list: []});
        ErrorTip(res.msg || '网络繁忙', apiUrl)
      }
    })
  };

  render() {
    return (
      <ScrollView
        className='article-list'
        scrollY
        enableBackToTop
        scrollWithAnimation
        onScrollToLower={this.getArticles.bind(this)}
      >
        {this.state.list && this.state.list.map((item) => {
          return <Item
            key={'a'+item.id}
            item={item}
            color='blue'
            isCompany={this.state.type === 'company'}
            type={this.state.type}
          />
        })}
        {this.state.list && this.state.list.length < 1 ?
          <NullTips/> : null}
      </ScrollView>
    )
  }
}

