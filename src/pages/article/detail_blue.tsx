import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, RichText, Video, Image} from '@tarojs/components'
import './detail.scss'
import {ArticleModel} from "../../../model/ArticleModel";
import url, {getJSON} from "../../url";
import {checkResUrl, dateFormat} from "../../utils";
import "../../wxParse/wxParse.wxss"
export interface ArticleDetailBlueProps {

}

export interface State extends ArticleModel {
  type: string,
  video: string,//宣传片是视频播放的
  imgs: string[],//建议详情是带多张图的
  content: string,
  addtime: number
}

//  这是文章详情的第二个效果，布局\接口调用同第一个，只是背景颜色不同
//  使用单个页面制作，通过api切换背景颜色会有闪烁影响体验，因此两种效果此处采用两个页面
//  详情页为了匹配不同接口的数据格式字段，因此多处采用了 || 来尝试匹配
export default class ArticleDetailBlue extends Component<ArticleDetailBlueProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#386fe4",
    navigationBarTextStyle: "white",
    backgroundColor: "#386fe4",
    backgroundTextStyle: "light"
  };

  static defaultProps = {};

  constructor(props: ArticleDetailBlueProps | undefined) {
    super(props);
    detail:""
    this.state = {
      id: '',
      type: '',
      title: '',
      createtime: 0,
      detail: '',
      video: '',
      content: '',
      addtime: 0,
      imgs: []
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    const id = this.$router.params.id;
    const type = this.$router.params.type;
    this.getDetail(id, type);
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

  getDetail = (id = this.state.id, type = this.state.type) => {
    let apiUrl = '';
    switch (type) {
      case 'djjbzs':
      case 'sjdjs':
      case 'djgzfc':
      case 'pyjr':
        apiUrl = url.apiArticleDetail;
        break;
      case 'notice':
        apiUrl = url.apiNoticeDetail;
        break;
      case 'company':
      case 'zsxx':
      case 'dcgxqjj':
      case 'gxqxcp':
      case 'gxqmj':
      case 'zdxm':
        apiUrl = url.apiParkDetail;
        break;
      case 'bmjg':
        apiUrl = url.apiMentDetail;
        break;
      case 'qyjg':
        apiUrl = url.apiEnterpriseDetail;
        break;
      case 'fwjg':
        apiUrl = url.apiServiceDetail;
        break;
      case 'zpxx':
        apiUrl = url.apiRecruitDetail;
        break;
      case 'qzxx':
        apiUrl = url.apiWantedDetail;
        break;
      case 'suggest':
        apiUrl = url.apiProposalDetail;
        break;
      case 'bm1zcxx':
      case 'bm2zcxx':
      case 'bm3zcxx':
      case 'bm4zcxx':
      case 'bm5zcxx':
      case 'bm6zcxx':
      case 'bm7zcxx':
      case 'bm8zcxx':
      case 'bm9zcxx':
      case 'yqdtxx':
        apiUrl = url.apiPolicyDetail;
        break;

    }
    getJSON(apiUrl, {id}, (res: { data: { detail: { replace: (arg0: RegExp, arg1: string) => void; }; }; }) => {
      const data = res.data;
      var detail=res.data.detail
      this.detail=res.data.detail.replace(/(width:)|(width=)/gi, 'title=')
      this.detail=this.detail.replace(/(height:)|(height=)/gi, 'title=')
      this.detail=this.detail.replace(/px/gi, 'rpx')
      this.detail=this.detail.replace(/text-indent:\d+rpx/gi, 'text-indent:35px')
      this.detail=this.detail.replace(/\<img/gi, '<img style="max-width:96%;margin:20px auto;display:block;"')
      console.log(this.detail+"----------this.detail")
      if (data['imgs'] && typeof data['imgs'] === 'string') {
        data['imgs'] = data['imgs'].split(",");
      }
      this.setState(data)
      this.setState({
        detail:this.detail
      })
      
      
    })
  
  };
  look(e){
    
    Taro.downloadFile({
      url: this.state.excel||'https://party.boxinid.com/ueditor/file/20190909/1568025795338798.xls',
      header: {}
    }).then(res=>{
      var filePath = res.tempFilePath;
      Taro.openDocument({
        filePath: filePath,
    }).then(()=>{
      console.log('打开文档成功')
    }).catch(err=>{
      console.log(err)
    })

    }).catch(err=>{
      console.log(err)
    })
  }

  render() {
    const time = this.state.createtime || this.state.addtime;
    return (
      <View className='detail' >

        <Text className='title'>{this.state.title}</Text>
        <Text className='post-time'>{dateFormat(time * 1000, 'Y-m-d H:i:s')}</Text>
        {this.state.video && <Video src={checkResUrl(this.state.video)} autoplay style={{width: '100%'}} />}
        {this.state.imgs && this.state.imgs.map((imgurl) => {
          return <Image key={imgurl} src={checkResUrl(imgurl)} style={{width: '100%'}} mode='widthFix' />
        })}


        {<RichText className='article' nodes={this.state.detail} />}

       
        {this.state.excel?<View onClick={this.look} style={{margin:"20px 20px 0 0",textAlign:"right"}} >点击预览附件</View>:""}
       
      </View>
    )
  }
}
