import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, Button} from '@tarojs/components'
import './debug.scss'
import {dateFormat} from "../../utils";

export interface DebugProps {

}

export interface State {
  SDKVersion: string,
  // batteryLevel: string,
  // brand: string,
  fontSizeSetting: string,
  language: string,
  model: string,
  // pixelRatio: string,
  platform: string,
  screenHeight: number,
  screenWidth: number,
  statusBarHeight: number,
  system: string,
  version: string,
  windowHeight: number,
  windowWidth: number,
  errorLog: string,
  isKonw: boolean,
  isOpenVconsole: boolean,
}

export default class Debug extends Component<DebugProps, State> {

  config: Config = {
    //    navigationBarBackgroundColor: "#e63c25",
    //    navigationBarTextStyle: "white",
    //    backgroundColor: "#e63c25",
    //    backgroundTextStyle: "light"
    navigationBarTitleText: '调试模式'
  };

  constructor(props) {
    super(props);
    this.state = {
      SDKVersion: '',
      // batteryLevel: '',
      // brand: '',
      fontSizeSetting: '',
      language: '',
      model: '',
      // pixelRatio: '',
      platform: '',
      screenHeight: 0,
      screenWidth: 0,
      statusBarHeight: 0,
      system: '',
      version: '',
      windowHeight: 0,
      windowWidth: 0,
      errorLog: '暂无',
      isKonw: false,
      isOpenVconsole: false,
    }
  }

  componentWillMount() {
    // 获取设备基础信息进行显示
    Taro.getSystemInfo({
      success: (res) => {
        this.setState(res);
      }
    });
    //  获取已保存的error日志
    let errorLog = '';
    let getErrorLog = Taro.getStorageSync('errorLog') || [];
    getErrorLog.reverse();
    getErrorLog.forEach((it) => {
      errorLog += JSON.stringify(it);
      errorLog += `\r---------\r`;
    });
    this.setState({errorLog});
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  // 点击强行更新版本
  onUpdate = () => {
    Taro.getUpdateManager();
    Taro.showToast({
      title: '已执行',
      icon: 'none'
    })
  };

  onVconsole = () => {
    const isOpenVconsole = !this.state.isOpenVconsole;
    Taro.setEnableDebug({
      enableDebug: isOpenVconsole
    });
    this.setState({isOpenVconsole});
    Taro.showToast({
      title: isOpenVconsole ? '已开启' : '已关闭',
      icon: 'none'
    })
  };

  // 清理全部缓存
  onClear = () => {
    Taro.clearStorage();
    Taro.showToast({
      title: '已清空',
      icon: 'none'
    })
  };

  onIKonw = () => {
    this.setState({isKonw: !this.state.isKonw})
  };

  render() {
    return (
      <View className='debug'>
        {!this.state.isKonw &&
        <View className='tips'>
          <Text className='tips-text'>
            当前页面仅供开发者/操作异常客户使用，如果您是经过客服人员指引来到了当前页面，请截图发送给工作人员，便于我们针对您的情况排查错误。
          </Text>
          <Button
            className='btn btn-ikonw'
            onClick={this.onIKonw}
          >我知道了</Button>
        </View>}

        <View className='info'>
          <Text className='info-text'>手机型号：{this.state.model}</Text>
          <Text className='info-text'>系统版本：{this.state.system}</Text>
          <Text className='info-text'>语言：{this.state.language}</Text>
          <Text className='info-text'>微信版本：{this.state.version}</Text>
          <Text className='info-text'>小程序基础库：{this.state.SDKVersion}</Text>
          <Text className='info-text'>当前环境：{this.state.platform}</Text>
          <Text className='info-text'>状态栏高度：{this.state.statusBarHeight}</Text>
          <Text className='info-text'>字体大小：{this.state.fontSizeSetting}</Text>
          <Text className='info-text'>
            屏幕宽度：window{this.state.windowWidth},screen{this.state.screenWidth}
          </Text>
          <Text className='info-text'>
            屏幕高度：window{this.state.windowHeight},screen{this.state.screenHeight}
          </Text>
          <Text className='info-text'>
            当前时间：{dateFormat(new Date().getTime(), 'Y-m-d H:i:s')}
          </Text>
          <Text className='info-text'>已记录异常：</Text>
          <Text className='error-log'>{this.state.errorLog}</Text>
        </View>
        <View className='btns'>
          <Button className='btn' onClick={this.onClear}>清空全部缓存（能解决多数问题）</Button>
          <Button className='btn' onClick={this.onUpdate}>如果有新版本就强行更新使用</Button>
          <Button className='btn' onClick={this.onVconsole}>开关vConsole模式调试</Button>
        </View>
        <View className='copyright'>制作：@何喜阳</View>
      </View>
    )
  }
}

