<style lang="less">

	.slide-image {
	width:100%;
	display:flex;
}
.userinfo {
	display:flex;
	/*  flex-direction:column;
	*/
        align-items:left;
   position: relative;
}
.userinfo-avatar {
	width:60rpx;
	height:60rpx;
	border-radius:50%;
	margin:10rpx;
}
.userinfo-nickname {
	color:#09bb07;
	line-height:80rpx;
	font-size:28rpx;
}
.note-tags {
	color:white;
	background:#09bb07;
	height:30rpx;
	padding:4rpx;
	margin:10rpx;
	border:2rpx solid #09bb07;
	border-radius:10rpx;
	line-height:30rpx;
	font-size:26rpx;
}
.tag-hd {
	height:60rpx;
	line-height:60rpx;
}
.specis {
	display:flex;
	flex-direction:column;
	align-items:left;
}
.specis-item {
	width:100%;
}
.specis-value {
	margin-left:60rpx;
}
.price-hd {
	margin-right:20rpx;
}
.weui-article__h1 {
	margin-bottom:0;
}
.comment-panel {
	width:90%;
	margin:40rpx auto;
	padding:4rpx;
	font-size:28rpx;
	background: #f8f8f8;
}
.weui-textarea {
	border:2rpx solid black;
	width: 99%;
}
.weui-article__p {
	text-align:left;
	text-indent:-8rpx;

}
.update-time {
	line-height:80rpx;
	font-size:28rpx;
	margin-left:30rpx;
	color:#888888;
}
.views {
	line-height:80rpx;
	font-size:28rpx;
	position:absolute;
	right:90rpx;
	color:#888888;
}
.icon-display-copy {
	font-size:28rpx;
	line-height:80rpx;
	position:absolute;
	right:17rpx;
	color:#888888;
}
.weui-navbar__slider {
	width:50%;
}
.icon .iconfont {
	font-size:36rpx;
}
.author {
	display:flex;
}
.divLine {
	width:100%;
	margin: 0;
}
.weui-form-preview__btn {
	display:block;
}
.weui-navbar {
	position:fixed;
	border-bottom:0;
}
.price-val {
	margin-left:10rpx;
}
.price-wraper {
	display:flex;
}
.weui-tab {
	min-height:90%;
	height:90%;
}
.weui-media-box__desc {
	font-size:28rpx;
	color:black;
}
.weui-tab__content {
	min-height:90%;
}
.weui-textarea{
	width: 99%;
}
.weui-footer {
	height:10%;
	margin-top:40rpx;
}
swiper{
	height: 480rpx;
}
</style>
<template>
    <view class="page">
		  <view class="page__bd">
		        <view class="weui-tab">
		            <view class="weui-navbar">
		                <block wx:for-items="{{tabs}}" wx:key="{{index}}">
		                    <view id="{{index}}" class="weui-navbar__item {{activeIndex == index ? 'weui-bar__item_on' : ''}}" bindtap="tabClick">
		                        <view class="weui-navbar__title">{{item}}</view>
		                    </view>
		                </block>
		                <view wx:if="{{type!='third'}}" class="weui-navbar__slider" style="transform: translateX({{sliderOffset}}px); -webkit-transform: translateX({{sliderOffset}}px);"></view>
		            </view>
		            <view class="weui-tab__panel">
		                <view class="weui-tab__content" hidden="{{activeIndex != 0}}">
		                		<swiper wx:if="{{noteDetail.images[0]!=null&&noteDetail.images.length>0}}" indicator-dots="{{indicatorDots}}"
							  autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
							  <block wx:for="{{noteDetail.images}}" wx:key="index">
							    <swiper-item>
							      <image bindtap="previewImage" data-imgurl="{{item}}" src="{{item}}" mode='aspectFill'   class="slide-image" />
							    </swiper-item>
							  </block>
							</swiper>

							

		                		<view class="weui-article">
					            <view class="weui-article__h1">{{noteDetail.title}}</view>
					            <view class="divLine"></view>
					             <view class="userinfo"  wx:if="{{type!='third'}}">
					             	<view  class="author" bindtap="openNoteList({{noteDetail.author._id}},{{noteDetail.author.nickName}})">
					             		<image class="userinfo-avatar" src="{{noteDetail.author.avatar }}" background-size="cover"/>
						           		 <text class="userinfo-nickname">{{ noteDetail.author.nickName }}</text>
					             	</view>
						            
						            <text class="update-time">{{ noteDetail.modified}}</text>
						            <text class="views">{{ noteDetail.views}}</text>
						            <i class="icon iconfont icon-display-copy"></i>
						        </view>
						        <view class="userinfo" wx:if="{{type!='third'}}">
						        		<text class="note-tags" wx:key="{{item}}" wx:if="{{item!=''}}" wx:for="{{noteDetail.tags}}">{{item}}</text>
						        </view>
					            <view class="weui-article__section">
					                <view class="weui-article__section">
					                   
					                    <view class="weui-article__p">
					                        {{noteDetail.content}}
					                    </view>
					                </view>
					               
					            </view>
					            <view class="weui-article__section" wx:if="{{type!='third'&&!!noteDetail.packageDetail&&!!noteDetail.packageDetail.length}}">
					            		<view class="weui-article__h3">包装详情</view>
					            		<view class='specis'>
					            			<view class='specis-item'> 
					            				<text >长度:</text>
					            			 	<text class="specis-value">{{noteDetail.packageDetail.length}}cm</text>
					            			</view>
					            			<view class='specis-item'> 
					            				<text >宽度:</text>
					            				 <text class="specis-value">{{noteDetail.packageDetail.width}}cm</text>
					            			</view>
					            			<view class='specis-item'>
					            				 <text >高度:</text>
					            			 <text class="specis-value">{{noteDetail.packageDetail.height}}cm</text>
					            				
					            			</view>
					            			<view class='specis-item'>
					            				<text >重量:</text>
					            			 	<text class="specis-value">{{noteDetail.packageDetail.weight}}kg</text>
					            			</view>
					            			 
					            			 
					            		</view>
					              
					               
					            </view>
					             <button wx:if="{{noteDetail.productCode.price!=null&&type!='third'}}" class="weui-btn" type="primary">
					             	<text class="price-hd">参考价格</text>
					            		<text wx:if="{{noteDetail.productCode.price==0}}" >免费</text>
					            		
					            			<text wx:if="{{noteDetail.productCode.price!=0}}" class="price-val">{{noteDetail.productCode.price}}</text>
					            			<text wx:if="{{noteDetail.productCode.price!=0}}" class="price-val">{{noteDetail.productCode.currency}}</text>
					         
					            		
					             </button>
					             <button wx:if="{{!!noteDetail.location&&noteDetail.location[0]!=null}}" bindtap="openLocation" class="weui-btn" type="default">查看位置</button>
					        </view>
		                </view>
		                <view   class="weui-tab__content" hidden="{{activeIndex != 1}}">
		                		 <view  class="weui-panel">
					            <view class="weui-panel__bd">
					               <view wx:for="{{commentList}}" wx:key="{{item._id}}" class="weui-media-box weui-media-box_text" >
				                    <view class="weui-media-box__title weui-media-box__title_in-text">
				                    		 <view class="userinfo" bindtap="openNoteList({{item.author._id}},{{item.author.nickName}})">
								            <image class="userinfo-avatar" src="{{item.author.avatar }}" background-size="cover"/>
								            <text class="userinfo-nickname">{{ item.author.nickName }}</text>
								        </view>
				                    </view>
				                    <view class="weui-media-box__desc">{{item.content}}</view>
				                    <view class="weui-media-box__info">
				                        <view class="weui-media-box__info__meta">{{item.modified}}</view>
				                    </view>
				                </view>
					            </view>
					        </view>
					         <view wx:if="{{activeIndex == 1}}" class="weui-panel comment-panel"> 
					         	<textarea class="weui-textarea" bindinput="bindInput" id="comment" value="{{comment}}" placeholder="输入评论" style="height: 5.3em" />
		                    		<view class="weui-textarea-counter">{{comment.length}}/140</view>
					         	<button class="weui-btn" bindtap="sendComment" type="primary">发表评论</button>
					         </view>
					        
		                </view>
		             <view class="weui-footer">
			            <view class="weui-footer__links">
			                <navigator bindtap="backIndex" url="" class="weui-footer__link">逛人备忘</navigator>
			            </view>
			           
			        </view> 
		            </view>
		       		   
		        </view>
		 		
		   
		  </view>
		  <view class="page__ft">
	       <view wx:if="{{noteType=='self'}}" class="weui-flex">
		   	   <view  class="weui-flex__item">		   	   		
		   	   		 <navigator   url="editNote?editType=updateNote&noteId={{noteId}}"  class="weui-form-preview__btn left-btn" hover-class="left-btn_active"><i class="icon iconfont icon-bianji"></i><text>编辑</text></navigator>
			   </view>
			   <view  class="weui-flex__item">
			    		 <navigator   bindtap="deleteNote" class="weui-form-preview__btn right-btn" hover-class="right-btn_active"><i class="icon iconfont icon-shanchu"></i><text>删除</text></navigator>
			   </view>
	  		</view>
	  		<view wx:if="{{noteType=='others'}}" class="weui-flex">
		   	   <view wx:if="{{type!='third'}}" class="weui-flex__item">		   	   		
		   	   		 <navigator  open-type="redirect" url="editNote?editType=copyNote&noteId={{noteId}}"   class="weui-form-preview__btn left-btn" hover-class="left-btn_active"><i class="icon iconfont icon-fuzhi"></i><text>复制</text></navigator>
			   </view>
			   <view wx:if="{{type=='third'}}" class="weui-flex__item">		   	   		
		   	   		 <navigator  open-type="redirect" url="editNote?editType=copyThirdNote&noteData={{noteDetailStr}}"   class="weui-form-preview__btn left-btn" hover-class="left-btn_active"><i class="icon iconfont icon-fuzhi"></i><text>复制</text></navigator>
			   </view>
			   <view wx:if="{{!isCollect&&type!='third'}}" class="weui-flex__item">
			    		 <navigator  url="" bindtap="collectNote" class="weui-form-preview__btn right-btn" hover-class="right-btn_active"><i class="icon iconfont icon-xin-1"></i><text>收藏</text></navigator>
			   </view>
			    <view wx:if="{{isCollect}}" class="weui-flex__item">
			    		 <navigator  url="" bindtap="cancelCollectNote" class="weui-form-preview__btn right-btn" hover-class="right-btn_active"><i class="icon iconfont icon-xin"></i><text>取消收藏</text></navigator>
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
    export default class NoteDetail extends wepy.page {

        config = {
            "navigationBarTitleText": "逛人备忘"
        };
        components = {

        };

        mixins = [testMixin];

        data = {
            tabs: ["正文","评论"],
		    activeIndex: 0,
		    sliderOffset: 0,
		    sliderLeft: 0,
		    icon: base64.icon20,
		    noteId:'58cbb038b3ba5a55970052f3',
		    noteDetail:{},
		    indicatorDots: true,
		    autoplay: true,
		    interval: 5000,
		    duration: 2000,
		    comment:'',
		    commentList:[],
		    noteType:'self',
		    isCollect:false,
		    type:'',
		    noteDetailStr:'',
		    shareNote:'false'
        };

        computed = {
	
        };
        methods = {
        		tabClick (e) {
        			this.sliderOffset=e.currentTarget.offsetLeft;
        			this.activeIndex=e.currentTarget.id;
		    },
		     bindInput(e) {
		    		this.comment=e.detail.value;
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
			 openNoteList(_id,authorName){
        			  wx.navigateTo({
				      url: '../pages/noteList?authorName='+authorName+'&userId='+_id+'&noteListType=friendNote'
				    })
        		},
		    openLocation(){
		    		
		    		let longitude=this.noteDetail.location[0];
		    		let latitude=this.noteDetail.location[1];
		    		    wx.openLocation({
				      longitude: Number(longitude),
				      latitude: Number(latitude),
//				      name: value.name,
//				      address: value.address
				    })
		    },
		       previewImage(e){
		        wx.previewImage({
		            current: e.currentTarget.dataset.imgurl, // 当前显示图片的http链接
		            urls: this.noteDetail.images // 需要预览的图片http链接列表
		        })
		    },
		    	deleteNote(){
					var that=this;
					
					let {token}=this.$parent.globalData;
						wx.showModal({
						  title: '提示',
						  content: '确认删除当前笔记？',
						  success: function(res) {
						    if (res.confirm) {
							wx.request({
					            url: Common.HostUrl+'/notes/delete/'+that.noteId,
					            method:"delete",
					            header: {
								      'content-type': 'application/json',
								      'Authorization':'Bearer '+token 
								},
					            success:function(results){
					            		if(results.data.code!=0){
										wx.showToast({
								            title:results.data.message ,
								            duration: 3000
								        });
					            		}else{
					            			wx.navigateBack({
										  delta: 10
										})
					            		}
					            		
					            		
					            }
					          })	
						    }
						  }
						})
					
					

				},
				copyNote(){
					var that=this;
					let {userId,token}=this.$parent.globalData;
					let params=this.noteDetail;
					params.from=this.noteId;
					if(this.type=='third'){
						params.productCode.price=null;
						params.productCode.currency=null;
					}
					wx.request({
				            url: Common.HostUrl+'/notes/copy',
				            method:"post",
				            header: {
							      'content-type': 'application/json',
							      'Authorization':'Bearer '+token 
							},
							data:params,
				            success:function(results){
								let status='success';
				            		if(results.data.code!=0){
									status='failed';
				            		}
				            			wx.showToast({
							            title:results.data.message ,
							            icon: status,
							            duration: 3000
							        });
				            		
				            }
				          })	
				},
				collectNote(){
					var that=this;
					let {token}=this.$parent.globalData;
					wx.request({
				            url: Common.HostUrl+'/favorites/add/'+this.noteId,
				            method:"post",
				            header: {
							      'content-type': 'application/json',
							      'Authorization':'Bearer '+token 
							},
							data:{"noteId":this.noteId},
				            success:function(results){
								let mentionText='收藏失败';
				            		if(results.data.code==0){
									that.isCollect=true;
									mentionText='收藏成功';
									that.$apply();
				            		}
				            			wx.showToast({
							            title:mentionText ,
							            duration: 3000
							        });
				            		
				            }
				          })	
				},
				
				cancelCollectNote(){
					var that=this;
					let {token}=this.$parent.globalData;
					wx.request({
				            url: Common.HostUrl+'/favorites/remove/'+this.noteId,
				            method:"delete",
				            header: {
							      'content-type': 'application/json',
							      'Authorization':'Bearer '+token 
							},
				            success:function(results){
								let mentionText='取消收藏失败';
				            		if(results.data.code==0){
									that.isCollect=false;
									mentionText='取消收藏成功';
									that.$apply();
				            		}
				            			wx.showToast({
							            title:mentionText,
							            duration: 3000
							        });
				            		
				            }
				          })	
				},
				sendComment(){
					var that=this;
					let {token}=this.$parent.globalData;
					let params={
						content:this.comment,
						noteId:this.noteId
					};
					wx.request({
				            url: Common.HostUrl+'/comments/add',
				            method:"post",
				            header: {
							      'content-type': 'application/json',
							      'Authorization':'Bearer '+token 
							},
							data:params,
				            success:function(results){
								let status='success';
				            		if(results.data.code!=0){
									status='failed';
				            		}
				            		that.comment='';
				            		that.getCommentList();
				            			wx.showToast({
							            title:results.data.message ,
							            icon: status,
							            duration: 3000
							        });
				            		
				            }
				          })	
				},
		};
		getNoteDetail(){
			var that=this;
			let {userId,token}=this.$parent.globalData;
	
			
//			console.log("token",token,"this.noteId",this.noteId);
							//userId是当前用户的
			wx.request({
		            url: Common.HostUrl+'/notes/detail/'+this.noteId,
		            method:"get",
		            header: {
					      'content-type': 'application/json',
					      'Authorization':'Bearer '+token 
					},
		            success:function(results){
		            		console.log("详情",results);
	
		            		
							if(results.data.code!=0){
								let pageUrl='../pages/index';
								if(results.data.code==100010){
									pageUrl='../pages/noteList?shareNote=true&authorName='+results.data.user.nickName+'&userId='+results.data.user._id+'&noteListType=friendNote'
								}
								
								wx.showModal({
								  title: '提示',
								  showCancel:false,
								  content: results.data.message,
								  success: function(res) {
								    if (res.confirm) {
									    	wx.redirectTo({
											  url: pageUrl
											})

								    }
								  }
								})
								
								
							        
				            	}else{
				            			that.noteDetail=results.data.data;
				            			that.isCollect=results.data.data.hasFavorite;
				            			//判断笔记作者
				            			if(results.data.data.author._id!=userId){
				            				that.noteType='others';
				            			}
				            			that.$apply();
				            		}
						
		            }
		          })	
		
			

		};
	    getCommentList(){
				var that=this;
				let {token}=this.$parent.globalData;
				wx.request({
			            url: Common.HostUrl+'/comments/list/'+this.noteId,
			            method:"get",
			            header: {
						      'content-type': 'application/json',
						      'Authorization':'Bearer '+token 
						},
			            success:function(results){
			            		console.log("xasd",results);
			            		if(results.data.code!=0){
								wx.showToast({
						            title:results.data.message ,
						            duration: 3000
						        });
			            		}else{
			            			that.commentList=results.data.data;
			            			that.$apply();
			            		}
			            		
			            		
			            }
			          })	
	};
		onPullDownRefresh(){
		    wx.stopPullDownRefresh()
		  };
		  

		onShareAppMessage () {
					return {
		     					title: this.noteDetail.title,
		     					path: '/pages/noteDetail?shareNote=true&noteId='+this.noteId
		    			}
   			
		};
        onLoad(options) {
			MTA.Page.init();
        		this.noteId=options.noteId;
			this.type=options.type;
			this.shareNote=options.shareNote;
//			this.token=wx.getStorageSync('token');


			let self = this,sliderWidth = 96;
			let {userId,token}=this.$parent.globalData;
			if(!token){
				console.log("需要登录首次")
				this.$parent.loginApp(function(globalData){
					
					if(options.type=='third'){
						//注意图片，等为null情况需要处理下
						self.noteType='others';
						self.noteDetail=JSON.parse(options.noteData);
						self.noteDetailStr=options.noteData;
						self.tabs= ["正文"];
						self.$apply();
					}else{
						
						self.getNoteDetail();
						self.getCommentList();
					}
					
					
				})
		
			}else{
				console.log("略过登录")
				if(options.type=='third'){
						//注意图片，等为null情况需要处理下
						this.noteType='others';
						this.noteDetail=JSON.parse(options.noteData);
						this.noteDetailStr=options.noteData;
						console.log("this.noteDetail",this.noteDetail);
						this.tabs= ["正文"];
						this.$apply();
					}else{
						this.tabs= ["正文","评论"];
						this.getNoteDetail();
						this.getCommentList();
					}
			}
			
		
			
       	 	
        		   wx.getSystemInfo({
	            success: function(res) {
	            		self.sliderLeft=(res.windowWidth / self.data.tabs.length - sliderWidth) / 2;
	            		self.sliderOffset=res.windowWidth / self.data.tabs.length * self.data.activeIndex;
	            }
	        }); 
        };
        
        
    }
</script>