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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auto = function (_Component) {
    (0, _inherits3.default)(Auto, _Component);

    function Auto(props) {
        (0, _classCallCheck3.default)(this, Auto);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Auto.__proto__ || (0, _getPrototypeOf2.default)(Auto)).call(this, props));

        _initialiseProps.call(_this);

        _this.initData(props);

        _utils2.default.getDataSource('', _this.props.dataSource, _this.props.dataSourceConfig).then(function (dataSource) {
            _this.state.dataSource = dataSource;
            var value = _this.getValue();

            if (value !== undefined && _this.state.searchText === undefined) {
                var data = _this.getData(value);
                if (data) {
                    _this.state.searchText = _lodash2.default.get(data, _this.props.dataSourceConfig.text);
                }
            }
            _this.forceUpdate();
        });
        return _this;
    }

    (0, _createClass3.default)(Auto, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
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
        key: 'setValue',
        value: function setValue(value) {
            var data = this.getData(value) || {};
            this.setState({ searchText: this.props.supportSearchText ? value : _lodash2.default.get(data, this.props.dataSourceConfig.text), value: value });
            if (this.props.onChange) {
                this.props.onChange(value, this);
            }
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.value === undefined ? this.props.defaultValue : this.state.value;
        }
    }, {
        key: 'getSearchText',
        value: function getSearchText() {
            return this.state.searchText === undefined ? this.props.searchText : this.state.searchText;
        }
    }, {
        key: 'setDataSource',
        value: function setDataSource() {
            var _this3 = this;

            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.dataSource;

            _utils2.default.getDataSource(this.state.searchText, dataSource, this.props.dataSourceConfig).then(function (dataSource) {
                _this3.setState({ dataSource: dataSource });
            });
        }
    }]);
    return Auto;
}(_react.Component);

Auto.defaultProps = {
    supportSearchText: false,
    searchText: undefined,
    borderShow: true,
    openOnFocus: true,
    hasClear: true,
    labelFixed: false,
    disabled: false,
    immutable: false,
    dataSourceConfig: { text: 'text', value: 'value' },
    filter: undefined,
    reloadDataSource: false,
    dataSource: [],
    hintText: undefined,
    errorText: undefined,
    maxSearchResults: undefined,
    multiLine: false,
    rows: 1,
    fullWidth: true };

var _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.state = {
        searchText: undefined,
        value: undefined,
        dataSource: [],
        textFields: [],
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        targetOrigin: { vertical: 'top', horizontal: 'left' }
    };

    this.initData = function (props) {
        if (props.value !== undefined) {
            _this4.state.value = props.value;
        }
        if (props.searchText !== undefined) {
            _this4.state.searchText = props.searchText;
        }
        if (props.value !== undefined && props.searchText === undefined && props.supportSearchText === true) {
            _this4.state.searchText = props.value;
        }
    };

    this.handleUpdateInput = function (searchText) {
        if (!_this4.props.immutable) {
            if (_this4.props.supportSearchText) {
                _this4.setValue(searchText);
            } else {
                _this4.setState({ searchText: searchText, value: undefined });
            }
            if (_this4.props.reloadDataSource) {
                _utils2.default.getDataSource(searchText, _this4.props.dataSource, _this4.props.dataSourceConfig).then(function (dataSource) {
                    _this4.setState({ dataSource: dataSource });
                });
            }
        }
    };

    this.handleClose = function (event) {
        setTimeout(function () {
            var value = _this4.getValue();
            if ((value === undefined || value === '') && !_this4.props.supportSearchText) {
                _this4.setState({ searchText: '' });
            }
        }, 100);
    };

    this.handleNewRequest = function (chosenRequest, index) {
        if (index == -1) {
            return;
        }
        var value = chosenRequest[_this4.props.dataSourceConfig.value];
        _this4.setValue(value);
    };

    this.handleClear = function (event) {
        _this4.state.value = '';
        _this4.handleUpdateInput('');
        if (_this4.props.onClear) {
            _this4.props.onClear(event, _this4);
        }
    };

    this.handleFocus = function (event) {
        if (_this4.props.onFocus) {
            _this4.props.onFocus(event, _this4);
        }
    };

    this.handleBlur = function (event) {
        if (_this4.props.onBlur) {
            _this4.props.onBlur(event, _this4);
        }
    };

    this.handleKeyUp = function (event) {
        if (_this4.props.onKeyUp) {
            _this4.props.onKeyUp(event, _this4);
        }
    };

    this.filter = function (searchText, key) {
        return searchText == '' || key.indexOf(searchText) !== -1;
    };

    this.render = function () {
        var value = _this4.getValue();
        var searchText = _this4.getSearchText();
        var styleProps = _lodash2.default.merge(_style2.default.getStyle('auto', _this4.props), _this4.props.styleProps);
        var label = _this4.props.label;
        return _react2.default.createElement(
            'div',
            { ref: "container", style: { position: 'relative' } },
            _react2.default.createElement(_AutoComplete2.default, {
                ref: "auto",
                filter: _this4.props.filter || _this4.filter,
                name: _this4.props.name || _this4.props.dataKey || _utils2.default.uuid(),
                fullWidth: _this4.props.fullWidth,
                floatingLabelText: label,
                value: value,
                searchText: searchText,
                disabled: _this4.props.disabled,
                hintText: _this4.props.hintText,
                errorText: _this4.props.errorText,
                floatingLabelFixed: _this4.props.labelFixed,
                underlineShow: _this4.props.borderShow,
                dataSource: _this4.state.dataSource,
                dataSourceConfig: _this4.props.dataSourceConfig,
                maxSearchResults: _this4.props.maxSearchResults,
                openOnFocus: _this4.props.openOnFocus,
                onClose: _this4.handleClose,
                onFocus: _this4.handleFocus,
                onBlur: _this4.handleBlur,
                onKeyUp: _this4.handleKeyUp,
                onNewRequest: _this4.handleNewRequest,
                onUpdateInput: _this4.handleUpdateInput,
                multiLine: _this4.props.multiLine,
                rows: _this4.props.rows,
                rowsMax: _this4.props.rowsMax,
                textFieldStyle: (0, _extends3.default)({}, styleProps.style, _this4.props.style),
                textareaStyle: styleProps.textareaStyle,
                floatingLabelStyle: styleProps.floatingLabelStyle,
                floatingLabelFocusStyle: styleProps.floatingLabelFocusStyle,
                floatingLabelShrinkStyle: styleProps.floatingLabelShrinkStyle,
                errorStyle: styleProps.errorStyle,
                hintStyle: styleProps.hintStyle,
                underlineStyle: styleProps.underlineStyle,
                inputStyle: styleProps.inputStyle,
                menuProps: styleProps.menuProps,
                menuStyle: styleProps.menuStyle,
                disableFocusRipple: true,
                style: styleProps.style,
                anchorOrigin: _this4.state.anchorOrigin,
                targetOrigin: _this4.state.targetOrigin,
                popoverProps: styleProps.popoverProps
            }),
            value !== undefined && value !== null && value !== '' && _this4.props.hasClear && !_this4.props.disabled && !_this4.props.immutable ? _react2.default.createElement(_IconButton2.default, { iconClassName: 'iconfont icon-close-circle-fill', onClick: _this4.handleClear,
                style: (0, _extends3.default)({ position: 'absolute', right: 0 }, styleProps.iconStyle.style),
                iconStyle: (0, _extends3.default)({ color: '#e0e0e0' }, styleProps.iconStyle.iconStyle)

            }) : null
        );
    };
};

exports.default = Auto;