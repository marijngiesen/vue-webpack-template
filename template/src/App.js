{{#unless router}}
import HelloWorld from './components/HelloWorld.vue'

{{/unless}}
export default {
  name: 'app'{{#router}}{{else}},
  components: { HelloWorld }{{/router}}
}
