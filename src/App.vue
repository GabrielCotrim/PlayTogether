<template>
  <v-app id="inspire">
    <!-- Header com Navigation Drawer -->
    <AppBarDrawer :links="links" />

    <v-main class="bg-white">
      <v-container>
        <!-- Campo de busca responsivo centralizado e maior -->
        <v-row justify="center" class="my-4">
          <v-col cols="12" sm="10" md="8">
            <v-text-field
              v-model="searchQuery"
              label="Buscar"
              append-inner-icon="mdi-magnify"
              rounded="xl"
              variant="outlined"
              flat
              hide-details
              single-line
              class="search-field"
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="filters-wrapper">
          <!-- Filtros dinâmicos compactados e estilizados abaixo do campo de busca -->
          <v-row class="my-4 flex-nowrap responsive-justify" no-gutters>
            <!-- Filtro Cidade/Bairro -->
            <v-col cols="8" sm="3" md="3" class="px-1 flex-shrink-0 filter-col">
              <v-autocomplete
                v-model="selectedCity"
                :items="cities"
                label="Cidade/Bairro"
                variant="outlined"
                clearable
                dense
                hide-no-data
                hide-selected
                prepend-inner-icon="mdi-city"
                class="filter-field"
                rounded="xl"
              ></v-autocomplete>
            </v-col>

            <!-- Filtro Modalidade Esportiva -->
            <v-col cols="8" sm="3" md="3" class="px-1 flex-shrink-0 filter-col">
              <v-select
                v-model="selectedSport"
                :items="sports"
                label="Modalidades"
                variant="outlined"
                clearable
                dense
                prepend-inner-icon="mdi-basketball"
                class="filter-field"
                rounded="xl"
              ></v-select>
            </v-col>

            <!-- Filtro Data -->
            <v-col cols="8" sm="3" md="3" class="px-1 flex-shrink-0 filter-col">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="formattedDate"
                    label="Data"
                    variant="outlined"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="props"
                    clearable
                    dense
                    class="filter-field"
                    rounded="xl"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="selectedDate"
                  @update:model-value="closeMenu"
                  :max="maxDate"
                  color="primary"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </div>

        <!-- Título Dinâmico Acima das Abas -->
        <h1 class="text-left ml-4">Procurando por {{ title }}</h1>

        <!-- Abas para Eventos e Times -->
        <v-tabs
          v-model="activeTab"
          background-color="primary"
          dark
          grow
          class="my-4"
        >
          <v-tab
            v-for="tab in tabs"
            :key="tab"
          >
            {{ tab }}
          </v-tab>
        </v-tabs>

        <!-- Conteúdo das Abas -->
        <v-tabs-items v-model="activeTab">
          <!-- Aba de Eventos -->
          <v-tab-item>
            <v-container v-if="activeTab === 0">
              <v-row>
                <v-col
                  v-for="event in filteredEvents"
                  :key="event.name"
                  cols="12"
                >
                  <v-card outlined class="hover-card">
                    <v-row align="center" no-gutters>
                      <!-- Coluna da Imagem -->
                      <v-col cols="3" sm="2" class="d-flex align-center justify-center">
                        <v-img
                          :src="logo"
                          aspect-ratio="1"
                          class="ma-2"
                          contain
                          alt="Logo do Evento"
                        ></v-img>
                      </v-col>
                    
                      <!-- Coluna do Conteúdo -->
                      <v-col cols="7" sm="8">
                        <v-card-title class="headline">{{ event.name }}</v-card-title>
                        <v-card-subtitle class="grey--text">{{ formatDate(event.date) }}</v-card-subtitle>
                        <v-card-text>{{ event.description }}</v-card-text>
                      </v-col>
                    
                      <!-- Coluna do Botão -->
                      <v-col cols="2" sm="2" class="d-flex align-center justify-end">
                        <v-btn
                          color="primary"
                          @click="solicitar(event)"
                          elevation="2"
                          class="mr-4 d-none d-sm-flex"
                        >
                          Solicitar
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>

          <!-- Aba de Times -->
          <v-tab-item>
            <v-container v-if="activeTab === 1">
              <v-row>
                <v-col
                  v-for="team in filteredTeams"
                  :key="team.name"
                  cols="12"
                >
                  <v-card outlined class="hover-card">
                    <v-card-title>{{ team.name }}</v-card-title>
                    <v-card-subtitle>{{ team.sport }}</v-card-subtitle>
                    <v-card-text>{{ team.description }}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import logo from '@/assets/logo.png';
import AppBarDrawer from '@/components/AppBarDrawer.vue';

