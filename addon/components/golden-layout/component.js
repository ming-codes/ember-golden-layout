import Ember from 'ember';
import layout from './template';

/* global GoldenLayout Set */

export default Ember.Component.extend({
  classNames: 'ember-golden-layout',
  layout,

  /**
   * @attribute options
   */
  options: null,

  gl: Ember.computed('contentComponents', function() {
    let content = this.get('contentComponents');

    return new GoldenLayout({ content }, this.element);
  }).readOnly(),

  contentComponents: Ember.computed('options.content', function() {
    let content = this.get('options.content');
    let context = this;

    return content.map(function recur(node) {
      let { type, content, componentName, componentState } = node;
      let { id, width, height, isClosable, title, activeItemIndex } = node;

      if (type === 'component') {
        return {
          id, width, height, isClosable, title, activeItemIndex,
          type,
          componentName,
          componentState: {
            state: componentState,
            guid: Ember.generateGuid(context)
          }
        };
      }

      return {
        id, width, height, isClosable, title, activeItemIndex,
        type,
        content: content.map(recur)
      };
    });
  }).readOnly(),

  contentComponentRenderables: Ember.computed('contentComponents', function() {
    let content = this.get('contentComponents');

    return content.reduce(function recur(accum, { type, content, componentName, componentState }) {
      if (type === 'component') {
        accum.push({
          componentName,
          componentState
        });
      }
      else {
        content.reduce(recur, accum);
      }

      return accum;
    }, []);
  }).readOnly(),

  contentComponentTypes: Ember.computed('contentComponentRenderables', function() {
    return Array.from(new Set(this.get('contentComponentRenderables').map(({ componentName }) => {
        return componentName;
    })));
  }).readOnly(),

  didInsertElement() {
    this._super(...arguments);

    let gl = this.get('gl');

    this.get('contentComponentTypes').forEach(type => {
      gl.registerComponent(type, (container, { guid }) => {
        container.getElement().append(document.getElementById(guid));
      })
    });

    gl.init();
  }
});
