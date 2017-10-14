// vue-template-loader (@see https://github.com/ktsn/vue-template-loader)
/* tslint:disable:interface-name no-duplicate-imports */
declare module '*.html' {
  import Vue, { ComponentOptions } from 'vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  interface WithRender {
    <V extends Vue>(options: ComponentOptions<V>): ComponentOptions<V>{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
    <V extends typeof Vue>(component: V): V{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  }
  const withRender: WithRender{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  export default withRender{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
}

declare module '*.scss' {
  import Vue, { ComponentOptions } from 'vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  interface WithRender {
    <V extends Vue>(options: ComponentOptions<V>): ComponentOptions<V>{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
    <V extends typeof Vue>(component: V): V{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  }
  const withRender: WithRender{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  export default withRender{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
}

declare module '*.css' {
  import Vue, { ComponentOptions } from 'vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  interface WithRender {
    <V extends Vue>(options: ComponentOptions<V>): ComponentOptions<V>{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
    <V extends typeof Vue>(component: V): V{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  }
  const withRender: WithRender{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
  export default withRender{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
}
