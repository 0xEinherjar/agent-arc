<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useDisconnect } from "@wagmi/vue";
import { useUserStore } from "../store/user.js";
import { Logo } from ".";
const { user } = storeToRefs(useUserStore());
const userGateway = inject("userGateway");
const router = useRouter();
const { disconnect } = useDisconnect();

async function logout() {
  const { status } = await userGateway.logout();
  if (status == 200) router.push({ name: "login" });
  disconnect();
}

function truncateAddress(address) {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
}

</script>
<template>
  <header v-if="user" class="l-header u-flex-line-between">
    <Logo />
    <div class="l-header__user u-flex-line-center c-dropdown">
      <img class="l-header__user-avatar" :src="user.twitterAvatar">
      {{ user.twitterUsername }}
      <div class="c-dropdown__list">
        <div @click="logout">Logout</div>
      </div>
    </div>
  </header>
</template>
<style>
  .l-header__user {
    height: 52px;
    gap: 8px;
    padding-inline: 10px 16px;
    border-radius: 40px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    font-size: var(--step--1);
    cursor: pointer;
    background-color: var(--bg-color-secondary);
  }
  .l-header__user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
  @media (width < 600px) {
    .l-header__user {
      height: 40px;
      padding-inline: 8px 12px;
      font-size: var(--step--2);
    }
    .l-header__user-avatar {
      width: 24px;
      height: 24px;
    }
  }
</style>
