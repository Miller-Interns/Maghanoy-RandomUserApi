import { ref,watch} from 'vue'
import { defineStore } from 'pinia'
import {type User} from '@/interface/detailed-info'


  export const userInfoStore=defineStore('userInfo',()=>{

  //reactive properties to hold data
  const userList=ref<User[]>([])
  const isLoading=ref(false)
  const error=ref<string | null>(null);

  async function fetchUsers(userCount:number){
    
   //fetch number of users
  const response = await fetch("https://randomuser.me/api/?results=" + userCount);
  //get the actual data array (no return 'Promise')
  const data = await response.json() as {results: User[]}
  //get the results array and save to pinia

  console.log(data.results)
  userList.value=data.results
  }

  return{
    userList,
    fetchUsers
  }

  })
  
  
    
    
