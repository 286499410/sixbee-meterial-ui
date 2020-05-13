'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _reactCustomScrollbars = require('react-custom-scrollbars');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _control = require('./control');

var _control2 = _interopRequireDefault(_control);

var _formTable = require('./controls/form-table');

var _formTable2 = _interopRequireDefault(_formTable);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _tabs = require('./tabs');

var _tabs2 = _interopRequireDefault(_tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATUS_INIT = 'init';
var STATUS_EDITING = 'editing';
var STATUS_CHECKERROR = 'checkError';
var STATUS_SUBMITTING = 'submitting';
var STATUS_SUBMITTED = 'submitted';
var STATUS_ERROR = 'error';
var Form = function (_Component) {
    (0, _inherits3.default)(Form, _Component);
    (0, _createClass3.default)(Form, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                Form: this,
                state: this.state
            };
        }
    }]);

    function Form(props) {
        (0, _classCallCheck3.default)(this, Form);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).call(this, props));

        _initialiseProps.call(_this);

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Form, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.onDidMount) {
                this.props.onDidMount(this);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.onDidUpdate) {
                this.props.onDidUpdate(this);
            }
        }
    }, {
        key: 'setChangedData',
        value: function setChangedData(data) {
            (0, _assign2.default)(this.state.changedData, data);
        }
    }, {
        key: 'setOriginData',
        value: function setOriginData(data) {
            (0, _assign2.default)(this.state.originData, data);
            this.setFieldOriginData(this.props.fields);
        }
    }, {
        key: 'setFieldDefaultData',
        value: function setFieldDefaultData(fields) {
            var _this2 = this;

            fields.map(function (field) {
                if (field.defaultValue !== undefined) {
                    var defaultValue = field.defaultValue;
                    if (_lodash2.default.isFunction(defaultValue)) {
                        defaultValue = defaultValue(_this2);
                    }
                    _lodash2.default.set(_this2.state.fieldDefaultData, field.formKey || field.key, defaultValue);
                }
                if (field.fields) {
                    _this2.setFieldDefaultData(field.fields);
                }
            });
        }
    }, {
        key: 'setFieldOriginData',
        value: function setFieldOriginData(fields) {
            var _this3 = this;

            fields.map(function (field) {
                var value = _lodash2.default.get(_this3.state.originData, field.formKey || field.key);
                if (value !== undefined) {
                    _lodash2.default.set(_this3.state.feildOriginData, field.formKey || field.key, value);
                }
                if (field.fields) {
                    _this3.setFieldOriginData(field.fields);
                }
            });
        }
    }, {
        key: 'getData',
        value: function getData() {
            var dataScope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.dataScope;

            var defaultData = (0, _assign2.default)({}, this.state.fieldDefaultData, this.props.defaultData);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(defaultData)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    if (this.state.feildOriginData[key] !== undefined) {
                        delete defaultData[key];
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            switch (dataScope) {
                case 'all':
                    return _lodash2.default.merge({}, defaultData, this.state.feildOriginData, this.state.changedData);
                case 'changed':
                    return _lodash2.default.merge({}, defaultData, this.state.changedData);
                case 'all-extra':
                    return _lodash2.default.merge({}, defaultData, this.state.originData, this.state.changedData);
            }
        }
    }, {
        key: 'getAllData',
        value: function getAllData() {
            return this.getData('all');
        }
    }, {
        key: 'getAllExtraData',
        value: function getAllExtraData() {
            return this.getData('all-extra');
        }
    }, {
        key: 'getChangedData',
        value: function getChangedData() {
            return this.getData('changed');
        }
    }, {
        key: 'beforeSubmit',
        value: function beforeSubmit(submitData, allData) {
            if (this.props.beforeSubmit) {
                return this.props.beforeSubmit(submitData, allData, this);
            }
            return true;
        }
    }, {
        key: 'check',
        value: function check(data) {
            var alert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (this.props.check) {
                var errorMsg = this.props.check(data, alert);
                if (errorMsg !== true) {
                    console.log('errorMsg', errorMsg);
                    this.setState({ errorText: errorMsg });
                    return false;
                } else {
                    this.setState({ errorText: {} });
                }
            }
            return true;
        }
    }, {
        key: 'submit',
        value: function submit() {
            var _this4 = this;

            var allData = this.getData('all');
            var submitData = this.getData();

            if (!this.check(allData)) {
                return false;
            }
            if (this.beforeSubmit(submitData, this) === false) {
                return false;
            }
            this.state.errorText = {};
            if (this.props.onSubmit) {
                this.setFormStatus(STATUS_SUBMITTING);
                var promise = this.props.onSubmit(submitData);
                if (promise instanceof _promise2.default) {
                    promise.then(function () {
                        _this4.setFormStatus(STATUS_SUBMITTED);
                    }, function (res) {
                        if (res instanceof Response) {
                            res.json().then(function (json) {
                                if (json.errCode == 10002 && json.validator) {
                                    _this4.setFormStatus(STATUS_CHECKERROR);
                                    _this4.setState({ errorText: json.validator });
                                } else {
                                    _this4.setFormStatus(STATUS_ERROR);
                                }
                                if (_this4.props.afterSubmit) {
                                    _this4.props.afterSubmit(json);
                                }
                            });
                        } else {
                            _this4.setFormStatus(STATUS_ERROR);
                        }
                    });
                } else {
                    this.setFormStatus(STATUS_ERROR);
                }
            }
            return true;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.setState({
                changedData: {}
            });
            if (this.props.onReset) {
                this.props.onReset(this);
            }
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            if (this.props.onCancel) {
                this.props.onCancel(this);
            } else {
                history.go(-1);
            }
        }
    }, {
        key: 'setFormStatus',
        value: function setFormStatus(status) {
            this.state.formStatus = status;
            if (this.refs.actions) this.refs.actions.forceUpdate();
            if (this.props.onChangeStatus) {
                this.props.onChangeStatus(status);
            }
        }
    }, {
        key: 'getControl',
        value: function getControl(key) {
            return this.refs[key] || undefined;
        }
    }, {
        key: 'getFields',
        value: function getFields(keys) {
            var fields = [];
            this.props.fields.map(function (field) {
                if (keys.indexOf(field.key) >= 0) {
                    fields.push(field);
                }
            });
            return fields;
        }
    }, {
        key: 'isShow',
        value: function isShow(field, data) {
            if (field.isShow) {
                if (_lodash2.default.isBoolean(field.isShow)) {
                    return field.isShow;
                } else if (_lodash2.default.isFunction(field.isShow)) {
                    return field.isShow(data, this);
                }
            }
            return true;
        }
    }, {
        key: 'getTabDataSource',
        value: function getTabDataSource() {
            var _this5 = this;

            return this.props.tabs.map(function (tab) {
                return {
                    label: tab.label,
                    content: _react2.default.createElement(
                        _reactCustomScrollbars.Scrollbars,
                        { style: { width: _this5.props.width, height: '100%' } },
                        _react2.default.createElement(
                            'div',
                            { className: 'space', style: (0, _extends3.default)({ width: '100%', overflowX: 'hidden' }, _this5.props.style) },
                            _react2.default.createElement(
                                'div',
                                { className: 'form row-space', cols: _this5.props.cols },
                                _this5.renderControls(_this5.getFields(tab.fields))
                            )
                        )
                    )
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var footerHeight = 54;
            var contentHeight = this.props.height;
            if (this.props.actions !== false && this.props.actions.length !== 0) {
                contentHeight = 'calc(100% - ' + footerHeight + 'px)';
            }
            var borderStyle = this.props.borderStyle || this.context.muiTheme.controlBorderStyle || 'underline';
            return _react2.default.createElement(
                'div',
                { className: "relative " + this.props.className,
                    style: (0, _extends3.default)({
                        width: this.props.width,
                        height: _lodash2.default.isNumber(this.props.height) ? this.props.height : 'calc(' + this.props.height + ')'
                    }, this.props.style) },
                this.props.tabs ? _react2.default.createElement(
                    'div',
                    { style: { height: contentHeight } },
                    _react2.default.createElement(_tabs2.default, {
                        activeIndex: this.state.tabIndex,
                        onChange: this.handleTabChange,
                        dataSource: this.getTabDataSource(),
                        labelStyle: { justifyContent: 'center', margin: 12 } })
                ) : _react2.default.createElement(
                    _reactCustomScrollbars.Scrollbars,
                    { style: { height: contentHeight },
                        autoHeight: this.props.height == 'auto',
                        autoHeightMax: contentHeight },
                    _react2.default.createElement(
                        'div',
                        { className: 'space', style: {
                                width: '100%',
                                overflowX: 'hidden',
                                padding: this.props.padding !== undefined ? this.props.padding : borderStyle === 'border' ? 24 : 20
                            } },
                        _react2.default.createElement(
                            'div',
                            { className: "form " + (this.props.inlineFlex ? "flex middle warp" : "row-space"),
                                cols: this.props.cols },
                            this.renderControls(this.props.fields),
                            this.props.inlineFlex ? _react2.default.createElement(FormActions, { ref: 'actions',
                                actions: this.props.actions,
                                style: this.props.actionStyle,
                                inlineFlex: this.props.inlineFlex }) : null
                        )
                    )
                ),
                this.props.actions === false || this.props.actions.length == 0 || this.props.inlineFlex ? null : _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('div', { style: { height: footerHeight } }),
                    _react2.default.createElement(
                        'div',
                        { style: { position: 'absolute', bottom: 0, left: 0, right: 0 } },
                        _react2.default.createElement(FormActions, { ref: 'actions', actions: this.props.actions, style: this.props.actionStyle })
                    )
                )
            );
        }
    }]);
    return Form;
}(_react.Component);

