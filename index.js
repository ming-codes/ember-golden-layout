/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

const stew = require('broccoli-stew');
const path = require('path');

module.exports = {
  name: 'ember-golden-layout',

  included(parent) {
    this._super(...arguments);

    this.import({
      development: 'vendor/golden-layout/goldenlayout.js',
      production: 'vendor/golden-layout/goldenlayout.min.js'
    });

    // TODO compile from less
    this.import('vendor/golden-layout/goldenlayout-base.css');
    this.import('vendor/golden-layout/goldenlayout-base.css');
    this.import('vendor/golden-layout/goldenlayout-dark-theme.css');
  },

  treeForVendor() {
    let tree = this._super(...arguments);
    let root = path.resolve(path.join(path.dirname(require.resolve('golden-layout')), '..'));

    let js = new Funnel(root, {
      srcDir: 'dist',
      destDir: 'golden-layout'
    });

    let css = new Funnel(root, {
      srcDir: 'src/css',
      destDir: 'golden-layout'
    });

    return new MergeTrees([ tree, js, css ]);
  }
};
