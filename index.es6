
import h from 'snabbdom/h'
import Chart from 'chart.js'

module.exports = function(options) {
  let chart = null
  options.data = {datasets: [{label: '', data: []}], labels: ['']}
  return function(newData) {
    return h('canvas', {
      hook: {
        insert: vnode => {
          chart = new Chart(vnode.elm, options)
          for(var key in newData) { chart.data[key] = newData[key] }
          chart.update()
        }
      , update: vnode => {
          for(var key in newData) { chart.data[key] = newData[key] }
          chart.update()
        }
      }
    })
  }
}


