<template>
  <nav>
    <div class="nav-wrapper">
      <a href="/about" class="brand-logo right"><i class="material-icons left">info_outline</i></a>
      <ul id="nav-mobile" class="left">
        <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
        <li>
          <router-link :to="{ name: 'Places' }">Lista atrakcji</router-link>
        </li>
        <li><router-link :to="{ name: 'About' }">About</router-link></li>
       
      </ul>
       <div style="cursor:pointer" @click="$router.push('/login')">{{user}}</div>
    </div>
  </nav>
  <router-view />
</template>
<script>
export default {
computed: {
    user () {
      return this.$store.state.user
    }
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
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
