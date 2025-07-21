import { ref} from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/interface/detailed-info'


export const userInfoStore = defineStore('userInfo', () => {

  const userList = ref<User[]>([])
  const selectedUser = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

   function selectUser(user: User | null) {

    if (selectedUser.value && user && selectedUser.value.login.uuid === user.login.uuid) {
      selectedUser.value = null;
    } else {
      selectedUser.value = user;
    }
  }

  function saveToStorage() {
    try {
      localStorage.setItem('userList', JSON.stringify(userList.value))
      console.log('Saved user list to local storage.')
    } catch (e) {
      console.error('Failed to save to localStorage:', e)
    }
  }
  function loadFromStorage() {
    try {
      const savedList = localStorage.getItem('userList')
      if (savedList) {
        userList.value = JSON.parse(savedList) as User[]
        console.log('Loaded user list from local storage.')
      }
    } catch (e) {
      console.error('Failed to load or parse from localStorage:', e)
      localStorage.removeItem('userList')
    }
  }
  
  async function fetchUsers(userCount: number, gender?: 'female' | 'male') {
    if (!userCount || userCount <= 0) {
      console.log("Fetch count is zero. Clearing user list and localStorage.");
      userList.value = [];
      selectedUser.value = null
      localStorage.removeItem('userList');
      return; 
    }
    
    isLoading.value = true
    error.value = null 

       try {
      let apiUrl = `https://randomuser.me/api/?results=${userCount}`
      if (gender) {
        apiUrl += `&gender=${gender}`
      }
      const response = await fetch(apiUrl)

    

      if (!response.ok) {
        throw new Error(`Network request failed with status: ${response.status}`)
      }

      const data = await response.json() as { results: User[] }
      userList.value = data.results
      saveToStorage()
      
    } catch (e) {
      console.error('Failed to fetch users:', e)
      error.value = 'An unknown error occurred.'
    } finally {
      isLoading.value = false
    }
      
    }

   

  return {
    userList,
    isLoading,
    error, 
    selectedUser,
    fetchUsers, 
    loadFromStorage,
    selectUser
    
    
  }
})