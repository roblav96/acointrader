/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/server/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("restify-errors");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("cli-color");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = restifyRoute;
/* harmony export (immutable) */ __webpack_exports__["b"] = validate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_restify_errors__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_restify_errors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_restify_errors__);

function restifyRoute(route) {
    return route;
}
function validate(body, keys) {
    if (!body)
        throw new __WEBPACK_IMPORTED_MODULE_0_restify_errors___default.a.PreconditionFailedError('Undefined request body');
    if (Object.keys(body).length == 0)
        throw new __WEBPACK_IMPORTED_MODULE_0_restify_errors___default.a.PreconditionFailedError('Empty request body');
    keys.forEach(function (k) {
        if (body[k] == null)
            throw new __WEBPACK_IMPORTED_MODULE_0_restify_errors___default.a.PreconditionFailedError("Missing \"" + k + "\" field");
    });
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_source_map_support_register__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_source_map_support_register___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_source_map_support_register__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_os__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_os___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_os__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cluster__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cluster___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cluster__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_eventemitter3__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_eventemitter3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_eventemitter3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_eyes__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_eyes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_eyes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_cli_color__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_cli_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_cli_color__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_restify__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_restify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_restify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__routes_proxy__ = __webpack_require__(13);



process.$instances = __WEBPACK_IMPORTED_MODULE_1_os___default.a.cpus().length;
process.$instance = __WEBPACK_IMPORTED_MODULE_2_cluster___default.a.isWorker ? Number.parseInt(__WEBPACK_IMPORTED_MODULE_2_cluster___default.a.worker.id) - 1 : -1;
process.on('uncaughtException', function (error) {
    console.error('uncaughtExceptions > error', error);
});
process.on('unhandledRejection', function (error) {
    console.error('unhandledRejection > error', error);
});

process.ee3 = new __WEBPACK_IMPORTED_MODULE_3_eventemitter3___default.a.EventEmitter();

var eOpts = __WEBPACK_IMPORTED_MODULE_4_eyes___default.a.defaults;
eOpts.maxLength = 65536;



__webpack_require__(12)();
console.format = function (c) {
    var stack = process.$stack;
    if (!stack) {
        stack = new Error().stack.toString();
        stack = stack.replace(/^([^\n]*?\n){2}((.|\n)*)$/gmi, '$2').split('\n')[2].trim();
    }
    var fullpath = stack.split('/').pop();
    if (!fullpath)
        fullpath = c.filename + ':' + c.getLineNumber();
    var file = fullpath.split('.ts:')[0];
    var i = (fullpath.indexOf('.ts:') == -1) ? 0 : 1;
    var line = fullpath.split('.ts:')[i].split(':')[0];
    var header = '[' + process.$instance + ']' + '[' + __WEBPACK_IMPORTED_MODULE_5_cli_color___default.a.bold(file.toUpperCase()) + ':' + line + ']';
    var format = 'hh:mm:ss:SSS';
    var time = __WEBPACK_IMPORTED_MODULE_7_moment___default()().format(format);
    var cString;
    if (c.method == 'log') {
        cString = __WEBPACK_IMPORTED_MODULE_5_cli_color___default.a.blue(time) + header;
    }
    else if (c.method == 'info') {
        cString = __WEBPACK_IMPORTED_MODULE_5_cli_color___default.a.green(time) + header;
    }
    else if (c.method == 'warn') {
        cString = __WEBPACK_IMPORTED_MODULE_5_cli_color___default.a.yellowBright('=============================== WARN ================================\n') + __WEBPACK_IMPORTED_MODULE_5_cli_color___default.a.yellow(time) + header;
    }
    else if (c.method == 'error') {
        cString = __WEBPACK_IMPORTED_MODULE_5_cli_color___default.a.redBright('=============================== ERROR ================================\n') + __WEBPACK_IMPORTED_MODULE_5_cli_color___default.a.red(time) + header;
    }
    return '\n \n' + __WEBPACK_IMPORTED_MODULE_5_cli_color___default.a.underline(cString) + '\n';
};

var server = __WEBPACK_IMPORTED_MODULE_6_restify___default.a.createServer();
server.opts(/.*/, __WEBPACK_IMPORTED_MODULE_8__services_utils__["a" /* restifyRoute */](function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'));
    res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
    res.send(200);
    return next();
}));
server.use(__WEBPACK_IMPORTED_MODULE_8__services_utils__["a" /* restifyRoute */](function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'));
    res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
    return next();
}));
server.use(__WEBPACK_IMPORTED_MODULE_6_restify___default.a.plugins.fullResponse());
server.use(__WEBPACK_IMPORTED_MODULE_6_restify___default.a.plugins.bodyParser());
server.use(__WEBPACK_IMPORTED_MODULE_6_restify___default.a.plugins.queryParser());

