const assert = require('assert')
const R = require("ramda")
const flyd = require("flyd")

var snabbdom = require("snabbdom")
const patch = snabbdom.init([ // Init patch function with choosen modules
  require('snabbdom/modules/class'), // makes it easy to toggle classes
  require('snabbdom/modules/props'), // for setting properties on DOM elements
  require('snabbdom/modules/style'), // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners'), // attaches event listeners
])
const h = require('snabbdom/h')

const render = require('../')

const log = console.log.bind(console)


test('will render static data', () => {
  var container = document.createElement('div')
  const view = state => h('p', state.x)
  const state = {x: 'hallo!'}
  const streams = render({container, patch, view, state})
  assert.equal(streams.dom$().textContent, 'hallo!')
})

test('it will render stream data', () => {
  var container = document.createElement('div')
  const state = {streamVal: flyd.stream('wat!!')}
  const view = state => h('p', state.streamVal())
  const streams = render({container, patch, view, state})
  assert.equal(streams.dom$().textContent, 'wat!!')
})

test('it will patch on new stream data over time', () => {
  var container = document.createElement('div')
  const view = state => h('p', state.streamVal())
  const s = flyd.stream('wat!!')
  const state = {streamVal: s}
  const streams = render({container, patch, view, state})
  assert.equal(streams.dom$().textContent, 'wat!!')
  s('goodbye')
  assert.equal(streams.dom$().textContent, 'goodbye')
})

test('it patches on nested streams', () => {
  var container = document.createElement('div')
  const view = state => h('p', state.nested.x.streamVal() + state.y())
  const s = flyd.stream('wat!!')
  const state = {y: s, nested: {x: {streamVal: s}}}
  const streams = render({container, patch, view, state})
  assert.equal(streams.dom$().textContent, 'wat!!wat!!')
  s('bye')
  assert.equal(streams.dom$().textContent, 'byebye')
})

test('it patches with multiple empty streams', () => {
  var container = document.createElement('div')
  const view = state => h('p', state.s1() || 'hi')
  const state = {s1: flyd.stream(), s2: flyd.stream()}
  const streams = render({container, patch, view, state})
  assert.equal(streams.dom$().textContent, 'hi')
  state.s1('x')
  assert.equal(streams.dom$().textContent, 'x')
  state.s2('y')
  state.s1('z')
  assert.equal(streams.dom$().textContent, 'z')
})

