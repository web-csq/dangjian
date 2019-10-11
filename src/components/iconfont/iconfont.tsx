import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './iconfont.scss'

export interface IconfontProps {
  name: string,
  color?: string,
  size?: string
}

export interface State {

}

export default class Iconfont extends Component<IconfontProps, State> {
  config: Config = {};

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
      <View
        className={`iconfont icon-${this.props.name}`}
        style={{color: `${this.props.color}`, fontSize: `${this.props.size}`}}
      >
      </View>
    )
  }
}

