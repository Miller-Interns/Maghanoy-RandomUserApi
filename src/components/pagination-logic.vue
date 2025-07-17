<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { userInfoStore } from '@/stores/info-store';
import { usePagination } from '@/composables/pagination'; // Corrected path


const infoStore = userInfoStore();
const { userList, isLoading, error } = storeToRefs(infoStore);

const {
    currentPage,
    totalPages,
    paginatedList,
    goToPage,
    nextPage,
    prevPage,
    resetToFirstPage
} = usePagination(userList);

watch(userList, () => {
    // When the list changes, call the composable's reset function.
    resetToFirstPage();
});
</script>

<template>
    <div class="gallery-and-pagination">
        <!-- Status Messages -->
        <div v-if="isLoading" class="status-message">Loading...</div>
        <div v-if="error" class="status-message error">{{ error }}</div>

        <div v-if="!isLoading && userList.length > 0" class="gallery-grid">
            <div v-for="user in paginatedList" :key="user.login.uuid" class="picture-card">
                <img :src="user.picture.large" :alt="`Photo of ${user.name.first}`" />
                <p class="user-name">{{ user.name.first }} {{ user.name.last }}</p>
            </div>
        </div>
        <div v-else-if="!isLoading && userList.length == 0" class="status-message">
            No users to display. Try fetching some!
        </div>

        <nav v-if="!isLoading && userList.length > 0 && totalPages > 1" class="pagination-controls">
            <button @click="prevPage" :disabled="currentPage === 1">« Prev</button>
            <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                :class="{ active: currentPage === page }">{{ page }}</button>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next »</button>
        </nav>
    </div>
</template>
