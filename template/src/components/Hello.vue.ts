import Vue from 'vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
import Component from 'vue-class-component'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
import WithRender from './Hello.html?style=./Hello.css'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}

import {Prop} from 'vue-property-decorator'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}

@WithRender
@Component
export default class Hello extends Vue {
  @Prop({type: Boolean, default: true})
  links: boolean{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}

  @Prop({type: Boolean, default: true})
  ecosystem: boolean{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}

  msg = 'Welcome to Your Vue.js App'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
}