Form.childContextTypes = {
    Form: _propTypes2.default.object,
    state: _propTypes2.default.object
};
Form.defaultProps = {

    onChange: undefined,
    onChangeStatus: undefined,
    onDidMount: undefined,
    onDidUpdate: undefined,
    beforeSubmit: undefined,
    afterSubmit: undefined,

    inlineFlex: false,
    inline: false,
    width: '100%',
    height: 400,
    cols: 1,
    actions: ['reset', 'submit'],
    defaultData: {},
    changedData: undefined,
    originData: undefined,
    dataScope: 'changed',
    controlSize: 'default',
    controlWidth: '100%',
    fields: [],
    controlBetweenSpace: 8,
    controlProps: {},

    resetLabel: '重置',
    submitLabel: '提交',
    cancelLabel: '取消'
};
Form.contextTypes = {
    muiTheme: _propTypes2.default.object
};

var _initialiseProps = function _initialiseProps() {
    var _this6 = this;

    this.state = {
        formStatus: STATUS_INIT,
        originData: {},
        fieldDefaultData: {},
        fieldOriginData: {},
        changedData: {},
        errorText: {},
        tabIndex: 0
    };

    this.initData = function (props) {
        if (_lodash2.default.isFunction(props.originData)) {
            _this6.state.originData = props.originData();
        } else if (props.originData !== undefined) {
            _this6.state.originData = props.originData;
        }
        if (props.changedData !== undefined) {
            _this6.state.changedData = props.changedData;
        }
        if (props.tabIndex !== undefined) {
            _this6.state.tabIndex = props.tabIndex;
        }

        _this6.state.fieldDefaultData = {};
        _this6.setFieldDefaultData(_this6.props.fields);

        _this6.state.feildOriginData = {};
        _this6.setFieldOriginData(_this6.props.fields);
    };

    this.handleChange = function (field) {
        return function (value, control) {
            _this6.setFormStatus(STATUS_EDITING);
            _lodash2.default.set(_this6.state.changedData, field.formKey || field.key, value);
            var data = _this6.getData('all');
            if (field.onChange) {
                var _value = _lodash2.default.get(data, field.formKey || field.key);
                field.onChange(_value, control, _this6);
            }
            if (_this6.props.onChange) {
                _this6.props.onChange(data, field, control, _this6);
            }
            if ((0, _keys2.default)(_this6.state.errorText).length > 0) {
                var allData = _this6.getData('all');
                _this6.check(allData, false);
            }
            _this6.forceUpdate();
        };
    };

    this.renderControls = function (fields) {
        var data = _this6.getData('all');
        var allExtraData = _this6.getData('all-extra');
        var cols = _this6.props.cols || 1;
        return fields.map(function (field, index) {
            var value = _lodash2.default.get(data, field.formKey || field.key);
            var isShow = _this6.isShow(field, allExtraData);
            if (!isShow) {
                return null;
            }

            if (field.convert) value = field.convert(allExtraData);
            var fieldCols = field.cols || 1;
            var controlProps = _lodash2.default.get(_this6.props.controlProps, field.formKey || field.key, {});
            switch (field.type) {
                case 'group':
                    return _react2.default.createElement(
                        'div',
                        { key: index, className: 'col col-' + fieldCols + ' ' + (!isShow ? 'hidden' : '') },
                        _react2.default.createElement(
                            'div',
                            { style: {
                                    width: field.width || _this6.props.controlWidth
                                } },
                            _react2.default.createElement(
                                'div',
                                { className: 'row-space', cols: field.groupCols || cols },
                                field.label ? _react2.default.createElement(
                                    'div',
                                    { className: 'col col-full form-group-title',
                                        style: {
                                            marginTop: 16,
                                            marginBottom: _this6.props.inline ? 16 : 0
                                        } },
                                    field.label
                                ) : null,
                                _this6.renderControls(field.fields)
                            )
                        )
                    );
                case 'table':
                    return _react2.default.createElement(
                        'div',
                        { className: 'col col-' + fieldCols + ' ' + (!isShow ? 'hidden' : ''), key: index },
                        _react2.default.createElement(_formTable2.default, (0, _extends3.default)({
                            ref: field.key
                        }, field, {
                            columns: field.fields,
                            value: value,
                            controlSize: _this6.props.controlSize,
                            data: allExtraData,
                            context: _this6,
                            onChange: _this6.handleChange(field) }))
                    );
                case 'multi':
                    return _react2.default.createElement(
                        'div',
                        { key: index, cols: cols, className: 'col col-full' },
                        _react2.default.createElement(
                            'div',
                            { className: 'flex middle' },
                            field.label ? _this6.props.inline ? _react2.default.createElement(
                                'div',
                                {
                                    style: {
                                        width: _this6.props.labelWidth,
                                        minWidth: _this6.props.labelWidth
                                    } },
                                field.label,
                                field.required ? _react2.default.createElement(
                                    'span',
                                    { className: 'text-danger' },
                                    '*'
                                ) : null
                            ) : _react2.default.createElement(
                                'div',
                                { className: 'col col-full',
                                    style: { marginTop: 16 } },
                                field.label
                            ) : null,
                            _react2.default.createElement(
                                'div',
                                { style: { flexGrow: 1, position: 'relative' } },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row-space large', cols: field.cols || field.fields.length },
                                    _this6.renderControls(field.fields, false)
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row-delimiter full-screen flex middle', style: { right: -25, zIndex: -1 } },
                                    field.fields.map(function (data, index) {
                                        return _react2.default.createElement(
                                            'div',
                                            { key: index,
                                                className: 'col text-right' },
                                            index == field.fields.length - 1 ? '' : field.delimiter
                                        );
                                    })
                                )
                            )
                        )
                    );
                case 'render':
                    return _react2.default.createElement(
                        'div',
                        { key: index, className: 'col col-' + fieldCols },
                        _react2.default.createElement(
                            'div',
                            { style: {
                                    width: field.width || _this6.props.controlWidth,
                                    paddingRight: field.paddingRight || _this6.props.controlPaddingRight,
                                    marginBottom: _this6.props.controlBetweenSpace
                                } },
                            field.render(data, _this6)
                        )
                    );
                default:
                    var control = _react2.default.createElement(_control2.default, (0, _extends3.default)({ ref: field.key,
                        value: value,
                        size: _this6.props.controlSize
                    }, (0, _extends3.default)({}, field, {
                        label: _this6.props.inline && field.type !== 'checkbox' ? false : field.label
                    }), {
                        labelFixed: _this6.props.labelFixed,
                        errorText: _lodash2.default.get(_this6.state.errorText, field.key),
                        validate: _this6.props.validate ? _this6.state.validate : false,
                        onChange: _this6.handleChange(field),
                        data: allExtraData,
                        context: _this6
                    }, controlProps));
                    if (_this6.props.inline) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'col col-' + fieldCols + ' ' + (!isShow ? 'hidden' : ''),
                                style: {
                                    marginBottom: _this6.props.inlineFlex ? 8 : _this6.props.controlBetweenSpace,
                                    marginRight: _this6.props.inlineFlex ? _this6.props.controlBetweenSpace : 0,
                                    paddingRight: field.paddingRight || _this6.props.controlPaddingRight
                                },
                                key: index },
                            _react2.default.createElement(
                                'div',
                                { className: 'flex middle ' + (!isShow ? 'hidden' : ''),
                                    style: { width: field.width || _this6.props.controlWidth } },
                                field.type !== 'checkbox' && field.label ? _react2.default.createElement(
                                    'div',
                                    {
                                        style: {
                                            width: field.labelWidth || _this6.props.labelWidth,
                                            minWidth: field.labelWidth || _this6.props.labelWidth,
                                            paddingRight: 8,
                                            paddingBottom: _lodash2.default.get(_this6.state.errorText, field.key) ? 16 : undefined
                                        } },
                                    field.required ? _react2.default.createElement(
                                        'span',
                                        { className: 'text-danger' },
                                        '*'
                                    ) : null,
                                    field.label,
                                    '\uFF1A'
                                ) : null,
                                _react2.default.createElement(
                                    'div',
                                    { style: { flexGrow: 1, width: 0 } },
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        control
                                    )
                                )
                            ),
                            field.helperText ? _react2.default.createElement(
                                'div',
                                {
                                    className: 'helper-text' },
                                _lodash2.default.isFunction(field.helperText) ? field.helperText(value, _this6) : field.helperText
                            ) : null
                        );
                    } else {
                        return _react2.default.createElement(
                            'div',
                            { className: 'col col-' + fieldCols + ' ' + (!isShow ? 'hidden' : ''), key: index,
                                style: { marginBottom: _this6.props.controlBetweenSpace } },
                            _react2.default.createElement(
                                'div',
                                { style: { width: field.width || _this6.props.controlWidth } },
                                control
                            ),
                            field.helperText ? _react2.default.createElement(
                                'div',
                                { className: 'helper-text' },
                                field.helperText
                            ) : null
                        );
                    }
            }
        });
    };

    this.handleTabChange = function (index) {
        _this6.setState({ tabIndex: index });
        if (_this6.props.onTabChange) {
            _this6.props.onTabChange(index);
        }
    };
};

