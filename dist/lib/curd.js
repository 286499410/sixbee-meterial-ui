'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GET = 'get';
var POST = 'post';
var PUT = 'put';
var DELETE = 'delete';

var Curd = function () {
    function Curd(key) {
        var _this = this;

        (0, _classCallCheck3.default)(this, Curd);
        this.api = {
            create: {
                method: POST
            },
            read: {
                method: GET
            },
            single: {
                method: GET
            },
            update: {
                method: PUT
            },
            delete: {
                method: DELETE
            },
            list: {
                method: GET
            }
        };
        this.state = {
            headers: {},
            request: undefined
        };

        this.uri = '/' + key.replace('.', '/');
        (0, _keys2.default)(this.api).map(function (key) {
            _this.api[key].uri = _this.uri;
        });
    }

    (0, _createClass3.default)(Curd, [{
        key: 'getRequest',
        value: function getRequest() {
            return this.state.request || _index.request;
        }
    }, {
        key: 'setConfig',
        value: function setConfig(config) {
            (0, _assign2.default)(this.state, config);
            return this;
        }
    }, {
        key: 'getHeader',
        value: function getHeader() {
            return this.state.headers;
        }
    }, {
        key: 'setHeader',
        value: function setHeader(header) {
            (0, _assign2.default)(this.state.headers, header);
            return this;
        }
    }, {
        key: 'create',
        value: function create(data) {
            var _this2 = this;

            var request = this.getRequest();
            return new _promise2.default(function (resolve, reject) {
                request[_this2.api.create.method](_this2.api.create.uri, data, (0, _extends3.default)({}, request.getHeader(), _this2.getHeader())).then(function (res) {
                    if (res.ok) {
                        res.json().then(function (json) {
                            resolve(json);
                        });
                    } else {
                        reject(res);
                    }
                });
            });
        }
    }, {
        key: 'read',
        value: function read(id, params) {
            var _this3 = this;

            var request = this.getRequest();
            return new _promise2.default(function (resolve, reject) {
                request[_this3.api.read.method](_this3.api.read.uri + '/' + id, params, (0, _extends3.default)({}, request.getHeader(), _this3.getHeader())).then(function (res) {
                    if (res.ok) {
                        res.json().then(function (json) {
                            resolve(json);
                        });
                    } else {
                        reject(res);
                    }
                });
            });
        }
    }, {
        key: 'single',
        value: function single(params) {
            var _this4 = this;

            var request = this.getRequest();
            return new _promise2.default(function (resolve, reject) {
                request[_this4.api.single.method](_this4.api.single.uri, params, (0, _extends3.default)({}, request.getHeader(), _this4.getHeader())).then(function (res) {
                    if (res.ok) {
                        res.json().then(function (json) {
                            resolve(json);
                        });
                    } else {
                        reject(res);
                    }
                });
            });
        }
    }, {
        key: 'update',
        value: function update(id, data) {
            var _this5 = this;

            var request = this.getRequest();
            return new _promise2.default(function (resolve, reject) {
                request[_this5.api.update.method](_this5.api.update.uri + '/' + id, data, (0, _extends3.default)({}, request.getHeader(), _this5.getHeader())).then(function (res) {
                    if (res.ok) {
                        res.json().then(function (json) {
                            resolve(json);
                        });
                    } else {
                        reject(res);
                    }
                });
            });
        }
    }, {
        key: 'delete',
        value: function _delete(ids) {
            var _this6 = this;

            if (_lodash2.default.isArray(ids)) {
                ids = ids.join(',');
            }
            var request = this.getRequest();
            return new _promise2.default(function (resolve, reject) {
                request[_this6.api.delete.method](_this6.api.delete.uri + '/' + ids, {}, (0, _extends3.default)({}, request.getHeader(), _this6.getHeader())).then(function (res) {
                    if (res.ok) {
                        res.json().then(function (json) {
                            resolve(json);
                        });
                    } else {
                        reject(res);
                    }
                });
            });
        }
    }, {
        key: 'list',
        value: function list(params) {
            var _this7 = this;

            var request = this.getRequest();
            return new _promise2.default(function (resolve, reject) {
                request[_this7.api.list.method](_this7.api.list.uri, params, (0, _extends3.default)({}, request.getHeader(), _this7.getHeader())).then(function (res) {
                    if (res.ok) {
                        res.json().then(function (json) {
                            resolve(json);
                        });
                    } else {
                        reject(res);
                    }
                });
            });
        }
    }]);
    return Curd;
}();

exports.default = Curd;