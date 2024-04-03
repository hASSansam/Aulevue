<template>
  <div class="aule-view">
    <v-container>
      <div v-for="(edificio, index) in edifici" :key="'edificio-' + index">
        <h1 class="spaced edificio-header">{{ edificio }}</h1>
        <div v-for="(aulas, piano) in aulePerEdificio[edificio]" :key="'piano-' + piano">
          <v-subheader class="piano-header mt-10 mb-10">{{ piano }}</v-subheader>
          <v-row>
            <v-col
              v-for="(aula, indexAula) in aulas"
              :key="'aula-' + indexAula"
              cols="12"
              sm="6"
              md="4"
            >
              <v-btn color="gray" @click="openDialog(aula)">
                <span class="circle" :style="{ backgroundColor: getColor(aula.PuntoRaccolta) }">
                  {{ aula.PuntoRaccolta }}
                </span>
                {{ aula.Name }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>

    <v-dialog v-model="dialog" max-width="90vw" max-height="90vh">
    <v-card>
      <v-btn icon large class="dialog-close" @click="closeDialog">
        <img :src="require('../../public/close.png')" style="width: 24px; height: 24px;" />
      </v-btn>
      <div class="image-container">
        <v-img class="map" :src="getImagePath(selectedAula)" max-height="90vh" max-width="90vw" contain></v-img>
      </div>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
import aule from '../aule.js';

export default {
  name: 'AuleView',
  data() {
    return {
      aule,
      edifici: ["Edificio Centrale", "Tessile", "Informatica", "Elettronica", "Meccanica", "Palestra"],
      dialog: false,
      selectedAula: null
    }
  },
  computed: {
    aulePerEdificio() {
      let result = {};
      for (let aula of this.aule) {
        if (!result[aula.Edificio]) {
          result[aula.Edificio] = {};
        }
        if (!result[aula.Edificio][aula.Piano]) {
          result[aula.Edificio][aula.Piano] = [];
        }
        result[aula.Edificio][aula.Piano].push(aula);
      }
      return result;
    },
  },
  methods: {
    openDialog(aula) {
      this.selectedAula = aula;
      this.dialog = true;
    },
    closeDialog() { // Aggiunto qui
      this.dialog = false;
    },
    getImagePath(aula) { // Aggiunto qui
      return `./images/${aula.Edificio}/${aula.Piano}.png`;
    },
    getColor(puntoRaccolta) {
      const colors = ['red', 'fuchsia', 'yellow', 'green', 'blue', 'purple'];
      return colors[puntoRaccolta - 1];
    }
  }
}
</script>

<style scoped>
.edificio-header,
.piano-header {
  text-transform: uppercase; /* Aggiunto qui */
}
.piano-header {
  font-size: 1.9em;
  margin-bottom: 40px;
}
.spaced {
  font-size: 2.5em;
  margin-bottom: 40px;
  margin-top: 40px;
}
.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map {
  width: 5%;
  height: 5%;
  object-fit: cover;
}
.marker {
  position: absolute;
  width: 30px;
  height: 30px;
}
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
.dialog-close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  color: black;
 
}
</style>