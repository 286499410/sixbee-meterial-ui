'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

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

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nav2 = function (_Component) {
    (0, _inherits3.default)(Nav2, _Component);

    function Nav2(props) {
        (0, _classCallCheck3.default)(this, Nav2);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Nav2.__proto__ || (0, _getPrototypeOf2.default)(Nav2)).call(this, props));

        _this.mode = ['horizontal', 'vertical', 'vertical-pop'];
        _this.theme = ['light', 'dark'];
        _this.state = {
            dataSource: [],
            selectedKey: undefined,
            unFoldedKeySet: new _set2.default(),
            foldedKeySet: new _set2.default()
        };

        _this.getDataSource = function () {
            return new _promise2.default(function (resolve, reject) {
                var dataSource = _this.props.dataSource;
                if (_lodash2.default.isFunction(dataSource)) {
                    dataSource = dataSource();
                }
                if (_lodash2.default.isArray(dataSource)) {
                    resolve(dataSource);
                } else if (_lodash2.default.isFunction(dataSource)) {
                    dataSource = dataSource();
                    if (_lodash2.default.isArray(dataSource)) {
                        resolve(dataSource);
                    } else if (dataSource instanceof _promise2.default) {
                        dataSource.then(function (data) {
                            if (_lodash2.default.isArray(data)) {
                                resolve(data);
                            }
                        });
                    }
                } else if (dataSource instanceof _promise2.default) {
                    dataSource.then(function (data) {
                        if (_lodash2.default.isArray(data)) {
                            resolve(data);
                        }
                    });
                }
            });
        };

        _this.updateDataSource = function (dataSource) {
            _this.state.dataSource = dataSource;
            if (_this.state.selectedKey) {
                _this.initFold();
            }
            _this.forceUpdate();
        };

        _this.getRootRef = function (key) {
            var ref = _this.refs[key];
            if (ref && ref.props.parentKey) {
                return _this.getRootRef(ref.props.parentKey);
            }
            return ref;
        };

        _this.isCollapsed = function () {
            return _this.props.collapsed || false;
        };

        _this.isSelected = function (item) {
            var selectedKey = _this.state.selectedKey === undefined ? _this.props.defaultSelectedKey : _this.state.selectedKey;
            var key = item.key || item.dataKey;
            return key == selectedKey || item.url == selectedKey;
        };

        _this.isFolded = function (item) {
            var key = item.key || item.dataKey;
            if (_this.state.unFoldedKeySet.has(key)) {
                return false;
            }
            return item.open === false || _this.state.foldedKeySet.has(key) || _this.props.defaultFolded;
        };

        _this.handleSelect = function (item) {
            return function (event) {
                var key = item.key || item.dataKey;
                if (_this.state.selectedKey != key) {
                    if (_this.props.onClick) {
                        _this.props.onClick(item);
                    }
                    _this.setState({ selectedKey: key });
                }
                if (_this.props.mode == 'vertical-pop') {
                    var ref = _this.getRootRef(key);
                    if (ref) {
                        ref.setState({ popHidden: true });
                    }
                }
            };
        };

        _this.handleFold = function (item, parentKey) {
            return function (event) {
                var key = item.key || item.dataKey;
                if (_this.props.mode == 'vertical') {
                    if (!parentKey) {
                        _this.state.dataSource.map(function (data) {
                            _this.state.foldedKeySet.delete(data.key || data.dataKey);
                            _this.state.unFoldedKeySet.delete(data.key || data.dataKey);
                        });
                    }
                    if ((0, _jquery2.default)(event.target).parent().is('.folded') || (0, _jquery2.default)(event.target).parent().parent().is('.folded')) {
                        _this.state.foldedKeySet.delete(key);
                        _this.state.unFoldedKeySet.add(key);
                    } else {
                        _this.state.foldedKeySet.add(key);
                        _this.state.unFoldedKeySet.delete(key);
                    }
                    _this.forceUpdate();
                }
            };
        };

        _this.renderNavItem = function (item) {
            var parentKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var key = item.key || item.dataKey;
            if (_lodash2.default.isArray(item.children) && item.children.length > 0) {
                var children = [],
                    selected = false,
                    groups = [];
                item.children.map(function (subItem, index) {
                    if (groups.indexOf(subItem.group_name) < 0) {
                        groups.push(subItem.group_name);
                    }
                    var col = parseInt(index / 7);
                    var ret = _this.renderNavItem(subItem, key);
                    if (!children[col]) {
                        children[col] = [];
                    }
                    children[col].push(ret.component);
                    selected = selected || ret.selected;
                });
                var hasGroups = groups.length > 2 || groups.length == 1 && groups[1];
                return {
                    component: _react2.default.createElement(
                        Subnav,
                        {
                            key: key,
                            parentKey: parentKey,
                            itemKey: key,
                            label: item.label || item.title,
                            icon: item.icon,
                            iconPrefix: _this.props.iconPrefix,
                            folded: _this.isFolded(item),
                            selected: selected,
                            containerStyle: hasGroups ? (0, _extends3.default)({
                                maxHeight: 400,
                                flexWrap: "wrap",
                                flexDirection: "column"
                            }, item.subStyle) : undefined,
                            onClick: _this.handleFold(item, parentKey) },
                        !hasGroups ? children.map(function (data, index) {
                            return _react2.default.createElement(
                                'ul',
                                { key: index, className: 'sub-nav' },
                                data
                            );
                        }) : groups.map(function (group_name, index) {
                            return _react2.default.createElement(
                                'ul',
                                { key: index, className: 'sub-nav' },
                                _react2.default.createElement(
                                    'li',
                                    { className: 'text-primary', style: { fontSize: 16, paddingLeft: 14 } },
                                    _lodash2.default.get(item, 'groupHelperText.' + group_name) ? _react2.default.createElement(
                                        'div',
                                        { className: 'flex middle' },
                                        _react2.default.createElement(
                                            'div',
                                            null,
                                            group_name
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            null,
                                            _react2.default.createElement(_icon2.default, { type: 'button', name: 'question-circle', tooltip: _lodash2.default.get(item, 'groupHelperText.' + group_name), color: '#222' })
                                        )
                                    ) : group_name
                                ),
                                item.children.filter(function (subItem) {
                                    return subItem.group_name == group_name;
                                }).map(function (subItem) {
                                    return _this.renderNavItem(subItem, key).component;
                                })
                            );
                        })
                    ),
                    selected: selected
                };
            } else {
                var _selected = _this.isSelected(item);
                return {
                    component: _react2.default.createElement(NavItem, {
                        key: key,
                        parentKey: parentKey,
                        itemKey: key,
                        selected: _this.isSelected(item),
                        onClick: _this.handleSelect(item),
                        icon: item.icon,
                        iconPrefix: _this.props.iconPrefix,
                        helperText: item.helper_text,
                        label: item.label || item.title }),
                    selected: _selected
                };
            }
        };

        if (props.selectedKey) {
            _this.state.selectedKey = props.selectedKey;
        }
        if (props.dataSource) {
            _this.getDataSource().then(function (dataSource) {
                _this.updateDataSource(dataSource);
            });
        }
        return _this;
    }

    (0, _createClass3.default)(Nav2, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            (0, _jquery2.default)(this.refs.container).find('>.nav-item>.sub-nav-container').each(function () {
                var height = (0, _jquery2.default)(this)[0].scrollHeight;
                var grandson = (0, _jquery2.default)(this).find('.sub-nav-container');
                if (height && grandson.length == 0 && !(0, _jquery2.default)(this)[0].style.maxHeight) {
                    (0, _jquery2.default)(this).css('max-height', height);
                }
                (0, _jquery2.default)(this).css("width", (0, _jquery2.default)(this).find(".sub-nav").last().offset().left - (0, _jquery2.default)(this).find(".sub-nav").first().offset().left + (0, _jquery2.default)(this).find(".sub-nav").last().width() + 36);
                if ((0, _jquery2.default)(window).height() - (0, _jquery2.default)(this).parent().offset().top < height) {
                    (0, _jquery2.default)(this).css("top", (0, _jquery2.default)(window).height() - (0, _jquery2.default)(this).parent().offset().top - height - 20);
                }
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if (nextProps.selectedKey) {
                this.state.selectedKey = nextProps.selectedKey;
            }
            if (nextProps.dataSource) {
                this.getDataSource().then(function (dataSource) {
                    _this2.updateDataSource(dataSource);
                });
            }
        }
    }, {
        key: 'initFold',
        value: function initFold() {
            var _this3 = this;

            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.dataSource;
            var parent = arguments[1];

            var parentKey = parent ? parent.key || parent.dataKey : '';
            dataSource.map(function (item) {
                var key = item.key || item.dataKey;
                if (item.url == _this3.state.selectedKey) {
                    if (parent) {
                        _this3.state.unFoldedKeySet.add(parentKey);
                    }
                }
                if (item.children) {
                    _this3.initFold(item.children, item);
                    if (_this3.state.unFoldedKeySet.has(key) && parent) {
                        _this3.state.unFoldedKeySet.add(parentKey);
                    }
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return _react2.default.createElement(
                'ul',
                { ref: 'container',
                    className: 'nav ' + this.props.mode + ' ' + this.props.theme + ' ' + (this.isCollapsed() ? 'collapsed' : ''),
                    style: this.props.style },
                this.state.dataSource.map(function (item) {
                    return _this4.renderNavItem(item).component;
                })
            );
        }
    }]);
    return Nav2;
}(_react.Component);

Nav2.defaultProps = {
    parentKey: 'parent_id',
    mode: 'vertical',
    theme: 'light',
    onClick: undefined,
    selectedKey: undefined,
    iconPrefix: 'iconfont icon-'
};
exports.default = Nav2;

var Subnav = function (_Component2) {
    (0, _inherits3.default)(Subnav, _Component2);

    function Subnav() {
        var _ref;

        var _temp, _this5, _ret;

        (0, _classCallCheck3.default)(this, Subnav);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this5 = (0, _possibleConstructorReturn3.default)(this, (_ref = Subnav.__proto__ || (0, _getPrototypeOf2.default)(Subnav)).call.apply(_ref, [this].concat(args))), _this5), _this5.state = {
            popHidden: false
        }, _this5.handleClick = function (event) {
            if (_this5.props.onClick) {
                _this5.props.onClick(event);
            }
        }, _this5.handleDoubleClick = function (event) {
            if (_this5.props.onDoubleClick) {
                _this5.props.onDoubleClick(event);
            }
        }, _this5.handleMouseEnter = function (event) {
            if (_this5.state.popHidden == true) {
                _this5.setState({ popHidden: false });
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this5, _ret);
    }

    (0, _createClass3.default)(Subnav, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'li',
                { 'auth-key': this.props.itemKey,
                    className: 'nav-item' + (this.props.folded ? ' folded' : '') + (this.props.selected ? ' as-selected' : '') + (this.state.popHidden ? ' pop-hidden' : '') },
                _react2.default.createElement(
                    'label',
                    { className: 'folder', onClick: this.handleClick, onDoubleClick: this.handleDoubleClick,
                        onMouseEnter: this.handleMouseEnter },
                    this.props.icon ? _react2.default.createElement(_icon2.default, { name: this.props.icon, classPrefix: this.props.iconPrefix,
                        iconStyle: { paddingRight: 6 } }) : null,
                    _react2.default.createElement(
                        'span',
                        { className: 'label' },
                        this.props.label
                    ),
                    _react2.default.createElement('i', { className: 'arrow' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'sub-nav-container', style: this.props.containerStyle },
                    this.props.children
                )
            );
        }
    }]);
    return Subnav;
}(_react.Component);

