import withRender from './App.html?style=./App.css'{{#if_eq eslintConfig "airbnb"}};{{/if_eq}}

{{#unless router}}
import HelloWorld from './components/HelloWorld.vue'{{#if_eq eslintConfig "airbnb"}};{{/if_eq}}

{{/unless}}
export default withRender({
  name: 'app'{{#router}}{{#if_eq eslintConfig "airbnb"}},{{/if_eq}}{{else}},
  components: { HelloWorld }{{#if_eq eslintConfig "airbnb"}},{{/if_eq}}{{/router}}
}){{#if_eq eslintConfig "airbnb"}};{{/if_eq}}
