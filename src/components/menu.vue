<template>
  <div class="menu-wrapper" :class="{'vertical':(mode=='vertical'),'horizontal':(mode=='horizontal')}">
    <ul class="menu">
      <m-menu-item :item="item" v-for="item,i in items" :key="i" @click.native="handleMenuItemClick(item)"
                   :active="isActive(item)" :route="item.route||item.group"
                   @on-subItem-click="subItemClick" :showIcon="showIcon" v-if="isPermission(item)"></m-menu-item>
    </ul>
  </div>
</template>
<script>
  import MMenuItem from './menu-item'
  export default {
    name: 'Preview',
    props: {
      showIcon: {
        type: Boolean,
        default: true
      },
      collapse: {
        type: Boolean,
        default: false
      },
      mode: {
        type: String,
        default: 'vertical'
      },
      items: [Array, Object],
      defaultActive: [String, Number],
      permission: [String, Array]
    },
    components: {
      MMenuItem
    },
    data(){
      return {
        activeIndex: [],
      }
    },
    mounted() {
      if (this.defaultActive) {
        this.activeIndex.push(this.defaultActive);
        this.$emit('on-menu-selected', this.defaultActive);
      }
    },
    methods: {
      handleMenuItemClick(item){
        if (item == 'divider') {
          return
        }
        if (item.group) {
          if (item.subMenu && item.subMenu.length > 1) {
            if (this.activeIndex.toString().indexOf(item.group) != -1) {
              this.activeIndex = this.activeIndex.remove(item.group);
              return;
            }
          } else {
            delete item["subMenu"]
          }
          this.activeIndex.push(item.group);
          return;
        }

        if (this.activeIndex.toString().indexOf(item.route) == -1) {
          this.activeIndex = [];
          this.activeIndex.push(item.route);
        }
        this.$emit('on-menu-selected', item.route);
      },
      subItemClick(v){
        this.activeIndex = [];
        this.activeIndex = this.activeIndex.concat(v.split('/'));
        this.$emit('on-menu-selected', v.split('/')[1]);
      },
      isActive(item){
        if (item.group) {
          return this.activeIndex.toString().indexOf(item.group) != -1;
        }
        return this.activeIndex.toString().indexOf(item.route) != -1;
      },
      isPermission(item){
        if (item.permission == undefined) {
          return true
        }
        if (typeof item.permission == 'object') {
          for (let i in item.permission) {
            if (this.permission.indexOf(item.permission[i]) != -1) {
              return true
            }
          }
        } else {
          return this.permission.indexOf(item.permission) != -1
        }
      }
    },
    watch: {
      items: function () {
        if (this.defaultActive) {
          this.activeIndex = [];
          this.activeIndex.push(this.defaultActive);
          this.$emit('on-menu-selected', this.defaultActive);
        }
      }
    }
  }
</script>
