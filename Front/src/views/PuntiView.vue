<template>
    <div>
      <v-btn
        v-for="(color, index) in colors"
        :key="'color-' + index"
        :color="color"
        class="circle-button"
        fab
        small
        @click="filterByPuntoRaccolta(index + 1)"
      >
        {{ index + 1 }}
      </v-btn>
      <v-row>
      <v-col
        v-for="aula in filteredAule"
        :key="aula.ROOM_ID"
        cols="auto"
      >
        <v-btn color="gray" @click="openDialog()">
          <span class="circle" :style="{ backgroundColor: getColor(aula.PuntoRaccolta) }">
            {{ aula.PuntoRaccolta }}
          </span>
          {{ aula.Name }}
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn icon small @click="closeDialog">
          <img :src="require('../../public/close.png')" style="width: 18px; height: 18px;" />
        </v-btn>
      </v-row>
      <v-card-title class="headline">Ciao ciao</v-card-title>
    </v-card>
  </v-dialog>
  </div>
  </template>
  
  <script>
  import aule from '../aule.js';
  
  export default {
    name: 'PuntiView',
    data() {
      return {
        aule,
        colors: ['red', 'pink', 'yellow', 'green', 'blue', 'purple'],
        selectedPuntoRaccolta: null, 
        dialog: false,
      }
    },
    computed: {
      filteredAule() {
        if (!this.selectedPuntoRaccolta) {
          return [];
        }
        return this.aule.filter(aula => aula.PuntoRaccolta == this.selectedPuntoRaccolta);
      },
    },
    methods: {
      filterByPuntoRaccolta(punto) {
        this.selectedPuntoRaccolta = punto;
      },
      openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
      getColor(puntoRaccolta) {
        const colors = ['red', 'pink', 'yellow', 'green', 'blue', 'purple'];
        return colors[puntoRaccolta - 1];
      },
  },
}
  </script>
  
<style scoped>
.circle {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  text-align: center;
  line-height: 20px;
  color: f;
}
</style>