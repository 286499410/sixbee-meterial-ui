'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _tool = require('./tool');

var _tool2 = _interopRequireDefault(_tool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Validator = function () {
    function Validator() {
        var _this = this;

        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, Validator);
        this.rule = {};
        this.message = {};
        this.scene = {};
        this.label = {};
        this.state = {
            scene: false,
            errorMsg: {}
        };
        this.defaultMsg = {
            required: '[label]不能为空',
            integer: '[label]必须是整数',
            number: '[label]必须是数字',
            length: '[label]长度必须是[extend]位',
            min: '[label]长度至少[extend]位',
            max: '[label]长度不能超过[extend]位',
            between: '[label]必须在[extend]之间',
            email: '[label]必须是邮箱',
            url: '[label]必须是网址',
            confirm: '[label]不一致',
            ip: '[label]必须是IP地址',
            '>': '[label]必须大于[extend]',
            '>=': '[label]必须大于等于[extend]',
            '<': '[label]必须小于[extend]',
            '<=': '[label]必须小于等于[extend]',
            '==': '[label]必须等于[extend]',
            '!=': '[label]不能等于[extend]',
            'regex': '[label]正则匹配错误'
        };

        this.check = function (data, scene) {
            var errorFlag = false;
            if (scene === undefined) {
                scene = _this.state.scene;
            }
            if (_lodash2.default.isString(scene)) {
                scene = _this.scene[scene] || [];
            }
            _this.state.errorMsg = {};
            if (_lodash2.default.isArray(scene)) {
                scene.map(function (key) {
                    var validates = _this.parseRule(_this.rule[key]);
                    var label = _this.label[key] || '';
                    var ret = _this.validates(data, key, validates, label);
                    if (ret !== true) {
                        _this.setErrorMsg(key, ret);
                        errorFlag = true;
                    }
                });
            }
            return !errorFlag;
        };

        this.validates = function (data, key, validates, label) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(validates), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var validate = _step.value;

                    var ret = _this.validate(data, key, validate, label);
                    if (ret !== true) {
                        return ret;
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

            return true;
        };

        this.validate = function (data, key, validate, label) {
            var value = _lodash2.default.get(data, key);
            var isEmpty = _tool2.default.isEmpty(value);
            var valid = true;
            if (validate.type === 'required' && isEmpty) {
                valid = false;
            } else if (!isEmpty) {
                switch (validate.type) {
                    case 'length':
                        valid = value.length == validate.extend;
                        break;
                    case 'min':
                        valid = value.length >= validate.extend;
                        break;
                    case 'max':
                        valid = value.length <= validate.extend;
                        break;
                    case 'email':
                        valid = _tool2.default.isEmail(value);
                        break;
                    case 'url':
                        valid = _tool2.default.isUrl(value);
                        break;
                    case 'ip':
                        valid = _tool2.default.isIp(value);
                        break;
                    case 'integer':
                        valid = _tool2.default.isInteger(value);
                        break;
                    case 'number':
                        valid = _tool2.default.isNumber(value);
                        break;
                    case 'regex':
                        var regex = void 0;
                        if (_lodash2.default.isRegExp(validate.extend)) {
                            regex = validate.extend;
                        } else {
                            regex = eval(validate.extend);
                        }
                        if (_lodash2.default.isRegExp(regex)) {
                            valid = regex.test(value);
                        }
                        break;
                    case 'between':
                        var _validate$extend$spli = validate.extend.split(','),
                            _validate$extend$spli2 = (0, _slicedToArray3.default)(_validate$extend$spli, 2),
                            min = _validate$extend$spli2[0],
                            max = _validate$extend$spli2[1];

                        if (value < min || value > max) {
                            valid = false;
                        }
                        break;
                    case 'confirm':
                        var confirm = data[validate.extend];
                        valid = value === confirm;
                        break;
                    case '>':
                    case '>=':
                    case '<':
                    case '<=':
                    case '==':
                    case '!=':
                        valid = eval(value + validate.type + validate.extend);
                        break;
                    default:
                        if (_lodash2.default.isFunction(_this[validate.type])) {
                            var errorMsg = _this[validate.type](value, validate.extend, data, key);
                            if (errorMsg !== true) {
                                return errorMsg;
                            }
                        }
                }
            } else if (_lodash2.default.isFunction(_this[validate.type])) {
                var _errorMsg = _this[validate.type](value, validate.extend, data, key);
                if (_errorMsg !== true) {
                    return _errorMsg;
                }
            }
            if (!valid) {
                return _this.getErrorMsg(key, label, validate);
            }
            return valid;
        };

        this.config(config);
    }

    (0, _createClass3.default)(Validator, [{
        key: 'config',
        value: function config(_config) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)((0, _entries2.default)(_config)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _ref = _step2.value;

                    var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

                    var key = _ref2[0];
                    var value = _ref2[1];

                    this[key] = value;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'setScene',
        value: function setScene(scene) {
            this.state.scene = scene;
        }
    }, {
        key: 'getScene',
        value: function getScene() {
            return this.state.scene;
        }
    }, {
        key: 'parseRule',
        value: function parseRule(ruleStr) {
            var configs = ruleStr.toString().split('|');
            var validates = [];
            configs.map(function (config) {
                var type = void 0,
                    extend = void 0;
                if (_lodash2.default.isObject(config)) {
                    type = (0, _keys2.default)(config)[0];
                    extend = config[type];
                } else {
                    var _config$split = config.split(':');

                    var _config$split2 = (0, _slicedToArray3.default)(_config$split, 2);

                    type = _config$split2[0];
                    extend = _config$split2[1];
                }
                validates.push({ type: type, extend: extend });
            });
            return validates;
        }
    }, {
        key: 'getErrorMsg',
        value: function getErrorMsg(key, label, validate) {
            var errorMsg = void 0;
            if (_lodash2.default.get(this.message, key + '.' + validate.type)) {
                errorMsg = _lodash2.default.get(this.message, key + '.' + validate.type);
            } else {
                errorMsg = this.defaultMsg[validate.type] || '';
                errorMsg = errorMsg.replace('[label]', label);
                if (validate.extend) {
                    errorMsg = errorMsg.replace('[extend]', validate.extend);
                }
            }
            return errorMsg;
        }
    }, {
        key: 'setErrorMsg',
        value: function setErrorMsg(name, errorMsg) {
            this.state.errorMsg[name] = errorMsg;
        }
    }, {
        key: 'getError',
        value: function getError() {
            return (0, _assign2.default)({}, this.state.errorMsg);
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty(value) {
            return value === '' || value === undefined || value === null;
        }
    }]);
    return Validator;
}();

exports.default = Validator;