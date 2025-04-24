<script setup>
import { useRouter } from 'vue-router'
import { inject, defineProps } from "vue";

const props = defineProps(['event'])
const router = useRouter()

const GStore = inject('GStore')

const register = () => {
  // If registered then redirect to event details
  GStore.flashMessage = 'You successfully registered for ' + props.event.title
  setTimeout(() => {
    GStore.flashMessage = null
  }, 3000)
  router.push({
    name: 'event-details',
    id: props.event.id,
  })
}
</script>
<template>
  <p>Regstration form here</p>
  <button @click="register">Register Me!</button>
</template>