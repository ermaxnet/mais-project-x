/**
 * @project     mais
 * @author      Max Eremin
 * @build       Tuesday, April 24, 2018 5:41 PM
 * @release     
 * @copyright   Copyright (c) 2018, Max Eremin
*/
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".chunk.js"
/******/ 	}
/******/
/******/ 	var deferredModules = [];
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./constants/index.js":
/*!****************************!*\
  !*** ./constants/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _STATUSES;\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar STATUSES = (_STATUSES = {}, _defineProperty(_STATUSES, 1, \"connected\"), _defineProperty(_STATUSES, 0, \"disconnected\"), _defineProperty(_STATUSES, undefined, \"unknown\"), _STATUSES);\nvar WELCOME_PAGE_STATE = {\n  REGISTER: 100,\n  LOGIN: 200\n};\nmodule.exports = {\n  STATUSES: STATUSES,\n  WELCOME_PAGE_STATE: WELCOME_PAGE_STATE\n};\n\n//# sourceURL=webpack:///./constants/index.js?");

/***/ }),

/***/ "./models/settings.js":
/*!****************************!*\
  !*** ./models/settings.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Settings =\n/*#__PURE__*/\nfunction () {\n  function Settings(_ref) {\n    var id = _ref.id,\n        imagesDir = _ref.imagesDir,\n        avatar = _ref.avatar,\n        category = _ref.category,\n        displayName = _ref.displayName;\n\n    _classCallCheck(this, Settings);\n\n    this.id = id;\n    this.imagesDir = imagesDir;\n    this.avatar = avatar;\n    this.category = category;\n    this.displayName = displayName;\n  }\n\n  _createClass(Settings, [{\n    key: \"image\",\n    get: function get() {\n      return \"\".concat(this.imagesDir).concat(this.avatar);\n    }\n  }]);\n\n  return Settings;\n}();\n\n;\nmodule.exports = Settings;\n\n//# sourceURL=webpack:///./models/settings.js?");

/***/ }),

/***/ "./models/token.js":
/*!*************************!*\
  !*** ./models/token.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar moment = __webpack_require__(/*! moment */ \"./node_modules/moment/moment.js\");\n\nvar Token = function Token(_ref) {\n  var key = _ref.id,\n      value = _ref.token,\n      updatedAt = _ref.updatedAt;\n\n  _classCallCheck(this, Token);\n\n  this.key = key;\n  this.value = value;\n  this.updatedAt = moment(updatedAt);\n};\n\n;\nmodule.exports = Token;\n\n//# sourceURL=webpack:///./models/token.js?");

/***/ }),

