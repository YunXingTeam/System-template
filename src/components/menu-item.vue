<template>
  <li class="menu-item"
      :class="{'is-active':active,'group':item.subMenu&&item.subMenu.length>1,'divider':item=='divider'}">
    <div class="menu-item-wrapper" v-if="item!='divider'&&!item.group">
      <img v-if="showIcon" class="icon" v-lazy="item.icon"/>
      <span class="title">{{item.title}}</span>
      <span class="badge" :class="{'dot':item.badge=='dot'}"
            v-if="item.badge">{{item.badge != 'dot' ? item.badge : ''}}</span>
    </div>
    <m-menu-item-group v-if="item !='divider'&&item.group&&item.subMenu.length>1" :items="item.subMenu"
                       :title="item.title" :open="active" @on-item-click="handleItemClick" :icon="item.icon"
                       :showIcon="showIcon"></m-menu-item-group>
  </li>
</template>

<script>
  import MMenuItemGroup from './menu-item-group'
  import {mapMutations} from 'vuex'
  export default {
    name: 'Preview',
    props: {
      item: [Number, Object, String, Array],
      active: Boolean,
      route: [String,Number],
      showIcon: {
        type: Boolean,
        default: true
      },
    },
    components: {MMenuItemGroup},
    data(){
      return {}
    },
    computed: {},
    methods: {
      ...mapMutations(['updateHistory']),
      handleItemClick(par){
        this.$emit('on-subItem-click', this.route + '/' + par.item.route);
        this.$emit('on-subMenu-change', par.item.route);
        this.updateHistory(['push', this.route + '/' + par.item.route]);
      }
    }
  }
</script>
