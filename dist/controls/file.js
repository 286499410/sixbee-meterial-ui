'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _LinearProgress = require('material-ui/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var File = function (_Component) {
    (0, _inherits3.default)(File, _Component);

    function File(props) {
        (0, _classCallCheck3.default)(this, File);

        var _this = (0, _possibleConstructorReturn3.default)(this, (File.__proto__ || (0, _getPrototypeOf2.default)(File)).call(this, props));

        _this.state = {
            file: {},
            progress: undefined
        };

        _this.handleChange = function (event) {
            var file = _this.refs.file.files[0];
            var extName = _this.getFileExtName(file.name);
            if (_this.props.accept && _this.props.accept.indexOf('.' + extName) == -1) {
                alert('请选择正确的文件类型：' + _this.props.accept);
                return false;
            }
            _this.setState({ file: file, progress: undefined });
            if (_this.props.uploader) {
                var xhr = new XMLHttpRequest();
                var fd = new FormData();
                fd.append(_this.props.uploader.key || 'file', file);
                if (_this.props.uploader.append) {
                    _this.props.uploader.append(fd);
                }
                xhr.open(_this.props.uploader.method || 'POST', _this.props.uploader.url);
                if (_this.props.uploader.header) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(_this.props.uploader.header)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
                                key = _step$value[0],
                                value = _step$value[1];

                            xhr.setRequestHeader(key, value);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
                xhr.upload.onprogress = function (event) {
                    if (event.lengthComputable) {
                        _this.setState({
                            progress: {
                                loaded: event.loaded,
                                total: event.total
                            }
                        });
                    }
                };
                xhr.onload = function (event) {
                    if (event.target.status == 200) {
                        if (_this.props.uploader.success) {
                            _this.props.uploader.success(event.target.responseText, _this);
                        }
                    } else {
                        if (_this.props.uploader.error) {
                            _this.props.uploader.error(event);
                        }
                    }
                };
                xhr.onerror = function (event) {
                    if (_this.props.uploader.error) {
                        _this.props.uploader.error(event);
                    }
                };
                xhr.send(fd);
            } else {
                _this.setValue(file);
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
            if (props.hasOwnProperty('value')) {
                this.state.value = props.value;
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            if (this.props.onChange) {
                this.props.onChange(value, this);
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
                    'div',
                    { className: 'flex middle' },
                    _react2.default.createElement(
                        _RaisedButton2.default,
                        {
                            label: this.props.label,
                            labelPosition: 'before',
                            containerElement: 'label',
                            style: { position: 'relative' }, buttonStyle: this.props.buttonStyle,
                            labelStyle: this.props.labelStyle
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
                        { style: { paddingLeft: 12 } },
                        this.state.file.name
                    )
                ),
                this.props.uploader && this.state.progress !== undefined ? _react2.default.createElement(
                    'div',
                    { style: { marginTop: 8 } },
                    _react2.default.createElement(_LinearProgress2.default, { mode: 'determinate', value: this.state.progress.loaded,
                        max: this.state.progress.total })
                ) : null,
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