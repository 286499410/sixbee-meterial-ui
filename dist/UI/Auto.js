'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _tool = require('./tool');

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Divider = require('./Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _form = require('../form');

var _form2 = _interopRequireDefault(_form);

var _formTable = require('../controls/form-table');

var _formTable2 = _interopRequireDefault(_formTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFilterText = function getFilterText(props) {
    var index = props.dataSource.indexOf(props.value);
    if (index >= 0) {
        return props.dataSource[index];
    }
    var data = (0, _tool.getDataFromDataSourceByValue)(props.value, props.dataSource, props.dataSourceConfig);
    var text = data ? !_.isObject(data) ? data : (0, _tool.replaceText)(data, props.dataSourceConfig.text) : !props.forceSelect ? props.value : '';
    return text !== undefined ? text : '';
};

var Auto = function (_Component) {
    (0, _inherits3.default)(Auto, _Component);

    function Auto(props) {
        (0, _classCallCheck3.default)(this, Auto);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Auto.__proto__ || (0, _getPrototypeOf2.default)(Auto)).call(this, props));

        _this.state = {
            isFocus: false,
            open: false,
            anchorEl: {},
            openType: 'focus',
            dataSource: [],
            filterText: '',
            value: undefined
        };

        _this.handleInputChange = function (_ref) {
            var value = _ref.value;

            _this.setState({ filterText: value });
            if (_this.props.updateDataSource && _.isFunction(_this.props.dataSource)) {
                _this.loadDataSource().then(function (dataSource) {
                    _this.setState({ dataSource: dataSource });
                });
            }
        };

        _this.handleChange = function (value) {
            _this.props.onChange && _this.props.onChange({ value: value });
        };

        _this.handleFocus = function (event) {
            _this.setState({
                isFocus: true,
                openType: 'focus',
                open: true,
                anchorEl: _this.ref.current
            });
        };

        _this.handleBlur = function (_ref2) {
            var event = _ref2.event;

            if (event.target.value === '') {
                _this.handleChange('');
            }
            _this.setState({ isFocus: false });
        };

        _this.handlePullDown = function (event) {
            event.stopPropagation();
            _this.setState({
                openType: 'pullDown',
                open: true,
                anchorEl: _this.ref.current
            });
        };

        _this.handleClose = function (event) {
            _this.setState({ open: false });
        };

        _this.onRequestClose = function (event) {
            if (_this.props.forceSelect) {
                if (_this.state.filterText === '') {
                    _this.handleChange('');
                } else {
                    _this.setState({
                        filterText: getFilterText((0, _extends3.default)({}, _this.props, {
                            dataSource: _this.state.dataSource
                        }))
                    });
                }
            } else {
                _this.handleChange(_this.state.filterText);
            }
            _this.handleClose(event);
        };

        _this.handleSelect = function (_ref3) {
            var value = _ref3.value,
                data = _ref3.data,
                event = _ref3.event;

            if (event) {
                event.stopPropagation();
                _this.handleClose(event);
            }
            _this.setState({
                filterText: _this.getText(data),
                selecting: true
            });
            _this.handleChange(_this.getValue(data));
        };

        _this.handleCreate = function (event) {
            _this.onRequestClose(event);
            setTimeout(function () {
                if (_this.props.onCreate) {
                    _this.props.onCreate({ Form: _this.props.context, Control: _this });
                }
            }, 100);
        };

        _this.filter = function (data, filterText) {
            if (_this.props.filter) {
                return _this.props.filter(data, filterText);
            }
            var text = _this.getText(data);
            return filterText === '' ? true : text.toString().indexOf(filterText) >= 0;
        };

        _this.ref = _react2.default.createRef();
        _this.text = _react2.default.createRef();
        return _this;
    }

    (0, _createClass3.default)(Auto, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setDataSource();
        }
    }, {
        key: 'setDataSource',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var dataSource;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.loadDataSource();

                            case 2:
                                dataSource = _context.sent;

                                this.setState({
                                    filterText: getFilterText((0, _extends3.default)({}, this.props, {
                                        dataSource: dataSource
                                    })),
                                    dataSource: dataSource
                                });
                                return _context.abrupt('return', dataSource);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function setDataSource() {
                return _ref4.apply(this, arguments);
            }

            return setDataSource;
        }()
    }, {
        key: 'loadDataSource',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                var filterText, context, FormTable2, Form2;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                filterText = this.state.filterText;
                                context = this.props.context;
                                FormTable2 = context instanceof _formTable2.default ? context : undefined;
                                Form2 = FormTable2 ? context.props.context : context;

                                if (!_.isFunction(this.props.dataSource)) {
                                    _context2.next = 10;
                                    break;
                                }

                                _context2.next = 7;
                                return this.props.dataSource({
                                    filterText: filterText,
                                    Form: Form2,
                                    FormTable: FormTable2,
                                    Control: this
                                });

                            case 7:
                                _context2.t0 = _context2.sent;
                                _context2.next = 11;
                                break;

                            case 10:
                                _context2.t0 = this.props.dataSource;

                            case 11:
                                return _context2.abrupt('return', _context2.t0);

                            case 12:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function loadDataSource() {
                return _ref5.apply(this, arguments);
            }

            return loadDataSource;
        }()
    }, {
        key: 'focus',
        value: function focus() {
            if (this.text && this.text.current) {
                this.text.current.focus();
            }
        }
    }, {
        key: 'getDataSource',
        value: function getDataSource() {
            if (this.state.openType === 'pullDown') {
                return this.state.dataSource;
            }
            return (0, _tool.getFilterDataSource)(this.state.filterText, this.state.dataSource, this.props.dataSourceConfig, this.filter);
        }
    }, {
        key: 'getData',
        value: function getData(value) {
            return _.find(this.state.dataSource, (0, _defineProperty3.default)({}, this.props.dataSourceConfig.value, value));
        }
    }, {
        key: 'getStyle',
        value: function getStyle() {
            var style = (0, _extends3.default)({}, this.props.style);
            if (this.state.open) {
                style.position = 'relative';
                style.zIndex = _.get(this.props, 'popoverProps.zIndex', 3000);
            }
            return style;
        }
    }, {
        key: 'getText',
        value: function getText(data) {
            if (!_.isObject(data)) {
                return data;
            }
            return (0, _tool.replaceText)(data, this.props.dataSourceConfig.text);
        }
    }, {
        key: 'getValue',
        value: function getValue(data) {
            if (!_.isObject(data)) {
                return data;
            }
            return _.get(data, this.props.dataSourceConfig.value);
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            var data = this.getData(value);
            this.handleSelect({ value: value, data: data });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { ref: this.ref },
                _react2.default.createElement(
                    'div',
                    { className: (0, _tool.joinBlankSpace)("flex middle between form-control", this.props.className),
                        style: this.getStyle(), onClick: function onClick() {
                            _this2.focus();
                        } },
                    _react2.default.createElement(_Text2.default, { ref: this.text,
                        className: 'clear-style grow',
                        onFocus: this.handleFocus,
                        onBlur: this.handleBlur,
                        value: this.state.filterText,
                        onChange: this.handleInputChange,
                        placeholder: this.props.placeholder
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: 'text-muted ripple cursor-pointer', onClick: this.handlePullDown },
                        _react2.default.createElement(_Icon2.default, { name: 'caret-down', className: 'text-small' })
                    )
                ),
                _react2.default.createElement(
                    _Popover2.default,
                    (0, _extends3.default)({}, this.props.popoverProps, {
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        style: {
                            width: _.get(this.state.anchorEl, "offsetWidth")
                        },
                        onRequestClose: this.onRequestClose,
                        scaleX: 1 }),
                    this.state.dataSource.length == 0 ? _react2.default.createElement(
                        'div',
                        { className: 'menu' },
                        _react2.default.createElement(
                            'div',
                            { className: 'menu-item text-muted' },
                            '\u6CA1\u6709\u6570\u636E'
                        )
                    ) : _react2.default.createElement(_Menu2.default, (0, _extends3.default)({}, this.props.menuProps, {
                        dataSource: this.getDataSource(),
                        dataSourceConfig: this.props.dataSourceConfig,
                        onSelect: this.handleSelect,
                        value: this.props.value
                    })),
                    this.props.onCreate && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_Divider2.default, { space: 0 }),
                        _react2.default.createElement(
                            'div',
                            { className: 'menu' },
                            _react2.default.createElement(
                                'div',
                                { className: 'text-primary cursor-pointer flex center middle menu-item',
                                    onClick: this.handleCreate },
                                _react2.default.createElement(_Icon2.default, { name: 'plus' }),
                                this.props.createLabel
                            )
                        )
                    ),
                    this.props.popoverAppend
                )
            );
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
            var state = {};
            if (nextProps.value !== prevState.value) {
                state.value = nextProps.value;
                state.filterText = getFilterText((0, _extends3.default)({}, nextProps, {
                    dataSource: state.dataSource || prevState.dataSource
                }));
            }
            return state;
        }
    }]);
    return Auto;
}(_react.Component);

Auto.defaultProps = {
    dataSource: [],
    dataSourceConfig: { text: 'text', value: 'value' },
    filter: undefined,
    forceSelect: true,
    onCreate: undefined,
    createLabel: undefined,
    updateDataSource: false };
exports.default = Auto;