(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.utils = {})));
}(this, (function (exports) { 'use strict';

function dateTimeFormatter(date, format) {
  // 时间格式化辅助函数 date:毫秒数 format:'yyyy-MM-dd hh:mm:ss'
  if (typeof date === "string") {
    var mts = date.match(/(\/Date\((\d+)\)\/)/);
    if (mts && mts.length >= 3) {
      date = parseInt(mts[2]);
    }
  }

  date = new Date(date);
  if (!date || date.toUTCString() == "Invalid Date") return "";

  var map = {
    "M": date.getMonth() + 1, //月份
    "d": date.getDate(), //日
    "h": date.getHours(), //小时
    "m": date.getMinutes(), //分
    "s": date.getSeconds(), //秒
    "q": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };

  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    var v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });

  return format;
}

function getCookie(name) {
  var cookieName = encodeURIComponent(name) + '=';
  var cookieStart = document.cookie.indexOf(cookieName);
  var cookieValue = null;
  if (cookieStart > -1) {
    var cookieEnd = document.cookie.indexOf(';', cookieStart);
    if (cookieEnd == -1) {
      cookieEnd = document.cookie.length;
    }
    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
  }
  return cookieValue;
}

function setCookie(name, value, exdays, path) {
  if (!path) {
    path = '/';
  }
  if (!exdays) {
    document.cookie = name + '=' + value;
    return;
  }
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = name + '=' + value + '; ' + expires + "; path=" + path;
}

function delCookie(name, path) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = 'null';
  if (!path) {
    path = '/';
  }
  if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=" + path;
}

function isEmpty(obj) {
  if (obj == null || obj == '' || obj == 'undefined' || obj == 'null') {
    return true;
  }
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }
  return true;
}

function clone(src) {
  var dst = {};
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop];
    }
  }
  return dst;
}

function cloneDeep(src) {
  return JSON.parse(JSON.stringify(src));
}

function setScrollTop(element, value) {
  'scrollTop' in element ? element.scrollTop = value : element.scrollTo(element.scrollX, value);
}

function getScrollTop(element) {
  return 'scrollTop' in element ? element.scrollTop : element.pageYOffset;
}

function getElementTop(element) {
  if (element === window) {
    return this.getScrollTop(window);
  }
  return element.getBoundingClientRect().top + this.getScrollTop(window);
}

exports.dateTimeFormatter = dateTimeFormatter;
exports.getCookie = getCookie;
exports.setCookie = setCookie;
exports.delCookie = delCookie;
exports.isEmpty = isEmpty;
exports.clone = clone;
exports.cloneDeep = cloneDeep;
exports.setScrollTop = setScrollTop;
exports.getScrollTop = getScrollTop;
exports.getElementTop = getElementTop;

Object.defineProperty(exports, '__esModule', { value: true });

})));
