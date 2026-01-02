<script setup>
import { Icon } from ".";
import { storeToRefs } from "pinia";
import { useNotificationStore } from "../store/notification.js";
const notificationStore = useNotificationStore();
const { notification } = storeToRefs(notificationStore);
</script>
<!-- prettier-ignore -->
<template>
  <Teleport to="body">
    <div :class="{'is-error': notification.isError }" class="c-toast u-flex-line-between">
      {{ notification.text }}
      <icon @click="notificationStore.removeNotification()" iconClass="c-icon" name="close"/>
    </div>
  </Teleport>
</template>
<style>
.c-toast {
  background-color: var(--color-green);
  border-radius: 12px;
  height: 56px;
  min-width: 150px;
  max-width: 600px;
  overflow: hidden;
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  gap: 16px;
  padding-inline: 16px;
  color: #f4f4f4;
  font-weight: 500;
  z-index: 1001;
}
.c-toast.is-error {
    background-color: var(--color-red);
}
.c-toast svg {
  color: var(--text-color-primary) !important;
  cursor: pointer;
}
</style>