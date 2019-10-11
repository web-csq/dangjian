import Taro, {Component, Config} from '@tarojs/taro'
import {Button, Input, View, Image, Text} from '@tarojs/components'
import './register.scss'
import Iconfont from "../../components/iconfont/iconfont";
import url, {post, uploadFile} from "../../url";
import {checkPhone, checkResUrl, ErrorTip} from "../../utils";

export interface RegisterProps {

}

export interface State {
  phone: string,
  smsCode: string,
  companyName: string,
  companyCertificate: string,
  pwd: string,
  countdown: number,
  avatarUrl: string,
  nickName: string
}

export default class Register extends Component<RegisterProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#3a71e6",
    navigationBarTextStyle: "white",
    backgroundColor: "#3a71e6",
    backgroundTextStyle: "light",
    navigationBarTitleText: '注册',
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      smsCode: '',
      companyName: '',
      companyCertificate: '',
      pwd: '',
      countdown: 0,
      avatarUrl: '',
      nickName: ''
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
      case 'pwd':
        this.setState({pwd: value});
        break;
      case 'companyName':
        this.setState({companyName: value});
        break;
    }
  };

  // 选择证书图片上传
  onUploadImage = () => {
    Taro.chooseImage({
      count: 1,
    }).then((res) => {
      const tempFilePaths = res.tempFilePaths[0];
      uploadFile(tempFilePaths, (uploadRes) => {
        uploadRes = typeof uploadRes === 'string' ? JSON.parse(uploadRes) : uploadRes;
        this.setState({companyCertificate: uploadRes.data});
      })
    })
  };

  // 获取短信验证码
  onSendCode = (event) => {
    // 获取验证码的同时获取用户信息
    const userInfo = event.detail.userInfo;
    if (userInfo) {
      this.setState({avatarUrl: userInfo.avatarUrl, nickName: userInfo.nickName})
    } else {
      Taro.showModal({
        title: '提示',
        content: '需要授权获取头像、昵称等基本信息才能获取验证码创建账号',
        showCancel: false
      });
      return;
    }
    const {phone} = this.state;
    if (!checkPhone(phone)) {
      Taro.showToast({
        icon: 'none',
        title: '手机号格式不正确'
      });
      return;
    }
    post(url.apiSmsSend, {phone}, res => {
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

  onConfrim = () => {
    const {phone, companyName, companyCertificate} = this.state;
    if (!companyName || !companyCertificate) {
      Taro.showToast({
        icon: 'none',
        title: '请把信息填写完整'
      });
      return;
    }
    if (!checkPhone(phone)) {
      Taro.showToast({
        icon: 'none',
        title: '手机号格式不正确'
      });
      return;
    }
    post(url.apiRegister, this.state, (res) => {
      console.log(res);
      if (res.code === 200) {
        Taro.showModal({
          title: '注册结果',
          content: '请等待管理员审核',
          showCancel: false
        }).then(() => {
          Taro.switchTab({
            url: '/pages/index/index'
          });
        })
      }
    })
  };

  render() {
    return (
      <View className='register'>
        <View className='phone line'>
          <Iconfont name='myfill' color='#888'/>
          <Input
            className='input'
            placeholder='请输入手机号'
            maxLength={11} focus
            data-type='phone'
            type='number'
            onInput={this.onInput}
            value={this.state.phone}
          />
        </View>
        <View className='code line'>
          <Iconfont name='mima' color='#888'/>
          <Input
            className='input'
            placeholder='请输入验证码'
            onInput={this.onInput}
            type='number'
            data-type='smsCode'
            value={this.state.smsCode}
          />
          {this.state.countdown > 1 ?
            <Button className='btn btn-getcode' style={{color: '#888'}}>重发({this.state.countdown})</Button> :
            <Button className='btn btn-getcode' openType='getUserInfo' onGetUserInfo={this.onSendCode}>获取验证码</Button>
          }
        </View>
        <View className='password line'>
          <Iconfont name='mima' color='#888'/>
          <Input
            className='input'
            placeholder='密码'
            value={this.state.pwd}
            password
            data-type='pwd'
            onInput={this.onInput}
          />
        </View>
        <View className='name line'>
          <Iconfont name='meimingzi' color='#888'/>
          <Input
            className='input'
            placeholder='企业名称'
            onInput={this.onInput}
            data-type='companyName'
            value={this.state.companyName}
          />
        </View>
        {this.state.companyCertificate ?
          <Image
            className='certificate'
            style={{paddingTop: 0}}
            mode='widthFix'
            src={checkResUrl(this.state.companyCertificate)}
            onClick={this.onUploadImage}
          /> :
          <View className='certificate' onClick={this.onUploadImage}>
            <Iconfont name='jia' color='#888' size='50rpx'/>
            <Text className='certificate-text'>上传企业证书</Text>
          </View>
        }
        <Button className='btn btn-confrim' onClick={this.onConfrim}>提交</Button>
      </View>
    )
  }
}

