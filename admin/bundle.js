(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require('./iframe-load');

module.exports =
/*#__PURE__*/
function () {
  function Editor() {
    _classCallCheck(this, Editor);

    this.iframe = document.querySelector('iframe');
  }

  _createClass(Editor, [{
    key: "open",
    value: function open(page) {
      var _this = this;

      this.iframe.load('../' + page, function () {
        var body = _this.iframe.contentDocument.body;
        var textNodes = [];

        function recursy(element) {
          element.childNodes.forEach(function (node) {
            if (node.nodeType === 3 && node.nodeValue.replace(/\s+/g, '').length > 0) {
              textNodes.push(node);
            } else {
              recursy(node);
            }
          });
        }

        recursy(body);
        textNodes.forEach(function (node) {
          var wrapper = _this.iframe.contentDocument.createElement('text-editor');

          node.parentNode.replaceChild(wrapper, node);
          wrapper.appendChild(node);
          wrapper.contentEditable = true;
        });
      });
    }
  }]);

  return Editor;
}();

},{"./iframe-load":2}],2:[function(require,module,exports){
"use strict";

HTMLIFrameElement.prototype.load = function (url, callback) {
  var iframe = this;

  try {
    iframe.src = url + "?rnd=" + Math.random().toString().substring(2);
  } catch (error) {
    if (!callback) {
      return new Promise(function (resolve, reject) {
        reject(error);
      });
    } else {
      callback(error);
    }
  }

  var maxTime = 60000;
  var interval = 200;
  var timerCount = 0;

  if (!callback) {
    return new Promise(function (resolve, reject) {
      var timer = setInterval(function () {
        if (!iframe) return clearInterval(timer);
        timerCount++;

        if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
          clearInterval(timer);
          resolve();
        } else if (timerCount * interval > maxTime) {
          reject(new Error("Iframe load fail!"));
        }
      }, interval);
    });
  } else {
    var timer = setInterval(function () {
      if (!iframe) return clearInterval(timer);

      if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
        clearInterval(timer);
        callback();
      } else if (timerCount * interval > maxTime) {
        callback(new Error("Iframe load fail!"));
      }
    }, interval);
  }
};

},{}],3:[function(require,module,exports){
"use strict";

var Editor = require('./editor');

window.editor = new Editor();

window.onload = function () {
  window.editor.open('index.html');
};

},{"./editor":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvZWRpdG9yLmpzIiwiYXBwL2pzL2lmcmFtZS1sb2FkLmpzIiwiYXBwL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBLE9BQU8sQ0FBQyxlQUFELENBQVA7O0FBRUEsTUFBTSxDQUFDLE9BQVA7QUFBQTtBQUFBO0FBQ0Usb0JBQWM7QUFBQTs7QUFDWixTQUFLLE1BQUwsR0FBYyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQUFkO0FBQ0Q7O0FBSEg7QUFBQTtBQUFBLHlCQUtPLElBTFAsRUFLYTtBQUFBOztBQUNULFdBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsUUFBUSxJQUF6QixFQUErQixZQUFNO0FBQ25DLFlBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxNQUFMLENBQVksZUFBWixDQUE0QixJQUF6QztBQUNBLFlBQUksU0FBUyxHQUFHLEVBQWhCOztBQUVBLGlCQUFTLE9BQVQsQ0FBaUIsT0FBakIsRUFBMEI7QUFDeEIsVUFBQSxPQUFPLENBQUMsVUFBUixDQUFtQixPQUFuQixDQUEyQixVQUFBLElBQUksRUFBSTtBQUNqQyxnQkFBSSxJQUFJLENBQUMsUUFBTCxLQUFrQixDQUFsQixJQUF1QixJQUFJLENBQUMsU0FBTCxDQUFlLE9BQWYsQ0FBdUIsTUFBdkIsRUFBK0IsRUFBL0IsRUFBbUMsTUFBbkMsR0FBNEMsQ0FBdkUsRUFBMEU7QUFDeEUsY0FBQSxTQUFTLENBQUMsSUFBVixDQUFlLElBQWY7QUFDRCxhQUZELE1BR0s7QUFDSCxjQUFBLE9BQU8sQ0FBQyxJQUFELENBQVA7QUFDRDtBQUNGLFdBUEQ7QUFRRDs7QUFDRCxRQUFBLE9BQU8sQ0FBQyxJQUFELENBQVA7QUFFQSxRQUFBLFNBQVMsQ0FBQyxPQUFWLENBQWtCLFVBQUEsSUFBSSxFQUFJO0FBQ3hCLGNBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxNQUFMLENB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KCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInJlcXVpcmUoJy4vaWZyYW1lLWxvYWQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEVkaXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaWZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaWZyYW1lJylcbiAgfVxuXG4gIG9wZW4ocGFnZSkge1xuICAgIHRoaXMuaWZyYW1lLmxvYWQoJy4uLycgKyBwYWdlLCAoKSA9PiB7XG4gICAgICBjb25zdCBib2R5ID0gdGhpcy5pZnJhbWUuY29udGVudERvY3VtZW50LmJvZHlcbiAgICAgIGxldCB0ZXh0Tm9kZXMgPSBbXVxuXG4gICAgICBmdW5jdGlvbiByZWN1cnN5KGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMgJiYgbm9kZS5ub2RlVmFsdWUucmVwbGFjZSgvXFxzKy9nLCAnJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGV4dE5vZGVzLnB1c2gobm9kZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZWN1cnN5KG5vZGUpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgcmVjdXJzeShib2R5KVxuXG4gICAgICB0ZXh0Tm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuaWZyYW1lLmNvbnRlbnREb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0LWVkaXRvcicpXG4gICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQod3JhcHBlciwgbm9kZSlcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChub2RlKVxuICAgICAgICB3cmFwcGVyLmNvbnRlbnRFZGl0YWJsZSA9IHRydWVcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuIiwiSFRNTElGcmFtZUVsZW1lbnQucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xyXG4gICAgY29uc3QgaWZyYW1lID0gdGhpcztcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWZyYW1lLnNyYyA9IHVybCArIFwiP3JuZD1cIiArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXhUaW1lID0gNjAwMDA7XHJcbiAgICBjb25zdCBpbnRlcnZhbCA9IDIwMDtcclxuXHJcbiAgICBsZXQgdGltZXJDb3VudCA9IDA7XHJcblxyXG4gICAgaWYgKCFjYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpZnJhbWUpIHJldHVybiBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgICAgIHRpbWVyQ291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmIChpZnJhbWUuY29udGVudERvY3VtZW50ICYmIGlmcmFtZS5jb250ZW50RG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lckNvdW50ICogaW50ZXJ2YWwgPiBtYXhUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIklmcmFtZSBsb2FkIGZhaWwhXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgaW50ZXJ2YWwpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWlmcmFtZSkgcmV0dXJuIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICBpZiAoaWZyYW1lLmNvbnRlbnREb2N1bWVudCAmJiBpZnJhbWUuY29udGVudERvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRpbWVyQ291bnQgKiBpbnRlcnZhbCA+IG1heFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcihcIklmcmFtZSBsb2FkIGZhaWwhXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGludGVydmFsKTtcclxuICAgIH1cclxufVxyXG4iLCJjb25zdCBFZGl0b3IgPSByZXF1aXJlKCcuL2VkaXRvcicpXG5cbndpbmRvdy5lZGl0b3IgPSBuZXcgRWRpdG9yKClcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgd2luZG93LmVkaXRvci5vcGVuKCdpbmRleC5odG1sJylcbn1cbiJdfQ==
