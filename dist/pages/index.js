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

var Index = function (_wepy$page) {
	_inherits(Index, _wepy$page);

	function Index() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Index);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			"navigationBarTitleText": "逛人备忘"
		}, _this.components = {}, _this.mixins = [_test2.default], _this.data = {
			tabs: ["记友列表", "我的笔记", "浏览记录"],
			activeIndex: 1,
			sliderOffset: 0,
			sliderLeft: 0,
			icon: '../images/placeholder.jpg',
			noteList: [],
			userId: '',
			historyList: [],
			friendList: [],
			loadMore: false,
			refresh: false,
			f_skip: 0,
			n_skip: 0,
			h_skip: 0,
			f_isMore: true,
			n_isMore: true,
			h_isMore: true

		}, _this.computed = {}, _this.methods = {
			tabClick: function tabClick(e) {
				this.sliderOffset = e.currentTarget.offsetLeft;
				this.activeIndex = e.currentTarget.id;
			},
			createNote: function createNote() {
				wx.navigateTo({
					url: '../pages/editNote?editType=createNote'
				});
			},
			searchNote: function searchNote() {
				wx.navigateTo({
					url: '../pages/search'
				});
			},
			openNote: function openNote(_id) {
				wx.navigateTo({
					url: '../pages/noteDetail?noteId=' + _id
				});
			},
			openNoteList: function openNoteList(_id, authorName) {
				wx.navigateTo({
					url: '../pages/noteList?authorName=' + authorName + '&userId=' + _id + '&noteListType=friendNote'
				});
			},
			scanCode: function scanCode() {

				var that = this;
				var token = this.$parent.globalData.token;

				wx.scanCode({
					success: function success(res) {
						wx.showToast({
							title: "请稍等...",
							icon: 'loading',
							duration: 10000
						});
						var eanCode = res.result;
						wx.request({
							url: _common2.default.HostUrl + '/notes/scan?ean=' + eanCode,
							method: "get",
							header: {
								'content-type': 'application/json',
								'Authorization': 'Bearer ' + token
							},
							fail: function fail() {
								wx.showToast({
									title: "当前网络不佳，请稍后重试",
									duration: 3000
								});
							},
							success: function success(results) {
								wx.hideToast();
								if (results.data.code != 0) {
									wx.showToast({
										title: results.data.message,
										duration: 3000
									});
								} else if (results.data.data.length == 0) {
									wx.showModal({
										title: '提示',
										content: '是否新建笔记',
										success: function success(res) {
											if (res.confirm) {
												//								      console.log('用户点击确定')
												wx.navigateTo({
													url: '../pages/editNote?editType=createNote&eanCode=' + eanCode
												});
											}
										}
									});
								} else {
									wx.navigateTo({
										url: '../pages/noteDetail?type=third&noteData=' + JSON.stringify(results.data.data)
									});
								}
							}
						});
					}
				});
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Index, [{
		key: 'getSomeList',
		value: function getSomeList(skip, listType) {
			var that = this;
			var _$parent$globalData = this.$parent.globalData,
			    userId = _$parent$globalData.userId,
			    token = _$parent$globalData.token;

			var requestUrl = '';
			switch (listType) {
				case 'friendList':

					requestUrl = '/relations/list';
					break;
				case 'noteList':

					requestUrl = '/notes/' + userId + '/list';
					break;
				case 'historyList':

					requestUrl = '/history/list';
					break;
				default:
					break;
			}

			wx.request({
				url: _common2.default.HostUrl + requestUrl + '?skip=' + skip,
				method: "get",
				header: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + token
				},
				success: function success(results) {
					if (results.data.code != 0) {
						wx.showToast({
							title: results.data.message,
							icon: 'failed',
							duration: 3000
						});
					} else {

						//历史记录数据
						wx.hideToast();
						wx.stopPullDownRefresh();
						setTimeout(function () {
							that.loadMore = false;
							that.refresh = false;
							that.$apply();
						}, 1000);

						if (skip == 0) {
							//刷新首页数据
							that[listType] = results.data.data;
						} else {
							//加载更多
							that[listType] = that[listType].concat(results.data.data);
						}
						switch (listType) {
							case 'friendList':
								that.f_skip++;
								that.f_isMore = results.data.isMore;
								break;
							case 'noteList':
								that.n_skip++;
								that.n_isMore = results.data.isMore;
								break;
							case 'historyList':
								that.h_skip++;
								that.h_isMore = results.data.isMore;
								break;
							default:
								break;
						}

						that.$apply();
					}
				}
			});
		}
	}, {
		key: 'onShow',
		value: function onShow() {
			//这里可以处理页面显示时需要的逻辑，比如自动刷新
			var self = this;
			wx.showToast({
				title: '加载中',
				icon: 'loading',
				duration: 10000
			});
			var _$parent$globalData2 = this.$parent.globalData,
			    userId = _$parent$globalData2.userId,
			    token = _$parent$globalData2.token;

			if (!token) {
				console.log("首次登录");
				this.$parent.loginApp(function (globalData) {

					self.getSomeList(0, 'noteList');
					self.getSomeList(0, 'historyList');
					self.getSomeList(0, 'friendList');
				});
			} else {
				console.log("调过登录");
				this.refresh = true;
				self.getSomeList(0, 'noteList');
				self.getSomeList(0, 'historyList');
				self.getSomeList(0, 'friendList');
			}
		}
	}, {
		key: 'onLoad',
		value: function onLoad() {
			_mta_analysis2.default.Page.init();
			var userInfo = void 0,
			    self = this,
			    sliderWidth = 96;
			wx.getSystemInfo({
				success: function success(res) {

					self.sliderLeft = (res.windowWidth / self.data.tabs.length - sliderWidth) / 2;
					self.sliderOffset = res.windowWidth / self.data.tabs.length * self.data.activeIndex;
				}
			});
			//	        this.userId=wx.getStorageSync('userId');
			//	        this.token=wx.getStorageSync('token');

		}
	}, {
		key: 'onReachBottom',
		value: function onReachBottom() {
			var that = this;
			if (this.activeIndex == 2 && this.h_isMore) {
				this.loadMore = true;
				this.getSomeList(this.h_skip * 20, 'historyList');
			} else if (this.activeIndex == 0 && this.f_isMore) {
				this.loadMore = true;
				this.getSomeList(this.f_skip * 20, 'friendList');
			} else if (this.activeIndex == 1 && this.n_isMore) {
				this.loadMore = true;
				this.getSomeList(this.n_skip * 20, 'noteList');
			}
		}
	}, {
		key: 'onPullDownRefresh',
		value: function onPullDownRefresh() {
			if (this.activeIndex == 2) {
				this.refresh = true;
				this.h_skip = 0;
				this.getSomeList(0, 'historyList');
			} else if (this.activeIndex == 0) {
				this.refresh = true;
				this.f_skip = 0;
				this.getSomeList(0, 'friendList');
			} else if (this.activeIndex == 1) {
				this.refresh = true;
				this.n_skip = 0;
				this.getSomeList(0, 'noteList');
			}
		}
	}]);

	return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));
