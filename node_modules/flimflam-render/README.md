
# flimflam-render

Render a flimflam UI component onto the page (and keep rendering/patching it on every stream update).

* [Flim flam tutorials and getting started](http://flimflamjs.github.io/#start)

## render(component)

The component object can have these properties:

* state (required): an object of static data and flyd streams used in your UI
* view (required): a function that takes the state and returns a snabbdom vtree
* container (required): a DOM node container that you want to replace and patch your vtree into
* patch (required): the snabbdom patch function you are using

The render function will render and continuously patch your flimflam component onto the page. Any updates in any nested flyd streams within your state will cause your view function to be called again and the DOM to be patched.

This function is also included in flimflam core (ff-core/render).


__Usage__

```js
import render from 'flimflam-render'

// import your app's parent component and view function...
import component from './my-component'

// init your snabbdom patch function
import snabbdom from 'snabbdom'
const patch = snabbdom.init([...])

render({
  state: component.init()
, view: component.view
, container: document.querySelector('div.js-container')
, patch: patch
})
```


### run tests

use mocha and zuul

```js
zuul --local 8088 --ui mocha-qunit -- test/index.js
```

