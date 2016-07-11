import flyd from 'flyd'
import R from 'ramda'

flyd.mergeAll = require('flyd/module/mergeall')

// A component has a:
//   state: object of static data and flyd streams
//   view: snabbdom view function
//   container: the DOM element we want to replace with our rendered snabbdom tree
//   patch: snabbdom patch function to use for rendering
function render(component) {
  const state$ = flyd.mergeAll(getObjStreams(component.state))
  const vtree$ = flyd.scan(
    component.patch
  , component.container
  , flyd.map(changes => component.view(component.state), state$)
  )
  const dom$ = flyd.map(R.prop('elm'), vtree$)
  state$([]) // trigger an initial patch
  return {state$, vtree$, dom$}
}

// Return all the streams within an object, including those nested further down
function getObjStreams(obj) {
  let stack = [obj]
  let streams = []
  while(stack.length) {
    const vals = R.values(stack.pop())
    streams = R.concat(streams, R.filter(flyd.isStream, vals))
    stack = R.concat(stack, R.filter(isObj, vals))
  }
  return streams
}

// Is the given parameter a plain JS object?
const isObj = x => x && x.constructor === Object

module.exports = render

