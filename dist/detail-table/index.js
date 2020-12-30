'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _checkbox = require('./checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _reactCustomScrollbars = require('react-custom-scrollbars');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _pubsubJs = require('pubsub-js');

var _pubsubJs2 = _interopRequireDefault(_pubsubJs);

var _pager = require('./pager');

var _pager2 = _interopRequireDefault(_pager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = function (_Component) {
    (0, _inherits3.default)(Table, _Component);
    (0, _createClass3.default)(Table, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                Table: this
            };
        }
    }]);

    function Table(props) {
        (0, _classCallCheck3.default)(this, Table);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).call(this, props));

        _this.state = {
            containerWidth: 0,
            extraWidth: 0
        };

        _this.handleCheckAll = function (event, isInputChecked) {
            var checked = {};
            var detailChecked = {};
            var _this$props$mainInfo$ = _this.props.mainInfo.primaryKey,
                primaryKey = _this$props$mainInfo$ === undefined ? "id" : _this$props$mainInfo$;

            if (isInputChecked) {
                _this.props.dataSource.forEach(function (data) {
                    checked[_lodash2.default.get(data, primaryKey)] = 1;
                    var details = _lodash2.default.get(data, _this.props.detailKey) || [];
                    details.forEach(function (detail) {
                        detailChecked[_lodash2.default.get(detail, _this.props.primaryKey)] = 1;
                    });
                });
            }
            _this.setChecked(checked, detailChecked);
        };

        _this.handleScroll = function (event) {
            var scrollLeft = (0, _jquery2.default)(event.target).scrollLeft();
            var scrollTop = (0, _jquery2.default)(event.target).scrollTop();
            if (_this.state.scrollLeft !== scrollLeft) {
                if (_this.refs.header) {
                    (0, _jquery2.default)(_this.refs.header).scrollLeft(scrollLeft);
                }
                _this.state.scrollLeft = scrollLeft;
                _this.publish("scrollLeftChange");
            }
            if (_this.state.scrollTop !== scrollTop) {
                _this.state.scrollTop = scrollTop;
                _this.publish("scrollTopChange");
            }
            _this.handleStateChange({});
        };

        _this.state = (0, _extends3.default)({}, _this.state, {
            key: new Date().getTime(),
            scrollLeft: props.scrollLeft,
            scrollTop: props.scrollTop,
            checked: props.checked,
            detailChecked: props.detailChecked,
            columnWidths: props.columnWidths,
            checkboxColumnWidth: props.checkboxColumnWidth
        });
        return _this;
    }

    (0, _createClass3.default)(Table, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var forceUpdate = 0;
            if (this.refs.container) {
                var state = this.state;
                (0, _jquery2.default)(this.refs.container).find(".table-header th").each(function () {
                    var key = (0, _jquery2.default)(this).attr("col-key");
                    if (key) {
                        state.columnWidths[key] = (0, _jquery2.default)(this).outerWidth();
                    }
                });
                this.state.containerWidth = (0, _jquery2.default)(this.refs.container).outerWidth();
                var tableWidth = this.getTableWidth();
                var mainInfoWidth = this.getMainInfoWidth();
                this.state.extraWidth = mainInfoWidth - tableWidth;
                if (this.state.containerWidth > tableWidth) forceUpdate = 1;
                if (this.state.extraWidth > 0) forceUpdate = 1;
            }
            this.state.checkboxColumnWidth = this.props.checkboxColumnWidth;
            if (this.refs.checkboxAll) {
                if (this.state.checkboxColumnWidth !== (0, _jquery2.default)(this.refs.checkboxAll).outerWidth()) {
                    this.state.checkboxColumnWidth = (0, _jquery2.default)(this.refs.checkboxAll).outerWidth();
                    forceUpdate = 1;
                }
            }
            if (this.refs.header) {
                (0, _jquery2.default)(this.refs.header).scrollLeft(this.props.scrollLeft);
            }
            setTimeout(function () {
                _this2.refs.Content.scrollTop(_this2.props.scrollTop);
                _this2.refs.Content.scrollLeft(_this2.props.scrollLeft);
            }, 1200);

            if (forceUpdate) {
                this.forceUpdate();
            }
        }
    }, {
        key: 'subscribe',
        value: function subscribe(eventKey, fn) {
            return _pubsubJs2.default.subscribe(this.state.key + "_" + eventKey, fn);
        }
    }, {
        key: 'unsubscribe',
        value: function unsubscribe(token) {
            return _pubsubJs2.default.unsubscribe(token);
        }
    }, {
        key: 'publish',
        value: function publish(eventKey) {
            return _pubsubJs2.default.publish(this.state.key + "_" + eventKey);
        }
    }, {
        key: 'getColumnWidths',
        value: function getColumnWidths() {
            return (0, _extends3.default)({}, this.props.columns.reduce(function (acc, _ref) {
                var width = _ref.width,
                    key = _ref.key;

                width && (acc[key] = width);
                return acc;
            }, {}), this.state.columnWidths);
        }
    }, {
        key: 'isAllChecked',
        value: function isAllChecked() {
            var checkedLength = (0, _values2.default)(this.state.checked).filter(function (item) {
                return item == 1;
            }).length;
            if (this.props.dataSource.length === 0 || checkedLength === 0 && (0, _values2.default)(this.state.checked).filter(function (item) {
                return item == 2;
            }).length === 0) {
                return 0;
            }
            if (this.props.dataSource.length === checkedLength) {
                return 1;
            }
            return 2;
        }
    }, {
        key: 'getTableWidth',
        value: function getTableWidth() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            var columnWidths = _lodash2.default.cloneDeep(this.getColumnWidths());
            (0, _keys2.default)(this.getColumnWidths()).forEach(function (key) {
                if (_lodash2.default.findIndex(props.columns, { key: key }) < 0) {
                    delete columnWidths[key];
                }
            });
            var tableWidth = (0, _values2.default)(columnWidths).reduce(function (total, num) {
                return total + num;
            }, 0);
            if (this.props.showCheckboxes) tableWidth += this.props.checkboxColumnWidth;
            return tableWidth;
        }
    }, {
        key: 'getMainInfoWidth',
        value: function getMainInfoWidth() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            var marginLeft = 24;
            var width = props.mainInfo.columns.reduce(function (total, column) {
                return total + ((column.width || 0) + marginLeft);
            }, 0);
            if (this.props.showCheckboxes) width += this.state.checkboxColumnWidth || this.props.checkboxColumnWidth;
            width += props.mainInfo.actionWidth || 0;
            return width;
        }
    }, {
        key: 'setChecked',
        value: function setChecked() {
            var checked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.checked;
            var detailChecked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.detailChecked;

            this.handleStateChange({ checked: checked, detailChecked: detailChecked });
            this.forceUpdate();
        }
    }, {
        key: 'handleStateChange',
        value: function handleStateChange(state) {
            (0, _assign2.default)(this.state, state);
            if (this.props.onStateChange) {
                this.props.onStateChange({
                    scrollLeft: this.state.scrollLeft,
                    scrollTop: this.state.scrollTop,
                    checked: this.state.checked,
                    detailChecked: this.state.detailChecked,
                    columnWidths: this.state.columnWidths,
                    checkboxColumnWidth: this.state.checkboxColumnWidth
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var tableWidth = this.getTableWidth();
            var mainInfoWidth = this.getMainInfoWidth();
            var columnWidths = this.getColumnWidths();
            var width = Math.max(tableWidth, mainInfoWidth, this.state.containerWidth);
            var _props$mainInfo$showC = this.props.mainInfo.showCheckboxes,
                showCheckboxes = _props$mainInfo$showC === undefined ? true : _props$mainInfo$showC;

            return _react2.default.createElement(
                'div',
                { ref: 'container', className: 'table-container bordered full-height text-small relative',
                    style: { overflow: "hidden" } },
                this.props.fixedCheckbox && _react2.default.createElement(FixedCheckbox, null),
                this.props.hasHeader && _react2.default.createElement(
                    'div',
                    {
                        ref: 'header',
                        className: 'table-header',
                        style: {
                            width: "calc(100% + 2px)",
                            overflow: "hidden",
                            height: 38
                        } },
                    _react2.default.createElement(
                        'table',
                        { className: 'table bordered',
                            style: {
                                width: Math.max(tableWidth, this.state.containerWidth) + this.state.extraWidth,
                                tableLayout: 'fixed',
                                minWidth: "100%"
                            } },
                        _react2.default.createElement(
                            'thead',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                (this.props.showCheckboxes || showCheckboxes) && _react2.default.createElement(
                                    'th',
                                    { ref: 'checkboxAll', style: {
                                            width: this.state.checkboxColumnWidth || this.props.checkboxColumnWidth,
                                            textAlign: "center",
                                            lineHeight: 1
                                        } },
                                    _react2.default.createElement(_checkbox2.default, { checked: this.isAllChecked(), onCheck: this.handleCheckAll })
                                ),
                                this.props.columns.map(function (column, index) {
                                    return _react2.default.createElement(
                                        'th',
                                        { key: index,
                                            'col-key': column.key,
                                            style: {
                                                width: columnWidths[column.key],
                                                textAlign: "center"
                                            } },
                                        column.label
                                    );
                                }),
                                this.state.extraWidth > 0 && _react2.default.createElement('th', { style: { width: this.state.extraWidth } })
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: { flexGrow: 1 } },
                    _react2.default.createElement(
                        _reactCustomScrollbars.Scrollbars,
                        { ref: 'Content', onScroll: this.handleScroll, style: {
                                width: '100%',
                                height: '100%'
                            } },
                        this.props.dataSource.map(function (data, index) {
                            return _react2.default.createElement(Content, { key: index, data: data, width: width,
                                extraWidth: _this3.state.extraWidth });
                        })
                    )
                ),
                this.props.pager ? _react2.default.createElement(_pager2.default, null) : null
            );
        }
    }]);
    return Table;
}(_react.Component);

Table.childContextTypes = {
    Table: _propTypes2.default.object
};
Table.defaultProps = {

    emptyDataTip: '没有找到相关数据',
    emptyDataImage: '/image/nodata.png',
    hasHeader: true,
    columns: [],
    dataSource: [],
    primaryKey: "id",
    detailKey: "details",
    mainInfo: {
        primaryKey: "id",
        columns: [],
        actionWidth: 0,
        action: [],
        showCheckboxes: true
    },
    showCheckboxes: false,
    spacey: 14,
    pager: {},
    fixedCheckbox: true,
    fixedLeftCols: 0,

    checked: {},
    detailChecked: {},
    scrollLeft: 0,
    scrollTop: 0,
    checkboxColumnWidth: 50,
    containerWidth: 0,
    extraWidth: 0,
    columnWidths: {}
};
exports.default = Table;

var Action = function (_React$Component) {
    (0, _inherits3.default)(Action, _React$Component);

    function Action(props) {
        (0, _classCallCheck3.default)(this, Action);
        return (0, _possibleConstructorReturn3.default)(this, (Action.__proto__ || (0, _getPrototypeOf2.default)(Action)).call(this, props));
    }

    (0, _createClass3.default)(Action, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this5 = this;

            this.token = this.context.Table.subscribe("scrollLeftChange", function () {
                var _context$Table$state$ = _this5.context.Table.state.scrollLeft,
                    scrollLeft = _context$Table$state$ === undefined ? 0 : _context$Table$state$;

                _this5.refs.container.style.right = 0 - scrollLeft + "px";
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.context.Table.unsubscribe(this.token);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var _context$Table$state$2 = this.context.Table.state.scrollLeft,
                scrollLeft = _context$Table$state$2 === undefined ? 0 : _context$Table$state$2;

            return _react2.default.createElement(
                'div',
                { ref: "container", className: 'table-header-bg', style: (0, _extends3.default)({
                        width: this.props.width,
                        position: "absolute",
                        right: 0 - scrollLeft,
                        borderLeft: "1px solid rgba(0,0,0,0.08)"
                    }, this.props.style) },
                _react2.default.createElement(
                    'div',
                    { className: 'flex center middle', style: { height: 32 } },
                    this.props.actions.map(function (action, index) {
                        return _react2.default.createElement(
                            'div',
                            { key: index, className: 'text-primary cursor-pointer',
                                style: { marginRight: index === _this6.props.actions.length - 1 ? 0 : 12 },
                                onClick: action.onClick.bind(_this6, _this6.props.data) },
                            action.label
                        );
                    })
                )
            );
        }
    }]);
    return Action;
}(_react2.default.Component);

