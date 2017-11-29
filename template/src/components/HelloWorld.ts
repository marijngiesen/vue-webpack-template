import Vue from 'vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
import Component from 'vue-class-component'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}

@Component
export default class HelloWorld extends Vue {
  msg = 'Welcome to Your Vue.js App'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
}
