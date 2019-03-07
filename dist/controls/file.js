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

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var File = function (_Component) {
    (0, _inherits3.default)(File, _Component);

    function File(props) {
        (0, _classCallCheck3.default)(this, File);

        var _this = (0, _possibleConstructorReturn3.default)(this, (File.__proto__ || (0, _getPrototypeOf2.default)(File)).call(this, props));

        _this.state = {
            file: {}
        };

        _this.handleChange = function (event) {
            var file = _this.refs.file.files[0];
            var extName = _this.getFileExtName(file.name);
            if (_this.props.accept && _this.props.accept.indexOf('.' + extName) == -1) {
                alert('请选择正确的文件类型：' + _this.props.accept);
                return false;
            }
            _this.setState({ file: file });
            if (_this.props.onChange) {
                _this.props.onChange(file, _this);
            }
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(File, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (props.value !== undefined) {
                this.state.value = props.value;
            }
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
            return _react2.default.createElement(
                'div',
                { style: { padding: '8px 0' } },
                _react2.default.createElement(
                    _RaisedButton2.default,
                    {
                        label: this.props.label,
                        labelPosition: 'before',
                        containerElement: 'label',
                        style: { position: 'relative' }, buttonStyle: this.props.buttonStyle, labelStyle: this.props.labelStyle
                    },
                    _react2.default.createElement('input', { key: 'file',
                        ref: 'file',
                        type: 'file',
                        style: {
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
                ),
                _react2.default.createElement(
                    'div',
                    { style: { padding: 4 } },
                    this.state.file.name
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'text-danger' },
                    this.props.errorText
                )
            );
        }
    }]);
    return File;
}(_react.Component);

File.defaultProps = {
    label: '选择上传文件'
};
exports.default = File;