import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

import Ember from 'ember';

moduleForAcceptance('Acceptance | application');

test('visiting /', async function(assert) {
  await visit('/');

  assert.equal(currentURL(), '/');

  let components = Ember.$('.ember-golden-layout').find('.ember-view').toArray();

  let text = components.map(component => Ember.$(component).text().trim());

  assert.deepEqual(text, [
    'test component !!! A',
    'test component !!! B',
    'test component !!! C',
  ]);
});
