import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, Textarea, Input, Button, Image} from '@tarojs/components'
import './edit.scss'
import url, {post, uploadFile} from "../../url";
import Iconfont from "../../components/iconfont/iconfont";
import {checkPhone, checkResUrl} from "../../utils";

export interface SuggestEditProps {

}

export interface State {
  companyName: string,
  contactName: string,
  contactPhone: string,
  title: string,
  content: string,
  imgs: string[],
  type: string,//suggest\desired 建议还是需求，页面效果一样，直接复用，通过参数判断
}

// 我有建议、企业需求的添加页面，也可以当做编辑页面
export default class SuggestEdit extends Component<SuggestEditProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#3970e5",
    navigationBarTextStyle: "white",
    backgroundColor: "#3970e5",
    backgroundTextStyle: "light",
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      contactName: '',
      contactPhone: '',
      title: '',
      content: '',
      imgs: [],
      type: 'suggest'
    }
  }

  componentWillMount() {
    const type = this.$router.params.type;
    this.setState({type});
    if (type === 'suggest') {
      Taro.setNavigationBarTitle({
        title: '添加建议'
      });
    } else if (type === 'desired') {
      Taro.setNavigationBarTitle({
        title: '企业需求'
      });
    }
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

  // 内容被改变时回调
  onChange = (event) => {
    const type: string = event.currentTarget.dataset.type;
    // const value = {[type]: event.detail.value};
    // this.setState(value); 这样写编辑器ts效验不通过报红，虽然不影响使用，看着难受改成下面这种写法
    const value = event.detail.value;
    switch (type) {
      case 'companyName':
        this.setState({companyName: value});
        break;
      case 'contactName':
        this.setState({contactName: value});
        break;
      case 'contactPhone':
        this.setState({contactPhone: value});
        break;
      case 'title':
        this.setState({title: value});
        break;
      case 'content':
        this.setState({content: value});
        break;
    }
  };

  // 确定提交
  onConfrim = () => {
    const {companyName, contactName, contactPhone, title, content} = this.state;
    if (!companyName || !contactName || !contactPhone || !title || !content) {
      Taro.showToast({
        icon: 'none',
        title: '请把信息填写完整'
      });
      return;
    }
    if (!checkPhone(contactPhone)) {
      Taro.showToast({
        icon: 'none',
        title: '手机号格式不正确'
      });
      return;
    }
    let apiUrl = '';
    if (this.state.type === 'suggest') {
      apiUrl = url.apiPropoasl;
    } else {
      apiUrl = url.apiProposalRecruit;
    }
    post(apiUrl, this.state, (res) => {
      console.log(res);
      if (res.code === 200) {
        Taro.redirectTo({
          url: '/pages/success/success'
        })
      } else {
        Taro.showToast({
          title: res.msg || '网络繁忙，请稍后再试'
        })
      }
    })
  };

  // 上传图片
  onUploadImages = () => {
    Taro.chooseImage({
      count: 5 - this.state.imgs.length,
    }).then((res) => {
      let imgs = this.state.imgs;
      res.tempFilePaths.forEach(filePath => {
        uploadFile(filePath, (uploadRes) => {
          uploadRes = typeof uploadRes === 'string' ? JSON.parse(uploadRes) : uploadRes;
          imgs = imgs.concat(uploadRes.data);
          this.setState({imgs});
        })
      })
    })
  };

  // 删除某个已上传的图片
  onDelImg = (index) => {
    let imgs = this.state.imgs;
    imgs.splice(index, 1);
    this.setState({imgs});
  };

  render() {
    return (
      <View className='edit page'>

        <View className='line'>
          <Text className='line-title'>企业名称</Text>
          <Input
            className='line-input'
            data-type='companyName'
            placeholder='请输入企业名称'
            value={this.state.companyName}
            onInput={this.onChange}
          />
        </View>

        <View className='line'>
          <Text className='line-title'>联系人</Text>
          <Input
            className='line-input'
            data-type='contactName'
            placeholder='联系人姓名'
            value={this.state.contactName}
            onInput={this.onChange}
          />
        </View>

        <View className='line'>
          <Text className='line-title'>联系方式</Text>
          <Input
            className='line-input'
            data-type='contactPhone'
            placeholder='请输入手机号'
            type='number'
            maxLength={11}
            value={this.state.contactPhone}
            onInput={this.onChange}
          />
        </View>

        <View className='line'>
          <Text className='line-title'>标题</Text>
          <Input
            data-type='title'
            className='line-input'
            placeholder='请输入标题'
            value={this.state.title}
            onInput={this.onChange}
          />
        </View>

        <View className='block'>
          <View className='block-title'>
            {this.state.type === 'suggest' ? "意见描述" : "企业需求"}
          </View>
          <Textarea
            className='block-input'
            maxlength={500}
            data-type='content'
            value={this.state.content}
            placeholder={`${this.state.type === 'suggest' ? "意见描述" : "企业需求"}（最多500个字符）`}
            onInput={this.onChange}
          >
          </Textarea>
          <View className='clearfix imgs'>
            {this.state.imgs.map((imgurl, index) => {
              return <Image
                key={imgurl}
                className='img'
                src={checkResUrl(imgurl)}
                onClick={this.onDelImg.bind(this, index)}
              />
            })}
            {this.state.imgs.length < 5 &&
            <View className='btn btn-uploads' onClick={this.onUploadImages}>
              <Iconfont name='tianjia' color='#888' />
            </View>}
          </View>
        </View>

        <Button className='btn btn-confrim' onClick={this.onConfrim}>提交</Button>
      </View>
    )
  }
}

