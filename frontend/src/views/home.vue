<script setup>
import { onMounted, ref, inject, computed } from "vue";
import { useRouter } from "vue-router";
import { HeaderMain, Deposit, Copy, Withdraw, ExportPrivateKey, ImportPrivateKey } from "../components/";
import { useGetBalance } from "../composables/useGetBalance.js";
import { useUserStore } from "../store/user.js";
const userGateway = inject("userGateway");
const userStore = useUserStore();
const { getBalance } = useGetBalance();

const router = useRouter();
const user = ref(null);
const balance = ref(0);

const formatBalance = computed(() => {
  return `$ ${String(Number(balance.value).toFixed(2)).replace(/(\.\d{2})$/, '<span class="u-text-secondary">$1</span>')}`;
})

onMounted(async () => {
  const { status, data } = await userGateway.load();
  if (status == 200) {
    userStore.setUser(data);
    user.value = data;
    balance.value = await getBalance(data.address);
  } else {
    router.push({ name: "login" });
  }
});
</script>

<template>
  <HeaderMain />
  <main class="l-main">
    <div class="u-flex-line-between">
      <div class="panel-balance">
        <div class="u-text-secondary">Your Balance in USDC</div>
        <div v-html="formatBalance"></div>
      </div>
      <div class="cta">
        <Deposit>Deposit USDC</Deposit>
        <Withdraw :balance="balance">Withdraw USDC</Withdraw>
      </div>
      <!-- <div class="cta">
        <ImportPrivateKey>Import Private Key</ImportPrivateKey>
        <ExportPrivateKey>Export Private Key</ExportPrivateKey>
      </div> -->
    </div>
    <Copy v-if="user" :address="user.address"/>
  </main>
</template>
<style>
.panel-balance {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: var(--bg-color-secondary);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgb(255 255 255 / 12%);
  flex-grow: 1;
}
.panel-balance > div:first-child {
  font-size: var(--step--1);
  line-height: 100%;
}
.panel-balance > div:last-child {
  font-size: 48px;
  line-height: 100%;
}
.cta {
  display: flex;
  flex-direction: column;
  gap: 17px;
  width: min(270px, 100%);
  height: 100%;
  margin-left: 24px;
  width: min-content;
}
.cta > button {
  background-color: var(--bg-color-secondary);
  padding-inline: 32px;
  height: 54px;
  border-radius: 12px;
  border: 1px solid rgb(255 255 255 / 12%);
  font-size: var(--step--1);
  white-space: nowrap;
}
@media (width < 600px) {
  .l-main > div:first-child {
    flex-direction: column;
    align-items: normal;
    gap: 24px;
  }
  .panel-balance {
    padding: 16px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgb(255 255 255 / 12%);
  }
  .panel-balance > div:last-child {
    font-size: 32px;
  }
  .cta {
    margin-left: 0;
    flex-direction: row;
    width: 100%;
  }
  .cta > button {
    flex-grow: 1;
    border-radius: 8px;
  }
}
</style>