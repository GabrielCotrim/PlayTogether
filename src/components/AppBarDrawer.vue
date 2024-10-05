<template>
    <v-app-bar flat elevation="1">
      <v-container class="d-flex align-center justify-space-between">
        <!-- Menu dropdown em telas menores -->
        <v-btn
          icon
          class="d-sm-none"
          @click="toggleDrawer"
          aria-label="Abrir Menu"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-avatar
          class="me-4"
          color="grey-darken-1"
          size="36"
        ></v-avatar>

        <!-- Links no menu visíveis apenas em telas grandes -->
        <div class="d-none d-sm-flex">
          <v-btn
            v-for="link in links"
            :key="link.name"
            text
            class="mx-1"
            @click="navigate(link.path)"
            :aria-label="`Navegar para ${link.name}`"
          >
            {{ link.name }}
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Drawer para o menu em telas pequenas -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      right
      aria-label="Menu de Navegação"
      @keydown.esc="closeDrawer"
    >
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.name"
          link
          @click="navigate(link.path)"
          :aria-label="`Navegar para ${link.name}`"
        >
          <v-list-item-content>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'AppHeaderWithDrawer',
  props: {
    links: {
      type: Array,
      required: true,
      default: () => [
        { name: 'Entrar', path: '/entrar' },
        { name: 'Cadatrar', path: '/cadastrar' },
      ],
    },
  },
  setup() {
    const drawer = ref(false);

    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };

    const closeDrawer = () => {
      drawer.value = false;
    };

    const navigate = (path) => {
      // Implementar lógica de navegação aqui
        console.log(`Link clicado: ${path}`);
      closeDrawer();
    };

    return {
      drawer,
      toggleDrawer,
      closeDrawer,
      navigate,
    };
  },
};
</script>

<style scoped>
/* Estilos personalizados, se necessário */

/* Exemplo: Adicionar sombra ao passar o mouse sobre os botões de link */
.v-btn:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

/* Ajustar o Avatar */
.v-avatar {
  cursor: pointer;
}
</style>