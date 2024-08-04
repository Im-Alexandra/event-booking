<template>
  <button
    @click="$emit('click')"
    :class="['text-xs font-medium rounded-full px-4 py-1', variants[variant] ?? variants.default]"
  >
    <slot>Custom btn</slot>
  </button>
</template>

<script setup>
const variants = {
  default: 'border border-gray-200 enabled:hover:bg-gray-100',
  danger: 'bg-red-200 enabled:hover:bg-red-300',
  success: 'bg-green-200 enabled:hover:bg-green-300'
};

defineProps({
  variant: {
    type: String,
    default: 'default'
  }
});
defineEmits(['click']);
</script>

<style scoped></style>
