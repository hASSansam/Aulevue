<template>
  <div class="home">
    <v-btn color="blue" @click="login" v-if="!user" class="login-button">Login</v-btn>
    <div v-if="user">
      <div class="d-flex align-center flex-column">
        <v-card
        title="Benvenuto"
      width="400"
    >
    <v-avatar size="100">
    <v-img :src="user.userInfo.picture" alt="Icona utente">
      </v-img>
      </v-avatar>
      <v-card-title class="text-h5">
        {{ user.userInfo.name }}
      </v-card-title>
      <v-card-subtitle>
    {{ user.userInfo.email }}
  </v-card-subtitle>
  <v-card-title v-if="aula">
    Aula: {{ aula.aula }}
  </v-card-title>
  <v-btn color="red" @click="logout" v-if="user" class="logout-button">Logout</v-btn>
  </v-card>   
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      user: null,
      aula: null
    }
  },
  async mounted() {
  const res = await fetch(
    `http://localhost:3000/userInfo`,
    { credentials: "include" }
  );
  if (!res.ok) {
    return null;
  }
  this.user = await res.json();
  console.log(this.user);
  if (this.user) {
      const date = new Date();
      const giorno = date.getDay();
      let ora = new Date().getHours();
       ora = ora < 8 ? 0 : ora - 7;
      const email = this.user.userInfo.email;
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjA1NDg3NjgsImlhdCI6MTcxMDE4MDc2OCwiZGF0YSI6eyJ1c2VySWQiOiI2NWVmNDRjODNiNDIzN2RmMjQ4NjM3MDYiLCJlbWFpbCI6ImdhYnJpZWxlLmFyY3VyaUBpdGlzcGFsZW9jYXBhLml0IiwicGVybWlzc2lvbkxldmVsIjoxOH19.3k-n_jA559Xsbp5gDjXzw87MP6U07srQLAyt8y-v-7M';
      const response = await fetch(`https://sipal.itispaleocapa.it/api/proxySipal/v1/studenti/aula/${giorno}/${ora}/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        this.aula = await response.json();
      }
    }
  },
  methods: {
    login() {
      window.location.href = 'http://localhost:3000/google';
    },
    async logout() {
      window.location.href = 'http://localhost:3000/logout';
      await new Promise(resolve => setTimeout(resolve, 50));
      location.reload();
    }
  }
}
</script>

<style scoped>
.login-button {
  font-size: 20px;
  padding: 10px 20px;
}
.logout-button {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>