<template>
  <div class="main-wrapper" :class="{'collapse':drawer.drawback}">
    <nav-bar>
      <template slot="profile">
        <img class="logo" v-lazy="">
        <span class="title">自由医生管理系统</span>
      </template>
      <icon :name="'bars'" slot="hamburger" @click.native="toggle"></icon>
      <m-menu slot="nav-menu" :mode="'horizontal'" :items="naveMenu.data"
              :defaultActive="naveMenu.default"
              :showIcon="false" @on-menu-selected="navChange" :permission="permission">
      </m-menu>
      <img slot="avatar" v-lazy=""/>
    </nav-bar>
    <div class="main-container">
      <drawer :collapse="drawer.drawback">
        <div class="banner" slot="banner">
          <img v-lazy=""/>
        </div>
        <m-menu slot="menu" :collapse="drawer.drawback" :items="menu.data"
                :defaultActive="menu.default" @on-menu-selected="menuChange" :permission="permission"></m-menu>
      </drawer>
      <route-container></route-container>
    </div>
  </div>
</template>
<script>
  import {NavBar, Drawer, RouteContainer} from '@/views/layout'
  import MMenu from '../../components/menu'
  import {keys} from '../../api'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'main',
    components: {
      NavBar, Drawer, RouteContainer, MMenu
    },
    data () {
      return {}
    },
    methods: {
      ...mapMutations(['toggleDrawer', 'updateMenu']),
      toggle(){
        this.toggleDrawer()
      },
      navChange(navRoute){
        this.updateMenu({navRoute});
      },
      menuChange(menuRoute){
        Utils.toUrl(this, '/' + menuRoute)
      }
    },
    computed: {
      ...mapGetters(['drawer', 'naveMenu', 'menu', 'permission']),
    }
  }
</script>
