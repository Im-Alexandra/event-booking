<template>
  <template v-if="error">
    <SectionCard>
      <div class="flex flex-col items-center space-y-2 p-2">
        <span class="text-red-500">Could not load events at the moment. Please try again.</span>
        <CustomButton @click="fetchEvents">Retry now</CustomButton>
      </div>
    </SectionCard>
  </template>
  <template v-else>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <template v-if="!loading">
        <template v-if="events.length">
          <EventCard
            v-for="e in events"
            :key="e.id"
            :title="e.title"
            :date="e.date"
            :description="e.description"
            @register="$emit('register', e)"
          />
        </template>
        <template v-else>
          <span class="col-span-2 text-center text-gray-500">No events to display...</span>
        </template>
      </template>
      <template v-else>
        <LoadingEventCard v-for="i in 4" :key="i"></LoadingEventCard>
      </template>
    </section>
  </template>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import EventCard from '@/components/EventCard.vue';
import LoadingEventCard from '@/components/LoadingEventCard.vue';
import SectionCard from '@/components/SectionCard.vue';
import CustomButton from '@/components/CustomButton.vue';

defineEmits(['register']);

const events = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchEvents = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch('http://localhost:3001/events');
    events.value = await response.json();
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchEvents();
});
</script>
<style scoped></style>
