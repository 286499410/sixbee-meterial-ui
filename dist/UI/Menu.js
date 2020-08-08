"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _values = require("babel-runtime/core-js/object/values");

var _values2 = _interopRequireDefault(_values);

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _tool = require("./tool");

var _Icon = require("./Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _Popover = require("./Popover");

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = function (_Component) {
    (0, _inherits3.default)(Menu, _Component);

    function Menu(props) {
        (0, _classCallCheck3.default)(this, Menu);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Menu.__proto__ || (0, _getPrototypeOf2.default)(Menu)).call(this, props));

        _this.state = {
            scrollTop: 0,
            rowHeight: 32,
            height: 300,
            foldSet: new _set2.default(),
            unFoldSet: new _set2.default(),
            poppedSet: {}
        };

        _this.handleScroll = function (event) {
            _this.isVirtual() && _this.setState({ scrollTop: event.target.scrollTop });
        };

        _this.handleClick = function (data) {
            return function (event) {
                if (data.disabled) return;
                var value = _this.getValue(data);
                if (_this.props.childrenShowMethod === "popover") {
                    (0, _values2.default)(_this.state.poppedSet).map(function (row) {
                        return row.open = false;
                    });
                    _this.forceUpdate();
                }
                if (_this.props.onSelect) {
                    _this.props.onSelect({ value: value, data: data, event: event });
                }
            };
        };

        _this.showChildren = function (data) {
            return function (event) {
                switch (_this.props.childrenShowMethod) {
                    case "fold":
                        _this.handleFoldClick(data)(event);
                        break;
                    case "popover":
                        _this.handlePopoverClick(data)(event);
                        break;
                }
            };
        };

        _this.handleFoldClick = function (data) {
            return function (event) {
                event.stopPropagation();
                var value = _this.getValue(data);
                if (_this.isFolded(data)) {
                    _this.state.foldSet.delete(value);
                    _this.state.unFoldSet.add(value);
                } else {
                    _this.state.foldSet.add(value);
                    _this.state.unFoldSet.delete(value);
                }
                _this.forceUpdate();
            };
        };

        _this.handlePopoverClick = function (data) {
            return function (event) {
                event.stopPropagation();
                var value = _this.getValue(data);
                _this.state.poppedSet = (0, _defineProperty3.default)({}, value, {
                    open: true,
                    anchorEl: event.target
                });
                _this.forceUpdate();
            };
        };

        _this.handlePopoverClose = function (data) {
            return function (event) {
                var value = _this.getValue(data);
                _this.state.poppedSet = (0, _defineProperty3.default)({}, value, {
                    open: false
                });
                _this.forceUpdate();
            };
        };

        _this.containerRef = _react2.default.createRef();
        return _this;
    }

    (0, _createClass3.default)(Menu, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.containerRef.current) {
                this.state.height = _.get(this.containerRef.current, 'clientHeight') || this.state.height;
                this.state.rowHeight = _.get(this.containerRef.current, 'children[1].clientHeight') || this.state.rowHeight;
                this.initScrollTop();
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {}
    }, {
        key: "initScrollTop",
        value: function initScrollTop() {
            var index = _.findIndex(this.props.dataSource, { value: this.props.value });
            var scrollTop = Math.max((index + 1) * this.state.rowHeight - this.state.height / 2, 0);
            this.containerRef.current.scrollTop = scrollTop;
        }
    }, {
        key: "isVirtual",
        value: function isVirtual() {
            return this.props.virtual;
        }
    }, {
        key: "getVirtualTopSpace",
        value: function getVirtualTopSpace() {
            var _getShowRows = this.getShowRows(),
                startRow = _getShowRows.startRow;

            return _react2.default.createElement("div", { style: { height: startRow * this.state.rowHeight } });
        }
    }, {
        key: "getVirtualBottomSpace",
        value: function getVirtualBottomSpace() {
            var _getShowRows2 = this.getShowRows(),
                endRow = _getShowRows2.endRow;

            var rows = this.props.dataSource.length;
            return _react2.default.createElement("div", { style: { height: (rows - 1 - endRow) * this.state.rowHeight } });
        }
    }, {
        key: "getShowRows",
        value: function getShowRows() {
            var startRow = parseInt(this.state.scrollTop / this.state.rowHeight);
            var endRow = Math.min(startRow + Math.ceil(this.state.height / this.state.rowHeight), this.props.dataSource.length - 1);
            return { startRow: startRow, endRow: endRow };
        }
    }, {
        key: "getDataSource",
        value: function getDataSource() {
            if (this.isVirtual()) {
                var _getShowRows3 = this.getShowRows(),
                    startRow = _getShowRows3.startRow,
                    endRow = _getShowRows3.endRow;

                return this.props.dataSource.slice(startRow, endRow);
            } else {
                return this.props.dataSource;
            }
        }
    }, {
        key: "getText",
        value: function getText(data) {
            if (!_.isObject(data)) {
                return data;
            }
            return (0, _tool.replaceText)(data, this.props.dataSourceConfig.text);
        }
    }, {
        key: "getValue",
        value: function getValue(data) {
            if (!_.isObject(data)) {
                return data;
            }
            return _.get(data, this.props.dataSourceConfig.value);
        }
    }, {
        key: "hasChildren",
        value: function hasChildren(data) {
            return data.children && data.children.length > 0;
        }
    }, {
        key: "isFolded",
        value: function isFolded(data) {
            var value = this.getValue(data);
            return this.state.foldSet.has(value) || this.props.defaultFolded && !this.state.unFoldSet.has(value);
        }
    }, {
        key: "renderMenuItem",
        value: function renderMenuItem(dataSource) {
            var _this2 = this;

            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            var menuItems = [];
            dataSource.map(function (data, index) {
                var value = _this2.getValue(data);
                var hasChildren = _this2.hasChildren(data);
                var isFolded = _this2.isFolded(data);
                var key = value || index;
                menuItems.push(_react2.default.createElement(
                    "div",
                    {
                        className: (0, _tool.joinBlankSpace)("menu-item flex middle between", _this2.props.value === value && 'text-primary', data.disabled && 'menu-item-disabled'),
                        style: { height: hasChildren ? 'auto' : undefined },
                        key: key,
                        onClick: hasChildren && _this2.props.clickParentShowChildren ? _this2.showChildren(data) : _this2.handleClick(data) },
                    _react2.default.createElement(
                        "div",
                        { className: "menu-item-label" },
                        _this2.getText(data)
                    ),
                    hasChildren && _this2.props.childrenShowMethod === "fold" && _react2.default.createElement(
                        "div",
                        { className: "menu-item-icon" },
                        _react2.default.createElement(_Icon2.default, { name: isFolded ? "caret-up" : "caret-down", onClick: _this2.showChildren(data) })
                    ),
                    hasChildren && _this2.props.childrenShowMethod === "popover" && _react2.default.createElement(
                        "div",
                        { className: "menu-item-icon" },
                        _react2.default.createElement(_Icon2.default, { name: "caret-right", onClick: _this2.showChildren(data) })
                    )
                ));
                if (hasChildren) {
                    var content = _react2.default.createElement(
                        "div",
                        { key: 'parent' + key,
                            className: "menu",
                            style: { marginLeft: _this2.props.childrenShowMethod === "popover" ? undefined : _this2.props.indent } },
                        _this2.renderMenuItem(data.children, level + 1)
                    );
                    switch (_this2.props.childrenShowMethod) {
                        case "fold":
                            if (!isFolded) menuItems.push(content);
                            break;
                        case "popover":
                            menuItems.push(_react2.default.createElement(
                                _Popover2.default,
                                (0, _extends3.default)({
                                    style: { width: _.get(_this2.containerRef, "current.offsetWidth") },
                                    key: 'parent' + value
                                }, _this2.state.poppedSet[value], {
                                    zIndex: 1000 + level,
                                    anchorOrigin: "right top",
                                    targetOrigin: "left top",
                                    onRequestClose: _this2.handlePopoverClose(data)
                                }),
                                content
                            ));
                            break;
                        default:
                            menuItems.push(content);
                    }
                }
            });
            return menuItems;
        }
    }, {
        key: "render",
        value: function render() {

            return _react2.default.createElement(
                "div",
                { ref: this.containerRef,
                    className: (0, _tool.joinBlankSpace)("menu", this.props.className),
                    style: this.props.style,
                    onScroll: this.handleScroll },
                this.isVirtual() && this.getVirtualTopSpace(),
                this.renderMenuItem(this.getDataSource()),
                this.isVirtual() && this.getVirtualBottomSpace()
            );
        }
    }], [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(nextProps, prevState) {
            if (nextProps.className && nextProps.className.toString().indexOf('text-small') >= 0) {
                return { rowHeight: 24 };
            }
            return null;
        }
    }]);
    return Menu;
}(_react.Component);

Menu.defaultProps = {
    dataSource: [],
    dataSourceConfig: { text: 'text', value: 'value' },
    value: undefined,
    onSelect: undefined,
    virtual: false,
    indent: 14,
    childrenShowMethod: undefined,
    clickParentShowChildren: false,
    defaultFolded: false };
exports.default = Menu;