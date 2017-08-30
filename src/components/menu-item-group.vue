<template>
  <div class="menu-item-group">
    <div class="menu-item-group-wrapper">
      <img v-if="showIcon" class="icon" v-lazy="icon"/>
      <span class="title">{{title}}</span>
    </div>
    <ul class="menu-sub" ref="menu">
      <li class="menu-sub-item" :class="{'is-active':isActive(item)}" @click.stop="handleClick(item)"
          v-for="item,i in items" :key="i">
        <div class="menu-sub-item-wrapper">
          <img v-if="showIcon" class="icon" v-lazy="item.icon"/>
          <span class="title">{{item.title}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import MMenuItem from './menu-item'
  export default {
    name: 'Preview',
    props: {
      title: [String, Number],
      icon: [String],
      items: [Array, Object],
      open: Boolean,
      showIcon: {
        type: Boolean,
        default: true
      }
    },
    components: {MMenuItem},
    data(){
      return {
        activeIndex: []
      }
    },
    mounted(){
    },
    methods: {
      handleClick(item){
        if (this.activeIndex.toString().indexOf(item.route) == -1) {
          this.activeIndex = [];
          this.activeIndex.push(item.route);
          this.$emit('on-item-click', {item});
        }
      },
      isActive(item){
        return this.activeIndex.toString().indexOf(item.route) != -1;
      }
    },
    watch: {
      open: function (n) {
        let menu = this.$refs.menu;
        if (n) {
          menu.style.height = (this.items.length * 3) + 'rem'
        } else {
          menu.style.height = 0
        }
      }
    }
  }
</script>
