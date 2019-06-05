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

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Avatar = function (_Component) {
    (0, _inherits3.default)(Avatar, _Component);

    function Avatar(props) {
        (0, _classCallCheck3.default)(this, Avatar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Avatar.__proto__ || (0, _getPrototypeOf2.default)(Avatar)).call(this, props));

        _this.state = {
            src: ''
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Avatar, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            this.state.src = props.src;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var props = (0, _extends3.default)({}, this.props);
            delete props.defaultSrc;
            return _react2.default.createElement(_Avatar2.default, (0, _extends3.default)({}, props, { src: this.state.src, onError: function onError() {
                    if (_this2.props.defaultSrc) {
                        _this2.setState({ src: _this2.props.defaultSrc });
                    }
                    if (_this2.props.onError) {
                        _this2.props.onError();
                    }
                } }));
        }
    }]);
    return Avatar;
}(_react.Component);

exports.default = Avatar;
;