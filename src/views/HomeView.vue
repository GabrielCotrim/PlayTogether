<template>
    <v-container>
        <SearchFilters
            :showFilters="false"
            @search-changed="handleSearchChange"
        />

        <div>

        </div>
    </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
//import { debounce } from 'lodash' // Opcional: para debouncing

import SearchFilters from '@/components/SearchFilters.vue';

// Acesse o router
const router = useRouter()

const handleSearchChange = (search) => {
    console.log('Buscar:', search)
    // Redireciona para a rota '/search' com o parâmetro 'q'
    router.push({ name: 'Search', query: { q: search } })
} // 300ms de atraso para debounce
</script>