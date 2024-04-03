<template>
  <nav class="d-flex justify-space-between">
    <router-link to="/">Home </router-link> |
    <router-link to="/aule">Aule </router-link>| 
    <router-link to="/punti">Punti </router-link>
    <v-avatar color="white" size="40" class="ml-4" @click="$router.push('/')">
      <v-img :src="user && user.userInfo ? user.userInfo.picture : './user.png'" alt="Icona utente"></v-img>
    </v-avatar>
  </nav>
  <router-view/>
</template>

<script>
export default {
  data() {
    return {
      user: null
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
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
