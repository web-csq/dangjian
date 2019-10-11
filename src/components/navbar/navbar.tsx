import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './navbar.scss'
import {NavbarModel} from "../../../model/NavbarModel";

export interface NavbarProps {
  list: NavbarModel[],
  currentIndex: string,
  onClick: Function
}

export interface State {

}

export default class Navbar extends Component<NavbarProps, State> {

  config: Config = {
    //    navigationBarBackgroundColor: "#e63c25",
    //    navigationBarTextStyle: "white",
    //    backgroundColor: "#e63c25",
    //    backgroundTextStyle: "light"
  };

  static defaultProps = {
    list: [],
    currentIndex: 0,
    onClick: null
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

  onClick = (event) => {
    const dataset = event.currentTarget.dataset;
    this.props.onClick(dataset);
  };

  render() {
    return (
      <View className='navbar'>
        {this.props.list.map((item, index) => {
          return <View
            key={item.name + index}
            data-index={index}
            data-type={item.type}
            className={`navbar-item ${item.type === this.props.currentIndex ? 'current' : ''}`}
            onClick={this.onClick}
          >
            {item.name}
          </View>
        })}
      </View>
    )
  }
}

