'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = function (_Component) {
    (0, _inherits3.default)(Image, _Component);

    function Image(props) {
        (0, _classCallCheck3.default)(this, Image);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Image.__proto__ || (0, _getPrototypeOf2.default)(Image)).call(this, props));

        _this.state = {
            file: [],
            value: undefined,
            imageStyle: {}
        };

        _this.handleChange = function (event) {
            var file = _this.refs.file.files[0];
            var extName = _this.getFileExtName(file.name);
            if (_this.props.accept && _this.props.accept.indexOf('.' + extName) == -1) {
                if (_this.props.onError) {
                    _this.props.onError('请选择正确的文件类型：' + _this.props.accept);
                }
                return false;
            }

            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function () {
                _this.setState({ value: fileReader.result });
            };

            _this.setState({ file: file });
            if (_this.props.onChange) {
                _this.props.onChange(file, _this);
            }
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Image, [{
        key: 'initData',
        value: function initData(props) {
            var _this2 = this;

            if (props.value !== undefined) {
                if (_lodash2.default.isString(props.value)) {
                    this.state.value = props.value;
                } else if (_lodash2.default.isObject(props.value)) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(props.value);
                    fileReader.onload = function () {
                        _this2.setState({ value: fileReader.result });
                    };
                }
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'isBase64OrUrl',
        value: function isBase64OrUrl(str) {
            return _lodash2.default.isString(str) ? str.substr(0, 4) === 'http' || str.substr(0, 10) === 'data:image' : false;
        }
    }, {
        key: 'getFileExtName',
        value: function getFileExtName() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.file.name;

            return name.substring(name.lastIndexOf(".") + 1, name.length);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var min = Math.min(this.props.width, this.props.height);
            return _react2.default.createElement(
                'div',
                { style: { marginBottom: 6, marginTop: 6 } },
                this.props.label ? _react2.default.createElement(
                    'div',
                    { style: {
                            transform: 'scale(0.75)',
                            transformOrigin: 'left top 0px',
                            color: 'rgba(0,0,0,0.3)',
                            fontSize: 15,
                            marginBottom: 4,
                            marginTop: 12,
                            display: 'inline-block'
                        } },
                    this.props.label
                ) : null,
                _react2.default.createElement(
                    'div',
                    { className: 'relative hover', style: (0, _extends3.default)({
                            width: this.props.width,
                            height: this.props.height,
                            border: '1px dashed rgba(0,0,0,0.3)',
                            borderRadius: 10,
                            overflow: 'hidden' }, this.props.style) },
                    this.state.value ? _react2.default.createElement(
                        'div',
                        { className: 'hover-show', style: {
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.3)',
                                width: '100%'
                            } },
                        _react2.default.createElement(
                            'div',
                            { className: 'flex center middle', style: { height: '100%', color: '#fff' } },
                            '\u70B9\u51FB\u9009\u62E9'
                        )
                    ) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'flex center middle', style: { height: '100%' } },
                        this.state.value ? _react2.default.createElement('img', { ref: 'img', style: this.state.imageStyle,
                            src: this.isBase64OrUrl(this.state.value) ? this.state.value : this.props.documentRoot + this.state.value,
                            onLoad: function onLoad() {
                                var width = _this3.refs.img.clientWidth;
                                var height = _this3.refs.img.clientHeight;
                                var radio = height / width;
                                var propsRadio = _this3.props.height / _this3.props.width;
                                if (radio >= propsRadio) {
                                    _this3.setState({ imageStyle: { width: '100%' } });
                                } else if (radio < propsRadio) {
                                    _this3.setState({ imageStyle: { height: '100%' } });
                                }
                            } }) : _react2.default.createElement(_icon2.default, { name: 'plus', size: min / 2, color: "rgba(0,0,0,0.3)" })
                    ),
                    _react2.default.createElement('input', { key: 'file',
                        ref: 'file',
                        type: 'file',
                        style: {
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            opacity: 0,
                            zIndex: 1,
                            cursor: 'pointer'
                        },
                        accept: this.props.accept,
                        onChange: this.handleChange })
                )
            );
        }
    }]);
    return Image;
}(_react.Component);

Image.defaultProps = {
    documentRoot: '',
    width: 100,
    height: 100,
    accept: '.jpg,.jpeg,.png,.gif'
};
exports.default = Image;