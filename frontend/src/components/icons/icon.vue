<script setup>
import { shallowRef } from "vue";
import * as Icon from "./";
const props = defineProps(["iconClass", "name"]);
const compRef = shallowRef({
  close: Icon.Close,
  copy: Icon.Copy,
});
</script>
<!-- prettier-ignore -->
<template>
  <svg :class="props.iconClass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" role="img">
    <component :is="compRef[props.name]"/>
  </svg>
</template>
