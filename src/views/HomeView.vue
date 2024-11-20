<template>
    <v-container>
        <SearchFilters
            :showFilters="false"
            @search-changed="handleSearchChange"
        />

        <div id="home">
            <v-row class="banner">
                <v-col cols="12" sm="12" md="6" class="col-banner col-span">
                    <v-row>
                        <h2 class="text-h4 font-weight-black text-orange">
                            A plataforma de pessoas que querem jogar juntas
                        </h2>
                    </v-row>
                    <v-row>
                        <div class="text-h6 font-weight-medium mb-2">
                            Frase curta para descrever o que o p2 traz de benefício e incentivando clicar no botão abaixo bla bla bla.
                        </div>
                    </v-row>
                    <v-row class="pt-6">
                        <v-btn
                          class="text-none text-black mb-4"
                          color="red-accent-2"
                          size="x-large"
                          variant="flat"
                          width="50%"
                        >
                          Junte-se!
                        </v-btn>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="12" md="6" class="col-banner">
                    <v-img
                          :src="banner"
                          max-width="480px"
                          max-height="370px"
                          min-width="180px"
                          min-height="70px"
                          class="ma-2"
                          contain
                          alt="Banner"
                          ></v-img>
                </v-col>
            </v-row>
            <h2 class="text-h4 font-weight-black text-orange d-flex align-center justify-center">
                Como funciona?
            </h2>
            <v-row class="how-work">
                <v-col class="col-work" cols="12" sm="12" md="6">
                    <div>
                    </div>
                </v-col>
                <v-col class="col-work" cols="12" sm="12" md="6">
                    <div>
                    </div>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
//import { debounce } from 'lodash' // Opcional: para debouncing

import SearchFilters from '@/components/SearchFilters.vue';
import banner from '../assets/banner.png';

// Acesse o router
const router = useRouter()

const handleSearchChange = (search) => {
    console.log('Buscar:', search)
    // Redireciona para a rota '/search' com o parâmetro 'q'
    router.push({ name: 'Search', query: { q: search } })
} // 300ms de atraso para debounce
</script>

<style scoped>
#home {
    width: 90%;
    margin: 0 auto;
}
.banner {
    background-color: #e4fafc;
    margin: 1rem;
    padding: 1rem;
}

.col-span .v-row {
 padding-left: 1rem;
 padding-right: 1rem;
}

.col-banner {
    background-color: #effeff;
}

.col-work {
    width: 100%;
    height: 250px;
    padding: 1rem;
}

.col-work div {
    width: 100%;
    height: 100%;
    background-color: #e4fafc;
}

.how-work {
    margin: 1rem;
}
</style>