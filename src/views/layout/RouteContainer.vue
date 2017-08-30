<template>
  <section class="route-wrapper bl">

    <keep-alive>
      <transition name="fade" mode="out-in">
        <router-view v-if="$route.meta.keepalive"></router-view>
      </transition>
    </keep-alive>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepalive"></router-view>
    </transition>
  </section>
</template>
<script>
  export default {
    name: 'container',
    watch: {
      '$route': function (to, from) {
      }
    }
  }
</script>
