import withRender from './HelloWorld.html?style=./HelloWorld.css'{{#if_eq eslintConfig "airbnb"}};{{/if_eq}}

export default withRender({
  name: 'HelloWorld',
  props: {
    links: {
      type: Boolean,
      default: true{{#if_eq eslintConfig "airbnb"}},{{/if_eq}}
    },
    ecosystem: {
      type: Boolean,
      default: true{{#if_eq eslintConfig "airbnb"}},{{/if_eq}}
    }{{#if_eq eslintConfig "airbnb"}},{{/if_eq}}
  },
  data{{#unless_eq eslintConfig "airbnb"}} {{/unless_eq}}() {
    return {
      msg: 'Welcome to Your Vue.js App'{{#if_eq eslintConfig "airbnb"}},{{/if_eq}}
    }{{#if_eq eslintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq eslintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq eslintConfig "airbnb"}};{{/if_eq}}
