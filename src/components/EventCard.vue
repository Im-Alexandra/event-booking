<template>
  <SectionCard>
    <template #header>{{ title }}</template>
    <template #default>{{ date }}</template>
    <template #footer>
      <div class="space-y-4">
        <p>{{ description }}</p>
        <div class="flex justify-end">
          <CustomButton @click="$emit('register')"> Register 👋🏻 </CustomButton>
        </div>
      </div>
    </template>
  </SectionCard>
</template>
<script setup>
import CustomButton from '@/components/CustomButton.vue';
import SectionCard from '@/components/SectionCard.vue';

defineProps({
  title: String,
  date: String,
  description: String
});

defineEmits(['register']);
</script>
<style lang=""></style>
