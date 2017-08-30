<template>
  <div class="nav-wrapper bb sa">
    <div class="profile-wrapper">
      <slot name="profile"></slot>
    </div>
    <div class="hamburger-wrapper">
      <slot name="hamburger"></slot>
    </div>
    <div class="breadcrumb-wrapper">
      <slot name="breadcrumb"></slot>
    </div>
    <div class="nav-menu-wrapper">
      <slot name="nav-menu"></slot>
    </div>
    <div class="avatar-wrapper">
      <slot name="avatar"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'nav',
  }
</script>
