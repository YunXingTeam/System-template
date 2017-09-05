<template>
  <div class="head-bar" :class="line" :style="{'margin-top':gutter+'rem'}">
    <label :style="{'font-size':size+'rem'}">{{label}}</label>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'head-bar',
    props: {
      label: [String, Number],
      size: {
        type: Number,
        default: 1.25
      },
      line: {
        type: String,
        default: 'line'
      },
      gutter: {
        type: Number,
        default: 0
      },
      icon: [String],
      showIcon: {
        type: Boolean,
        default: true
      }
    },
    components: {},
    data(){
      return {
        activeIndex: []
      }
    },
  }
</script>
