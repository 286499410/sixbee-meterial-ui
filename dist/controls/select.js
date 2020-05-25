'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _dialog = require('../dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _table = require('../table');

var _table2 = _interopRequireDefault(_table);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectStyle = {
    wrapper: {},
    filter: { marginTop: 12, paddingLeft: 16, paddingRight: 16 }
};

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
            tableState: {},
            filterText: '',
            open: false,
            anchorEl: undefined
        };

        _this.setValue = function (value) {
            _this.state.value = value;
            if (_this.props.onChange) {
                _this.props.onChange(value, _this);
            }
            _this.forceUpdate();
        };

        _this.clearValue = function () {
            if (_this.props.multiple) {
                _this.setValue([]);
            } else {
                _this.setValue(null);
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

        _this.getFilterDataSource = function (data) {
            var dataSourceConfig = _this.props.dataSourceConfig;
            var dataSource = [];
            data.map(function (row) {
                var selectText = _lodash2.default.get(row, dataSourceConfig.searchText || dataSourceConfig.text);
                if (_this.props.hasFilter && _this.state.filterText !== '' && selectText.indexOf(_this.state.filterText) == -1) {
                    return;
                }
                dataSource.push(row);
                if (row.children && row.children.length > 0) {
                    var children = _this.getFilterDataSource(row.children);
                    dataSource = dataSource.concat(children);
                }
            });
            return dataSource;
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

        _this.handleClick = function (event) {
            if (!_this.props.disabled) {
                _this.setState({
                    open: true,
                    anchorEl: event.currentTarget
                });
            }
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

        _this.handleDelete = function (value) {
            return function (event) {
                var originValue = _this.state.value;
                if (_this.props.multiple) {
                    originValue.splice(_this.indexOf(value), 1);
                } else {
                    originValue = value;
                }
                _this.setValue(originValue);
            };
        };

        _this.handleStateChange = function (state) {
            var dataSource = _this.getFilterDataSource(_this.state.dataSource);
            var originValue = _lodash2.default.cloneDeep(_this.getValue());
            (0, _keys2.default)(state.checked || {}).map(function (id) {
                var data = _lodash2.default.find(dataSource, { id: parseInt(id) });
                var value = _lodash2.default.get(data, _this.props.dataSourceConfig.value);
                if (data && !_this.isChecked(value)) {
                    if (_this.props.carryKey) {
                        value = {};
                        _lodash2.default.set(value, _this.props.dataSourceConfig.value, data.value);
                    }
                    originValue.push(value);
                }
            });
            dataSource.map(function (data) {
                var value = _lodash2.default.get(data, _this.props.dataSourceConfig.value);
                if (!state.checked[data.id]) {
                    if (_this.isChecked(value)) {
                        originValue.splice(_this.indexOf(value, originValue), 1);
                    }
                }
            });
            _this.state.tableState = state;
            _this.setValue(originValue);
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
            if (props.hasOwnProperty('value')) {
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
        key: 'indexOf',
        value: function indexOf(value) {
            var _this3 = this;

            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.value;

            return _lodash2.default.findIndex(data, function (n) {
                return _this3.props.carryKey ? _lodash2.default.get(n, _this3.props.dataSourceConfig.value) == value : n == value;
            });
        }
    }, {
        key: 'isChecked',
        value: function isChecked(value) {
            if (this.props.multiple) {
                return this.indexOf(value) >= 0;
            } else {
                return this.state.value == value;
            }
        }
    }, {
        key: 'getSelectedText',
        value: function getSelectedText() {
            var _this4 = this;

            var selectedText = [];
            var value = this.getValue();
            var options = this.getAllOptions(this.state.dataSource, 1, this.props.indent || this.indent[this.props.size]);
            options.map(function (data) {
                if (_this4.props.multiple) {
                    if (value.indexOf(data.value) >= 0) {
                        selectedText.push(data.selectText || data.text);
                    }
                } else if (value === data.value) {
                    selectedText.push(data.selectText || data.text);
                }
            });
            return selectedText.join(',');
        }
    }, {
        key: 'getContent',
        value: function getContent() {
            var _this5 = this;

            var value = this.getValue();
            var styleProps = _lodash2.default.merge(_style2.default.getStyle('select', this.props), this.props.styleProps);
            var options = this.getOptions(this.state.dataSource, 1, this.props.indent || this.indent[this.props.size]);
            var menuWidth = this.state.anchorEl && this.props.fullWidth ? this.state.anchorEl.clientWidth : this.props.menuWidth;
            if (this.props.tableProps === undefined) {
                return _react2.default.createElement(
                    'div',
                    null,
                    this.props.hasFilter ? _react2.default.createElement(
                        'div',
                        { style: selectStyle.filter },
                        _react2.default.createElement(_TextField2.default, { hintText: '\u8F93\u5165\u5173\u952E\u5B57\u7B5B\u9009',
                            name: 'filterText',
                            fullWidth: true,
                            value: this.state.filterText,
                            autoComplete: "off",
                            onChange: this.handleFilter })
                    ) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'flex' },
                        _react2.default.createElement(
                            'div',
                            { style: { width: menuWidth } },
                            _react2.default.createElement(Options, {
                                dataSource: options,
                                styleProps: styleProps,
                                onChange: this.handleChange,
                                value: value,
                                defaultValue: this.props.defaultValue,
                                multiple: this.props.multiple,
                                carryKey: this.props.carryKey,
                                dataSourceConfig: this.props.dataSourceConfig,
                                cancel: this.props.cancel,
                                footer: this.props.footer,
                                context: this,
                                emptyTip: this.props.emptyTip
                            })
                        ),
                        this.props.hasFilter && this.props.multiple && _lodash2.default.isArray(value) && value.length > 0 ? _react2.default.createElement(
                            'div',
                            { style: { padding: '0 4px', width: menuWidth, minWidth: 160 } },
                            _react2.default.createElement(
                                'div',
                                { style: { marginBottom: 3 } },
                                '\u5DF2\u9009'
                            ),
                            _react2.default.createElement(
                                _reactCustomScrollbars.Scrollbars,
                                { style: { maxHeight: 400 }, autoHeight: true },
                                (value || []).map(function (value, index) {
                                    var data = _this5.getData(_this5.props.carryKey ? _lodash2.default.get(value, _this5.props.dataSourceConfig.value) : value);
                                    return _react2.default.createElement(
                                        'div',
                                        { key: index, className: 'tag tag-default flex middle between',
                                            style: { marginRight: 4, marginBottom: 4 } },
                                        _react2.default.createElement(
                                            'div',
                                            { style: { marginRight: 12 },
                                                className: 'text-ellipsis' },
                                            _lodash2.default.get(data, _this5.props.dataSourceConfig.text)
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'cursor-pointer', onClick: _this5.handleDelete(value) },
                                            _react2.default.createElement('i', {
                                                className: 'iconfont icon-close text-small' })
                                        )
                                    );
                                })
                            )
                        ) : null
                    )
                );
            } else {
                var checked = {};
                var dataSource = this.getFilterDataSource(this.state.dataSource);
                dataSource.map(function (data) {
                    var value = _lodash2.default.get(data, _this5.props.dataSourceConfig.value);
                    if (_this5.isChecked(value)) {
                        checked[data.id] = true;
                    }
                });
                return _react2.default.createElement(
                    'div',
                    { className: 'relative space' },
                    _react2.default.createElement(
                        'div',
                        { className: 'flex' },
                        _react2.default.createElement(
                            'div',
                            null,
                            this.props.hasFilter ? _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(_TextField2.default, { hintText: '\u8F93\u5165\u5173\u952E\u5B57\u7B5B\u9009',
                                    name: 'filterText',
                                    fullWidth: true,
                                    value: this.state.filterText,
                                    autoComplete: "off",
                                    onChange: this.handleFilter })
                            ) : null,
                            _react2.default.createElement(_table2.default, (0, _extends3.default)({
                                containerHeight: 300
                            }, this.props.tableProps, {
                                dataSource: dataSource
                            }, this.state.tableState, {
                                checked: checked,
                                onStateChange: this.handleStateChange
                            }))
                        ),
                        _react2.default.createElement(
                            'div',
                            { style: { paddingLeft: 12, width: menuWidth, minWidth: 160 } },
                            _react2.default.createElement(
                                'div',
                                { className: 'flex between', style: { marginBottom: 10, marginTop: 20 } },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    '\u5DF2\u9009'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'text-primary cursor-pointer', onClick: this.clearValue },
                                    '\u5168\u4E0D\u9009'
                                )
                            ),
                            _react2.default.createElement(
                                _reactCustomScrollbars.Scrollbars,
                                { style: { maxHeight: 400 }, autoHeight: true },
                                (value || []).map(function (value, index) {
                                    var data = _this5.getData(_this5.props.carryKey ? _lodash2.default.get(value, _this5.props.dataSourceConfig.value) : value);
                                    return _react2.default.createElement(
                                        'div',
                                        { key: index, className: 'tag tag-default flex middle between',
                                            style: { marginRight: 4, marginBottom: 4 } },
                                        _react2.default.createElement(
                                            'div',
                                            { style: { marginRight: 12 },
                                                className: 'text-ellipsis' },
                                            _lodash2.default.get(data, _this5.props.dataSourceConfig.text)
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'cursor-pointer', onClick: _this5.handleDelete(value) },
                                            _react2.default.createElement('i', { className: 'iconfont icon-close text-small' })
                                        )
                                    );
                                })
                            )
                        )
                    ),
                    _react2.default.createElement('div', { style: { height: 52 } }),
                    _react2.default.createElement(
                        'div',
                        { className: 'bg-white space',
                            style: {
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                textAlign: 'right',
                                boxShadow: '0 -1px 5px #ddd',
                                zIndex: 2
                            } },
                        _react2.default.createElement(_button2.default, { type: 'primary', label: '\u786E\u5B9A', onClick: this.handleRequestClose })
                    )
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var borderStyle = this.props.borderStyle || this.context.muiTheme.controlBorderStyle || 'underline';
            var value = this.getValue();
            var styleProps = _lodash2.default.merge(_style2.default.getStyle('select', this.props), this.props.styleProps);
            var label = this.props.label;
            var selectValue = this.props.multiple && this.props.carryKey ? (value || []).map(function (n) {
                return _lodash2.default.get(n, _this6.props.dataSourceConfig.value);
            }) : value;
            var selectField = void 0;
            if (borderStyle !== 'underline') {
                selectField = _react2.default.createElement(
                    'div',
                    { className: "flex middle between full-width" + (this.props.disabled ? ' text-disabled' : '') },
                    _react2.default.createElement(
                        'div',
                        { style: { textAlign: this.props.textAlign || 'left', flexGrow: 1 } },
                        this.getSelectedText()
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: { width: 16, textAlign: 'right' } },
                        _react2.default.createElement('i', { className: 'iconfont icon-caret-down', style: { fontSize: 12, color: 'rgba(0,0,0,0.3)' } })
                    )
                );
            } else {
                selectField = _react2.default.createElement(
                    _SelectField2.default,
                    (0, _extends3.default)({ value: selectValue,
                        name: this.props.name || this.props.dataKey || _utils2.default.uuid(),
                        floatingLabelText: label,
                        multiple: this.props.multiple,
                        fullWidth: this.props.fullWidth,
                        disabled: this.props.disabled,
                        hintText: this.props.hintText,
                        errorText: borderStyle === "underline" ? this.props.errorText : undefined,
                        floatingLabelFixed: this.props.labelFixed,
                        underlineShow: borderStyle === 'underline' && this.props.borderShow
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
                );
            }
            var content = this.getContent();
            return _react2.default.createElement(
                'div',
                { className: 'flex middle relative', style: (0, _extends3.default)({ overflow: 'hidden' }, this.props.style, this.props.rootStyle) },
                _react2.default.createElement(
                    'div',
                    { style: { flexGrow: 1 },
                        className: "relative" + (this.props.disabled ? ' text-disabled' : ' cursor-pointer'),
                        onClick: this.handleClick },
                    borderStyle === 'border' && this.props.borderShow ? _react2.default.createElement(
                        'div',
                        { className: 'full-width' },
                        _react2.default.createElement(
                            'div',
                            {
                                className: "control-border" + (this.state.focus || this.state.open ? ' focus' : '') + (this.props.errorText ? ' error' : '') },
                            selectField
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text-small text-danger', style: { marginTop: 2 } },
                            this.props.errorText
                        )
                    ) : _react2.default.createElement(
                        'div',
                        null,
                        selectField,
                        _react2.default.createElement('div', { className: 'full-screen' })
                    )
                ),
                this.props.events ? _react2.default.createElement(
                    'div',
                    { style: {
                            position: 'relative',
                            top: borderStyle === "underline" ? 18 : 0,
                            paddingLeft: 6,
                            width: this.props.events.length * 20 + 6,
                            paddingBottom: 1,
                            height: 30
                        },
                        className: 'flex middle center' },
                    this.props.events.map(function (event) {
                        return _react2.default.createElement(_IconButton2.default, { iconStyle: (0, _extends3.default)({ color: '#aaa', fontSize: 20 }, event.iconStyle),
                            title: event.title,
                            key: event.icon,
                            iconClassName: "iconfont icon-" + event.icon,
                            onClick: event.onClick.bind(_this6, _this6),
                            style: event.style
                        });
                    })
                ) : null,
                this.props.mode == 'inline' ? _react2.default.createElement(
                    _Popover2.default,
                    {
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        anchorOrigin: { horizontal: "left", vertical: "bottom" },
                        targetOrigin: { horizontal: "left", vertical: "top" },
                        onRequestClose: this.handleRequestClose },
                    content
                ) : this.state.open ? _react2.default.createElement(
                    _dialog2.default,
                    {
                        title: label,
                        open: this.state.open,
                        modal: true,
                        onClose: this.handleRequestClose },
                    content
                ) : null
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
    cancel: false,
    menuWidth: 'auto',
    mode: 'inline',
    tableProps: undefined,
    footer: undefined,
    emptyTip: '没有数据'
};
Select.contextTypes = {
    muiTheme: _propTypes2.default.object
};
exports.default = Select;

var Options = function (_Component2) {
    (0, _inherits3.default)(Options, _Component2);

    function Options(props) {
        (0, _classCallCheck3.default)(this, Options);

        var _this7 = (0, _possibleConstructorReturn3.default)(this, (Options.__proto__ || (0, _getPrototypeOf2.default)(Options)).call(this, props));

        _this7.state = {};

        _this7.handleItemClick = function (event, menuItem, index) {
            var data = _this7.props.dataSource[index];
            if (data) {
                var value = data.value,
                    originValue = _this7.props.value || [];
                if (_this7.props.multiple) {
                    if (_this7.isChecked(value)) {
                        originValue.splice(_this7.indexOf(value), 1);
                    } else {
                        if (_this7.props.carryKey) {
                            value = {};
                            _lodash2.default.set(value, _this7.props.dataSourceConfig.value, data.value);
                        }
                        originValue.push(value);
                    }
                } else {
                    originValue = value;
                }
                if (_this7.props.onChange) {
                    _this7.props.onChange(originValue);
                }
            } else {
                if (_this7.props.onChange) {
                    _this7.props.onChange(_this7.props.multiple ? [] : null);
                }
            }
        };

        return _this7;
    }

    (0, _createClass3.default)(Options, [{
        key: 'indexOf',
        value: function indexOf(value) {
            var _this8 = this;

            return _lodash2.default.findIndex(this.props.value, function (n) {
                return _this8.props.carryKey ? _lodash2.default.get(n, _this8.props.dataSourceConfig.value) == value : n == value;
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
            var _this9 = this;

            return _react2.default.createElement(
                'div',
                null,
                this.props.dataSource.length > 0 ? _react2.default.createElement(
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
                            if (_this9.isChecked(option.value)) {
                                style.color = '#FF0099';
                            }
                            return _react2.default.createElement(_MenuItem2.default, { key: index,
                                value: option.value,
                                label: option.text,
                                primaryText: option.selectText || option.label,
                                disabled: option.disabled,
                                innerDivStyle: _this9.props.styleProps.menuItemStyle.innerDivStyle,
                                style: style
                            });
                        }),
                        this.props.cancel ? _react2.default.createElement(_MenuItem2.default, { value: null,
                            primaryText: "取消选择",
                            innerDivStyle: this.props.styleProps.menuItemStyle.innerDivStyle,
                            style: { color: '#9b9b9b' }
                        }) : null
                    )
                ) : _react2.default.createElement(
                    'div',
                    { className: 'space-small text-muted' },
                    this.props.emptyTip
                ),
                this.props.footer ? _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_Divider2.default, null),
                    _react2.default.createElement(
                        'div',
                        { className: 'flex center middle text-primary hover-bg border-top cursor-pointer relative',
                            style: { height: 40 },
                            onClick: function onClick() {
                                _this9.props.context.setState({ open: false });
                                _this9.props.footer.onClick(_this9.props.context);
                            } },
                        _react2.default.createElement(_icon2.default, { name: this.props.footer.icon }),
                        _react2.default.createElement(
                            'div',
                            null,
                            this.props.footer.title
                        )
                    )
                ) : null
            );
        }
    }]);
    return Options;
}(_react.Component);