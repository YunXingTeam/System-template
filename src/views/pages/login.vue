<template>
  <div class="login">
    <div class="login-nav-wrapper">
      <div class="nav">
        <img class="logo" v-lazy=""/>
      </div>
    </div>
    <div class="login-content-wrapper">
      <div class="content">
        <div class="login-box">
          <h1>
            登陆
          </h1>
          <form name="userForm">
            <div>
              <label>工号*</label>
              <el-input type="tel" required v-model="jobNum" placeholder="请输入工号"></el-input>
              <label>密码*</label>
              <el-input type="password" required v-model="psw" placeholder="请输入密码"></el-input>
            </div>
            <div style="margin-top: 1rem">
              <el-button type="primary" :loading="loading" @click.native="login">登陆</el-button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="copyright-wrapper">
      <span class="copyright">Copyright 版权所有：深圳九明珠信息科技有限公司 2017</span>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    components: {},
    data () {
      return {
        jobNum: '', psw: '',
        loading: false
      }
    },
    methods: {
      ...mapActions(['signIn']),
      login(){
        let jobNum = this.jobNum, psw = this.psw, $this = this;
        $this.loading = true;
        this.signIn({
          jobNum, psw, callback: () => {
            $this.loading = false;
            Utils.toUrl($this, '/index')
          }
        })
      }
    },
    computed: {}
  }
</script>
