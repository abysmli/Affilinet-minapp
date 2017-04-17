<style lang="less">

.weui-cells_after-title {
	font-size:28rpx;
}
.note-list {
	min-height:90%;
}
.page__bd {
	padding-bottom:0;
	margin:0 40rpx;
}
.weui-footer {
	height:10%;
	margin-top:40rpx;
}
.weui-cells_after-title {
	background:#f8f8f8;
}
.weui-cell {
	padding: 10px 0;
}
</style>
<template>
    <view class="page">

    		<view class="page__hd">
    			  

	
		  </view>
		  <view class="page__bd">
		  		<view class="note-list">
		  		 <view wx:if="{{refresh}}" class="weui-loadmore">
		            <view class="weui-loading"></view>
		            <view class="weui-loadmore__tips">正在刷新</view>
		        </view>
				<view wx:if="{{noteList.length<1}}" class="weui-loadmore weui-loadmore_line">
		            <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
		        </view>
            		<view class="weui-cells weui-cells_after-title">
		            <view wx:for="{{noteList}}" wx:key="_id" class="weui-cell" bindtap="openNote({{item._id}})">
		                <view class="weui-cell__hd">
		                    <image src="{{item.images.length>0?item.images[0]:icon}}" style="margin-right: 5px;vertical-align: middle;width:60px; height: 60px;"></image>
		                </view>
		                <view class="weui-cell__bd">{{item.title}}</view>
		                <view wx:if="{{item.productCode.price!=null}}" class="weui-cell__ft">{{item.productCode.price==0?"免费":item.productCode.price+item.productCode.currency}}</view>
		            </view>
		        </view>
		        	<view wx:if="{{loadMore}}" class="weui-loadmore">
		            <view class="weui-loading"></view>
		            <view class="weui-loadmore__tips">正在加载</view>
		        </view>	
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
    import testMixin from '../mixins/test';
    import base64 from "../images/base64";
    import Common from '../common.js';

    export default class NoteList extends wepy.page {

        config = {
            "navigationBarTitleText": "逛人备忘"
        };
        components = {

        };

        mixins = [testMixin];

        data = {
		    noteList:[],
		    userId:'',
			loadMore:false,
			refresh:false,
			skip:0,
			isMore:true,
			noteListType:'friendNote',
			shareNote:'false',
			icon:'../images/placeholder.jpg'

        };

        computed = {
	
        };
        methods = {
        		
        		openNote(_id){
        			  wx.navigateTo({
				      url: '../pages/noteDetail?noteId='+_id
				    })
        		},
        		backIndex(){
			 	if(this.shareNote=='true'){
			 		 wx.navigateTo({
				      url: '../pages/index'
				    })
			 	}else{
			 		wx.navigateBack({
					  delta: 10
					})
			 	}
			 },
		};

		getNoteList(skip){
			var that=this;
			let {token}=this.$parent.globalData;
			let requestUrl='/notes/'+this.userId+'/list?skip='+skip;
			if(this.noteListType=='collectNote'){
				requestUrl='/favorites/list?skip='+skip;
			}
			
				wx.request({
		            url: Common.HostUrl+requestUrl,
		            method:"get",
		            header: {
					      'content-type': 'application/json',
					      'Authorization':'Bearer '+token 
					},
		            success:function(results){
		            	wx.stopPullDownRefresh();
		            		if(results.data.code!=0){
							wx.showToast({
					            title:results.data.message ,
					            icon: 'failed',
					            duration: 3000
					        });
		            		}else{
		            			that.loadMore=false;
		            			that.refresh=false;
		            			
		            			wx.hideToast();
							that.skip++;

							
							if(skip==0){
							
								that.noteList=results.data.data;
							}else{
								that.noteList=that.noteList.concat(results.data.data);
							}
		            		
		            			that.isMore=results.data.isMore;
		            			that.$apply()
		            		}
		            		
		            		
		            }
		          })	
		};
        onLoad(options) {
        	//好友的userId
        		this.userId=options.userId;
        		this.noteListType=options.noteListType;
        		this.shareNote=options.shareNote;
        		let barTitle=options.authorName+'的笔记';
        		if(options.noteListType=='collectNote'){
        			barTitle="我的收藏"
        		}
			wx.setNavigationBarTitle({
			  title: barTitle
			})
			
        		let self=this;
        		wx.showToast({
			  title: '加载中',
			  icon: 'loading',
			  duration: 10000
			})
        		let {token}=this.$parent.globalData;
        		if(!token){
        			this.$parent.loginApp(function(globalData){
        				self.getNoteList(0);	     
        			})
        		}else{
        			self.getNoteList(0);	   
        		}
        			
        		
       	 	  
        };
        onReachBottom(){
        		if(this.isMore){
        			this.loadMore=true;
        			this.getNoteList((this.skip)*20);
        		}
        			          		
        };
         onPullDownRefresh(){
         	this.refresh=true;
         	this.getNoteList(0);	 		   
		  };
        
    }
</script>