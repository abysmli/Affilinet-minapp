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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditNote = function (_wepy$page) {
	_inherits(EditNote, _wepy$page);

	function EditNote() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, EditNote);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditNote.__proto__ || Object.getPrototypeOf(EditNote)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			"navigationBarTitleText": "新建笔记"
		}, _this.components = {}, _this.mixins = [_test2.default], _this.data = {
			array: ['人民币', '美元', '欧元'],
			index: 0,
			files: [],
			newFiles: [],
			noteId: '',
			noteForm: {
				title: '',
				tags: '',
				content: '',
				length: undefined,
				width: undefined,
				height: undefined,
				weight: undefined,
				ean: '',
				asin: '',
				price: '',
				styleId: '',
				location: {
					latitude: null,
					longitude: null
				}
			},
			images: [],
			money: ['CNY', 'USD', 'EUR'],
			editType: 'createNote'
		}, _this.computed = {}, _this.methods = {
			bindPickerChange: function bindPickerChange(e) {
				this.index = e.detail.value;
			},
			backIndex: function backIndex() {
				wx.navigateBack({
					delta: 10
				});
			},
			chooseLocation: function chooseLocation() {
				var that = this;
				wx.chooseLocation({
					success: function success(res) {
						//		    				console.log("res",res);
						that.noteForm.location = {
							longitude: res.longitude,
							latitude: res.latitude
						};
					}
				});
			},
			chooseImage: function chooseImage(e) {
				var that = this;
				wx.chooseImage({
					count: 9 - that.files.length,
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function success(res) {

						that.files = that.files.concat(res.tempFilePaths);
						//保存新增图片
						that.newFiles = that.newFiles.concat(res.tempFilePaths);
						that.$apply();
					}
				});
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
			},
			deleteImage: function deleteImage(e) {
				function getIndex(arr, data) {
					for (var i = 0; i < arr.length; i++) {
						if (arr[i] == data) {
							return i;
						}
					}
				}

				//区分是旧图还是新增图
				var targetIndex_1 = getIndex(this.files, e.currentTarget.dataset.imgurl);
				if (targetIndex_1 >= 0) {
					this.files.splice(targetIndex_1, 1);
				}
				var targetIndex_2 = getIndex(this.newFiles, e.currentTarget.dataset.imgurl);
				if (targetIndex_2 >= 0) {
					this.newFiles.splice(targetIndex_2, 1);
				}
				this.$apply();
			},
			previewImage: function previewImage(e) {

				wx.previewImage({
					current: e.currentTarget.id, // 当前显示图片的http链接
					urls: this.files // 需要预览的图片http链接列表
				});
			},
			bindInput: function bindInput(e) {
				this.noteForm[e.target.id] = e.detail.value;
			},
			saveNote: function saveNote(state) {
				var _this2 = this;

				return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
					var submitData, requestType, token;
					return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									if (!(_this2.newFiles.length != 0 || !!_this2.noteId && _this2.noteId.length == 0)) {
										_context.next = 3;
										break;
									}

									_context.next = 3;
									return _this2.uploadImgs(_this2.newFiles);

								case 3:
									if (!(_this2.noteForm.title.length == 0)) {
										_context.next = 6;
										break;
									}

									wx.showToast({
										title: "标题必填",
										duration: 3000
									});
									return _context.abrupt('return');

								case 6:

									console.log("xxasd", _this2.noteForm);
									submitData = {
										"title": _this2.noteForm.title,
										"images": _this2.images,
										"content": _this2.noteForm.content,
										"packageDetail": {
											"length": _this2.noteForm.length,
											"width": _this2.noteForm.width,
											"height": _this2.noteForm.height,
											"weight": _this2.noteForm.weight
										},
										state: state, //不填默认为10，表示私有状态，20表示分享状态
										"productCode": {
											"ean": _this2.noteForm.ean,
											"asin": _this2.noteForm.asin,
											"styleId": _this2.noteForm.styleId,
											"price": _this2.noteForm.price,
											"currency": _this2.money[_this2.index]
										},
										"location": [_this2.noteForm.location.longitude, _this2.noteForm.location.latitude] };

									//				console.log("submitData",submitData);
									requestType = 'add';
									//更新自己的笔记，复制笔记，新建笔记

									if (!!_this2.noteId && _this2.noteId.length != 0 && _this2.editType != 'copyNote') {
										//是更新笔记
										requestType = 'update';
										submitData.noteId = _this2.noteId;
									}

									//				if(this.editType=='copyNote'||this.editType=='updateNote'){
									//					submitData.tags=this.noteForm.tags;
									//				}else{
									//					submitData.tags=this.noteForm.tags.split(",");
									//				}

									submitData.tags = ('' + _this2.noteForm.tags).split(",");
									console.log("submitData.tags", submitData.tags);
									token = _this2.$parent.globalData.token;

									if (state == 20) {
										wx.showModal({
											title: '提示',
											content: '发布的内容将变为公开内容',
											success: function success(res) {
												if (res.confirm) {
													//保存
													wx.request({
														url: _common2.default.HostUrl + '/notes/' + requestType,
														data: submitData,
														method: "post",
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
												} else {
													return;
												}
											}
										});
									} else {
										//保存
										wx.request({
											url: _common2.default.HostUrl + '/notes/' + requestType,
											data: submitData,
											method: "post",
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

								case 14:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, _this2);
				}))();
			},

			//此方法弃用
			publicNote: function publicNote() {
				var that = this;
				var token = this.$parent.globalData.token;

				var params = {
					noteId: this.noteId
				};
				wx.request({
					url: _common2.default.HostUrl + '/notes/share',
					method: "post",
					header: {
						'content-type': 'application/json',
						'Authorization': 'Bearer ' + token
					},
					data: params,
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
						//				    that.initNoteForm(Common.eanCodeData.data);
						wx.request({
							url: _common2.default.HostUrl + '/notes/scan?ean=' + eanCode,
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
								} else if (results.data.data.length == 0) {
									that.noteForm.ean = eanCode;
									that.$apply();
								} else {
									that.initNoteForm(results.data.data);
								}
							}
						});
					}
				});
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(EditNote, [{
		key: 'switchChange',
		value: function switchChange(e) {
			console.log('switch1 发生 change 事件，携带值为', e.detail.value);
		}
	}, {
		key: 'getNoteDetail',
		value: function getNoteDetail() {
			var that = this;
			var token = this.$parent.globalData.token;

			wx.request({
				url: _common2.default.HostUrl + '/notes/detail/' + this.noteId,
				method: "get",
				header: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + token
				},
				success: function success(results) {
					//		            		console.log("results",results);
					;
					if (results.data.code != 0) {
						wx.showToast({
							title: results.data.message,
							duration: 3000
						});
					} else {
						console.log("resultsXX", results);
						var noteDetail = results.data.data;
						that.initNoteForm(noteDetail);
					}
				}
			});
		}
	}, {
		key: 'uploadImgs',
		value: function uploadImgs(imgArr) {
			var that = this;
			var countFlag = 0;
			return new Promise(function (resolve, reject) {
				imgArr.forEach(function (item) {

					wx.uploadFile({
						url: _common2.default.HostUrl + '/images/upload',
						filePath: item,
						name: 'image',
						header: {
							'Authorization': 'Bearer ' + that.token
						},
						success: function success(res) {
							countFlag++;
							var data = JSON.parse(res.data);
							that.images.push(data.data);
							console.log("countFlag", countFlag, "imgArr.length", imgArr.length);
							if (countFlag >= imgArr.length) {
								resolve();
							}
						}
					});
				});
			});
		}
	}, {
		key: 'initNoteForm',
		value: function initNoteForm(noteDetail) {
			this.noteForm = {
				title: noteDetail.title,
				tags: !!noteDetail.tags ? noteDetail.tags : '',
				content: noteDetail.content,
				ean: noteDetail.productCode.ean,
				styleId: noteDetail.productCode.styleId,
				asin: !!noteDetail.productCode.asin ? noteDetail.productCode.asin : '',
				price: noteDetail.productCode.price,
				length: undefined,
				width: undefined,
				height: undefined,
				weight: undefined,
				location: {
					latitude: null,
					longitude: null
				}
			};
			if (!!noteDetail.packageDetail) {
				this.noteForm.length = noteDetail.packageDetail.length;
				this.noteForm.width = noteDetail.packageDetail.width;
				this.noteForm.height = noteDetail.packageDetail.height;
				this.noteForm.weight = noteDetail.packageDetail.weight;
			}
			if (!!noteDetail.location) {
				this.location = {
					latitude: noteDetail.location[1],
					longitude: noteDetail.location[0]
				};
			}
			this.files = noteDetail.images;
			this.images = noteDetail.images;
			var moneyIndex = this.money.indexOf(noteDetail.productCode.currency);

			this.index = moneyIndex;
			this.$apply();
		}
	}, {
		key: 'onPullDownRefresh',
		value: function onPullDownRefresh() {
			wx.stopPullDownRefresh();
		}
	}, {
		key: 'onLoad',
		value: function onLoad(options) {
			this.noteForm = {
				title: '',
				tags: '',
				content: '',
				length: undefined,
				width: undefined,
				height: undefined,
				weight: undefined,
				ean: '',
				asin: '',
				price: '',
				styleId: '',
				location: {
					latitude: null,
					longitude: null
				}
			};
			this.noteId = options.noteId;
			this.editType = options.editType;
			this.files = [];
			this.newFiles = [];
			this.images = [];
			if (!!this.noteId && this.noteId.length != 0) {
				this.getNoteDetail();
			}
			if (options.editType == 'copyThirdNote') {
				//处理模板数据初始化
				var noteDetail = JSON.parse(options.noteData);
				noteDetail.productCode.price = null;
				noteDetail.productCode.currency = 'CNY';
				this.initNoteForm(noteDetail);
			}
			//扫码无模板时新建
			if (!!options.eanCode) {
				this.noteForm.ean = options.eanCode;
			}
			this.$apply();
			this.token = wx.getStorageSync('token');
		}
	}]);

	return EditNote;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(EditNote));
