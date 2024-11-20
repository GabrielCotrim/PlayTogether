<template>
    <v-container>
        <SearchFilters
        :cities="cities"
        :sports="sports"
        :maxDate="maxDate"
        :initialSearchQuery="searchQuery"
        @search-changed="handleSearchChange"
        @city-changed="handleCityChange"
        @sport-changed="handleSportChange"
        @date-changed="handleDateChange"
        />

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
                  cols="12" sm="12" md="12"
                >
                  <v-card outlined class="hover-card">
                    <v-row align="center" no-gutters>
                      <!-- Coluna da Imagem -->
                      <v-col cols="3" sm="2" class="d-flex align-center justify-center">
                        <v-img
                          :src="logo"
                          max-width="150px"
                          max-height="150px"
                          min-width="50px"
                          min-height="50px"
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
                          @click="request(event)"
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
                  cols="12" sm="12" md="12"
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
  </template>
  
<script>
import { computed, ref, watch } from 'vue';

import logo from '@/assets/logo.png';
import SearchFilters from '@/components/SearchFilters.vue';

export default {
  name: 'SearchView',
  components: {
    SearchFilters
  },
  props: {
    query: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup(props) {
    const tabs = ['Eventos', 'Times'];
    const title = ref(tabs[0]);
    const activeTab = ref(0);

    // Reactive state to hold filter values
    const searchQuery = ref(props.query);
    const selectedCity = ref(null);
    const selectedSport = ref(null);
    const selectedDate = ref(null);
    const maxDate = ref('2030-12-31');

    // Dados de exemplo para times e eventos
    const teams = [
      { name: 'Time A', sport: 'Futebol', description: 'Descrição do Time A', city: 'São Paulo' },
      { name: 'Time B', sport: 'Basquete', description: 'Descrição do Time B', city: 'Rio de Janeiro' },
      { name: 'Time C', sport: 'Vôlei', description: 'Descrição do Time C', city: 'Belo Horizonte' },
    ];

    const events = [
      { name: 'Evento 1', date: '2024-09-15', description: 'Descrição do Evento 1 jkabfjhasbfhjasjhfashjfbjasfasbfbawfauas afkjnasf as afuias asd asdasd asf auhbasb asfasfasfbuas basfasfuaa', city: 'São Paulo', sport: 'Futebol' },
      { name: 'Evento 2', date: '2024-10-01', description: 'Descrição do Evento 2', city: 'Rio de Janeiro', sport: 'Basquete' },
      { name: 'Evento 3', date: '2024-11-20', description: 'Descrição do Evento 3', city: 'Belo Horizonte', sport: 'Vôlei' },
      { name: 'Evento 4', date: '2024-12-05', description: 'Descrição do Evento 4', city: 'Curitiba', sport: 'Tênis' },
    ];

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

    // Função para formatar datas
    const formatDate = (dateStr) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    };

    // Event handlers
    const handleSearchChange = (query) => {
      searchQuery.value = query;
      // Implement additional logic, such as filtering a list
    };

    const handleCityChange = (city) => {
      selectedCity.value = city;
      // Implement additional logic, such as filtering a list
    };

    const handleSportChange = (sport) => {
      selectedSport.value = sport;
      // Implement additional logic, such as filtering a list
    };

    const handleDateChange = (date) => {
      selectedDate.value = date;
      // Implement additional logic, such as filtering a list
    };

    const request = (event) => {
      // Lógica para solicitar o evento
      // Por exemplo, redirecionar para uma página de solicitação ou abrir um modal
      console.log(`Solicitando o evento: ${event.name}`);
    };

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

    watch(activeTab, (newVal) => {
      title.value = tabs[newVal];
    });

    return {
        logo,
        tabs,
        title,
        activeTab,
        searchQuery,
        selectedCity,
        selectedSport,
        selectedDate,
        maxDate,
        teams,
        events,
        cities,
        sports,
        formatDate,
        handleSearchChange,
        handleCityChange,
        handleSportChange,
        handleDateChange,
        request,
        filteredEvents,
        filteredTeams
    };
  },
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
  
  .v-card-title {
    font-weight: bold;
  }
  
  .v-card-subtitle {
    color: gray;
  }
  </style>
  