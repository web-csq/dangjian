import Taro, {Component, Config} from '@tarojs/taro'
import {Input, Image, Text, View, Button, Navigator} from '@tarojs/components'
import './login.scss'
import Iconfont from "../../components/iconfont/iconfont";
import url, {post} from "../../url";

export interface LoginProps {

}

export interface State {
  phone: string,
  pwd: string,
  currentFocus: string
}

export default class Login extends Component<LoginProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#3a71e6",
    navigationBarTextStyle: "white",
    backgroundColor: "#3a71e6",
    backgroundTextStyle: "light",
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  };

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      pwd: '',
      currentFocus: 'phone'
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    Taro.switchTab({url:'/pages/index/index'});
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  // 登录
  onLogin = () => {
    if (this.state.pwd === '::debug') {
      //  debug 模式入口，会跳转到何喜阳制作的debug调试页面
      Taro.navigateTo({
        url: '/pages/debug/debug'
      });
      return;
    }
    Taro.removeStorageSync('cookie');
    const {phone, pwd} = this.state;
    if (!phone || !pwd) {
      Taro.showToast({
        icon: 'none',
        title: '请把信息填写完整'
      });
      return;
    }
    post(url.apiLogin, this.state, (res) => {
      if (res.data.code === 200 && res.header['Set-Cookie']) {
        const COOKIE = res.header['Set-Cookie'];
        Taro.setStorageSync('cookie', COOKIE);
        Taro.navigateBack({});
      } else {
        Taro.showToast({
          icon: 'none',
          title: res.data.msg || '网络繁忙'
        })
      }
    }, true)
  };

  onInput = (event) => {
    const type: string = event.currentTarget.dataset.type;
    const value = event.detail.value;
    switch (type) {
      case 'phone':
        this.setState({phone: value});
        break;
      case 'pwd':
        this.setState({pwd: value});
        break;
    }
  };

  onEnter = (event) => {
    const type: string = event.currentTarget.dataset.type;
    if (type === 'phone') {
      this.setState({currentFocus: 'pwd'})
    } else if (type === 'pwd') {
      this.onLogin()
    }
  };

  render() {
    return (
      <View className='login'>
        <View className='top'>
          <View className='tenter'>
            <Image
              className='logo'
              src='../../images/icon_company.png'
            />
            <Text className='title'>企业登录</Text>
          </View>
          <Image
            className='bg'
            src='../../images/bg_uesr_top.png'
          />
        </View>
        <View className='main'>
          <View className='phone'>
            <Iconfont name='myfill' color='#888'/>
            <Input
              className='input'
              placeholder='请输入手机号'
              value={this.state.phone}
              maxLength={11}
              focus={this.state.currentFocus === 'phone'}
              data-type='phone'
              type='number'
              onInput={this.onInput}
              onConfirm={this.onEnter}
            />
          </View>
          <View className='password'>
            <Iconfont name='mima' color='#888'/>
            <Input
              className='input'
              placeholder='密码'
              value={this.state.pwd}
              password
              focus={this.state.currentFocus === 'pwd'}
              data-type='pwd'
              onInput={this.onInput}
              onConfirm={this.onEnter}
            />
          </View>
          <Button className='btn btn-confrim' onClick={this.onLogin}>登录</Button>
          <View className='fun'>
            <Navigator
              className='reg'
              url='/pages/register/register'
            >
              注册
            </Navigator>
            <Navigator
              className='forget-password'
              url='/pages/password/forget'
            >
              忘记密码
            </Navigator>
          </View>
        </View>
        <View className='other-login'>
          <View className='other-login-title'>其他登录方式</View>
          <Navigator
            openType='switchTab'
            className='visitor'
            url='/pages/index/index'
          >
            <Iconfont name='myfill' color='#ccc' size='16px'/>
            <Text className='visitor-text'>游客登录</Text>
          </Navigator>
        </View>
      </View>
    )
  }
}

