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

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Popover = require('material-ui/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _Menu = require('material-ui/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _reactCustomScrollbars = require('react-custom-scrollbars');

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function (_Component) {
    (0, _inherits3.default)(Select, _Component);

    function Select(props) {
        (0, _classCallCheck3.default)(this, Select);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call(this, props));

        _this.indent = {
            small: 24,
            default: 28,
            large: 32
        };
        _this.state = {
            value: undefined,
            dataSource: [],
            filterText: '',
            open: false,
            anchorEl: undefined
        };

        _this.setValue = function (value) {
            _this.setState({ value: value });
            if (_this.props.onChange) {
                _this.props.onChange(value, _this);
            }
        };

        _this.setDataSource = function () {
            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.dataSource;

            _utils2.default.getDataSource(undefined, dataSource, _this.props.dataSourceConfig, _this).then(function (dataSource) {
                _this.setState({ dataSource: dataSource });
            });
        };

        _this.getOptions = function (data) {
            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var indent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var dataSourceConfig = _this.props.dataSourceConfig;
            var options = [];
            data.map(function (row) {
                var selectText = _lodash2.default.get(row, dataSourceConfig.searchText || dataSourceConfig.text);
                if (_this.props.hasFilter && _this.state.filterText !== '' && selectText.indexOf(_this.state.filterText) == -1) {
                    return;
                }
                options.push({
                    text: _lodash2.default.get(row, dataSourceConfig.text),
                    value: row[dataSourceConfig.value],
                    selectText: selectText,
                    indent: (level - 1) * indent,
                    disabled: row.disabled
                });
                if (row.children && row.children.length > 0) {
                    var children = _this.getOptions(row.children, level + 1, indent);
                    options = options.concat(children);
                }
            });
            return options;
        };

        _this.getAllOptions = function (data) {
            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var indent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var dataSourceConfig = _this.props.dataSourceConfig;
            var options = [];
            data.map(function (row) {
                var selectText = _lodash2.default.get(row, dataSourceConfig.searchText || dataSourceConfig.text);
                options.push({
                    text: _lodash2.default.get(row, dataSourceConfig.text),
                    value: row[dataSourceConfig.value],
                    selectText: selectText,
                    indent: (level - 1) * indent,
                    disabled: row.disabled
                });
                if (row.children && row.children.length > 0) {
                    var children = _this.getOptions(row.children, level + 1, indent);
                    options = options.concat(children);
                }
            });
            return options;
        };

        _this.handleChange = function (data) {
            if (_this.props.multiple === false) {
                _this.state.open = false;
            }
            _this.setValue(data);
        };

        _this.handleFilter = function (event) {
            _this.state.filterText = event.target.value;
            _this.setState({ filterText: event.target.value });
        };

        _this.handleRequestClose = function () {
            _this.setState({ open: false });
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Select, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            this.setDataSource(props.dataSource);
            if (props.value !== undefined) {
                this.state.value = props.value;
            }
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            var value = this.state.value === undefined ? this.props.defaultValue : this.state.value;
            return value === undefined ? this.props.multiple ? [] : undefined : value;
        }
    }, {
        key: 'getData',
        value: function getData(value) {
            var _this2 = this;

            var index = _lodash2.default.findIndex(this.state.dataSource, function (o) {
                return _lodash2.default.get(o, _this2.props.dataSourceConfig.value) == value;
            });
            return index >= 0 ? this.state.dataSource[index] : undefined;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var value = this.getValue();
            var styleProps = _lodash2.default.merge(_style2.default.getStyle('select', this.props), this.props.styleProps);
            var label = this.props.label;
            var options = this.getOptions(this.state.dataSource, 1, this.props.indent || this.indent[this.props.size]);
            var selectValue = this.props.multiple && this.props.carryKey ? (value || []).map(function (n) {
                return _lodash2.default.get(n, _this3.props.dataSourceConfig.value);
            }) : value;
            return _react2.default.createElement(
                'div',
                { className: 'relative', style: (0, _extends3.default)({ overflow: 'hidden' }, this.props.style) },
                _react2.default.createElement(
                    'div',
                    { className: 'relative cursor-pointer', onClick: function onClick(event) {
                            if (!_this3.props.disabled) {
                                _this3.setState({
                                    open: true,
                                    anchorEl: event.currentTarget
                                });
                            }
                        } },
                    _react2.default.createElement(
                        _SelectField2.default,
                        (0, _extends3.default)({ value: selectValue,
                            name: this.props.name || this.props.dataKey || _utils2.default.uuid(),
                            floatingLabelText: label,
                            multiple: this.props.multiple,
                            fullWidth: this.props.fullWidth,
                            disabled: this.props.disabled,
                            hintText: this.props.hintText,
                            errorText: this.props.errorText,
                            floatingLabelFixed: this.props.labelFixed,
                            underlineShow: this.props.borderShow
                        }, styleProps),
                        this.getAllOptions(this.state.dataSource, 1, this.props.indent || this.indent[this.props.size]).map(function (option, index) {
                            return _react2.default.createElement(_MenuItem2.default, { key: index,
                                value: option.value,
                                label: option.text,
                                primaryText: option.selectText || option.label,
                                disabled: option.disabled,
                                innerDivStyle: styleProps.menuItemStyle.innerDivStyle,
                                style: { textIndent: option.indent }
                            });
                        })
                    ),
                    _react2.default.createElement('div', { className: 'full-screen' })
                ),
                _react2.default.createElement(
                    _Popover2.default,
                    {
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        anchorOrigin: { horizontal: "left", vertical: "bottom" },
                        targetOrigin: { horizontal: "left", vertical: "top" },
                        style: { width: this.state.anchorEl ? this.state.anchorEl.clientWidth : 'auto' },
                        onRequestClose: this.handleRequestClose },
                    this.props.hasFilter ? _react2.default.createElement(
                        'div',
                        { style: { marginTop: 12, paddingLeft: 16, paddingRight: 16 } },
                        _react2.default.createElement(_TextField2.default, { hintText: '\u8F93\u5165\u5173\u952E\u5B57\u7B5B\u9009', name: 'filterText', fullWidth: true, value: this.state.filterText,
                            onChange: this.handleFilter })
                    ) : null,
                    _react2.default.createElement(Options, {
                        dataSource: options,
                        styleProps: styleProps,
                        onChange: this.handleChange,
                        value: value,
                        multiple: this.props.multiple,
                        carryKey: this.props.carryKey,
                        dataSourceConfig: this.props.dataSourceConfig,
                        cancel: this.props.cancel
                    })
                )
            );
        }
    }]);
    return Select;
}(_react.Component);

