'use strict';

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

var _chart = require('chart.js');

var _chart2 = _interopRequireDefault(_chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _exports = module.exports = {};

_exports = function exports(options) {
  return (0, _h2.default)('canvas', {
    hook: {
      insert: function insert(vnode) {
        debugger;
        new _chart2.default(vnode.elm, options);
      }
    }
  }, ['hi']);
};

