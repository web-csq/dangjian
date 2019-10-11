import Taro, {Component, Config} from '@tarojs/taro'
import {View, Icon, Button, Text} from '@tarojs/components'
import './success.scss'

export interface SuccessProps {

}

export interface State {

}

export default class Success extends Component<SuccessProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#3a71e6",
    navigationBarTextStyle: "white",
    backgroundColor: "#3a71e6",
    backgroundTextStyle: "light",
    navigationBarTitleText: '',
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

  // 点击返回按钮
  onBack = () => {
    Taro.navigateBack({});
  };

  render() {
    return (
      <View className='success'>
        <Icon type='success' color='#3a71e6' size='100' />
        <Text className='h1 title'>提交成功</Text>
        <Text className='info'>您已将信息成功的提交给我们，我们管理员会尽快的帮您处理</Text>
        <Button className='btn btn-confrim' onClick={this.onBack}>返回</Button>
      </View>
    )
  }
}

