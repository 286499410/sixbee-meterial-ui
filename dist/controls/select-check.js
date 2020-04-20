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

var _checkbox = require('./checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

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

        _this.setDataSource = function () {
            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.dataSource;

            _utils2.default.getDataSource(undefined, dataSource, _this.props.dataSourceConfig, _this).then(function (dataSource) {
                _this.setState({ dataSource: dataSource });
            });
        };

        _this.handleClick = function (event) {
            if (!_this.props.disabled) {
                _this.setState({
                    open: true,
                    anchorEl: event.currentTarget
                });
            }
        };

        _this.handleRequestClose = function () {
            _this.setState({ open: false });
        };

        _this.handleDelete = function (value) {
            return function (event) {
                var originValue = _this.state.value;
                originValue.splice(_this.indexOf(value), 1);
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

        _this.handleCheck = function (value) {
            return function (isChecked) {
                var values = _this.getValue();
                var index = values.indexOf(value);
                if (isChecked) {
                    if (index < 0) {
                        values.push(value);
                    }
                } else {
                    if (index >= 0) {
                        values.splice(index, 1);
                    }
                }
                _this.setValue(values.length == 0 ? null : values);
            };
        };

        _this.handleCheckAll = function (event) {
            var values = [];
            _this.state.dataSource.map(function (data) {
                var value = _lodash2.default.get(data, _this.props.dataSourceConfig.value);
                values.push(value);
            });
            _this.setValue(values);
        };

        _this.handleUnCheckAll = function (event) {
            _this.setValue(null);
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
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (_lodash2.default.isEqual(this.state, nextState) && _lodash2.default.isEqual(this.props, nextProps)) {
                return false;
            }
            return true;
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
            return value === undefined || value === null ? [] : value;
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
            var _this3 = this;

            var selectedText = [];
            var values = this.getValue();
            this.state.dataSource.map(function (data) {
                var text = _lodash2.default.get(data, _this3.props.dataSourceConfig.text);
                var value = _lodash2.default.get(data, _this3.props.dataSourceConfig.value);
                if (values.indexOf(value) >= 0) {
                    selectedText.push(text);
                }
            });
            return selectedText.join(',');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var borderStyle = this.props.borderStyle || this.context.muiTheme.controlBorderStyle || 'underline';
            var values = this.getValue();
            var content = _react2.default.createElement(
                'div',
                { className: "flex middle between full-width" + (this.props.disabled ? ' text-disabled' : '') },
                _react2.default.createElement(
                    'div',
                    { className: 'text-ellipsis', style: { textAlign: this.props.textAlign || 'left', flexGrow: 1 } },
                    this.getSelectedText()
                ),
                _react2.default.createElement(
                    'div',
                    { style: { width: 16, textAlign: 'right' } },
                    _react2.default.createElement('i', { className: 'iconfont icon-caret-down', style: { fontSize: 12, color: 'rgba(0,0,0,0.3)' } })
                )
            );
            return _react2.default.createElement(
                'div',
                { className: 'flex middle relative', style: (0, _extends3.default)({ overflow: 'hidden' }, this.props.style, this.props.rootStyle) },
                _react2.default.createElement(
                    'div',
                    { style: { flexGrow: 1, width: 0 },
                        className: "relative" + (this.props.disabled ? ' text-disabled' : ' cursor-pointer'),
                        onClick: this.handleClick },
                    borderStyle === 'border' && this.props.borderShow ? _react2.default.createElement(
                        'div',
                        { className: 'full-width' },
                        _react2.default.createElement(
                            'div',
                            {
                                className: "control-border" + (this.state.focus || this.state.open ? ' focus' : '') + (this.props.errorText ? ' error' : '') },
                            content
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text-small text-danger', style: { marginTop: 2 } },
                            this.props.errorText
                        )
                    ) : _react2.default.createElement(
                        'div',
                        null,
                        content,
                        _react2.default.createElement('div', { className: 'full-screen' })
                    )
                ),
                _react2.default.createElement(
                    _Popover2.default,
                    {
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        anchorOrigin: { horizontal: "left", vertical: "bottom" },
                        targetOrigin: { horizontal: "left", vertical: "top" },
                        onRequestClose: this.handleRequestClose },
                    _react2.default.createElement(
                        'div',
                        { style: { width: this.state.anchorEl ? this.state.anchorEl.clientWidth : 'auto', padding: '6px 2px' } },
                        this.state.dataSource.map(function (data, index) {
                            var text = _lodash2.default.get(data, _this4.props.dataSourceConfig.text);
                            var value = _lodash2.default.get(data, _this4.props.dataSourceConfig.value);
                            var isChecked = values.indexOf(value) >= 0;
                            return _react2.default.createElement(
                                'div',
                                { className: 'hover-bg', key: index },
                                _react2.default.createElement(_checkbox2.default, { label: text, styleProps: { style: { marginTop: 0 } }, value: isChecked, onChange: _this4.handleCheck(value) })
                            );
                        }),
                        _react2.default.createElement(
                            'div',
                            { className: 'flex text-muted text-small', style: { marginLeft: 4 } },
                            _react2.default.createElement(
                                'div',
                                { className: 'cursor-pointer', style: { padding: 4 }, onClick: this.handleCheckAll },
                                '\u5168\u9009'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'cursor-pointer', style: { padding: 4 }, onClick: this.handleUnCheckAll },
                                '\u5168\u4E0D\u9009'
                            )
                        )
                    )
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
    fullWidth: true,
    size: 'default',
    menuWidth: 'auto'
};
Select.contextTypes = {
    muiTheme: _propTypes2.default.object
};
exports.default = Select;