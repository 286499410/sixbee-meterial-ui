'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auto = function (_Component) {
    (0, _inherits3.default)(Auto, _Component);

    function Auto(props) {
        (0, _classCallCheck3.default)(this, Auto);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Auto.__proto__ || (0, _getPrototypeOf2.default)(Auto)).call(this, props));

        _this.state = {
            open: false,
            anchorEl: {},
            openType: 'focus',
            dataSource: [],
            filterText: ''
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
                openType: 'focus',
                open: true,
                anchorEl: _this.ref.current
            });
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
                    _this.setState({ filterText: _this.getCurrentText() });
                }
            } else {
                _this.handleChange(_this.state.filterText);
            }
            _this.handleClose(event);
        };

        _this.handleSelect = function (_ref2) {
            var value = _ref2.value,
                data = _ref2.data,
                event = _ref2.event;

            event.stopPropagation();
            _this.handleClose(event);
            _this.setState({ filterText: _this.getText(data) });
            _this.handleChange(_this.getValue(data));
        };

        _this.handleCreate = function (event) {
            _this.onRequestClose(event);
            setTimeout(function () {
                if (_this.props.onCreate) {
                    _this.props.onCreate();
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
        _this.loadDataSource().then(function (dataSource) {
            _this.state.filterText = _this.getCurrentText(dataSource);
            _this.state.dataSource = dataSource;
            if (_this.updater.isMounted(_this)) {
                _this.forceUpdate();
            }
        });
        return _this;
    }

    (0, _createClass3.default)(Auto, [{
        key: 'loadDataSource',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var filterText;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                filterText = this.state.filterText;

                                if (!_.isFunction(this.props.dataSource)) {
                                    _context.next = 7;
                                    break;
                                }

                                _context.next = 4;
                                return this.props.dataSource({ filterText: filterText });

                            case 4:
                                _context.t0 = _context.sent;
                                _context.next = 8;
                                break;

                            case 7:
                                _context.t0 = this.props.dataSource;

                            case 8:
                                return _context.abrupt('return', _context.t0);

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function loadDataSource() {
                return _ref3.apply(this, arguments);
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
        key: 'getStyle',
        value: function getStyle() {
            var style = (0, _extends3.default)({}, this.props.style);
            if (this.state.open) {
                style.position = 'relative';
                style.zIndex = _.get(this.props, 'popoverProps.zIndex', 1000);
            }
            return style;
        }
    }, {
        key: 'getCurrentText',
        value: function getCurrentText() {
            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.dataSource;

            var index = dataSource.indexOf(this.props.value);
            if (index >= 0) {
                return dataSource[index];
            }
            var data = (0, _tool.getDataFromDataSourceByValue)(this.props.value, dataSource, this.props.dataSourceConfig);
            return data ? this.getText(data) : !this.props.forceSelect ? this.props.value : '';
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
            var dataSource = nextProps.dataSource;
            if (_.isArray(dataSource) && !_.isEqual(prevState.dataSource, dataSource)) {
                return { dataSource: dataSource };
            }
            return null;
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