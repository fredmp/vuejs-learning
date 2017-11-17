<template>
    <div>
      <p>Loaded user: {{ $route.params.id }}</p>
      <router-link
        :to="{ name: 'userEdit', params: { id: $route.params.id }, query: { q: 100, locale: 'pt-BR' } }">Edit</router-link>
    </div>
</template>
