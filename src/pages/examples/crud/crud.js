// @flow

import { MDCTextField } from '@material/textfield';
import { template as _ } from 'lodash';
import { observable, action, autorun } from 'mobx';

import { $, $$ } from '~/utils';

import template from './crud.html';
import style from './crud.css';

export const INITIAL = [
  { id: 4, primary: 'Vanilla', accent: 'Cordova' },
  { id: 3, primary: 'Angular', accent: 'Ionic' },
  { id: 2, primary: 'React', accent: 'React Native' },
  { id: 1, primary: 'Vue', accent: 'Weex' }
];

export const store = observable({
  // observable
  dataset: [...INITIAL],

  // action
  addItem: action((primary, accent) => {
    const id = store.dataset.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1;
    store.dataset = [{ id, primary, accent }, ...store.dataset];
  }),
  searchItem: action((primary, accent) => {
    store.dataset = INITIAL.filter(item =>
      (item.primary.toLowerCase().indexOf(primary.toLowerCase()) !== -1) &&
      (item.accent.toLowerCase().indexOf(accent.toLowerCase()) !== -1)
    );
  }),
  editItem: action(() => {
    // ...
  }),
  deleteItem: action(() => {
    // ...
  }),

  // computed
  get total(): number {
    return store.dataset.length;
  }
});

export const render = (): void => {
  $('#app').innerHTML = _(template, { imports: { style } })({ store });

  $('#add-button').onclick = () => {
    const primary = $('#add-primary').value;
    const accent = $('#add-accent').value;

    if (primary && accent) {
      store.addItem(primary, accent);
    }
  };

  $('#search-button').onclick = () => {
    const primary = $('#search-primary').value;
    const accent = $('#search-accent').value;

    store.searchItem(primary, accent);
  };

  [].forEach.call(
    $$('.mdc-text-field'),
    textfield => MDCTextField.attachTo(textfield)
  );
};

export default (parent: string): void =>
  page(`${parent}/crud`, (): void => autorun(render));
