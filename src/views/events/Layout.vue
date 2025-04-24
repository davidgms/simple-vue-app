<script setup>
import { ref, onMounted, defineProps } from 'vue'
import EventService from '@/services/EventService.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    id: {
        required: true,
    },
})
const event = ref(null)

onMounted(() => {
    EventService.getEvent(props.id)
        .then((response) => {
            event.value = response.data
        })
        .catch((error) => {
            if (error.reponse && error.response.status == 404) {
                router.push({
                    name: '404-resource',
                    params: {
                        resource: 'event',
                    }
                })
            } else {
                router.push({
                    name: 'network-error'
                })
            }
            console.log(error)
        })
})
</script>

<template>
  <div v-if="event" class="event-details">
    <div id="nav">
      <router-link :to="{ name: 'event-details'}"
        >Details</router-link
      >
      |
      <router-link :to="{ name: 'event-register'}"
        >Register</router-link
      >
      |
      <router-link :to="{ name: 'event-edit'}"
        >Edit</router-link
      >
    </div>
    <router-view :event="event"></router-view>
  </div>
</template>