<template>
  <SectionCard>
    <div class="py-2 flex items-center gap-2">
      <span>{{ title }}</span>
      <div><component :is="icon" :class="{ 'animate-spin': pending }" /></div>
      <CustomButton class="ms-auto" variant="danger" @click="$emit('cancel')"
        >Cancel 💀</CustomButton
      >
    </div>
  </SectionCard>
</template>
<script setup>
import SectionCard from '@/components/SectionCard.vue';
import CustomButton from '@/components/CustomButton.vue';
import { LoaderCircle, Check } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps({
  title: String,
  status: String
});

const pending = computed(() => props.status === 'pending');
const icon = computed(() => (pending.value ? LoaderCircle : Check));

defineEmits(['cancel']);
</script>
<style></style>
