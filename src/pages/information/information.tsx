import Taro, {Component, Config} from '@tarojs/taro'
import {View, OpenData, Text, Navigator, Image} from '@tarojs/components'
import './information.scss'
import Iconfont from '../../components/iconfont/iconfont';
import url, {getJSON} from "../../url";
import {UserModel} from "../../../model/UserModel";
import {checkResUrl} from "../../utils";

export interface InformationProps {

}

export interface State extends UserModel {
  clickDebugNumber: number
}


export default class Information extends Component<InformationProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#386fe4",
    navigationBarTextStyle: "white",
    backgroundColor: "#386fe4",
    backgroundTextStyle: "light",
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: '',
      companyName: '',
      id: '',
      nickName: '',
      phone: '',
      clickDebugNumber: 0
    }
  }

  componentWillMount() {
    Taro.setTabBarStyle({selectedColor: '#2161e0',});
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    const isLogin = Taro.getStorageSync('cookie');
    if (!isLogin) {
      Taro.navigateTo({url: '/pages/login/login'});
      return;
    }
    this.getUserInfo();
  }

  componentDidHide() {
  }

  getUserInfo = () => {
    getJSON(url.apiMember, {}, (res) => {
      if (res.code === 200) {
        this.setState(res.data || {});
        Taro.setStorageSync('userInfo', res.data || {})
      } else if (res.code === 204) {
        Taro.removeStorageSync('cookie');
        Taro.navigateTo({url: '/pages/login/login'});
      } else {
        Taro.showToast({
          icon: 'none',
          title: res.msg || '网络繁忙',
        })
      }
    })
  };

  // 触发调试入口
  onDebug = () => {
    let clickDebugNumber = this.state.clickDebugNumber;
    if (clickDebugNumber < 6) {
      clickDebugNumber += 1;
      this.setState({clickDebugNumber});
      return;
    }
    Taro.navigateTo({
      url: '/pages/debug/debug'
    })
  };

  render() {
    return (
      <View className='information page'>
        <View className='user'>
          <View className='user-avatar' onClick={this.onDebug}>
            {this.state.avatarUrl ?
              <Image className='user-avatar__img' src={checkResUrl(this.state.avatarUrl)} mode='widthFix'/> :
              <OpenData type='userAvatarUrl'/>
            }
          </View>
          <Text className='user-nickname'>{this.state.nickName || this.state.companyName}</Text>
          <Image className='bg'
                 src='../../images/bg_uesr_top.png'
          />
        </View>
        <View className='menu'>
          <Navigator url='/pages/institutions/institutions' className='icon-more menu-item' openType='navigate'>
            <Iconfont name='huojian' color='#986699' size='24px'/>
            <Text className='text'>电话查询</Text>
          </Navigator>
          <Navigator url='/pages/suggest/edit' className='icon-more menu-item' openType='navigate'>
            <Iconfont name='liuyanfill' color='#00cb65' size='24px'/>
            <Text className='text'>我的建议</Text>
          </Navigator>
          <Navigator url='/pages/suggest/list?type=user' className='icon-more menu-item' openType='navigate'>
            <Iconfont name='qianbipencil82' color='#3233cc' size='24px'/>
            <Text className='text'>建议记录</Text>
          </Navigator>
          <Navigator url='/pages/setting/setting' className='icon-more menu-item' openType='navigate'>
            <Iconfont name='shezhi' color='#0099fe' size='24px'/>
            <Text className='text'>设置中心</Text>
          </Navigator>
        </View>
      </View>
    )
  }
}