/***/ "./models/user.js":
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Settings = __webpack_require__(/*! ./settings */ \"./models/settings.js\"),\n    Token = __webpack_require__(/*! ./token */ \"./models/token.js\"),\n    STATUSES = __webpack_require__(/*! ../constants */ \"./constants/index.js\").STATUSES;\n\nvar User =\n/*#__PURE__*/\nfunction () {\n  function User(_ref) {\n    var id = _ref.id,\n        username = _ref.username,\n        hash = _ref.hash,\n        first_name = _ref.first_name,\n        last_name = _ref.last_name,\n        email = _ref.email,\n        status_pzk = _ref.status_pzk,\n        status_mais = _ref.status_mais,\n        _ref$Settings = _ref.Settings,\n        settings = _ref$Settings === void 0 ? {} : _ref$Settings,\n        _ref$MaisToken = _ref.MaisToken,\n        maisToken = _ref$MaisToken === void 0 ? {} : _ref$MaisToken,\n        _ref$PzkToken = _ref.PzkToken,\n        pzkToken = _ref$PzkToken === void 0 ? {} : _ref$PzkToken;\n\n    _classCallCheck(this, User);\n\n    this.id = id;\n    this.nick = username;\n    this.hash = hash;\n    this.firstName = first_name;\n    this.lastName = last_name;\n    this.email = email;\n    this.statusPzkCode = status_pzk;\n    this.statusMaisCode = status_mais;\n    this.settings = new Settings(settings);\n    this.maisToken = new Token(maisToken);\n    this.pzkToken = new Token(pzkToken);\n  }\n\n  _createClass(User, [{\n    key: \"fullName\",\n    get: function get() {\n      return \"\".concat(this.firstName, \" \").concat(this.lastName);\n    }\n  }, {\n    key: \"statusPzk\",\n    get: function get() {\n      return STATUSES[this.statusPzkCode];\n    }\n  }, {\n    key: \"statusMais\",\n    get: function get() {\n      return STATUSES[this.statusMaisCode];\n    }\n  }, {\n    key: \"displayName\",\n    get: function get() {\n      return this.settings.displayName ? this.settings.displayName : this.fullName;\n    }\n  }]);\n\n  return User;\n}();\n\n;\nmodule.exports = User;\n\n//# sourceURL=webpack:///./models/user.js?");

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./af\": \"./node_modules/moment/locale/af.js\",\n\t\"./af.js\": \"./node_modules/moment/locale/af.js\",\n\t\"./ar\": \"./node_modules/moment/locale/ar.js\",\n\t\"./ar-dz\": \"./node_modules/moment/locale/ar-dz.js\",\n\t\"./ar-dz.js\": \"./node_modules/moment/locale/ar-dz.js\",\n\t\"./ar-kw\": \"./node_modules/moment/locale/ar-kw.js\",\n\t\"./ar-kw.js\": \"./node_modules/moment/locale/ar-kw.js\",\n\t\"./ar-ly\": \"./node_modules/moment/locale/ar-ly.js\",\n\t\"./ar-ly.js\": \"./node_modules/moment/locale/ar-ly.js\",\n\t\"./ar-ma\": \"./node_modules/moment/locale/ar-ma.js\",\n\t\"./ar-ma.js\": \"./node_modules/moment/locale/ar-ma.js\",\n\t\"./ar-sa\": \"./node_modules/moment/locale/ar-sa.js\",\n\t\"./ar-sa.js\": \"./node_modules/moment/locale/ar-sa.js\",\n\t\"./ar-tn\": \"./node_modules/moment/locale/ar-tn.js\",\n\t\"./ar-tn.js\": \"./node_modules/moment/locale/ar-tn.js\",\n\t\"./ar.js\": \"./node_modules/moment/locale/ar.js\",\n\t\"./az\": \"./node_modules/moment/locale/az.js\",\n\t\"./az.js\": \"./node_modules/moment/locale/az.js\",\n\t\"./be\": \"./node_modules/moment/locale/be.js\",\n\t\"./be.js\": \"./node_modules/moment/locale/be.js\",\n\t\"./bg\": \"./node_modules/moment/locale/bg.js\",\n\t\"./bg.js\": \"./node_modules/moment/locale/bg.js\",\n\t\"./bm\": \"./node_modules/moment/locale/bm.js\",\n\t\"./bm.js\": \"./node_modules/moment/locale/bm.js\",\n\t\"./bn\": \"./node_modules/moment/locale/bn.js\",\n\t\"./bn.js\": \"./node_modules/moment/locale/bn.js\",\n\t\"./bo\": \"./node_modules/moment/locale/bo.js\",\n\t\"./bo.js\": \"./node_modules/moment/locale/bo.js\",\n\t\"./br\": \"./node_modules/moment/locale/br.js\",\n\t\"./br.js\": \"./node_modules/moment/locale/br.js\",\n\t\"./bs\": \"./node_modules/moment/locale/bs.js\",\n\t\"./bs.js\": \"./node_modules/moment/locale/bs.js\",\n\t\"./ca\": \"./node_modules/moment/locale/ca.js\",\n\t\"./ca.js\": \"./node_modules/moment/locale/ca.js\",\n\t\"./cs\": \"./node_modules/moment/locale/cs.js\",\n\t\"./cs.js\": \"./node_modules/moment/locale/cs.js\",\n\t\"./cv\": \"./node_modules/moment/locale/cv.js\",\n\t\"./cv.js\": \"./node_modules/moment/locale/cv.js\",\n\t\"./cy\": \"./node_modules/moment/locale/cy.js\",\n\t\"./cy.js\": \"./node_modules/moment/locale/cy.js\",\n\t\"./da\": \"./node_modules/moment/locale/da.js\",\n\t\"./da.js\": \"./node_modules/moment/locale/da.js\",\n\t\"./de\": \"./node_modules/moment/locale/de.js\",\n\t\"./de-at\": \"./node_modules/moment/locale/de-at.js\",\n\t\"./de-at.js\": \"./node_modules/moment/locale/de-at.js\",\n\t\"./de-ch\": \"./node_modules/moment/locale/de-ch.js\",\n\t\"./de-ch.js\": \"./node_modules/moment/locale/de-ch.js\",\n\t\"./de.js\": \"./node_modules/moment/locale/de.js\",\n\t\"./dv\": \"./node_modules/moment/locale/dv.js\",\n\t\"./dv.js\": \"./node_modules/moment/locale/dv.js\",\n\t\"./el\": \"./node_modules/moment/locale/el.js\",\n\t\"./el.js\": \"./node_modules/moment/locale/el.js\",\n\t\"./en-au\": \"./node_modules/moment/locale/en-au.js\",\n\t\"./en-au.js\": \"./node_modules/moment/locale/en-au.js\",\n\t\"./en-ca\": \"./node_modules/moment/locale/en-ca.js\",\n\t\"./en-ca.js\": \"./node_modules/moment/locale/en-ca.js\",\n\t\"./en-gb\": \"./node_modules/moment/locale/en-gb.js\",\n\t\"./en-gb.js\": \"./node_modules/moment/locale/en-gb.js\",\n\t\"./en-ie\": \"./node_modules/moment/locale/en-ie.js\",\n\t\"./en-ie.js\": \"./node_modules/moment/locale/en-ie.js\",\n\t\"./en-il\": \"./node_modules/moment/locale/en-il.js\",\n\t\"./en-il.js\": \"./node_modules/moment/locale/en-il.js\",\n\t\"./en-nz\": \"./node_modules/moment/locale/en-nz.js\",\n\t\"./en-nz.js\": \"./node_modules/moment/locale/en-nz.js\",\n\t\"./eo\": \"./node_modules/moment/locale/eo.js\",\n\t\"./eo.js\": \"./node_modules/moment/locale/eo.js\",\n\t\"./es\": \"./node_modules/moment/locale/es.js\",\n\t\"./es-do\": \"./node_modules/moment/locale/es-do.js\",\n\t\"./es-do.js\": \"./node_modules/moment/locale/es-do.js\",\n\t\"./es-us\": \"./node_modules/moment/locale/es-us.js\",\n\t\"./es-us.js\": \"./node_modules/moment/locale/es-us.js\",\n\t\"./es.js\": \"./node_modules/moment/locale/es.js\",\n\t\"./et\": \"./node_modules/moment/locale/et.js\",\n\t\"./et.js\": \"./node_modules/moment/locale/et.js\",\n\t\"./eu\": \"./node_modules/moment/locale/eu.js\",\n\t\"./eu.js\": \"./node_modules/moment/locale/eu.js\",\n\t\"./fa\": \"./node_modules/moment/locale/fa.js\",\n\t\"./fa.js\": \"./node_modules/moment/locale/fa.js\",\n\t\"./fi\": \"./node_modules/moment/locale/fi.js\",\n\t\"./fi.js\": \"./node_modules/moment/locale/fi.js\",\n\t\"./fo\": \"./node_modules/moment/locale/fo.js\",\n\t\"./fo.js\": \"./node_modules/moment/locale/fo.js\",\n\t\"./fr\": \"./node_modules/moment/locale/fr.js\",\n\t\"./fr-ca\": \"./node_modules/moment/locale/fr-ca.js\",\n\t\"./fr-ca.js\": \"./node_modules/moment/locale/fr-ca.js\",\n\t\"./fr-ch\": \"./node_modules/moment/locale/fr-ch.js\",\n\t\"./fr-ch.js\": \"./node_modules/moment/locale/fr-ch.js\",\n\t\"./fr.js\": \"./node_modules/moment/locale/fr.js\",\n\t\"./fy\": \"./node_modules/moment/locale/fy.js\",\n\t\"./fy.js\": \"./node_modules/moment/locale/fy.js\",\n\t\"./gd\": \"./node_modules/moment/locale/gd.js\",\n\t\"./gd.js\": \"./node_modules/moment/locale/gd.js\",\n\t\"./gl\": \"./node_modules/moment/locale/gl.js\",\n\t\"./gl.js\": \"./node_modules/moment/locale/gl.js\",\n\t\"./gom-latn\": \"./node_modules/moment/locale/gom-latn.js\",\n\t\"./gom-latn.js\": \"./node_modules/moment/locale/gom-latn.js\",\n\t\"./gu\": \"./node_modules/moment/locale/gu.js\",\n\t\"./gu.js\": \"./node_modules/moment/locale/gu.js\",\n\t\"./he\": \"./node_modules/moment/locale/he.js\",\n\t\"./he.js\": \"./node_modules/moment/locale/he.js\",\n\t\"./hi\": \"./node_modules/moment/locale/hi.js\",\n\t\"./hi.js\": \"./node_modules/moment/locale/hi.js\",\n\t\"./hr\": \"./node_modules/moment/locale/hr.js\",\n\t\"./hr.js\": \"./node_modules/moment/locale/hr.js\",\n\t\"./hu\": \"./node_modules/moment/locale/hu.js\",\n\t\"./hu.js\": \"./node_modules/moment/locale/hu.js\",\n\t\"./hy-am\": \"./node_modules/moment/locale/hy-am.js\",\n\t\"./hy-am.js\": \"./node_modules/moment/locale/hy-am.js\",\n\t\"./id\": \"./node_modules/moment/locale/id.js\",\n\t\"./id.js\": \"./node_modules/moment/locale/id.js\",\n\t\"./is\": \"./node_modules/moment/locale/is.js\",\n\t\"./is.js\": \"./node_modules/moment/locale/is.js\",\n\t\"./it\": \"./node_modules/moment/locale/it.js\",\n\t\"./it.js\": \"./node_modules/moment/locale/it.js\",\n\t\"./ja\": \"./node_modules/moment/locale/ja.js\",\n\t\"./ja.js\": \"./node_modules/moment/locale/ja.js\",\n\t\"./jv\": \"./node_modules/moment/locale/jv.js\",\n\t\"./jv.js\": \"./node_modules/moment/locale/jv.js\",\n\t\"./ka\": \"./node_modules/moment/locale/ka.js\",\n\t\"./ka.js\": \"./node_modules/moment/locale/ka.js\",\n\t\"./kk\": \"./node_modules/moment/locale/kk.js\",\n\t\"./kk.js\": \"./node_modules/moment/locale/kk.js\",\n\t\"./km\": \"./node_modules/moment/locale/km.js\",\n\t\"./km.js\": \"./node_modules/moment/locale/km.js\",\n\t\"./kn\": \"./node_modules/moment/locale/kn.js\",\n\t\"./kn.js\": \"./node_modules/moment/locale/kn.js\",\n\t\"./ko\": \"./node_modules/moment/locale/ko.js\",\n\t\"./ko.js\": \"./node_modules/moment/locale/ko.js\",\n\t\"./ky\": \"./node_modules/moment/locale/ky.js\",\n\t\"./ky.js\": \"./node_modules/moment/locale/ky.js\",\n\t\"./lb\": \"./node_modules/moment/locale/lb.js\",\n\t\"./lb.js\": \"./node_modules/moment/locale/lb.js\",\n\t\"./lo\": \"./node_modules/moment/locale/lo.js\",\n\t\"./lo.js\": \"./node_modules/moment/locale/lo.js\",\n\t\"./lt\": \"./node_modules/moment/locale/lt.js\",\n\t\"./lt.js\": \"./node_modules/moment/locale/lt.js\",\n\t\"./lv\": \"./node_modules/moment/locale/lv.js\",\n\t\"./lv.js\": \"./node_modules/moment/locale/lv.js\",\n\t\"./me\": \"./node_modules/moment/locale/me.js\",\n\t\"./me.js\": \"./node_modules/moment/locale/me.js\",\n\t\"./mi\": \"./node_modules/moment/locale/mi.js\",\n\t\"./mi.js\": \"./node_modules/moment/locale/mi.js\",\n\t\"./mk\": \"./node_modules/moment/locale/mk.js\",\n\t\"./mk.js\": \"./node_modules/moment/locale/mk.js\",\n\t\"./ml\": \"./node_modules/moment/locale/ml.js\",\n\t\"./ml.js\": \"./node_modules/moment/locale/ml.js\",\n\t\"./mn\": \"./node_modules/moment/locale/mn.js\",\n\t\"./mn.js\": \"./node_modules/moment/locale/mn.js\",\n\t\"./mr\": \"./node_modules/moment/locale/mr.js\",\n\t\"./mr.js\": \"./node_modules/moment/locale/mr.js\",\n\t\"./ms\": \"./node_modules/moment/locale/ms.js\",\n\t\"./ms-my\": \"./node_modules/moment/locale/ms-my.js\",\n\t\"./ms-my.js\": \"./node_modules/moment/locale/ms-my.js\",\n\t\"./ms.js\": \"./node_modules/moment/locale/ms.js\",\n\t\"./mt\": \"./node_modules/moment/locale/mt.js\",\n\t\"./mt.js\": \"./node_modules/moment/locale/mt.js\",\n\t\"./my\": \"./node_modules/moment/locale/my.js\",\n\t\"./my.js\": \"./node_modules/moment/locale/my.js\",\n\t\"./nb\": \"./node_modules/moment/locale/nb.js\",\n\t\"./nb.js\": \"./node_modules/moment/locale/nb.js\",\n\t\"./ne\": \"./node_modules/moment/locale/ne.js\",\n\t\"./ne.js\": \"./node_modules/moment/locale/ne.js\",\n\t\"./nl\": \"./node_modules/moment/locale/nl.js\",\n\t\"./nl-be\": \"./node_modules/moment/locale/nl-be.js\",\n\t\"./nl-be.js\": \"./node_modules/moment/locale/nl-be.js\",\n\t\"./nl.js\": \"./node_modules/moment/locale/nl.js\",\n\t\"./nn\": \"./node_modules/moment/locale/nn.js\",\n\t\"./nn.js\": \"./node_modules/moment/locale/nn.js\",\n\t\"./pa-in\": \"./node_modules/moment/locale/pa-in.js\",\n\t\"./pa-in.js\": \"./node_modules/moment/locale/pa-in.js\",\n\t\"./pl\": \"./node_modules/moment/locale/pl.js\",\n\t\"./pl.js\": \"./node_modules/moment/locale/pl.js\",\n\t\"./pt\": \"./node_modules/moment/locale/pt.js\",\n\t\"./pt-br\": \"./node_modules/moment/locale/pt-br.js\",\n\t\"./pt-br.js\": \"./node_modules/moment/locale/pt-br.js\",\n\t\"./pt.js\": \"./node_modules/moment/locale/pt.js\",\n\t\"./ro\": \"./node_modules/moment/locale/ro.js\",\n\t\"./ro.js\": \"./node_modules/moment/locale/ro.js\",\n\t\"./ru\": \"./node_modules/moment/locale/ru.js\",\n\t\"./ru.js\": \"./node_modules/moment/locale/ru.js\",\n\t\"./sd\": \"./node_modules/moment/locale/sd.js\",\n\t\"./sd.js\": \"./node_modules/moment/locale/sd.js\",\n\t\"./se\": \"./node_modules/moment/locale/se.js\",\n\t\"./se.js\": \"./node_modules/moment/locale/se.js\",\n\t\"./si\": \"./node_modules/moment/locale/si.js\",\n\t\"./si.js\": \"./node_modules/moment/locale/si.js\",\n\t\"./sk\": \"./node_modules/moment/locale/sk.js\",\n\t\"./sk.js\": \"./node_modules/moment/locale/sk.js\",\n\t\"./sl\": \"./node_modules/moment/locale/sl.js\",\n\t\"./sl.js\": \"./node_modules/moment/locale/sl.js\",\n\t\"./sq\": \"./node_modules/moment/locale/sq.js\",\n\t\"./sq.js\": \"./node_modules/moment/locale/sq.js\",\n\t\"./sr\": \"./node_modules/moment/locale/sr.js\",\n\t\"./sr-cyrl\": \"./node_modules/moment/locale/sr-cyrl.js\",\n\t\"./sr-cyrl.js\": \"./node_modules/moment/locale/sr-cyrl.js\",\n\t\"./sr.js\": \"./node_modules/moment/locale/sr.js\",\n\t\"./ss\": \"./node_modules/moment/locale/ss.js\",\n\t\"./ss.js\": \"./node_modules/moment/locale/ss.js\",\n\t\"./sv\": \"./node_modules/moment/locale/sv.js\",\n\t\"./sv.js\": \"./node_modules/moment/locale/sv.js\",\n\t\"./sw\": \"./node_modules/moment/locale/sw.js\",\n\t\"./sw.js\": \"./node_modules/moment/locale/sw.js\",\n\t\"./ta\": \"./node_modules/moment/locale/ta.js\",\n\t\"./ta.js\": \"./node_modules/moment/locale/ta.js\",\n\t\"./te\": \"./node_modules/moment/locale/te.js\",\n\t\"./te.js\": \"./node_modules/moment/locale/te.js\",\n\t\"./tet\": \"./node_modules/moment/locale/tet.js\",\n\t\"./tet.js\": \"./node_modules/moment/locale/tet.js\",\n\t\"./tg\": \"./node_modules/moment/locale/tg.js\",\n\t\"./tg.js\": \"./node_modules/moment/locale/tg.js\",\n\t\"./th\": \"./node_modules/moment/locale/th.js\",\n\t\"./th.js\": \"./node_modules/moment/locale/th.js\",\n\t\"./tl-ph\": \"./node_modules/moment/locale/tl-ph.js\",\n\t\"./tl-ph.js\": \"./node_modules/moment/locale/tl-ph.js\",\n\t\"./tlh\": \"./node_modules/moment/locale/tlh.js\",\n\t\"./tlh.js\": \"./node_modules/moment/locale/tlh.js\",\n\t\"./tr\": \"./node_modules/moment/locale/tr.js\",\n\t\"./tr.js\": \"./node_modules/moment/locale/tr.js\",\n\t\"./tzl\": \"./node_modules/moment/locale/tzl.js\",\n\t\"./tzl.js\": \"./node_modules/moment/locale/tzl.js\",\n\t\"./tzm\": \"./node_modules/moment/locale/tzm.js\",\n\t\"./tzm-latn\": \"./node_modules/moment/locale/tzm-latn.js\",\n\t\"./tzm-latn.js\": \"./node_modules/moment/locale/tzm-latn.js\",\n\t\"./tzm.js\": \"./node_modules/moment/locale/tzm.js\",\n\t\"./ug-cn\": \"./node_modules/moment/locale/ug-cn.js\",\n\t\"./ug-cn.js\": \"./node_modules/moment/locale/ug-cn.js\",\n\t\"./uk\": \"./node_modules/moment/locale/uk.js\",\n\t\"./uk.js\": \"./node_modules/moment/locale/uk.js\",\n\t\"./ur\": \"./node_modules/moment/locale/ur.js\",\n\t\"./ur.js\": \"./node_modules/moment/locale/ur.js\",\n\t\"./uz\": \"./node_modules/moment/locale/uz.js\",\n\t\"./uz-latn\": \"./node_modules/moment/locale/uz-latn.js\",\n\t\"./uz-latn.js\": \"./node_modules/moment/locale/uz-latn.js\",\n\t\"./uz.js\": \"./node_modules/moment/locale/uz.js\",\n\t\"./vi\": \"./node_modules/moment/locale/vi.js\",\n\t\"./vi.js\": \"./node_modules/moment/locale/vi.js\",\n\t\"./x-pseudo\": \"./node_modules/moment/locale/x-pseudo.js\",\n\t\"./x-pseudo.js\": \"./node_modules/moment/locale/x-pseudo.js\",\n\t\"./yo\": \"./node_modules/moment/locale/yo.js\",\n\t\"./yo.js\": \"./node_modules/moment/locale/yo.js\",\n\t\"./zh-cn\": \"./node_modules/moment/locale/zh-cn.js\",\n\t\"./zh-cn.js\": \"./node_modules/moment/locale/zh-cn.js\",\n\t\"./zh-hk\": \"./node_modules/moment/locale/zh-hk.js\",\n\t\"./zh-hk.js\": \"./node_modules/moment/locale/zh-hk.js\",\n\t\"./zh-tw\": \"./node_modules/moment/locale/zh-tw.js\",\n\t\"./zh-tw.js\": \"./node_modules/moment/locale/zh-tw.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\tvar module = __webpack_require__(id);\n\treturn module;\n}\nfunction webpackContextResolve(req) {\n\tvar id = map[req];\n\tif(!(id + 1)) { // check for number or string\n\t\tvar e = new Error('Cannot find module \"' + req + '\".');\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn id;\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./node_modules/moment/locale sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack:///./node_modules/moment/locale_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./wwwroot/client/source/components/forms/login.js":
/*!*********************************************************!*\
  !*** ./wwwroot/client/source/components/forms/login.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _constants = __webpack_require__(/*! ../../../../../constants */ \"./constants/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar LoginForm = function LoginForm(props) {\n  return _react.default.createElement(\"div\", {\n    className: \"login\"\n  }, _react.default.createElement(\"header\", {\n    className: \"login__header\"\n  }, _react.default.createElement(\"div\", {\n    className: \"login__header-title\"\n  }, _react.default.createElement(\"span\", null, \"\\u0412\\u043E\\u0439\\u0434\\u0438\\u0442\\u0435\")), _react.default.createElement(\"div\", {\n    className: \"login__header-note\"\n  }, _react.default.createElement(\"span\", null, \"\\u0435\\u0441\\u043B\\u0438 \\u0445\\u043E\\u0442\\u0438\\u0442\\u0435 \\u0432\\u043E\\u0439\\u0442\\u0438 \\u0432 \\u0447\\u0430\\u0442 \\u0447\\u0435\\u0440\\u0435\\u0437 \\u041F\\u0417\\u041A, \\u0443\\u0441\\u0442\\u0430\\u043D\\u043E\\u0432\\u0438\\u0442\\u0435 \\u0441\\u043E\\u043E\\u0442\\u0432\\u0435\\u0442\\u0441\\u0442\\u0432\\u0443\\u044E\\u0449\\u0438\\u0439 \\u043F\\u0440\\u0438\\u0437\\u043D\\u0430\\u043A\"))), _react.default.createElement(\"form\", {\n    className: \"form login__form\"\n  }, _react.default.createElement(\"div\", {\n    className: \"form__group\"\n  }, _react.default.createElement(\"div\", {\n    className: \"form__control\"\n  }, _react.default.createElement(\"label\", {\n    htmlFor: \"nick\",\n    className: \"form__label\"\n  }, \"\\u0418\\u043C\\u044F \\u043F\\u043E\\u043B\\u044C\\u0437\\u043E\\u0432\\u0430\\u0442\\u0435\\u043B\\u044F\"), _react.default.createElement(\"input\", {\n    type: \"text\",\n    name: \"nick\",\n    id: \"nick\",\n    placeholder: \"\\u041B\\u043E\\u0433\\u0438\\u043D\",\n    className: \"form__input\"\n  }))), _react.default.createElement(\"div\", {\n    className: \"form__group\"\n  }, _react.default.createElement(\"div\", {\n    className: \"form__control\"\n  }, _react.default.createElement(\"label\", {\n    htmlFor: \"password\",\n    className: \"form__label\"\n  }, \"\\u041F\\u0430\\u0440\\u043E\\u043B\\u044C\"), _react.default.createElement(\"input\", {\n    type: \"password\",\n    name: \"password\",\n    id: \"password\",\n    placeholder: \"\\u041F\\u0430\\u0440\\u043E\\u043B\\u044C\",\n    className: \"form__input\"\n  }))), _react.default.createElement(\"div\", {\n    className: \"form__group\"\n  }, _react.default.createElement(\"div\", {\n    className: \"form__control checkbox\"\n  }, _react.default.createElement(\"input\", {\n    type: \"checkbox\",\n    name: \"isPZK\",\n    id: \"isPZK\",\n    className: \"form__input\"\n  }), _react.default.createElement(\"label\", {\n    htmlFor: \"isPZK\",\n    className: \"form__label\"\n  }, \"\\u0412\\u043E\\u0439\\u0442\\u0438 \\u0447\\u0435\\u0440\\u0435\\u0437 \\u043F\\u043E\\u0440\\u0442\\u0430\\u043B\"))), _react.default.createElement(\"div\", {\n    className: \"form__actions\"\n  }, _react.default.createElement(\"button\", {\n    className: \"form__action btn btn-primary\"\n  }, \"\\u0412\\u043E\\u0439\\u0442\\u0438\"), _react.default.createElement(\"a\", {\n    href: \"#\",\n    className: \"form__action btn-link\",\n    onClick: function onClick(e) {\n      return props.changeView(e, _constants.WELCOME_PAGE_STATE.REGISTER);\n    }\n  }, \"\\u0417\\u0430\\u0440\\u0435\\u0433\\u0438\\u0441\\u0442\\u0440\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C\\u0441\\u044F\"))));\n};\n\nvar _default = LoginForm;\nexports.default = _default;\n\n//# sourceURL=webpack:///./wwwroot/client/source/components/forms/login.js?");

