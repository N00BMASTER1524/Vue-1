<script setup>
import { RouterLink } from 'vue-router';
import JobListing from './JobListing.vue';
import { reactive, defineProps, onMounted } from 'vue';
import PalseLoader from 'vue-spinner/src/PulseLoader.vue'
import axios from 'axios';

const props = defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false
  }
});

const state = reactive({
  jobs:[],
  isLoading: true
});
onMounted(async () => {
  try {
    const respose = await axios.get('/api/jobs');
    state.jobs = respose.data;

  } catch (error) {
    console.error('Error fetching jobs', error);
  } finally {
    state.isLoading = false
  }
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Job
      </h2>
      <!-- show loading spinner while loading is true -->
       <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PalseLoader/>
       </div>
      
      <!-- show job listing when done loading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing
          v-for="job in state.jobs.slice(0, props.limit || state.jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>
    </div>
  </section>

  <section v-if="props.showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>