const menu = ref(false);
const searchQuery = ref('');
const links = [
        { name: 'Entrar', path: '/entrar' },
        { name: 'Cadatrar', path: '/cadastrar' },
      ];
const tabs = ['Eventos', 'Times'];
const title = ref(tabs[0]);
const activeTab = ref(0);

// Estados dos filtros
const selectedCity = ref(null);
const selectedSport = ref(null);
const selectedDate = ref(null);

const formattedDate = computed(() => {
  return selectedDate.value ? selectedDate.value.toLocaleDateString("pt-br") : "";
});

// Definição da data máxima para o date-picker
const maxDate = ref('2030-12-31');

// Listas de opções para os filtros
const cities = [
  'São Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Curitiba',
  'Porto Alegre',
  'Salvador',
];
const sports = [
  'Futebol',
  'Basquete',
  'Vôlei',
  'Tênis',
  'Natação',
  'Atletismo',
];

// Dados de exemplo para times e eventos
const teams = [
  { name: 'Time A', sport: 'Futebol', description: 'Descrição do Time A', city: 'São Paulo' },
  { name: 'Time B', sport: 'Basquete', description: 'Descrição do Time B', city: 'Rio de Janeiro' },
  { name: 'Time C', sport: 'Vôlei', description: 'Descrição do Time C', city: 'Belo Horizonte' },
];

const events = [
  { name: 'Evento 1', date: '2024-09-15', description: 'Descrição do Evento 1', city: 'São Paulo', sport: 'Futebol' },
  { name: 'Evento 2', date: '2024-10-01', description: 'Descrição do Evento 2', city: 'Rio de Janeiro', sport: 'Basquete' },
  { name: 'Evento 3', date: '2024-11-20', description: 'Descrição do Evento 3', city: 'Belo Horizonte', sport: 'Vôlei' },
  { name: 'Evento 4', date: '2024-12-05', description: 'Descrição do Evento 4', city: 'Curitiba', sport: 'Tênis' },
];

const closeMenu = () => {
  menu.value = false;
}

// Computed para filtrar eventos
const filteredEvents = computed(() => {
  return events.filter(event => {
    const matchesCity = selectedCity.value ? event.city === selectedCity.value : true;
    const matchesSport = selectedSport.value ? event.sport === selectedSport.value : true;
    const matchesDate = selectedDate.value ? event.date === selectedDate.value : true;
    const matchesSearch = searchQuery.value
      ? event.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      : true;
    return matchesCity && matchesSport && matchesDate && matchesSearch;
  });
});

// Computed para filtrar times
const filteredTeams = computed(() => {
  return teams.filter(team => {
    const matchesCity = selectedCity.value ? team.city === selectedCity.value : true;
    const matchesSport = selectedSport.value ? team.sport === selectedSport.value : true;
    const matchesSearch = searchQuery.value
      ? team.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        team.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      : true;
    return matchesCity && matchesSport && matchesSearch;
  });
});

// Watch para atualizar o título com base na aba ativa
watch(activeTab, (newVal) => {
  title.value = tabs[newVal];
});

// Função para formatar datas
const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const solicitar = (event) => {
  // Lógica para solicitar o evento
  // Por exemplo, redirecionar para uma página de solicitação ou abrir um modal
  console.log(`Solicitando o evento: ${event.name}`);
};
</script>

<style scoped>
.v-tabs {
  margin-bottom: 20px;
}

.hover-card {
  transition: transform 0.2s;
}

.hover-card:hover {
  transform: scale(1.02);
}

@media (max-width: 600px) {
  .v-tabs {
    flex-direction: column;
  }
}

.v-autocomplete .v-input__slot {
  min-height: 30px;
}

.v-select .v-input__slot {
  min-height: 30px;
}

.v-text-field .v-input__slot {
  min-height: 30px;
}

.v-card-title {
  font-weight: bold;
}

.v-card-subtitle {
  color: gray;
}

/* Contêiner que permite scroll horizontal */
.filters-wrapper {
  overflow-x: auto;
}

/* Previne quebra de linha e permite que os filtros fiquem em uma única linha */
.v-row.flex-nowrap {
  flex-wrap: nowrap;
}

/* Define uma largura mínima para cada coluna para manter a consistência */
.filter-col {
  min-width: 150px; /* Ajuste conforme necessário */
}

/* Garantir que os campos de filtro ocupem 100% da largura da coluna */
.filter-field {
  width: 100%;
}

.responsive-justify {
    justify-content: center;
  }

/* Ajustes adicionais para responsividade e estética */
@media (max-width: 600px) {
  .filter-col {
    max-width: 200px; /* Ajuste conforme necessário para telas pequenas */
  }
  .responsive-justify {
    justify-content: left;
  }
}
</style>
