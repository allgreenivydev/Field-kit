import Vue from 'vue';
import components from '../src';
import '../../field-kit/src/styles/normalize.css';
import '../../field-kit/src/styles/bootstrap-simplex.min.css';
import './override-bootstrap.css';
import '../../field-kit/src/styles/vars.css';
import '../../field-kit/src/styles/main.css';

const mockT = {
  methods: { $t: str => str },
};

Object.values(components).forEach(c => { Vue.component(c.name, c); });
Vue.mixin(mockT);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: ['Intro', 'Layout', 'Content', 'Icons'], 
    },
  },
}