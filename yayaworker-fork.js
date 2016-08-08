'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  var SingleFileWorker = require('single-file-worker');
  var NativeShioriWorkerClient = require('native-shiori-worker');
  var WorkerClient = require('worker-client-server/WorkerClient');

  function workerRoutine() {
    var YAYA = require("yaya.js"),
        NativeShiori = require("nativeshiori"),
        NativeShioriEncode = require("nativeshiori/nativeshiori-encode"),
        WorkerServer = require("worker-client-server/WorkerServer"),
        SingleFileWorker = require("single-file-worker"),
        Promise = require("bluebird");var _slicedToArray = function () {
      function r(r, e) {
        var n = [],
            i = !0,
            t = !1,
            o = void 0;try {
          for (var u, s = r[Symbol.iterator](); !(i = (u = s.next()).done) && (n.push(u.value), !e || n.length !== e); i = !0) {}
        } catch (r) {
          t = !0, o = r;
        } finally {
          try {
            !i && s.return && s.return();
          } finally {
            if (t) throw o;
          }
        }return n;
      }return function (e, n) {
        if (Array.isArray(e)) return e;if (Symbol.iterator in Object(e)) return r(e, n);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        shiori = new YAYA(),
        shiorihandler = new NativeShioriEncode(new NativeShiori(shiori)),
        worker_server = new WorkerServer({ push: function push(r) {
        var e = _slicedToArray(r, 2),
            n = e[0],
            i = e[1];return new Promise(function (r, e) {
          return r({ contents: shiorihandler.push(n, i) });
        });
      }, mount: function mount(r) {
        var e = _slicedToArray(r, 3),
            n = e[0],
            i = e[1],
            t = e[2];return new Promise(function (r, e) {
          return r({ contents: shiorihandler.mount(n, i, t) });
        });
      }, load: function load(r) {
        return new Promise(function (e, n) {
          return e({ contents: shiorihandler.load(r) });
        });
      }, request: function request(r) {
        return new Promise(function (e, n) {
          return e({ contents: shiorihandler.request(r) });
        });
      }, unload: function unload() {
        return new Promise(function (r, e) {
          return r({ contents: shiorihandler.unload() });
        });
      }, umount: function umount(r) {
        return new Promise(function (e, n) {
          return e({ contents: shiorihandler.umount(r) });
        });
      }, pull: function pull(r) {
        return new Promise(function (e, n) {
          var i = shiorihandler.pull(r),
              t = [];Object.keys(i).forEach(function (r) {
            var e = i[r];t.push(e);
          }), e({ contents: i, transferable: t });
        });
      } });
  }

  function clientRoutine(workerMaker) {
    var YAYAWorker = function (_NativeShioriWorkerCl) {
      _inherits(YAYAWorker, _NativeShioriWorkerCl);

      _createClass(YAYAWorker, [{
        key: 'worker',
        get: function get() {
          return this._worker;
        }
      }]);

      function YAYAWorker(fs, workerErrorHandler) {
        _classCallCheck(this, YAYAWorker);

        // no fs with fork
        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(YAYAWorker).call(this));

        _this._worker = new WorkerClient(workerMaker(), workerErrorHandler);
        return _this;
      }

      return YAYAWorker;
    }(NativeShioriWorkerClient);

    if (typeof window !== 'undefined') {
      window.YAYAWorker = YAYAWorker;
      if (window.ShioriLoader) {
        window.ShioriLoader.shiories.yaya = YAYAWorker;
      } else {
        throw new Error("load ShioriLoader first");
      }
    } else {
      // node.js
      module.exports = YAYAWorker;
      if (typeof require !== 'undefined') {
        var ShioriLoader = require('shioriloader');
        ShioriLoader.shiories.yaya = YAYAWorker;
      }
    }
  }

  SingleFileWorker.fork(workerRoutine, clientRoutine, SingleFileWorker.scriptFilenameFromError(new Error()));
})();
