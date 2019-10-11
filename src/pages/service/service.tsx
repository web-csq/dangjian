import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, Button, Image} from '@tarojs/components'
import './service.scss'

export interface ServiceProps {

}

export interface State {
  url: string,
  qrcodeUrl: string,
}

export default class Service extends Component<ServiceProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#386fe4",
    navigationBarTextStyle: "white",
    backgroundColor: "#386fe4",
    backgroundTextStyle: "light",
    navigationBarTitleText: '政务服务',
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      url: 'http://lfdc.hbzwfw.gov.cn/',
      qrcodeUrl: 'https://party.boxinid.com/ueditor/20190819/1566196069376231.jpg',
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

  onSave = () => {
    Taro.downloadFile({
      url: this.state.qrcodeUrl,
    }).then((res) => {
      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
      if (res.statusCode === 200) {
        Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath
        }).then(() => {
            Taro.showToast({
              icon: 'success',
              title: '已保存到相册'
            })
        })
      }
    })
  };

  onCopy = () => {
    Taro.setClipboardData({
      data: this.state.url
    }).then(() => {
      Taro.showToast({
        icon: 'none',
        title: '已复制'
      })
    })
  };

  render() {
    return (
      <View className='service'>
        <Text className='h1 title'>由于小程序限制，请通过以下方式继续访问：</Text>
        <Text className='sub-title'>1.长按保存二维码通过其他途径扫码</Text>
        <Image className='qrcode' src={this.state.qrcodeUrl} onLongPress={this.onSave}/>
        {/*<Button className='btn btn-save btn-confrim' onClick={this.onSave}>保存二维码</Button>*/}
        <Text className='sub-title'>2.直接复制链接到浏览器中访问</Text>
        <Text className='link'>{this.state.url}</Text>
        <Button className='btn btn-copy btn-confrim' onClick={this.onCopy}>复制链接</Button>
      </View>
    )
  }
}
