<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { userInfoStore } from '@/stores/info-store';

const infoStore = userInfoStore();
const { selectedUser } = storeToRefs(infoStore);


const fullName = computed(() => {
  if (!selectedUser.value?.name) return '';
  const { title, first, last } = selectedUser.value.name;
  return `${title}. ${first} ${last}`;
});


const formattedLocation = computed(() => {
  if (!selectedUser.value?.location) return 'Location not available.';
  const { street, city, state, country, postcode, coordinates, timezone } = selectedUser.value.location;
  // This filters out any parts that might be missingofrom the data
  return [
    `${street.number} ${street.name}`,
    city,
    state,
    country,
    `(${postcode})`,
    `(${coordinates.latitude} ${coordinates.longitude})`,
    `(${timezone.offset} ${timezone.description})`
  ].filter(Boolean).join(', ');
});





const formattedDob = computed(() => {
  if (!selectedUser.value?.dob) return 'N/A';
  const dob = new Date(selectedUser.value.dob.date);

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return `${dob.toLocaleDateString(undefined, options)} (Age ${selectedUser.value.dob.age})`;
});

const formattedRegisteredDate = computed(() => {
  if (!selectedUser.value?.registered) return 'N/A';
  const registeredDate = new Date(selectedUser.value.registered.date);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return `${registeredDate.toLocaleDateString(undefined, options)} (${selectedUser.value.registered.age} years ago)`;
});


const formattedId = computed(() => {
  if (!selectedUser.value?.id || !selectedUser.value.id.name || !selectedUser.value.id.value) {
    return 'No ID assigned';
  }
  return `${selectedUser.value.id.name}: ${selectedUser.value.id.value}`;
});

</script>

<template>
  <Transition name="fade" mode="out-in">

    <div v-if="selectedUser" class="profile-card" :key="selectedUser.login.uuid">
      <div class="profile-header">
        <img :src="selectedUser.picture.large" class="profile-avatar" :alt="`Photo of ${fullName}`" />
        <div class="profile-title">

          <h1>{{ fullName }}</h1>
          <p class="username">@{{ selectedUser.login.username }}</p>
        </div>
      </div>

      <div class="profile-body">
        <h2>Personal & Contact Details</h2>
        <ul>
          <li><strong>Gender:</strong> <span class="gender">{{ selectedUser.gender }}</span></li>
          <li><strong>Date of Birth:</strong> {{ formattedDob }}</li>
          <li><strong>Nationality:</strong> {{ selectedUser.nat }}</li>
          <li><strong>Contact (Cell):</strong> {{ selectedUser.cell }}</li>
          <li><strong>ID:</strong> {{ formattedId }}</li>
        </ul>

        <h2>Location</h2>
        <ul>
          <li>{{ formattedLocation }}</li>
        </ul>

        <h2>Account Information</h2>
        <ul>
          <li><strong>Registered:</strong> {{ formattedRegisteredDate }}</li>
          <li><strong>UUID:</strong> {{ selectedUser.login.uuid }}</li>
          <li><strong>Username:</strong> {{ selectedUser.login.username }}</li>
          <li><strong>Password:</strong> {{ selectedUser.login.password }}</li>
          <li><strong>Salt:</strong> {{ selectedUser.login.salt }}</li>
          <li><strong>md5:</strong> {{ selectedUser.login.md5 }}</li>
          <li><strong>Sha1:</strong> {{ selectedUser.login.sha1 }}</li>
          <li><strong>Sha256:</strong> {{ selectedUser.login.sha256 }}</li>
        </ul>
      </div>
    </div>

    <!-- Case 2: NO user is selected -->
    <div v-else class="placeholder">
      <p>Click on a profile from the left page to see the details here.</p>
    </div>
  </Transition>
</template>

<style scoped>
.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #888;
  font-style: italic;
  text-align: center;
  padding: 2rem;
}




.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}

.profile-title h1 {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 600;
}

.username {
  margin: 0.25rem 0 0;
  font-size: 1.1rem;
  opacity: 0.8;
  font-family: 'Courier New', Courier, monospace;
}

/* Body styling */
.profile-body {
  padding: 1.5rem 2rem 2rem;
}

.profile-body h2 {
  font-size: 1.4rem;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
  margin: 1.5rem 0 1rem 0;
}

.profile-body h2:first-of-type {
  margin-top: 0;
}

.profile-body ul {
  list-style: none;
  padding: 0;
}

.profile-body li {
  padding: 0.4rem 0;
  display: flex;
}

.profile-body li strong {
  color: #555;
  min-width: 150px;

}

.gender {
  text-transform: capitalize;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>