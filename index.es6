
import h from 'snabbdom/h'
import Chart from 'chart.js'


module.exports = function(options) {
  return h('canvas', {
    hook: {
      insert: vnode => {
        debugger
        new Chart(vnode.elm, options)
      }
    }
  }, ['hi'])
}

