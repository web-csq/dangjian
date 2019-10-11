import Taro, {Component, Config} from '@tarojs/taro'
import {View, Navigator, Text} from '@tarojs/components'
import './grid.scss'
import Iconfont from "../iconfont/iconfont";
import {GridModel} from "../../../model/GridModel";

export interface GridProps {
  list: GridModel[]
}

export interface State {

}

export default class Grid extends Component<GridProps, State> {

  config: Config = {
    //    navigationBarBackgroundColor: "#e63c25",
    //    navigationBarTextStyle: "white",
    //    backgroundColor: "#e63c25",
    //    backgroundTextStyle: "light"
  };
  static defaultProps = {
    list: []
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
      <View className='grid'>
        {this.props.list.map((item, index) => {
          return <Navigator
            url={item.link}
            openType='navigate'
            className='grid-item'
            key={'k' + item.iconfont + index}
          >
            <View className='grid-item-icon' style={{backgroundColor: item.backgroundColor}}>
              <Iconfont name={item.iconfont} />
            </View>
            <Text>{item.name}</Text>
          </Navigator>
        })}
      </View>
    )
  }
}

