'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import abc from 'abc';

var MapLocation = function (_wepy$component) {
				_inherits(MapLocation, _wepy$component);

				function MapLocation() {
								var _ref;

								var _temp, _this, _ret;

								_classCallCheck(this, MapLocation);

								for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
												args[_key] = arguments[_key];
								}

								return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MapLocation.__proto__ || Object.getPrototypeOf(MapLocation)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
												location: {
																type: Object,
																default: {
																				latitude: 39.915599,
																				longitude: 116.404844
																}
												}
								}, _this.data = {

												markers: [{
																iconPath: "http://7xuuaz.com1.z0.glb.clouddn.com/location.png",
																id: 0,
																latitude: 39.915599,
																longitude: 116.404844,
																width: 30,
																height: 30
												}],
												controls: [{
																id: 1,
																iconPath: '/resources/location.png',
																position: {
																				left: 0,
																				top: 300 - 50,
																				width: 50,
																				height: 50
																},
																clickable: true
												}]
								}, _this.methods = {
												regionchange: function regionchange(e) {
																console.log(e.type);
												},
												markertap: function markertap(e) {
																console.log(e.markerId);
												},
												controltap: function controltap(e) {
																console.log(e.controlId);
												}
								}, _this.events = {
												//监听事件
												'get-location': function getLocation($location) {
																//	        		console.log("$location",$location);
																_this.location = $location;
																_this.markers[0].location = $location;
												}
								}, _temp), _possibleConstructorReturn(_this, _ret);
				}

				_createClass(MapLocation, [{
								key: 'onLoad',
								value: function onLoad() {
												console.log("this.location", this.location);
								}
				}]);

				return MapLocation;
}(_wepy2.default.component);

exports.default = MapLocation;