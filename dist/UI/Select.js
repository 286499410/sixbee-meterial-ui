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

var _tool = require('../lib/tool');

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Divider = require('./Divider');

var _Divider2 = _interopRequireDefault(_Divider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function (_Component) {
    (0, _inherits3.default)(Select, _Component);

    function Select(props) {
        (0, _classCallCheck3.default)(this, Select);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call(this, props));

        _this.state = {
            open: false,
            anchorEl: {},
            dataSource: []
        };

        _this.handleOpen = function (event) {
            _this.setState({
                open: true,
                anchorEl: _this.getAnchorEl()
            });
        };

        _this.handleClose = function (event) {
            _this.setState({ open: false });
        };

        _this.handleSelect = function (_ref) {
            var value = _ref.value,
                event = _ref.event;

            event.stopPropagation();
            _this.handleClose({ event: event });
            if (_this.props.onChange) {
                _this.props.onChange({ value: value });
            }
        };

        _this.handleCreate = function (event) {
            _this.handleClose({ event: event });
            if (_this.props.onCreate) {
                _this.props.onCreate();
            }
        };

        _this.ref = _react2.default.createRef();
        _this.loadDataSource();
        return _this;
    }

    (0, _createClass3.default)(Select, [{
        key: 'loadDataSource',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var dataSource;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!_lodash2.default.isFunction(this.props.dataSource)) {
                                    _context.next = 6;
                                    break;
                                }

                                _context.next = 3;
                                return this.props.dataSource(this.state.filterText);

                            case 3:
                                _context.t0 = _context.sent;
                                _context.next = 7;
                                break;

                            case 6:
                                _context.t0 = this.props.dataSource;

                            case 7:
                                dataSource = _context.t0;

                                if (!_lodash2.default.isEqual(this.state.dataSource, dataSource)) {
                                    if (this.updater.isMounted(this)) {
                                        this.setState({ dataSource: dataSource });
                                    } else {
                                        this.state.dataSource = dataSource;
                                    }
                                }
                                return _context.abrupt('return', dataSource);

                            case 10:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function loadDataSource() {
                return _ref2.apply(this, arguments);
            }

            return loadDataSource;
        }()
    }, {
        key: 'getCurrentText',
        value: function getCurrentText() {
            var index = this.state.dataSource.indexOf(this.props.value);
            if (index >= 0) {
                return this.state.dataSource[index];
            }
            var data = (0, _tool.getDataFromDataSourceByValue)(this.props.value, this.state.dataSource, this.props.dataSourceConfig);
            return data && (0, _tool.replaceText)(data, this.props.dataSourceConfig.text);
        }
    }, {
        key: 'getAnchorEl',
        value: function getAnchorEl() {
            var className = this.ref.current.parentNode.parentNode.className;
            return className.indexOf("control-wrapper") >= 0 ? this.ref.current.parentNode.parentNode : this.ref.current;
        }
    }, {
        key: 'render',
        value: function render() {
            console.log("render Select");
            var text = this.getCurrentText();
            return _react2.default.createElement(
                'div',
                { ref: this.ref },
                _react2.default.createElement(
                    'div',
                    {
                        className: (0, _tool.joinBlankSpace)("form-control cursor-pointer flex middle between", this.props.className, this.state.open && 'active'),
                        onClick: this.handleOpen },
                    text !== undefined ? _react2.default.createElement(
                        'div',
                        { className: 'text-ellipsis' },
                        text
                    ) : _react2.default.createElement(
                        'div',
                        null,
                        this.props.placeholder ? _react2.default.createElement(
                            'span',
                            { className: 'text-muted' },
                            this.props.placeholder
                        ) : null
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'text-muted' },
                        _react2.default.createElement(_Icon2.default, { name: 'caret-down' })
                    )
                ),
                _react2.default.createElement(
                    _Popover2.default,
                    (0, _extends3.default)({}, this.props.popoverProps, {
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        onRequestClose: this.handleClose,
                        style: {
                            width: this.state.anchorEl.offsetWidth
                        },
                        scaleX: 1
                    }),
                    this.state.dataSource.length == 0 ? _react2.default.createElement(
                        'div',
                        { className: 'menu' },
                        _react2.default.createElement(
                            'div',
                            { className: 'menu-item text-muted' },
                            '\u6CA1\u6709\u6570\u636E'
                        )
                    ) : _react2.default.createElement(_Menu2.default, (0, _extends3.default)({
                        popoverOpen: this.state.open,
                        dataSource: this.state.dataSource,
                        dataSourceConfig: this.props.dataSourceConfig
                    }, this.props.menuProps, {
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
            if (_lodash2.default.isArray(dataSource) && !_lodash2.default.isEqual(prevState.dataSource, dataSource)) {
                return { dataSource: dataSource };
            }
            return null;
        }
    }]);
    return Select;
}(_react.Component);

Select.defaultProps = {
    onChange: undefined,
    onBlur: undefined,
    onFocus: undefined,
    value: undefined,
    defaultValue: undefined,
    dataSource: [],
    dataSourceConfig: { text: 'text', value: 'value' },
    placeholder: undefined,
    style: undefined,
    className: undefined,
    popoverProps: undefined,
    menuProps: undefined,
    onCreate: undefined,
    createLabel: undefined,
    popoverAppend: undefined
};
exports.default = Select;