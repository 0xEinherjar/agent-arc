<script setup>
import { Icon } from ".";
import { useNotificationStore } from "../store/notification.js";
import { useUtils } from "../composables/useUtils.js";
const { truncateAddress } = useUtils();
const notificationStore = useNotificationStore();
const props = defineProps(["address"]);

function copy(address) {
  navigator.clipboard.writeText(address);
  notificationStore.setNotification({ text: "Address copied!", isError: false })
}
</script>
<template>
  <div class="copy u-flex-line-between">
    <span class="copy__text u-flex-line">
      <span class="u-text-secondary">Your address:</span>
      <span class="u-hidden-mobile">{{ props.address }}</span>
      <span class="u-hidden-desktop">{{ truncateAddress(props.address) }}</span>
    </span>
    <Icon @click="copy(props.address)" name="copy" iconClass="c-icon" />
  </div>
</template>
<style>
.copy {
  border: 1px solid rgb(255 255 255 / 12%);
  margin-top: 40px;
  padding: 32px;
  border-radius: 16px;
  gap: 12px;
}
.copy__text {
  gap: 4px;
}
@media (width < 600px) {
  .copy {
    margin-top: 24px;
    padding: 16px;
    border-radius: 8px;
  }
}
</style>