<script setup>
import Hero from '@/components/Hero.vue';
import Herocards from '@/components/Herocards.vue';
import JobListings from '@/components/JobListings.vue';
</script>

<template>
  <Hero/>
  <Herocards/>
  <JobListings :limit="3" :showButton="true"/>
</template>