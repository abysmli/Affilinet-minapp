'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _base = require('./../images/base64.js');

var _base2 = _interopRequireDefault(_base);

var _common = require('./../common.js');

var _common2 = _interopRequireDefault(_common);

var _mta_analysis = require('./../static/mta_analysis.js');

var _mta_analysis2 = _interopRequireDefault(_mta_analysis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoteDetail = function (_wepy$page) {
	_inherits(NoteDetail, _wepy$page);

	function NoteDetail() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, NoteDetail);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NoteDetail.__proto__ || Object.getPrototypeOf(NoteDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			"navigationBarTitleText": "逛人备忘"
		}, _this.components = {}, _this.mixins = [_test2.default], _this.data = {
			tabs: ["正文", "评论"],
			activeIndex: 0,
			sliderOffset: 0,
			sliderLeft: 0,
			icon: _base2.default.icon20,
			noteId: '58cbb038b3ba5a55970052f3',
			noteDetail: {},
			indicatorDots: true,
			autoplay: true,
			interval: 5000,
			duration: 2000,
			comment: '',
			commentList: [],
			noteType: 'self',
			isCollect: false,
			type: '',
			noteDetailStr: '',
			shareNote: 'false'
		}, _this.computed = {}, _this.methods = {
			tabClick: function tabClick(e) {
				this.sliderOffset = e.currentTarget.offsetLeft;
				this.activeIndex = e.currentTarget.id;
			},
			bindInput: function bindInput(e) {
				this.comment = e.detail.value;
			},
			backIndex: function backIndex() {
				if (this.shareNote == 'true') {
					wx.navigateTo({
						url: '../pages/index'
					});
				} else {
					wx.navigateBack({
						delta: 10
					});
				}
			},
			openNoteList: function openNoteList(_id, authorName) {
				wx.navigateTo({
					url: '../pages/noteList?authorName=' + authorName + '&userId=' + _id + '&noteListType=friendNote'
				});
			},
			openLocation: function openLocation() {

				var longitude = this.noteDetail.location[0];
				var latitude = this.noteDetail.location[1];
				wx.openLocation({
					longitude: Number(longitude),
					latitude: Number(latitude)
				});
			},
			previewImage: function previewImage(e) {
				wx.previewImage({
					current: e.currentTarget.dataset.imgurl, // 当前显示图片的http链接
					urls: this.noteDetail.images // 需要预览的图片http链接列表
				});
			},
			deleteNote: function deleteNote() {
				var that = this;

				var token = this.$parent.globalData.token;

				wx.showModal({
					title: '提示',
					content: '确认删除当前笔记？',
					success: function success(res) {
						if (res.confirm) {
							wx.request({
								url: _common2.default.HostUrl + '/notes/delete/' + that.noteId,
								method: "delete",
								header: {
									'content-type': 'application/json',
									'Authorization': 'Bearer ' + token
								},
								success: function success(results) {
									if (results.data.code != 0) {
										wx.showToast({
											title: results.data.message,
											duration: 3000
										});
									} else {
										wx.navigateBack({
											delta: 10
										});
									}
								}
							});
						}
					}
				});
			},
			copyNote: function copyNote() {
				var that = this;
				var _$parent$globalData = this.$parent.globalData,
				    userId = _$parent$globalData.userId,
				    token = _$parent$globalData.token;

				var params = this.noteDetail;
				params.from = this.noteId;
				if (this.type == 'third') {
					params.productCode.price = null;
					params.productCode.currency = null;
				}
				wx.request({
					url: _common2.default.HostUrl + '/notes/copy',
					method: "post",
					header: {
						'content-type': 'application/json',
						'Authorization': 'Bearer ' + token
					},
					data: params,
					success: function success(results) {
						var status = 'success';
						if (results.data.code != 0) {
							status = 'failed';
						}
						wx.showToast({
							title: results.data.message,
							icon: status,
							duration: 3000
						});
					}
				});
			},
			collectNote: function collectNote() {
				var that = this;
				var token = this.$parent.globalData.token;

				wx.request({
					url: _common2.default.HostUrl + '/favorites/add/' + this.noteId,
					method: "post",
					header: {
						'content-type': 'application/json',
						'Authorization': 'Bearer ' + token
					},
					data: { "noteId": this.noteId },
					success: function success(results) {
						var mentionText = '收藏失败';
						if (results.data.code == 0) {
							that.isCollect = true;
							mentionText = '收藏成功';
							that.$apply();
						}
						wx.showToast({
							title: mentionText,
							duration: 3000
						});
					}
				});
			},
			cancelCollectNote: function cancelCollectNote() {
				var that = this;
				var token = this.$parent.globalData.token;

				wx.request({
					url: _common2.default.HostUrl + '/favorites/remove/' + this.noteId,
					method: "delete",
					header: {
						'content-type': 'application/json',
						'Authorization': 'Bearer ' + token
					},
					success: function success(results) {
						var mentionText = '取消收藏失败';
						if (results.data.code == 0) {
							that.isCollect = false;
							mentionText = '取消收藏成功';
							that.$apply();
						}
						wx.showToast({
							title: mentionText,
							duration: 3000
						});
					}
				});
			},
			sendComment: function sendComment() {
				var that = this;
				var token = this.$parent.globalData.token;

				var params = {
					content: this.comment,
					noteId: this.noteId
				};
				wx.request({
					url: _common2.default.HostUrl + '/comments/add',
					method: "post",
					header: {
						'content-type': 'application/json',
						'Authorization': 'Bearer ' + token
					},
					data: params,
					success: function success(results) {
						var status = 'success';
						if (results.data.code != 0) {
							status = 'failed';
						}
						that.comment = '';
						that.getCommentList();
						wx.showToast({
							title: results.data.message,
							icon: status,
							duration: 3000
						});
					}
				});
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(NoteDetail, [{
		key: 'getNoteDetail',
		value: function getNoteDetail() {
			var that = this;
			var _$parent$globalData2 = this.$parent.globalData,
			    userId = _$parent$globalData2.userId,
			    token = _$parent$globalData2.token;

			//			console.log("token",token,"this.noteId",this.noteId);
			//userId是当前用户的

			wx.request({
				url: _common2.default.HostUrl + '/notes/detail/' + this.noteId,
				method: "get",
				header: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + token
				},
				success: function success(results) {
					console.log("详情", results);

					if (results.data.code != 0) {
						var pageUrl = '../pages/index';
						if (results.data.code == 100010) {
							pageUrl = '../pages/noteList?shareNote=true&authorName=' + results.data.user.nickName + '&userId=' + results.data.user._id + '&noteListType=friendNote';
						}

						wx.showModal({
							title: '提示',
							showCancel: false,
							content: results.data.message,
							success: function success(res) {
								if (res.confirm) {
									wx.redirectTo({
										url: pageUrl
									});
								}
							}
						});
					} else {
						that.noteDetail = results.data.data;
						that.isCollect = results.data.data.hasFavorite;
						//判断笔记作者
						if (results.data.data.author._id != userId) {
							that.noteType = 'others';
						}
						that.$apply();
					}
				}
			});
		}
	}, {
		key: 'getCommentList',
		value: function getCommentList() {
			var that = this;
			var token = this.$parent.globalData.token;

			wx.request({
				url: _common2.default.HostUrl + '/comments/list/' + this.noteId,
				method: "get",
				header: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + token
				},
				success: function success(results) {
					console.log("xasd", results);
					if (results.data.code != 0) {
						wx.showToast({
							title: results.data.message,
							duration: 3000
						});
					} else {
						that.commentList = results.data.data;
						that.$apply();
					}
				}
			});
		}
	}, {
		key: 'onPullDownRefresh',
		value: function onPullDownRefresh() {
			wx.stopPullDownRefresh();
		}
	}, {
		key: 'onShareAppMessage',
		value: function onShareAppMessage() {
			return {
				title: this.noteDetail.title,
				path: '/pages/noteDetail?shareNote=true&noteId=' + this.noteId
			};
		}
	}, {
		key: 'onLoad',
		value: function onLoad(options) {
			_mta_analysis2.default.Page.init();
			this.noteId = options.noteId;
			this.type = options.type;
			this.shareNote = options.shareNote;
			//			this.token=wx.getStorageSync('token');


			var self = this,
			    sliderWidth = 96;
			var _$parent$globalData3 = this.$parent.globalData,
			    userId = _$parent$globalData3.userId,
			    token = _$parent$globalData3.token;

			if (!token) {
				console.log("需要登录首次");
				this.$parent.loginApp(function (globalData) {

					if (options.type == 'third') {
						//注意图片，等为null情况需要处理下
						self.noteType = 'others';
						self.noteDetail = JSON.parse(options.noteData);
						self.noteDetailStr = options.noteData;
						self.tabs = ["正文"];
						self.$apply();
					} else {

						self.getNoteDetail();
						self.getCommentList();
					}
				});
			} else {
				console.log("略过登录");
				if (options.type == 'third') {
					//注意图片，等为null情况需要处理下
					this.noteType = 'others';
					this.noteDetail = JSON.parse(options.noteData);
					this.noteDetailStr = options.noteData;
					console.log("this.noteDetail", this.noteDetail);
					this.tabs = ["正文"];
					this.$apply();
				} else {
					this.tabs = ["正文", "评论"];
					this.getNoteDetail();
					this.getCommentList();
				}
			}

			wx.getSystemInfo({
				success: function success(res) {
					self.sliderLeft = (res.windowWidth / self.data.tabs.length - sliderWidth) / 2;
					self.sliderOffset = res.windowWidth / self.data.tabs.length * self.data.activeIndex;
				}
			});
		}
	}]);

	return NoteDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(NoteDetail));
