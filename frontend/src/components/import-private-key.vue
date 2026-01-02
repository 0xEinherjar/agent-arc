<script setup>
import { ref, inject } from "vue";
import { Icon } from "./index.js";
import { useNotificationStore } from "../store/notification.js";
const userGateway = inject("userGateway");
const notificationStore = useNotificationStore();
const privateKey = ref("");
const open = ref(false);

async function importPrivateKey() {
  const { status } = await userGateway.importPrivateKey({ privateKey: privateKey.value });
  if (status == 204) {
    notificationStore.setNotification({ text: "Success to import", isError: false });
  } else {
    notificationStore.setNotification({ text: "Error to import", isError: true });
  }
}
</script>
<template>
  <Teleport to="body">
    <div v-if="open" class="c-modal--backdrop u-flex-line-center">
      <div class="c-modal deposit">
        <div class="u-flex-line-between">
          Import private key 
          <Icon @click="open = false" name="close" iconClass="c-icon"/>
        </div>
        <div class="c-form__field">
          <label class="c-form__label">Private Key</label>
          <input class="c-form__input" type="text"/>
        </div>
        <button @click="importPrivateKey" class="c-button c-button--extra-large">Import</button>
      </div>
    </div>
  </Teleport>
  <button @click="open = true" type="button"><slot></slot></button>
</template>
<style>

</style>