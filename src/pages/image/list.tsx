import Taro, {Component, Config} from '@tarojs/taro'
import {Image, Text, Navigator, ScrollView} from '@tarojs/components'
import './list.scss'
import {ArticleModel} from "../../../model/ArticleModel";
import url, {getJSON} from "../../url";
import {checkResUrl, ErrorTip} from "../../utils";
import NullTips from "../../components/nulltips/nulltips";

export interface ImageListProps {

}

export interface State {
  type: string,
  list: ArticleModel[],
  page: number,
  isLock: boolean
}

export default class ImageList extends Component<ImageListProps, State> {

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
      type: '',
      list: [],
      page: 1,
      isLock: false
    }
  }

  componentWillMount() {
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


  getArticles = (type = this.state.type) => {
    // 多个页面UI一致，所以采用了同一个页面，根据参数来判断。
    // 后端是写了多个接口，而不是接收参数类型判断的，所以前端判断类型选择需要调用的接口
    if (this.state.isLock) return;
    let apiUrl = '';
    switch (type) {
      case 'gxqxcp':
        apiUrl = url.apiParkTrailer;
        break;
      case 'gxqmj':
        apiUrl = url.apiParkScenery;
        break;
      case 'zdxm':
        apiUrl = url.apiParkProject;
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
        ErrorTip(res.msg || '网络繁忙', apiUrl)
      }
    })
  };

  render() {
    return (
      <ScrollView
        className='clearfix images'
        scrollY
        enableBackToTop
        scrollWithAnimation
        onScrollToLower={this.getArticles.bind(this)}
      >
        {this.state.list.map((item, index) => {
          return <Navigator
            url={`/pages/article/detail_blue?id=${item.id}&type=${this.state.type}`}
            className='images-item'
            key={item.id + index}
          >
            <Image
              className='cover'
              src={checkResUrl(item.cover + '')}
              lazyLoad
            />
            <Text className='title'>{item.title}</Text>
          </Navigator>
        })}
        {this.state.list.length < 1 ?
          <NullTips /> : null}
      </ScrollView>
    )
  }
}

