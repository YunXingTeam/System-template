<template>
  <section class="drawer-wrapper" :class="{'collapse':collapse}">
    <div class="drawer-menu">
      <slot name="banner"></slot>
      <slot name="menu"></slot>
    </div>
  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'drawer',
    props: {
      collapse: Boolean
    },
    components: {},
    computed: {
      ...mapGetters(['drawer'])
    }
  }
</script>
