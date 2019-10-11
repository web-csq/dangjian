import Taro, {Component, Config} from '@tarojs/taro'
import {ScrollView} from '@tarojs/components'
import './list.scss'
import {ArticleModel} from "../../../model/ArticleModel";
import Item from "./item";
import url, {getJSON} from "../../url";
import {ErrorTip} from "../../utils";
import NullTips from "../../components/nulltips/nulltips";

export interface ArticleListProps {

}

export interface State {
  type: string,
  list: ArticleModel[] | null,
  page: number,
  isLock: boolean
}

export default class List extends Component<ArticleListProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#ff0000",
    navigationBarTextStyle: "white",
    backgroundColor: "#ff0000",
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

  getArticles = (type = this.state.type) => {
    // 多个页面UI一致，所以采用了同一个页面，根据参数来判断。
    // 后端是写了多个接口，而不是接收参数类型判断的，所以前端判断类型选择需要调用的接口
    if (this.state.isLock) return;
    let apiUrl = '';
    switch (type) {
      case 'djjbzs':
        apiUrl = url.apiArticleList;
        break;
      case 'sjdjs':
        apiUrl = url.apiArticleSpirit;
        break;
      case 'djgzfc':
        apiUrl = url.apiArticleWork;
        break;
      case 'pyjr':
        apiUrl = url.apiArticleNear;
        break;
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
            type={this.state.type}
          />
        })}
        {this.state.list && this.state.list.length < 1 && <NullTips />}
      </ScrollView>
    )
  }
}

