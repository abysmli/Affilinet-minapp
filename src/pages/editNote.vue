<style lang="less">
.upLoadImgBtn {
	width:20%;
	height:120rpx;
	display:block;
	margin:30rpx;
}
.scanImgBtn {
	width:100%;
}
.package-detatil .weui-cell__ft {
	width:60rpx;
}
.weui-uploader__ft {
	text-align:right;
}
.weui-uploader__file {
	text-align:center;
	margin-right: 28rpx;
	margin-bottom: -70rpx;
}
.weui-uploader__img{
	width: 200rpx;
	height: 200rpx;
}
.icon .iconfont {
	font-size:44rpx;
}
.note-form {
	margin:0 40rpx;
	padding-bottom:150rpx;
}
.weui-form-preview__btn {
	display:block;
}	
.recommend{
	margin: 10px 0;
}
.switch{
	float: right;
}
.page__ft{
	z-index:3000;

}
.deleteBtn{
	width: 100rpx;
	height: 100rpx;
	background: white;
	opacity: 0.5;
	position:relative;
	top:-200rpx;
	left:100rpx;

}
.deleteBtn .iconfont{
	font-size: 40rpx;
	line-height: 100rpx;
}
.weui-cells_after-title{
	font-size: 13pt;
}
.weui-cells__title{
	padding-left: 0;
}
.weui-cell{
	padding-left: 0;
}
.weui-uploader__input-box{
	width: 200rpx;
	height: 200rpx;
}
</style>
<template>
    <view class="page">
		  <view class="page__bd">
			 <view class="note-form">
			     	

		  	  <view class="weui-cells__title">标题(必填)</view>
		        <view class="weui-cells weui-cells_after-title">
		            <view class="weui-cell weui-cell_input">
		                <view class="weui-cell__bd">
		                    <input class="weui-input" bindblur="bindInput" id="title" value="{{noteForm.title}}" placeholder="请输入标题" />
		                </view>
		            </view>
		      </view>
		  	
		      <view class="weui-cells__title">正文</view>
		        <view class="weui-cells weui-cells_after-title">
		            <view class="weui-cell">
		                <view class="weui-cell__bd">
		                    <textarea maxlength=500 class="weui-textarea"  bindblur="bindInput" id="content" value="{{noteForm.content}}" placeholder="请输入文本" style="height: 12em" />
		                    <view class="weui-textarea-counter">{{noteForm.content.length}}/500</view>
		                </view>
		            </view>
		        </view>
		        <view class="weui-cells__title">图片上传</view>
			<view class="weui-uploader">
               
                <view class="weui-uploader__bd">
                    <view class="weui-uploader__files " id="uploaderFiles">
                        <block wx:for-items="{{files}}" wx:key="{{index}}">
                            <view class="weui-uploader__file"  >
                                <image bindtap="previewImage" id="{{item}}" class="weui-uploader__img" src="{{item}}" mode="aspectFill" />
                               	<view bindtap="deleteImage" data-imgurl="{{item}}" class="deleteBtn"><i  class="icon iconfont icon-shanchu"></i></view> 
                            </view>
                        </block>
                    </view>
                    <view wx:if="{{files.length<9}}" class="weui-uploader__input-box">
                        <view class="weui-uploader__input" bindtap="chooseImage"></view>
                    </view>
                </view>
                 <view class="weui-uploader__ft">
                    <view class="weui-uploader__info">{{files.length}}/9</view>
                </view>
            </view>
		    		  <view class="weui-cells__title">标签</view>
		        <view class="weui-cells weui-cells_after-title">
		            <view class="weui-cell weui-cell_input">
		                <view class="weui-cell__bd">
		                    <input class="weui-input" bindblur="bindInput" id="tags" value="{{noteForm.tags}}" placeholder="多个标签用英文,分割" />
		                </view>
		            </view>
		      </view>
				<view class="weui-cells__title">包装详情</view>
		        <view class="weui-cells weui-cells_after-title">
		            <view class="weui-cell weui-cell_input package-detatil">
		                <view class="weui-cell__hd">
		                    <view class="weui-label">长度</view>
		                </view>
		                <view class="weui-cell__bd">
		                    <input bindblur="bindInput" id="length" value="{{noteForm.length}}" class="weui-input" />
		                </view>
		                <view class="weui-cell__ft">
		                    <view class="weui-vcode-btn">cm</view>
		                </view>
		            </view>
		             <view class="weui-cell weui-cell_input package-detatil">
		                <view class="weui-cell__hd">
		                    <view class="weui-label">宽度</view>
		                </view>
		                <view class="weui-cell__bd">
		                    <input bindblur="bindInput" id="width" value="{{noteForm.width}}" class="weui-input" />
		                </view>
		                <view class="weui-cell__ft">
		                    <view class="weui-vcode-btn">cm</view>
		                </view>
		            </view>
		             <view class="weui-cell weui-cell_input package-detatil">
		                <view class="weui-cell__hd">
		                    <view class="weui-label">高度</view>
		                </view>
		                <view class="weui-cell__bd">
		                    <input bindblur="bindInput" id="height" value="{{noteForm.height}}" class="weui-input" />
		                </view>
		                <view class="weui-cell__ft">
		                    <view class="weui-vcode-btn">cm</view>
		                </view>
		            </view>
		             <view class="weui-cell weui-cell_input package-detatil">
		                <view class="weui-cell__hd">
		                    <view class="weui-label">重量</view>
		                </view>
		                <view class="weui-cell__bd">
		                    <input bindblur="bindInput" id="weight" value="{{noteForm.weight}}" class="weui-input" />
		                </view>
		                <view class="weui-cell__ft">
		                    <view class="weui-vcode-btn">kg</view>
		                </view>
		            </view>
		           
		        </view>
		        <view class="weui-cells__title">产品代码</view>
		        <view class="weui-cells weui-cells_after-title">
		            <view class="weui-cell weui-cell_input">
		                <view class="weui-cell__hd">
		                    <view class="weui-label">条码</view>
		                </view>
		                <view class="weui-cell__bd">
		                    <input bindblur="bindInput" id="ean" value="{{noteForm.ean}}" class="weui-input" />
		                </view>
		                <view class="weui-cell__ft">
		                		<i bindtap="scanCode"  class="icon iconfont icon-qr"></i>
		        
		                </view>
		            </view>
		             <view class="weui-cell weui-cell_input">
		                <view class="weui-cell__hd">
		                    <view class="weui-label">ASIN</view>
		                </view>
		                <view class="weui-cell__bd">
		                    <input bindblur="bindInput" id="asin" value="{{noteForm.asin}}" class="weui-input" />
		                </view>
		            </view>
		            <view class="weui-cell weui-cell_input">
		                <view class="weui-cell__hd">
		                    <view class="weui-label">货号</view>
		                </view>
		                <view class="weui-cell__bd">
		                    <input bindblur="bindInput" id="styleId" value="{{noteForm.styleId}}" class="weui-input" />
		                </view>
		            </view>
		           
		        </view>
		         <view class="weui-cells__title">价格</view>
		        <view class="weui-cells weui-cells_after-title">		    
		            <view class="weui-cell weui-cell_input">
		                <view class="weui-cell__bd">
		                     <input class="weui-input" bindblur="bindInput" id="price" value="{{noteForm.price}}"/>
		                </view>
		                <view class="weui-cell__ft">
		                		<picker bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
		                		 <view class="weui-vcode-btn">{{money[index]}}</view>
		                		 </picker>
		                </view>
		            </view>
		        </view>
		        <button class="weui-btn" bindtap="chooseLocation" type="primary">获取位置</button>
		     	<view class="recommend">
		     		<text class="weui-cells__title">推荐加精</text>
		     		<switch class="switch" checked bindchange="switchChange"/>   
		     	</view>
		     	
		      
		     	
			 </view>
		        
		     
		       
		        

		  </view>
		<view class="page__ft">
	       <view class="weui-flex">
		   	   <view class="weui-flex__item">		   	   		
		   	   		 <navigator  url="" bindtap="saveNote(10)" class="weui-form-preview__btn left-btn" hover-class="left-btn_active"><i class="icon iconfont icon-baocun"></i><text>存草稿</text></navigator>
			   </view>
			   <view  class="weui-flex__item">
			   		 <navigator  wx:if="{{editType=='createNote'||editType=='copyNote'||editType=='updateNote'||editType=='copyThirdNote'}}" url='' bindtap="saveNote(20)" class="weui-form-preview__btn right-btn" hover-class="right-btn_active"><i class="icon iconfont icon-fabu"></i><text>发布</text></navigator>
			    		 
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

    export default class EditNote extends wepy.page {

        config = {
            "navigationBarTitleText": "新建笔记"
        };
        components = {
          
        };

        mixins = [testMixin];

        data = {
           array: ['人民币', '美元', '欧元'],
      	   index: 0,
      	   files: [],
      	   newFiles:[],
      	   noteId:'',
      	   noteForm:{
      	   	 title:'',
      	   	 tags:'',
      	   	 content:'',
      	   	 length:undefined,
		   	 width:undefined,
		   	 height:undefined,
		   	 weight:undefined,
		   	 ean:'',
      	   	 asin:'',
      	   	 price:'',
      	   	 styleId:'',
      	   	 location:{
      	   	 	latitude: null,
		      	longitude: null,
      	   	 },
      	   },
      	   images:[],
      	   money:['CNY','USD','EUR'],
      	   editType:'createNote'
        };

        computed = {

        };
        methods = {
        		bindPickerChange(e) {
		        this.index=e.detail.value;
		    },
		     backIndex(){
			 	wx.navigateBack({
				  delta: 10
				})
			 },
		    chooseLocation(){
		    	let that=this;
		    		wx.chooseLocation({				   
		    			success:function(res){
//		    				console.log("res",res);
						that.noteForm.location={
				        		longitude: res.longitude,
				            latitude: res.latitude
				        }
		    			}
		    		})
		    },
		    chooseImage(e) {
		        var that = this;
		        wx.chooseImage({
		        		count:(9-that.files.length),
		            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		            success: function (res) {
		            		
		           	 	that.files=that.files.concat(res.tempFilePaths);
						//保存新增图片
						that.newFiles=that.newFiles.concat(res.tempFilePaths);
			            that.$apply();
			          }
		            })
		                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

	    		},
	    		deleteImage(e){
	    			function getIndex(arr,data){
	    				for (var i = 0; i < arr.length; i++) {
	    					if(arr[i]==data){
	    						return i;
	    					}
	    				}
	    			}

	    			//区分是旧图还是新增图
	    			let targetIndex_1=getIndex(this.files,e.currentTarget.dataset.imgurl);
	    			if(targetIndex_1>=0){
	    				this.files.splice(targetIndex_1,1);
	    			}
	    			let targetIndex_2=getIndex(this.newFiles,e.currentTarget.dataset.imgurl);
	    			if(targetIndex_2>=0){
	    				this.newFiles.splice(targetIndex_2,1);
	    			}
	    			this.$apply();
	    			
	    		},
		    previewImage(e){

		        wx.previewImage({
		            current: e.currentTarget.id, // 当前显示图片的http链接
		            urls: this.files // 需要预览的图片http链接列表
		        })
		    },
		    bindInput(e) {
		    		this.noteForm[e.target.id]=e.detail.value;
			  },
			 async  saveNote(state){
			 	//state 用于保存和直接保存发布
			 	//根据是否有个noteId判断是新建和更新
			 	if(this.newFiles.length!=0||(!!this.noteId&&this.noteId.length==0)){
			 		//只上传新增图片
			 		await this.uploadImgs(this.newFiles);
			 		
			 	}
			 	if(this.noteForm.title.length==0){
			 			wx.showToast({
				            title:"标题必填" ,
				            duration: 3000
				        });
				        return;
			 	}
			 	
			 	console.log("xxasd",this.noteForm);
				var submitData={
					"title":this.noteForm.title,
				    "images":this.images,
				 	"content":this.noteForm.content,
					"packageDetail":{
					   "length":this.noteForm.length,
					   "width":this.noteForm.width,
					   "height":this.noteForm.height,
					   "weight":this.noteForm.weight
					 },
				   state: state, //不填默认为10，表示私有状态，20表示分享状态
				   "productCode":{
				     "ean":this.noteForm.ean,
				     "asin":this.noteForm.asin,
				     "styleId":this.noteForm.styleId,
				     "price":this.noteForm.price,
				     "currency":this.money[this.index]
				   },
				   "location": [this.noteForm.location.longitude, this.noteForm.location.latitude], //[lon,lat]
				}
//				console.log("submitData",submitData);
				let requestType='add';
				//更新自己的笔记，复制笔记，新建笔记
				if(!!this.noteId&&this.noteId.length!=0&&this.editType!='copyNote'){
					//是更新笔记
					requestType='update';
					submitData.noteId=this.noteId;
					
				}
				
//				if(this.editType=='copyNote'||this.editType=='updateNote'){
//					submitData.tags=this.noteForm.tags;
//				}else{
//					submitData.tags=this.noteForm.tags.split(",");
//				}

				submitData.tags=(''+this.noteForm.tags).split(",");
				console.log("submitData.tags",submitData.tags);
				let {token}=this.$parent.globalData;
				if(state==20){
						wx.showModal({
						  title: '提示',
						  content: '发布的内容将变为公开内容',
						  success: function(res) {
						    if (res.confirm) {
						    			//保存
								wx.request({
						            url: Common.HostUrl+'/notes/'+requestType,
						            data: submitData,
						            method:"post",
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
						    }else{
						    		return;
						    }
						   }
						})
				}else{
						//保存
				wx.request({
		            url: Common.HostUrl+'/notes/'+requestType,
		            data: submitData,
		            method:"post",
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
			
				
			
				
			},
			//此方法弃用
			publicNote(){
					var that=this;
					let {token}=this.$parent.globalData;
					let params={
						noteId:this.noteId
					};
					wx.request({
				            url: Common.HostUrl+'/notes/share',
				            method:"post",
				            header: {
							      'content-type': 'application/json',
							      'Authorization':'Bearer '+token 
							},
							data:params,
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
//				    that.initNoteForm(Common.eanCodeData.data);
				    	wx.request({
			            url: Common.HostUrl+'/notes/scan?ean='+eanCode,
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
			            		}else if(results.data.data.length==0){
			            			that.noteForm.ean=eanCode;
			            			that.$apply();
			            		}else{
			            			that.initNoteForm(results.data.data);
			            		}
			            		
			            		
			            }
			          })	
					
				    				

				    
				    
				  }
				})
        		}

		};
		switchChange(e){
		    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
		 };
		getNoteDetail(){
			var that=this;
			let {token}=this.$parent.globalData;
			wx.request({
		            url: Common.HostUrl+'/notes/detail/'+this.noteId,
		            method:"get",
		            header: {
					      'content-type': 'application/json',
					      'Authorization':'Bearer '+token 
					},
		            success:function(results){
//		            		console.log("results",results);
;
		            		if(results.data.code!=0){
							wx.showToast({
					            title:results.data.message ,
					            duration: 3000
					        });
		            		}else{
		            			console.log("resultsXX",results);
		            			 let noteDetail=results.data.data;
		            			 that.initNoteForm(noteDetail)
		            			
		            			
		            		}
		            }
		          })	
		};
		 uploadImgs(imgArr){
		 	var that=this;
		 	var countFlag=0;
		 	return new Promise((resolve, reject) => {
	        		imgArr.forEach(function(item){
	        		
				wx.uploadFile({
			      url:  Common.HostUrl+'/images/upload',
			      filePath: 	item,
			      name: 'image',
			      header: {
			     	'Authorization':'Bearer '+that.token 
				  },
			      success: function(res){
			      	countFlag++;
			      	var data = JSON.parse(res.data);
			       	that.images.push(data.data);
			       	console.log("countFlag",countFlag,"imgArr.length",imgArr.length);
					if(countFlag>=imgArr.length){
						resolve();
					}
					
			      }
			    })
			})
	        		
	        });
			
	

			
		};
		initNoteForm(noteDetail){
			this.noteForm={
    				 title:noteDetail.title,
	      	   	 tags:!!noteDetail.tags?noteDetail.tags:'',
	      	   	 content:noteDetail.content,
			   	 ean:noteDetail.productCode.ean,
			   	 styleId:noteDetail.productCode.styleId,
	      	   	 asin:!!noteDetail.productCode.asin?noteDetail.productCode.asin:'',
	      	   	 price:noteDetail.productCode.price,
	      	 	 length:undefined,
			   	 width:undefined,
			   	 height:undefined,
			   	 weight:undefined,
			   	 location:{
	      	   	 	latitude: null,
			      	longitude: null,
	      	   	 }
    			};
    			if(!!noteDetail.packageDetail){
    				this.noteForm.length=noteDetail.packageDetail.length;
    				this.noteForm.width=noteDetail.packageDetail.width;
    				this.noteForm.height=noteDetail.packageDetail.height;
    				this.noteForm.weight=noteDetail.packageDetail.weight;
    			}
    			if(!!noteDetail.location){
    				this.location={
    					latitude: noteDetail.location[1],
			      	longitude: noteDetail.location[0],
    				}
    			}
    			this.files=noteDetail.images;
    			this.images=noteDetail.images;
    			let moneyIndex=this.money.indexOf(noteDetail.productCode.currency);
    		
    			this.index=moneyIndex;
			this.$apply();
		};
		onPullDownRefresh(){
		    wx.stopPullDownRefresh()
		  };
        onLoad(options) {
        		this.noteForm={
        			title:'',
	      	   	 tags:'',
	      	   	 content:'',
	      	   	 length:undefined,
			   	 width:undefined,
			   	 height:undefined,
			   	 weight:undefined,
			   	 ean:'',
	      	   	 asin:'',
	      	   	 price:'',
	      	   	 styleId:'',
	      	   	 location:{
	      	   	 	latitude: null,
			      	longitude: null,
	      	   	 },	
        		};
        		this.noteId=options.noteId;
        		this.editType=options.editType;
        		this.files=[];
        		this.newFiles=[];
        		this.images=[];
        		if(!!this.noteId&&this.noteId.length!=0){
        			this.getNoteDetail();
        		}
        		if(options.editType=='copyThirdNote'){
        			//处理模板数据初始化
        			let noteDetail=JSON.parse(options.noteData);
        			noteDetail.productCode.price=null;
        			noteDetail.productCode.currency='CNY';
        			this.initNoteForm(noteDetail);
        			
        		}
        		//扫码无模板时新建
        		if(!!options.eanCode){
        			this.noteForm.ean=options.eanCode;
        			
        		}
        		this.$apply();
       	 	this.token=wx.getStorageSync('token');
       	 	
        };

    }
</script>