<template>
  <RoundedCard>
    <h3 v-if="$slots.header" class="py-1 px-4 font-medium text-xl border-b border-gray-200">
      <slot name="header"></slot>
    </h3>

    <div
      v-if="$slots.default"
      :class="{ 'py-1 px-4': true, 'border-b border-gray-200': $slots.footer }"
    >
      <slot name="default"></slot>
    </div>

    <div v-if="$slots.footer" class="py-1 pb-2 px-4">
      <slot name="footer"></slot>
    </div>
  </RoundedCard>
</template>
<script setup>
import RoundedCard from '@/components/RoundedCard.vue';
</script>
<style scoped></style>
