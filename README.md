
# snabb-charts

see /demo/index.js


```js
import h from 'snabbdom/h'
import chart from 'snabb-charts'

// Initialize using Chart.js options, but leave out the .data property (save that for the view)
const barChart = chart({type: 'bar', options: {...}})

// Refer to the Chart.js docs for the .data property. Pass that object into your snabbdom view.
h('div', [
  barChart({labels: ['xyz'], datasets: [{data: [1,2,3]}]})
])
```

see http://www.chartjs.org/docs/ for details on the parameters.
