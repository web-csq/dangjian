import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, RichText} from '@tarojs/components'
import './detail.scss'
import {ArticleModel} from "../../../model/ArticleModel";
import url, {getJSON} from "../../url";
import {dateFormat} from "../../utils";


import "../../wxParse/wxParse.wxss"

export interface ArticleDetailProps {

}

export interface State extends ArticleModel {
  type: string,
  content: string,
  addtime: number
}

export default class ArticleDetail extends Component<ArticleDetailProps, State> {

  config: Config = {
    navigationBarBackgroundColor: "#ff0000",
    navigationBarTextStyle: "white",
    backgroundColor: "#ff0000",
    backgroundTextStyle: "light"
  };

  static defaultProps = {};
  detail: Nodes;

  constructor(props) {
    super(props);
    detail:""
    this.state = {
      id: '',
      type: '',
      title: '',
      cover: '',
      createtime: 0,
      detail: '',
      content: '',
      addtime: 0,
      url:"",
      videoShow:false,

    };
    url:"";


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
        apiUrl = url.apiParkDetail;
        break;
    }
    getJSON(apiUrl, {id}, (res) => {
      this.setState(res.data);
      var detail=res.data.detail
      this.detail=res.data.detail.replace(/(width:)|(width=)/gi, 'title=')
      this.detail=this.detail.replace(/(height:)|(height=)/gi, 'title=')
      this.detail=this.detail.replace(/px/gi, 'rpx')
      this.detail=this.detail.replace(/text-indent:\d+rpx/gi, 'text-indent:35px')
      this.detail=this.detail.replace(/\<img/gi, '<img style="max-width:96%;margin:20px auto;display:block;"')
      this.setState({
        detail:this.detail
      })
      // console.log(this.detail+"----------this.detail")
      var num1=detail.indexOf('<source src="')+13;
      var num2=detail.indexOf('" type="video/mp4"/>');

      if(num2>0){
        this.setState({
          videoShow:true
        })

      }
      var url=detail.slice(num1,num2)

      this.url=url;
      this.setState({
        url:url,
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
      <View className='detail'>
        
        <Text className='title'>{this.state.title}</Text>

        <Text className='post-time'>{dateFormat(time * 1000, 'Y-m-d H:i:s')}</Text>
        <RichText className='article' nodes={this.detail} />

        {this.state.videoShow?(<video src="{{url}}"  controls className="video" ></video>):null
        }

{this.state.excel?<View onClick={this.look} style={{margin:"20px 20px 0 0",textAlign:"right"}} >点击预览附件</View>:""}

      </View>
    )
  }
}
