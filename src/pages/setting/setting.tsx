import Taro, {Component, Config} from '@tarojs/taro'
import {View, Input, Image, Text} from '@tarojs/components'
import './setting.scss'
import url, {post, uploadFile} from "../../url";
import {UserModel} from "../../../model/UserModel";
import {checkResUrl} from "../../utils";

export interface SettingProps {

}

export interface State extends UserModel {
  isAlter: boolean
}

export default class Setting extends Component<SettingProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#3a71e6",
    navigationBarTextStyle: "white",
    backgroundColor: "#3a71e6",
    backgroundTextStyle: "light",
    navigationBarTitleText: '设置中心',
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
      isAlter: false
    }
  }

  componentWillMount() {
    this.setState(Taro.getStorageSync('userInfo'));
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    // 页面退出	在微信小程序中这一生命周期方法对应 onUnload
    if (this.state.isAlter) {
      post(url.apiChangeMember, this.state, (res) => {
        if (res.code === 200) {
          Taro.showToast({
            title: '资料已修改'
          })
        } else {
          Taro.showToast({
            icon: 'none',
            title: res.msg || '用户信息未变化'
          })
        }
      })
    }
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  // 输入
  onInput = (event) => {
    const type: string = event.currentTarget.dataset.type;
    const value = event.detail.value;
    this.setState({isAlter: true});
    switch (type) {
      case 'companyName':
        this.setState({companyName: value});
        break;
      case 'nickName':
        this.setState({nickName: value});
        break;
      case 'phone':
        this.setState({phone: value});
        break;
    }
  };

  // 点击头像，触发上传更改头像
  onUploadHeadImg = () => {
    Taro.chooseImage({
      count: 1,
    }).then((res) => {
      const tempFilePaths = res.tempFilePaths;
      uploadFile(tempFilePaths[0], (uploadRes) => {
        uploadRes = typeof uploadRes === 'string' ? JSON.parse(uploadRes) : uploadRes;
        this.setState({avatarUrl: uploadRes.data});
      })
    })
  };

  render() {
    return (
      <View className='setting page'>
        <View className='block'>
          <Text className='block-title'>头像</Text>
          <Image className='block-img' src={checkResUrl(this.state.avatarUrl)} onClick={this.onUploadHeadImg}/>
        </View>
        <View className='block'>
          <Text className='block-title'>企业名称</Text>
          <Input className='block-input'
                 disabled
                 onInput={this.onInput}
                 data-type='companyName'
                 value={this.state.companyName}
                 placeholder='企业名称暂不允许修改'
          />
        </View>
        <View className='block'>
          <Text className='block-title'>联系人</Text>
          <Input className='block-input'
                 onInput={this.onInput}
                 data-type='nickName'
                 value={this.state.nickName}
                 placeholder='联系人姓名'
          />
        </View>
        <View className='block'>
          <Text className='block-title'>联系方式</Text>
          <Input className='block-input'
                 onInput={this.onInput}
                 data-type='phone'
                 value={this.state.phone}
                 placeholder='请输入手机号'
                 maxLength={11}
          />
        </View>
      </View>
    )
  }
}

