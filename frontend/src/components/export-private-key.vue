<script setup>
import { ref, inject } from "vue";
import { Icon } from "./index.js";
import { useNotificationStore } from "../store/notification.js";
const userGateway = inject("userGateway");
const notificationStore = useNotificationStore();
const privateKey = ref("");
const open = ref(false);

function copy(address) {
  navigator.clipboard.writeText(address);
  notificationStore.setNotification({ text: "Copied!", isError: false })
}

async function exportPrivateKey() {
  const { status, data } = await userGateway.exportPrivateKey();
  if (status == 201) {
    privateKey.value = data.privateKey;
    notificationStore.setNotification({ text: "Success to export", isError: false });
    open.value = false;
  } else {
    notificationStore.setNotification({ text: "Error to export", isError: true });
  }
}
</script>
<template>
  <Teleport to="body">
    <div v-if="open" class="c-modal--backdrop u-flex-line-center">
      <div class="c-modal deposit">
        <div class="u-flex-line-between">
          Export private key 
          <Icon @click="open = false" name="close" iconClass="c-icon"/>
        </div>
        <button @click="exportPrivateKey" class="c-button c-button--extra-large">Export</button>
        <div v-if="privateKey">
          {{ privateKey }}
          <Icon @click="copy(privateKey)" name="copy" iconClass="c-icon"/>
        </div>
      </div>
    </div>
  </Teleport>
  <button @click="open = true" type="button"><slot></slot></button>
</template>
<style>

</style>