import Ember from 'ember';

export default Ember.Controller.extend({
  model: Ember.computed(function() {
    return [
      {
        type: 'row',
        content: [
          {
            type: 'component',
            componentName: 'test-component',
            componentState: { label: 'A' }
          },
          {
            type: 'column',
            content:[
              {
                type: 'component',
                componentName: 'test-component',
                componentState: { label: 'B' }
              },
              {
                type: 'component',
                componentName: 'test-component',
                componentState: { label: 'C' }
              }
            ]
          }
        ]
      }
    ];
  })
});
