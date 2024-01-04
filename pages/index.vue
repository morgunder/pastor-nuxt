<script setup lang="ts">
const host = useRequestURL().host
const isD1 = host.includes('pages.dev')

const { loggedIn } = useUserSession()
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold leading-6">
        Pastor Hal
      </h3>
      <UButton
        v-if="!loggedIn"
        to="/api/auth/github"
        icon="i-simple-icons-github"
        label="Login with GitHub"
        color="black"
        external
      />
      <UButton
        v-else
        to="/list"
        icon="i-heroicons-list-bullet"
        label="Prayer List"
        color="black"
      />
    </template>
    <p>
      This project is an attempt to raise the collective level of prayer effectiveness through social interactions and generative AI.
    </p>
    <hr class="dark:border-gray-700">
    <p class="text-sm text-gray-700 dark:text-gray-300 italic">
      No personal informations regarding your GitHub account are stored in database.<br>
      We store only the prayers created linked with your GitHub ID.
    </p>
  </UCard>
</template>