exports.default = Form;

var FormActions = function (_Component2) {
    (0, _inherits3.default)(FormActions, _Component2);

    function FormActions() {
        var _ref;

        var _temp, _this7, _ret;

        (0, _classCallCheck3.default)(this, FormActions);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this7 = (0, _possibleConstructorReturn3.default)(this, (_ref = FormActions.__proto__ || (0, _getPrototypeOf2.default)(FormActions)).call.apply(_ref, [this].concat(args))), _this7), _this7.handleClick = function (key) {
            return function (event) {
                switch (key) {
                    case 'reset':
                        _this7.context.Form.reset.bind(_this7.context.Form)();
                        break;
                    case 'submit':
                        _this7.context.Form.submit.bind(_this7.context.Form)();
                        break;
                    case 'cancel':
                        _this7.context.Form.cancel.bind(_this7.context.Form)();
                        break;
                }
            };
        }, _temp), (0, _possibleConstructorReturn3.default)(_this7, _ret);
    }

    (0, _createClass3.default)(FormActions, [{
        key: 'getActions',
        value: function getActions() {
            var _this8 = this;

            var actions = [];
            var label = {
                reset: {
                    type: 'button',
                    label: this.context.Form.props.resetLabel,
                    buttonType: 'default',
                    onClick: this.handleClick('reset')
                },
                submit: {
                    type: 'button',
                    label: this.context.Form.props.submitLabel + (this.context.state.formStatus == STATUS_SUBMITTING ? '中...' : ''),
                    buttonType: this.context.state.formStatus == STATUS_SUBMITTING ? 'disabled' : 'primary',
                    onClick: this.handleClick('submit')
                },
                cancel: {
                    type: 'button',
                    label: this.context.Form.props.cancelLabel,
                    buttonType: 'default',
                    onClick: this.handleClick('cancel')
                }
            };
            this.props.actions.map(function (action) {
                if (_lodash2.default.isString(action)) {
                    actions.push((0, _extends3.default)({}, label[action]));
                } else if (label[action.key]) {
                    var disabled = _lodash2.default.isFunction(action.disabled) ? action.disabled(_this8.context.Form) : action.disabled;
                    actions.push((0, _extends3.default)({}, label[action.key], action, {
                        disabled: disabled
                    }));
                } else {
                    actions.push(action);
                }
            });
            return actions;
        }
    }, {
        key: 'render',
        value: function render() {
            var actions = this.getActions();
            if (this.props.inlineFlex) {
                return _react2.default.createElement(
                    'div',
                    { className: 'flex middle' },
                    actions.reverse().map(function (action, index) {
                        return _react2.default.createElement(_button2.default, {
                            key: index,
                            label: action.label,
                            type: action.buttonType || 'default',
                            onClick: action.onClick,
                            disabled: action.disabled,
                            style: { marginRight: 12, marginBottom: 10 }
                        });
                    })
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    { className: 'bg-white space',
                        style: (0, _extends3.default)({
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            textAlign: 'right',
                            boxShadow: '0 -1px 5px #ddd',
                            zIndex: 2
                        }, this.props.style) },
                    actions.map(function (action, index) {
                        if (action.type == 'text') {
                            return _react2.default.createElement(
                                'span',
                                { key: index, style: (0, _extends3.default)({ marginLeft: 12 }, action.style) },
                                action.label
                            );
                        } else {
                            return _react2.default.createElement(_button2.default, {
                                key: index,
                                label: action.label,
                                type: action.buttonType || 'default',
                                onClick: action.onClick,
                                disabled: action.disabled,
                                style: { marginLeft: 12 }
                            });
                        }
                    })
                );
            }
        }
    }]);
    return FormActions;
}(_react.Component);

FormActions.contextTypes = {
    Form: _propTypes2.default.object,
    state: _propTypes2.default.object
};