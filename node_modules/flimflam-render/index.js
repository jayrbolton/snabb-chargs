'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _flyd = require('flyd');

var _flyd2 = _interopRequireDefault(_flyd);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

_flyd2['default'].mergeAll = require('flyd/module/mergeall');

// A component has a:
//   state: object of static data and flyd streams
//   view: snabbdom view function
//   container: the DOM element we want to replace with our rendered snabbdom tree
//   patch: snabbdom patch function to use for rendering
function render(component) {
  var state$ = _flyd2['default'].mergeAll(getObjStreams(component.state));
  var vtree$ = _flyd2['default'].scan(component.patch, component.container, _flyd2['default'].map(function (changes) {
    return component.view(component.state);
  }, state$));
  var dom$ = _flyd2['default'].map(_ramda2['default'].prop('elm'), vtree$);
  state$([]); // trigger an initial patch
  return { state$: state$, vtree$: vtree$, dom$: dom$ };
}

// Return all the streams within an object, including those nested further down
function getObjStreams(obj) {
  var stack = [obj];
  var streams = [];
  while (stack.length) {
    var vals = _ramda2['default'].values(stack.pop());
    streams = _ramda2['default'].concat(streams, _ramda2['default'].filter(_flyd2['default'].isStream, vals));
    stack = _ramda2['default'].concat(stack, _ramda2['default'].filter(isObj, vals));
  }
  return streams;
}

// Is the given parameter a plain JS object?
var isObj = function isObj(x) {
  return x && x.constructor === Object;
};

module.exports = render;

