<template>
    <div>
        <!-- Campo de busca responsivo centralizado e maior -->
        <v-row justify="center" class="my-4">
          <v-col cols="12" sm="10" md="6">
            <v-text-field
              v-model="searchQuery"
              label="Buscar"
              rounded="xl"
              variant="outlined"
              hide-details
              single-line
              class="search-field"
              @keyup.enter="onSearch"
            >
              <!-- Slot append-inner para personalizar o ícone -->
              <template #append-inner>
                <span
                  class="icon-container"
                  @click="onSearch"
                  role="button"
                  tabindex="0"
                  @keydown.enter.prevent="onSearch"
                  aria-label="Iniciar Busca"
                >
                  <v-icon class="icon">mdi-magnify</v-icon>
                </span>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <div v-if="showFilters" class="filters-wrapper">
          <!-- Filtros dinâmicos compactados e estilizados abaixo do campo de busca -->
          <v-row class="my-4 flex-nowrap responsive-justify" no-gutters>
            <!-- Filtro Cidade/Bairro -->
            <v-col cols="3" class="px-1 flex-shrink-0 filter-col">
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
            <v-col cols="3" class="px-1 flex-shrink-0 filter-col">
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
            <v-col cols="3" class="px-1 flex-shrink-0 filter-col">
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
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  name: 'SearchFilters',
  props: {
    showFilters: {
      type: Boolean,
      required: false,
      default: true
    },
    cities: {
      type: Array,
      required: false,
      default: () => [],
    },
    sports: {
      type: Array,
      required: false,
      default: () => [],
    },
    maxDate: {
      type: String, // Expected format: 'YYYY-MM-DD'
      required: false,
      default: () => new Date().toISOString().split('T')[0],
    },
    initialSearchQuery: {
      type: String,
      default: '',
    },
    initialSelectedCity: {
      type: [String, Number],
      default: null,
    },
    initialSelectedSport: {
      type: [String, Number],
      default: null,
    },
    initialSelectedDate: {
      type: String, // Expected format: 'YYYY-MM-DD'
      default: null,
    },
  },
  emits: ['search-changed', 'city-changed', 'sport-changed', 'date-changed'],
  setup(props, { emit }) {
    const searchQuery = ref(props.initialSearchQuery);
    const selectedCity = ref(props.initialSelectedCity);
    const selectedSport = ref(props.initialSelectedSport);
    const selectedDate = ref(props.initialSelectedDate);
    const showFilters = ref(props.showFilters);
    const menu = ref(false);
    const closeMenu = () => {
      menu.value = false;
    }

    console.log(showFilters);

    // Computed property to format the selected date for display
    const formattedDate = computed(() => {
      if (!selectedDate.value) return '';
      const date = new Date(selectedDate.value);
      return date.toLocaleDateString('pt-BR'); // Adjust locale as needed
    });

    watch(selectedCity, (newVal) => {
      emit('city-changed', newVal);
    });

    watch(selectedSport, (newVal) => {
      emit('sport-changed', newVal);
    });

    watch(selectedDate, (newVal) => {
      emit('date-changed', newVal);
      menu.value = false; // Close the menu after selecting a date
    });

    // Methods
    const onSearch = () => {
      emit('search-changed', searchQuery.value);
    };

    const onCityChange = (value) => {
      console.log(`On City Change: ${value}`);
    };

    const onSportChange = (value) => {
      console.log(`On Sport Change: ${value}`);
    };

    const onDateChange = (value) => {
      console.log(`On Sport Change: ${value}`);
    };

    return {
      searchQuery,
      selectedCity,
      selectedSport,
      selectedDate,
      menu,
      formattedDate,
      closeMenu,
      onSearch,
      onCityChange,
      onSportChange,
      onDateChange,
    };
  },
};
</script>

<style scoped>
.v-autocomplete .v-input__slot {
  min-height: 30px;
}

.v-select .v-input__slot {
  min-height: 30px;
}

.v-text-field .v-input__slot {
  min-height: 30px;
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

/* Estilização para o contêiner do ícone */
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff0000ad;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.icon-container:hover {
  background-color: darkred;
}

.icon-container:focus {
  outline: 2px solid #ff000086; /* Borda vermelha ao focar */
  outline-offset: 2px;
}

/* Estilização para o ícone */
.icon {
  color: white;
  font-size: 20px;
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