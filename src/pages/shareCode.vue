<style lang="less">


.codeImg-wrapper {
	height:90%;
}
.page__bd {
	padding-bottom:0;
	background:#353535;
}
.weui-footer__link {
	color:white;
}
.code-img {
	width:70%;
	margin:0 auto;
	position:relative;
	top:300rpx;
	display:flex;
}
.code-text {
	color:white;
	position:relative;
	display:inline-block;
	top:340rpx;
	font-size:24rpx;
	text-align:center;
	width:30%;
	display:flex;
	margin:0 auto;
}
</style>
<template>
    <view class="page">

    		<view class="page__hd"></view>
		  
		  <view class="page__bd">
		  	<view class="codeImg-wrapper">
		  			<image bindtap="previewImage" data-imgurl="{{codeImg}}" mode='aspectFit' src="{{codeImg}}" class="code-img" />
		  			<text class="code-text">{{textContent}}</text>
		  	</view>
		  
	
		       <view class="weui-footer">
		            <view class="weui-footer__links">
		                <navigator bindtap="backIndex" url="" class="weui-footer__link">逛人备忘</navigator>
		            </view>
		       </view> 
		  </view>

    </view>
</template>

<script>
    import wepy from 'wepy';
    import Common from '../common.js';

    export default class ShareCode extends wepy.page {

        config = {
            "navigationBarTitleText": "分享码"
        };
        components = {

        };

        

        data = {
		    codeImg:[Common.HostUrl+'/qrcode.jpeg'],
		    testImg:["http://img6.cache.netease.com/photo/0001/2017-03-25/CGCH0NM000AO0001.jpg"],
		    textContent:'点击图片进入保存界面，进行图片保存'
        };

        computed = {
	
        };
        methods = {
        		  previewImage(e){
		        wx.previewImage({
		            current: e.currentTarget.dataset.imgurl, // 当前显示图片的http链接
		            urls: [this.codeImg] // 需要预览的图片http链接列表
		        })
		        },
		      backIndex(){
			 	wx.navigateBack({
				  delta: 10
				})
			 },

		};

		getCodeImg(){
			var that=this;
			let {token}=this.$parent.globalData;
				wx.request({
		            url: Common.HostUrl+'/users/code',
		            method:"get",
		            header: {
					      'content-type': 'application/json',
					      'Authorization':'Bearer '+token 
					},
		            success:function(results){
		            		wx.hideToast();
		            		if(results.data.code==0){
		            				that.codeImg=results.data.data;
								
		            		}else if(results.data.code==100011){
//							that.codeImg=results.data.data;
		            			that.textContent='请联系客服获取专属笔记列表二维码';
		            		}else{
		            				wx.showToast({
									  title: results.data.message,
									  duration: 3000
									})
		            		}
		            		that.$apply()
		            		
		            }
		          })	
		};
		onPullDownRefresh(){
		    wx.stopPullDownRefresh()
		  };
        onLoad(options) {
        
        		wx.showToast({
			  title: '加载中',
			  icon: 'loading',
			  duration: 10000
			})
       	 	this.getCodeImg();	       
        };        
    }
</script>