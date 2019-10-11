import Taro, {Component, Config} from '@tarojs/taro'
import {Button, Input, View} from '@tarojs/components'
import './forget.scss'
import Iconfont from "../../components/iconfont/iconfont";
import url, {post} from "../../url";
import {checkPhone, ErrorTip} from "../../utils";

export interface ForgetPasswordProps {

}

export interface State {
  step: number,//当前步骤
  phone: string,
  smsCode: string,
  newPassword1: string,
  newPassword2: string,
  countdown: number
}

// 找回密码
export default class ForgetPassword extends Component<ForgetPasswordProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#3a71e6",
    navigationBarTextStyle: "white",
    backgroundColor: "#3a71e6",
    backgroundTextStyle: "light",
    navigationBarTitleText: '找回密码',
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      phone: '',
      smsCode: '',
      newPassword1: '',
      newPassword2: '',
      countdown: 0
    }
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

  onInput = (event) => {
    const type: string = event.currentTarget.dataset.type;
    const value = event.detail.value;
    switch (type) {
      case 'phone':
        this.setState({phone: value});
        break;
      case 'smsCode':
        this.setState({smsCode: value});
        break;
      case 'newPassword1':
        this.setState({newPassword1: value});
        break;
      case 'newPassword2':
        this.setState({newPassword2: value});
        break;
    }
  };

  // 下发短信验证码
  onSendCode = () => {
    const {phone} = this.state;
    if (!checkPhone(phone)) {
      Taro.showToast({
        icon: 'none',
        title: '手机号格式不正确'
      });
      return;
    }
    post(url.apiSmsSend, {phone: this.state.phone}, res => {
      if (res.header['Set-Cookie']) {
        const COOKIE = res.header['Set-Cookie'];
        Taro.setStorageSync('cookie', COOKIE);
      }
      if (res.data.code === 200) {
        Taro.showToast({
          title: '已发送'
        });
        this.setState({countdown: 60}, () => {
          this.TimerInterval();
        });
      } else {
        ErrorTip(res.data.msg, url.apiSmsSend, true)
      }
    }, true)
  };


  TimerInterval = () => {
    const Timer = setInterval(() => {
      if (this.state.countdown < 1) {
        clearInterval(Timer);
        return;
      }
      this.setState({countdown: this.state.countdown - 1});
    }, 1000)
  };

  // 效验短信验证码进行下一步
  onNext = () => {
    const {phone, smsCode} = this.state;
    if (!phone || !smsCode) {
      Taro.showModal({
        title: '提示',
        content: '手机号和验证码均不能是空',
        showCancel: false
      });
      return;
    }
    this.setState({step: 1})
  };

  // 确定修改密码
  onConfrim = () => {
    const {newPassword1, newPassword2} = this.state;
    if (!newPassword1 || !newPassword2 || newPassword1 !== newPassword2) {
      Taro.showModal({
        title: '提示',
        content: '两次输入的密码不一样',
        showCancel: false
      });
      return;
    }
    post(url.apiForgetPwd, this.state, res => {
      if (res.code === 200) {
        Taro.showToast({title: '修改成功'});
        setTimeout(() => {
          Taro.navigateBack({});
        }, 2000)
      } else {
        Taro.showModal({
          title: '提示',
          content: res.msg || '网络繁忙',
          showCancel: false
        });
      }
    })
  };

  render() {
    return (
      <View className='forget'>

        {this.state.step === 0 ?
          <View>
            <View className='phone line'>
              <Iconfont name='myfill' color='#888'/>
              <Input
                className='input'
                placeholder='请输入手机号'
                data-type='phone'
                maxLength={11}
                onInput={this.onInput}
                value={this.state.phone}
              />
            </View>
            <View className='phone line'>
              <Iconfont name='mima' color='#888'/>
              <Input
                className='input'
                placeholder='请输入验证码'
                data-type='smsCode'
                onInput={this.onInput}
                value={this.state.smsCode}
              />
              {this.state.countdown > 1 ?
                <Button className='btn btn-getcode' style={{color: '#888'}}>重发({this.state.countdown})</Button> :
                <Button className='btn btn-getcode' openType='getUserInfo'
                        onGetUserInfo={this.onSendCode}>获取验证码</Button>
              }
            </View>
            <Button className='btn btn-confrim' onClick={this.onNext}>下一步</Button>
          </View> :
          <View>
            <View className='phone line'>
              <Iconfont name='mima' color='#888'/>
              <Input
                className='input'
                placeholder='请输入新密码'
                data-type='newPassword1'
                onInput={this.onInput}
                value={this.state.newPassword1}
              />
            </View>
            <View className='phone line'>
              <Iconfont name='mima' color='#888'/>
              <Input
                className='input'
                placeholder='请再次输入新密码'
                data-type='newPassword2'
                onInput={this.onInput}
                value={this.state.newPassword2}
              />
            </View>
            <Button className='btn btn-confrim' onClick={this.onConfrim}>提交</Button>
          </View>
        }
      </View>
    )
  }
}