/***/ }),

/***/ "./wwwroot/client/source/components/forms/register.js":
/*!************************************************************!*\
  !*** ./wwwroot/client/source/components/forms/register.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _constants = __webpack_require__(/*! ../../../../../constants */ \"./constants/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar RegisterForm = function RegisterForm(props) {\n  return _react.default.createElement(\"div\", {\n    className: \"login\"\n  }, _react.default.createElement(\"header\", {\n    className: \"login__header\"\n  }, _react.default.createElement(\"div\", {\n    className: \"login__header-title\"\n  }, _react.default.createElement(\"span\", null, \"\\u0417\\u0430\\u0440\\u0435\\u0433\\u0438\\u0441\\u0442\\u0440\\u0438\\u0440\\u0443\\u0439\\u0442\\u0435\\u0441\\u044C\")), _react.default.createElement(\"div\", {\n    className: \"login__header-note\"\n  }, _react.default.createElement(\"span\", null, \"\\u0447\\u0442\\u043E\\u0431\\u044B \\u0438\\u043D\\u043E\\u0433\\u0434\\u0430 \\u043F\\u043E\\u043A\\u0438\\u0434\\u0430\\u0442\\u044C \\u044D\\u0442\\u043E\\u0442 \\u0436\\u0435\\u0441\\u0442\\u043E\\u043A\\u0438\\u0439 \\u043C\\u0438\\u0440 \\u0438 \\u0440\\u0430\\u0441\\u0442\\u0432\\u043E\\u0440\\u044F\\u0442\\u044C\\u0441\\u044F \\u043D\\u0430 \\u043F\\u0440\\u043E\\u0441\\u0442\\u043E\\u0440\\u0430\\u0445 \\u043D\\u0430\\u0448\\u0435\\u0433\\u043E \\u0447\\u0430\\u0442\\u0430\"))), _react.default.createElement(\"form\", {\n    className: \"form login__form\"\n  }, _react.default.createElement(\"div\", {\n    className: \"form__group\"\n  }, _react.default.createElement(\"div\", {\n    className: \"form__control\"\n  }, _react.default.createElement(\"label\", {\n    htmlFor: \"nick\",\n    className: \"form__label\"\n  }, \"\\u0418\\u043C\\u044F \\u043F\\u043E\\u043B\\u044C\\u0437\\u043E\\u0432\\u0430\\u0442\\u0435\\u043B\\u044F\"), _react.default.createElement(\"input\", {\n    type: \"text\",\n    name: \"nick\",\n    id: \"nick\",\n    placeholder: \"\\u041B\\u043E\\u0433\\u0438\\u043D\",\n    className: \"form__input\"\n  }))), _react.default.createElement(\"div\", {\n    className: \"form__group\"\n  }, _react.default.createElement(\"div\", {\n    className: \"form__control form__control_50\"\n  }, _react.default.createElement(\"label\", {\n    htmlFor: \"password\",\n    className: \"form__label\"\n  }, \"\\u041F\\u0430\\u0440\\u043E\\u043B\\u044C\"), _react.default.createElement(\"input\", {\n    type: \"password\",\n    name: \"password\",\n    id: \"password\",\n    placeholder: \"\\u041F\\u0430\\u0440\\u043E\\u043B\\u044C\",\n    className: \"form__input\"\n  })), _react.default.createElement(\"div\", {\n    className: \"form__control form__control_50\"\n  }, _react.default.createElement(\"label\", {\n    htmlFor: \"repeatPassword\",\n    className: \"form__label\"\n  }, \"\\u041F\\u043E\\u0432\\u0442\\u043E\\u0440\\u0438\\u0442\\u0435 \\u043F\\u0430\\u0440\\u043E\\u043B\\u044C\"), _react.default.createElement(\"input\", {\n    type: \"repeatPassword\",\n    name: \"repeatPassword\",\n    id: \"repeatPassword\",\n    placeholder: \"\\u041F\\u0430\\u0440\\u043E\\u043B\\u044C\",\n    className: \"form__input\"\n  }))), _react.default.createElement(\"div\", {\n    className: \"form__group\"\n  }, _react.default.createElement(\"div\", {\n    className: \"form__control form__control_50\"\n  }, _react.default.createElement(\"label\", {\n    htmlFor: \"firstName\",\n    className: \"form__label\"\n  }, \"\\u0418\\u043C\\u044F\"), _react.default.createElement(\"input\", {\n    type: \"text\",\n    name: \"firstName\",\n    id: \"firstName\",\n    placeholder: \"\\u0418\\u043C\\u044F\",\n    className: \"form__input\"\n  })), _react.default.createElement(\"div\", {\n    className: \"form__control form__control_50\"\n  }, _react.default.createElement(\"label\", {\n    htmlFor: \"secondName\",\n    className: \"form__label\"\n  }, \"\\u0424\\u0430\\u043C\\u0438\\u043B\\u0438\\u044F\"), _react.default.createElement(\"input\", {\n    type: \"text\",\n    name: \"secondName\",\n    id: \"secondName\",\n    placeholder: \"\\u0424\\u0430\\u043C\\u0438\\u043B\\u0438\\u044F\",\n    className: \"form__input\"\n  }))), _react.default.createElement(\"div\", {\n    className: \"form__group\"\n  }, _react.default.createElement(\"div\", {\n    className: \"form__control\"\n  }, _react.default.createElement(\"label\", {\n    htmlFor: \"email\",\n    className: \"form__label\"\n  }, \"\\u0410\\u0434\\u0440\\u0435\\u0441 \\u044D\\u043B\\u0435\\u043A\\u0442\\u0440\\u043E\\u043D\\u043D\\u043E\\u0439 \\u043F\\u043E\\u0447\\u0442\\u044B\"), _react.default.createElement(\"input\", {\n    type: \"email\",\n    name: \"email\",\n    id: \"email\",\n    placeholder: \"E-mail\",\n    className: \"form__input\"\n  }))), _react.default.createElement(\"div\", {\n    className: \"form__actions\"\n  }, _react.default.createElement(\"button\", {\n    className: \"form__action btn btn-primary\"\n  }, \"\\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C\"), _react.default.createElement(\"a\", {\n    href: \"#\",\n    className: \"form__action btn-link\",\n    onClick: function onClick(e) {\n      return props.changeView(e, _constants.WELCOME_PAGE_STATE.LOGIN);\n    }\n  }, \"\\u0412\\u0435\\u0440\\u043D\\u0443\\u0442\\u044C\\u0441\\u044F\"))));\n};\n\nvar _default = RegisterForm;\nexports.default = _default;\n\n//# sourceURL=webpack:///./wwwroot/client/source/components/forms/register.js?");

