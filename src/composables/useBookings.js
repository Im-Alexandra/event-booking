import { ref } from 'vue';

const bookings = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchBookings = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch('http://localhost:3001/bookings');
    bookings.value = await response.json();
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
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

export default function useBookings() {
  return {
    bookings,
    loading,
    error,
    fetchBookings,
    handleCancelBooking,
    handleRegistration
  };
}
