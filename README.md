# ember-golden-layout

This addon integrates Ember with [GoldenLayout](http://golden-layout.com).

## Installation

* `git clone <repository-url>` this repository
* `cd ember-golden-layout`
* `npm install`

## Usage

There is only one components: `golden-layout`.

```hbs
{{golden-layout
  options=(hash
    content=(array
      type="row"
      content=(array
        (hash
          type="row",
          content=(array
            (hash
              type="component",
              componentName="test-component",
              componentState=(hash label="A")
            )
            (hash
              type="column",
              content:[
                {
                  type="component",
                  componentName="test-component",
                  componentState=(hash label="B")
                },
                {
                  type="component",
                  componentName="test-component",
                  componentState=(hash label="C")
                }
              ]
            )
          )
        )
      )
    )
  )
}}
```

There is only one attribute: `options`. The attribute is the [options](http://golden-layout.com/docs/Config.html) hash passed into GoldenLayout.

For type component, this addon will lookup the component by name using `componentName`. `componentState` will be set on the component as `state` attribute.

To update the component state, it is recommended to bind a mutable `Ember.Object` as `componentState`.
