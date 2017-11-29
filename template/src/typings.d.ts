declare module '*.vue' {
  import Vue from 'vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  export default Vue{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
}
