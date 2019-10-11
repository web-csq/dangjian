import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './detail.scss'

export interface ImageDetailProps {

}

export interface State {

}

// 主要是多图片详情页，主要用于高新区美景，和articleDetail类似，因为暂未制作，考虑哪个适合
export default class ImageDetail extends Component<ImageDetailProps, State> {

  config: Config = {
    //    navigationBarBackgroundColor: "#e63c25",
    //    navigationBarTextStyle: "white",
    //    backgroundColor: "#e63c25",
    //    backgroundTextStyle: "light"
  };

  static defaultProps = {};

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

  render() {
    return (
      <View className='detail'>

      </View>
    )
  }
}

