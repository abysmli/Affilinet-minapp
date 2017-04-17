<style lang="less">
	.weui-cells_after-title {
	font-size:28rpx;
}
.iconfont {
	font-size:50rpx;
}
.search-panel {
	min-height:90%;
}
.weui-footer {
	height:10%;
	margin-top:40rpx;
}
.weui-cell,.weui-cells_after-title {
	background:#f8f8f8;
}
.weui-cell {
	padding: 10px 0;
}
.searchbar-result{
	margin: 0 40rpx;
}
</style>
<template>
    <view class="page">
    <view class="page__bd">
    		<view class='search-panel'>
        <view class="weui-search-bar">
            <view class="weui-search-bar__form">
                <view class="weui-search-bar__box">
                    <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                    <input type="text" class="weui-search-bar__input" placeholder="搜索" value="{{inputVal}}" focus="{{inputShowed}}" bindinput="inputTyping" />
                    <view class="weui-icon-clear" wx:if="{{inputVal.length > 0}}" bindtap="clearInput">
                        <icon type="clear" size="14"></icon>
                    </view>
                </view>
                <label class="weui-search-bar__label" hidden="{{inputShowed}}" bindtap="showInput">
                    <icon class="weui-icon-search" type="search" size="14"></icon>
                    <view class="weui-search-bar__text">搜索</view>
                </label>
            </view>
            
            <view class="weui-search-bar__cancel-btn"  bindtap="searchNoteList"><i class="icon iconfont icon-yz-search"></i></view>
            <view class="weui-search-bar__cancel-btn"  bindtap="scanCode"><i class="icon iconfont icon-qr"></i></view>
            	
            <!--<view class="weui-search-bar__cancel-btn" hidden="{{!inputShowed}}" bindtap="hideInput">取消</view>-->
        </view>
        <view class="weui-cells searchbar-result" wx:if="{{searchDone}}">
            <navigator url="" class="weui-cell" hover-class="weui-cell_active">
                <view class="weui-cell__bd">
                    <view wx:if="{{noteList.length<1}}" class="weui-loadmore weui-loadmore_line">
		            		<view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
				    </view>
	            		<view class="weui-cells weui-cells_after-title">
			            <view wx:for="{{noteList}}" wx:key="_id" class="weui-cell" bindtap="openNote({{item}})">
			                <view class="weui-cell__hd">
			                    <image src="{{item.images.length>0?item.images[0]:icon}}" style="margin-right: 5px;vertical-align: middle;width:60px; height: 60px;"></image>
			                </view>
			                <view class="weui-cell__bd">{{item.title}}</view>
			                <!--<view class="weui-cell__ft">{{!!item.productCode.price?item.productCode.price+item.productCode.currency:"免费"}}</view>-->
			            </view>
			        </view>
			        	<view wx:if="{{loadMore}}" class="weui-loadmore">
			            <view class="weui-loading"></view>
			            <view class="weui-loadmore__tips">正在加载</view>
			        </view>	
                </view>
            </navigator>
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

	
    export default class Search extends wepy.page {

        config = {
            "navigationBarTitleText": "搜索产品库"
        };
        components = {
           
        };

        mixins = [testMixin];

        data = {
            inputShowed: false,
        		inputVal: "",
        		noteList:[],
        		searchDone:false,
        		icon:'../images/placeholder.jpg'
        };

        computed = {

        };
        methods = {
			showInput() {
				this.inputShowed=true;
		    },
		    backIndex(){
			 	wx.navigateBack({
				  delta: 10
				})
			 },
		    hideInput() {
			    	this.inputVal="";
			    	this.inputShowed=true;
			    	this.searchDone=false;
		    },
		    clearInput() {
		    		this.inputVal="";
		    		this.searchDone=false;

		    },
		    inputTyping (e) {
		    		this.inputVal=e.detail.value;
		    },
		    	openNote(item){
		    		console.log("item",item);
        			  wx.navigateTo({
				      url: '../pages/noteDetail?type=third&noteData='+JSON.stringify(item)
				    })
        		},
        		scanCode(){
        			var that=this;
        			let {token}=this.$parent.globalData;
        		
        			wx.scanCode({
				  success: (res) => {
				  	wx.showToast({
			            title:"请稍等...",
			            icon: 'loading',
			            duration: 10000
			        });
				    let eanCode=res.result;
				    	wx.request({
			            url: Common.HostUrl+'/notes/scan?ean='+eanCode,
			            method:"get",
			            header: {
						      'content-type': 'application/json',
						      'Authorization':'Bearer '+token 
						},
						fail:function(){
								wx.showToast({
						            title:"当前网络不佳，请稍后重试",
						            duration: 3000
						        });
						},
			            success:function(results){
			            		wx.hideToast();
			            		if(results.data.code!=0){
								wx.showToast({
						            title:results.data.message ,
						            duration: 3000
						        });
			            		}else if(results.data.data.length==0){
			            			wx.showModal({
								  title: '提示',
								  content: '是否新建笔记',
								  success: function(res) {
								    if (res.confirm) {
									wx.navigateTo({
								      url: '../pages/editNote?editType=createNote&eanCode='+eanCode
								    })
								    }
								  }
								})
			 					 
			            			
			            		}else{
			            			wx.navigateTo({
							      url: '../pages/noteDetail?type=third&noteData='+JSON.stringify(results.data.data)
							    })
			            		}
			            		
			            		
			            }
			          })	

				    
				  }
				})
        		}
		};
			onPullDownRefresh(){
		    wx.stopPullDownRefresh()
		  };
		searchNoteList(){
					wx.showToast({
					  title: '加载中',
					  icon: 'loading',
					  duration: 10000
					});
					var that=this;
					
					let {token}=this.$parent.globalData;
//					that.noteList=Common.searchData.data;
//					that.$apply();
//					wx.hideToast();
					wx.request({
							//测试参数IPHONE7
				            url: Common.HostUrl+'/notes/search?query='+this.inputVal,
				            method:"get",
				            header: {
							      'content-type': 'application/json',
							      'Authorization':'Bearer '+token 
							},
				            success:function(results){
				            		wx.hideToast();
				            		if(results.data.code!=0){
									wx.showToast({
							            title:results.data.message ,
							            duration: 3000
							        });
				            		}
				            		that.searchDone=true;
				            		that.noteList=results.data.data;
								that.$apply();
				            }
				          })	
			};
        onLoad() {
        	
       	 	
        }
    }
</script>