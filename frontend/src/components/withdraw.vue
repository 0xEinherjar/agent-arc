<script setup>
import { ref, inject } from "vue";
import { useConnection } from "@wagmi/vue";
import { Icon, ConnectWallet } from ".";
import { useNotificationStore } from "../store/notification.js";
import { usePublicClient } from "../composables/usePublicClient.js";
import { parseUnits } from "viem";
const userGateway = inject("userGateway");
const props = defineProps(["balance"]);
const { client } = usePublicClient();
const notificationStore = useNotificationStore();
const connection = useConnection();
const amount = ref("");
const open = ref(false);

async function withdraw() {
  const { status, data } = await userGateway.withdraw({ 
    to: connection.address.value, 
    value: String(parseUnits(amount.value, client.chain.nativeCurrency.decimals))
  });
  if (status == 201) {
    notificationStore.setNotification({ text: "Success to withdraw", isError: false });
    // open.value = false;
  } else {
    notificationStore.setNotification({ text: "Error to withdraw", isError: true });
  }
}

function max() {
  amount.value = props.balance;
}
</script>
<template>
  <Teleport to="body">
    <div v-if="open" class="c-modal--backdrop u-flex-line-center">
      <div class="c-modal deposit">
        <div class="u-flex-line-between">
          Withdraw
          <Icon @click="open = false" name="close" iconClass="c-icon"/>
        </div>
        <div class="deposit__field">
          <div class="u-text-secondary u-flex-line-between">
            <div @click="max" class="u-pointer">Balance: {{ Number(props.balance).toFixed(2) }}</div>
          </div>
          <div class="u-flex-line-between">
            <input v-model="amount" type="text" placeholder="0.00">
            <span class="deposit__badge u-flex-line">
              <img src="./../assets/logo-usdc.png">
              <span>USDC</span>
            </span>
          </div>
        </div>
        <button v-if="connection.isConnected && connection.address.value" @click="withdraw" class="c-button c-button--extra-large">Withdraw</button>
        <ConnectWallet v-else className="c-button c-button--extra-large">Connect Wallet</ConnectWallet>
      </div>
    </div>
  </Teleport>
  <button @click="open = true" type="button"><slot></slot></button>
</template>
<style>

</style>