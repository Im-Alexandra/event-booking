<template>
  <template v-if="error">
    <ErrorCard :retry="fetchBookings"
      >Could not load bookings at the moment. Please try again.</ErrorCard
    >
  </template>
  <template v-else>
    <section class="flex gap-4 flex-col">
      <template v-if="!loading">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
          :status="booking.status"
          @cancel="handleCancelBooking(booking.id)"
        />
      </template>
      <template v-else>
        <LoadingBookingItem v-for="i in 1" :key="i"></LoadingBookingItem>
      </template>
    </section>
  </template>
</template>
<script setup>
import BookingItem from '@/components/BookingItem.vue';
import LoadingBookingItem from '@/components/LoadingBookingItem.vue';
import ErrorCard from '@/components/ErrorCard.vue';
import { onMounted } from 'vue';
import useBookings from '@/composables/useBookings';

const { bookings, loading, error, fetchBookings, handleCancelBooking } = useBookings();

onMounted(() => {
  fetchBookings();
});
</script>
