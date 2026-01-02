<script setup>
import { onMounted, ref, watch } from "vue";
import { useSendTransaction, useConnection } from "@wagmi/vue";
import { parseUnits  } from "viem"
import { storeToRefs } from "pinia";
import { Icon, ConnectWallet } from ".";
import { useUserStore } from "../store/user.js";
import { usePublicClient } from "../composables/usePublicClient.js";
import { useNotificationStore } from "../store/notification.js";
import { useGetBalance } from "../composables/useGetBalance.js";
const notificationStore = useNotificationStore();
const { getBalance } = useGetBalance();
const connection = useConnection()
const { client } = usePublicClient();
const { user } = storeToRefs(useUserStore());
const { mutate, isSuccess, isError } = useSendTransaction();
const amount = ref("");
const balance = ref(0);
const open = ref(false);

async function deposit() {
  mutate({
    to: user.value.address,
    value: parseUnits(amount.value, client.chain.nativeCurrency.decimals)
  });
}

watch(isSuccess, async (newIsSuccess) => {
  if (newIsSuccess) {
    notificationStore.setNotification({ text: "Success to deposit", isError: false })
    open.value = false;
  }
});

watch(isError, async (newIsError) => {
  if (newIsError) {
    notificationStore.setNotification({ text: "Error to deposit", isError: true })
  }
});

watch(connection.address, async () => {
  if (connection.isConnected) {
    balance.value = await getBalance(connection.address.value);
  }
})

function max() {
  amount.value = balance.value;
}

onMounted(async() => {
  if (connection.isConnected && connection.address.value) {    
    balance.value = await getBalance(connection.address.value);    
  }
})
</script>
<template>
  <Teleport to="body">
    <div v-if="open" class="c-modal--backdrop u-flex-line-center">
      <div class="c-modal deposit">
        <div class="u-flex-line-between">
          Deposit 
          <Icon @click="open = false" name="close" iconClass="c-icon"/>
        </div>
        <div class="deposit__field">
          <div class="u-text-secondary u-flex-line-between">
            <div @click="max" class="u-pointer">Balance: {{ Number(balance).toFixed(2) }}</div>
          </div>
          <div class="u-flex-line-between">
            <input v-model="amount" type="text" placeholder="0.00">
            <span class="deposit__badge u-flex-line">
              <img src="./../assets/logo-usdc.png">
              <span>USDC</span>
            </span>
          </div>
        </div>
        <button v-if="connection.isConnected && connection.address.value" @click="deposit" class="c-button c-button--extra-large">Deposit</button>
        <ConnectWallet v-else className="c-button c-button--extra-large">Connect Wallet</ConnectWallet>
      </div>
    </div>
  </Teleport>
  <button @click="open = true" type="button"><slot></slot></button>
</template>
<style>
.deposit__field {
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, .12);
  padding: 16px;
  display: grid;
  gap: 16px;
}
.deposit__badge {
  font-size: var(--step--2);
  font-weight: 500;
  gap: 6px;
  background-color: #4e4f51;
  border-radius: 8px;
  padding: 6px 8px;
}
.deposit__badge img {
  height: 22px;
  width: 22px;
}
.deposit__badge span {
  line-height: 17px;
}
</style>