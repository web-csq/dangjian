import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './nulltips.scss'
import Iconfont from "../iconfont/iconfont";

export interface NullTipsProps {
  text?: string
}

export interface State {

}

export default class NullTips extends Component<NullTipsProps, State> {

  config: Config = {
    //    navigationBarBackgroundColor: "#e63c25",
    //    navigationBarTextStyle: "white",
    //    backgroundColor: "#e63c25",
    //    backgroundTextStyle: "light"
  };

  static defaultProps = {
    text: '暂无数据'
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

  render() {
    return (
      <View className='nulltips'>
        <Iconfont name='wenjian-wenben' color='#ccc' size='100px' />
        <Text className='nulltips__text'>{this.props.text}</Text>
      </View>
    )
  }
}