/***/ }),

/***/ "./wwwroot/client/source/index.js":
/*!****************************************!*\
  !*** ./wwwroot/client/source/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\"));\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nvar _welcome = _interopRequireDefault(__webpack_require__(/*! ./pages/welcome */ \"./wwwroot/client/source/pages/welcome/index.js\"));\n\nvar _cabinet = _interopRequireDefault(__webpack_require__(/*! ./pages/cabinet */ \"./wwwroot/client/source/pages/cabinet/index.js\"));\n\nvar _registerServiceWorker = _interopRequireDefault(__webpack_require__(/*! ./registerServiceWorker */ \"./wwwroot/client/source/registerServiceWorker.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n_reactDom.default.render(_react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement(\"div\", {\n  className: \"wrapper\"\n}, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {\n  exact: true,\n  path: \"/\",\n  component: _welcome.default\n}), _react.default.createElement(_reactRouterDom.Route, {\n  exact: true,\n  path: \"/cabinet\",\n  component: _cabinet.default\n})))), document.getElementById(\"root\"));\n\n(0, _registerServiceWorker.default)();\n\n//# sourceURL=webpack:///./wwwroot/client/source/index.js?");

/***/ }),

/***/ "./wwwroot/client/source/pages/cabinet/index.js":
/*!******************************************************!*\
  !*** ./wwwroot/client/source/pages/cabinet/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }\n\nvar CabinetPage =\n/*#__PURE__*/\nfunction (_Component) {\n  function CabinetPage() {\n    _classCallCheck(this, CabinetPage);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(CabinetPage).apply(this, arguments));\n  }\n\n  _createClass(CabinetPage, [{\n    key: \"render\",\n    value: function render() {\n      return _react.default.createElement(\"div\", null, \"Cabinet Page\");\n    }\n  }]);\n\n  _inherits(CabinetPage, _Component);\n\n  return CabinetPage;\n}(_react.Component);\n\nvar _default = CabinetPage;\nexports.default = _default;\n\n//# sourceURL=webpack:///./wwwroot/client/source/pages/cabinet/index.js?");

/***/ }),

