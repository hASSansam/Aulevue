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
      <v-row class="d-flex justify-center">
      <v-col
        v-for="aula in filteredAule"
        :key="aula.ROOM_ID"
        cols="auto"
      >
        <v-btn color="gray" @click="openDialog(aula)">
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
      <v-card-title class="headline">Classe: {{ classe }} </v-card-title>
      <v-card-title class="headline">Studenti: {{ studenti }} </v-card-title>
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
    async mounted() {
    const res = await fetch(
      `http://localhost:3000/userInfo`,
      { credentials: "include" }
    );
    if (!res.ok) {
      this.$router.push('/');
      return null;
    }
    this.user = await res.json();
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
      async openDialog(aula) {
  const giorno = new Date().getDay();
  let ora = new Date().getHours();
  ora = ora < 8 ? 0 : ora - 7;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjA1NDg3NjgsImlhdCI6MTcxMDE4MDc2OCwiZGF0YSI6eyJ1c2VySWQiOiI2NWVmNDRjODNiNDIzN2RmMjQ4NjM3MDYiLCJlbWFpbCI6ImdhYnJpZWxlLmFyY3VyaUBpdGlzcGFsZW9jYXBhLml0IiwicGVybWlzc2lvbkxldmVsIjoxOH19.3k-n_jA559Xsbp5gDjXzw87MP6U07srQLAyt8y-v-7M'; // sostituisci con il tuo token
  const response = await fetch(`https://sipal.itispaleocapa.it/api/proxySipal/v1/studenti/classe/${giorno}/${ora}/${aula.Name}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (response.status === 404) {
    this.classe = 'Aula vuota';
    this.studenti = "0";
  } else {
    const data = await response.json();
    this.classe = data.classe; 
    const responseStudenti = await fetch(`https://sipal.itispaleocapa.it/api/proxySipal/v1/studenti/classe/${this.classe}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const dataStudenti = await responseStudenti.json();
    this.studenti = dataStudenti.studenti; 
  }
  this.$nextTick(() => {
    this.dialog = true;
  });
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