var NavItem = function (_Component3) {
    (0, _inherits3.default)(NavItem, _Component3);

    function NavItem() {
        var _ref2;

        var _temp2, _this6, _ret2;

        (0, _classCallCheck3.default)(this, NavItem);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this6 = (0, _possibleConstructorReturn3.default)(this, (_ref2 = NavItem.__proto__ || (0, _getPrototypeOf2.default)(NavItem)).call.apply(_ref2, [this].concat(args))), _this6), _this6.handleClick = function (event) {
            if (_this6.props.onClick) {
                _this6.props.onClick(event);
            }
        }, _temp2), (0, _possibleConstructorReturn3.default)(_this6, _ret2);
    }

    (0, _createClass3.default)(NavItem, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'li',
                { className: 'nav-item ' + (this.props.selected ? ' selected' : ''), 'data-key': this.props.itemKey,
                    'auth-key': this.props.itemKey },
                _react2.default.createElement(
                    'label',
                    { onClick: this.handleClick },
                    this.props.icon ? _react2.default.createElement(_icon2.default, { name: this.props.icon, classPrefix: this.props.iconPrefix,
                        style: { paddingRight: 6 } }) : null,
                    _react2.default.createElement(
                        'span',
                        { className: 'label', style: this.props.selected && this.props.helperText ? { transform: "none" } : undefined },
                        this.props.helperText ? _react2.default.createElement(
                            'div',
                            { className: 'flex middle' },
                            _react2.default.createElement(
                                'div',
                                null,
                                this.props.label
                            ),
                            _react2.default.createElement(_icon2.default, { type: 'button', name: 'question-circle', tooltip: this.props.helperText, color: '#222' })
                        ) : this.props.label
                    )
                )
            );
        }
    }]);
    return NavItem;
}(_react.Component);