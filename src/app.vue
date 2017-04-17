<style lang="less">
@import 'weui.wxss';

/**app.wxss**/
page,.page,.page__bd {
	height:100%;
	background:#f8f8f8;
}
.divLine {
	background:#888888;
	height:2rpx;
	margin:0 20rpx;


}
.weui-form-preview__btn {
	display:flex;
	flex-direction:column;
	padding:7px;

}
.weui-form-preview__btn text {
	font-size:26rpx;
	color:black;

}
.page__ft {
	position:fixed;
	bottom:0;
	width:100%;
	z-index:300;
	background:white;
}
.weui-cells_after-title {
	font-size:28rpx;
}
.weui-navbar,.weui-tab__panel {
	background:#f8f8f8;
}
.left-btn {
	color:white;
	background:#26ab28;
	padding:13px;
}
.left-btn_active {
	color:white;
	background:#229a23;
}
.left-btn text {
	font-size:32rpx;
	color:white;
	margin-left:20rpx;
}
.right-btn {
	color:black;
	padding:13px;
}
.right-btn_active {
	background:#dedede;
}
.right-btn text {
	font-size:32rpx;
	color:black;
	margin-left:20rpx;
}
.weui-cell:before {
	border-top:1rpx solid #B2B2B2;
	left: 0;
}


</style>

<script>

import wepy from 'wepy';

import 'wepy-async-function';
import Common from './common.js';

import MTA from './static/mta_analysis.js';
 

export default class extends wepy.app {

    config = {
            "pages":[
            
            "pages/index",
     		"pages/editNote",
            "pages/noteDetail",
            "pages/search",
            "pages/noteList",
            "pages/shareCode",

        ],
        "window":{
            "backgroundTextStyle": "light",
            "navigationBarBackgroundColor": "#353535",
            "navigationBarTitleText": "WeChat",
            "navigationBarTextStyle": "white",
            "enablePullDownRefresh":true
        }
    };

    globalData = {
        userInfo: null,
        token:wx.getStorageSync('token'),
        userId:wx.getStorageSync('userId')
    };

    onLaunch() {
    		MTA.App.init({
		   	"appID":"500432446",
		   	"eventID":"500432450",
		   	"statPullDownFresh":true,
		   	"statShareApp":true,
		   	"statReachBottom":true
		});

    };




	loginApp(cb){
		let that=this;
		console.log("开始登录");
        wx.login({
        	  fail:function(res){
        	  	console.log("fail",res);
        	  },
        	  complete:function(res){
        	  	console.log("complete",res);
        	  },
	      success: function(res) {
	      	console.log("res成功",res);
	        if (res.code) {
	        	let code=res.code;
	        	//获取用户信息
	        	wx.getUserInfo({
			  success: function(res) {
				  let params={
				  	userInfo:res.userInfo,
				  	rawData:res.rawData,
				  	signature:res.signature,
				  	iv:res.iv,
				  	encryptedData:res.encryptedData,
					code:code
				  };
//				  console.log("params",params);
				  //获取登录token
		          wx.request({
		            url: Common.HostUrl+'/users/login',
		            data: params,
		            method:"post",
		            header: {
					      'content-type': 'application/json'
					},
		            success:function(results){
//		            		console.log("results",results.data.data.token);
		            		if(results.data.code==0){
		            			that.globalData.token=results.data.data.token;
		            			that.globalData.userId=results.data.data.userId;
		            			
		            			wx.setStorage({
							  key:"token",
							  data:results.data.data.token
							})
		            			wx.setStorage({
							  key:"userId",
							  data:results.data.data.userId
							})
							cb(that.globalData)
		            		}else{
		            			
		            			wx.showToast({
					            title:results.data.message ,
					            duration: 3000
					        });
		            		}
		            		
		            }
		          })
			   
			  }
			})


	        } else {
	          console.log('获取用户登录态失败！' + res.errMsg)
	        }
	      }
      })
	}
	
	
	
    getUserInfo(cb) {
        var self = this;
        if (this.globalData.userInfo) {
            return this.globalData.userInfo;
        }
        wepy.getUserInfo({
            success (res) {
                self.globalData.userInfo = res.userInfo;
                cb && cb(res.userInfo);
            }
        });
    }
}
</script>