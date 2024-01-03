<script setup>
definePageMeta({
  middleware: 'auth'
})
const loading = ref(false)

const nameInput = ref(null)
const titleInput = ref(null)

const name = ref('')
const title = ref('')

const toast = useToast()
const { user, clear } = useUserSession()
const { data: requests } = await useFetch('/api/requests')

async function addrequest () {
  if (!title.value.trim()) { return }
  if (!name.value.trim()) { return }

  loading.value = true

  try {
    const request = await $fetch('/api/requests', {
      method: 'POST',
      body: {
        name: name.value,
        title: title.value,
        completed: 0
      }
    })
    requests.value.push(request)
    toast.add({ title: `Now praying for "${request.title}" about "${request.title}".` })
    newrequest.value = ''
    nextTick(() => {
      newrequestInput.value?.input?.focus()
    })
  } catch (err) {
    if (err.data?.data?.issues) {
      const title = err.data.data.issues.map(issue => issue.message).join('\n')
      toast.add({ title, color: 'red' })
    }
  }
  loading.value = false
}

async function toggleRequest (request) {
  request.completed = Number(!request.completed)
  await useFetch(`/api/requests/${request.id}`, {
    method: 'PATCH',
    body: {
      completed: request.completed
    }
  })
}

async function togglePrayed (request) {
  request.completed = Number(!request.completed)
  await useFetch(`/api/requests/${request.id}`, {
    method: 'PATCH',
    body: {
      completed: request.completed
    }
  })
}

async function generatePrayer (request) {
  // request.completed = Number(!request.completed)
  // await useFetch(`/api/requests/${request.id}`, {
  //   method: 'PATCH',
  //   body: {
  //     completed: request.completed
  //   }
  // })
}

async function generateScripture (request) {
  // request.completed = Number(!request.completed)
  // await useFetch(`/api/requests/${request.id}`, {
  //   method: 'PATCH',
  //   body: {
  //     completed: request.completed
  //   }
  // })
}

async function archiveRequest (request) {
  await useFetch(`/api/requests/${request.id}`, { method: 'DELETE' })
  requests.value = requests.value.filter(t => t.id !== request.id)
  toast.add({ title: `Prayer "${request.name}" about "${request.title}" deleted.` })
}

const items = [[{
  label: 'Logout',
  icon: 'i-heroicons-arrow-left-on-rectangle',
  click: clear
}]]
</script>

<template>
  <UCard @submit.prevent="addrequest">
    <template #header>
      <h3 class="text-lg font-semibold leading-6">
        <NuxtLink to="/">
          My Prayer List
        </NuxtLink>
      </h3>

      <UDropdown v-if="user" :items="items">
        <UButton color="white" trailing-icon="i-heroicons-chevron-down-20-solid">
          <UAvatar :src="`https://github.com/${user.login}.png`" :alt="user.login" size="3xs" />
          {{ user.login }}
        </UButton>
      </UDropdown>
    </template>

    <div class="flex items-center gap-2">
      <UInput
        ref="nameInput"
        v-model="name"
        name="name"
        :disabled="loading"
        class="flex-1"
        placeholder="Pray for Who?"
        autocomplete="off"
        autofocus
        :ui="{ wrapper: 'flex-1' }"
      />
      <UInput
        ref="titleInput"
        v-model="title"
        name="title"
        :disabled="loading"
        class="flex-1"
        placeholder="Pray for What?"
        autocomplete="off"
        autofocus
        :ui="{ wrapper: 'flex-1' }"
      />

      <UButton type="submit" icon="i-heroicons-plus-20-solid" :loading="loading" :disabled="name.trim().length === 0 || title.trim().length === 0" />
    </div>

    <ul class="divide-y divide-gray-200 dark:divide-gray-800">
      <li
        v-for="request of requests"
        :key="request.id"
        class="flex items-center gap-4 py-2"
      >
        <span class="flex-1 font-medium" :class="[request.completed ? 'line-through text-gray-500' : '']">{{ request.name }} about {{ request.title }}</span>


        <UTooltip text="Mark Prayed">
          <UToggle
            on-icon="i-guidance-praying-room"
            off-icon="i-guidance-praying-room"
            :model-value="Boolean(request.completed)"
            @update:model-value="togglePrayed(request)"
            />
        </UTooltip>

        <UTooltip text="Generate Prayer">
          <UButton
            color="blue"
            variant="soft"
            size="2xs"
            icon="i-game-icons-artificial-intelligence"
            @click="generatePrayer(request)"
          />
        </UTooltip>

        <UTooltip text="Generate Scriptures">
          <UButton
            color="blue"
            variant="soft"
            size="2xs"
            icon="i-arcticons-quick-bible"
            @click="generateScripture(request)"
          />
        </UTooltip>

        <UTooltip text="Archive Prayer">
          <UButton
            color="red"
            variant="soft"
            size="2xs"
            icon="i-heroicons-x-mark-20-solid"
            @click="archiveRequest(request)"
          />
        </UTooltip>

      </li>
    </ul>
  </UCard>
</template>
