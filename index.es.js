export function dateTimeFormatter (date ,format) {
	// 时间格式化辅助函数 date:毫秒数 format:'yyyy-MM-dd hh:mm:ss'
  if (typeof date === "string") {
    var mts = date.match(/(\/Date\((\d+)\)\/)/)
    if (mts && mts.length >= 3) {
      date = parseInt(mts[2])
    }
  }

  date = new Date(date);
  if (!date || date.toUTCString() == "Invalid Date") return ""

  var map = {
    "M": date.getMonth() + 1, //月份
    "d": date.getDate(), //日
    "h": date.getHours(), //小时
    "m": date.getMinutes(), //分
    "s": date.getSeconds(), //秒
    "q": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  }

  format = format.replace(/([yMdhmsqS])+/g, function(all, t){
      var v = map[t];
      if(v !== undefined){
          if(all.length > 1){
              v = '0' + v;
              v = v.substr(v.length-2);
          }
          return v;
      }
      else if(t === 'y'){
          return (date.getFullYear() + '').substr(4 - all.length);
      }
      return all;
  });
  
  return format;
}

export function getCookie (name) {
  var cookieName = encodeURIComponent(name) + '='
  var cookieStart = document.cookie.indexOf(cookieName)
  var cookieValue = null
  if (cookieStart > -1) {
    var cookieEnd = document.cookie.indexOf(';', cookieStart)
    if (cookieEnd == -1) {
      cookieEnd = document.cookie.length
    }
    cookieValue = decodeURIComponent(
      document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
    )
  }
  return cookieValue
}

export function setCookie (name, value, exdays, path) {
  if(!path){
    path = '/'
  }
  if (!exdays) {
    document.cookie = name + '=' + value
    return
  }
  var d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  var expires = 'expires=' + d.toUTCString()
  document.cookie = name + '=' + value + '; ' + expires + "; path=" + path;
}

export function delCookie (name, path) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = 'null';
  if(!path){
    path = '/'
  }
  if(cval != null)
    document.cookie = name + "="+cval+";expires="+exp.toGMTString()+ ";path=" + path;
}

export function isEmpty (obj){
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

export function clone(src) {
  var dst = {}
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop]
    }
  }
  return dst
}

export function cloneDeep(src) {
  return JSON.parse(JSON.stringify(src))
}

export function setScrollTop(element, value) {
  'scrollTop' in element ? element.scrollTop = value : element.scrollTo(element.scrollX, value);
}

export function getScrollTop(element) {
  return 'scrollTop' in element ? element.scrollTop : element.pageYOffset;
}

export function getElementTop(element) {
  if (element === window) {
    return this.getScrollTop(window);
  }
  return element.getBoundingClientRect().top + this.getScrollTop(window);
}

export function urlParser(url) {
  let urlObj = new URL(url);
  urlObj.__search = parseSearch(urlObj.search);

  urlObj.getSearch = function(key) {
    return urlObj.__search[key];
  }

  urlObj.setSearch = function(key, value) {
    urlObj.__search[key] = value;
    urlObj.search = stringifySearch(urlObj.__search);
    urlObj.href = urlObj.origin + urlObj.pathname + urlObj.search + urlObj.hash;
  }

  urlObj.removeSearch = function(key) {
    delete urlObj.__search[key];
    urlObj.search = stringifySearch(urlObj.__search);
    urlObj.href = urlObj.origin + urlObj.pathname + urlObj.search + urlObj.hash;
  }

  return urlObj;
}

export function parseSearch(queryString) {
  const obj = Object.create(null);
  const sep = '&';
  const eq = '=';

  if (typeof queryString !== 'string' || queryString.length === 0) {
    return obj;
  }
  if (queryString[0] === '?') queryString = queryString.substr(1);
  const params = queryString.split(sep);
  let i = 0;
  let l = params.length;

  for (; i < l; i++) {
    let items = params[i].split(eq);
    let queryKey = items[0].trim();
    let queryVal = '';

    if (items.length >= 3) {
      items.splice(0, 1);

      let lastIndex = items.length - 1;

      items.forEach(function(v, i) {
        v = v.trim();

        if (i === lastIndex) {
          queryVal += v;
        } else {
          queryVal += v + eq;
        }
      });
    } else {
      queryVal = items[1].trim();
    }

    let cur = obj[queryKey];

    if (cur) {
      if (Array.isArray(cur)) {
        cur.push(queryVal);
      } else {
        let temp = cur;

        obj[queryKey] = new Array();
        obj[queryKey].push(temp);
        obj[queryKey].push(queryVal);
      }
    } else {
      obj[queryKey] = queryVal;
    }
  }
  return obj;
}

export function stringifySearch(obj) {
  const sep = '&';
  const eq = '=';

  if (obj !== null && typeof obj === 'object') {
    const keys = Object.keys(obj);
    const len = keys.length;
    const flast = len - 1;
    let fields = '';
    let i = 0;

    for (; i < len; i++) {
      let k = keys[i];
      let v = obj[k];
      let ks = k + eq;

      if (Array.isArray(v)) {
        let vlen = v.length;
        let vlast = vlen - 1;
        let j = 0;
        for (; j < vlen; ++j) {
          fields += ks + v[j];
          if (j < vlast) {
            fields += sep;
          }
        }
        if (vlen && i < flast) {
          fields += sep;
        }
      } else {
        fields += ks + v;
        if (i < flast) {
          fields += sep;
        }
      }
    }

    return '?' + fields;
  }

  return '';
}