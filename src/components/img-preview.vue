<template>
  <transition name="fade">
    <div class="lg-preview-wrapper" v-if="preview.show" @click="leave">
      <div class="lg-preview-loading" v-if="preview.loading">
        <!--加载-->
      </div>
      <img
        class="lg-preview-img"
        v-if="preview.current.src"
        v-lazy="preview.current.src"
        :alt="preview.current.title"
        v-show="!preview.loading"
      >
      <div class="lg-preview-title" v-if="preview.isTitleEnable&&preview.current.title" v-show="!preview.loading">
        {{preview.current.title}}
      </div>
      <div class="lg-preview-nav-left" v-if="!preview.loading&&preview.isHorizontalNavEnable&&preview.list.length>1">
        <!--<x-icon type="chevron-left" @click="preAction"></x-icon>-->
      </div>
      <div class="lg-preview-nav-right" v-if="!preview.loading&&preview.isHorizontalNavEnable&&preview.list.length>1">
        <!--<x-icon type="chevron-right" @click="nextAction"></x-icon>-->
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Preview',
    components: {
    },
    computed: {
      preview () {
        return window.LOGIC_EVENT_BUS.LOGIC_PREVIEW
      }
    },
    methods: {
      leave (e) {
        if ((this.preview.show) && (e.target.localName != 'path' && e.target.localName != 'svg')) {
          this.close()
        }
      },
      close () {
        this.preview.show = false
      },
      preAction () {
        this.preview.loading = true;
        let index = this.preview.list.indexOf(this.preview.current);
        if (index === 0) {
          this.preview.loading = false;
          return
        }
        index--;
        this.preview.current = this.preview.list[index];
        const img = new window.Image();
        img.src = this.preview.current.src;
        img.onload = function () {
          LOGIC_EVENT_BUS.LOGIC_PREVIEW.loading = false;
        }
      },
      nextAction () {
        this.preview.loading = true;
        let index = this.preview.list.indexOf(this.preview.current);
        if (index === this.preview.list.length - 1) {
          this.preview.loading = false;
          return
        }
        index++;
        this.preview.current = this.preview.list[index];
        const img = new window.Image();
        img.src = this.preview.current.src;
        img.onload = function () {
          LOGIC_EVENT_BUS.LOGIC_PREVIEW.loading = false;
        }
      },
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
