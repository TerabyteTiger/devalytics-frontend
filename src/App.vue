<template>
  <div id="app" class="flex flex-col h-screen">
    <nav class="bg-gray-800 text-left p-3">
      <router-link to="/" class="text-2xl text-green-200">
        Devalytics
      </router-link>
    </nav>
    <main class="bg-gray-600 flex-grow">
      <router-view />
    </main>
  </div>
</template>
