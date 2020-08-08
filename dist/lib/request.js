'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jqueryParam = require('jquery-param');

var _jqueryParam2 = _interopRequireDefault(_jqueryParam);

var _pubsubJs = require('pubsub-js');

var _pubsubJs2 = _interopRequireDefault(_pubsubJs);

var _sign = require('./sign');

var _sign2 = _interopRequireDefault(_sign);

var _tool = require('./tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Request = function () {
    function Request() {
        var _this = this;

        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, Request);
        this.contentType = {
            form: 'application/x-www-form-urlencoded',
            json: 'application/json',
            html: 'text/html',
            css: 'text/css',
            js: 'application/x-javascript'
        };
        this.config = {
            debug: false,
            autoSi: false,
            cross: true,
            root: '',
            baseUrl: '',
            documentRoot: '',
            dataType: 'form',
            responseType: 'json',
            headers: {}
        };
        this.state = {
            fetch: {}
        };

        this.unsubscribe = function () {
            var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (token) {
                _pubsubJs2.default.unsubscribe(token);
            }
        };

        this.getMode = function () {
            return _this.config.cross ? 'cors' : 'no-cors';
        };

        this.getBody = function (data, type) {
            var body = void 0;
            switch (type) {
                case 'json':
                    body = (0, _stringify2.default)(data);
                    break;
                default:
                    body = (0, _tool.objectToFormData)(data);
            }
            return body;
        };

        this.fetch = function (url, data, method) {
            var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _this.config.headers;
            var dataType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _this.config.dataType;

            _this.state.fetch = {
                url: url,
                data: data,
                method: method,
                headers: headers,
                dataType: dataType
            };
            if (method === 'PUT') {
                data._method = 'PUT';
            }
            if (_this.config.autoSi) {
                var attr = {};
                var appid = 'a' + 'p' + 'p' + 'i' + 'd';
                var appkey = 'a' + 'p' + 'p' + 'k' + 'e' + 'y';
                if (_this.config[appid]) attr[appid] = _this.config[appid];
                if (_this.config[appkey]) attr[appkey] = _this.config[appkey];
                if (_this.config.debug) attr.debug = _this.config.debug;
                (0, _sign2.default)(attr)(data, url.replace(_this.getBaseUrl(), ''), method, dataType);
            }
            _this.publishSync('beforeFetch', data);
            var fetchProps = {
                mode: _this.getMode(),
                method: method,
                'Cache-Control': 'no-cache',
                headers: (0, _assign2.default)({}, headers)
            };
            if (['json'].indexOf(dataType) >= 0) {
                fetchProps.headers['Content-Type'] = _this.contentType[dataType];
            }
            switch (method) {
                case 'GET':
                    url += '?' + (0, _jqueryParam2.default)(data);
                    break;
                case 'POST':
                    fetchProps.body = _this.getBody(data, dataType);
                    break;
                case 'PUT':
                    fetchProps.body = _this.getBody(data, dataType);
                    fetchProps.method = 'POST';
                    break;
                case 'DELETE':
                    if ((0, _keys2.default)(data).length > 0) {
                        fetchProps.body = _this.getBody(data, dataType);
                    }
                    break;
            }
            var promise = fetch(url, fetchProps);
            promise.then(function (res) {
                _this.publish('complete', res);
                if (res.ok) {
                    try {
                        if (_this.config.responseType == 'json') {
                            res.clone().json().then(function (json) {
                                _this.publish('success', json);
                            });
                        } else {
                            res.clone().text().then(function (data) {
                                _this.publish('success', data);
                            });
                        }
                    } catch (error) {
                        _this.publish('catch', {
                            url: url,
                            data: data,
                            method: method,
                            headers: headers,
                            dataType: dataType,
                            error: error,
                            res: res.clone()
                        });
                    }
                } else {
                    _this.publish('error', res.clone());
                }
            }).catch(function (error) {
                _this.publish('catch', {
                    url: url,
                    data: data,
                    method: method,
                    headers: headers,
                    dataType: dataType,
                    error: error
                });
            });
            return promise;
        };

        this.key = "Request_" + new Date().getTime();
        this.setConfig(config);
    }

    (0, _createClass3.default)(Request, [{
        key: 'getRoot',
        value: function getRoot() {
            return this.config.root;
        }
    }, {
        key: 'getDocumentRoot',
        value: function getDocumentRoot() {
            return this.config.documentRoot;
        }
    }, {
        key: 'setBaseUrl',
        value: function setBaseUrl(baseUrl) {
            this.config({ baseUrl: baseUrl });
            return this;
        }
    }, {
        key: 'getBaseUrl',
        value: function getBaseUrl() {
            return this.config.baseUrl;
        }
    }, {
        key: 'setCross',
        value: function setCross(bool) {
            this.setConfig({ cross: bool });
            return this;
        }
    }, {
        key: 'setConfig',
        value: function setConfig(config) {
            (0, _assign2.default)(this.config, config);
            return this;
        }
    }, {
        key: 'getHeader',
        value: function getHeader() {
            return this.config.headers;
        }
    }, {
        key: 'setHeader',
        value: function setHeader(header) {
            (0, _assign2.default)(this.config.headers, header);
            return this;
        }
    }, {
        key: 'clearHeader',
        value: function clearHeader() {
            this.config.headers = {};
            return this;
        }
    }, {
        key: 'getRequestUrl',
        value: function getRequestUrl(url) {
            return url.indexOf("http") == 0 ? url : this.config.baseUrl + url;
        }
    }, {
        key: 'post',
        value: function post(url) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.config.headers;
            var dataType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.config.dataType;

            return this.fetch(this.getRequestUrl(url), data, 'POST', headers, dataType);
        }
    }, {
        key: 'get',
        value: function get(url) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.config.headers;
            var dataType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.config.dataType;

            return this.fetch(this.getRequestUrl(url), data, 'GET', headers, dataType);
        }
    }, {
        key: 'put',
        value: function put(url) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.config.headers;
            var dataType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.config.dataType;

            return this.fetch(this.getRequestUrl(url), data, 'PUT', headers, dataType);
        }
    }, {
        key: 'delete',
        value: function _delete(url) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.config.headers;
            var dataType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.config.dataType;

            return this.fetch(this.getRequestUrl(url), data, 'DELETE', headers, dataType);
        }
    }, {
        key: 'subscribe',
        value: function subscribe(eventKey, fn) {
            if (['beforeFetch', 'complete', 'success', 'catch', 'error'].indexOf(eventKey) >= 0) {
                _pubsubJs2.default.subscribe(this.key + '-' + eventKey, fn);
            }
        }
    }, {
        key: 'publishSync',
        value: function publishSync(eventKey) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            _pubsubJs2.default.publishSync(this.key + '-' + eventKey, data);
        }
    }, {
        key: 'publish',
        value: function publish(eventKey) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            _pubsubJs2.default.publish(this.key + '-' + eventKey, data);
        }
    }]);
    return Request;
}();

exports.default = Request;


Request.prototype['s' + 'i' + 'g' + 'n'] = _sign2.default;