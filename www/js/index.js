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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/components/PostFeed.ts":
/*!***************************************!*\
  !*** ./src/ts/components/PostFeed.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.View = {\r\n    createPost(options, appendElem) {\r\n        const elem = document.createElement(\"article\");\r\n        elem.classList.add(\"feed\");\r\n        const template = `\r\n    <header class=\"feed__header feed__header-background\">\r\n      <div class=\"feed__image\">\r\n        <img class=\"profile__avatar\" src=\"${options.header.image}\" alt=\"avatar\">\r\n      </div>\r\n      <div class=\"feed__title\">\r\n        <p class=\"feed__title-color\">\r\n        ${options.header.title}\r\n        </p>\r\n      </div>\r\n      ${options.header.date\r\n            ? `\r\n            <div class=\"feed__date\">\r\n              <p class=\"feed__date-color\">${options.header.date}</p>\r\n            </div>`\r\n            : \"\"}\r\n    </header>\r\n    ${options.content\r\n            ? `\r\n          <main class=\"feed__content\">\r\n            ${options.content.template}\r\n          </main>`\r\n            : \"\"}\r\n    \r\n    ${options.footer\r\n            ? `\r\n        <footer class=\"feed__footer feed__footer-background\">\r\n        ${options.footer.actions.like\r\n                ? `\r\n                <a class=\"feed__action\" href>\r\n                  <i class=\"fas fa-heart\"></i>\r\n                  <p class=\"feed__action-name\">Like</p>\r\n                  <p class=\"feed__action-counter\">(${options.footer.actions.like})</p>\r\n                </a>`\r\n                : \"\"}\r\n        \r\n        ${options.footer.actions.comment\r\n                ? `\r\n              <a class=\"feed__action\" href>\r\n                <i class=\"fas fa-comment\"></i>\r\n                <p class=\"feed__action-name\">Comment</p>\r\n                <p class=\"feed__action-counter\">(${options.footer.actions.comment})</p>\r\n              </a>`\r\n                : \"\"}\r\n        ${options.footer.actions.share\r\n                ? `\r\n              <a class=\"feed__action\" href>\r\n                <i class=\"fas fa-share\"></i>\r\n                <p class=\"feed__action-name\">Share</p>\r\n                <p class=\"feed__action-counter\">(${options.footer.actions.share})</p>\r\n              </a>\r\n              </footer>`\r\n                : \"\"}\r\n        `\r\n            : \"\"}\r\n    \r\n    ${options.appendSection\r\n            ? `\r\n    <div class=\"feed__append\">\r\n      \r\n    </div>\r\n    `\r\n            : \"\"}\r\n    `;\r\n        elem.innerHTML = template;\r\n        if (appendElem) {\r\n            appendElem.appendChild(elem);\r\n        }\r\n        else {\r\n            return elem;\r\n        }\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./src/ts/components/PostFeed.ts?");

/***/ }),

/***/ "./src/ts/main.ts":
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst PostFeed_1 = __webpack_require__(/*! ./components/PostFeed */ \"./src/ts/components/PostFeed.ts\");\r\ndocument.addEventListener(\"DOMContentLoaded\", e => {\r\n    const elem = PostFeed_1.View.createPost({\r\n        header: {\r\n            image: \"../public/img/avatar.jpg\",\r\n            title: \"Lorem ipsum\",\r\n            date: new Date().toDateString()\r\n        },\r\n        content: {\r\n            template: `\r\n          <div>\r\n            <h1>Hello retards</h1>\r\n            <main>\r\n                <p>Lorem ipsum...</p>\r\n            </main>\r\n          </div>\r\n          `\r\n        },\r\n        footer: {\r\n            actions: {\r\n                like: 2,\r\n                share: 20,\r\n                comment: 2\r\n            }\r\n        }\r\n    }, document.querySelector('.timeline'));\r\n}, false);\r\n\n\n//# sourceURL=webpack:///./src/ts/main.ts?");

/***/ })

/******/ });