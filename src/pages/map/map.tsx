import Taro, {Component, Config} from '@tarojs/taro'
import {View, Map} from '@tarojs/components'
import './map.scss'

export interface MapPageProps {

}

export interface State {

}

export default class MapPage extends Component<MapPageProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#386fe4",
    navigationBarTextStyle: "white",
    backgroundColor: "#386fe4",
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

  // 小程序分享有关的方法,添加上时才有分享功能
  onShareAppMessage() {
    return {}
  }

  render() {
    return (
      <View>
        <Map
          className='map'
          longitude={116.751900}
          latitude={39.467890}
          scale={16}
          show-location
        />
      </View>
    )
  }
}

