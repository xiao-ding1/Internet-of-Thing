<template>
  <RouterView></RouterView>
</template>

<script setup>
import Index from './pages/index.vue';
import Login from './pages/login-u.vue';
import { RouterView } from 'vue-router';
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ul li{
    list-style: none;
  }
</style>