Action.contextTypes = {
    Table: _propTypes2.default.object
};
Action.defaultProps = {
    width: 0,
    style: {},
    actions: [],
    data: {}
};

var MainInfo = function (_React$Component2) {
    (0, _inherits3.default)(MainInfo, _React$Component2);

    function MainInfo(props) {
        (0, _classCallCheck3.default)(this, MainInfo);
        return (0, _possibleConstructorReturn3.default)(this, (MainInfo.__proto__ || (0, _getPrototypeOf2.default)(MainInfo)).call(this, props));
    }

    (0, _createClass3.default)(MainInfo, [{
        key: 'getValue',
        value: function getValue(column) {
            return column.render ? column.render(this.props.data) : _utils2.default.render(this.props.data, column);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            return _react2.default.createElement(
                'div',
                { className: 'flex middle' },
                this.props.columns.map(function (column, index) {
                    return _react2.default.createElement(
                        'div',
                        { className: 'text-ellipsis', key: index, style: { width: column.width, marginRight: 24 } },
                        column.label && _react2.default.createElement(
                            'span',
                            { className: 'text-muted' },
                            column.label,
                            '\uFF1A'
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            _this8.getValue(column)
                        )
                    );
                }),
                this.props.actions.length > 0 && _react2.default.createElement(Action, { data: this.props.data, width: this.props.actionWidth, actions: this.props.actions,
                    style: this.props.actionStyle })
            );
        }
    }]);
    return MainInfo;
}(_react2.default.Component);

