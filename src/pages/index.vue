<style lang="less">
    .operate_block {
	width:25%;
	display:inline-flex;
	text-align:center;
	margin:0 4%;
}
.operate_block image {
	width:60%;
	margin:0 auto;
}
.operate_block text {
	width:100%;
	margin:5%;
	font-size:32rpx;
}
.weui-navbar__slider {
	width:33%;
}

.operate_block  .iconfont {
	width:100%;
	font-size:120rpx;
	color:#09bb07;
}
.weui-tab {
	min-height:90%;
	height:100%;
}
.weui-tab__content {
	min-height:90%;
}
.weui-footer {
	height:10%;
	margin-top:40rpx;
}
.page__bd {
	margin:0 40rpx;
	padding-top:274rpx;
	padding-bottom:125rpx;

}
.page__hd {
	position:fixed;
	z-index:1000;
	width:100%;
	background:#f8f8f8;
}
.weui-form-preview__btn text {
	font-size:26rpx;
	color:black;
}
.weui-navbar {
	position:fixed;
	border-bottom:0;
	top:225rpx;
	right: 0;
	padding: 20rpx 0;

}
.weui-tab__panel{
	padding-top:77rpx;
}


.weui-navbar__item {
	border:2rpx solid #b2b2b2;
	border-radius: 4px;
	padding:5rpx;
	margin:25rpx 40rpx;

}

.weui-navbar__item_on {
	background:#09BB07;
	color:white;
}
.weui-cells_after-title {
	background:#f8f8f8;
}
contact-button{
	margin-top: 5rpx;
}
.icon-collection-on-copy,.icon-fenxiang{
	font-size: 47rpx;
	line-height: 47rpx;
	color: #2c2c2c;
}
.weui-cell {
	padding: 10px 0;
}
.btnText{
	margin-top: -40rpx;
}
.divLine {

	margin:15rpx 40rpx;


}

