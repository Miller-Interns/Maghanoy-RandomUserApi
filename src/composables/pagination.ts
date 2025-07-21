import { ref, computed, type Ref } from 'vue'
import type { User } from '@/interface/detailed-info'



export function usePagination(masterList: Ref<User[]>) {

  const currentPage = ref(1)
  const itemsPerPage = ref(10) 

  const totalPages = computed(() => {
    if (!masterList.value || masterList.value.length === 0) return 1
    
    return Math.ceil(masterList.value.length / itemsPerPage.value)
  })


  const paginatedList = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value
    const endIndex = startIndex + itemsPerPage.value
    return masterList.value.slice(startIndex, endIndex)
  })



  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

   function resetToFirstPage(){
    currentPage.value=1
  }
  
 
  return {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedList,
    goToPage,
    nextPage,
    prevPage,
    resetToFirstPage
  }
}