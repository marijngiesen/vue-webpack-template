import Vue from 'vue'
import Component from 'vue-class-component'
{{#unless router}}

import HelloWorld from './components/HelloWorld.vue'
{{/unless}}

@Component{{#unless router}}({
  components: { HelloWorld }{{#if_eq tslintConfig "airbnb"}},{{/if_eq}}
}){{/unless}}
export default class App extends Vue {
}