/***/ "./wwwroot/client/source/pages/welcome/index.js":
/*!******************************************************!*\
  !*** ./wwwroot/client/source/pages/welcome/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _login = _interopRequireDefault(__webpack_require__(/*! ../../components/forms/login */ \"./wwwroot/client/source/components/forms/login.js\"));\n\nvar _register = _interopRequireDefault(__webpack_require__(/*! ../../components/forms/register */ \"./wwwroot/client/source/components/forms/register.js\"));\n\nvar _constants = __webpack_require__(/*! ../../../../../constants */ \"./constants/index.js\");\n\nvar _user = _interopRequireDefault(__webpack_require__(/*! ../../../../../models/user */ \"./models/user.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }\n\nvar WelcomePage =\n/*#__PURE__*/\nfunction (_Component) {\n  function WelcomePage(props) {\n    var _this;\n\n    _classCallCheck(this, WelcomePage);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(WelcomePage).call(this, props));\n    _this.state = {\n      viewMode: _constants.WELCOME_PAGE_STATE.LOGIN,\n      user: new _user.default({\n        id: 0\n      })\n    };\n    return _this;\n  }\n\n  _createClass(WelcomePage, [{\n    key: \"changeView\",\n    value: function changeView(e, viewMode) {\n      if (e) {\n        e.preventDefault();\n      }\n\n      this.setState({\n        viewMode: viewMode\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var widget = null;\n\n      switch (this.state.viewMode) {\n        case _constants.WELCOME_PAGE_STATE.LOGIN:\n          widget = _react.default.createElement(_login.default, {\n            changeView: this.changeView.bind(this)\n          });\n          break;\n\n        case _constants.WELCOME_PAGE_STATE.REGISTER:\n          widget = _react.default.createElement(_register.default, {\n            changeView: this.changeView.bind(this)\n          });\n          break;\n      }\n\n      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(\"header\", {\n        className: \"header\"\n      }, _react.default.createElement(\"div\", {\n        className: \"header__logo\"\n      }, _react.default.createElement(\"span\", null, \"mais messenger\"))), _react.default.createElement(\"main\", {\n        className: \"content\"\n      }, _react.default.createElement(\"div\", {\n        className: \"widget\"\n      }, widget)));\n    }\n  }]);\n\n  _inherits(WelcomePage, _Component);\n\n  return WelcomePage;\n}(_react.Component);\n\nvar _default = WelcomePage;\nexports.default = _default;\n\n//# sourceURL=webpack:///./wwwroot/client/source/pages/welcome/index.js?");

