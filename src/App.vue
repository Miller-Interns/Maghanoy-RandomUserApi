<template>

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>

  <body>

    <!--
      This container is used for positioning the book and its cover.
      The `perspective` property in the CSS can be used for 3D transforms.
    -->
    <div class="book-container">

      <!--
          This div acts as the hard cover of the book, sitting behind the pages.
          It's slightly larger than the pages to create a border effect.
        -->
      <div class="book-cover">

        <!--
              This is the main container for the two visible pages.
              It uses flexbox to place the pages side-by-side.
            -->
        <div class="book">

          <!-- The Left Page -->
          <div class="page left-page">
            <h2>JUST SEARCH!</h2>
            <input type='number' v-model='numPhotos' placeholder='Number of Photos'>
            <button @click='userPerPage' class='submit' value="submit">

            </button>
          </div>

          <!-- The Right Page -->
          <div class="page right-page">
            <pre v-if="userArray">{{ JSON.stringify(userArray, null, 2) }}</pre>
          </div>

        </div> <!-- end .book -->
      </div> <!-- end .book-cover -->
    </div> <!-- end .book-container -->

  </body>



</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { RouteName } from '@/enum/router-name'
//import { type UserInfo } from '@/interface/detailed-info'
const numPhotos = ref();


const userPerPage = async () => {
  //fetch number of users
  const response = await fetch("https://randomuser.me/api/?results=" + numPhotos.value);
  //get the actual data array (no return 'Promise')
  const data = await response.json();
  //get the results array
  const userArray = data.results
  console.table(userArray)
}




// 1. Get the router instance
const router = useRouter()

// 2. Use the onMounted lifecycle hook
onMounted(() => {

  router.push({ name: RouteName.PROFILEDETAILS })


})
</script>




<style>
:root {
  --page-color: #fdfaf3;
  --cover-color: #a0522d;
  /* A sienna/leather color */
  --text-color: #333;
  --shadow-color: rgba(0, 0, 0, 0.4);
}

body {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
  background-color: #3d352a;
  /* Darker wood background */
  font-family: 'Garamond', 'Georgia', serif;
  margin: 0;
  box-sizing: border-box;
}

.book-container {
  perspective: 1000px;
  width: 100%;
  /* Needed for 3D effects if you add them */
}

.book-cover {
  /* Use padding to create the cover border instead of fixed dimensions */
  padding: 20px;
  background-color: var(--cover-color);
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.book {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  /* Stacks on top of the cover */
}

.page {
  flex: 1;
  padding: 2em 3em;
  background-color: var(--page-color);
  box-sizing: border-box;
  overflow-y: auto;
  /* Allow scrolling if content is long */
  position: relative;
  /* Needed for the pseudo-element curl */
}

.left-page {
  box-shadow: inset -7px 0px 15px -7px var(--shadow-color);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.right-page {
  box-shadow: inset 7px 0px 15px -7px var(--shadow-color);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

/* Page Curl Effect */
.page::after {
  content: '';
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--page-color) 50%, #ccc 50%, #999);
  box-shadow: -5px 5px 15px var(--shadow-color);
  transform: rotate(-25deg) skew(-20deg);
  transition: all 0.3s ease;
}

.page:hover::after {
  transform: rotate(-15deg) skew(-10deg);
  box-shadow: -10px 10px 25px var(--shadow-color);
}

/* Typography */
h2 {
  color: var(--text-color);
  border-bottom: 2px solid var(--cover-color);
  padding-bottom: 10px;
  margin-top: 0;
}

p {
  line-height: 1.7;
  color: #555;
  font-size: 1.1em;
}

/* Scrollbar styling for a better look */
.page::-webkit-scrollbar {
  width: 8px;
}

.page::-webkit-scrollbar-track {
  background: transparent;
}

.page::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 20px;
  border: 2px solid var(--page-color);
}
</style>
