/**
 * @project     chat-modules
 * @author      Max Eremin
 * @build       Monday, April 23, 2018 5:03 PM
 * @release     
 * @copyright   Copyright (c) 2018, Max Eremin
*/
!function(e){function t(t){for(var r,l,a=t[0],c=t[1],f=t[2],s=0,p=[];s<a.length;s++)l=a[s],o[l]&&p.push(o[l][0]),o[l]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(i&&i(t);p.length;)p.shift()();return u.push.apply(u,f||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(u.splice(t--,1),e=l(l.s=n[0]))}return e}var r={},o={1:0};var u=[];function l(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=r,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},l.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var a=window.webpackJsonp=window.webpackJsonp||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var f=0;f<a.length;f++)t(a[f]);var i=c;u.push([15,0]),n()}({14:
/*!****************************************!*\
  !*** ./wwwroot/client/source/index.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){"use strict";var r=o(n(/*! react */4));function o(e){return e&&e.__esModule?e:{default:e}}o(n(/*! react-dom */12)).default.render(r.default.createElement("div",null,r.default.createElement("ul",null,r.default.createElement("li",{key:"reg"},r.default.createElement("button",{onClick:function(e){e.preventDefault(),fetch("http://localhost:8002/user",{method:"PUT",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},body:"username=happyfrog&hash=darius&first_name=Максим&last_name=Ерёмин",mode:"cors"}).then(function(e){return e.json()}).then(function(e){console.log(e)})}},"Register")))),document.getElementById("root"))},15:
/*!**********************************************!*\
  !*** multi ./wwwroot/client/source/index.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){e.exports=n(/*! D:\workshop\chat-modules\wwwroot\client\source\index.js */14)}});
//# sourceMappingURL=bundle.js.map