/***/ }),

/***/ "./wwwroot/client/source/registerServiceWorker.js":
/*!********************************************************!*\
  !*** ./wwwroot/client/source/registerServiceWorker.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = register;\nexports.unregister = unregister;\n// In production, we register a service worker to serve assets from local cache.\n// This lets the app load faster on subsequent visits in production, and gives\n// it offline capabilities. However, it also means that developers (and users)\n// will only see deployed updates on the \"N+1\" visit to a page, since previously\n// cached resources are updated in the background.\n// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.\n// This link also includes instructions on opting out of this behavior.\nvar isLocalhost = Boolean(window.location.hostname === 'localhost' || // [::1] is the IPv6 localhost address.\nwindow.location.hostname === '[::1]' || // 127.0.0.1/8 is considered localhost for IPv4.\nwindow.location.hostname.match(/^127(?:\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));\n\nfunction register() {\n  if (false) { var publicUrl; }\n}\n\nfunction registerValidSW(swUrl) {\n  navigator.serviceWorker.register(swUrl).then(function (registration) {\n    registration.onupdatefound = function () {\n      var installingWorker = registration.installing;\n\n      installingWorker.onstatechange = function () {\n        if (installingWorker.state === 'installed') {\n          if (navigator.serviceWorker.controller) {\n            // At this point, the old content will have been purged and\n            // the fresh content will have been added to the cache.\n            // It's the perfect time to display a \"New content is\n            // available; please refresh.\" message in your web app.\n            console.log('New content is available; please refresh.');\n          } else {\n            // At this point, everything has been precached.\n            // It's the perfect time to display a\n            // \"Content is cached for offline use.\" message.\n            console.log('Content is cached for offline use.');\n          }\n        }\n      };\n    };\n  }).catch(function (error) {\n    console.error('Error during service worker registration:', error);\n  });\n}\n\nfunction checkValidServiceWorker(swUrl) {\n  // Check if the service worker can be found. If it can't reload the page.\n  fetch(swUrl).then(function (response) {\n    // Ensure service worker exists, and that we really are getting a JS file.\n    if (response.status === 404 || response.headers.get('content-type').indexOf('javascript') === -1) {\n      // No service worker found. Probably a different app. Reload the page.\n      navigator.serviceWorker.ready.then(function (registration) {\n        registration.unregister().then(function () {\n          window.location.reload();\n        });\n      });\n    } else {\n      // Service worker found. Proceed as normal.\n      registerValidSW(swUrl);\n    }\n  }).catch(function () {\n    console.log('No internet connection found. App is running in offline mode.');\n  });\n}\n\nfunction unregister() {\n  if ('serviceWorker' in navigator) {\n    navigator.serviceWorker.ready.then(function (registration) {\n      registration.unregister();\n    });\n  }\n}\n\n//# sourceURL=webpack:///./wwwroot/client/source/registerServiceWorker.js?");

/***/ }),

/***/ 0:
/*!**********************************************!*\
  !*** multi ./wwwroot/client/source/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! D:\\workshop\\chat-modules\\wwwroot\\client\\source\\index.js */\"./wwwroot/client/source/index.js\");\n\n\n//# sourceURL=webpack:///multi_./wwwroot/client/source/index.js?");

/***/ })

/******/ });

//# sourceMappingURL=bundle.js.map
