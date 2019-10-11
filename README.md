<<<<<<< HEAD
### 项目信息 
名称：党建小程序    
时间：2019-01

### 采用技术
主要使用Taro、React、SASS、TypeScript，版本号请看  package.json     
代码修改后需要进行编译，才能在小程序中看到效果，普通修改也可以直接修改编译后的小程序代码。    
如果对以上技术不熟悉，修改任何文件前请先查询对应文档阅读。    
注意：进行npm i 时可能是跨版本更新npm包，如果出现异常请尝试使用开发时使用版本  


### 特殊情况下调试  
在登录页面密码输入框输入【::debug】即可触发调试模式，正式上线时遇到异常问题可以让客户触发调试页面截图反馈。调试页面在/pages/debug/debug，目前包括用户设备信息以及onError捕获的全部异常信息。

###  Taro生命周期备注
#### 在app.tsx（等同于小程序的app.js）中
* componentWillMount	
程序被载入	在微信小程序中这一生命周期方法对应 app 的 onLaunch
* componentDidMount	
程序被载入	在微信小程序中这一生命周期方法对应 app 的 onLaunch，在 componentWillMount 后执行
* componentDidShow	
程序展示出来	在微信小程序中这一生命周期方法对应 onShow，在 H5 中同样实现
* componentDidHide	
程序被隐藏	在微信小程序中这一生命周期方法对应 onHide，在 H5 中同样实现
* componentDidCatchError	
错误监听函数	在微信小程序中这一生命周期方法对应 onError
* componentDidNotFound	
页面不存在监听函数	在微信小程序中这一生命周期方法对应 onPageNotFound
#### 在每个页面中
* componentWillMount	
页面被载入	在微信小程序中这一生命周期方法对应 onLoad
* componentDidMount	
页面渲染完成	在微信小程序中这一生命周期方法对应 onReady
* shouldComponentUpdate	
页面是否需要更新	
* componentWillUpdate	
页面即将更新	
* componentDidUpdate	
页面更新完毕	
* componentWillUnmount	
页面退出	在微信小程序中这一生命周期方法对应 onUnload
* componentDidShow	
页面展示出来	在微信小程序中这一生命周期方法对应 onShow，在 H5 中同样实现
* componentDidHide	
页面被隐藏	在微信小程序中这一生命周期方法对应 onHide，在 H5 中同样实现
* 微信小程序中 onLoad 通常带有一个参数 options，在 Taro 中你可以在所有生命周期和普通事件方法中通过 this.$router.params 访问到，在其他端也适用
#### 微信小程序专有方法
* onPullDownRefresh	
页面相关事件处理函数--监听用户下拉动作
* onReachBottom	
页面上拉触底事件的处理函数
* onShareAppMessage	
用户点击右上角转发
* onPageScroll	
页面滚动触发事件的处理函数
* onTabItemTap	
当前是 tab 页时，点击 tab 时触发
* componentWillPreload	
预加载，只在微信小程序中可用

