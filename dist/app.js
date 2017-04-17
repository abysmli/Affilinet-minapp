'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _common = require('./common.js');

var _common2 = _interopRequireDefault(_common);

var _mta_analysis = require('./static/mta_analysis.js');

var _mta_analysis2 = _interopRequireDefault(_mta_analysis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_wepy$app) {
				_inherits(_class, _wepy$app);

				function _class() {
								var _ref;

								var _temp, _this, _ret;

								_classCallCheck(this, _class);

								for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
												args[_key] = arguments[_key];
								}

								return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
												"pages": ["pages/index", "pages/editNote", "pages/noteDetail", "pages/search", "pages/noteList", "pages/shareCode"],
												"window": {
																"backgroundTextStyle": "light",
																"navigationBarBackgroundColor": "#353535",
																"navigationBarTitleText": "WeChat",
																"navigationBarTextStyle": "white",
																"enablePullDownRefresh": true
												}
								}, _this.globalData = {
												userInfo: null,
												token: wx.getStorageSync('token'),
												userId: wx.getStorageSync('userId')
								}, _temp), _possibleConstructorReturn(_this, _ret);
				}

				_createClass(_class, [{
								key: 'onLaunch',
								value: function onLaunch() {
												_mta_analysis2.default.App.init({
																"appID": "500432446",
																"eventID": "500432450",
																"statPullDownFresh": true,
																"statShareApp": true,
																"statReachBottom": true
												});
								}
				}, {
								key: 'loginApp',
								value: function loginApp(cb) {
												var that = this;
												console.log("开始登录");
												wx.login({
																fail: function fail(res) {
																				console.log("fail", res);
																},
																complete: function complete(res) {
																				console.log("complete", res);
																},
																success: function success(res) {
																				console.log("res成功", res);
																				if (res.code) {
																								var code = res.code;
																								//获取用户信息
																								wx.getUserInfo({
																												success: function success(res) {
																																var params = {
																																				userInfo: res.userInfo,
																																				rawData: res.rawData,
																																				signature: res.signature,
																																				iv: res.iv,
																																				encryptedData: res.encryptedData,
																																				code: code
																																};
																																//				  console.log("params",params);
																																//获取登录token
																																wx.request({
																																				url: _common2.default.HostUrl + '/users/login',
																																				data: params,
																																				method: "post",
																																				header: {
																																								'content-type': 'application/json'
																																				},
																																				success: function success(results) {
																																								//		            		console.log("results",results.data.data.token);
																																								if (results.data.code == 0) {
																																												that.globalData.token = results.data.data.token;
																																												that.globalData.userId = results.data.data.userId;

																																												wx.setStorage({
																																																key: "token",
																																																data: results.data.data.token
																																												});
																																												wx.setStorage({
																																																key: "userId",
																																																data: results.data.data.userId
																																												});
																																												cb(that.globalData);
																																								} else {

																																												wx.showToast({
																																																title: results.data.message,
																																																duration: 3000
																																												});
																																								}
																																				}
																																});
																												}
																								});
																				} else {
																								console.log('获取用户登录态失败！' + res.errMsg);
																				}
																}
												});
								}
				}, {
								key: 'getUserInfo',
								value: function getUserInfo(cb) {
												var self = this;
												if (this.globalData.userInfo) {
																return this.globalData.userInfo;
												}
												_wepy2.default.getUserInfo({
																success: function success(res) {
																				self.globalData.userInfo = res.userInfo;
																				cb && cb(res.userInfo);
																}
												});
								}
				}]);

				return _class;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_class));
