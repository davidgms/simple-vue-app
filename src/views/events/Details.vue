<script setup>
const props = defineProps(["event"])
</script>

<template>
  <div v-if="event" class="event-details">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>