Select.defaultProps = {
    borderShow: true,
    openOnFocus: true,
    hasClear: true,
    labelFixed: false,
    disabled: false,
    immutable: false,
    dataSourceConfig: { text: 'text', value: 'value' },
    hasFilter: false,
    reloadDataSource: false,
    dataSource: [],
    hintText: undefined,
    errorText: undefined,
    maxSearchResults: undefined,
    multiple: false,
    carryKey: true,
    rows: 1,
    fullWidth: true,
    size: 'default',
    cancel: false };
exports.default = Select;

var Options = function (_Component2) {
    (0, _inherits3.default)(Options, _Component2);

    function Options(props) {
        (0, _classCallCheck3.default)(this, Options);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (Options.__proto__ || (0, _getPrototypeOf2.default)(Options)).call(this, props));

        _this4.state = {};

        _this4.handleItemClick = function (event, menuItem, index) {
            var data = _this4.props.dataSource[index];
            if (data) {
                var value = data.value,
                    originValue = _this4.props.value || [];
                if (_this4.props.multiple) {
                    if (_this4.isChecked(value)) {
                        originValue.splice(_this4.indexOf(value), 1);
                    } else {
                        if (_this4.props.carryKey) {
                            value = {};
                            _lodash2.default.set(value, _this4.props.dataSourceConfig.value, data.value);
                        }
                        originValue.push(value);
                    }
                } else {
                    originValue = value;
                }
                if (_this4.props.onChange) {
                    _this4.props.onChange(originValue);
                }
            } else {
                if (_this4.props.onChange) {
                    _this4.props.onChange(_this4.props.multiple ? [] : null);
                }
            }
        };

        return _this4;
    }

    (0, _createClass3.default)(Options, [{
        key: 'indexOf',
        value: function indexOf(value) {
            var _this5 = this;

            return _lodash2.default.findIndex(this.props.value, function (n) {
                return _this5.props.carryKey ? _lodash2.default.get(n, _this5.props.dataSourceConfig.value) == value : n == value;
            });
        }
    }, {
        key: 'isChecked',
        value: function isChecked(value) {
            if (this.props.multiple) {
                return this.indexOf(value) >= 0;
            } else {
                return this.props.value == value;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            return _react2.default.createElement(
                _reactCustomScrollbars.Scrollbars,
                { style: { maxHeight: 300 }, autoHeight: true },
                _react2.default.createElement(
                    _Menu2.default,
                    { style: this.props.styleProps.dropDownMenuProps,
                        listStyle: this.props.styleProps.listStyle,
                        menuItemStyle: this.props.styleProps.menuItemStyle,
                        disableAutoFocus: true,
                        onItemClick: this.handleItemClick },
                    this.props.dataSource.map(function (option, index) {
                        var style = { textIndent: option.indent };
                        if (_this6.isChecked(option.value)) {
                            style.color = '#FF0099';
                        }
                        return _react2.default.createElement(_MenuItem2.default, { key: index,
                            value: option.value,
                            label: option.text,
                            primaryText: option.selectText || option.label,
                            disabled: option.disabled,
                            innerDivStyle: _this6.props.styleProps.menuItemStyle.innerDivStyle,
                            style: style
                        });
                    }),
                    this.props.cancel ? _react2.default.createElement(_MenuItem2.default, { value: null,
                        primaryText: "取消选择",
                        innerDivStyle: this.props.styleProps.menuItemStyle.innerDivStyle,
                        style: { color: '#9b9b9b' }
                    }) : null
                )
            );
        }
    }]);
    return Options;
}(_react.Component);