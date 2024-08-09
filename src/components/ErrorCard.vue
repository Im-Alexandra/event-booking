<template>
  <SectionCard>
    <div class="flex flex-col items-center space-y-2 p-2 text-red-500">
      <slot></slot>
      <CustomButton v-if="retry" @click="retry" class="text-black mt-2">Retry now</CustomButton>
    </div>
  </SectionCard>
</template>
<script setup>
import SectionCard from '@/components/SectionCard.vue';
import CustomButton from '@/components/CustomButton.vue';

defineProps({
  retry: {
    type: Function,
    required: false
  }
});
</script>
