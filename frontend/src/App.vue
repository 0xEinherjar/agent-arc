<script setup>
import { Toast } from "./components";
import { storeToRefs } from "pinia";
import { useNotificationStore } from "./store/notification.js";
const { notification } = storeToRefs(useNotificationStore());
</script>
<template>
  <Toast v-if="notification.text"/>
  <RouterView />
</template>