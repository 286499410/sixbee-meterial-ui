'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _qiniuJs = require('qiniu-js');

var Qiniu = _interopRequireWildcard(_qiniuJs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QiniuUploader = function (_Component) {
    (0, _inherits3.default)(QiniuUploader, _Component);

    function QiniuUploader(props) {
        (0, _classCallCheck3.default)(this, QiniuUploader);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (QiniuUploader.__proto__ || (0, _getPrototypeOf2.default)(QiniuUploader)).call(this, props));

        _this2.state = {
            putExtra: {
                fname: "",
                params: {},
                mimeType: ["image/png", "image/jpeg", "image/gif"]
            },
            config: {
                useCdnDomain: true,
                region: Qiniu.region.z0
            }
        };

        _this2.handleClick = function (event) {
            _this2.refs.file.click();
        };

        _this2.handleChange = function (event) {
            var file = event.target.files[0];
            var fileReader = new FileReader();
            var _this = _this2;
            fileReader.onload = function () {
                var blob = _this.convertBase64UrlToBlob(this.result, file.type);
                _this.handleUpload(blob);
            };
            fileReader.readAsDataURL(file);
        };

        _this2.convertBase64UrlToBlob = function (urlData, filetype) {
            var bytes = window.atob(urlData.split(',')[1]);

            var ab = new ArrayBuffer(bytes.length);
            var ia = new Int8Array(ab);
            var i;
            for (i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            return new Blob([ab], { type: filetype });
        };

        _this2.handleUpload = function (blob) {
            var putExtra = {
                fname: _this2.props.fname,
                params: _this2.props.params,
                mimeType: _this2.props.mimeType
            };
            var config = {
                useCdnDomain: _this2.props.useCdnDomain,
                region: _this2.props.region
            };
            var observable = Qiniu.upload(blob, null, _this2.props.token, putExtra, config);

            var subscription = observable.subscribe(function (res) {
                console.log(res);
            }, function (res) {
                if (_this2.props.onError) {
                    _this2.props.onError(res);
                }
            }, function (res) {
                if (_this2.props.onComplete) {
                    _this2.props.onComplete(res);
                }
            });
        };

        _this2.initData(props);
        return _this2;
    }

    (0, _createClass3.default)(QiniuUploader, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: { display: 'inline-block' } },
                _react2.default.createElement('input', { ref: 'file', type: 'file', style: { display: 'none' }, onChange: this.handleChange }),
                _react2.default.createElement(
                    'div',
                    { style: { display: 'inline-block' }, onClick: this.handleClick },
                    this.props.children
                )
            );
        }
    }]);
    return QiniuUploader;
}(_react.Component);

QiniuUploader.defaultProps = {
    token: "",

    fname: "",
    params: {},
    mimeType: ["image/png", "image/jpeg", "image/gif"],

    useCdnDomain: true,
    region: Qiniu.region.z0
};
exports.default = QiniuUploader;