</style>
<template>
    <view class="page">

    		<view class="page__hd">
    			  
						
		   <view class="weui-flex">
		   	   <view bindtap="createNote" class="weui-flex__item operate_block">
		   	   		<i class="icon iconfont icon-jiahao2fill"></i>
		   	   		<!--<image  mode="widthFix" src="http://7xuuaz.com1.z0.glb.clouddn.com/create.png" />-->
			   </view>
			    <view bindtap="searchNote" class="weui-flex__item operate_block">
			    		<!--<image mode="widthFix" src="../images/search.png"/>-->
			    		<i class="icon iconfont icon-sousuo-copy"></i>

			   </view>
			    <view bindtap="scanCode" class="weui-flex__item operate_block">
			    		<!--<image mode="widthFix" src="../images/scan.png"/>-->
			    		<i class="icon iconfont icon-saoma"></i>
	
			   </view>
		  </view>
		  <view class="weui-flex btnText">
		   	   <view class="weui-flex__item operate_block">		   	   		
		   	   		<text>新建</text>
		   	   		  	
			   </view>
			    <view class="weui-flex__item operate_block">
			    		
			    		<text >搜索</text>
			   </view>
			    <view class="weui-flex__item operate_block">
			    		
			    		<text >扫码</text>
			   </view>
		  </view>
		   <view class="divLine"></view>
		  </view>
		 
		  <view class="page__bd">
		        <view class="weui-tab">
		            <view class="weui-navbar">
		                <block wx:for-items="{{tabs}}" wx:key="{{index}}">
		                    <view id="{{index}}" class="weui-navbar__item {{activeIndex == index ? 'weui-navbar__item_on' : ''}}"  bindtap="tabClick">
		                        <view class="weui-navbar__title ">{{item}}</view>
		                    </view>
		                </block>
		               <!-- <view class="weui-navbar__slider" style="transform: translateX({{sliderOffset}}px); -webkit-transform: translateX({{sliderOffset}}px);"></view>-->
		            </view>
		            <view class="weui-tab__panel">
		                <view class="weui-tab__content" hidden="{{activeIndex != 0}}">
		                		<view wx:if="{{refresh}}" class="weui-loadmore">
					            <view class="weui-loading"></view>
					            <view class="weui-loadmore__tips">正在刷新</view>
					        </view>
		                		<view wx:if="{{friendList.length<1}}" class="weui-loadmore weui-loadmore_line">
					            <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
					        </view>
		                		<view class=" weui-cells_after-title">
					            <view wx:for="{{friendList}}" wx:key="_id" class="weui-cell" bindtap="openNoteList({{item._id}},{{item.nickName}})">
					                <view class="weui-cell__hd">
					                    <image src="{{!!item.avatar?item.avatar:icon}}" style="margin-right: 5px;vertical-align: middle;width:45px; height: 45px;"></image>
					                </view>
					                <view class="weui-cell__bd">{{item.nickName}}</view>
					      
					            </view>
					        </view>
					         <view wx:if="{{loadMore}}" class="weui-loadmore">
					            <view class="weui-loading"></view>
					            <view class="weui-loadmore__tips">正在加载</view>
					        </view>
		                </view>
		                <view class="weui-tab__content" hidden="{{activeIndex != 1}}">
		                		<view wx:if="{{refresh}}" class="weui-loadmore">
					            <view class="weui-loading"></view>
					            <view class="weui-loadmore__tips">正在刷新</view>
					        </view>
		               		<view wx:if="{{noteList.length<1}}" class="weui-loadmore weui-loadmore_line">
					            <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
					        </view>
		                		<view class=" weui-cells_after-title">
					            <view wx:for="{{noteList}}" wx:key="_id" class="weui-cell" bindtap="openNote({{item._id}})">
					                <view class="weui-cell__hd">
					                    <image src="{{item.images.length>0?item.images[0]:icon}}" style="margin-right: 5px;vertical-align: middle;width:45px; height: 45px;"></image>
					                </view>
					                <view class="weui-cell__bd">{{item.title}}</view>
					                <view class="weui-cell__ft">
					                	<view wx:if="{{item.productCode.price!=null}}" class="weui-cell__ft">{{item.productCode.price==0?"免费":item.productCode.price+item.productCode.currency}}</view>
					         
					                <i wx:if="{{item.state==20}}" class="icon iconfont icon-display-copy"></i>
					                <i wx:if="{{item.state==10}}" class="icon iconfont icon-buxianshi"></i>
					                </view>
					            </view>
					        </view>
					        	<view wx:if="{{loadMore}}" class="weui-loadmore">
					            <view class="weui-loading"></view>
					            <view class="weui-loadmore__tips">正在加载</view>
					        </view>
		                </view>
		                <view class="weui-tab__content" hidden="{{activeIndex != 2}}">
		                		<view wx:if="{{refresh}}" class="weui-loadmore">
					            <view class="weui-loading"></view>
					            <view class="weui-loadmore__tips">正在刷新</view>
					        </view>
		                		<view wx:if="{{historyList.length<1}}" class="weui-loadmore weui-loadmore_line">
					            <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
					        </view>
		                		<view class=" weui-cells_after-title">
					            <view wx:for="{{historyList}}" wx:key="_id" class="weui-cell" bindtap="openNote({{item._id}})">
					                <view class="weui-cell__hd">
					                    <image src="{{item.images.length>0?item.images[0]:icon}}" style="margin-right: 5px;vertical-align: middle;width:45px; height: 45px;"></image>
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
		                  <!--<view class="weui-footer">
		       		 	
				            <view class="weui-footer__links">
				                <navigator  url="" class="weui-footer__link">逛人备忘</navigator>
				            </view>
				        </view> -->
		            </view>
		        </view>
		 		
		     
		  </view>
		   <view class="page__ft">
	       <view class="weui-flex">
	       		<view class="weui-flex__item">		   	   		
		   	   		 <navigator   url='shareCode'  class="weui-form-preview__btn" hover-class="weui-form-preview__btn_active"><i class="icon iconfont icon-fenxiang"></i><text>分享</text></navigator>
			   </view>
		   	   <view class="weui-flex__item">		   	   		
		   	   		 <navigator  url='noteList?userId=&noteListType=collectNote'  class="weui-form-preview__btn" hover-class="weui-form-preview__btn_active"><i class="icon iconfont icon-collection-on-copy"></i><text>我的收藏</text></navigator>
			   </view>
			   <view class="weui-flex__item">
			   		<navigator url=''  class="weui-form-preview__btn" hover-class="weui-form-preview__btn_active">
			   			<contact-button 
						  
						  size="20"
						  session-from="shoppingnotes"
						>
						
    			    		</contact-button>
    			    		<text>客服</text>
			   		</navigator>
			    	
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
    import MTA from '../static/mta_analysis.js';

    export default class Index extends wepy.page {

        config = {
            "navigationBarTitleText": "逛人备忘"
        };
        components = {

        };

        mixins = [testMixin];

        data = {
            tabs: ["记友列表", "我的笔记", "浏览记录"],
		    activeIndex: 1,
		    sliderOffset: 0,
		    sliderLeft: 0,
		    icon: '../images/placeholder.jpg',
		    noteList:[],
		    userId:'',
			historyList:[],
			friendList:[],
			loadMore:false,
			refresh:false,
		    f_skip:0,
		    n_skip:0,
		    h_skip:0,
		    f_isMore:true,
		    n_isMore:true,
		    h_isMore:true,
		    
        };

        computed = {
	
        };
        methods = {
        		tabClick (e) {
        			this.sliderOffset=e.currentTarget.offsetLeft;
        			this.activeIndex=e.currentTarget.id;
		    },
        		createNote(){
        			  wx.navigateTo({
				      url: '../pages/editNote?editType=createNote'
				    })
        		},
        		searchNote(){
        			  wx.navigateTo({
				      url: '../pages/search'
				    })
        		},
        		openNote(_id){
        			  wx.navigateTo({
				      url: '../pages/noteDetail?noteId='+_id
				    })
        		},
        		openNoteList(_id,authorName){
        			  wx.navigateTo({
				      url: '../pages/noteList?authorName='+authorName+'&userId='+_id+'&noteListType=friendNote'
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
//								      console.log('用户点击确定')
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

		getSomeList(skip,listType){
			var that=this;
			let {userId,token}=this.$parent.globalData;
			let requestUrl='';
			switch (listType){
				case 'friendList':
					
					requestUrl='/relations/list';
					break;
				case 'noteList':
					
					requestUrl='/notes/'+userId+'/list';
					break;
				case 'historyList':
			
					requestUrl='/history/list';
					break;
				default:
					break;
			}

				wx.request({
		            url: Common.HostUrl+requestUrl+'?skip='+skip,
		            method:"get",
		            header: {
					      'content-type': 'application/json',
					      'Authorization':'Bearer '+token 
					},
		            success:function(results){
		            		if(results.data.code!=0){
							wx.showToast({
					            title:results.data.message ,
					            icon: 'failed',
					            duration: 3000
					        });
		            		}else{
		            			
		            			//历史记录数据
		            			wx.hideToast();
		            			wx.stopPullDownRefresh();
		            			setTimeout(function(){
		            				that.loadMore=false;
		            				that.refresh=false;
		            				that.$apply()
		            			},1000)
		            			
		            			if(skip==0){
			            			//刷新首页数据
			            			that[listType]=results.data.data;
			            			
		            			}else{
		            				//加载更多
		            				that[listType]=that[listType].concat(results.data.data);
		            				
		            			}
		            			switch (listType){
										case 'friendList':
											that.f_skip++;
											that.f_isMore=results.data.isMore;
											break;
										case 'noteList':
											that.n_skip++;
											that.n_isMore=results.data.isMore;
											break;
										case 'historyList':
											that.h_skip++;
											that.h_isMore=results.data.isMore;
											break;
										default:
											break;
									}
		            	
		            			that.$apply()
		            		}
		            		
		            		
		            }
		          })	
		};
		 onShow() {
		   //这里可以处理页面显示时需要的逻辑，比如自动刷新
		   let self=this;
		   wx.showToast({
			  title: '加载中',
			  icon: 'loading',
			  duration: 10000
			})
		  let {userId,token}=this.$parent.globalData;
	       if(!token){
	       		console.log("首次登录"); 
	       	this.$parent.loginApp(function(globalData){
	        		
	        		 self.getSomeList(0,'noteList');
	        		 self.getSomeList(0,'historyList');
	        		 self.getSomeList(0,'friendList');
	        })
	       }else{
	       		console.log("调过登录"); 
	       		this.refresh=true;
	       		self.getSomeList(0,'noteList');
	        		self.getSomeList(0,'historyList');
	        		self.getSomeList(0,'friendList');
	       }
	        
		  };
        onLoad() {
			MTA.Page.init();
       	 	let userInfo, self = this,sliderWidth = 96;
        		   wx.getSystemInfo({
	            success: function(res) {
	            		
	            		self.sliderLeft=(res.windowWidth / self.data.tabs.length - sliderWidth) / 2;
	            		self.sliderOffset=res.windowWidth / self.data.tabs.length * self.data.activeIndex;
	            }
	        }); 
//	        this.userId=wx.getStorageSync('userId');
//	        this.token=wx.getStorageSync('token');
   
	       
	        
	       
        };
        onReachBottom(){
        		let that=this;
        		if(this.activeIndex==2&&this.h_isMore){
        			this.loadMore=true;
        			this.getSomeList((this.h_skip)*20,'historyList');
        		}else if(this.activeIndex==0&&this.f_isMore){
        			this.loadMore=true;
        			this.getSomeList((this.f_skip)*20,'friendList');
        		}else if(this.activeIndex==1&&this.n_isMore){
        			this.loadMore=true;
        			this.getSomeList((this.n_skip)*20,'noteList');
        		}
        		
        };
        
        onPullDownRefresh(){
        		if(this.activeIndex==2){
        			this.refresh=true;
        			this.h_skip=0;
        			this.getSomeList(0,'historyList');
        		}else if(this.activeIndex==0){
        			this.refresh=true;
        			this.f_skip=0;
        			this.getSomeList(0,'friendList');
        		}else if(this.activeIndex==1){
        			this.refresh=true;
        			this.n_skip=0;
        			this.getSomeList(0,'noteList');
        		}
        		
		   
		  };
        
        
    }
</script>