server.post('/api/proxy', __WEBPACK_IMPORTED_MODULE_9__routes_proxy__["a" /* default */]);
server.listen(process.$port, process.$host, function () {
    console.log('listening...');
});


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("cluster");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("eventemitter3");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("eyes");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("restify");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("debug-trace");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_errors__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_url__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_url__);





/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2__services_utils__["a" /* restifyRoute */](function (req, res, next) {
    Promise.resolve().then(function () {
        __WEBPACK_IMPORTED_MODULE_2__services_utils__["b" /* validate */](req.body, ['method', 'url']);
        var purl = __WEBPACK_IMPORTED_MODULE_4_url___default.a.parse(req.body.url);
        if (!__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isString(purl.host))
            throw new __WEBPACK_IMPORTED_MODULE_1__services_errors__["PreconditionFailedError"]('Invalid url');
        var host = purl.host.split('.').splice(-2).join('.');
        var validhosts = [
            'yahoo.com',
        ];
        if (validhosts.indexOf(host) == -1) {
            throw new __WEBPACK_IMPORTED_MODULE_1__services_errors__["PreconditionFailedError"]('Invalid url');
        }
        return __WEBPACK_IMPORTED_MODULE_3_axios___default.a.request(req.body).then(function (_a) {
            var data = _a.data;
            res.send(data);
            return next();
        });
    }).catch(function (error) {
        return next(__WEBPACK_IMPORTED_MODULE_1__services_errors__["generate"](error));
    });
}));


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export render */
/* harmony export (immutable) */ __webpack_exports__["generate"] = generate;
/* unused harmony export getStack */
/* unused harmony export isTimeoutError */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cli_color__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cli_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cli_color__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_restify_errors__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_restify_errors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_restify_errors__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2_restify_errors__, "PreconditionFailedError")) __webpack_require__.d(__webpack_exports__, "PreconditionFailedError", function() { return __WEBPACK_IMPORTED_MODULE_2_restify_errors__["PreconditionFailedError"]; });



function render(error, where) {
    if (where === void 0) { where = ''; }
    if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isString(error))
        return __WEBPACK_IMPORTED_MODULE_0_cli_color___default.a.bold.redBright(error);
    if (!__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isError(error))
        return JSON.stringify(error);
    var message = error.message;
    var stack = error.stack;
    if (stack && stack.indexOf(message) >= 0)
        stack = stack.replace(message, '');
    var desc = '';
    if (error.config) {
        desc = desc + '\nurl > ' + decodeURIComponent(error.config.url);
    }
    if (error.response && error.response.statusText) {
        desc = desc + '\nstatus > ' + error.response.statusText;
    }
    if (desc) {
        desc = desc + '\n';
        message = 'message > ' + message;
    }
    if (where)
        where = __WEBPACK_IMPORTED_MODULE_0_cli_color___default.a.underline.bold.redBright(where) + ' > ';
    return where + __WEBPACK_IMPORTED_MODULE_0_cli_color___default.a.bold.redBright(desc + message + '\n') + stack;
}
function generate(error, where) {
    console.error('restify route error >', render(error, where));
    if (error instanceof __WEBPACK_IMPORTED_MODULE_2_restify_errors___default.a.HttpError != true) {
        var status_1 = 500;
        if (Number.isFinite(error.statusCode))
            status_1 = error.statusCode;
        if (error.response && Number.isFinite(error.response.status))
            status_1 = error.response.status;
        if (error.response && error.response.data && Number.isFinite(error.response.data.statusCode))
            status_1 = error.response.data.statusCode;
        error = __WEBPACK_IMPORTED_MODULE_2_restify_errors___default.a.makeErrFromCode(status_1, error);
    }
    return error;
}
function getStack(i) {
    if (i === void 0) { i = 2; }
    var stack = new Error().stack.toString();
    stack = stack.replace(/^([^\n]*?\n){2}((.|\n)*)$/gmi, '$2');
    stack = stack.split('\n')[i].trim();
    stack = stack.split('/').pop();
    return stack.substring(0, stack.length - 1);
}
function isTimeoutError(error) {
    if (error == null || !__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isString(error.message))
        return false;
    var message = error.message.toLowerCase();
    return message.indexOf('timeout') >= 0 && message.indexOf('exceeded') >= 0;
}



/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map