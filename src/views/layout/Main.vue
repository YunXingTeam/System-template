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
      <div slot="avatar">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button type="text" size="small">
            <img v-lazy=""/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
  import {mapGetters, mapMutations, mapActions} from 'vuex'
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
      ...mapActions(['logout']),
      toggle(){
        this.toggleDrawer()
      },
      navChange(navRoute){
        this.updateMenu({navRoute});
      },
      menuChange(menuRoute){
        Utils.toUrl(this, '/' + menuRoute)
      },
      handleCommand(command){
        let ctx = this;
        switch (command) {
          case 'logout':
            ctx.logout(function () {
              Utils.toUrl(ctx, '/login')
            });
            break
        }
      }
    },
    computed: {
      ...mapGetters(['drawer', 'naveMenu', 'menu', 'permission']),
    }
  }
</script>
