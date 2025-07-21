<template>

  <div class="book-container">
    <div class="book-cover">
      <div class="book">

        <div class="page left-page">
          <h2>JUST SEARCH!</h2>

          <!-- CONTROL PANEL -->
          <div class="controls">
            <input type='number' v-model='numPhotosToFetch' placeholder='Number of Users' />
            <button @click="handleFetch(numPhotosToFetch)" :disabled="isLoading">
              Fetch Random
            </button>
            <button @click="handleFetch(numPhotosToFetch, 'female')" :disabled="isLoading">
              Fetch Females
            </button>
            <button @click="handleFetch(numPhotosToFetch, 'male')" :disabled="isLoading">
              Fetch Males
            </button>
          </div>

          <hr style="border-color: var(--highlight-color); border-style: dashed; margin: 2rem 0;" />

          <PaginationLogic />
        </div>

        <!-- The Right Page -->
        <div class="page right-page">
          <h2>Details</h2>
          <p>
            <profileDetails />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { userInfoStore } from './stores/info-store'
import PaginationLogic from '@/components/pagination-logic.vue'
import profileDetails from './views/profile-details.vue'



const infoStore = userInfoStore()
const { isLoading, userList } = storeToRefs(infoStore)
const numPhotosToFetch = ref(0)
if (numPhotosToFetch.value === 0) {
  userList.value = [];
  localStorage.removeItem('userList');
}

function handleFetch(count: number, gender?: 'female' | 'male') {
  infoStore.fetchUsers(count, gender)

}


onMounted(() => {

  infoStore.loadFromStorage()
  if (userList.value.length === 0) {
    handleFetch(numPhotosToFetch.value)
  }

})
</script>



<style>
:root {
  --page-color: #fdfaf3;
  --cover-color: #6a360f;
  --text-color: #3d352a;
  --shadow-color: rgba(0, 0, 0, 0.5);
  --spine-shadow-color: rgba(0, 0, 0, 0.4);
  --highlight-color: #8b4513;

}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('https://www.transparenttextures.com/patterns/wood-grain.png');
  background-color: #3d352a;
  font-family: 'Garamond', 'Georgia', serif;
  margin: 0;
  padding: 2rem;
  box-sizing: border-box;
}


.book-container {
  perspective: 1500px;
  max-width: 1400px;
  width: 100vw;

}


.book-cover {
  padding: 25px;
  background-image: url('https://www.transparenttextures.com/patterns/leather.png');
  background-color: var(--cover-color);
  border-radius: 10px 15px 15px 10px;
  box-shadow: 0 20px 40px var(--shadow-color), inset 0 0 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.5s ease;
  width: 82vw;
}

.book {
  display: flex;
  height: 100vh;
  position: relative;
  width: 80vw;
}

.page {
  flex: 1;
  padding: 2em 3em;
  background-image: url('https://www.transparenttextures.com/patterns/paper.png');
  background-color: var(--page-color);
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
}

.left-page {
  box-shadow: inset -10px 0px 18px -10px var(--spine-shadow-color);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  display: flex;
  flex-direction: column;
}

.right-page {
  box-shadow: inset 10px 0px 18px -10px var(--spine-shadow-color);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

}

.page::after {
  content: '';
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;

}


h2 {
  color: var(--text-color);
  border-bottom: 2px solid var(--highlight-color);
  padding-bottom: 10px;
  margin-top: 0;
  font-weight: 600;
  letter-spacing: 1px;
}

p {
  line-height: 1.7;
  color: #555;
  font-size: 1.1em;
}

.controls {
  margin-top: 10px;
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}


input[type="number"] {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #c9b7a5;
  background-color: #fdfdfb;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  width: 150px;
  transition: box-shadow 0.3s, border-color 0.3s;
}

input[type="number"]:focus {
  outline: none;
  border-color: var(--highlight-color);
  box-shadow: 0 0 8px rgba(139, 69, 19, 0.4);
}

button {
  padding: 10px 20px;
  border: 1px solid var(--cover-color);
  background-color: var(--highlight-color);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

button:hover:not(:disabled) {
  background-color: var(--cover-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

button:disabled {
  background-color: #b0a091;
  border-color: #9c8c7c;
  cursor: not-allowed;
  box-shadow: none;
}

.status-message {
  padding: 1rem;
  background: rgba(224, 215, 198, 0.5);
  border-radius: 4px;
  text-align: center;
  margin-bottom: 1rem;
  border: 1px dashed var(--highlight-color);
}

.status-message.error {
  background: rgba(255, 221, 221, 0.7);
  color: #d8000c;
  border-style: solid;
}
</style>
