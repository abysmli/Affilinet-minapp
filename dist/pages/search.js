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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_wepy$page) {
	_inherits(Search, _wepy$page);

	function Search() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Search);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			"navigationBarTitleText": "搜索产品库"
		}, _this.components = {}, _this.mixins = [_test2.default], _this.data = {
			inputShowed: false,
			inputVal: "",
			noteList: [],
			searchDone: false,
			icon: '../images/placeholder.jpg'
		}, _this.computed = {}, _this.methods = {
			showInput: function showInput() {
				this.inputShowed = true;
			},
			backIndex: function backIndex() {
				wx.navigateBack({
					delta: 10
				});
			},
			hideInput: function hideInput() {
				this.inputVal = "";
				this.inputShowed = true;
				this.searchDone = false;
			},
			clearInput: function clearInput() {
				this.inputVal = "";
				this.searchDone = false;
			},
			inputTyping: function inputTyping(e) {
				this.inputVal = e.detail.value;
			},
			openNote: function openNote(item) {
				console.log("item", item);
				wx.navigateTo({
					url: '../pages/noteDetail?type=third&noteData=' + JSON.stringify(item)
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

	_createClass(Search, [{
		key: 'onPullDownRefresh',
		value: function onPullDownRefresh() {
			wx.stopPullDownRefresh();
		}
	}, {
		key: 'searchNoteList',
		value: function searchNoteList() {
			wx.showToast({
				title: '加载中',
				icon: 'loading',
				duration: 10000
			});
			var that = this;

			var token = this.$parent.globalData.token;
			//					that.noteList=Common.searchData.data;
			//					that.$apply();
			//					wx.hideToast();

			wx.request({
				//测试参数IPHONE7
				url: _common2.default.HostUrl + '/notes/search?query=' + this.inputVal,
				method: "get",
				header: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + token
				},
				success: function success(results) {
					wx.hideToast();
					if (results.data.code != 0) {
						wx.showToast({
							title: results.data.message,
							duration: 3000
						});
					}
					that.searchDone = true;
					that.noteList = results.data.data;
					that.$apply();
				}
			});
		}
	}, {
		key: 'onLoad',
		value: function onLoad() {}
	}]);

	return Search;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Search));