MainInfo.contextTypes = {
    Table: _propTypes2.default.object
};
MainInfo.defaultProps = {
    columns: [],
    columnWidths: {},
    data: {},
    actionWidth: 0,
    actionStyle: {},
    actions: []
};

var Content = function (_React$Component3) {
    (0, _inherits3.default)(Content, _React$Component3);

    function Content(props) {
        (0, _classCallCheck3.default)(this, Content);

        var _this9 = (0, _possibleConstructorReturn3.default)(this, (Content.__proto__ || (0, _getPrototypeOf2.default)(Content)).call(this, props));

        _initialiseProps.call(_this9);

        return _this9;
    }

    (0, _createClass3.default)(Content, [{
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'getValue',
        value: function getValue(column, Content) {
            return column.render ? column.render(Content) : _utils2.default.render(Content, column);
        }
    }, {
        key: 'isChecked',
        value: function isChecked() {
            var checked = this.context.Table.state.checked;
            var mainInfo = this.context.Table.props.mainInfo;
            var _mainInfo$primaryKey = mainInfo.primaryKey,
                primaryKey = _mainInfo$primaryKey === undefined ? "id" : _mainInfo$primaryKey;

            return checked[_lodash2.default.get(this.props.data, primaryKey)] || 0;
        }
    }, {
        key: 'isDetailChecked',
        value: function isDetailChecked(detail) {
            var detailChecked = this.context.Table.state.detailChecked;
            var primaryKey = this.context.Table.props.primaryKey;

            return detailChecked[_lodash2.default.get(detail, primaryKey)] || 0;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this10 = this;

            var _context$Table = this.context.Table,
                props = _context$Table.props,
                state = _context$Table.state;

            var details = _lodash2.default.get(this.props.data, props.detailKey) || [];
            var columns = props.columns,
                mainInfo = props.mainInfo,
                checkboxColumnWidth = props.checkboxColumnWidth,
                spacey = props.spacey;
            var _mainInfo$showCheckbo = mainInfo.showCheckboxes,
                showCheckboxes = _mainInfo$showCheckbo === undefined ? true : _mainInfo$showCheckbo;

            var columnWidths = this.context.Table.getColumnWidths();
            return _react2.default.createElement(
                'div',
                { className: 'table-container bordered', style: {
                        marginBottom: spacey,
                        marginTop: spacey,
                        width: this.props.width,
                        borderLeft: 0,
                        borderRight: 0,
                        minWidth: "100%",
                        overflow: "hidden"
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'flex middle table-header-bg', style: { height: 32 } },
                    showCheckboxes && _react2.default.createElement(
                        'div',
                        { ref: 'checkbox', className: 'text-center',
                            style: { width: state.checkboxColumnWidth, minWidth: state.checkboxColumnWidth, marginRight: 4 } },
                        _react2.default.createElement(_checkbox2.default, { checked: this.isChecked(), onCheck: this.handleCheck })
                    ),
                    !this.props.onlyShowCheckbox && _react2.default.createElement(
                        'div',
                        { style: { flexGrow: 1 } },
                        _lodash2.default.isFunction(mainInfo) ? mainInfo(this.props.data) : _react2.default.createElement(MainInfo, (0, _extends3.default)({}, mainInfo, { data: this.props.data }))
                    )
                ),
                details.length > 0 && _react2.default.createElement(
                    'div',
                    { className: 'table-body relative', style: { width: "calc(100% + 2px)" } },
                    _react2.default.createElement(
                        'table',
                        { className: 'table bordered',
                            style: { width: this.props.width, tableLayout: 'fixed', minWidth: "100%" } },
                        _react2.default.createElement(
                            'tbody',
                            null,
                            details.map(function (detail, index) {
                                return _react2.default.createElement(
                                    'tr',
                                    { key: index },
                                    (showCheckboxes || props.showCheckboxes) && _react2.default.createElement(
                                        'td',
                                        { className: 'text-center',
                                            style: { width: state.checkboxColumnWidth || checkboxColumnWidth } },
                                        props.showCheckboxes ? _react2.default.createElement(_checkbox2.default, { checked: _this10.isDetailChecked(detail), onCheck: _this10.handleDetailCheck(detail) }) : index + 1
                                    ),
                                    !_this10.props.onlyShowCheckbox && columns.map(function (column, index) {
                                        return _react2.default.createElement(
                                            'td',
                                            { key: index,
                                                style: {
                                                    width: columnWidths[column.key],
                                                    textAlign: column.textAlign
                                                } },
                                            _this10.getValue(column, detail)
                                        );
                                    }),
                                    _this10.props.extraWidth > 0 && _react2.default.createElement('td', { style: { width: _this10.props.extraWidth } })
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);
    return Content;
}(_react2.default.Component);

Content.defaultProps = {
    onlyShowCheckbox: false
};
Content.contextTypes = {
    Table: _propTypes2.default.object
};

var _initialiseProps = function _initialiseProps() {
    var _this13 = this;

    this.handleCheck = function (event, isInputCheck) {
        var _context$Table2 = _this13.context.Table,
            props = _context$Table2.props,
            state = _context$Table2.state;
        var checked = state.checked,
            detailChecked = state.detailChecked;
        var primaryKey = props.primaryKey;

        var details = _lodash2.default.get(_this13.props.data, props.detailKey) || [];
        if (isInputCheck) {
            checked[_lodash2.default.get(_this13.props.data, primaryKey)] = 1;
            details.forEach(function (detail) {
                detailChecked[_lodash2.default.get(detail, primaryKey)] = 1;
            });
        } else {
            delete checked[_lodash2.default.get(_this13.props.data, primaryKey)];
            details.forEach(function (detail) {
                delete detailChecked[_lodash2.default.get(detail, primaryKey)];
            });
        }
        _this13.context.Table.setChecked(checked, detailChecked);
    };

    this.handleDetailCheck = function (detail) {
        return function (event, isInputCheck) {
            var _context$Table3 = _this13.context.Table,
                props = _context$Table3.props,
                state = _context$Table3.state;
            var checked = state.checked,
                detailChecked = state.detailChecked;
            var primaryKey = props.primaryKey;

            var details = _lodash2.default.get(_this13.props.data, props.detailKey) || [];
            if (isInputCheck) {
                detailChecked[_lodash2.default.get(detail, primaryKey)] = 1;
            } else {
                delete detailChecked[_lodash2.default.get(detail, primaryKey)];
            }
            var detailCheckedLength = details.reduce(function (total, item) {
                return total + (detailChecked[_lodash2.default.get(item, primaryKey)] === 1 ? 1 : 0);
            }, 0);
            if (details.length === detailCheckedLength) {
                checked[_lodash2.default.get(_this13.props.data, primaryKey)] = 1;
            } else if (detailCheckedLength === 0) {
                delete checked[_lodash2.default.get(_this13.props.data, primaryKey)];
            } else {
                checked[_lodash2.default.get(_this13.props.data, primaryKey)] = 2;
            }
            _this13.context.Table.setChecked(checked, detailChecked);
        };
    };
};

var FixedCheckbox = function (_React$Component4) {
    (0, _inherits3.default)(FixedCheckbox, _React$Component4);

    function FixedCheckbox(props) {
        (0, _classCallCheck3.default)(this, FixedCheckbox);
        return (0, _possibleConstructorReturn3.default)(this, (FixedCheckbox.__proto__ || (0, _getPrototypeOf2.default)(FixedCheckbox)).call(this, props));
    }

    (0, _createClass3.default)(FixedCheckbox, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this12 = this;

            this.token1 = this.context.Table.subscribe("scrollLeftChange", function () {
                _this12.forceUpdate();
            });
            this.token2 = this.context.Table.subscribe("scrollTopChange", function () {
                (0, _jquery2.default)(_this12.refs.Content).scrollTop(_this12.context.Table.state.scrollTop);
            });
            (0, _jquery2.default)(this.refs.Content).scrollTop(this.context.Table.state.scrollTop);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            (0, _jquery2.default)(this.refs.Content).scrollTop(this.context.Table.state.scrollTop);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.context.Table.unsubscribe(this.token1);
            this.context.Table.unsubscribe(this.token2);
        }
    }, {
        key: 'render',
        value: function render() {
            var Table = this.context.Table;
            var state = Table.state,
                props = Table.props;

            var checkboxColumnWidth = state.checkboxColumnWidth || props.checkboxColumnWidth;
            var _props$mainInfo$showC2 = props.mainInfo.showCheckboxes,
                showCheckboxes = _props$mainInfo$showC2 === undefined ? true : _props$mainInfo$showC2;

            var containerStyle = {
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 3,
                width: checkboxColumnWidth - 2,
                backgroundColor: '#fff',
                overflow: 'hidden',
                bottom: props.pager ? 32 : 0
            };
            if (state.scrollLeft && state.scrollLeft > 0) {
                containerStyle.boxShadow = '6px 0 6px rgba(0,0,0,0.1)';
            }
            if (props.dataSource.length == 0 || showCheckboxes === false && props.showCheckboxes === false || state.scrollLeft == 0) {
                return null;
            }
            return _react2.default.createElement(
                'div',
                { style: containerStyle },
                _react2.default.createElement(
                    'div',
                    { className: 'table-container full-height text-small', style: { overflow: "hidden" } },
                    props.hasHeader && _react2.default.createElement(
                        'div',
                        {
                            ref: 'header',
                            className: 'table-header',
                            style: {
                                width: "calc(100% + 2px)",
                                overflow: "hidden",
                                height: 38,
                                minHeight: 38
                            } },
                        _react2.default.createElement(
                            'table',
                            { className: 'table bordered',
                                style: { tableLayout: 'fixed', width: checkboxColumnWidth } },
                            _react2.default.createElement(
                                'thead',
                                null,
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'th',
                                        { style: { width: checkboxColumnWidth, textAlign: "center", lineHeight: 1 } },
                                        _react2.default.createElement(_checkbox2.default, { checked: Table.isAllChecked(), onCheck: Table.handleCheckAll })
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { ref: 'Content', style: { flexGrow: 1, overflow: "hidden" } },
                        props.dataSource.map(function (data, index) {
                            return _react2.default.createElement(Content, { key: index, data: data, width: checkboxColumnWidth,
                                onlyShowCheckbox: true, fixedLeftCols: props.fixedLeftCols });
                        })
                    )
                )
            );
        }
    }]);
    return FixedCheckbox;
}(_react2.default.Component);

FixedCheckbox.contextTypes = {
    Table: _propTypes2.default.object
};