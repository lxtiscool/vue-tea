<template>
  <HelloWorld @toggle="toggle" :msg="msg"></HelloWorld>
</template>

<script>
import { ref } from 'vue'

import HelloWorld from './HelloWorld'

export default {
  components: { HelloWorld },

  setup() {
    const msg = ref('Hello World')

    function toggle() {
      msg.value = msg.value === 'Hello World' ? 'Hello Vue' : 'Hello World'
    }

    return {
      toggle,

      msg
    }
  }
}
</script>
