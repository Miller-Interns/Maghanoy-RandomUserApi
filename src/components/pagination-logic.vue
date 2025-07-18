<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { userInfoStore } from '@/stores/info-store';
import { usePagination } from '@/composables/pagination';



const infoStore = userInfoStore();
const { userList, isLoading, error, selectedUser } = storeToRefs(infoStore);
const { selectUser } = infoStore;

const {
    currentPage,
    totalPages,
    paginatedList,
    goToPage,
    nextPage,
    prevPage,
    resetToFirstPage,
} = usePagination(userList);

watch(userList, () => {
    // When the list changes, call the composable's reset function.
    resetToFirstPage();
});
</script>

<template>
    <div class="gallery-and-pagination">
        <div class="gallery">
            <!-- Status Messages -->
            <div v-if="isLoading" class="status-message">Loading...</div>
            <div v-if="error" class="status-message error">{{ error }}</div>

            <div v-if="!isLoading && userList.length > 0" class="gallery-grid">
                <div v-for="user in paginatedList" :key="user.login.uuid" class="picture-card"
                    :class="{ selected: selectedUser && selectedUser.login.uuid === user.login.uuid }"
                    @click="selectUser(user)">
                    <img :src="user.picture.large" :alt="`Photo of ${user.name.first}`" />
                    <p class="user-name">{{ user.name.first }} {{ user.name.last }}</p>
                </div>
            </div>
            <div v-else-if="!isLoading && userList.length == 0" class="status-message">
                No users to display. Try fetching some!
            </div>
        </div>


        <div class='paginationControl'>
            <nav v-if="!isLoading && userList.length > 0 && totalPages > 1" class="pagination-controls">
                <button @click="prevPage" :disabled="currentPage === 1">« Prev</button>
                <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                    :class="{ active: currentPage === page }">{{ page }}</button>
                <button @click="nextPage" :disabled="currentPage === totalPages">Next »</button>
            </nav>

        </div>


    </div>
</template>
<style>
.gallery-and-pagination {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;

}

.gallery {
    flex-grow: 1;
    overflow-y: auto;
    padding-right: 1rem;

}

.gallery-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    padding-top: 1rem;
}

.picture-card {
    border: 4px solid transparent;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    text-align: center;
    background-color: white;
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
    cursor: pointer;
}

.picture-card:hover {
    transform: scale(1.05) rotate(1deg);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.picture-card.selected {
    border-color: var(--highlight-color, #8b4513);
    transform: scale(1.08);
    box-shadow: 0 10px 20px rgba(139, 69, 19, 0.4);
}

.picture-card img {
    display: block;
    width: 128px;
    height: 128px;
    object-fit: cover;
}

.user-name {
    margin: 0;
    padding: 0.5rem;
    font-size: 0.9em;
    color: #333;
    background-color: #f9f9f9;
}




.paginatioControl button {
    padding: 8px 16px;
    border: 1px solid #c9b7a5;
    background-color: #fff;
    color: #3d352a;
    border-radius: 5px;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.9rem;
    transition: all 0.2s ease-in-out;
}

.paginatioControl button:hover:not(:disabled) {
    background-color: #f5f0e8;
    border-color: var(--highlight-color, #8b4513);
}

.paginatioControl button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.paginatioControl button.active {
    background-color: var(--highlight-color, #8b4513);
    border-color: var(--cover-color, #6a360f);
    color: white;
    font-weight: bold;
}


.gallery::-webkit-scrollbar {
    width: 10px;
}

.gallery::-webkit-scrollbar-track {
    background: transparent;
}

.gallery::-webkit-scrollbar-thumb {
    background-color: #c9b7a5;
    border-radius: 20px;
    border: 2px solid var(--page-color, #fdfaf3);
}

.gallery::-webkit-scrollbar-thumb:hover {
    background-color: #b8a591;
}
</style>
