<template>
  <main class="container mx-auto my-8 space-y-4 px-2 pb-8">
    <h1 class="text-4xl">Event Booking App</h1>

    <h2 class="text-2xl">All Events</h2>
    <EventList @register="handleRegistration($event)" />

    <h2 class="text-2xl">Your Bookings</h2>
    <section class="flex gap-4 flex-col">
      <template v-if="!bookingsLoading">
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
  </main>
</template>

<script setup>
import EventList from '@/components/EventList.vue';
import BookingItem from '@/components/BookingItem.vue';
import LoadingBookingItem from '@/components/LoadingBookingItem.vue';
import { ref, onMounted } from 'vue';

const bookings = ref([]);
const bookingsLoading = ref(false);

const fetchBookings = async () => {
  bookingsLoading.value = true;
  try {
    const response = await fetch('http://localhost:3001/bookings');
    bookings.value = await response.json();
  } finally {
    bookingsLoading.value = false;
  }
};

const handleRegistration = async (eventData) => {
  if (bookings.value.some((booking) => booking.eventId === eventData.id && booking.userId === 1)) {
    alert('You are already registered for this event');
    return;
  }

  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: eventData.id,
    eventTitle: eventData.title,
    status: 'pending'
  };

  bookings.value.push(newBooking);

  try {
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newBooking,
        status: 'confirmed'
      })
    });

    if (response.ok) {
      const index = findBookingIndexById(newBooking.id);
      bookings.value[index] = await response.json();
    } else {
      throw new Error('Failed to confirm the booking');
    }
  } catch (e) {
    console.error('Failed to register for event: ', e);
    bookings.value = bookings.value.filter((b) => b.id !== newBooking.id);
  }
};

const handleCancelBooking = async (bookingId) => {
  const index = findBookingIndexById(bookingId);
  const originalBooking = bookings.value[index];

  bookings.value.splice(index, 1);
  try {
    const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Booking couldnt be cancelled.');
    }
    ('');
  } catch (e) {
    console.error(`Failed to cancel booking: `, e);
    bookings.value.splice(index, 0, originalBooking);
  }
};

const findBookingIndexById = (id) => {
  return bookings.value.findIndex((b) => b.id === id);
};

onMounted(() => {
  fetchBookings();
});
</script>
